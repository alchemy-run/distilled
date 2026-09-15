##### Models

<details>

<summary>

MigrationStep object { deleted_classes, new_classes, new_sqlite_classes, 2 more }

</summary>

deleted_classes: optional array of string

A list of classes to delete Durable Object namespaces from.

[Link to this property](#)

new_classes: optional array of string

A list of classes to create Durable Object namespaces from.

[Link to this property](#)

new_sqlite_classes: optional array of string

A list of classes to create Durable Object namespaces with SQLite from.

[Link to this property](#)

<details>

<summary>

renamed_classes: optional array of object { from, to }

A list of classes with Durable Object namespaces that were renamed.

</summary>

from: optional string

[Link to this property](#)

to: optional string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

transferred_classes: optional array of object { from, from_script, to }

A list of transfers for Durable Object namespaces from a different Worker and class to a class defined in this Worker.

</summary>

from: optional string

[Link to this property](#)

from_script: optional string

[Link to this property](#)

to: optional string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SingleStepMigration object { deleted_classes, new_classes, new_sqlite_classes, 4 more }

A single set of migrations to apply.

</summary>

deleted_classes: optional array of string

A list of classes to delete Durable Object namespaces from.

[Link to this property](#)

new_classes: optional array of string

A list of classes to create Durable Object namespaces from.

[Link to this property](#)

new_sqlite_classes: optional array of string

A list of classes to create Durable Object namespaces with SQLite from.

[Link to this property](#)

new_tag: optional string

Tag to set as the latest migration tag.

[Link to this property](#)

old_tag: optional string

Tag used to verify against the latest migration tag for this Worker. If they don’t match, the upload is rejected.

[Link to this property](#)

<details>

<summary>

renamed_classes: optional array of object { from, to }

A list of classes with Durable Object namespaces that were renamed.

</summary>

from: optional string

[Link to this property](#)

to: optional string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

transferred_classes: optional array of object { from, from_script, to }

A list of transfers for Durable Object namespaces from a different Worker and class to a class defined in this Worker.

</summary>

from: optional string

[Link to this property](#)

from_script: optional string

[Link to this property](#)

to: optional string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

WorkerMetadata object { body_part, main_module }

JSON-encoded metadata about the uploaded parts and Worker configuration.

</summary>

body_part: optional string

Name of the part in the multipart request that contains the script (e.g. the file adding a listener to the `fetch` event). Indicates a `service worker syntax` Worker.

[Link to this property](#)

main_module: optional string

Name of the part in the multipart request that contains the main module (e.g. the file exporting a `fetch` handler). Indicates a `module syntax` Worker.

[Link to this property](#)

</details>

[Link to this property](#)

##### [List Workers](/api/resources/workers/subresources/beta/subresources/workers/methods/list)

GET/accounts/{account_id}/workers/workers

##### [Get Worker](/api/resources/workers/subresources/beta/subresources/workers/methods/get)

GET/accounts/{account_id}/workers/workers/{worker_id}

##### [Create Worker](/api/resources/workers/subresources/beta/subresources/workers/methods/create)

POST/accounts/{account_id}/workers/workers

##### [Update Worker](/api/resources/workers/subresources/beta/subresources/workers/methods/update)

PUT/accounts/{account_id}/workers/workers/{worker_id}

##### [Edit Worker](/api/resources/workers/subresources/beta/subresources/workers/methods/edit)

PATCH/accounts/{account_id}/workers/workers/{worker_id}

##### [Delete Worker](/api/resources/workers/subresources/beta/subresources/workers/methods/delete)

DELETE/accounts/{account_id}/workers/workers/{worker_id}

##### Models

<details>

<summary>

Worker object { id, created_on, logpush, 8 more }

</summary>

id: string

Immutable ID of the Worker.

[Link to this property](#)

created_on: string

When the Worker was created.

formatdate-time

[Link to this property](#)

logpush: boolean

Whether logpush is enabled for the Worker.

[Link to this property](#)

name: string

Name of the Worker.

[Link to this property](#)

<details>

<summary>

observability: object { enabled, head_sampling_rate, logs, 2 more }

Observability settings for the Worker.

</summary>

enabled: optional boolean

Whether observability is enabled for the Worker.

[Link to this property](#)

head_sampling_rate: optional number

The sampling rate for observability. From 0 to 1 (1 = 100%, 0.1 = 10%).

[Link to this property](#)

<details>

<summary>

logs: optional object { destinations, enabled, head_sampling_rate, 2 more }

Log settings for the Worker.

</summary>

destinations: optional array of string

A list of destinations where logs will be exported to.

[Link to this property](#)

enabled: optional boolean

Whether logs are enabled for the Worker.

[Link to this property](#)

head_sampling_rate: optional number

The sampling rate for logs. From 0 to 1 (1 = 100%, 0.1 = 10%).

[Link to this property](#)

invocation_logs: optional boolean

Whether [invocation logs](https://developers.cloudflare.com/workers/observability/logs/workers-logs/#invocation-logs) are enabled for the Worker.

[Link to this property](#)

persist: optional boolean

Whether log persistence is enabled for the Worker.

[Link to this property](#)

</details>

[Link to this property](#)

redact_query_string: optional boolean

Whether query strings are removed from request URLs in logs and traces.

[Link to this property](#)

<details>

<summary>

traces: optional object { destinations, enabled, head_sampling_rate, 2 more }

Trace settings for the Worker.

</summary>

destinations: optional array of string

A list of destinations where traces will be exported to.

[Link to this property](#)

enabled: optional boolean

Whether traces are enabled for the Worker.

[Link to this property](#)

head_sampling_rate: optional number

The sampling rate for traces. From 0 to 1 (1 = 100%, 0.1 = 10%).

[Link to this property](#)

persist: optional boolean

Whether trace persistence is enabled for the Worker.

[Link to this property](#)

<details>

<summary>

propagation_policy: optional "authenticated" or "accept"

Controls how inbound trace context (traceparent/tracestate) headers on incoming requests are handled. “authenticated” honors inbound trace context only when accompanied by a valid trace auth token. “accept” unconditionally accepts inbound trace context. Requires the trace propagation feature to be enabled. Returns null when the trace propagation feature is not enabled for the account.

</summary>

One of the following:

"authenticated"

[Link to this property](#)

"accept"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

references: object { dispatch_namespace_outbounds, domains, durable_objects, 2 more }

Other resources that reference the Worker and depend on it existing.

</summary>

<details>

<summary>

dispatch_namespace_outbounds: array of object { namespace_id, namespace_name, worker_id, worker_name }

Other Workers that reference the Worker as an outbound for a dispatch namespace.

</summary>

namespace_id: string

ID of the dispatch namespace.

[Link to this property](#)

namespace_name: string

Name of the dispatch namespace.

[Link to this property](#)

worker_id: string

ID of the Worker using the dispatch namespace.

[Link to this property](#)

worker_name: string

Name of the Worker using the dispatch namespace.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

domains: array of object { id, certificate_id, hostname, 2 more }

Custom domains connected to the Worker.

</summary>

id: string

ID of the custom domain.

[Link to this property](#)

certificate_id: string

ID of the TLS certificate issued for the custom domain.

[Link to this property](#)

hostname: string

Full hostname of the custom domain, including the zone name.

[Link to this property](#)

zone_id: string

ID of the zone.

[Link to this property](#)

zone_name: string

Name of the zone.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

durable_objects: array of object { namespace_id, namespace_name, worker_id, worker_name }

Other Workers that reference Durable Object classes implemented by the Worker.

</summary>

namespace_id: string

ID of the Durable Object namespace being used.

[Link to this property](#)

namespace_name: string

Name of the Durable Object namespace being used.

[Link to this property](#)

worker_id: string

ID of the Worker using the Durable Object implementation.

[Link to this property](#)

worker_name: string

Name of the Worker using the Durable Object implementation.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

queues: array of object { queue_consumer_id, queue_id, queue_name }

Queues that send messages to the Worker.

</summary>

queue_consumer_id: string

ID of the queue consumer configuration.

[Link to this property](#)

queue_id: string

ID of the queue.

[Link to this property](#)

queue_name: string

Name of the queue.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

workers: array of object { id, name }

Other Workers that reference the Worker using [service bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/).

</summary>

id: string

ID of the referencing Worker.

[Link to this property](#)

name: string

Name of the referencing Worker.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

subdomain: object { enabled, preview_url_suffix, previews_enabled, url }

Subdomain settings for the Worker.

</summary>

enabled: optional boolean

Whether the *.workers.dev subdomain is enabled for the Worker.

[Link to this property](#)

preview_url_suffix: optional string

Prepend a version or preview prefix to this host suffix to form the *.workers.dev [preview URL](https://developers.cloudflare.com/workers/configuration/previews/) the Worker would serve on once previews are enabled, e.g. `https://<prefix>-my-worker.my-subdomain.workers.dev`. Present whenever the account owns a workers.dev subdomain, regardless of whether `previews_enabled` is true, so presence does not imply preview URLs are currently live. Absent only when the account owns no workers.dev subdomain.

[Link to this property](#)

previews_enabled: optional boolean

Whether [preview URLs](https://developers.cloudflare.com/workers/configuration/previews/) are enabled for the Worker.

[Link to this property](#)

url: optional string

The address the Worker would serve on once its *.workers.dev subdomain is enabled. Present whenever the account owns a workers.dev subdomain, regardless of whether `enabled` is true, so presence does not imply the Worker is currently live at this URL. Absent only when the account owns no workers.dev subdomain.

formaturi

[Link to this property](#)

</details>

[Link to this property](#)

tags: array of string

Tags associated with the Worker.

[Link to this property](#)

<details>

<summary>

tail_consumers: array of object { name }

Other Workers that should consume logs from the Worker.

</summary>

name: string

Name of the consumer Worker.

[Link to this property](#)

</details>

[Link to this property](#)

updated_on: string

When the Worker was most recently updated.

formatdate-time

[Link to this property](#)

deployed_on: optional string

When the Worker’s most recent deployment was created. `null` if the Worker has never been deployed.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

WorkerDeleteResponse object { errors, messages, success }

</summary>

<details>

<summary>

errors: array of object { code, message, documentation_url, source }

</summary>

code: number

minimum1000

[Link to this property](#)

message: string

[Link to this property](#)

documentation_url: optional string

[Link to this property](#)

<details>

<summary>

source: optional object { pointer }

</summary>

pointer: optional string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

messages: array of object { code, message, documentation_url, source }

</summary>

code: number

minimum1000

[Link to this property](#)

message: string

[Link to this property](#)

documentation_url: optional string

[Link to this property](#)

<details>

<summary>

source: optional object { pointer }

</summary>

pointer: optional string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

success: true

Whether the API call was successful.

[Link to this property](#)

</details>

[Link to this property](#)

##### [List Versions](/api/resources/workers/subresources/beta/subresources/workers/subresources/versions/methods/list)

GET/accounts/{account_id}/workers/workers/{worker_id}/versions

##### [Get Version](/api/resources/workers/subresources/beta/subresources/workers/subresources/versions/methods/get)

GET/accounts/{account_id}/workers/workers/{worker_id}/versions/{version_id}

##### [Create Version](/api/resources/workers/subresources/beta/subresources/workers/subresources/versions/methods/create)

POST/accounts/{account_id}/workers/workers/{worker_id}/versions

##### [Delete Version](/api/resources/workers/subresources/beta/subresources/workers/subresources/versions/methods/delete)

DELETE/accounts/{account_id}/workers/workers/{worker_id}/versions/{version_id}

##### Models

<details>

<summary>

Version object { id, created_on, number, 22 more }

</summary>

id: string

Version identifier.

formatuuid

[Link to this property](#)

created_on: string

When the version was created.

formatdate-time

[Link to this property](#)

number: number

The integer version number, starting from one.

[Link to this property](#)

urls: array of string

All routable URLs that always point to this version. Does not include alias URLs, since aliases can be updated to point to a different version.

[Link to this property](#)

<details>

<summary>

annotations: optional object { "workers/message", "workers/tag", "workers/triggered_by" }

Metadata about the version.

</summary>

"workers/message": optional string

Human-readable message about the version. Truncated to 1000 bytes if longer.

maxLength1000

[Link to this property](#)

"workers/tag": optional string

User-provided identifier for the version. Maximum 100 bytes.

maxLength100

[Link to this property](#)

"workers/triggered_by": optional string

Operation that triggered the creation of the version.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

assets: optional object { config, jwt }

Configuration for assets within a Worker.

[`_headers`](https://developers.cloudflare.com/workers/static-assets/headers/#custom-headers) and [`_redirects`](https://developers.cloudflare.com/workers/static-assets/redirects/) files should be included as modules named `_headers` and `_redirects` with content type `text/plain`.

</summary>

<details>

<summary>

config: optional object { html_handling, not_found_handling, run_worker_first }

Configuration for assets within a Worker.

</summary>

<details>

<summary>

html_handling: optional "auto-trailing-slash" or "force-trailing-slash" or "drop-trailing-slash" or "none"

Determines the redirects and rewrites of requests for HTML content.

</summary>

One of the following:

"auto-trailing-slash"

[Link to this property](#)

"force-trailing-slash"

[Link to this property](#)

"drop-trailing-slash"

[Link to this property](#)

"none"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

not_found_handling: optional "none" or "404-page" or "single-page-application"

Determines the response when a request does not match a static asset, and there is no Worker script.

</summary>

One of the following:

"none"

[Link to this property](#)

"404-page"

[Link to this property](#)

"single-page-application"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

run_worker_first: optional array of string or boolean

Contains a list path rules to control routing to either the Worker or assets. Glob (*) and negative (!) rules are supported. Rules must start with either ’/’ or ’!/’. At least one non-negative rule must be provided, and negative rules have higher precedence than non-negative rules.

</summary>

One of the following:

array of string

Contains a list path rules to control routing to either the Worker or assets. Glob (*) and negative (!) rules are supported. Rules must start with either ’/’ or ’!/’. At least one non-negative rule must be provided, and negative rules have higher precedence than non-negative rules.

[Link to this property](#)

boolean

Enables routing to always invoke the Worker script ahead of all requests. When true, this is equivalent to `["/*"]` in the string array version of this field.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

jwt: optional string

Token provided upon successful upload of all files from a registered manifest.

[Link to this property](#)

</details>

[Link to this property](#)

author_email: optional string

Email of the user who created the version.

formatemail

[Link to this property](#)

author_id: optional string

Identifier of the user who created the version.

[Link to this property](#)

<details>

<summary>

bindings: optional array of object { name, type } or object { instance_name, name, type, namespace } or object { name, namespace, type } or 33 more

List of bindings attached to a Worker. You can find more about bindings on our docs: https://developers.cloudflare.com/workers/configuration/multipart-upload-metadata/#bindings.

</summary>

One of the following:

<details>

<summary>

AI object { name, type }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

type: "ai"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AISearch object { instance_name, name, type, namespace }

</summary>

instance_name: string

The user-chosen instance name. Must exist at deploy time. The worker can search, chat, update, and manage items/jobs on this instance.

[Link to this property](#)

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

type: "ai_search"

The kind of resource that the binding provides.

[Link to this property](#)

namespace: optional string

The namespace the instance belongs to. Defaults to “default” if omitted. Customers who don’t use namespaces can simply omit this field.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AISearchNamespace object { name, namespace, type }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

namespace: string

The user-chosen namespace name. Must exist before deploy — Wrangler handles auto-creation on deploy failure (R2 bucket pattern). The “default” namespace is auto-created by config-api for new accounts. Grants full access (CRUD + search + chat) to all instances within the namespace.

[Link to this property](#)

type: "ai_search_namespace"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Messaging object { name, namespace, type }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

namespace: string

The Messaging namespace to bind to.

[Link to this property](#)

type: "messaging"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AnalyticsEngine object { dataset, name, type }

</summary>

dataset: string

The name of the dataset to bind to.

[Link to this property](#)

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

type: "analytics_engine"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Assets object { name, type }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

type: "assets"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Browser object { name, type }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

type: "browser"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

D1 object { database_id, name, type, id }

</summary>

database_id: string

Identifier of the D1 database to bind to.

[Link to this property](#)

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

type: "d1"

The kind of resource that the binding provides.

[Link to this property](#)

Deprecatedid: optional string

This property has been renamed to `database_id`.

Identifier of the D1 database to bind to.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DataBlob object { name, part, type }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

part: string

The name of the file containing the data content. Only accepted for `service worker syntax` Workers.

[Link to this property](#)

Deprecatedtype: "data_blob"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DispatchNamespace object { name, namespace, type, outbound }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

namespace: string

The name of the dispatch namespace.

[Link to this property](#)

type: "dispatch_namespace"

The kind of resource that the binding provides.

[Link to this property](#)

<details>

<summary>

outbound: optional object { params, worker }

Outbound worker.

</summary>

<details>

<summary>

params: optional array of object { name }

Pass information from the Dispatch Worker to the Outbound Worker through the parameters.

</summary>

name: string

Name of the parameter.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

worker: optional object { entrypoint, environment, service }

Outbound worker.

</summary>

entrypoint: optional string

Entrypoint to invoke on the outbound worker.

[Link to this property](#)

environment: optional string

Environment of the outbound worker.

[Link to this property](#)

service: optional string

Name of the outbound worker.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DurableObjectNamespace object { name, type, class_name, 4 more }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

type: "durable_object_namespace"

The kind of resource that the binding provides.

[Link to this property](#)

class_name: optional string

The exported class name of the Durable Object.

[Link to this property](#)

dispatch_namespace: optional string

The dispatch namespace the Durable Object script belongs to.

[Link to this property](#)

environment: optional string

The environment of the script_name to bind to.

[Link to this property](#)

namespace_id: optional string

Namespace identifier tag.

maxLength32

[Link to this property](#)

script_name: optional string

The script where the Durable Object is defined, if it is external to this Worker.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Hyperdrive object { id, name, type }

</summary>

id: string

Identifier of the Hyperdrive connection to bind to.

[Link to this property](#)

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

type: "hyperdrive"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Inherit object { name, type, old_name, version_id }

</summary>

name: string

The name of the inherited binding.

[Link to this property](#)

type: "inherit"

The kind of resource that the binding provides.

[Link to this property](#)

old_name: optional string

The old name of the inherited binding. If set, the binding will be renamed from `old_name` to `name` in the new version. If not set, the binding will keep the same name between versions.

[Link to this property](#)

version_id: optional string

Identifier for the version to inherit the binding from, which can be the version ID or the literal “latest” to inherit from the latest version. Defaults to inheriting the binding from the latest version.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Images object { name, type }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

type: "images"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Json object { json, name, type }

</summary>

json: unknown

JSON data to use.

[Link to this property](#)

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

type: "json"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

KVNamespace object { name, namespace_id, type }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

namespace_id: string

Namespace identifier tag.

maxLength32

[Link to this property](#)

type: "kv_namespace"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Media object { name, type }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

type: "media"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

MTLSCertificate object { certificate_id, name, type }

</summary>

certificate_id: string

Identifier of the certificate to bind to.

[Link to this property](#)

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

type: "mtls_certificate"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

PlainText object { name, text, type }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

text: string

The text value to use.

[Link to this property](#)

type: "plain_text"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Pipelines object { name, pipeline, type }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

pipeline: string

Name of the Pipeline to bind to.

[Link to this property](#)

type: "pipelines"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Queue object { name, queue_name, type }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

queue_name: string

Name of the Queue to bind to.

[Link to this property](#)

type: "queue"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Ratelimit object { name, namespace_id, simple, type }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

namespace_id: string

Identifier of the rate limit namespace to bind to.

[Link to this property](#)

<details>

<summary>

simple: object { limit, period, mitigation_timeout }

The rate limit configuration.

</summary>

limit: number

The limit (requests per period).

[Link to this property](#)

period: number

The period in seconds.

[Link to this property](#)

mitigation_timeout: optional number

Duration in seconds to apply the mitigation action after the rate limit is exceeded. Valid values are 0 (disabled), 10, or multiples of 60 up to 86400. Must be greater than or equal to the period when non-zero.

[Link to this property](#)

</details>

[Link to this property](#)

type: "ratelimit"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

R2Bucket object { bucket_name, name, type, jurisdiction }

</summary>

bucket_name: string

R2 bucket to bind to.

[Link to this property](#)

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

type: "r2_bucket"

The kind of resource that the binding provides.

[Link to this property](#)

<details>

<summary>

jurisdiction: optional "eu" or "fedramp" or "fedramp-high" or "us"

The [jurisdiction](https://developers.cloudflare.com/r2/reference/data-location/#jurisdictional-restrictions) of the R2 bucket.

</summary>

One of the following:

"eu"

[Link to this property](#)

"fedramp"

[Link to this property](#)

"fedramp-high"

[Link to this property](#)

"us"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SecretText object { name, text, type }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

text: string

The secret value to use.

[Link to this property](#)

type: "secret_text"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SendEmail object { name, type, allowed_destination_addresses, 2 more }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

type: "send_email"

The kind of resource that the binding provides.

[Link to this property](#)

allowed_destination_addresses: optional array of string

List of allowed destination addresses.

[Link to this property](#)

allowed_sender_addresses: optional array of string

List of allowed sender addresses.

[Link to this property](#)

destination_address: optional string

Destination address for the email.

formatemail

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Service object { name, service, type, 2 more }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

service: string

Name of Worker to bind to.

[Link to this property](#)

type: "service"

The kind of resource that the binding provides.

[Link to this property](#)

entrypoint: optional string

Entrypoint to invoke on the target Worker.

[Link to this property](#)

environment: optional string

Optional environment if the Worker utilizes one.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

TextBlob object { name, part, type }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

part: string

The name of the file containing the text content. Only accepted for `service worker syntax` Workers.

[Link to this property](#)

Deprecatedtype: "text_blob"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Vectorize object { index_name, name, type }

</summary>

index_name: string

Name of the Vectorize index to bind to.

[Link to this property](#)

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

type: "vectorize"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

VersionMetadata object { name, type }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

type: "version_metadata"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SecretsStoreSecret object { name, secret_name, store_id, type }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

secret_name: string

Name of the secret in the store.

[Link to this property](#)

store_id: string

ID of the store containing the secret.

[Link to this property](#)

type: "secrets_store_secret"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Flagship object { app_id, name, type }

</summary>

app_id: string

ID of the Flagship app to bind to for feature flag evaluation.

maxLength128

[Link to this property](#)

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

type: "flagship"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SecretKey object { algorithm, format, name, 4 more }

</summary>

algorithm: unknown

Algorithm-specific key parameters. [Learn more](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#algorithm).

[Link to this property](#)

<details>

<summary>

format: "raw" or "pkcs8" or "spki" or "jwk"

Data format of the key. [Learn more](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#format).

</summary>

One of the following:

"raw"

[Link to this property](#)

"pkcs8"

[Link to this property](#)

"spki"

[Link to this property](#)

"jwk"

[Link to this property](#)

</details>

[Link to this property](#)

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

type: "secret_key"

The kind of resource that the binding provides.

[Link to this property](#)

<details>

<summary>

usages: array of "encrypt" or "decrypt" or "sign" or 5 more

Allowed operations with the key. [Learn more](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#keyUsages).

</summary>

One of the following:

"encrypt"

[Link to this property](#)

"decrypt"

[Link to this property](#)

"sign"

[Link to this property](#)

"verify"

[Link to this property](#)

"deriveKey"

[Link to this property](#)

"deriveBits"

[Link to this property](#)

"wrapKey"

[Link to this property](#)

"unwrapKey"

[Link to this property](#)

</details>

[Link to this property](#)

key_base64: optional string

Base64-encoded key data. Required if `format` is “raw”, “pkcs8”, or “spki”.

[Link to this property](#)

key_jwk: optional unknown

Key data in [JSON Web Key](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#json_web_key) format. Required if `format` is “jwk”.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Workflow object { name, type, workflow_name, 2 more }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

type: "workflow"

The kind of resource that the binding provides.

[Link to this property](#)

workflow_name: string

Name of the Workflow to bind to.

[Link to this property](#)

class_name: optional string

Class name of the Workflow. Should only be provided if the Workflow belongs to this script.

[Link to this property](#)

script_name: optional string

Script name that contains the Workflow. If not provided, defaults to this script name.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

WasmModule object { name, part, type }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

part: string

The name of the file containing the WebAssembly module content. Only accepted for `service worker syntax` Workers.

[Link to this property](#)

Deprecatedtype: "wasm_module"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

VPCService object { name, service_id, type }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

service_id: string

Identifier of the VPC service to bind to.

[Link to this property](#)

type: "vpc_service"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

VPCNetwork object { name, type, identity, 2 more }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

type: "vpc_network"

The kind of resource that the binding provides.

[Link to this property](#)

identity: optional "runtime-email-alpha"

Enables Gateway identity for the binding. Requires network_id to be “cf1:network” and cannot be combined with tunnel_id.

[Link to this property](#)

network_id: optional string

Identifier of the network to bind to. Only “cf1:network” is currently supported. Mutually exclusive with tunnel_id.

[Link to this property](#)

tunnel_id: optional string

UUID of the Cloudflare Tunnel to bind to. Mutually exclusive with network_id.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

cache_options: optional object { enabled, cross_version_cache }

Global CacheW configuration for the Worker. When caching is on, the platform provisions a `cloudflare.app` zone for the Worker. A `type: worker` entry in the `exports` map can override this value for a single entrypoint.

</summary>

enabled: boolean

Whether caching is enabled for this Worker.

[Link to this property](#)

cross_version_cache: optional boolean

Whether cached responses are shared across Worker version uploads. This is independent of `enabled`. It can stay true while caching is off, so the preference survives turning caching off and back on.

[Link to this property](#)

</details>

[Link to this property](#)

compatibility_date: optional string

Date indicating targeted support in the Workers runtime. Backwards incompatible fixes to the runtime following this date will not affect this Worker.

[Link to this property](#)

compatibility_flags: optional array of string

Flags that enable or disable certain features in the Workers runtime. Used to enable upcoming features or opt in or out of specific changes not included in a `compatibility_date`.

[Link to this property](#)

<details>

<summary>

containers: optional array of object { class_name }

List of containers attached to a Worker. Containers can only be attached to Durable Object classes of this Worker script.

</summary>

class_name: string

Select which Durable Object class should get this container attached.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

exports: optional map[object { type, cache, state } or object { storage, type, container, state } or object { state, type } or 3 more]

Declarative exports for the version, including Durable Object classes (with their `storage` backend) and named Worker entrypoints. On reads, tombstoned lifecycle entries are omitted, so only live exports (`created` and `expecting-transfer`) are returned. `exports` and `migrations` are mutually exclusive on upload.

</summary>

One of the following:

<details>

<summary>

Worker object { type, cache, state }

A named Worker entrypoint export (`type: worker`). Worker entrypoints are always live (`state: created`) and carry no storage or lifecycle fields. The optional `cache` block overrides the Worker’s global `cache_options.enabled` for this entrypoint.

</summary>

type: "worker"

Marks this entry as a Worker entrypoint export.

[Link to this property](#)

<details>

<summary>

cache: optional object { enabled }

Cache override for this entrypoint. Overrides the Worker’s global `cache_options.enabled` for this entrypoint only.

</summary>

enabled: boolean

Whether caching is enabled for this entrypoint.

[Link to this property](#)

</details>

[Link to this property](#)

state: optional "created"

Live export. May be omitted; defaults to `created`.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

WorkersDurableObjectExport object { storage, type, container, state }

A live Durable Object export (`state: created`, the default). The platform auto-provisions the namespace on first deploy, matches it on subsequent deploys, and never mutates or deletes it as a side effect of a code-only change. `storage` is required; `renamed_to`, `transferred_to` and `transfer_from` are not allowed on a live entry.

</summary>

<details>

<summary>

storage: "sqlite" or "legacy-kv"

Durable Object storage backend. `sqlite` is the recommended (and only) backend for new namespaces. `legacy-kv` is accepted only for a class whose namespace already exists as KV-backed; the `exports` flow never provisions a new `legacy-kv` namespace.

</summary>

One of the following:

"sqlite"

[Link to this property](#)

"legacy-kv"

[Link to this property](#)

</details>

[Link to this property](#)

type: "durable-object"

Marks this entry as a Durable Object export.

[Link to this property](#)

container: optional string

Name of the container (declared in the upload’s `metadata.containers`) that backs this Durable Object. When set, the namespace is container-enabled. Valid only on live entries.

maxLength128

[Link to this property](#)

state: optional "created"

Live export. May be omitted; defaults to `created`.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

WorkersDurableObjectDeletedExport object { state, type }

A `deleted` tombstone: retires the provisioned namespace for this class and all of its data. The class must be absent from the uploaded code and no other Worker in the account may bind to the namespace, otherwise the deploy is rejected. No other fields are allowed. Deletion is irreversible.

</summary>

state: "deleted"

Tombstone that deletes the namespace.

[Link to this property](#)

type: "durable-object"

Marks this entry as a Durable Object export.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

WorkersDurableObjectRenamedExport object { renamed_to, state, type }

A `renamed` tombstone: rewrites the provisioned namespace’s class name from this map key to `renamed_to`. The source class may stay in code during the rollout window (an info notice is emitted). `storage`, `transferred_to` and `transfer_from` are not allowed.

</summary>

renamed_to: string

The destination class name. Must differ from the source class (the map key) and must be declared as a live (`created`) entry in the same `exports` map. Write-only: never present in GET responses.

maxLength128

[Link to this property](#)

state: "renamed"

Tombstone that renames the namespace’s class.

[Link to this property](#)

type: "durable-object"

Marks this entry as a Durable Object export.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

WorkersDurableObjectTransferredExport object { state, transferred_to, type }

A `transferred` tombstone (source side of a two-phase transfer): hands ownership of the provisioned namespace to another script in the same account, named by `transferred_to`. The target must have already deployed a matching `expecting-transfer` entry. The source class may stay in code during the rollout window (an info notice is emitted). `storage`, `renamed_to` and `transfer_from` are not allowed.

</summary>

state: "transferred"

Tombstone that transfers the namespace to another script.

[Link to this property](#)

transferred_to: string

The destination script name. Must be in the same account and the same dispatch-namespace context (or both non-dispatch). Cross-dispatch-namespace transfers are rejected. Write-only: never present in GET responses.

maxLength128

[Link to this property](#)

type: "durable-object"

Marks this entry as a Durable Object export.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

WorkersDurableObjectExpectingTransferExport object { state, storage, transfer_from, 2 more }

The target side of a two-phase transfer (`state: expecting-transfer`). Declares that this script expects to receive a namespace for this class from the `transfer_from` script. This is a live entry, not a tombstone: bindings resolve through the source’s namespace until the source commits with a `transferred` tombstone. `storage` and `transfer_from` are required; `renamed_to` and `transferred_to` are not allowed.

</summary>

state: "expecting-transfer"

Target side of a two-phase transfer.

[Link to this property](#)

<details>

<summary>

storage: "sqlite" or "legacy-kv"

Durable Object storage backend. `sqlite` is the recommended (and only) backend for new namespaces. `legacy-kv` is accepted only for a class whose namespace already exists as KV-backed; the `exports` flow never provisions a new `legacy-kv` namespace.

</summary>

One of the following:

"sqlite"

[Link to this property](#)

"legacy-kv"

[Link to this property](#)

</details>

[Link to this property](#)

transfer_from: string

The source script name to receive the namespace from. Must be in the same account and dispatch-namespace context. Present on reads for `expecting-transfer` entries.

maxLength128

[Link to this property](#)

type: "durable-object"

Marks this entry as a Durable Object export.

[Link to this property](#)

container: optional string

Name of the container (declared in the upload’s `metadata.containers`) that backs this Durable Object once the transfer settles. Valid only on live entries.

maxLength128

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

exports_reconciliation: optional object { created, deleted, info, 6 more }

Summary of the declarative exports reconciliation that ran on this upload. Populated only when the uploaded metadata included an `exports` block. Durable Object entries drive reconciliation; `type: worker` entries do not contribute to this summary.

</summary>

created: array of string

Class names for which a new namespace was provisioned.

[Link to this property](#)

deleted: array of string

Class names whose namespace was deleted by a `deleted` tombstone.

[Link to this property](#)

<details>

<summary>

info: array of object { class, message, scenario, 2 more }

Non-blocking info entries (stale tombstones, tombstone applied with class still in code). See `exports_reconciliation_info`.

</summary>

class: string

The class name the info entry is about.

[Link to this property](#)

message: string

Human-readable explanation.

[Link to this property](#)

<details>

<summary>

scenario: "code_class_not_in_exports" or "provisioned_class_missing_from_config" or "config_export_not_in_code" or 30 more

Stable, machine-readable tag identifying which reconciliation scenario produced an error, warning, or info entry. Clients may branch on this value instead of parsing `message`.

</summary>

One of the following:

"code_class_not_in_exports"

[Link to this property](#)

"provisioned_class_missing_from_config"

[Link to this property](#)

"config_export_not_in_code"

[Link to this property](#)

"config_references_nonexistent_class"

[Link to this property](#)

"orphaned_provisioned_namespace"

[Link to this property](#)

"storage_type_mismatch"

[Link to this property](#)

"free_tier_requires_sqlite"

[Link to this property](#)

"invalid_export"

[Link to this property](#)

"tombstone_delete_class_still_in_code"

[Link to this property](#)

"tombstone_delete_blocked_by_external_bindings"

[Link to this property](#)

"tombstone_renamed_to_occupied"

[Link to this property](#)

"transferred_pending_not_found"

[Link to this property](#)

"transferred_target_missing"

[Link to this property](#)

"transferred_target_mismatch"

[Link to this property](#)

"phase_one_transfer_source_missing"

[Link to this property](#)

"phase_one_transfer_source_namespace_missing"

[Link to this property](#)

"phase_one_transfer_target_class_provisioned"

[Link to this property](#)

"phase_one_transfer_after_commit_mismatch"

[Link to this property](#)

"phase_one_transfer_duplicate"

[Link to this property](#)

"phase_one_transfer_target_in_dispatch_namespace"

[Link to this property](#)

"phase_one_transfer_source_in_dispatch_namespace"

[Link to this property](#)

"transferred_source_in_dispatch_namespace"

[Link to this property](#)

"transferred_target_in_dispatch_namespace"

[Link to this property](#)

"container_undeclared_reference"

[Link to this property](#)

"container_class_not_durable_object"

[Link to this property](#)

"container_wiring_inconsistent"

[Link to this property](#)

"container_multiple_durable_objects"

[Link to this property](#)

"transfer_container_parity_mismatch"

[Link to this property](#)

"transfer_container_parity_mismatch_on_commit"

[Link to this property](#)

"tombstone_class_still_in_code"

[Link to this property](#)

"stale_tombstone"

[Link to this property](#)

"transfer_receive_already_applied"

[Link to this property](#)

"transfer_receive_cleanup_complete"

[Link to this property](#)

</details>

[Link to this property](#)

namespace_id: optional string

The provisioned namespace the entry relates to, when applicable.

formatuuid

[Link to this property](#)

referencing_scripts: optional array of string

Other Workers in the account that still bind to the affected class. Advisory: while non-empty the tombstone is not yet safe to remove — redeploy these Workers with bindings re-pointed first.

[Link to this property](#)

</details>

[Link to this property](#)

removable_entries: array of string

Source class names whose tombstone entry is now stale and safe to delete from `exports` (no remaining referencing scripts).

[Link to this property](#)

<details>

<summary>

renamed: array of object { from, to }

Applied `renamed` tombstones.

</summary>

from: string

The original (source) class name.

[Link to this property](#)

to: string

The new class name (`renamed_to`).

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

transfer_pending: array of object { class, from }

Phase-1 transfer hints recorded on the target side.

</summary>

class: string

The target-side class name awaiting transfer.

[Link to this property](#)

from: string

The source script the namespace will be transferred from.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

transferred: array of object { class, phase, to }

Committed `transferred` tombstones (phase-2).

</summary>

class: string

The source class name that was transferred.

[Link to this property](#)

phase: "committed"

The transfer phase. Currently always `committed`.

[Link to this property](#)

to: string

The destination script that now owns the namespace.

[Link to this property](#)

</details>

[Link to this property](#)

updated: array of string

Class names whose provisioned namespace was mutated in place.

[Link to this property](#)

<details>

<summary>

warnings: array of object { class, message, scenario, namespace_id }

Non-blocking warnings. See `exports_reconciliation_warning`.

</summary>

class: string

The class name the warning is about.

[Link to this property](#)

message: string

Human-readable explanation of the warning.

[Link to this property](#)

<details>

<summary>

scenario: "code_class_not_in_exports" or "provisioned_class_missing_from_config" or "config_export_not_in_code" or 30 more

Stable, machine-readable tag identifying which reconciliation scenario produced an error, warning, or info entry. Clients may branch on this value instead of parsing `message`.

</summary>

One of the following:

"code_class_not_in_exports"

[Link to this property](#)

"provisioned_class_missing_from_config"

[Link to this property](#)

"config_export_not_in_code"

[Link to this property](#)

"config_references_nonexistent_class"

[Link to this property](#)

"orphaned_provisioned_namespace"

[Link to this property](#)

"storage_type_mismatch"

[Link to this property](#)

"free_tier_requires_sqlite"

[Link to this property](#)

"invalid_export"

[Link to this property](#)

"tombstone_delete_class_still_in_code"

[Link to this property](#)

"tombstone_delete_blocked_by_external_bindings"

[Link to this property](#)

"tombstone_renamed_to_occupied"

[Link to this property](#)

"transferred_pending_not_found"

[Link to this property](#)

"transferred_target_missing"

[Link to this property](#)

"transferred_target_mismatch"

[Link to this property](#)

"phase_one_transfer_source_missing"

[Link to this property](#)

"phase_one_transfer_source_namespace_missing"

[Link to this property](#)

"phase_one_transfer_target_class_provisioned"

[Link to this property](#)

"phase_one_transfer_after_commit_mismatch"

[Link to this property](#)

"phase_one_transfer_duplicate"

[Link to this property](#)

"phase_one_transfer_target_in_dispatch_namespace"

[Link to this property](#)

"phase_one_transfer_source_in_dispatch_namespace"

[Link to this property](#)

"transferred_source_in_dispatch_namespace"

[Link to this property](#)

"transferred_target_in_dispatch_namespace"

[Link to this property](#)

"container_undeclared_reference"

[Link to this property](#)

"container_class_not_durable_object"

[Link to this property](#)

"container_wiring_inconsistent"

[Link to this property](#)

"container_multiple_durable_objects"

[Link to this property](#)

"transfer_container_parity_mismatch"

[Link to this property](#)

"transfer_container_parity_mismatch_on_commit"

[Link to this property](#)

"tombstone_class_still_in_code"

[Link to this property](#)

"stale_tombstone"

[Link to this property](#)

"transfer_receive_already_applied"

[Link to this property](#)

"transfer_receive_cleanup_complete"

[Link to this property](#)

</details>

[Link to this property](#)

namespace_id: optional string

The provisioned namespace the warning relates to, when applicable.

formatuuid

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

limits: optional object { cpu_ms, subrequests }

Resource limits enforced at runtime.

</summary>

cpu_ms: optional number

CPU time limit in milliseconds.

[Link to this property](#)

subrequests: optional number

Subrequest limit per request.

[Link to this property](#)

</details>

[Link to this property](#)

main_module: optional string

The name of the main module in the `modules` array (e.g. the name of the module that exports a `fetch` handler).

[Link to this property](#)

migration_tag: optional string

Durable Object migration tag. Set when the version is deployed. Omitted if the version has not been deployed or the Worker does not use Durable Objects.

[Link to this property](#)

<details>

<summary>

migrations: optional [SingleStepMigration](/api/resources/workers#(resource)%20workers%20%3E%20(model)%20single_step_migration%20%3E%20(schema)) { deleted_classes, new_classes, new_sqlite_classes, 4 more } or object { new_tag, old_tag, steps }

Migrations for Durable Objects associated with the version. Migrations are applied when the version is deployed.

</summary>

One of the following:

<details>

<summary>

SingleStepMigration object { deleted_classes, new_classes, new_sqlite_classes, 4 more }

A single set of migrations to apply.

</summary>

deleted_classes: optional array of string

A list of classes to delete Durable Object namespaces from.

[Link to this property](#)

new_classes: optional array of string

A list of classes to create Durable Object namespaces from.

[Link to this property](#)

new_sqlite_classes: optional array of string

A list of classes to create Durable Object namespaces with SQLite from.

[Link to this property](#)

new_tag: optional string

Tag to set as the latest migration tag.

[Link to this property](#)

old_tag: optional string

Tag used to verify against the latest migration tag for this Worker. If they don’t match, the upload is rejected.

[Link to this property](#)

<details>

<summary>

renamed_classes: optional array of object { from, to }

A list of classes with Durable Object namespaces that were renamed.

</summary>

from: optional string

[Link to this property](#)

to: optional string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

transferred_classes: optional array of object { from, from_script, to }

A list of transfers for Durable Object namespaces from a different Worker and class to a class defined in this Worker.

</summary>

from: optional string

[Link to this property](#)

from_script: optional string

[Link to this property](#)

to: optional string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

WorkersMultipleStepMigrations object { new_tag, old_tag, steps }

</summary>

new_tag: optional string

Tag to set as the latest migration tag.

[Link to this property](#)

old_tag: optional string

Tag used to verify against the latest migration tag for this Worker. If they don’t match, the upload is rejected.

[Link to this property](#)

<details>

<summary>

steps: optional array of [MigrationStep](/api/resources/workers#(resource)%20workers%20%3E%20(model)%20migration_step%20%3E%20(schema)) { deleted_classes, new_classes, new_sqlite_classes, 2 more }

Migrations to apply in order.

</summary>

deleted_classes: optional array of string

A list of classes to delete Durable Object namespaces from.

[Link to this property](#)

new_classes: optional array of string

A list of classes to create Durable Object namespaces from.

[Link to this property](#)

new_sqlite_classes: optional array of string

A list of classes to create Durable Object namespaces with SQLite from.

[Link to this property](#)

<details>

<summary>

renamed_classes: optional array of object { from, to }

A list of classes with Durable Object namespaces that were renamed.

</summary>

from: optional string

[Link to this property](#)

to: optional string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

transferred_classes: optional array of object { from, from_script, to }

A list of transfers for Durable Object namespaces from a different Worker and class to a class defined in this Worker.

</summary>

from: optional string

[Link to this property](#)

from_script: optional string

[Link to this property](#)

to: optional string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

modules: optional array of object { content_base64, content_type, name }

Code, sourcemaps, and other content used at runtime.

This includes [`_headers`](https://developers.cloudflare.com/workers/static-assets/headers/#custom-headers) and [`_redirects`](https://developers.cloudflare.com/workers/static-assets/redirects/) files used to configure [Static Assets](https://developers.cloudflare.com/workers/static-assets/). `_headers` and `_redirects` files should be included as modules named `_headers` and `_redirects` with content type `text/plain`.

</summary>

content_base64: string

The base64-encoded module content.

formatbyte

[Link to this property](#)

content_type: string

The content type of the module.

[Link to this property](#)

name: string

The name of the module.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

package_dependencies: optional array of object { installedVersion, name, packageJsonVersion }

The list of npm packages that were installed and used when this Worker version was built.

</summary>

installedVersion: string

The exact version that was resolved and installed by the package manager.

[Link to this property](#)

name: string

The npm package name.

[Link to this property](#)

packageJsonVersion: string

The version constraint as written in package.json.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

placement: optional object { mode } or object { region } or object { hostname } or 5 more

Configuration for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement). Specify mode=‘smart’ for Smart Placement, or one of region/hostname/host.

</summary>

One of the following:

<details>

<summary>

Mode object { mode }

</summary>

mode: "smart"

Enables [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Region object { region }

</summary>

region: string

Cloud region for targeted placement in format ‘provider:region’.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Hostname object { hostname }

</summary>

hostname: string

HTTP hostname for targeted placement.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Host object { host }

</summary>

host: string

TCP host and port for targeted placement.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

object { mode, region }

</summary>

mode: "targeted"

Targeted placement mode.

[Link to this property](#)

region: string

Cloud region for targeted placement in format ‘provider:region’.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

object { hostname, mode }

</summary>

hostname: string

HTTP hostname for targeted placement.

[Link to this property](#)

mode: "targeted"

Targeted placement mode.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

object { host, mode }

</summary>

host: string

TCP host and port for targeted placement.

[Link to this property](#)

mode: "targeted"

Targeted placement mode.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

object { mode, target }

</summary>

mode: "targeted"

Targeted placement mode.

[Link to this property](#)

<details>

<summary>

target: array of object { region } or object { hostname } or object { host }

Array of placement targets (currently limited to single target).

</summary>

One of the following:

<details>

<summary>

Region object { region }

</summary>

region: string

Cloud region in format ‘provider:region’.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Hostname object { hostname }

</summary>

hostname: string

HTTP hostname for targeted placement.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Host object { host }

</summary>

host: string

TCP host:port for targeted placement.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

source: optional string

The client used to create the version.

[Link to this property](#)

startup_time_ms: optional number

Time in milliseconds spent on [Worker startup](https://developers.cloudflare.com/workers/platform/limits/#worker-startup-time).

[Link to this property](#)

<details>

<summary>

Deprecatedusage_model: optional "standard" or "bundled" or "unbound"

Usage model for the version.

</summary>

One of the following:

"standard"

[Link to this property](#)

"bundled"

[Link to this property](#)

"unbound"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

VersionDeleteResponse object { errors, messages, success }

</summary>

<details>

<summary>

errors: array of object { code, message, documentation_url, source }

</summary>

code: number

minimum1000

[Link to this property](#)

message: string

[Link to this property](#)

documentation_url: optional string

[Link to this property](#)

<details>

<summary>

source: optional object { pointer }

</summary>

pointer: optional string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

messages: array of object { code, message, documentation_url, source }

</summary>

code: number

minimum1000

[Link to this property](#)

message: string

[Link to this property](#)

documentation_url: optional string

[Link to this property](#)

<details>

<summary>

source: optional object { pointer }

</summary>

pointer: optional string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

success: true

Whether the API call was successful.

[Link to this property](#)

</details>

[Link to this property](#)

##### [List Routes](/api/resources/workers/subresources/routes/methods/list)

GET/zones/{zone_id}/workers/routes

##### [Get Route](/api/resources/workers/subresources/routes/methods/get)

GET/zones/{zone_id}/workers/routes/{route_id}

##### [Create Route](/api/resources/workers/subresources/routes/methods/create)

POST/zones/{zone_id}/workers/routes

##### [Update Route](/api/resources/workers/subresources/routes/methods/update)

PUT/zones/{zone_id}/workers/routes/{route_id}

##### [Delete Route](/api/resources/workers/subresources/routes/methods/delete)

DELETE/zones/{zone_id}/workers/routes/{route_id}

##### Models

<details>

<summary>

RouteListResponse object { id, pattern, script }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

pattern: string

Pattern to match incoming requests against. [Learn more](https://developers.cloudflare.com/workers/configuration/routing/routes/#matching-behavior).

[Link to this property](#)

script: optional string

Name of the script to run if the route matches.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RouteGetResponse object { id, pattern, script }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

pattern: string

Pattern to match incoming requests against. [Learn more](https://developers.cloudflare.com/workers/configuration/routing/routes/#matching-behavior).

[Link to this property](#)

script: optional string

Name of the script to run if the route matches.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RouteCreateResponse object { id, pattern, script }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

pattern: string

Pattern to match incoming requests against. [Learn more](https://developers.cloudflare.com/workers/configuration/routing/routes/#matching-behavior).

[Link to this property](#)

script: optional string

Name of the script to run if the route matches.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RouteUpdateResponse object { id, pattern, script }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

pattern: string

Pattern to match incoming requests against. [Learn more](https://developers.cloudflare.com/workers/configuration/routing/routes/#matching-behavior).

[Link to this property](#)

script: optional string

Name of the script to run if the route matches.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RouteDeleteResponse object { id }

</summary>

id: optional string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

##### [Upload Assets](/api/resources/workers/subresources/assets/subresources/upload/methods/create)

POST/accounts/{account_id}/workers/assets/upload

##### Models

<details>

<summary>

UploadCreateResponse object { jwt }

</summary>

jwt: optional string

A “completion” JWT which can be redeemed when creating a Worker version.

[Link to this property](#)

</details>

[Link to this property](#)

##### [List Workers](/api/resources/workers/subresources/scripts/methods/list)

GET/accounts/{account_id}/workers/scripts

##### [Search Workers](/api/resources/workers/subresources/scripts/methods/search)

GET/accounts/{account_id}/workers/scripts-search

##### [Download Worker](/api/resources/workers/subresources/scripts/methods/get)

GET/accounts/{account_id}/workers/scripts/{script_name}

##### [Upload Worker Module](/api/resources/workers/subresources/scripts/methods/update)

PUT/accounts/{account_id}/workers/scripts/{script_name}

##### [Delete Worker](/api/resources/workers/subresources/scripts/methods/delete)

DELETE/accounts/{account_id}/workers/scripts/{script_name}

##### Models

<details>

<summary>

Script object { id, cache_options, compatibility_date, 20 more }

</summary>

id: optional string

The name used to identify the script.

[Link to this property](#)

<details>

<summary>

cache_options: optional object { enabled, cross_version_cache }

Global CacheW configuration for the Worker. When caching is on, the platform provisions a `cloudflare.app` zone for the Worker. A `type: worker` entry in the `exports` map can override this value for a single entrypoint.

</summary>

enabled: boolean

Whether caching is enabled for this Worker.

[Link to this property](#)

cross_version_cache: optional boolean

Whether cached responses are shared across Worker version uploads. This is independent of `enabled`. It can stay true while caching is off, so the preference survives turning caching off and back on.

[Link to this property](#)

</details>

[Link to this property](#)

compatibility_date: optional string

Date indicating targeted support in the Workers runtime. Backwards incompatible fixes to the runtime following this date will not affect this Worker.

[Link to this property](#)

compatibility_flags: optional array of string

Flags that enable or disable certain features in the Workers runtime. Used to enable upcoming features or opt in or out of specific changes not included in a `compatibility_date`.

[Link to this property](#)

created_on: optional string

When the script was created.

formatdate-time

[Link to this property](#)

etag: optional string

Hashed script content, can be used in a If-None-Match header when updating.

[Link to this property](#)

<details>

<summary>

exports: optional map[object { type, cache, state } or object { storage, type, container, state } or object { state, type } or 3 more]

Declarative exports for the Worker’s most recent version, including Durable Object classes (with their `storage` backend) and named Worker entrypoints. Tombstoned lifecycle entries are omitted, so only live exports (`created` and `expecting-transfer`) are returned.

</summary>

One of the following:

<details>

<summary>

Worker object { type, cache, state }

A named Worker entrypoint export (`type: worker`). Worker entrypoints are always live (`state: created`) and carry no storage or lifecycle fields. The optional `cache` block overrides the Worker’s global `cache_options.enabled` for this entrypoint.

</summary>

type: "worker"

Marks this entry as a Worker entrypoint export.

[Link to this property](#)

<details>

<summary>

cache: optional object { enabled }

Cache override for this entrypoint. Overrides the Worker’s global `cache_options.enabled` for this entrypoint only.

</summary>

enabled: boolean

Whether caching is enabled for this entrypoint.

[Link to this property](#)

</details>

[Link to this property](#)

state: optional "created"

Live export. May be omitted; defaults to `created`.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

WorkersDurableObjectExport object { storage, type, container, state }

A live Durable Object export (`state: created`, the default). The platform auto-provisions the namespace on first deploy, matches it on subsequent deploys, and never mutates or deletes it as a side effect of a code-only change. `storage` is required; `renamed_to`, `transferred_to` and `transfer_from` are not allowed on a live entry.

</summary>

<details>

<summary>

storage: "sqlite" or "legacy-kv"

Durable Object storage backend. `sqlite` is the recommended (and only) backend for new namespaces. `legacy-kv` is accepted only for a class whose namespace already exists as KV-backed; the `exports` flow never provisions a new `legacy-kv` namespace.

</summary>

One of the following:

"sqlite"

[Link to this property](#)

"legacy-kv"

[Link to this property](#)

</details>

[Link to this property](#)

type: "durable-object"

Marks this entry as a Durable Object export.

[Link to this property](#)

container: optional string

Name of the container (declared in the upload’s `metadata.containers`) that backs this Durable Object. When set, the namespace is container-enabled. Valid only on live entries.

maxLength128

[Link to this property](#)

state: optional "created"

Live export. May be omitted; defaults to `created`.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

WorkersDurableObjectDeletedExport object { state, type }

A `deleted` tombstone: retires the provisioned namespace for this class and all of its data. The class must be absent from the uploaded code and no other Worker in the account may bind to the namespace, otherwise the deploy is rejected. No other fields are allowed. Deletion is irreversible.

</summary>

state: "deleted"

Tombstone that deletes the namespace.

[Link to this property](#)

type: "durable-object"

Marks this entry as a Durable Object export.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

WorkersDurableObjectRenamedExport object { renamed_to, state, type }

A `renamed` tombstone: rewrites the provisioned namespace’s class name from this map key to `renamed_to`. The source class may stay in code during the rollout window (an info notice is emitted). `storage`, `transferred_to` and `transfer_from` are not allowed.

</summary>

renamed_to: string

The destination class name. Must differ from the source class (the map key) and must be declared as a live (`created`) entry in the same `exports` map. Write-only: never present in GET responses.

maxLength128

[Link to this property](#)

state: "renamed"

Tombstone that renames the namespace’s class.

[Link to this property](#)

type: "durable-object"

Marks this entry as a Durable Object export.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

WorkersDurableObjectTransferredExport object { state, transferred_to, type }

A `transferred` tombstone (source side of a two-phase transfer): hands ownership of the provisioned namespace to another script in the same account, named by `transferred_to`. The target must have already deployed a matching `expecting-transfer` entry. The source class may stay in code during the rollout window (an info notice is emitted). `storage`, `renamed_to` and `transfer_from` are not allowed.

</summary>

state: "transferred"

Tombstone that transfers the namespace to another script.

[Link to this property](#)

transferred_to: string

The destination script name. Must be in the same account and the same dispatch-namespace context (or both non-dispatch). Cross-dispatch-namespace transfers are rejected. Write-only: never present in GET responses.

maxLength128

[Link to this property](#)

type: "durable-object"

Marks this entry as a Durable Object export.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

WorkersDurableObjectExpectingTransferExport object { state, storage, transfer_from, 2 more }

The target side of a two-phase transfer (`state: expecting-transfer`). Declares that this script expects to receive a namespace for this class from the `transfer_from` script. This is a live entry, not a tombstone: bindings resolve through the source’s namespace until the source commits with a `transferred` tombstone. `storage` and `transfer_from` are required; `renamed_to` and `transferred_to` are not allowed.

</summary>

state: "expecting-transfer"

Target side of a two-phase transfer.

[Link to this property](#)

<details>

<summary>

storage: "sqlite" or "legacy-kv"

Durable Object storage backend. `sqlite` is the recommended (and only) backend for new namespaces. `legacy-kv` is accepted only for a class whose namespace already exists as KV-backed; the `exports` flow never provisions a new `legacy-kv` namespace.

</summary>

One of the following:

"sqlite"

[Link to this property](#)

"legacy-kv"

[Link to this property](#)

</details>

[Link to this property](#)

transfer_from: string

The source script name to receive the namespace from. Must be in the same account and dispatch-namespace context. Present on reads for `expecting-transfer` entries.

maxLength128

[Link to this property](#)

type: "durable-object"

Marks this entry as a Durable Object export.

[Link to this property](#)

container: optional string

Name of the container (declared in the upload’s `metadata.containers`) that backs this Durable Object once the transfer settles. Valid only on live entries.

maxLength128

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

handlers: optional array of string

The names of handlers exported as part of the default export.

[Link to this property](#)

has_assets: optional boolean

Whether a Worker contains assets.

[Link to this property](#)

has_modules: optional boolean

Whether a Worker contains modules.

[Link to this property](#)

last_deployed_from: optional string

The client most recently used to deploy this Worker.

[Link to this property](#)

logpush: optional boolean

Whether Logpush is turned on for the Worker.

[Link to this property](#)

migration_tag: optional string

The tag of the Durable Object migration that was most recently applied for this Worker.

[Link to this property](#)

modified_on: optional string

When the script was last modified.

formatdate-time

[Link to this property](#)

<details>

<summary>

named_handlers: optional array of object { handlers, name }

Named exports, such as Durable Object class implementations and named entrypoints.

</summary>

handlers: optional array of string

The names of handlers exported as part of the named export.

[Link to this property](#)

name: optional string

The name of the export.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

observability: optional object { enabled, head_sampling_rate, logs, 2 more }

Observability settings for the Worker.

</summary>

enabled: boolean

Whether observability is enabled for the Worker.

[Link to this property](#)

head_sampling_rate: optional number

The sampling rate for incoming requests. From 0 to 1 (1 = 100%, 0.1 = 10%). Default is 1.

[Link to this property](#)

<details>

<summary>

logs: optional object { enabled, invocation_logs, destinations, 2 more }

Log settings for the Worker.

</summary>

enabled: boolean

Whether logs are enabled for the Worker.

[Link to this property](#)

invocation_logs: boolean

Whether [invocation logs](https://developers.cloudflare.com/workers/observability/logs/workers-logs/#invocation-logs) are enabled for the Worker.

[Link to this property](#)

destinations: optional array of string

A list of destinations where logs will be exported to.

[Link to this property](#)

head_sampling_rate: optional number

The sampling rate for logs. From 0 to 1 (1 = 100%, 0.1 = 10%). Default is 1.

[Link to this property](#)

persist: optional boolean

Whether log persistence is enabled for the Worker.

[Link to this property](#)

</details>

[Link to this property](#)

redact_query_string: optional boolean

Whether query strings are removed from request URLs in logs and traces.

[Link to this property](#)

<details>

<summary>

traces: optional object { destinations, enabled, head_sampling_rate, 2 more }

Trace settings for the Worker.

</summary>

destinations: optional array of string

A list of destinations where traces will be exported to.

[Link to this property](#)

enabled: optional boolean

Whether traces are enabled for the Worker.

[Link to this property](#)

head_sampling_rate: optional number

The sampling rate for traces. From 0 to 1 (1 = 100%, 0.1 = 10%). Default is 1.

[Link to this property](#)

persist: optional boolean

Whether trace persistence is enabled for the Worker.

[Link to this property](#)

<details>

<summary>

propagation_policy: optional "authenticated" or "accept"

Controls how inbound trace context (traceparent/tracestate) headers on incoming requests are handled. “authenticated” honors inbound trace context only when accompanied by a valid trace auth token. “accept” unconditionally accepts inbound trace context. Requires the trace propagation feature to be enabled. Returns null when the trace propagation feature is not enabled for the account.

</summary>

One of the following:

"authenticated"

[Link to this property](#)

"accept"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

placement: optional object { mode, last_analyzed_at, status } or object { region, last_analyzed_at, status } or object { hostname, last_analyzed_at, status } or 5 more

Configuration for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement). Specify mode=‘smart’ for Smart Placement, or one of region/hostname/host.

</summary>

One of the following:

<details>

<summary>

object { mode, last_analyzed_at, status }

</summary>

mode: "smart"

Enables [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

[Link to this property](#)

last_analyzed_at: optional string

The last time the script was analyzed for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

formatdate-time

[Link to this property](#)

<details>

<summary>

status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"

Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

</summary>

One of the following:

"SUCCESS"

[Link to this property](#)

"UNSUPPORTED_APPLICATION"

[Link to this property](#)

"INSUFFICIENT_INVOCATIONS"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

object { region, last_analyzed_at, status }

</summary>

region: string

Cloud region for targeted placement in format ‘provider:region’.

[Link to this property](#)

last_analyzed_at: optional string

The last time the script was analyzed for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

formatdate-time

[Link to this property](#)

<details>

<summary>

status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"

Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

</summary>

One of the following:

"SUCCESS"

[Link to this property](#)

"UNSUPPORTED_APPLICATION"

[Link to this property](#)

"INSUFFICIENT_INVOCATIONS"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

object { hostname, last_analyzed_at, status }

</summary>

hostname: string

HTTP hostname for targeted placement.

[Link to this property](#)

last_analyzed_at: optional string

The last time the script was analyzed for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

formatdate-time

[Link to this property](#)

<details>

<summary>

status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"

Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

</summary>

One of the following:

"SUCCESS"

[Link to this property](#)

"UNSUPPORTED_APPLICATION"

[Link to this property](#)

"INSUFFICIENT_INVOCATIONS"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

object { host, last_analyzed_at, status }

</summary>

host: string

TCP host and port for targeted placement.

[Link to this property](#)

last_analyzed_at: optional string

The last time the script was analyzed for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

formatdate-time

[Link to this property](#)

<details>

<summary>

status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"

Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

</summary>

One of the following:

"SUCCESS"

[Link to this property](#)

"UNSUPPORTED_APPLICATION"

[Link to this property](#)

"INSUFFICIENT_INVOCATIONS"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

object { mode, region, last_analyzed_at, status }

</summary>

mode: "targeted"

Targeted placement mode.

[Link to this property](#)

region: string

Cloud region for targeted placement in format ‘provider:region’.

[Link to this property](#)

last_analyzed_at: optional string

The last time the script was analyzed for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

formatdate-time

[Link to this property](#)

<details>

<summary>

status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"

Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

</summary>

One of the following:

"SUCCESS"

[Link to this property](#)

"UNSUPPORTED_APPLICATION"

[Link to this property](#)

"INSUFFICIENT_INVOCATIONS"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

object { hostname, mode, last_analyzed_at, status }

</summary>

hostname: string

HTTP hostname for targeted placement.

[Link to this property](#)

mode: "targeted"

Targeted placement mode.

[Link to this property](#)

last_analyzed_at: optional string

The last time the script was analyzed for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

formatdate-time

[Link to this property](#)

<details>

<summary>

status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"

Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

</summary>

One of the following:

"SUCCESS"

[Link to this property](#)

"UNSUPPORTED_APPLICATION"

[Link to this property](#)

"INSUFFICIENT_INVOCATIONS"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

object { host, mode, last_analyzed_at, status }

</summary>

host: string

TCP host and port for targeted placement.

[Link to this property](#)

mode: "targeted"

Targeted placement mode.

[Link to this property](#)

last_analyzed_at: optional string

The last time the script was analyzed for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

formatdate-time

[Link to this property](#)

<details>

<summary>

status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"

Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

</summary>

One of the following:

"SUCCESS"

[Link to this property](#)

"UNSUPPORTED_APPLICATION"

[Link to this property](#)

"INSUFFICIENT_INVOCATIONS"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

object { mode, target, last_analyzed_at, status }

</summary>

mode: "targeted"

Targeted placement mode.

[Link to this property](#)

<details>

<summary>

target: array of object { region } or object { hostname } or object { host }

Array of placement targets (currently limited to single target).

</summary>

One of the following:

<details>

<summary>

Region object { region }

</summary>

region: string

Cloud region in format ‘provider:region’.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Hostname object { hostname }

</summary>

hostname: string

HTTP hostname for targeted placement.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Host object { host }

</summary>

host: string

TCP host:port for targeted placement.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

last_analyzed_at: optional string

The last time the script was analyzed for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

formatdate-time

[Link to this property](#)

<details>

<summary>

status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"

Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

</summary>

One of the following:

"SUCCESS"

[Link to this property](#)

"UNSUPPORTED_APPLICATION"

[Link to this property](#)

"INSUFFICIENT_INVOCATIONS"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Deprecatedplacement_mode: optional "smart" or "targeted"

Configuration for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement). Specify mode=‘smart’ for Smart Placement, or one of region/hostname/host.

</summary>

One of the following:

"smart"

[Link to this property](#)

"targeted"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Deprecatedplacement_status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"

Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

</summary>

One of the following:

"SUCCESS"

[Link to this property](#)

"UNSUPPORTED_APPLICATION"

[Link to this property](#)

"INSUFFICIENT_INVOCATIONS"

[Link to this property](#)

</details>

[Link to this property](#)

tag: optional string

The immutable ID of the script.

[Link to this property](#)

tags: optional array of string

Tags associated with the Worker.

[Link to this property](#)

<details>

<summary>

tail_consumers: optional array of [ConsumerScript](/api/resources/workers#(resource)%20workers.scripts.tail%20%3E%20(model)%20consumer_script%20%3E%20(schema)) { service, environment, namespace }

List of Workers that will consume logs from the attached Worker.

</summary>

service: string

Name of Worker that is to be the consumer.

[Link to this property](#)

environment: optional string

Optional environment if the Worker utilizes one.

[Link to this property](#)

namespace: optional string

Optional dispatch namespace the script belongs to.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

usage_model: optional "standard" or "bundled" or "unbound"

Usage model for the Worker invocations.

</summary>

One of the following:

"standard"

[Link to this property](#)

"bundled"

[Link to this property](#)

"unbound"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ScriptSetting object { logpush, observability, tags, tail_consumers }

</summary>

logpush: optional boolean

Whether Logpush is turned on for the Worker.

[Link to this property](#)

<details>

<summary>

observability: optional object { enabled, head_sampling_rate, logs, 2 more }

Observability settings for the Worker.

</summary>

enabled: boolean

Whether observability is enabled for the Worker.

[Link to this property](#)

head_sampling_rate: optional number

The sampling rate for incoming requests. From 0 to 1 (1 = 100%, 0.1 = 10%). Default is 1.

[Link to this property](#)

<details>

<summary>

logs: optional object { enabled, invocation_logs, destinations, 2 more }

Log settings for the Worker.

</summary>

enabled: boolean

Whether logs are enabled for the Worker.

[Link to this property](#)

invocation_logs: boolean

Whether [invocation logs](https://developers.cloudflare.com/workers/observability/logs/workers-logs/#invocation-logs) are enabled for the Worker.

[Link to this property](#)

destinations: optional array of string

A list of destinations where logs will be exported to.

[Link to this property](#)

head_sampling_rate: optional number

The sampling rate for logs. From 0 to 1 (1 = 100%, 0.1 = 10%). Default is 1.

[Link to this property](#)

persist: optional boolean

Whether log persistence is enabled for the Worker.

[Link to this property](#)

</details>

[Link to this property](#)

redact_query_string: optional boolean

Whether query strings are removed from request URLs in logs and traces.

[Link to this property](#)

<details>

<summary>

traces: optional object { destinations, enabled, head_sampling_rate, 2 more }

Trace settings for the Worker.

</summary>

destinations: optional array of string

A list of destinations where traces will be exported to.

[Link to this property](#)

enabled: optional boolean

Whether traces are enabled for the Worker.

[Link to this property](#)

head_sampling_rate: optional number

The sampling rate for traces. From 0 to 1 (1 = 100%, 0.1 = 10%). Default is 1.

[Link to this property](#)

persist: optional boolean

Whether trace persistence is enabled for the Worker.

[Link to this property](#)

<details>

<summary>

propagation_policy: optional "authenticated" or "accept"

Controls how inbound trace context (traceparent/tracestate) headers on incoming requests are handled. “authenticated” honors inbound trace context only when accompanied by a valid trace auth token. “accept” unconditionally accepts inbound trace context. Requires the trace propagation feature to be enabled. Returns null when the trace propagation feature is not enabled for the account.

</summary>

One of the following:

"authenticated"

[Link to this property](#)

"accept"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

tags: optional array of string

Tags associated with the Worker.

[Link to this property](#)

<details>

<summary>

tail_consumers: optional array of [ConsumerScript](/api/resources/workers#(resource)%20workers.scripts.tail%20%3E%20(model)%20consumer_script%20%3E%20(schema)) { service, environment, namespace }

List of Workers that will consume logs from the attached Worker.

</summary>

service: string

Name of Worker that is to be the consumer.

[Link to this property](#)

environment: optional string

Optional environment if the Worker utilizes one.

[Link to this property](#)

namespace: optional string

Optional dispatch namespace the script belongs to.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ScriptListResponse object { id, cache_options, compatibility_date, 21 more }

</summary>

id: optional string

The name used to identify the script.

[Link to this property](#)

<details>

<summary>

cache_options: optional object { enabled, cross_version_cache }

Global CacheW configuration for the Worker. When caching is on, the platform provisions a `cloudflare.app` zone for the Worker. A `type: worker` entry in the `exports` map can override this value for a single entrypoint.

</summary>

enabled: boolean

Whether caching is enabled for this Worker.

[Link to this property](#)

cross_version_cache: optional boolean

Whether cached responses are shared across Worker version uploads. This is independent of `enabled`. It can stay true while caching is off, so the preference survives turning caching off and back on.

[Link to this property](#)

</details>

[Link to this property](#)

compatibility_date: optional string

Date indicating targeted support in the Workers runtime. Backwards incompatible fixes to the runtime following this date will not affect this Worker.

[Link to this property](#)

compatibility_flags: optional array of string

Flags that enable or disable certain features in the Workers runtime. Used to enable upcoming features or opt in or out of specific changes not included in a `compatibility_date`.

[Link to this property](#)

created_on: optional string

When the script was created.

formatdate-time

[Link to this property](#)

etag: optional string

Hashed script content, can be used in a If-None-Match header when updating.

[Link to this property](#)

<details>

<summary>

exports: optional map[object { type, cache, state } or object { storage, type, container, state } or object { state, type } or 3 more]

Declarative exports for the Worker’s most recent version, including Durable Object classes (with their `storage` backend) and named Worker entrypoints. Tombstoned lifecycle entries are omitted, so only live exports (`created` and `expecting-transfer`) are returned.

</summary>

One of the following:

<details>

<summary>

Worker object { type, cache, state }

A named Worker entrypoint export (`type: worker`). Worker entrypoints are always live (`state: created`) and carry no storage or lifecycle fields. The optional `cache` block overrides the Worker’s global `cache_options.enabled` for this entrypoint.

</summary>

type: "worker"

Marks this entry as a Worker entrypoint export.

[Link to this property](#)

<details>

<summary>

cache: optional object { enabled }

Cache override for this entrypoint. Overrides the Worker’s global `cache_options.enabled` for this entrypoint only.

</summary>

enabled: boolean

Whether caching is enabled for this entrypoint.

[Link to this property](#)

</details>

[Link to this property](#)

state: optional "created"

Live export. May be omitted; defaults to `created`.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

WorkersDurableObjectExport object { storage, type, container, state }

A live Durable Object export (`state: created`, the default). The platform auto-provisions the namespace on first deploy, matches it on subsequent deploys, and never mutates or deletes it as a side effect of a code-only change. `storage` is required; `renamed_to`, `transferred_to` and `transfer_from` are not allowed on a live entry.

</summary>

<details>

<summary>

storage: "sqlite" or "legacy-kv"

Durable Object storage backend. `sqlite` is the recommended (and only) backend for new namespaces. `legacy-kv` is accepted only for a class whose namespace already exists as KV-backed; the `exports` flow never provisions a new `legacy-kv` namespace.

</summary>

One of the following:

"sqlite"

[Link to this property](#)

"legacy-kv"

[Link to this property](#)

</details>

[Link to this property](#)

type: "durable-object"

Marks this entry as a Durable Object export.

[Link to this property](#)

container: optional string

Name of the container (declared in the upload’s `metadata.containers`) that backs this Durable Object. When set, the namespace is container-enabled. Valid only on live entries.

maxLength128

[Link to this property](#)

state: optional "created"

Live export. May be omitted; defaults to `created`.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

WorkersDurableObjectDeletedExport object { state, type }

A `deleted` tombstone: retires the provisioned namespace for this class and all of its data. The class must be absent from the uploaded code and no other Worker in the account may bind to the namespace, otherwise the deploy is rejected. No other fields are allowed. Deletion is irreversible.

</summary>

state: "deleted"

Tombstone that deletes the namespace.

[Link to this property](#)

type: "durable-object"

Marks this entry as a Durable Object export.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

WorkersDurableObjectRenamedExport object { renamed_to, state, type }

A `renamed` tombstone: rewrites the provisioned namespace’s class name from this map key to `renamed_to`. The source class may stay in code during the rollout window (an info notice is emitted). `storage`, `transferred_to` and `transfer_from` are not allowed.

</summary>

renamed_to: string

The destination class name. Must differ from the source class (the map key) and must be declared as a live (`created`) entry in the same `exports` map. Write-only: never present in GET responses.

maxLength128

[Link to this property](#)

state: "renamed"

Tombstone that renames the namespace’s class.

[Link to this property](#)

type: "durable-object"

Marks this entry as a Durable Object export.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

WorkersDurableObjectTransferredExport object { state, transferred_to, type }

A `transferred` tombstone (source side of a two-phase transfer): hands ownership of the provisioned namespace to another script in the same account, named by `transferred_to`. The target must have already deployed a matching `expecting-transfer` entry. The source class may stay in code during the rollout window (an info notice is emitted). `storage`, `renamed_to` and `transfer_from` are not allowed.

</summary>

state: "transferred"

Tombstone that transfers the namespace to another script.

[Link to this property](#)

transferred_to: string

The destination script name. Must be in the same account and the same dispatch-namespace context (or both non-dispatch). Cross-dispatch-namespace transfers are rejected. Write-only: never present in GET responses.

maxLength128

[Link to this property](#)

type: "durable-object"

Marks this entry as a Durable Object export.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

WorkersDurableObjectExpectingTransferExport object { state, storage, transfer_from, 2 more }

The target side of a two-phase transfer (`state: expecting-transfer`). Declares that this script expects to receive a namespace for this class from the `transfer_from` script. This is a live entry, not a tombstone: bindings resolve through the source’s namespace until the source commits with a `transferred` tombstone. `storage` and `transfer_from` are required; `renamed_to` and `transferred_to` are not allowed.

</summary>

state: "expecting-transfer"

Target side of a two-phase transfer.

[Link to this property](#)

<details>

<summary>

storage: "sqlite" or "legacy-kv"

Durable Object storage backend. `sqlite` is the recommended (and only) backend for new namespaces. `legacy-kv` is accepted only for a class whose namespace already exists as KV-backed; the `exports` flow never provisions a new `legacy-kv` namespace.

</summary>

One of the following:

"sqlite"

[Link to this property](#)

"legacy-kv"

[Link to this property](#)

</details>

[Link to this property](#)

transfer_from: string

The source script name to receive the namespace from. Must be in the same account and dispatch-namespace context. Present on reads for `expecting-transfer` entries.

maxLength128

[Link to this property](#)

type: "durable-object"

Marks this entry as a Durable Object export.

[Link to this property](#)

container: optional string

Name of the container (declared in the upload’s `metadata.containers`) that backs this Durable Object once the transfer settles. Valid only on live entries.

maxLength128

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

handlers: optional array of string

The names of handlers exported as part of the default export.

[Link to this property](#)

has_assets: optional boolean

Whether a Worker contains assets.

[Link to this property](#)

has_modules: optional boolean

Whether a Worker contains modules.

[Link to this property](#)

last_deployed_from: optional string

The client most recently used to deploy this Worker.

[Link to this property](#)

logpush: optional boolean

Whether Logpush is turned on for the Worker.

[Link to this property](#)

migration_tag: optional string

The tag of the Durable Object migration that was most recently applied for this Worker.

[Link to this property](#)

modified_on: optional string

When the script was last modified.

formatdate-time

[Link to this property](#)

<details>

<summary>

named_handlers: optional array of object { handlers, name }

Named exports, such as Durable Object class implementations and named entrypoints.

</summary>

handlers: optional array of string

The names of handlers exported as part of the named export.

[Link to this property](#)

name: optional string

The name of the export.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

observability: optional object { enabled, head_sampling_rate, logs, 2 more }

Observability settings for the Worker.

</summary>

enabled: boolean

Whether observability is enabled for the Worker.

[Link to this property](#)

head_sampling_rate: optional number

The sampling rate for incoming requests. From 0 to 1 (1 = 100%, 0.1 = 10%). Default is 1.

[Link to this property](#)

<details>

<summary>

logs: optional object { enabled, invocation_logs, destinations, 2 more }

Log settings for the Worker.

</summary>

enabled: boolean

Whether logs are enabled for the Worker.

[Link to this property](#)

invocation_logs: boolean

Whether [invocation logs](https://developers.cloudflare.com/workers/observability/logs/workers-logs/#invocation-logs) are enabled for the Worker.

[Link to this property](#)

destinations: optional array of string

A list of destinations where logs will be exported to.

[Link to this property](#)

head_sampling_rate: optional number

The sampling rate for logs. From 0 to 1 (1 = 100%, 0.1 = 10%). Default is 1.

[Link to this property](#)

persist: optional boolean

Whether log persistence is enabled for the Worker.

[Link to this property](#)

</details>

[Link to this property](#)

redact_query_string: optional boolean

Whether query strings are removed from request URLs in logs and traces.

[Link to this property](#)

<details>

<summary>

traces: optional object { destinations, enabled, head_sampling_rate, 2 more }

Trace settings for the Worker.

</summary>

destinations: optional array of string

A list of destinations where traces will be exported to.

[Link to this property](#)

enabled: optional boolean

Whether traces are enabled for the Worker.

[Link to this property](#)

head_sampling_rate: optional number

The sampling rate for traces. From 0 to 1 (1 = 100%, 0.1 = 10%). Default is 1.

[Link to this property](#)

persist: optional boolean

Whether trace persistence is enabled for the Worker.

[Link to this property](#)

<details>

<summary>

propagation_policy: optional "authenticated" or "accept"

Controls how inbound trace context (traceparent/tracestate) headers on incoming requests are handled. “authenticated” honors inbound trace context only when accompanied by a valid trace auth token. “accept” unconditionally accepts inbound trace context. Requires the trace propagation feature to be enabled. Returns null when the trace propagation feature is not enabled for the account.

</summary>

One of the following:

"authenticated"

[Link to this property](#)

"accept"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

placement: optional object { mode, last_analyzed_at, status } or object { region, last_analyzed_at, status } or object { hostname, last_analyzed_at, status } or 5 more

Configuration for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement). Specify mode=‘smart’ for Smart Placement, or one of region/hostname/host.

</summary>

One of the following:

<details>

<summary>

object { mode, last_analyzed_at, status }

</summary>

mode: "smart"

Enables [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

[Link to this property](#)

last_analyzed_at: optional string

The last time the script was analyzed for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

formatdate-time

[Link to this property](#)

<details>

<summary>

status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"

Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

</summary>

One of the following:

"SUCCESS"

[Link to this property](#)

"UNSUPPORTED_APPLICATION"

[Link to this property](#)

"INSUFFICIENT_INVOCATIONS"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

object { region, last_analyzed_at, status }

</summary>

region: string

Cloud region for targeted placement in format ‘provider:region’.

[Link to this property](#)

last_analyzed_at: optional string

The last time the script was analyzed for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

formatdate-time

[Link to this property](#)

<details>

<summary>

status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"

Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

</summary>

One of the following:

"SUCCESS"

[Link to this property](#)

"UNSUPPORTED_APPLICATION"

[Link to this property](#)

"INSUFFICIENT_INVOCATIONS"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

object { hostname, last_analyzed_at, status }

</summary>

hostname: string

HTTP hostname for targeted placement.

[Link to this property](#)

last_analyzed_at: optional string

The last time the script was analyzed for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

formatdate-time

[Link to this property](#)

<details>

<summary>

status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"

Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

</summary>

One of the following:

"SUCCESS"

[Link to this property](#)

"UNSUPPORTED_APPLICATION"

[Link to this property](#)

"INSUFFICIENT_INVOCATIONS"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

object { host, last_analyzed_at, status }

</summary>

host: string

TCP host and port for targeted placement.

[Link to this property](#)

last_analyzed_at: optional string

The last time the script was analyzed for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

formatdate-time

[Link to this property](#)

<details>

<summary>

status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"

Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

</summary>

One of the following:

"SUCCESS"

[Link to this property](#)

"UNSUPPORTED_APPLICATION"

[Link to this property](#)

"INSUFFICIENT_INVOCATIONS"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

object { mode, region, last_analyzed_at, status }

</summary>

mode: "targeted"

Targeted placement mode.

[Link to this property](#)

region: string

Cloud region for targeted placement in format ‘provider:region’.

[Link to this property](#)

last_analyzed_at: optional string

The last time the script was analyzed for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

formatdate-time

[Link to this property](#)

<details>

<summary>

status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"

Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

</summary>

One of the following:

"SUCCESS"

[Link to this property](#)

"UNSUPPORTED_APPLICATION"

[Link to this property](#)

"INSUFFICIENT_INVOCATIONS"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

object { hostname, mode, last_analyzed_at, status }

</summary>

hostname: string

HTTP hostname for targeted placement.

[Link to this property](#)

mode: "targeted"

Targeted placement mode.

[Link to this property](#)

last_analyzed_at: optional string

The last time the script was analyzed for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

formatdate-time

[Link to this property](#)

<details>

<summary>

status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"

Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

</summary>

One of the following:

"SUCCESS"

[Link to this property](#)

"UNSUPPORTED_APPLICATION"

[Link to this property](#)

"INSUFFICIENT_INVOCATIONS"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

object { host, mode, last_analyzed_at, status }

</summary>

host: string

TCP host and port for targeted placement.

[Link to this property](#)

mode: "targeted"

Targeted placement mode.

[Link to this property](#)

last_analyzed_at: optional string

The last time the script was analyzed for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

formatdate-time

[Link to this property](#)

<details>

<summary>

status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"

Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

</summary>

One of the following:

"SUCCESS"

[Link to this property](#)

"UNSUPPORTED_APPLICATION"

[Link to this property](#)

"INSUFFICIENT_INVOCATIONS"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

object { mode, target, last_analyzed_at, status }

</summary>

mode: "targeted"

Targeted placement mode.

[Link to this property](#)

<details>

<summary>

target: array of object { region } or object { hostname } or object { host }

Array of placement targets (currently limited to single target).

</summary>

One of the following:

<details>

<summary>

Region object { region }

</summary>

region: string

Cloud region in format ‘provider:region’.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Hostname object { hostname }

</summary>

hostname: string

HTTP hostname for targeted placement.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Host object { host }

</summary>

host: string

TCP host:port for targeted placement.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

last_analyzed_at: optional string

The last time the script was analyzed for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

formatdate-time

[Link to this property](#)

<details>

<summary>

status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"

Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

</summary>

One of the following:

"SUCCESS"

[Link to this property](#)

"UNSUPPORTED_APPLICATION"

[Link to this property](#)

"INSUFFICIENT_INVOCATIONS"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Deprecatedplacement_mode: optional "smart" or "targeted"

</summary>

One of the following:

"smart"

[Link to this property](#)

"targeted"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Deprecatedplacement_status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"

</summary>

One of the following:

"SUCCESS"

[Link to this property](#)

"UNSUPPORTED_APPLICATION"

[Link to this property](#)

"INSUFFICIENT_INVOCATIONS"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

routes: optional array of object { id, pattern, script }

Routes associated with the Worker.

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

pattern: string

Pattern to match incoming requests against. [Learn more](https://developers.cloudflare.com/workers/configuration/routing/routes/#matching-behavior).

[Link to this property](#)

script: optional string

Name of the script to run if the route matches.

[Link to this property](#)

</details>

[Link to this property](#)

tag: optional string

The immutable ID of the script.

[Link to this property](#)

tags: optional array of string

Tags associated with the Worker.

[Link to this property](#)

<details>

<summary>

tail_consumers: optional array of [ConsumerScript](/api/resources/workers#(resource)%20workers.scripts.tail%20%3E%20(model)%20consumer_script%20%3E%20(schema)) { service, environment, namespace }

List of Workers that will consume logs from the attached Worker.

</summary>

service: string

Name of Worker that is to be the consumer.

[Link to this property](#)

environment: optional string

Optional environment if the Worker utilizes one.

[Link to this property](#)

namespace: optional string

Optional dispatch namespace the script belongs to.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

usage_model: optional "standard" or "bundled" or "unbound"

Usage model for the Worker invocations.

</summary>

One of the following:

"standard"

[Link to this property](#)

"bundled"

[Link to this property](#)

"unbound"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ScriptSearchResponse = array of object { id, created_on, modified_on, 4 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the script was created.

formatdate-time

[Link to this property](#)

modified_on: string

When the script was last modified.

formatdate-time

[Link to this property](#)

script_name: string

Name of the script, used in URLs and route configuration.

[Link to this property](#)

environment_is_default: optional boolean

Whether the environment is the default environment.

[Link to this property](#)

environment_name: optional string

Name of the environment.

[Link to this property](#)

service_name: optional string

Name of the service.

[Link to this property](#)

</details>

[Link to this property](#)

ScriptGetResponse = string

[Link to this property](#)

<details>

<summary>

ScriptUpdateResponse object { startup_time_ms, id, cache_options, 22 more }

</summary>

startup_time_ms: number

[Link to this property](#)

id: optional string

The name used to identify the script.

[Link to this property](#)

<details>

<summary>

cache_options: optional object { enabled, cross_version_cache }

Global CacheW configuration for the Worker. When caching is on, the platform provisions a `cloudflare.app` zone for the Worker. A `type: worker` entry in the `exports` map can override this value for a single entrypoint.

</summary>

enabled: boolean

Whether caching is enabled for this Worker.

[Link to this property](#)

cross_version_cache: optional boolean

Whether cached responses are shared across Worker version uploads. This is independent of `enabled`. It can stay true while caching is off, so the preference survives turning caching off and back on.

[Link to this property](#)

</details>

[Link to this property](#)

compatibility_date: optional string

Date indicating targeted support in the Workers runtime. Backwards incompatible fixes to the runtime following this date will not affect this Worker.

[Link to this property](#)

compatibility_flags: optional array of string

Flags that enable or disable certain features in the Workers runtime. Used to enable upcoming features or opt in or out of specific changes not included in a `compatibility_date`.

[Link to this property](#)

created_on: optional string

When the script was created.

formatdate-time

[Link to this property](#)

entry_point: optional string

The entry point for the script.

[Link to this property](#)

etag: optional string

Hashed script content, can be used in a If-None-Match header when updating.

[Link to this property](#)

<details>

<summary>

exports: optional map[object { type, cache, state } or object { storage, type, container, state } or object { state, type } or 3 more]

Declarative exports for the Worker’s most recent version, including Durable Object classes (with their `storage` backend) and named Worker entrypoints. Tombstoned lifecycle entries are omitted, so only live exports (`created` and `expecting-transfer`) are returned.

</summary>

One of the following:

<details>

<summary>

Worker object { type, cache, state }

A named Worker entrypoint export (`type: worker`). Worker entrypoints are always live (`state: created`) and carry no storage or lifecycle fields. The optional `cache` block overrides the Worker’s global `cache_options.enabled` for this entrypoint.

</summary>

type: "worker"

Marks this entry as a Worker entrypoint export.

[Link to this property](#)

<details>

<summary>

cache: optional object { enabled }

Cache override for this entrypoint. Overrides the Worker’s global `cache_options.enabled` for this entrypoint only.

</summary>

enabled: boolean

Whether caching is enabled for this entrypoint.

[Link to this property](#)

</details>

[Link to this property](#)

state: optional "created"

Live export. May be omitted; defaults to `created`.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

WorkersDurableObjectExport object { storage, type, container, state }

A live Durable Object export (`state: created`, the default). The platform auto-provisions the namespace on first deploy, matches it on subsequent deploys, and never mutates or deletes it as a side effect of a code-only change. `storage` is required; `renamed_to`, `transferred_to` and `transfer_from` are not allowed on a live entry.

</summary>

<details>

<summary>

storage: "sqlite" or "legacy-kv"

Durable Object storage backend. `sqlite` is the recommended (and only) backend for new namespaces. `legacy-kv` is accepted only for a class whose namespace already exists as KV-backed; the `exports` flow never provisions a new `legacy-kv` namespace.

</summary>

One of the following:

"sqlite"

[Link to this property](#)

"legacy-kv"

[Link to this property](#)

</details>

[Link to this property](#)

type: "durable-object"

Marks this entry as a Durable Object export.

[Link to this property](#)

container: optional string

Name of the container (declared in the upload’s `metadata.containers`) that backs this Durable Object. When set, the namespace is container-enabled. Valid only on live entries.

maxLength128

[Link to this property](#)

state: optional "created"

Live export. May be omitted; defaults to `created`.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

WorkersDurableObjectDeletedExport object { state, type }

A `deleted` tombstone: retires the provisioned namespace for this class and all of its data. The class must be absent from the uploaded code and no other Worker in the account may bind to the namespace, otherwise the deploy is rejected. No other fields are allowed. Deletion is irreversible.

</summary>

state: "deleted"

Tombstone that deletes the namespace.

[Link to this property](#)

type: "durable-object"

Marks this entry as a Durable Object export.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

WorkersDurableObjectRenamedExport object { renamed_to, state, type }

A `renamed` tombstone: rewrites the provisioned namespace’s class name from this map key to `renamed_to`. The source class may stay in code during the rollout window (an info notice is emitted). `storage`, `transferred_to` and `transfer_from` are not allowed.

</summary>

renamed_to: string

The destination class name. Must differ from the source class (the map key) and must be declared as a live (`created`) entry in the same `exports` map. Write-only: never present in GET responses.

maxLength128

[Link to this property](#)

state: "renamed"

Tombstone that renames the namespace’s class.

[Link to this property](#)

type: "durable-object"

Marks this entry as a Durable Object export.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

WorkersDurableObjectTransferredExport object { state, transferred_to, type }

A `transferred` tombstone (source side of a two-phase transfer): hands ownership of the provisioned namespace to another script in the same account, named by `transferred_to`. The target must have already deployed a matching `expecting-transfer` entry. The source class may stay in code during the rollout window (an info notice is emitted). `storage`, `renamed_to` and `transfer_from` are not allowed.

</summary>

state: "transferred"

Tombstone that transfers the namespace to another script.

[Link to this property](#)

transferred_to: string

The destination script name. Must be in the same account and the same dispatch-namespace context (or both non-dispatch). Cross-dispatch-namespace transfers are rejected. Write-only: never present in GET responses.

maxLength128

[Link to this property](#)

type: "durable-object"

Marks this entry as a Durable Object export.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

WorkersDurableObjectExpectingTransferExport object { state, storage, transfer_from, 2 more }

The target side of a two-phase transfer (`state: expecting-transfer`). Declares that this script expects to receive a namespace for this class from the `transfer_from` script. This is a live entry, not a tombstone: bindings resolve through the source’s namespace until the source commits with a `transferred` tombstone. `storage` and `transfer_from` are required; `renamed_to` and `transferred_to` are not allowed.

</summary>

state: "expecting-transfer"

Target side of a two-phase transfer.

[Link to this property](#)

<details>

<summary>

storage: "sqlite" or "legacy-kv"

Durable Object storage backend. `sqlite` is the recommended (and only) backend for new namespaces. `legacy-kv` is accepted only for a class whose namespace already exists as KV-backed; the `exports` flow never provisions a new `legacy-kv` namespace.

</summary>

One of the following:

"sqlite"

[Link to this property](#)

"legacy-kv"

[Link to this property](#)

</details>

[Link to this property](#)

transfer_from: string

The source script name to receive the namespace from. Must be in the same account and dispatch-namespace context. Present on reads for `expecting-transfer` entries.

maxLength128

[Link to this property](#)

type: "durable-object"

Marks this entry as a Durable Object export.

[Link to this property](#)

container: optional string

Name of the container (declared in the upload’s `metadata.containers`) that backs this Durable Object once the transfer settles. Valid only on live entries.

maxLength128

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

handlers: optional array of string

The names of handlers exported as part of the default export.

[Link to this property](#)

has_assets: optional boolean

Whether a Worker contains assets.

[Link to this property](#)

has_modules: optional boolean

Whether a Worker contains modules.

[Link to this property](#)

last_deployed_from: optional string

The client most recently used to deploy this Worker.

[Link to this property](#)

logpush: optional boolean

Whether Logpush is turned on for the Worker.

[Link to this property](#)

migration_tag: optional string

The tag of the Durable Object migration that was most recently applied for this Worker.

[Link to this property](#)

modified_on: optional string

When the script was last modified.

formatdate-time

[Link to this property](#)

<details>

<summary>

named_handlers: optional array of object { handlers, name }

Named exports, such as Durable Object class implementations and named entrypoints.

</summary>

handlers: optional array of string

The names of handlers exported as part of the named export.

[Link to this property](#)

name: optional string

The name of the export.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

observability: optional object { enabled, head_sampling_rate, logs, 2 more }

Observability settings for the Worker.

</summary>

enabled: boolean

Whether observability is enabled for the Worker.

[Link to this property](#)

head_sampling_rate: optional number

The sampling rate for incoming requests. From 0 to 1 (1 = 100%, 0.1 = 10%). Default is 1.

[Link to this property](#)

<details>

<summary>

logs: optional object { enabled, invocation_logs, destinations, 2 more }

Log settings for the Worker.

</summary>

enabled: boolean

Whether logs are enabled for the Worker.

[Link to this property](#)

invocation_logs: boolean

Whether [invocation logs](https://developers.cloudflare.com/workers/observability/logs/workers-logs/#invocation-logs) are enabled for the Worker.

[Link to this property](#)

destinations: optional array of string

A list of destinations where logs will be exported to.

[Link to this property](#)

head_sampling_rate: optional number

The sampling rate for logs. From 0 to 1 (1 = 100%, 0.1 = 10%). Default is 1.

[Link to this property](#)

persist: optional boolean

Whether log persistence is enabled for the Worker.

[Link to this property](#)

</details>

[Link to this property](#)

redact_query_string: optional boolean

Whether query strings are removed from request URLs in logs and traces.

[Link to this property](#)

<details>

<summary>

traces: optional object { destinations, enabled, head_sampling_rate, 2 more }

Trace settings for the Worker.

</summary>

destinations: optional array of string

A list of destinations where traces will be exported to.

[Link to this property](#)

enabled: optional boolean

Whether traces are enabled for the Worker.

[Link to this property](#)

head_sampling_rate: optional number

The sampling rate for traces. From 0 to 1 (1 = 100%, 0.1 = 10%). Default is 1.

[Link to this property](#)

persist: optional boolean

Whether trace persistence is enabled for the Worker.

[Link to this property](#)

<details>

<summary>

propagation_policy: optional "authenticated" or "accept"

Controls how inbound trace context (traceparent/tracestate) headers on incoming requests are handled. “authenticated” honors inbound trace context only when accompanied by a valid trace auth token. “accept” unconditionally accepts inbound trace context. Requires the trace propagation feature to be enabled. Returns null when the trace propagation feature is not enabled for the account.

</summary>

One of the following:

"authenticated"

[Link to this property](#)

"accept"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

placement: optional object { mode, last_analyzed_at, status } or object { region, last_analyzed_at, status } or object { hostname, last_analyzed_at, status } or 5 more

Configuration for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement). Specify mode=‘smart’ for Smart Placement, or one of region/hostname/host.

</summary>

One of the following:

<details>

<summary>

object { mode, last_analyzed_at, status }

</summary>

mode: "smart"

Enables [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

[Link to this property](#)

last_analyzed_at: optional string

The last time the script was analyzed for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

formatdate-time

[Link to this property](#)

<details>

<summary>

status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"

Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

</summary>

One of the following:

"SUCCESS"

[Link to this property](#)

"UNSUPPORTED_APPLICATION"

[Link to this property](#)

"INSUFFICIENT_INVOCATIONS"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

object { region, last_analyzed_at, status }

</summary>

region: string

Cloud region for targeted placement in format ‘provider:region’.

[Link to this property](#)

last_analyzed_at: optional string

The last time the script was analyzed for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

formatdate-time

[Link to this property](#)

<details>

<summary>

status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"

Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

</summary>

One of the following:

"SUCCESS"

[Link to this property](#)

"UNSUPPORTED_APPLICATION"

[Link to this property](#)

"INSUFFICIENT_INVOCATIONS"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

object { hostname, last_analyzed_at, status }

</summary>

hostname: string

HTTP hostname for targeted placement.

[Link to this property](#)

last_analyzed_at: optional string

The last time the script was analyzed for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

formatdate-time

[Link to this property](#)

<details>

<summary>

status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"

Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

</summary>

One of the following:

"SUCCESS"

[Link to this property](#)

"UNSUPPORTED_APPLICATION"

[Link to this property](#)

"INSUFFICIENT_INVOCATIONS"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

object { host, last_analyzed_at, status }

</summary>

host: string

TCP host and port for targeted placement.

[Link to this property](#)

last_analyzed_at: optional string

The last time the script was analyzed for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

formatdate-time

[Link to this property](#)

<details>

<summary>

status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"

Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

</summary>

One of the following:

"SUCCESS"

[Link to this property](#)

"UNSUPPORTED_APPLICATION"

[Link to this property](#)

"INSUFFICIENT_INVOCATIONS"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

object { mode, region, last_analyzed_at, status }

</summary>

mode: "targeted"

Targeted placement mode.

[Link to this property](#)

region: string

Cloud region for targeted placement in format ‘provider:region’.

[Link to this property](#)

last_analyzed_at: optional string

The last time the script was analyzed for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

formatdate-time

[Link to this property](#)

<details>

<summary>

status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"

Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

</summary>

One of the following:

"SUCCESS"

[Link to this property](#)

"UNSUPPORTED_APPLICATION"

[Link to this property](#)

"INSUFFICIENT_INVOCATIONS"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

object { hostname, mode, last_analyzed_at, status }

</summary>

hostname: string

HTTP hostname for targeted placement.

[Link to this property](#)

mode: "targeted"

Targeted placement mode.

[Link to this property](#)

last_analyzed_at: optional string

The last time the script was analyzed for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

formatdate-time

[Link to this property](#)

<details>

<summary>

status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"

Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

</summary>

One of the following:

"SUCCESS"

[Link to this property](#)

"UNSUPPORTED_APPLICATION"

[Link to this property](#)

"INSUFFICIENT_INVOCATIONS"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

object { host, mode, last_analyzed_at, status }

</summary>

host: string

TCP host and port for targeted placement.

[Link to this property](#)

mode: "targeted"

Targeted placement mode.

[Link to this property](#)

last_analyzed_at: optional string

The last time the script was analyzed for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

formatdate-time

[Link to this property](#)

<details>

<summary>

status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"

Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

</summary>

One of the following:

"SUCCESS"

[Link to this property](#)

"UNSUPPORTED_APPLICATION"

[Link to this property](#)

"INSUFFICIENT_INVOCATIONS"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

object { mode, target, last_analyzed_at, status }

</summary>

mode: "targeted"

Targeted placement mode.

[Link to this property](#)

<details>

<summary>

target: array of object { region } or object { hostname } or object { host }

Array of placement targets (currently limited to single target).

</summary>

One of the following:

<details>

<summary>

Region object { region }

</summary>

region: string

Cloud region in format ‘provider:region’.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Hostname object { hostname }

</summary>

hostname: string

HTTP hostname for targeted placement.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Host object { host }

</summary>

host: string

TCP host:port for targeted placement.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

last_analyzed_at: optional string

The last time the script was analyzed for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

formatdate-time

[Link to this property](#)

<details>

<summary>

status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"

Status of [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

</summary>

One of the following:

"SUCCESS"

[Link to this property](#)

"UNSUPPORTED_APPLICATION"

[Link to this property](#)

"INSUFFICIENT_INVOCATIONS"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Deprecatedplacement_mode: optional "smart" or "targeted"

</summary>

One of the following:

"smart"

[Link to this property](#)

"targeted"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Deprecatedplacement_status: optional "SUCCESS" or "UNSUPPORTED_APPLICATION" or "INSUFFICIENT_INVOCATIONS"

</summary>

One of the following:

"SUCCESS"

[Link to this property](#)

"UNSUPPORTED_APPLICATION"

[Link to this property](#)

"INSUFFICIENT_INVOCATIONS"

[Link to this property](#)

</details>

[Link to this property](#)

tag: optional string

The immutable ID of the script.

[Link to this property](#)

tags: optional array of string

Tags associated with the Worker.

[Link to this property](#)

<details>

<summary>

tail_consumers: optional array of [ConsumerScript](/api/resources/workers#(resource)%20workers.scripts.tail%20%3E%20(model)%20consumer_script%20%3E%20(schema)) { service, environment, namespace }

List of Workers that will consume logs from the attached Worker.

</summary>

service: string

Name of Worker that is to be the consumer.

[Link to this property](#)

environment: optional string

Optional environment if the Worker utilizes one.

[Link to this property](#)

namespace: optional string

Optional dispatch namespace the script belongs to.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

usage_model: optional "standard" or "bundled" or "unbound"

Usage model for the Worker invocations.

</summary>

One of the following:

"standard"

[Link to this property](#)

"bundled"

[Link to this property](#)

"unbound"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

ScriptDeleteResponse = unknown

[Link to this property](#)

##### [Create Assets Upload Session](/api/resources/workers/subresources/scripts/subresources/assets/subresources/upload/methods/create)

POST/accounts/{account_id}/workers/scripts/{script_name}/assets-upload-session

##### Models

<details>

<summary>

UploadCreateResponse object { buckets, jwt }

</summary>

buckets: optional array of array of string

The requests to make to upload assets.

[Link to this property](#)

jwt: optional string

A JWT to use as authentication for uploading assets.

[Link to this property](#)

</details>

[Link to this property](#)

##### [Get Worker subdomain](/api/resources/workers/subresources/scripts/subresources/subdomain/methods/get)

GET/accounts/{account_id}/workers/scripts/{script_name}/subdomain

##### [Post Worker subdomain](/api/resources/workers/subresources/scripts/subresources/subdomain/methods/create)

POST/accounts/{account_id}/workers/scripts/{script_name}/subdomain

##### [Delete Worker subdomain](/api/resources/workers/subresources/scripts/subresources/subdomain/methods/delete)

DELETE/accounts/{account_id}/workers/scripts/{script_name}/subdomain

##### Models

<details>

<summary>

SubdomainGetResponse object { enabled, previews_enabled }

</summary>

enabled: boolean

Whether the Worker is available on the workers.dev subdomain.

[Link to this property](#)

previews_enabled: boolean

Whether the Worker’s Preview URLs are available on the workers.dev subdomain.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SubdomainCreateResponse object { enabled, previews_enabled }

</summary>

enabled: boolean

Whether the Worker is available on the workers.dev subdomain.

[Link to this property](#)

previews_enabled: boolean

Whether the Worker’s Preview URLs are available on the workers.dev subdomain.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SubdomainDeleteResponse object { enabled, previews_enabled }

</summary>

enabled: boolean

Whether the Worker is available on the workers.dev subdomain.

[Link to this property](#)

previews_enabled: boolean

Whether the Worker’s Preview URLs are available on the workers.dev subdomain.

[Link to this property](#)

</details>

[Link to this property](#)

##### [Get Cron Triggers](/api/resources/workers/subresources/scripts/subresources/schedules/methods/get)

GET/accounts/{account_id}/workers/scripts/{script_name}/schedules

##### [Update Cron Triggers](/api/resources/workers/subresources/scripts/subresources/schedules/methods/update)

PUT/accounts/{account_id}/workers/scripts/{script_name}/schedules

##### Models

<details>

<summary>

ScheduleGetResponse object { schedules }

</summary>

<details>

<summary>

schedules: array of object { cron, created_on, modified_on }

</summary>

cron: string

[Link to this property](#)

created_on: optional string

[Link to this property](#)

modified_on: optional string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ScheduleUpdateResponse object { schedules }

</summary>

<details>

<summary>

schedules: array of object { cron, created_on, modified_on }

</summary>

cron: string

[Link to this property](#)

created_on: optional string

[Link to this property](#)

modified_on: optional string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

##### [List Tails](/api/resources/workers/subresources/scripts/subresources/tail/methods/get)

GET/accounts/{account_id}/workers/scripts/{script_name}/tails

##### [Start Tail](/api/resources/workers/subresources/scripts/subresources/tail/methods/create)

POST/accounts/{account_id}/workers/scripts/{script_name}/tails

##### [Delete Tail](/api/resources/workers/subresources/scripts/subresources/tail/methods/delete)

DELETE/accounts/{account_id}/workers/scripts/{script_name}/tails/{id}

##### Models

<details>

<summary>

ConsumerScript object { service, environment, namespace }

A reference to a script that will consume logs from the attached Worker.

</summary>

service: string

Name of Worker that is to be the consumer.

[Link to this property](#)

environment: optional string

Optional environment if the Worker utilizes one.

[Link to this property](#)

namespace: optional string

Optional dispatch namespace the script belongs to.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

TailGetResponse object { id, expires_at, url }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

expires_at: string

[Link to this property](#)

url: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

TailCreateResponse object { id, expires_at, url }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

expires_at: string

[Link to this property](#)

url: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

TailDeleteResponse object { errors, messages, success }

</summary>

<details>

<summary>

errors: array of object { code, message, documentation_url, source }

</summary>

code: number

minimum1000

[Link to this property](#)

message: string

[Link to this property](#)

documentation_url: optional string

[Link to this property](#)

<details>

<summary>

source: optional object { pointer }

</summary>

pointer: optional string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

messages: array of object { code, message, documentation_url, source }

</summary>

code: number

minimum1000

[Link to this property](#)

message: string

[Link to this property](#)

documentation_url: optional string

[Link to this property](#)

<details>

<summary>

source: optional object { pointer }

</summary>

pointer: optional string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

success: true

Whether the API call was successful.

[Link to this property](#)

</details>

[Link to this property](#)

##### [Get script content](/api/resources/workers/subresources/scripts/subresources/content/methods/get)

GET/accounts/{account_id}/workers/scripts/{script_name}/content/v2

##### [Put script content](/api/resources/workers/subresources/scripts/subresources/content/methods/update)

PUT/accounts/{account_id}/workers/scripts/{script_name}/content

##### [Get Script Settings](/api/resources/workers/subresources/scripts/subresources/settings/methods/get)

GET/accounts/{account_id}/workers/scripts/{script_name}/script-settings

##### [Patch Script Settings](/api/resources/workers/subresources/scripts/subresources/settings/methods/edit)

PATCH/accounts/{account_id}/workers/scripts/{script_name}/script-settings

##### [List Deployments](/api/resources/workers/subresources/scripts/subresources/deployments/methods/list)

GET/accounts/{account_id}/workers/scripts/{script_name}/deployments

##### [Create Deployment](/api/resources/workers/subresources/scripts/subresources/deployments/methods/create)

POST/accounts/{account_id}/workers/scripts/{script_name}/deployments

##### [Get Deployment](/api/resources/workers/subresources/scripts/subresources/deployments/methods/get)

GET/accounts/{account_id}/workers/scripts/{script_name}/deployments/{deployment_id}

##### [Delete Deployment](/api/resources/workers/subresources/scripts/subresources/deployments/methods/delete)

DELETE/accounts/{account_id}/workers/scripts/{script_name}/deployments/{deployment_id}

##### Models

<details>

<summary>

Deployment object { id, created_on, source, 4 more }

</summary>

id: string

formatuuid

[Link to this property](#)

created_on: string

formatdate-time

[Link to this property](#)

source: string

[Link to this property](#)

strategy: "percentage"

[Link to this property](#)

<details>

<summary>

versions: array of object { percentage, version_id }

</summary>

percentage: number

maximum100

minimum0.01

[Link to this property](#)

version_id: string

formatuuid

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

annotations: optional object { "workers/message", "workers/triggered_by" }

</summary>

"workers/message": optional string

Human-readable message about the deployment. Truncated to 1000 bytes if longer.

maxLength1000

[Link to this property](#)

"workers/triggered_by": optional string

Operation that triggered the creation of the deployment.

[Link to this property](#)

</details>

[Link to this property](#)

author_email: optional string

formatemail

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DeploymentListResponse object { deployments }

</summary>

<details>

<summary>

deployments: array of [Deployment](/api/resources/workers#(resource)%20workers.scripts.deployments%20%3E%20(model)%20deployment%20%3E%20(schema)) { id, created_on, source, 4 more }

</summary>

id: string

formatuuid

[Link to this property](#)

created_on: string

formatdate-time

[Link to this property](#)

source: string

[Link to this property](#)

strategy: "percentage"

[Link to this property](#)

<details>

<summary>

versions: array of object { percentage, version_id }

</summary>

percentage: number

maximum100

minimum0.01

[Link to this property](#)

version_id: string

formatuuid

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

annotations: optional object { "workers/message", "workers/triggered_by" }

</summary>

"workers/message": optional string

Human-readable message about the deployment. Truncated to 1000 bytes if longer.

maxLength1000

[Link to this property](#)

"workers/triggered_by": optional string

Operation that triggered the creation of the deployment.

[Link to this property](#)

</details>

[Link to this property](#)

author_email: optional string

formatemail

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DeploymentDeleteResponse object { errors, messages, success }

</summary>

<details>

<summary>

errors: array of object { code, message, documentation_url, source }

</summary>

code: number

minimum1000

[Link to this property](#)

message: string

[Link to this property](#)

documentation_url: optional string

[Link to this property](#)

<details>

<summary>

source: optional object { pointer }

</summary>

pointer: optional string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

messages: array of object { code, message, documentation_url, source }

</summary>

code: number

minimum1000

[Link to this property](#)

message: string

[Link to this property](#)

documentation_url: optional string

[Link to this property](#)

<details>

<summary>

source: optional object { pointer }

</summary>

pointer: optional string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

success: true

Whether the API call was successful.

[Link to this property](#)

</details>

[Link to this property](#)

##### [List Versions](/api/resources/workers/subresources/scripts/subresources/versions/methods/list)

GET/accounts/{account_id}/workers/scripts/{script_name}/versions

##### [Get Version Detail](/api/resources/workers/subresources/scripts/subresources/versions/methods/get)

GET/accounts/{account_id}/workers/scripts/{script_name}/versions/{version_id}

##### [Upload Version](/api/resources/workers/subresources/scripts/subresources/versions/methods/create)

POST/accounts/{account_id}/workers/scripts/{script_name}/versions

##### Models

<details>

<summary>

VersionListResponse object { id, metadata, number }

</summary>

id: optional string

Unique identifier for the version.

[Link to this property](#)

<details>

<summary>

metadata: optional object { author_email, author_id, created_on, 3 more }

</summary>

author_email: optional string

Email of the user who created the version.

[Link to this property](#)

author_id: optional string

Identifier of the user who created the version.

[Link to this property](#)

created_on: optional string

When the version was created.

[Link to this property](#)

hasPreview: optional boolean

Whether the version can be previewed.

[Link to this property](#)

modified_on: optional string

When the version was last modified.

[Link to this property](#)

<details>

<summary>

source: optional "unknown" or "api" or "wrangler" or 8 more

The source of the version upload.

</summary>

One of the following:

"unknown"

[Link to this property](#)

"api"

[Link to this property](#)

"wrangler"

[Link to this property](#)

"terraform"

[Link to this property](#)

"dash"

[Link to this property](#)

"cf_cli"

[Link to this property](#)

"dash_template"

[Link to this property](#)

"integration"

[Link to this property](#)

"quick_editor"

[Link to this property](#)

"playground"

[Link to this property](#)

"workersci"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

number: optional number

Sequential version number.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

VersionGetResponse object { resources, id, metadata, number }

</summary>

<details>

<summary>

resources: object { bindings, script, script_runtime }

</summary>

bindings: optional

List of bindings attached to a Worker. You can find more about bindings on our docs: https://developers.cloudflare.com/workers/configuration/multipart-upload-metadata/#bindings.

[Link to this property](#)

<details>

<summary>

script: optional object { etag, handlers, last_deployed_from, named_handlers }

</summary>

etag: optional string

Hashed script content

[Link to this property](#)

handlers: optional array of string

The names of handlers exported as part of the default export.

[Link to this property](#)

last_deployed_from: optional string

The client most recently used to deploy this Worker.

[Link to this property](#)

<details>

<summary>

named_handlers: optional array of object { handlers, name }

Named exports, such as Durable Object class implementations and named entrypoints.

</summary>

handlers: optional array of string

The names of handlers exported as part of the named export.

[Link to this property](#)

name: optional string

The name of the exported class or entrypoint.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

script_runtime: optional object { compatibility_date, compatibility_flags, exports, 3 more }

Runtime configuration for the Worker.

</summary>

compatibility_date: optional string

Date indicating targeted support in the Workers runtime. Backwards incompatible fixes to the runtime following this date will not affect this Worker.

[Link to this property](#)

compatibility_flags: optional array of string

Flags that enable or disable certain features in the Workers runtime.

[Link to this property](#)

<details>

<summary>

exports: optional map[object { type, cache, state } or object { storage, type, container, state } or object { state, type } or 3 more]

Declarative exports for this version, including Durable Object classes (with their `storage` backend) and named Worker entrypoints. Tombstoned lifecycle entries are omitted, so only live exports (`created` and `expecting-transfer`) are returned.

</summary>

One of the following:

<details>

<summary>

Worker object { type, cache, state }

A named Worker entrypoint export (`type: worker`). Worker entrypoints are always live (`state: created`) and carry no storage or lifecycle fields. The optional `cache` block overrides the Worker’s global `cache_options.enabled` for this entrypoint.

</summary>

type: "worker"

Marks this entry as a Worker entrypoint export.

[Link to this property](#)

<details>

<summary>

cache: optional object { enabled }

Cache override for this entrypoint. Overrides the Worker’s global `cache_options.enabled` for this entrypoint only.

</summary>

enabled: boolean

Whether caching is enabled for this entrypoint.

[Link to this property](#)

</details>

[Link to this property](#)

state: optional "created"

Live export. May be omitted; defaults to `created`.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

WorkersDurableObjectExport object { storage, type, container, state }

A live Durable Object export (`state: created`, the default). The platform auto-provisions the namespace on first deploy, matches it on subsequent deploys, and never mutates or deletes it as a side effect of a code-only change. `storage` is required; `renamed_to`, `transferred_to` and `transfer_from` are not allowed on a live entry.

</summary>

<details>

<summary>

storage: "sqlite" or "legacy-kv"

Durable Object storage backend. `sqlite` is the recommended (and only) backend for new namespaces. `legacy-kv` is accepted only for a class whose namespace already exists as KV-backed; the `exports` flow never provisions a new `legacy-kv` namespace.

</summary>

One of the following:

"sqlite"

[Link to this property](#)

"legacy-kv"

[Link to this property](#)

</details>

[Link to this property](#)

type: "durable-object"

Marks this entry as a Durable Object export.

[Link to this property](#)

container: optional string

Name of the container (declared in the upload’s `metadata.containers`) that backs this Durable Object. When set, the namespace is container-enabled. Valid only on live entries.

maxLength128

[Link to this property](#)

state: optional "created"

Live export. May be omitted; defaults to `created`.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

WorkersDurableObjectDeletedExport object { state, type }

A `deleted` tombstone: retires the provisioned namespace for this class and all of its data. The class must be absent from the uploaded code and no other Worker in the account may bind to the namespace, otherwise the deploy is rejected. No other fields are allowed. Deletion is irreversible.

</summary>

state: "deleted"

Tombstone that deletes the namespace.

[Link to this property](#)

type: "durable-object"

Marks this entry as a Durable Object export.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

WorkersDurableObjectRenamedExport object { renamed_to, state, type }

A `renamed` tombstone: rewrites the provisioned namespace’s class name from this map key to `renamed_to`. The source class may stay in code during the rollout window (an info notice is emitted). `storage`, `transferred_to` and `transfer_from` are not allowed.

</summary>

renamed_to: string

The destination class name. Must differ from the source class (the map key) and must be declared as a live (`created`) entry in the same `exports` map. Write-only: never present in GET responses.

maxLength128

[Link to this property](#)

state: "renamed"

Tombstone that renames the namespace’s class.

[Link to this property](#)

type: "durable-object"

Marks this entry as a Durable Object export.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

WorkersDurableObjectTransferredExport object { state, transferred_to, type }

A `transferred` tombstone (source side of a two-phase transfer): hands ownership of the provisioned namespace to another script in the same account, named by `transferred_to`. The target must have already deployed a matching `expecting-transfer` entry. The source class may stay in code during the rollout window (an info notice is emitted). `storage`, `renamed_to` and `transfer_from` are not allowed.

</summary>

state: "transferred"

Tombstone that transfers the namespace to another script.

[Link to this property](#)

transferred_to: string

The destination script name. Must be in the same account and the same dispatch-namespace context (or both non-dispatch). Cross-dispatch-namespace transfers are rejected. Write-only: never present in GET responses.

maxLength128

[Link to this property](#)

type: "durable-object"

Marks this entry as a Durable Object export.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

WorkersDurableObjectExpectingTransferExport object { state, storage, transfer_from, 2 more }

The target side of a two-phase transfer (`state: expecting-transfer`). Declares that this script expects to receive a namespace for this class from the `transfer_from` script. This is a live entry, not a tombstone: bindings resolve through the source’s namespace until the source commits with a `transferred` tombstone. `storage` and `transfer_from` are required; `renamed_to` and `transferred_to` are not allowed.

</summary>

state: "expecting-transfer"

Target side of a two-phase transfer.

[Link to this property](#)

<details>

<summary>

storage: "sqlite" or "legacy-kv"

Durable Object storage backend. `sqlite` is the recommended (and only) backend for new namespaces. `legacy-kv` is accepted only for a class whose namespace already exists as KV-backed; the `exports` flow never provisions a new `legacy-kv` namespace.

</summary>

One of the following:

"sqlite"

[Link to this property](#)

"legacy-kv"

[Link to this property](#)

</details>

[Link to this property](#)

transfer_from: string

The source script name to receive the namespace from. Must be in the same account and dispatch-namespace context. Present on reads for `expecting-transfer` entries.

maxLength128

[Link to this property](#)

type: "durable-object"

Marks this entry as a Durable Object export.

[Link to this property](#)

container: optional string

Name of the container (declared in the upload’s `metadata.containers`) that backs this Durable Object once the transfer settles. Valid only on live entries.

maxLength128

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

limits: optional object { cpu_ms }

Resource limits for the Worker.

</summary>

cpu_ms: optional number

The amount of CPU time this Worker can use in milliseconds.

[Link to this property](#)

</details>

[Link to this property](#)

migration_tag: optional string

The tag of the Durable Object migration that was most recently applied for this Worker.

[Link to this property](#)

<details>

<summary>

usage_model: optional "bundled" or "unbound" or "standard"

Usage model for the Worker invocations.

</summary>

One of the following:

"bundled"

[Link to this property](#)

"unbound"

[Link to this property](#)

"standard"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

id: optional string

Unique identifier for the version.

[Link to this property](#)

<details>

<summary>

metadata: optional object { author_email, author_id, created_on, 3 more }

</summary>

author_email: optional string

Email of the user who created the version.

[Link to this property](#)

author_id: optional string

Identifier of the user who created the version.

[Link to this property](#)

created_on: optional string

When the version was created.

[Link to this property](#)

hasPreview: optional boolean

Whether the version can be previewed.

[Link to this property](#)

modified_on: optional string

When the version was last modified.

[Link to this property](#)

<details>

<summary>

source: optional "unknown" or "api" or "wrangler" or 8 more

The source of the version upload.

</summary>

One of the following:

"unknown"

[Link to this property](#)

"api"

[Link to this property](#)

"wrangler"

[Link to this property](#)

"terraform"

[Link to this property](#)

"dash"

[Link to this property](#)

"cf_cli"

[Link to this property](#)

"dash_template"

[Link to this property](#)

"integration"

[Link to this property](#)

"quick_editor"

[Link to this property](#)

"playground"

[Link to this property](#)

"workersci"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

number: optional number

Sequential version number.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

VersionCreateResponse object { resources, id, exports_reconciliation, 3 more }

</summary>

<details>

<summary>

resources: object { bindings, script, script_runtime }

</summary>

bindings: optional

List of bindings attached to a Worker. You can find more about bindings on our docs: https://developers.cloudflare.com/workers/configuration/multipart-upload-metadata/#bindings.

[Link to this property](#)

<details>

<summary>

script: optional object { etag, handlers, last_deployed_from, named_handlers }

</summary>

etag: optional string

Hashed script content

[Link to this property](#)

handlers: optional array of string

The names of handlers exported as part of the default export.

[Link to this property](#)

last_deployed_from: optional string

The client most recently used to deploy this Worker.

[Link to this property](#)

<details>

<summary>

named_handlers: optional array of object { handlers, name }

Named exports, such as Durable Object class implementations and named entrypoints.

</summary>

handlers: optional array of string

The names of handlers exported as part of the named export.

[Link to this property](#)

name: optional string

The name of the exported class or entrypoint.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

script_runtime: optional object { compatibility_date, compatibility_flags, exports, 3 more }

Runtime configuration for the Worker.

</summary>

compatibility_date: optional string

Date indicating targeted support in the Workers runtime. Backwards incompatible fixes to the runtime following this date will not affect this Worker.

[Link to this property](#)

compatibility_flags: optional array of string

Flags that enable or disable certain features in the Workers runtime.

[Link to this property](#)

<details>

<summary>

exports: optional map[object { type, cache, state } or object { storage, type, container, state } or object { state, type } or 3 more]

Declarative exports for this version, including Durable Object classes (with their `storage` backend) and named Worker entrypoints. Tombstoned lifecycle entries are omitted, so only live exports (`created` and `expecting-transfer`) are returned.

</summary>

One of the following:

<details>

<summary>

Worker object { type, cache, state }

A named Worker entrypoint export (`type: worker`). Worker entrypoints are always live (`state: created`) and carry no storage or lifecycle fields. The optional `cache` block overrides the Worker’s global `cache_options.enabled` for this entrypoint.

</summary>

type: "worker"

Marks this entry as a Worker entrypoint export.

[Link to this property](#)

<details>

<summary>

cache: optional object { enabled }

Cache override for this entrypoint. Overrides the Worker’s global `cache_options.enabled` for this entrypoint only.

</summary>

enabled: boolean

Whether caching is enabled for this entrypoint.

[Link to this property](#)

</details>

[Link to this property](#)

state: optional "created"

Live export. May be omitted; defaults to `created`.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

WorkersDurableObjectExport object { storage, type, container, state }

A live Durable Object export (`state: created`, the default). The platform auto-provisions the namespace on first deploy, matches it on subsequent deploys, and never mutates or deletes it as a side effect of a code-only change. `storage` is required; `renamed_to`, `transferred_to` and `transfer_from` are not allowed on a live entry.

</summary>

<details>

<summary>

storage: "sqlite" or "legacy-kv"

Durable Object storage backend. `sqlite` is the recommended (and only) backend for new namespaces. `legacy-kv` is accepted only for a class whose namespace already exists as KV-backed; the `exports` flow never provisions a new `legacy-kv` namespace.

</summary>

One of the following:

"sqlite"

[Link to this property](#)

"legacy-kv"

[Link to this property](#)

</details>

[Link to this property](#)

type: "durable-object"

Marks this entry as a Durable Object export.

[Link to this property](#)

container: optional string

Name of the container (declared in the upload’s `metadata.containers`) that backs this Durable Object. When set, the namespace is container-enabled. Valid only on live entries.

maxLength128

[Link to this property](#)

state: optional "created"

Live export. May be omitted; defaults to `created`.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

WorkersDurableObjectDeletedExport object { state, type }

A `deleted` tombstone: retires the provisioned namespace for this class and all of its data. The class must be absent from the uploaded code and no other Worker in the account may bind to the namespace, otherwise the deploy is rejected. No other fields are allowed. Deletion is irreversible.

</summary>

state: "deleted"

Tombstone that deletes the namespace.

[Link to this property](#)

type: "durable-object"

Marks this entry as a Durable Object export.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

WorkersDurableObjectRenamedExport object { renamed_to, state, type }

A `renamed` tombstone: rewrites the provisioned namespace’s class name from this map key to `renamed_to`. The source class may stay in code during the rollout window (an info notice is emitted). `storage`, `transferred_to` and `transfer_from` are not allowed.

</summary>

renamed_to: string

The destination class name. Must differ from the source class (the map key) and must be declared as a live (`created`) entry in the same `exports` map. Write-only: never present in GET responses.

maxLength128

[Link to this property](#)

state: "renamed"

Tombstone that renames the namespace’s class.

[Link to this property](#)

type: "durable-object"

Marks this entry as a Durable Object export.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

WorkersDurableObjectTransferredExport object { state, transferred_to, type }

A `transferred` tombstone (source side of a two-phase transfer): hands ownership of the provisioned namespace to another script in the same account, named by `transferred_to`. The target must have already deployed a matching `expecting-transfer` entry. The source class may stay in code during the rollout window (an info notice is emitted). `storage`, `renamed_to` and `transfer_from` are not allowed.

</summary>

state: "transferred"

Tombstone that transfers the namespace to another script.

[Link to this property](#)

transferred_to: string

The destination script name. Must be in the same account and the same dispatch-namespace context (or both non-dispatch). Cross-dispatch-namespace transfers are rejected. Write-only: never present in GET responses.

maxLength128

[Link to this property](#)

type: "durable-object"

Marks this entry as a Durable Object export.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

WorkersDurableObjectExpectingTransferExport object { state, storage, transfer_from, 2 more }

The target side of a two-phase transfer (`state: expecting-transfer`). Declares that this script expects to receive a namespace for this class from the `transfer_from` script. This is a live entry, not a tombstone: bindings resolve through the source’s namespace until the source commits with a `transferred` tombstone. `storage` and `transfer_from` are required; `renamed_to` and `transferred_to` are not allowed.

</summary>

state: "expecting-transfer"

Target side of a two-phase transfer.

[Link to this property](#)

<details>

<summary>

storage: "sqlite" or "legacy-kv"

Durable Object storage backend. `sqlite` is the recommended (and only) backend for new namespaces. `legacy-kv` is accepted only for a class whose namespace already exists as KV-backed; the `exports` flow never provisions a new `legacy-kv` namespace.

</summary>

One of the following:

"sqlite"

[Link to this property](#)

"legacy-kv"

[Link to this property](#)

</details>

[Link to this property](#)

transfer_from: string

The source script name to receive the namespace from. Must be in the same account and dispatch-namespace context. Present on reads for `expecting-transfer` entries.

maxLength128

[Link to this property](#)

type: "durable-object"

Marks this entry as a Durable Object export.

[Link to this property](#)

container: optional string

Name of the container (declared in the upload’s `metadata.containers`) that backs this Durable Object once the transfer settles. Valid only on live entries.

maxLength128

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

limits: optional object { cpu_ms }

Resource limits for the Worker.

</summary>

cpu_ms: optional number

The amount of CPU time this Worker can use in milliseconds.

[Link to this property](#)

</details>

[Link to this property](#)

migration_tag: optional string

The tag of the Durable Object migration that was most recently applied for this Worker.

[Link to this property](#)

<details>

<summary>

usage_model: optional "bundled" or "unbound" or "standard"

Usage model for the Worker invocations.

</summary>

One of the following:

"bundled"

[Link to this property](#)

"unbound"

[Link to this property](#)

"standard"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

id: optional string

Unique identifier for the version.

[Link to this property](#)

<details>

<summary>

exports_reconciliation: optional object { created, deleted, info, 6 more }

Summary of the declarative exports reconciliation that ran on this upload. Populated only when the uploaded metadata included an `exports` block. Durable Object entries drive reconciliation; `type: worker` entries do not contribute to this summary.

</summary>

created: array of string

Class names for which a new namespace was provisioned.

[Link to this property](#)

deleted: array of string

Class names whose namespace was deleted by a `deleted` tombstone.

[Link to this property](#)

<details>

<summary>

info: array of object { class, message, scenario, 2 more }

Non-blocking info entries (stale tombstones, tombstone applied with class still in code). See `exports_reconciliation_info`.

</summary>

class: string

The class name the info entry is about.

[Link to this property](#)

message: string

Human-readable explanation.

[Link to this property](#)

<details>

<summary>

scenario: "code_class_not_in_exports" or "provisioned_class_missing_from_config" or "config_export_not_in_code" or 30 more

Stable, machine-readable tag identifying which reconciliation scenario produced an error, warning, or info entry. Clients may branch on this value instead of parsing `message`.

</summary>

One of the following:

"code_class_not_in_exports"

[Link to this property](#)

"provisioned_class_missing_from_config"

[Link to this property](#)

"config_export_not_in_code"

[Link to this property](#)

"config_references_nonexistent_class"

[Link to this property](#)

"orphaned_provisioned_namespace"

[Link to this property](#)

"storage_type_mismatch"

[Link to this property](#)

"free_tier_requires_sqlite"

[Link to this property](#)

"invalid_export"

[Link to this property](#)

"tombstone_delete_class_still_in_code"

[Link to this property](#)

"tombstone_delete_blocked_by_external_bindings"

[Link to this property](#)

"tombstone_renamed_to_occupied"

[Link to this property](#)

"transferred_pending_not_found"

[Link to this property](#)

"transferred_target_missing"

[Link to this property](#)

"transferred_target_mismatch"

[Link to this property](#)

"phase_one_transfer_source_missing"

[Link to this property](#)

"phase_one_transfer_source_namespace_missing"

[Link to this property](#)

"phase_one_transfer_target_class_provisioned"

[Link to this property](#)

"phase_one_transfer_after_commit_mismatch"

[Link to this property](#)

"phase_one_transfer_duplicate"

[Link to this property](#)

"phase_one_transfer_target_in_dispatch_namespace"

[Link to this property](#)

"phase_one_transfer_source_in_dispatch_namespace"

[Link to this property](#)

"transferred_source_in_dispatch_namespace"

[Link to this property](#)

"transferred_target_in_dispatch_namespace"

[Link to this property](#)

"container_undeclared_reference"

[Link to this property](#)

"container_class_not_durable_object"

[Link to this property](#)

"container_wiring_inconsistent"

[Link to this property](#)

"container_multiple_durable_objects"

[Link to this property](#)

"transfer_container_parity_mismatch"

[Link to this property](#)

"transfer_container_parity_mismatch_on_commit"

[Link to this property](#)

"tombstone_class_still_in_code"

[Link to this property](#)

"stale_tombstone"

[Link to this property](#)

"transfer_receive_already_applied"

[Link to this property](#)

"transfer_receive_cleanup_complete"

[Link to this property](#)

</details>

[Link to this property](#)

namespace_id: optional string

The provisioned namespace the entry relates to, when applicable.

formatuuid

[Link to this property](#)

referencing_scripts: optional array of string

Other Workers in the account that still bind to the affected class. Advisory: while non-empty the tombstone is not yet safe to remove — redeploy these Workers with bindings re-pointed first.

[Link to this property](#)

</details>

[Link to this property](#)

removable_entries: array of string

Source class names whose tombstone entry is now stale and safe to delete from `exports` (no remaining referencing scripts).

[Link to this property](#)

<details>

<summary>

renamed: array of object { from, to }

Applied `renamed` tombstones.

</summary>

from: string

The original (source) class name.

[Link to this property](#)

to: string

The new class name (`renamed_to`).

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

transfer_pending: array of object { class, from }

Phase-1 transfer hints recorded on the target side.

</summary>

class: string

The target-side class name awaiting transfer.

[Link to this property](#)

from: string

The source script the namespace will be transferred from.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

transferred: array of object { class, phase, to }

Committed `transferred` tombstones (phase-2).

</summary>

class: string

The source class name that was transferred.

[Link to this property](#)

phase: "committed"

The transfer phase. Currently always `committed`.

[Link to this property](#)

to: string

The destination script that now owns the namespace.

[Link to this property](#)

</details>

[Link to this property](#)

updated: array of string

Class names whose provisioned namespace was mutated in place.

[Link to this property](#)

<details>

<summary>

warnings: array of object { class, message, scenario, namespace_id }

Non-blocking warnings. See `exports_reconciliation_warning`.

</summary>

class: string

The class name the warning is about.

[Link to this property](#)

message: string

Human-readable explanation of the warning.

[Link to this property](#)

<details>

<summary>

scenario: "code_class_not_in_exports" or "provisioned_class_missing_from_config" or "config_export_not_in_code" or 30 more

Stable, machine-readable tag identifying which reconciliation scenario produced an error, warning, or info entry. Clients may branch on this value instead of parsing `message`.

</summary>

One of the following:

"code_class_not_in_exports"

[Link to this property](#)

"provisioned_class_missing_from_config"

[Link to this property](#)

"config_export_not_in_code"

[Link to this property](#)

"config_references_nonexistent_class"

[Link to this property](#)

"orphaned_provisioned_namespace"

[Link to this property](#)

"storage_type_mismatch"

[Link to this property](#)

"free_tier_requires_sqlite"

[Link to this property](#)

"invalid_export"

[Link to this property](#)

"tombstone_delete_class_still_in_code"

[Link to this property](#)

"tombstone_delete_blocked_by_external_bindings"

[Link to this property](#)

"tombstone_renamed_to_occupied"

[Link to this property](#)

"transferred_pending_not_found"

[Link to this property](#)

"transferred_target_missing"

[Link to this property](#)

"transferred_target_mismatch"

[Link to this property](#)

"phase_one_transfer_source_missing"

[Link to this property](#)

"phase_one_transfer_source_namespace_missing"

[Link to this property](#)

"phase_one_transfer_target_class_provisioned"

[Link to this property](#)

"phase_one_transfer_after_commit_mismatch"

[Link to this property](#)

"phase_one_transfer_duplicate"

[Link to this property](#)

"phase_one_transfer_target_in_dispatch_namespace"

[Link to this property](#)

"phase_one_transfer_source_in_dispatch_namespace"

[Link to this property](#)

"transferred_source_in_dispatch_namespace"

[Link to this property](#)

"transferred_target_in_dispatch_namespace"

[Link to this property](#)

"container_undeclared_reference"

[Link to this property](#)

"container_class_not_durable_object"

[Link to this property](#)

"container_wiring_inconsistent"

[Link to this property](#)

"container_multiple_durable_objects"

[Link to this property](#)

"transfer_container_parity_mismatch"

[Link to this property](#)

"transfer_container_parity_mismatch_on_commit"

[Link to this property](#)

"tombstone_class_still_in_code"

[Link to this property](#)

"stale_tombstone"

[Link to this property](#)

"transfer_receive_already_applied"

[Link to this property](#)

"transfer_receive_cleanup_complete"

[Link to this property](#)

</details>

[Link to this property](#)

namespace_id: optional string

The provisioned namespace the warning relates to, when applicable.

formatuuid

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

metadata: optional object { author_email, author_id, created_on, 3 more }

</summary>

author_email: optional string

Email of the user who created the version.

[Link to this property](#)

author_id: optional string

Identifier of the user who created the version.

[Link to this property](#)

created_on: optional string

When the version was created.

[Link to this property](#)

hasPreview: optional boolean

Whether the version can be previewed.

[Link to this property](#)

modified_on: optional string

When the version was last modified.

[Link to this property](#)

<details>

<summary>

source: optional "unknown" or "api" or "wrangler" or 8 more

The source of the version upload.

</summary>

One of the following:

"unknown"

[Link to this property](#)

"api"

[Link to this property](#)

"wrangler"

[Link to this property](#)

"terraform"

[Link to this property](#)

"dash"

[Link to this property](#)

"cf_cli"

[Link to this property](#)

"dash_template"

[Link to this property](#)

"integration"

[Link to this property](#)

"quick_editor"

[Link to this property](#)

"playground"

[Link to this property](#)

"workersci"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

number: optional number

Sequential version number.

[Link to this property](#)

startup_time_ms: optional number

Time in milliseconds spent on [Worker startup](https://developers.cloudflare.com/workers/platform/limits/#worker-startup-time).

[Link to this property](#)

</details>

[Link to this property](#)

##### [List script secrets](/api/resources/workers/subresources/scripts/subresources/secrets/methods/list)

GET/accounts/{account_id}/workers/scripts/{script_name}/secrets

##### [Get secret binding](/api/resources/workers/subresources/scripts/subresources/secrets/methods/get)

GET/accounts/{account_id}/workers/scripts/{script_name}/secrets/{secret_name}

##### [Add script secret](/api/resources/workers/subresources/scripts/subresources/secrets/methods/update)

PUT/accounts/{account_id}/workers/scripts/{script_name}/secrets

##### [Delete script secret](/api/resources/workers/subresources/scripts/subresources/secrets/methods/delete)

DELETE/accounts/{account_id}/workers/scripts/{script_name}/secrets/{secret_name}

##### [Patch multiple script secrets](/api/resources/workers/subresources/scripts/subresources/secrets/methods/bulk_update)

PATCH/accounts/{account_id}/workers/scripts/{script_name}/secrets-bulk

##### Models

<details>

<summary>

SecretListResponse = object { name, text, type } or object { algorithm, format, name, 4 more }

A secret value accessible through a binding.

</summary>

One of the following:

<details>

<summary>

SecretText object { name, text, type }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

text: string

The secret value to use.

[Link to this property](#)

type: "secret_text"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SecretKey object { algorithm, format, name, 4 more }

</summary>

algorithm: unknown

Algorithm-specific key parameters. [Learn more](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#algorithm).

[Link to this property](#)

<details>

<summary>

format: "raw" or "pkcs8" or "spki" or "jwk"

Data format of the key. [Learn more](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#format).

</summary>

One of the following:

"raw"

[Link to this property](#)

"pkcs8"

[Link to this property](#)

"spki"

[Link to this property](#)

"jwk"

[Link to this property](#)

</details>

[Link to this property](#)

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

type: "secret_key"

The kind of resource that the binding provides.

[Link to this property](#)

<details>

<summary>

usages: array of "encrypt" or "decrypt" or "sign" or 5 more

Allowed operations with the key. [Learn more](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#keyUsages).

</summary>

One of the following:

"encrypt"

[Link to this property](#)

"decrypt"

[Link to this property](#)

"sign"

[Link to this property](#)

"verify"

[Link to this property](#)

"deriveKey"

[Link to this property](#)

"deriveBits"

[Link to this property](#)

"wrapKey"

[Link to this property](#)

"unwrapKey"

[Link to this property](#)

</details>

[Link to this property](#)

key_base64: optional string

Base64-encoded key data. Required if `format` is “raw”, “pkcs8”, or “spki”.

[Link to this property](#)

key_jwk: optional unknown

Key data in [JSON Web Key](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#json_web_key) format. Required if `format` is “jwk”.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SecretGetResponse = object { name, text, type } or object { algorithm, format, name, 4 more }

A secret value accessible through a binding.

</summary>

One of the following:

<details>

<summary>

SecretText object { name, text, type }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

text: string

The secret value to use.

[Link to this property](#)

type: "secret_text"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SecretKey object { algorithm, format, name, 4 more }

</summary>

algorithm: unknown

Algorithm-specific key parameters. [Learn more](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#algorithm).

[Link to this property](#)

<details>

<summary>

format: "raw" or "pkcs8" or "spki" or "jwk"

Data format of the key. [Learn more](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#format).

</summary>

One of the following:

"raw"

[Link to this property](#)

"pkcs8"

[Link to this property](#)

"spki"

[Link to this property](#)

"jwk"

[Link to this property](#)

</details>

[Link to this property](#)

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

type: "secret_key"

The kind of resource that the binding provides.

[Link to this property](#)

<details>

<summary>

usages: array of "encrypt" or "decrypt" or "sign" or 5 more

Allowed operations with the key. [Learn more](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#keyUsages).

</summary>

One of the following:

"encrypt"

[Link to this property](#)

"decrypt"

[Link to this property](#)

"sign"

[Link to this property](#)

"verify"

[Link to this property](#)

"deriveKey"

[Link to this property](#)

"deriveBits"

[Link to this property](#)

"wrapKey"

[Link to this property](#)

"unwrapKey"

[Link to this property](#)

</details>

[Link to this property](#)

key_base64: optional string

Base64-encoded key data. Required if `format` is “raw”, “pkcs8”, or “spki”.

[Link to this property](#)

key_jwk: optional unknown

Key data in [JSON Web Key](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#json_web_key) format. Required if `format` is “jwk”.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SecretUpdateResponse = object { name, text, type } or object { algorithm, format, name, 4 more }

A secret value accessible through a binding.

</summary>

One of the following:

<details>

<summary>

SecretText object { name, text, type }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

text: string

The secret value to use.

[Link to this property](#)

type: "secret_text"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SecretKey object { algorithm, format, name, 4 more }

</summary>

algorithm: unknown

Algorithm-specific key parameters. [Learn more](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#algorithm).

[Link to this property](#)

<details>

<summary>

format: "raw" or "pkcs8" or "spki" or "jwk"

Data format of the key. [Learn more](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#format).

</summary>

One of the following:

"raw"

[Link to this property](#)

"pkcs8"

[Link to this property](#)

"spki"

[Link to this property](#)

"jwk"

[Link to this property](#)

</details>

[Link to this property](#)

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

type: "secret_key"

The kind of resource that the binding provides.

[Link to this property](#)

<details>

<summary>

usages: array of "encrypt" or "decrypt" or "sign" or 5 more

Allowed operations with the key. [Learn more](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#keyUsages).

</summary>

One of the following:

"encrypt"

[Link to this property](#)

"decrypt"

[Link to this property](#)

"sign"

[Link to this property](#)

"verify"

[Link to this property](#)

"deriveKey"

[Link to this property](#)

"deriveBits"

[Link to this property](#)

"wrapKey"

[Link to this property](#)

"unwrapKey"

[Link to this property](#)

</details>

[Link to this property](#)

key_base64: optional string

Base64-encoded key data. Required if `format` is “raw”, “pkcs8”, or “spki”.

[Link to this property](#)

key_jwk: optional unknown

Key data in [JSON Web Key](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#json_web_key) format. Required if `format` is “jwk”.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

SecretDeleteResponse = unknown

[Link to this property](#)

<details>

<summary>

SecretBulkUpdateResponse = map[object { name, text, type } or object { algorithm, format, name, 4 more } ]

Map of secret names to secret metadata for resulting secrets.

</summary>

One of the following:

<details>

<summary>

SecretText object { name, text, type }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

text: string

The secret value to use.

[Link to this property](#)

type: "secret_text"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SecretKey object { algorithm, format, name, 4 more }

</summary>

algorithm: unknown

Algorithm-specific key parameters. [Learn more](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#algorithm).

[Link to this property](#)

<details>

<summary>

format: "raw" or "pkcs8" or "spki" or "jwk"

Data format of the key. [Learn more](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#format).

</summary>

One of the following:

"raw"

[Link to this property](#)

"pkcs8"

[Link to this property](#)

"spki"

[Link to this property](#)

"jwk"

[Link to this property](#)

</details>

[Link to this property](#)

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

type: "secret_key"

The kind of resource that the binding provides.

[Link to this property](#)

<details>

<summary>

usages: array of "encrypt" or "decrypt" or "sign" or 5 more

Allowed operations with the key. [Learn more](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#keyUsages).

</summary>

One of the following:

"encrypt"

[Link to this property](#)

"decrypt"

[Link to this property](#)

"sign"

[Link to this property](#)

"verify"

[Link to this property](#)

"deriveKey"

[Link to this property](#)

"deriveBits"

[Link to this property](#)

"wrapKey"

[Link to this property](#)

"unwrapKey"

[Link to this property](#)

</details>

[Link to this property](#)

key_base64: optional string

Base64-encoded key data. Required if `format` is “raw”, “pkcs8”, or “spki”.

[Link to this property](#)

key_jwk: optional unknown

Key data in [JSON Web Key](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#json_web_key) format. Required if `format` is “jwk”.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

##### [Get Settings](/api/resources/workers/subresources/scripts/subresources/script_and_version_settings/methods/get)

GET/accounts/{account_id}/workers/scripts/{script_name}/settings

##### [Patch Settings](/api/resources/workers/subresources/scripts/subresources/script_and_version_settings/methods/edit)

PATCH/accounts/{account_id}/workers/scripts/{script_name}/settings

##### Models

<details>

<summary>

ScriptAndVersionSettingGetResponse object { annotations, bindings, cache_options, 12 more }

</summary>

<details>

<summary>

annotations: optional object { "workers/message", "workers/tag", "workers/triggered_by" }

Annotations for the Worker version. Annotations are not inherited across settings updates; omitting this field means the new version will have no annotations.

</summary>

"workers/message": optional string

Human-readable message about the version. Truncated to 1000 bytes if longer.

maxLength1000

[Link to this property](#)

"workers/tag": optional string

User-provided identifier for the version. Maximum 100 bytes.

maxLength100

[Link to this property](#)

"workers/triggered_by": optional string

Operation that triggered the creation of the version. This is read-only and set by the server.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

bindings: optional array of object { name, type } or object { instance_name, name, type, namespace } or object { name, namespace, type } or 33 more

List of bindings attached to a Worker. You can find more about bindings on our docs: https://developers.cloudflare.com/workers/configuration/multipart-upload-metadata/#bindings.

</summary>

One of the following:

<details>

<summary>

AI object { name, type }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

type: "ai"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AISearch object { instance_name, name, type, namespace }

</summary>

instance_name: string

The user-chosen instance name. Must exist at deploy time. The worker can search, chat, update, and manage items/jobs on this instance.

[Link to this property](#)

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

type: "ai_search"

The kind of resource that the binding provides.

[Link to this property](#)

namespace: optional string

The namespace the instance belongs to. Defaults to “default” if omitted. Customers who don’t use namespaces can simply omit this field.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AISearchNamespace object { name, namespace, type }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

namespace: string

The user-chosen namespace name. Must exist before deploy — Wrangler handles auto-creation on deploy failure (R2 bucket pattern). The “default” namespace is auto-created by config-api for new accounts. Grants full access (CRUD + search + chat) to all instances within the namespace.

[Link to this property](#)

type: "ai_search_namespace"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Messaging object { name, namespace, type }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

namespace: string

The Messaging namespace to bind to.

[Link to this property](#)

type: "messaging"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AnalyticsEngine object { dataset, name, type }

</summary>

dataset: string

The name of the dataset to bind to.

[Link to this property](#)

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

type: "analytics_engine"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Assets object { name, type }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

type: "assets"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Browser object { name, type }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

type: "browser"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

D1 object { database_id, name, type, id }

</summary>

database_id: string

Identifier of the D1 database to bind to.

[Link to this property](#)

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

type: "d1"

The kind of resource that the binding provides.

[Link to this property](#)

Deprecatedid: optional string

This property has been renamed to `database_id`.

Identifier of the D1 database to bind to.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DataBlob object { name, part, type }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

part: string

The name of the file containing the data content. Only accepted for `service worker syntax` Workers.

[Link to this property](#)

Deprecatedtype: "data_blob"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DispatchNamespace object { name, namespace, type, outbound }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

namespace: string

The name of the dispatch namespace.

[Link to this property](#)

type: "dispatch_namespace"

The kind of resource that the binding provides.

[Link to this property](#)

<details>

<summary>

outbound: optional object { params, worker }

Outbound worker.

</summary>

<details>

<summary>

params: optional array of object { name }

Pass information from the Dispatch Worker to the Outbound Worker through the parameters.

</summary>

name: string

Name of the parameter.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

worker: optional object { entrypoint, environment, service }

Outbound worker.

</summary>

entrypoint: optional string

Entrypoint to invoke on the outbound worker.

[Link to this property](#)

environment: optional string

Environment of the outbound worker.

[Link to this property](#)

service: optional string

Name of the outbound worker.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DurableObjectNamespace object { name, type, class_name, 4 more }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

type: "durable_object_namespace"

The kind of resource that the binding provides.

[Link to this property](#)

class_name: optional string

The exported class name of the Durable Object.

[Link to this property](#)

dispatch_namespace: optional string

The dispatch namespace the Durable Object script belongs to.

[Link to this property](#)

environment: optional string

The environment of the script_name to bind to.

[Link to this property](#)

namespace_id: optional string

Namespace identifier tag.

maxLength32

[Link to this property](#)

script_name: optional string

The script where the Durable Object is defined, if it is external to this Worker.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Hyperdrive object { id, name, type }

</summary>

id: string

Identifier of the Hyperdrive connection to bind to.

[Link to this property](#)

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

type: "hyperdrive"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Inherit object { name, type, old_name, version_id }

</summary>

name: string

The name of the inherited binding.

[Link to this property](#)

type: "inherit"

The kind of resource that the binding provides.

[Link to this property](#)

old_name: optional string

The old name of the inherited binding. If set, the binding will be renamed from `old_name` to `name` in the new version. If not set, the binding will keep the same name between versions.

[Link to this property](#)

version_id: optional string

Identifier for the version to inherit the binding from, which can be the version ID or the literal “latest” to inherit from the latest version. Defaults to inheriting the binding from the latest version.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Images object { name, type }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

type: "images"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Json object { json, name, type }

</summary>

json: unknown

JSON data to use.

[Link to this property](#)

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

type: "json"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

KVNamespace object { name, namespace_id, type }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

namespace_id: string

Namespace identifier tag.

maxLength32

[Link to this property](#)

type: "kv_namespace"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Media object { name, type }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

type: "media"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

MTLSCertificate object { certificate_id, name, type }

</summary>

certificate_id: string

Identifier of the certificate to bind to.

[Link to this property](#)

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

type: "mtls_certificate"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

PlainText object { name, text, type }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

text: string

The text value to use.

[Link to this property](#)

type: "plain_text"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Pipelines object { name, pipeline, type }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

pipeline: string

Name of the Pipeline to bind to.

[Link to this property](#)

type: "pipelines"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Queue object { name, queue_name, type }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

queue_name: string

Name of the Queue to bind to.

[Link to this property](#)

type: "queue"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Ratelimit object { name, namespace_id, simple, type }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

namespace_id: string

Identifier of the rate limit namespace to bind to.

[Link to this property](#)

<details>

<summary>

simple: object { limit, period, mitigation_timeout }

The rate limit configuration.

</summary>

limit: number

The limit (requests per period).

[Link to this property](#)

period: number

The period in seconds.

[Link to this property](#)

mitigation_timeout: optional number

Duration in seconds to apply the mitigation action after the rate limit is exceeded. Valid values are 0 (disabled), 10, or multiples of 60 up to 86400. Must be greater than or equal to the period when non-zero.

[Link to this property](#)

</details>

[Link to this property](#)

type: "ratelimit"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

R2Bucket object { bucket_name, name, type, jurisdiction }

</summary>

bucket_name: string

R2 bucket to bind to.

[Link to this property](#)

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

type: "r2_bucket"

The kind of resource that the binding provides.

[Link to this property](#)

<details>

<summary>

jurisdiction: optional "eu" or "fedramp" or "fedramp-high" or "us"

The [jurisdiction](https://developers.cloudflare.com/r2/reference/data-location/#jurisdictional-restrictions) of the R2 bucket.

</summary>

One of the following:

"eu"

[Link to this property](#)

"fedramp"

[Link to this property](#)

"fedramp-high"

[Link to this property](#)

"us"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SecretText object { name, text, type }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

text: string

The secret value to use.

[Link to this property](#)

type: "secret_text"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SendEmail object { name, type, allowed_destination_addresses, 2 more }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

type: "send_email"

The kind of resource that the binding provides.

[Link to this property](#)

allowed_destination_addresses: optional array of string

List of allowed destination addresses.

[Link to this property](#)

allowed_sender_addresses: optional array of string

List of allowed sender addresses.

[Link to this property](#)

destination_address: optional string

Destination address for the email.

formatemail

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Service object { name, service, type, 2 more }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

service: string

Name of Worker to bind to.

[Link to this property](#)

type: "service"

The kind of resource that the binding provides.

[Link to this property](#)

entrypoint: optional string

Entrypoint to invoke on the target Worker.

[Link to this property](#)

environment: optional string

Optional environment if the Worker utilizes one.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

TextBlob object { name, part, type }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

part: string

The name of the file containing the text content. Only accepted for `service worker syntax` Workers.

[Link to this property](#)

Deprecatedtype: "text_blob"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Vectorize object { index_name, name, type }

</summary>

index_name: string

Name of the Vectorize index to bind to.

[Link to this property](#)

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

type: "vectorize"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

VersionMetadata object { name, type }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

type: "version_metadata"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SecretsStoreSecret object { name, secret_name, store_id, type }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

secret_name: string

Name of the secret in the store.

[Link to this property](#)

store_id: string

ID of the store containing the secret.

[Link to this property](#)

type: "secrets_store_secret"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Flagship object { app_id, name, type }

</summary>

app_id: string

ID of the Flagship app to bind to for feature flag evaluation.

maxLength128

[Link to this property](#)

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

type: "flagship"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SecretKey object { algorithm, format, name, 4 more }

</summary>

algorithm: unknown

Algorithm-specific key parameters. [Learn more](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#algorithm).

[Link to this property](#)

<details>

<summary>

format: "raw" or "pkcs8" or "spki" or "jwk"

Data format of the key. [Learn more](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#format).

</summary>

One of the following:

"raw"

[Link to this property](#)

"pkcs8"

[Link to this property](#)

"spki"

[Link to this property](#)

"jwk"

[Link to this property](#)

</details>

[Link to this property](#)

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

type: "secret_key"

The kind of resource that the binding provides.

[Link to this property](#)

<details>

<summary>

usages: array of "encrypt" or "decrypt" or "sign" or 5 more

Allowed operations with the key. [Learn more](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#keyUsages).

</summary>

One of the following:

"encrypt"

[Link to this property](#)

"decrypt"

[Link to this property](#)

"sign"

[Link to this property](#)

"verify"

[Link to this property](#)

"deriveKey"

[Link to this property](#)

"deriveBits"

[Link to this property](#)

"wrapKey"

[Link to this property](#)

"unwrapKey"

[Link to this property](#)

</details>

[Link to this property](#)

key_base64: optional string

Base64-encoded key data. Required if `format` is “raw”, “pkcs8”, or “spki”.

[Link to this property](#)

key_jwk: optional unknown

Key data in [JSON Web Key](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#json_web_key) format. Required if `format` is “jwk”.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Workflow object { name, type, workflow_name, 2 more }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

type: "workflow"

The kind of resource that the binding provides.

[Link to this property](#)

workflow_name: string

Name of the Workflow to bind to.

[Link to this property](#)

class_name: optional string

Class name of the Workflow. Should only be provided if the Workflow belongs to this script.

[Link to this property](#)

script_name: optional string

Script name that contains the Workflow. If not provided, defaults to this script name.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

WasmModule object { name, part, type }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

part: string

The name of the file containing the WebAssembly module content. Only accepted for `service worker syntax` Workers.

[Link to this property](#)

Deprecatedtype: "wasm_module"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

VPCService object { name, service_id, type }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

service_id: string

Identifier of the VPC service to bind to.

[Link to this property](#)

type: "vpc_service"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

VPCNetwork object { name, type, identity, 2 more }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

type: "vpc_network"

The kind of resource that the binding provides.

[Link to this property](#)

identity: optional "runtime-email-alpha"

Enables Gateway identity for the binding. Requires network_id to be “cf1:network” and cannot be combined with tunnel_id.

[Link to this property](#)

network_id: optional string

Identifier of the network to bind to. Only “cf1:network” is currently supported. Mutually exclusive with tunnel_id.

[Link to this property](#)

tunnel_id: optional string

UUID of the Cloudflare Tunnel to bind to. Mutually exclusive with network_id.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

cache_options: optional object { enabled, cross_version_cache }

Global CacheW configuration for the Worker. When caching is on, the platform provisions a `cloudflare.app` zone for the Worker. A `type: worker` entry in the `exports` map can override this value for a single entrypoint.

</summary>

enabled: boolean

Whether caching is enabled for this Worker.

[Link to this property](#)

cross_version_cache: optional boolean

Whether cached responses are shared across Worker version uploads. This is independent of `enabled`. It can stay true while caching is off, so the preference survives turning caching off and back on.

[Link to this property](#)

</details>

[Link to this property](#)

compatibility_date: optional string

Date indicating targeted support in the Workers runtime. Backwards incompatible fixes to the runtime following this date will not affect this Worker.

[Link to this property](#)

compatibility_flags: optional array of string

Flags that enable or disable certain features in the Workers runtime. Used to enable upcoming features or opt in or out of specific changes not included in a `compatibility_date`.

[Link to this property](#)

<details>

<summary>

exports: optional map[object { type, cache, state } or object { storage, type, container, state } or object { state, type } or 3 more]

Declarative exports for the Worker. Worker entrypoint entries (`type: worker`) carry cache configuration for that entrypoint.

</summary>

One of the following:

<details>

<summary>

Worker object { type, cache, state }

A named Worker entrypoint export (`type: worker`). Worker entrypoints are always live (`state: created`) and carry no storage or lifecycle fields. The optional `cache` block overrides the Worker’s global `cache_options.enabled` for this entrypoint.

</summary>

type: "worker"

Marks this entry as a Worker entrypoint export.

[Link to this property](#)

<details>

<summary>

cache: optional object { enabled }

Cache override for this entrypoint. Overrides the Worker’s global `cache_options.enabled` for this entrypoint only.

</summary>

enabled: boolean

Whether caching is enabled for this entrypoint.

[Link to this property](#)

</details>

[Link to this property](#)

state: optional "created"

Live export. May be omitted; defaults to `created`.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

WorkersDurableObjectExport object { storage, type, container, state }

A live Durable Object export (`state: created`, the default). The platform auto-provisions the namespace on first deploy, matches it on subsequent deploys, and never mutates or deletes it as a side effect of a code-only change. `storage` is required; `renamed_to`, `transferred_to` and `transfer_from` are not allowed on a live entry.

</summary>

<details>

<summary>

storage: "sqlite" or "legacy-kv"

Durable Object storage backend. `sqlite` is the recommended (and only) backend for new namespaces. `legacy-kv` is accepted only for a class whose namespace already exists as KV-backed; the `exports` flow never provisions a new `legacy-kv` namespace.

</summary>

One of the following:

"sqlite"

[Link to this property](#)

"legacy-kv"

[Link to this property](#)

</details>

[Link to this property](#)

type: "durable-object"

Marks this entry as a Durable Object export.

[Link to this property](#)

container: optional string

Name of the container (declared in the upload’s `metadata.containers`) that backs this Durable Object. When set, the namespace is container-enabled. Valid only on live entries.

maxLength128

[Link to this property](#)

state: optional "created"

Live export. May be omitted; defaults to `created`.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

WorkersDurableObjectDeletedExport object { state, type }

A `deleted` tombstone: retires the provisioned namespace for this class and all of its data. The class must be absent from the uploaded code and no other Worker in the account may bind to the namespace, otherwise the deploy is rejected. No other fields are allowed. Deletion is irreversible.

</summary>

state: "deleted"

Tombstone that deletes the namespace.

[Link to this property](#)

type: "durable-object"

Marks this entry as a Durable Object export.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

WorkersDurableObjectRenamedExport object { renamed_to, state, type }

A `renamed` tombstone: rewrites the provisioned namespace’s class name from this map key to `renamed_to`. The source class may stay in code during the rollout window (an info notice is emitted). `storage`, `transferred_to` and `transfer_from` are not allowed.

</summary>

renamed_to: string

The destination class name. Must differ from the source class (the map key) and must be declared as a live (`created`) entry in the same `exports` map. Write-only: never present in GET responses.

maxLength128

[Link to this property](#)

state: "renamed"

Tombstone that renames the namespace’s class.

[Link to this property](#)

type: "durable-object"

Marks this entry as a Durable Object export.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

WorkersDurableObjectTransferredExport object { state, transferred_to, type }

A `transferred` tombstone (source side of a two-phase transfer): hands ownership of the provisioned namespace to another script in the same account, named by `transferred_to`. The target must have already deployed a matching `expecting-transfer` entry. The source class may stay in code during the rollout window (an info notice is emitted). `storage`, `renamed_to` and `transfer_from` are not allowed.

</summary>

state: "transferred"

Tombstone that transfers the namespace to another script.

[Link to this property](#)

transferred_to: string

The destination script name. Must be in the same account and the same dispatch-namespace context (or both non-dispatch). Cross-dispatch-namespace transfers are rejected. Write-only: never present in GET responses.

maxLength128

[Link to this property](#)

type: "durable-object"

Marks this entry as a Durable Object export.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

WorkersDurableObjectExpectingTransferExport object { state, storage, transfer_from, 2 more }

The target side of a two-phase transfer (`state: expecting-transfer`). Declares that this script expects to receive a namespace for this class from the `transfer_from` script. This is a live entry, not a tombstone: bindings resolve through the source’s namespace until the source commits with a `transferred` tombstone. `storage` and `transfer_from` are required; `renamed_to` and `transferred_to` are not allowed.

</summary>

state: "expecting-transfer"

Target side of a two-phase transfer.

[Link to this property](#)

<details>

<summary>

storage: "sqlite" or "legacy-kv"

Durable Object storage backend. `sqlite` is the recommended (and only) backend for new namespaces. `legacy-kv` is accepted only for a class whose namespace already exists as KV-backed; the `exports` flow never provisions a new `legacy-kv` namespace.

</summary>

One of the following:

"sqlite"

[Link to this property](#)

"legacy-kv"

[Link to this property](#)

</details>

[Link to this property](#)

transfer_from: string

The source script name to receive the namespace from. Must be in the same account and dispatch-namespace context. Present on reads for `expecting-transfer` entries.

maxLength128

[Link to this property](#)

type: "durable-object"

Marks this entry as a Durable Object export.

[Link to this property](#)

container: optional string

Name of the container (declared in the upload’s `metadata.containers`) that backs this Durable Object once the transfer settles. Valid only on live entries.

maxLength128

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

exports_reconciliation: optional object { created, deleted, info, 6 more }

Summary of the declarative exports reconciliation that ran on this upload. Populated only when the uploaded metadata included an `exports` block. Durable Object entries drive reconciliation; `type: worker` entries do not contribute to this summary.

</summary>

created: array of string

Class names for which a new namespace was provisioned.

[Link to this property](#)

deleted: array of string

Class names whose namespace was deleted by a `deleted` tombstone.

[Link to this property](#)

<details>

<summary>

info: array of object { class, message, scenario, 2 more }

Non-blocking info entries (stale tombstones, tombstone applied with class still in code). See `exports_reconciliation_info`.

</summary>

class: string

The class name the info entry is about.

[Link to this property](#)

message: string

Human-readable explanation.

[Link to this property](#)

<details>

<summary>

scenario: "code_class_not_in_exports" or "provisioned_class_missing_from_config" or "config_export_not_in_code" or 30 more

Stable, machine-readable tag identifying which reconciliation scenario produced an error, warning, or info entry. Clients may branch on this value instead of parsing `message`.

</summary>

One of the following:

"code_class_not_in_exports"

[Link to this property](#)

"provisioned_class_missing_from_config"

[Link to this property](#)

"config_export_not_in_code"

[Link to this property](#)

"config_references_nonexistent_class"

[Link to this property](#)

"orphaned_provisioned_namespace"

[Link to this property](#)

"storage_type_mismatch"

[Link to this property](#)

"free_tier_requires_sqlite"

[Link to this property](#)

"invalid_export"

[Link to this property](#)

"tombstone_delete_class_still_in_code"

[Link to this property](#)

"tombstone_delete_blocked_by_external_bindings"

[Link to this property](#)

"tombstone_renamed_to_occupied"

[Link to this property](#)

"transferred_pending_not_found"

[Link to this property](#)

"transferred_target_missing"

[Link to this property](#)

"transferred_target_mismatch"

[Link to this property](#)

"phase_one_transfer_source_missing"

[Link to this property](#)

"phase_one_transfer_source_namespace_missing"

[Link to this property](#)

"phase_one_transfer_target_class_provisioned"

[Link to this property](#)

"phase_one_transfer_after_commit_mismatch"

[Link to this property](#)

"phase_one_transfer_duplicate"

[Link to this property](#)

"phase_one_transfer_target_in_dispatch_namespace"

[Link to this property](#)

"phase_one_transfer_source_in_dispatch_namespace"

[Link to this property](#)

"transferred_source_in_dispatch_namespace"

[Link to this property](#)

"transferred_target_in_dispatch_namespace"

[Link to this property](#)

"container_undeclared_reference"

[Link to this property](#)

"container_class_not_durable_object"

[Link to this property](#)

"container_wiring_inconsistent"

[Link to this property](#)

"container_multiple_durable_objects"

[Link to this property](#)

"transfer_container_parity_mismatch"

[Link to this property](#)

"transfer_container_parity_mismatch_on_commit"

[Link to this property](#)

"tombstone_class_still_in_code"

[Link to this property](#)

"stale_tombstone"

[Link to this property](#)

"transfer_receive_already_applied"

[Link to this property](#)

"transfer_receive_cleanup_complete"

[Link to this property](#)

</details>

[Link to this property](#)

namespace_id: optional string

The provisioned namespace the entry relates to, when applicable.

formatuuid

[Link to this property](#)

referencing_scripts: optional array of string

Other Workers in the account that still bind to the affected class. Advisory: while non-empty the tombstone is not yet safe to remove — redeploy these Workers with bindings re-pointed first.

[Link to this property](#)

</details>

[Link to this property](#)

removable_entries: array of string

Source class names whose tombstone entry is now stale and safe to delete from `exports` (no remaining referencing scripts).

[Link to this property](#)

<details>

<summary>

renamed: array of object { from, to }

Applied `renamed` tombstones.

</summary>

from: string

The original (source) class name.

[Link to this property](#)

to: string

The new class name (`renamed_to`).

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

transfer_pending: array of object { class, from }

Phase-1 transfer hints recorded on the target side.

</summary>

class: string

The target-side class name awaiting transfer.

[Link to this property](#)

from: string

The source script the namespace will be transferred from.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

transferred: array of object { class, phase, to }

Committed `transferred` tombstones (phase-2).

</summary>

class: string

The source class name that was transferred.

[Link to this property](#)

phase: "committed"

The transfer phase. Currently always `committed`.

[Link to this property](#)

to: string

The destination script that now owns the namespace.

[Link to this property](#)

</details>

[Link to this property](#)

updated: array of string

Class names whose provisioned namespace was mutated in place.

[Link to this property](#)

<details>

<summary>

warnings: array of object { class, message, scenario, namespace_id }

Non-blocking warnings. See `exports_reconciliation_warning`.

</summary>

class: string

The class name the warning is about.

[Link to this property](#)

message: string

Human-readable explanation of the warning.

[Link to this property](#)

<details>

<summary>

scenario: "code_class_not_in_exports" or "provisioned_class_missing_from_config" or "config_export_not_in_code" or 30 more

Stable, machine-readable tag identifying which reconciliation scenario produced an error, warning, or info entry. Clients may branch on this value instead of parsing `message`.

</summary>

One of the following:

"code_class_not_in_exports"

[Link to this property](#)

"provisioned_class_missing_from_config"

[Link to this property](#)

"config_export_not_in_code"

[Link to this property](#)

"config_references_nonexistent_class"

[Link to this property](#)

"orphaned_provisioned_namespace"

[Link to this property](#)

"storage_type_mismatch"

[Link to this property](#)

"free_tier_requires_sqlite"

[Link to this property](#)

"invalid_export"

[Link to this property](#)

"tombstone_delete_class_still_in_code"

[Link to this property](#)

"tombstone_delete_blocked_by_external_bindings"

[Link to this property](#)

"tombstone_renamed_to_occupied"

[Link to this property](#)

"transferred_pending_not_found"

[Link to this property](#)

"transferred_target_missing"

[Link to this property](#)

"transferred_target_mismatch"

[Link to this property](#)

"phase_one_transfer_source_missing"

[Link to this property](#)

"phase_one_transfer_source_namespace_missing"

[Link to this property](#)

"phase_one_transfer_target_class_provisioned"

[Link to this property](#)

"phase_one_transfer_after_commit_mismatch"

[Link to this property](#)

"phase_one_transfer_duplicate"

[Link to this property](#)

"phase_one_transfer_target_in_dispatch_namespace"

[Link to this property](#)

"phase_one_transfer_source_in_dispatch_namespace"

[Link to this property](#)

"transferred_source_in_dispatch_namespace"

[Link to this property](#)

"transferred_target_in_dispatch_namespace"

[Link to this property](#)

"container_undeclared_reference"

[Link to this property](#)

"container_class_not_durable_object"

[Link to this property](#)

"container_wiring_inconsistent"

[Link to this property](#)

"container_multiple_durable_objects"

[Link to this property](#)

"transfer_container_parity_mismatch"

[Link to this property](#)

"transfer_container_parity_mismatch_on_commit"

[Link to this property](#)

"tombstone_class_still_in_code"

[Link to this property](#)

"stale_tombstone"

[Link to this property](#)

"transfer_receive_already_applied"

[Link to this property](#)

"transfer_receive_cleanup_complete"

[Link to this property](#)

</details>

[Link to this property](#)

namespace_id: optional string

The provisioned namespace the warning relates to, when applicable.

formatuuid

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

limits: optional object { cpu_ms, subrequests }

Limits to apply for this Worker.

</summary>

cpu_ms: optional number

The amount of CPU time this Worker can use in milliseconds.

[Link to this property](#)

subrequests: optional number

The number of subrequests this Worker can make per request.

[Link to this property](#)

</details>

[Link to this property](#)

logpush: optional boolean

Whether Logpush is turned on for the Worker.

[Link to this property](#)

<details>

<summary>

migrations: optional [SingleStepMigration](/api/resources/workers#(resource)%20workers%20%3E%20(model)%20single_step_migration%20%3E%20(schema)) { deleted_classes, new_classes, new_sqlite_classes, 4 more } or object { new_tag, old_tag, steps }

Migrations to apply for Durable Objects associated with this Worker.

</summary>

One of the following:

<details>

<summary>

SingleStepMigration object { deleted_classes, new_classes, new_sqlite_classes, 4 more }

A single set of migrations to apply.

</summary>

deleted_classes: optional array of string

A list of classes to delete Durable Object namespaces from.

[Link to this property](#)

new_classes: optional array of string

A list of classes to create Durable Object namespaces from.

[Link to this property](#)

new_sqlite_classes: optional array of string

A list of classes to create Durable Object namespaces with SQLite from.

[Link to this property](#)

new_tag: optional string

Tag to set as the latest migration tag.

[Link to this property](#)

old_tag: optional string

Tag used to verify against the latest migration tag for this Worker. If they don’t match, the upload is rejected.

[Link to this property](#)

<details>

<summary>

renamed_classes: optional array of object { from, to }

A list of classes with Durable Object namespaces that were renamed.

</summary>

from: optional string

[Link to this property](#)

to: optional string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

transferred_classes: optional array of object { from, from_script, to }

A list of transfers for Durable Object namespaces from a different Worker and class to a class defined in this Worker.

</summary>

from: optional string

[Link to this property](#)

from_script: optional string

[Link to this property](#)

to: optional string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

WorkersMultipleStepMigrations object { new_tag, old_tag, steps }

</summary>

new_tag: optional string

Tag to set as the latest migration tag.

[Link to this property](#)

old_tag: optional string

Tag used to verify against the latest migration tag for this Worker. If they don’t match, the upload is rejected.

[Link to this property](#)

<details>

<summary>

steps: optional array of [MigrationStep](/api/resources/workers#(resource)%20workers%20%3E%20(model)%20migration_step%20%3E%20(schema)) { deleted_classes, new_classes, new_sqlite_classes, 2 more }

Migrations to apply in order.

</summary>

deleted_classes: optional array of string

A list of classes to delete Durable Object namespaces from.

[Link to this property](#)

new_classes: optional array of string

A list of classes to create Durable Object namespaces from.

[Link to this property](#)

new_sqlite_classes: optional array of string

A list of classes to create Durable Object namespaces with SQLite from.

[Link to this property](#)

<details>

<summary>

renamed_classes: optional array of object { from, to }

A list of classes with Durable Object namespaces that were renamed.

</summary>

from: optional string

[Link to this property](#)

to: optional string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

transferred_classes: optional array of object { from, from_script, to }

A list of transfers for Durable Object namespaces from a different Worker and class to a class defined in this Worker.

</summary>

from: optional string

[Link to this property](#)

from_script: optional string

[Link to this property](#)

to: optional string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

observability: optional object { enabled, head_sampling_rate, logs, 2 more }

Observability settings for the Worker.

</summary>

enabled: boolean

Whether observability is enabled for the Worker.

[Link to this property](#)

head_sampling_rate: optional number

The sampling rate for incoming requests. From 0 to 1 (1 = 100%, 0.1 = 10%). Default is 1.

[Link to this property](#)

<details>

<summary>

logs: optional object { enabled, invocation_logs, destinations, 2 more }

Log settings for the Worker.

</summary>

enabled: boolean

Whether logs are enabled for the Worker.

[Link to this property](#)

invocation_logs: boolean

Whether [invocation logs](https://developers.cloudflare.com/workers/observability/logs/workers-logs/#invocation-logs) are enabled for the Worker.

[Link to this property](#)

destinations: optional array of string

A list of destinations where logs will be exported to.

[Link to this property](#)

head_sampling_rate: optional number

The sampling rate for logs. From 0 to 1 (1 = 100%, 0.1 = 10%). Default is 1.

[Link to this property](#)

persist: optional boolean

Whether log persistence is enabled for the Worker.

[Link to this property](#)

</details>

[Link to this property](#)

redact_query_string: optional boolean

Whether query strings are removed from request URLs in logs and traces.

[Link to this property](#)

<details>

<summary>

traces: optional object { destinations, enabled, head_sampling_rate, 2 more }

Trace settings for the Worker.

</summary>

destinations: optional array of string

A list of destinations where traces will be exported to.

[Link to this property](#)

enabled: optional boolean

Whether traces are enabled for the Worker.

[Link to this property](#)

head_sampling_rate: optional number

The sampling rate for traces. From 0 to 1 (1 = 100%, 0.1 = 10%). Default is 1.

[Link to this property](#)

persist: optional boolean

Whether trace persistence is enabled for the Worker.

[Link to this property](#)

<details>

<summary>

propagation_policy: optional "authenticated" or "accept"

Controls how inbound trace context (traceparent/tracestate) headers on incoming requests are handled. “authenticated” honors inbound trace context only when accompanied by a valid trace auth token. “accept” unconditionally accepts inbound trace context. Requires the trace propagation feature to be enabled. Returns null when the trace propagation feature is not enabled for the account.

</summary>

One of the following:

"authenticated"

[Link to this property](#)

"accept"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

placement: optional object { mode } or object { region } or object { hostname } or 5 more

Configuration for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement). Specify mode=‘smart’ for Smart Placement, or one of region/hostname/host.

</summary>

One of the following:

<details>

<summary>

Mode object { mode }

</summary>

mode: "smart"

Enables [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Region object { region }

</summary>

region: string

Cloud region for targeted placement in format ‘provider:region’.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Hostname object { hostname }

</summary>

hostname: string

HTTP hostname for targeted placement.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Host object { host }

</summary>

host: string

TCP host and port for targeted placement.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

object { mode, region }

</summary>

mode: "targeted"

Targeted placement mode.

[Link to this property](#)

region: string

Cloud region for targeted placement in format ‘provider:region’.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

object { hostname, mode }

</summary>

hostname: string

HTTP hostname for targeted placement.

[Link to this property](#)

mode: "targeted"

Targeted placement mode.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

object { host, mode }

</summary>

host: string

TCP host and port for targeted placement.

[Link to this property](#)

mode: "targeted"

Targeted placement mode.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

object { mode, target }

</summary>

mode: "targeted"

Targeted placement mode.

[Link to this property](#)

<details>

<summary>

target: array of object { region } or object { hostname } or object { host }

Array of placement targets (currently limited to single target).

</summary>

One of the following:

<details>

<summary>

Region object { region }

</summary>

region: string

Cloud region in format ‘provider:region’.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Hostname object { hostname }

</summary>

hostname: string

HTTP hostname for targeted placement.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Host object { host }

</summary>

host: string

TCP host:port for targeted placement.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

tags: optional array of string

Tags associated with the Worker.

[Link to this property](#)

<details>

<summary>

tail_consumers: optional array of [ConsumerScript](/api/resources/workers#(resource)%20workers.scripts.tail%20%3E%20(model)%20consumer_script%20%3E%20(schema)) { service, environment, namespace }

List of Workers that will consume logs from the attached Worker.

</summary>

service: string

Name of Worker that is to be the consumer.

[Link to this property](#)

environment: optional string

Optional environment if the Worker utilizes one.

[Link to this property](#)

namespace: optional string

Optional dispatch namespace the script belongs to.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

usage_model: optional "standard" or "bundled" or "unbound"

Usage model for the Worker invocations.

</summary>

One of the following:

"standard"

[Link to this property](#)

"bundled"

[Link to this property](#)

"unbound"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ScriptAndVersionSettingEditResponse object { annotations, bindings, cache_options, 12 more }

</summary>

<details>

<summary>

annotations: optional object { "workers/message", "workers/tag", "workers/triggered_by" }

Annotations for the Worker version. Annotations are not inherited across settings updates; omitting this field means the new version will have no annotations.

</summary>

"workers/message": optional string

Human-readable message about the version. Truncated to 1000 bytes if longer.

maxLength1000

[Link to this property](#)

"workers/tag": optional string

User-provided identifier for the version. Maximum 100 bytes.

maxLength100

[Link to this property](#)

"workers/triggered_by": optional string

Operation that triggered the creation of the version. This is read-only and set by the server.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

bindings: optional array of object { name, type } or object { instance_name, name, type, namespace } or object { name, namespace, type } or 33 more

List of bindings attached to a Worker. You can find more about bindings on our docs: https://developers.cloudflare.com/workers/configuration/multipart-upload-metadata/#bindings.

</summary>

One of the following:

<details>

<summary>

AI object { name, type }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

type: "ai"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AISearch object { instance_name, name, type, namespace }

</summary>

instance_name: string

The user-chosen instance name. Must exist at deploy time. The worker can search, chat, update, and manage items/jobs on this instance.

[Link to this property](#)

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

type: "ai_search"

The kind of resource that the binding provides.

[Link to this property](#)

namespace: optional string

The namespace the instance belongs to. Defaults to “default” if omitted. Customers who don’t use namespaces can simply omit this field.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AISearchNamespace object { name, namespace, type }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

namespace: string

The user-chosen namespace name. Must exist before deploy — Wrangler handles auto-creation on deploy failure (R2 bucket pattern). The “default” namespace is auto-created by config-api for new accounts. Grants full access (CRUD + search + chat) to all instances within the namespace.

[Link to this property](#)

type: "ai_search_namespace"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Messaging object { name, namespace, type }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

namespace: string

The Messaging namespace to bind to.

[Link to this property](#)

type: "messaging"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AnalyticsEngine object { dataset, name, type }

</summary>

dataset: string

The name of the dataset to bind to.

[Link to this property](#)

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

type: "analytics_engine"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Assets object { name, type }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

type: "assets"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Browser object { name, type }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

type: "browser"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

D1 object { database_id, name, type, id }

</summary>

database_id: string

Identifier of the D1 database to bind to.

[Link to this property](#)

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

type: "d1"

The kind of resource that the binding provides.

[Link to this property](#)

Deprecatedid: optional string

This property has been renamed to `database_id`.

Identifier of the D1 database to bind to.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DataBlob object { name, part, type }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

part: string

The name of the file containing the data content. Only accepted for `service worker syntax` Workers.

[Link to this property](#)

Deprecatedtype: "data_blob"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DispatchNamespace object { name, namespace, type, outbound }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

namespace: string

The name of the dispatch namespace.

[Link to this property](#)

type: "dispatch_namespace"

The kind of resource that the binding provides.

[Link to this property](#)

<details>

<summary>

outbound: optional object { params, worker }

Outbound worker.

</summary>

<details>

<summary>

params: optional array of object { name }

Pass information from the Dispatch Worker to the Outbound Worker through the parameters.

</summary>

name: string

Name of the parameter.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

worker: optional object { entrypoint, environment, service }

Outbound worker.

</summary>

entrypoint: optional string

Entrypoint to invoke on the outbound worker.

[Link to this property](#)

environment: optional string

Environment of the outbound worker.

[Link to this property](#)

service: optional string

Name of the outbound worker.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DurableObjectNamespace object { name, type, class_name, 4 more }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

type: "durable_object_namespace"

The kind of resource that the binding provides.

[Link to this property](#)

class_name: optional string

The exported class name of the Durable Object.

[Link to this property](#)

dispatch_namespace: optional string

The dispatch namespace the Durable Object script belongs to.

[Link to this property](#)

environment: optional string

The environment of the script_name to bind to.

[Link to this property](#)

namespace_id: optional string

Namespace identifier tag.

maxLength32

[Link to this property](#)

script_name: optional string

The script where the Durable Object is defined, if it is external to this Worker.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Hyperdrive object { id, name, type }

</summary>

id: string

Identifier of the Hyperdrive connection to bind to.

[Link to this property](#)

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

type: "hyperdrive"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Inherit object { name, type, old_name, version_id }

</summary>

name: string

The name of the inherited binding.

[Link to this property](#)

type: "inherit"

The kind of resource that the binding provides.

[Link to this property](#)

old_name: optional string

The old name of the inherited binding. If set, the binding will be renamed from `old_name` to `name` in the new version. If not set, the binding will keep the same name between versions.

[Link to this property](#)

version_id: optional string

Identifier for the version to inherit the binding from, which can be the version ID or the literal “latest” to inherit from the latest version. Defaults to inheriting the binding from the latest version.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Images object { name, type }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

type: "images"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Json object { json, name, type }

</summary>

json: unknown

JSON data to use.

[Link to this property](#)

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

type: "json"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

KVNamespace object { name, namespace_id, type }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

namespace_id: string

Namespace identifier tag.

maxLength32

[Link to this property](#)

type: "kv_namespace"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Media object { name, type }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

type: "media"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

MTLSCertificate object { certificate_id, name, type }

</summary>

certificate_id: string

Identifier of the certificate to bind to.

[Link to this property](#)

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

type: "mtls_certificate"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

PlainText object { name, text, type }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

text: string

The text value to use.

[Link to this property](#)

type: "plain_text"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Pipelines object { name, pipeline, type }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

pipeline: string

Name of the Pipeline to bind to.

[Link to this property](#)

type: "pipelines"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Queue object { name, queue_name, type }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

queue_name: string

Name of the Queue to bind to.

[Link to this property](#)

type: "queue"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Ratelimit object { name, namespace_id, simple, type }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

namespace_id: string

Identifier of the rate limit namespace to bind to.

[Link to this property](#)

<details>

<summary>

simple: object { limit, period, mitigation_timeout }

The rate limit configuration.

</summary>

limit: number

The limit (requests per period).

[Link to this property](#)

period: number

The period in seconds.

[Link to this property](#)

mitigation_timeout: optional number

Duration in seconds to apply the mitigation action after the rate limit is exceeded. Valid values are 0 (disabled), 10, or multiples of 60 up to 86400. Must be greater than or equal to the period when non-zero.

[Link to this property](#)

</details>

[Link to this property](#)

type: "ratelimit"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

R2Bucket object { bucket_name, name, type, jurisdiction }

</summary>

bucket_name: string

R2 bucket to bind to.

[Link to this property](#)

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

type: "r2_bucket"

The kind of resource that the binding provides.

[Link to this property](#)

<details>

<summary>

jurisdiction: optional "eu" or "fedramp" or "fedramp-high" or "us"

The [jurisdiction](https://developers.cloudflare.com/r2/reference/data-location/#jurisdictional-restrictions) of the R2 bucket.

</summary>

One of the following:

"eu"

[Link to this property](#)

"fedramp"

[Link to this property](#)

"fedramp-high"

[Link to this property](#)

"us"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SecretText object { name, text, type }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

text: string

The secret value to use.

[Link to this property](#)

type: "secret_text"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SendEmail object { name, type, allowed_destination_addresses, 2 more }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

type: "send_email"

The kind of resource that the binding provides.

[Link to this property](#)

allowed_destination_addresses: optional array of string

List of allowed destination addresses.

[Link to this property](#)

allowed_sender_addresses: optional array of string

List of allowed sender addresses.

[Link to this property](#)

destination_address: optional string

Destination address for the email.

formatemail

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Service object { name, service, type, 2 more }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

service: string

Name of Worker to bind to.

[Link to this property](#)

type: "service"

The kind of resource that the binding provides.

[Link to this property](#)

entrypoint: optional string

Entrypoint to invoke on the target Worker.

[Link to this property](#)

environment: optional string

Optional environment if the Worker utilizes one.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

TextBlob object { name, part, type }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

part: string

The name of the file containing the text content. Only accepted for `service worker syntax` Workers.

[Link to this property](#)

Deprecatedtype: "text_blob"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Vectorize object { index_name, name, type }

</summary>

index_name: string

Name of the Vectorize index to bind to.

[Link to this property](#)

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

type: "vectorize"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

VersionMetadata object { name, type }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

type: "version_metadata"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SecretsStoreSecret object { name, secret_name, store_id, type }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

secret_name: string

Name of the secret in the store.

[Link to this property](#)

store_id: string

ID of the store containing the secret.

[Link to this property](#)

type: "secrets_store_secret"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Flagship object { app_id, name, type }

</summary>

app_id: string

ID of the Flagship app to bind to for feature flag evaluation.

maxLength128

[Link to this property](#)

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

type: "flagship"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SecretKey object { algorithm, format, name, 4 more }

</summary>

algorithm: unknown

Algorithm-specific key parameters. [Learn more](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#algorithm).

[Link to this property](#)

<details>

<summary>

format: "raw" or "pkcs8" or "spki" or "jwk"

Data format of the key. [Learn more](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#format).

</summary>

One of the following:

"raw"

[Link to this property](#)

"pkcs8"

[Link to this property](#)

"spki"

[Link to this property](#)

"jwk"

[Link to this property](#)

</details>

[Link to this property](#)

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

type: "secret_key"

The kind of resource that the binding provides.

[Link to this property](#)

<details>

<summary>

usages: array of "encrypt" or "decrypt" or "sign" or 5 more

Allowed operations with the key. [Learn more](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#keyUsages).

</summary>

One of the following:

"encrypt"

[Link to this property](#)

"decrypt"

[Link to this property](#)

"sign"

[Link to this property](#)

"verify"

[Link to this property](#)

"deriveKey"

[Link to this property](#)

"deriveBits"

[Link to this property](#)

"wrapKey"

[Link to this property](#)

"unwrapKey"

[Link to this property](#)

</details>

[Link to this property](#)

key_base64: optional string

Base64-encoded key data. Required if `format` is “raw”, “pkcs8”, or “spki”.

[Link to this property](#)

key_jwk: optional unknown

Key data in [JSON Web Key](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#json_web_key) format. Required if `format` is “jwk”.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Workflow object { name, type, workflow_name, 2 more }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

type: "workflow"

The kind of resource that the binding provides.

[Link to this property](#)

workflow_name: string

Name of the Workflow to bind to.

[Link to this property](#)

class_name: optional string

Class name of the Workflow. Should only be provided if the Workflow belongs to this script.

[Link to this property](#)

script_name: optional string

Script name that contains the Workflow. If not provided, defaults to this script name.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

WasmModule object { name, part, type }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

part: string

The name of the file containing the WebAssembly module content. Only accepted for `service worker syntax` Workers.

[Link to this property](#)

Deprecatedtype: "wasm_module"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

VPCService object { name, service_id, type }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

service_id: string

Identifier of the VPC service to bind to.

[Link to this property](#)

type: "vpc_service"

The kind of resource that the binding provides.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

VPCNetwork object { name, type, identity, 2 more }

</summary>

name: string

A JavaScript variable name for the binding.

[Link to this property](#)

type: "vpc_network"

The kind of resource that the binding provides.

[Link to this property](#)

identity: optional "runtime-email-alpha"

Enables Gateway identity for the binding. Requires network_id to be “cf1:network” and cannot be combined with tunnel_id.

[Link to this property](#)

network_id: optional string

Identifier of the network to bind to. Only “cf1:network” is currently supported. Mutually exclusive with tunnel_id.

[Link to this property](#)

tunnel_id: optional string

UUID of the Cloudflare Tunnel to bind to. Mutually exclusive with network_id.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

cache_options: optional object { enabled, cross_version_cache }

Global CacheW configuration for the Worker. When caching is on, the platform provisions a `cloudflare.app` zone for the Worker. A `type: worker` entry in the `exports` map can override this value for a single entrypoint.

</summary>

enabled: boolean

Whether caching is enabled for this Worker.

[Link to this property](#)

cross_version_cache: optional boolean

Whether cached responses are shared across Worker version uploads. This is independent of `enabled`. It can stay true while caching is off, so the preference survives turning caching off and back on.

[Link to this property](#)

</details>

[Link to this property](#)

compatibility_date: optional string

Date indicating targeted support in the Workers runtime. Backwards incompatible fixes to the runtime following this date will not affect this Worker.

[Link to this property](#)

compatibility_flags: optional array of string

Flags that enable or disable certain features in the Workers runtime. Used to enable upcoming features or opt in or out of specific changes not included in a `compatibility_date`.

[Link to this property](#)

<details>

<summary>

exports: optional map[object { type, cache, state } or object { storage, type, container, state } or object { state, type } or 3 more]

Declarative exports for the Worker. Worker entrypoint entries (`type: worker`) carry cache configuration for that entrypoint.

</summary>

One of the following:

<details>

<summary>

Worker object { type, cache, state }

A named Worker entrypoint export (`type: worker`). Worker entrypoints are always live (`state: created`) and carry no storage or lifecycle fields. The optional `cache` block overrides the Worker’s global `cache_options.enabled` for this entrypoint.

</summary>

type: "worker"

Marks this entry as a Worker entrypoint export.

[Link to this property](#)

<details>

<summary>

cache: optional object { enabled }

Cache override for this entrypoint. Overrides the Worker’s global `cache_options.enabled` for this entrypoint only.

</summary>

enabled: boolean

Whether caching is enabled for this entrypoint.

[Link to this property](#)

</details>

[Link to this property](#)

state: optional "created"

Live export. May be omitted; defaults to `created`.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

WorkersDurableObjectExport object { storage, type, container, state }

A live Durable Object export (`state: created`, the default). The platform auto-provisions the namespace on first deploy, matches it on subsequent deploys, and never mutates or deletes it as a side effect of a code-only change. `storage` is required; `renamed_to`, `transferred_to` and `transfer_from` are not allowed on a live entry.

</summary>

<details>

<summary>

storage: "sqlite" or "legacy-kv"

Durable Object storage backend. `sqlite` is the recommended (and only) backend for new namespaces. `legacy-kv` is accepted only for a class whose namespace already exists as KV-backed; the `exports` flow never provisions a new `legacy-kv` namespace.

</summary>

One of the following:

"sqlite"

[Link to this property](#)

"legacy-kv"

[Link to this property](#)

</details>

[Link to this property](#)

type: "durable-object"

Marks this entry as a Durable Object export.

[Link to this property](#)

container: optional string

Name of the container (declared in the upload’s `metadata.containers`) that backs this Durable Object. When set, the namespace is container-enabled. Valid only on live entries.

maxLength128

[Link to this property](#)

state: optional "created"

Live export. May be omitted; defaults to `created`.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

WorkersDurableObjectDeletedExport object { state, type }

A `deleted` tombstone: retires the provisioned namespace for this class and all of its data. The class must be absent from the uploaded code and no other Worker in the account may bind to the namespace, otherwise the deploy is rejected. No other fields are allowed. Deletion is irreversible.

</summary>

state: "deleted"

Tombstone that deletes the namespace.

[Link to this property](#)

type: "durable-object"

Marks this entry as a Durable Object export.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

WorkersDurableObjectRenamedExport object { renamed_to, state, type }

A `renamed` tombstone: rewrites the provisioned namespace’s class name from this map key to `renamed_to`. The source class may stay in code during the rollout window (an info notice is emitted). `storage`, `transferred_to` and `transfer_from` are not allowed.

</summary>

renamed_to: string

The destination class name. Must differ from the source class (the map key) and must be declared as a live (`created`) entry in the same `exports` map. Write-only: never present in GET responses.

maxLength128

[Link to this property](#)

state: "renamed"

Tombstone that renames the namespace’s class.

[Link to this property](#)

type: "durable-object"

Marks this entry as a Durable Object export.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

WorkersDurableObjectTransferredExport object { state, transferred_to, type }

A `transferred` tombstone (source side of a two-phase transfer): hands ownership of the provisioned namespace to another script in the same account, named by `transferred_to`. The target must have already deployed a matching `expecting-transfer` entry. The source class may stay in code during the rollout window (an info notice is emitted). `storage`, `renamed_to` and `transfer_from` are not allowed.

</summary>

state: "transferred"

Tombstone that transfers the namespace to another script.

[Link to this property](#)

transferred_to: string

The destination script name. Must be in the same account and the same dispatch-namespace context (or both non-dispatch). Cross-dispatch-namespace transfers are rejected. Write-only: never present in GET responses.

maxLength128

[Link to this property](#)

type: "durable-object"

Marks this entry as a Durable Object export.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

WorkersDurableObjectExpectingTransferExport object { state, storage, transfer_from, 2 more }

The target side of a two-phase transfer (`state: expecting-transfer`). Declares that this script expects to receive a namespace for this class from the `transfer_from` script. This is a live entry, not a tombstone: bindings resolve through the source’s namespace until the source commits with a `transferred` tombstone. `storage` and `transfer_from` are required; `renamed_to` and `transferred_to` are not allowed.

</summary>

state: "expecting-transfer"

Target side of a two-phase transfer.

[Link to this property](#)

<details>

<summary>

storage: "sqlite" or "legacy-kv"

Durable Object storage backend. `sqlite` is the recommended (and only) backend for new namespaces. `legacy-kv` is accepted only for a class whose namespace already exists as KV-backed; the `exports` flow never provisions a new `legacy-kv` namespace.

</summary>

One of the following:

"sqlite"

[Link to this property](#)

"legacy-kv"

[Link to this property](#)

</details>

[Link to this property](#)

transfer_from: string

The source script name to receive the namespace from. Must be in the same account and dispatch-namespace context. Present on reads for `expecting-transfer` entries.

maxLength128

[Link to this property](#)

type: "durable-object"

Marks this entry as a Durable Object export.

[Link to this property](#)

container: optional string

Name of the container (declared in the upload’s `metadata.containers`) that backs this Durable Object once the transfer settles. Valid only on live entries.

maxLength128

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

exports_reconciliation: optional object { created, deleted, info, 6 more }

Summary of the declarative exports reconciliation that ran on this upload. Populated only when the uploaded metadata included an `exports` block. Durable Object entries drive reconciliation; `type: worker` entries do not contribute to this summary.

</summary>

created: array of string

Class names for which a new namespace was provisioned.

[Link to this property](#)

deleted: array of string

Class names whose namespace was deleted by a `deleted` tombstone.

[Link to this property](#)

<details>

<summary>

info: array of object { class, message, scenario, 2 more }

Non-blocking info entries (stale tombstones, tombstone applied with class still in code). See `exports_reconciliation_info`.

</summary>

class: string

The class name the info entry is about.

[Link to this property](#)

message: string

Human-readable explanation.

[Link to this property](#)

<details>

<summary>

scenario: "code_class_not_in_exports" or "provisioned_class_missing_from_config" or "config_export_not_in_code" or 30 more

Stable, machine-readable tag identifying which reconciliation scenario produced an error, warning, or info entry. Clients may branch on this value instead of parsing `message`.

</summary>

One of the following:

"code_class_not_in_exports"

[Link to this property](#)

"provisioned_class_missing_from_config"

[Link to this property](#)

"config_export_not_in_code"

[Link to this property](#)

"config_references_nonexistent_class"

[Link to this property](#)

"orphaned_provisioned_namespace"

[Link to this property](#)

"storage_type_mismatch"

[Link to this property](#)

"free_tier_requires_sqlite"

[Link to this property](#)

"invalid_export"

[Link to this property](#)

"tombstone_delete_class_still_in_code"

[Link to this property](#)

"tombstone_delete_blocked_by_external_bindings"

[Link to this property](#)

"tombstone_renamed_to_occupied"

[Link to this property](#)

"transferred_pending_not_found"

[Link to this property](#)

"transferred_target_missing"

[Link to this property](#)

"transferred_target_mismatch"

[Link to this property](#)

"phase_one_transfer_source_missing"

[Link to this property](#)

"phase_one_transfer_source_namespace_missing"

[Link to this property](#)

"phase_one_transfer_target_class_provisioned"

[Link to this property](#)

"phase_one_transfer_after_commit_mismatch"

[Link to this property](#)

"phase_one_transfer_duplicate"

[Link to this property](#)

"phase_one_transfer_target_in_dispatch_namespace"

[Link to this property](#)

"phase_one_transfer_source_in_dispatch_namespace"

[Link to this property](#)

"transferred_source_in_dispatch_namespace"

[Link to this property](#)

"transferred_target_in_dispatch_namespace"

[Link to this property](#)

"container_undeclared_reference"

[Link to this property](#)

"container_class_not_durable_object"

[Link to this property](#)

"container_wiring_inconsistent"

[Link to this property](#)

"container_multiple_durable_objects"

[Link to this property](#)

"transfer_container_parity_mismatch"

[Link to this property](#)

"transfer_container_parity_mismatch_on_commit"

[Link to this property](#)

"tombstone_class_still_in_code"

[Link to this property](#)

"stale_tombstone"

[Link to this property](#)

"transfer_receive_already_applied"

[Link to this property](#)

"transfer_receive_cleanup_complete"

[Link to this property](#)

</details>

[Link to this property](#)

namespace_id: optional string

The provisioned namespace the entry relates to, when applicable.

formatuuid

[Link to this property](#)

referencing_scripts: optional array of string

Other Workers in the account that still bind to the affected class. Advisory: while non-empty the tombstone is not yet safe to remove — redeploy these Workers with bindings re-pointed first.

[Link to this property](#)

</details>

[Link to this property](#)

removable_entries: array of string

Source class names whose tombstone entry is now stale and safe to delete from `exports` (no remaining referencing scripts).

[Link to this property](#)

<details>

<summary>

renamed: array of object { from, to }

Applied `renamed` tombstones.

</summary>

from: string

The original (source) class name.

[Link to this property](#)

to: string

The new class name (`renamed_to`).

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

transfer_pending: array of object { class, from }

Phase-1 transfer hints recorded on the target side.

</summary>

class: string

The target-side class name awaiting transfer.

[Link to this property](#)

from: string

The source script the namespace will be transferred from.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

transferred: array of object { class, phase, to }

Committed `transferred` tombstones (phase-2).

</summary>

class: string

The source class name that was transferred.

[Link to this property](#)

phase: "committed"

The transfer phase. Currently always `committed`.

[Link to this property](#)

to: string

The destination script that now owns the namespace.

[Link to this property](#)

</details>

[Link to this property](#)

updated: array of string

Class names whose provisioned namespace was mutated in place.

[Link to this property](#)

<details>

<summary>

warnings: array of object { class, message, scenario, namespace_id }

Non-blocking warnings. See `exports_reconciliation_warning`.

</summary>

class: string

The class name the warning is about.

[Link to this property](#)

message: string

Human-readable explanation of the warning.

[Link to this property](#)

<details>

<summary>

scenario: "code_class_not_in_exports" or "provisioned_class_missing_from_config" or "config_export_not_in_code" or 30 more

Stable, machine-readable tag identifying which reconciliation scenario produced an error, warning, or info entry. Clients may branch on this value instead of parsing `message`.

</summary>

One of the following:

"code_class_not_in_exports"

[Link to this property](#)

"provisioned_class_missing_from_config"

[Link to this property](#)

"config_export_not_in_code"

[Link to this property](#)

"config_references_nonexistent_class"

[Link to this property](#)

"orphaned_provisioned_namespace"

[Link to this property](#)

"storage_type_mismatch"

[Link to this property](#)

"free_tier_requires_sqlite"

[Link to this property](#)

"invalid_export"

[Link to this property](#)

"tombstone_delete_class_still_in_code"

[Link to this property](#)

"tombstone_delete_blocked_by_external_bindings"

[Link to this property](#)

"tombstone_renamed_to_occupied"

[Link to this property](#)

"transferred_pending_not_found"

[Link to this property](#)

"transferred_target_missing"

[Link to this property](#)

"transferred_target_mismatch"

[Link to this property](#)

"phase_one_transfer_source_missing"

[Link to this property](#)

"phase_one_transfer_source_namespace_missing"

[Link to this property](#)

"phase_one_transfer_target_class_provisioned"

[Link to this property](#)

"phase_one_transfer_after_commit_mismatch"

[Link to this property](#)

"phase_one_transfer_duplicate"

[Link to this property](#)

"phase_one_transfer_target_in_dispatch_namespace"

[Link to this property](#)

"phase_one_transfer_source_in_dispatch_namespace"

[Link to this property](#)

"transferred_source_in_dispatch_namespace"

[Link to this property](#)

"transferred_target_in_dispatch_namespace"

[Link to this property](#)

"container_undeclared_reference"

[Link to this property](#)

"container_class_not_durable_object"

[Link to this property](#)

"container_wiring_inconsistent"

[Link to this property](#)

"container_multiple_durable_objects"

[Link to this property](#)

"transfer_container_parity_mismatch"

[Link to this property](#)

"transfer_container_parity_mismatch_on_commit"

[Link to this property](#)

"tombstone_class_still_in_code"

[Link to this property](#)

"stale_tombstone"

[Link to this property](#)

"transfer_receive_already_applied"

[Link to this property](#)

"transfer_receive_cleanup_complete"

[Link to this property](#)

</details>

[Link to this property](#)

namespace_id: optional string

The provisioned namespace the warning relates to, when applicable.

formatuuid

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

limits: optional object { cpu_ms, subrequests }

Limits to apply for this Worker.

</summary>

cpu_ms: optional number

The amount of CPU time this Worker can use in milliseconds.

[Link to this property](#)

subrequests: optional number

The number of subrequests this Worker can make per request.

[Link to this property](#)

</details>

[Link to this property](#)

logpush: optional boolean

Whether Logpush is turned on for the Worker.

[Link to this property](#)

<details>

<summary>

migrations: optional [SingleStepMigration](/api/resources/workers#(resource)%20workers%20%3E%20(model)%20single_step_migration%20%3E%20(schema)) { deleted_classes, new_classes, new_sqlite_classes, 4 more } or object { new_tag, old_tag, steps }

Migrations to apply for Durable Objects associated with this Worker.

</summary>

One of the following:

<details>

<summary>

SingleStepMigration object { deleted_classes, new_classes, new_sqlite_classes, 4 more }

A single set of migrations to apply.

</summary>

deleted_classes: optional array of string

A list of classes to delete Durable Object namespaces from.

[Link to this property](#)

new_classes: optional array of string

A list of classes to create Durable Object namespaces from.

[Link to this property](#)

new_sqlite_classes: optional array of string

A list of classes to create Durable Object namespaces with SQLite from.

[Link to this property](#)

new_tag: optional string

Tag to set as the latest migration tag.

[Link to this property](#)

old_tag: optional string

Tag used to verify against the latest migration tag for this Worker. If they don’t match, the upload is rejected.

[Link to this property](#)

<details>

<summary>

renamed_classes: optional array of object { from, to }

A list of classes with Durable Object namespaces that were renamed.

</summary>

from: optional string

[Link to this property](#)

to: optional string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

transferred_classes: optional array of object { from, from_script, to }

A list of transfers for Durable Object namespaces from a different Worker and class to a class defined in this Worker.

</summary>

from: optional string

[Link to this property](#)

from_script: optional string

[Link to this property](#)

to: optional string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

WorkersMultipleStepMigrations object { new_tag, old_tag, steps }

</summary>

new_tag: optional string

Tag to set as the latest migration tag.

[Link to this property](#)

old_tag: optional string

Tag used to verify against the latest migration tag for this Worker. If they don’t match, the upload is rejected.

[Link to this property](#)

<details>

<summary>

steps: optional array of [MigrationStep](/api/resources/workers#(resource)%20workers%20%3E%20(model)%20migration_step%20%3E%20(schema)) { deleted_classes, new_classes, new_sqlite_classes, 2 more }

Migrations to apply in order.

</summary>

deleted_classes: optional array of string

A list of classes to delete Durable Object namespaces from.

[Link to this property](#)

new_classes: optional array of string

A list of classes to create Durable Object namespaces from.

[Link to this property](#)

new_sqlite_classes: optional array of string

A list of classes to create Durable Object namespaces with SQLite from.

[Link to this property](#)

<details>

<summary>

renamed_classes: optional array of object { from, to }

A list of classes with Durable Object namespaces that were renamed.

</summary>

from: optional string

[Link to this property](#)

to: optional string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

transferred_classes: optional array of object { from, from_script, to }

A list of transfers for Durable Object namespaces from a different Worker and class to a class defined in this Worker.

</summary>

from: optional string

[Link to this property](#)

from_script: optional string

[Link to this property](#)

to: optional string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

observability: optional object { enabled, head_sampling_rate, logs, 2 more }

Observability settings for the Worker.

</summary>

enabled: boolean

Whether observability is enabled for the Worker.

[Link to this property](#)

head_sampling_rate: optional number

The sampling rate for incoming requests. From 0 to 1 (1 = 100%, 0.1 = 10%). Default is 1.

[Link to this property](#)

<details>

<summary>

logs: optional object { enabled, invocation_logs, destinations, 2 more }

Log settings for the Worker.

</summary>

enabled: boolean

Whether logs are enabled for the Worker.

[Link to this property](#)

invocation_logs: boolean

Whether [invocation logs](https://developers.cloudflare.com/workers/observability/logs/workers-logs/#invocation-logs) are enabled for the Worker.

[Link to this property](#)

destinations: optional array of string

A list of destinations where logs will be exported to.

[Link to this property](#)

head_sampling_rate: optional number

The sampling rate for logs. From 0 to 1 (1 = 100%, 0.1 = 10%). Default is 1.

[Link to this property](#)

persist: optional boolean

Whether log persistence is enabled for the Worker.

[Link to this property](#)

</details>

[Link to this property](#)

redact_query_string: optional boolean

Whether query strings are removed from request URLs in logs and traces.

[Link to this property](#)

<details>

<summary>

traces: optional object { destinations, enabled, head_sampling_rate, 2 more }

Trace settings for the Worker.

</summary>

destinations: optional array of string

A list of destinations where traces will be exported to.

[Link to this property](#)

enabled: optional boolean

Whether traces are enabled for the Worker.

[Link to this property](#)

head_sampling_rate: optional number

The sampling rate for traces. From 0 to 1 (1 = 100%, 0.1 = 10%). Default is 1.

[Link to this property](#)

persist: optional boolean

Whether trace persistence is enabled for the Worker.

[Link to this property](#)

<details>

<summary>

propagation_policy: optional "authenticated" or "accept"

Controls how inbound trace context (traceparent/tracestate) headers on incoming requests are handled. “authenticated” honors inbound trace context only when accompanied by a valid trace auth token. “accept” unconditionally accepts inbound trace context. Requires the trace propagation feature to be enabled. Returns null when the trace propagation feature is not enabled for the account.

</summary>

One of the following:

"authenticated"

[Link to this property](#)

"accept"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

placement: optional object { mode } or object { region } or object { hostname } or 5 more

Configuration for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement). Specify mode=‘smart’ for Smart Placement, or one of region/hostname/host.

</summary>

One of the following:

<details>

<summary>

Mode object { mode }

</summary>

mode: "smart"

Enables [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement).

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Region object { region }

</summary>

region: string

Cloud region for targeted placement in format ‘provider:region’.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Hostname object { hostname }

</summary>

hostname: string

HTTP hostname for targeted placement.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Host object { host }

</summary>

host: string

TCP host and port for targeted placement.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

object { mode, region }

</summary>

mode: "targeted"

Targeted placement mode.

[Link to this property](#)

region: string

Cloud region for targeted placement in format ‘provider:region’.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

object { hostname, mode }

</summary>

hostname: string

HTTP hostname for targeted placement.

[Link to this property](#)

mode: "targeted"

Targeted placement mode.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

object { host, mode }

</summary>

host: string

TCP host and port for targeted placement.

[Link to this property](#)

mode: "targeted"

Targeted placement mode.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

object { mode, target }

</summary>

mode: "targeted"

Targeted placement mode.

[Link to this property](#)

<details>

<summary>

target: array of object { region } or object { hostname } or object { host }

Array of placement targets (currently limited to single target).

</summary>

One of the following:

<details>

<summary>

Region object { region }

</summary>

region: string

Cloud region in format ‘provider:region’.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Hostname object { hostname }

</summary>

hostname: string

HTTP hostname for targeted placement.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Host object { host }

</summary>

host: string

TCP host:port for targeted placement.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

tags: optional array of string

Tags associated with the Worker.

[Link to this property](#)

<details>

<summary>

tail_consumers: optional array of [ConsumerScript](/api/resources/workers#(resource)%20workers.scripts.tail%20%3E%20(model)%20consumer_script%20%3E%20(schema)) { service, environment, namespace }

List of Workers that will consume logs from the attached Worker.

</summary>

service: string

Name of Worker that is to be the consumer.

[Link to this property](#)

environment: optional string

Optional environment if the Worker utilizes one.

[Link to this property](#)

namespace: optional string

Optional dispatch namespace the script belongs to.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

usage_model: optional "standard" or "bundled" or "unbound"

Usage model for the Worker invocations.

</summary>

One of the following:

"standard"

[Link to this property](#)

"bundled"

[Link to this property](#)

"unbound"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

##### [Fetch Worker Account Settings](/api/resources/workers/subresources/account_settings/methods/get)

GET/accounts/{account_id}/workers/account-settings

##### [Create Worker Account Settings](/api/resources/workers/subresources/account_settings/methods/update)

PUT/accounts/{account_id}/workers/account-settings

##### Models

<details>

<summary>

AccountSettingGetResponse object { default_usage_model, green_compute }

</summary>

default_usage_model: optional string

[Link to this property](#)

green_compute: optional boolean

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AccountSettingUpdateResponse object { default_usage_model, green_compute }

</summary>

default_usage_model: optional string

[Link to this property](#)

green_compute: optional boolean

[Link to this property](#)

</details>

[Link to this property](#)

##### [List Domains](/api/resources/workers/subresources/domains/methods/list)

GET/accounts/{account_id}/workers/domains

##### [Get Domain](/api/resources/workers/subresources/domains/methods/get)

GET/accounts/{account_id}/workers/domains/{domain_id}

##### [Attach Domain](/api/resources/workers/subresources/domains/methods/update)

PUT/accounts/{account_id}/workers/domains

##### [Detach Domain](/api/resources/workers/subresources/domains/methods/delete)

DELETE/accounts/{account_id}/workers/domains/{domain_id}

##### Models

<details>

<summary>

DomainListResponse object { id, cert_id, environment, 4 more }

</summary>

id: string

Immutable ID of the domain.

[Link to this property](#)

cert_id: string

ID of the TLS certificate issued for the domain.

formatuuid

[Link to this property](#)

Deprecatedenvironment: string

Worker environment associated with the domain.

[Link to this property](#)

hostname: string

Hostname of the domain. Can be either the zone apex or a subdomain of the zone. Requests to this hostname will be routed to the configured Worker.

[Link to this property](#)

service: string

Name of the Worker associated with the domain. Requests to the configured hostname will be routed to this Worker.

[Link to this property](#)

zone_id: string

ID of the zone containing the domain hostname.

[Link to this property](#)

zone_name: string

Name of the zone containing the domain hostname.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DomainGetResponse object { id, cert_id, environment, 4 more }

</summary>

id: string

Immutable ID of the domain.

[Link to this property](#)

cert_id: string

ID of the TLS certificate issued for the domain.

formatuuid

[Link to this property](#)

Deprecatedenvironment: string

Worker environment associated with the domain.

[Link to this property](#)

hostname: string

Hostname of the domain. Can be either the zone apex or a subdomain of the zone. Requests to this hostname will be routed to the configured Worker.

[Link to this property](#)

service: string

Name of the Worker associated with the domain. Requests to the configured hostname will be routed to this Worker.

[Link to this property](#)

zone_id: string

ID of the zone containing the domain hostname.

[Link to this property](#)

zone_name: string

Name of the zone containing the domain hostname.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DomainUpdateResponse object { id, cert_id, environment, 4 more }

</summary>

id: string

Immutable ID of the domain.

[Link to this property](#)

cert_id: string

ID of the TLS certificate issued for the domain.

formatuuid

[Link to this property](#)

Deprecatedenvironment: string

Worker environment associated with the domain.

[Link to this property](#)

hostname: string

Hostname of the domain. Can be either the zone apex or a subdomain of the zone. Requests to this hostname will be routed to the configured Worker.

[Link to this property](#)

service: string

Name of the Worker associated with the domain. Requests to the configured hostname will be routed to this Worker.

[Link to this property](#)

zone_id: string

ID of the zone containing the domain hostname.

[Link to this property](#)

zone_name: string

Name of the zone containing the domain hostname.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DomainDeleteResponse object { errors, messages, success }

</summary>

<details>

<summary>

errors: array of object { code, message, documentation_url, source }

</summary>

code: number

minimum1000

[Link to this property](#)

message: string

[Link to this property](#)

documentation_url: optional string

[Link to this property](#)

<details>

<summary>

source: optional object { pointer }

</summary>

pointer: optional string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

messages: array of object { code, message, documentation_url, source }

</summary>

code: number

minimum1000

[Link to this property](#)

message: string

[Link to this property](#)

documentation_url: optional string

[Link to this property](#)

<details>

<summary>

source: optional object { pointer }

</summary>

pointer: optional string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

success: true

Whether the API call was successful.

[Link to this property](#)

</details>

[Link to this property](#)

##### [Get Subdomain](/api/resources/workers/subresources/subdomains/methods/get)

GET/accounts/{account_id}/workers/subdomain

##### [Create Subdomain](/api/resources/workers/subresources/subdomains/methods/update)

PUT/accounts/{account_id}/workers/subdomain

##### [Delete Subdomain](/api/resources/workers/subresources/subdomains/methods/delete)

DELETE/accounts/{account_id}/workers/subdomain

##### Models

<details>

<summary>

SubdomainGetResponse object { subdomain }

</summary>

subdomain: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SubdomainUpdateResponse object { subdomain }

</summary>

subdomain: string

[Link to this property](#)

</details>

[Link to this property](#)

##### [List keys](/api/resources/workers/subresources/observability/subresources/telemetry/methods/keys)

POST/accounts/{account_id}/workers/observability/telemetry/keys

##### [Run a query](/api/resources/workers/subresources/observability/subresources/telemetry/methods/query)

POST/accounts/{account_id}/workers/observability/telemetry/query

##### [List values](/api/resources/workers/subresources/observability/subresources/telemetry/methods/values)

POST/accounts/{account_id}/workers/observability/telemetry/values

##### [Prepare live tail](/api/resources/workers/subresources/observability/subresources/telemetry/methods/live_tail)

POST/accounts/{account_id}/workers/observability/telemetry/live-tail

##### [Live tail heartbeat](/api/resources/workers/subresources/observability/subresources/telemetry/methods/live_tail_heartbeat)

POST/accounts/{account_id}/workers/observability/telemetry/live-tail/heartbeat

##### Models

<details>

<summary>

TelemetryKeysResponse object { key, lastSeenAt, type }

</summary>

key: string

[Link to this property](#)

lastSeenAt: number

[Link to this property](#)

<details>

<summary>

type: "string" or "boolean" or "number"

</summary>

One of the following:

"string"

[Link to this property](#)

"boolean"

[Link to this property](#)

"number"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

TelemetryQueryResponse object { run, statistics, agents, 6 more }

Complete results of a query run. The populated fields depend on the requested view type (events, calculations, invocations, traces, or agents).

</summary>

<details>

<summary>

run: object { id, accountId, dry, 8 more }

Represents a single execution of a query against Workers Observability data, including the query definition, execution status, and performance statistics.

</summary>

id: string

Unique identifier for this query run.

[Link to this property](#)

accountId: string

Cloudflare account ID that owns this query run.

[Link to this property](#)

dry: boolean

Whether this was a dry run (results not persisted).

[Link to this property](#)

granularity: number

Number of time-series buckets used for the query. Higher values produce more detailed series data.

[Link to this property](#)

<details>

<summary>

query: object { id, adhoc, created, 6 more }

A saved query definition with its parameters, metadata, and ownership information.

</summary>

id: string

[Link to this property](#)

adhoc: boolean

If the query wasn’t explcitly saved

[Link to this property](#)

<details>

<summary>

created: string or string

formatdate-time

</summary>

One of the following:

string

[Link to this property](#)

string

[Link to this property](#)

</details>

[Link to this property](#)

createdBy: string

[Link to this property](#)

description: string

maxLength1000

[Link to this property](#)

name: string

Query name

maxLength250

minLength1

[Link to this property](#)

<details>

<summary>

parameters: object { calculations, datasets, filterCombination, 6 more }

</summary>

<details>

<summary>

calculations: optional array of object { operator, alias, key, keyType } or object { key, operator, alias, keyType }

Create Calculations to compute as part of the query.

</summary>

One of the following:

<details>

<summary>

object { operator, alias, key, keyType }

</summary>

<details>

<summary>

operator: "count" or "COUNT"

</summary>

One of the following:

"count"

[Link to this property](#)

"COUNT"

[Link to this property](#)

</details>

[Link to this property](#)

alias: optional string

[Link to this property](#)

key: optional string

[Link to this property](#)

<details>

<summary>

keyType: optional "string" or "number" or "boolean"

</summary>

One of the following:

"string"

[Link to this property](#)

"number"

[Link to this property](#)

"boolean"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

object { key, operator, alias, keyType }

</summary>

key: string

[Link to this property](#)

<details>

<summary>

operator: "uniq" or "max" or "min" or 33 more

</summary>

One of the following:

"uniq"

[Link to this property](#)

"max"

[Link to this property](#)

"min"

[Link to this property](#)

"sum"

[Link to this property](#)

"avg"

[Link to this property](#)

"median"

[Link to this property](#)

"p001"

[Link to this property](#)

"p01"

[Link to this property](#)

"p05"

[Link to this property](#)

"p10"

[Link to this property](#)

"p25"

[Link to this property](#)

"p75"

[Link to this property](#)

"p90"

[Link to this property](#)

"p95"

[Link to this property](#)

"p99"

[Link to this property](#)

"p999"

[Link to this property](#)

"stddev"

[Link to this property](#)

"variance"

[Link to this property](#)

"COUNT_DISTINCT"

[Link to this property](#)

"MAX"

[Link to this property](#)

"MIN"

[Link to this property](#)

"SUM"

[Link to this property](#)

"AVG"

[Link to this property](#)

"MEDIAN"

[Link to this property](#)

"P001"

[Link to this property](#)

"P01"

[Link to this property](#)

"P05"

[Link to this property](#)

"P10"

[Link to this property](#)

"P25"

[Link to this property](#)

"P75"

[Link to this property](#)

"P90"

[Link to this property](#)

"P95"

[Link to this property](#)

"P99"

[Link to this property](#)

"P999"

[Link to this property](#)

"STDDEV"

[Link to this property](#)

"VARIANCE"

[Link to this property](#)

</details>

[Link to this property](#)

alias: optional string

[Link to this property](#)

<details>

<summary>

keyType: optional "string" or "number" or "boolean"

</summary>

One of the following:

"string"

[Link to this property](#)

"number"

[Link to this property](#)

"boolean"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

datasets: optional array of string

Set the Datasets to query. Leave it empty to query all the datasets.

[Link to this property](#)

<details>

<summary>

filterCombination: optional "and" or "or" or "AND" or "OR"

Set a Flag to describe how to combine the filters on the query.

</summary>

One of the following:

"and"

[Link to this property](#)

"or"

[Link to this property](#)

"AND"

[Link to this property](#)

"OR"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

filters: optional array of object { filterCombination, filters, kind } or object { key, operation, type, 2 more }

Configure the Filters to apply to the query. Supports nested groups via kind: ‘group’.

</summary>

One of the following:

<details>

<summary>

object { filterCombination, filters, kind }

</summary>

<details>

<summary>

filterCombination: "and" or "or" or "AND" or "OR"

</summary>

One of the following:

"and"

[Link to this property](#)

"or"

[Link to this property](#)

"AND"

[Link to this property](#)

"OR"

[Link to this property](#)

</details>

[Link to this property](#)

filters: array of unknown

[Link to this property](#)

kind: "group"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

WorkersObservabilityFilterLeaf object { key, operation, type, 2 more }

A filter condition applied to query results. Use the keys and values endpoints to discover available fields and their values before constructing filters.

</summary>

key: string

Filter field name. Use verified keys from previous query results or the keys endpoint. Common keys include $metadata.service, $metadata.origin, $metadata.trigger, $metadata.message, and $metadata.error.

[Link to this property](#)

<details>

<summary>

operation: "includes" or "not_includes" or "starts_with" or 27 more

Comparison operator. String operators: includes, not_includes, starts_with, ends_with, regex. Existence: exists, is_null. Set membership: in, not_in (comma-separated values). Numeric: eq, neq, gt, gte, lt, lte.

</summary>

One of the following:

"includes"

[Link to this property](#)

"not_includes"

[Link to this property](#)

"starts_with"

[Link to this property](#)

"ends_with"

[Link to this property](#)

"regex"

[Link to this property](#)

"exists"

[Link to this property](#)

"is_null"

[Link to this property](#)

"in"

[Link to this property](#)

"not_in"

[Link to this property](#)

"eq"

[Link to this property](#)

"neq"

[Link to this property](#)

"gt"

[Link to this property](#)

"gte"

[Link to this property](#)

"lt"

[Link to this property](#)

"lte"

[Link to this property](#)

"="

[Link to this property](#)

"!="

[Link to this property](#)

">"

[Link to this property](#)

">="

[Link to this property](#)

"<"

[Link to this property](#)

"<="

[Link to this property](#)

"INCLUDES"

[Link to this property](#)

"DOES_NOT_INCLUDE"

[Link to this property](#)

"MATCH_REGEX"

[Link to this property](#)

"EXISTS"

[Link to this property](#)

"DOES_NOT_EXIST"

[Link to this property](#)

"IN"

[Link to this property](#)

"NOT_IN"

[Link to this property](#)

"STARTS_WITH"

[Link to this property](#)

"ENDS_WITH"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

type: "string" or "number" or "boolean"

Data type of the filter field. Must match the actual type of the key being filtered.

</summary>

One of the following:

"string"

[Link to this property](#)

"number"

[Link to this property](#)

"boolean"

[Link to this property](#)

</details>

[Link to this property](#)

kind: optional "filter"

Discriminator for leaf filter nodes. Always ‘filter’ when present; may be omitted.

[Link to this property](#)

<details>

<summary>

value: optional string or number or boolean

Comparison value. Must match actual values in your data — verify with the values endpoint. Ensure the value type (string/number/boolean) matches the field type. String comparisons are case-sensitive. Regex uses RE2 syntax (no lookaheads/lookbehinds).

</summary>

One of the following:

string

[Link to this property](#)

number

[Link to this property](#)

boolean

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

groupBys: optional array of object { type, value }

Define how to group the results of the query.

</summary>

<details>

<summary>

type: "string" or "number" or "boolean"

</summary>

One of the following:

"string"

[Link to this property](#)

"number"

[Link to this property](#)

"boolean"

[Link to this property](#)

</details>

[Link to this property](#)

value: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

havings: optional array of object { key, operation, value }

Configure the Having clauses that filter on calculations in the query result.

</summary>

key: string

[Link to this property](#)

<details>

<summary>

operation: "eq" or "neq" or "gt" or 3 more

</summary>

One of the following:

"eq"

[Link to this property](#)

"neq"

[Link to this property](#)

"gt"

[Link to this property](#)

"gte"

[Link to this property](#)

"lt"

[Link to this property](#)

"lte"

[Link to this property](#)

</details>

[Link to this property](#)

value: number

[Link to this property](#)

</details>

[Link to this property](#)

limit: optional number

Set a limit on the number of results / records returned by the query

maximum100

minimum0

[Link to this property](#)

<details>

<summary>

needle: optional object { value, isRegex, matchCase }

Define an expression to search using full-text search.

</summary>

value:

[Link to this property](#)

isRegex: optional boolean

[Link to this property](#)

matchCase: optional boolean

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

orderBy: optional object { value, order }

Configure the order of the results returned by the query.

</summary>

value: string

Configure which Calculation to order the results by.

[Link to this property](#)

<details>

<summary>

order: optional "asc" or "desc"

Set the order of the results

</summary>

One of the following:

"asc"

[Link to this property](#)

"desc"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

updated: string or string

formatdate-time

</summary>

One of the following:

string

[Link to this property](#)

string

[Link to this property](#)

</details>

[Link to this property](#)

updatedBy: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

status: "STARTED" or "COMPLETED"

Current execution status of the query run.

</summary>

One of the following:

"STARTED"

[Link to this property](#)

"COMPLETED"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

timeframe: object { from, to }

Time range for the query execution. ‘from’ must be earlier than ‘to’. No fractional milliseconds.

</summary>

from: number

Start timestamp for the query timeframe. Unix timestamp in milliseconds

maximum253402300799999

minimum0

[Link to this property](#)

to: number

End timestamp for the query timeframe. Unix timestamp in milliseconds

maximum253402300799999

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

userId: string

ID of the user who initiated the query run.

[Link to this property](#)

created: optional string

ISO-8601 timestamp when the query run was created.

[Link to this property](#)

<details>

<summary>

statistics: optional object { bytes_read, elapsed, rows_read, abr_level }

Query performance statistics from the database (does not include network latency).

</summary>

bytes_read: number

Number of uncompressed bytes read from the table.

[Link to this property](#)

elapsed: number

Time in seconds for the query to run.

[Link to this property](#)

rows_read: number

Number of rows scanned from the table.

[Link to this property](#)

abr_level: optional number

The level of Adaptive Bit Rate (ABR) sampling used for the query. If empty the ABR level is 1

[Link to this property](#)

</details>

[Link to this property](#)

updated: optional string

ISO-8601 timestamp when the query run was last updated.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

statistics: object { bytes_read, elapsed, rows_read, abr_level }

Query performance statistics from the database. Includes execution time, rows scanned, and bytes read. Does not include network latency.

</summary>

bytes_read: number

Number of uncompressed bytes read from the table.

[Link to this property](#)

elapsed: number

Time in seconds for the query to run.

[Link to this property](#)

rows_read: number

Number of rows scanned from the table.

[Link to this property](#)

abr_level: optional number

The level of Adaptive Bit Rate (ABR) sampling used for the query. If empty the ABR level is 1

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

agents: optional array of object { id, errors, models, 13 more }

Agent run summaries. Present when the query view is ‘agents’. Each entry represents one trace containing at least one agent invocation.

</summary>

id: string

Stable pagination cursor for this agent run.

[Link to this property](#)

errors: array of string

Distinct errors reported by spans in the run.

[Link to this property](#)

models: array of string

Distinct models reported by chat spans across the run’s trace.

[Link to this property](#)

providers: array of string

Distinct GenAI providers reported by chat spans in the run.

[Link to this property](#)

services: array of string

Worker services represented in the run’s trace.

[Link to this property](#)

spans: number

Number of spans in the run’s trace.

[Link to this property](#)

<details>

<summary>

status: "completed" or "error"

Observed run status.

</summary>

One of the following:

"completed"

[Link to this property](#)

"error"

[Link to this property](#)

</details>

[Link to this property](#)

traceDurationMs: number

Total trace duration in milliseconds.

[Link to this property](#)

traceEndMs: number

End of the run’s trace as a Unix epoch in milliseconds.

[Link to this property](#)

traceId: string

Trace identifier for this agent run.

[Link to this property](#)

traceStartMs: number

Start of the run’s trace as a Unix epoch in milliseconds.

[Link to this property](#)

agentId: optional string

ID from the earliest agent invocation that provides one.

[Link to this property](#)

agentName: optional string

Name from the earliest agent invocation that provides one.

[Link to this property](#)

conversationId: optional string

Conversation ID from the earliest invocation that provides one.

[Link to this property](#)

inputTokens: optional number

Input tokens summed across chat spans in the run’s trace; informational, not billing data.

[Link to this property](#)

outputTokens: optional number

Output tokens summed across chat spans in the run’s trace; informational, not billing data.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

calculations: optional array of object { aggregates, calculation, series, alias }

Aggregated calculation results. Present when the query view is ‘calculations’. Contains computed metrics (count, avg, p99, etc.) with optional group-by breakdowns and time-series data.

</summary>

<details>

<summary>

aggregates: array of object { count, interval, sampleInterval, 2 more }

</summary>

count: number

[Link to this property](#)

interval: number

[Link to this property](#)

sampleInterval: number

[Link to this property](#)

value: number

[Link to this property](#)

<details>

<summary>

groups: optional array of object { key, value }

</summary>

key: string

[Link to this property](#)

<details>

<summary>

value: string or number or boolean

</summary>

One of the following:

string

[Link to this property](#)

number

[Link to this property](#)

boolean

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

calculation: string

[Link to this property](#)

<details>

<summary>

series: array of object { data, time }

</summary>

<details>

<summary>

data: array of object { count, interval, sampleInterval, 4 more }

</summary>

count: number

[Link to this property](#)

interval: number

[Link to this property](#)

sampleInterval: number

[Link to this property](#)

value: number

[Link to this property](#)

firstSeen: optional string

[Link to this property](#)

<details>

<summary>

groups: optional array of object { key, value }

</summary>

key: string

[Link to this property](#)

<details>

<summary>

value: string or number or boolean

</summary>

One of the following:

string

[Link to this property](#)

number

[Link to this property](#)

boolean

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

lastSeen: optional string

[Link to this property](#)

</details>

[Link to this property](#)

time: string

[Link to this property](#)

</details>

[Link to this property](#)

alias: optional string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

compare: optional array of object { aggregates, calculation, series, alias }

Comparison calculation results from the previous time period. Present when the compare option is enabled. Same structure as calculations.

</summary>

<details>

<summary>

aggregates: array of object { count, interval, sampleInterval, 2 more }

</summary>

count: number

[Link to this property](#)

interval: number

[Link to this property](#)

sampleInterval: number

[Link to this property](#)

value: number

[Link to this property](#)

<details>

<summary>

groups: optional array of object { key, value }

</summary>

key: string

[Link to this property](#)

<details>

<summary>

value: string or number or boolean

</summary>

One of the following:

string

[Link to this property](#)

number

[Link to this property](#)

boolean

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

calculation: string

[Link to this property](#)

<details>

<summary>

series: array of object { data, time }

</summary>

<details>

<summary>

data: array of object { count, interval, sampleInterval, 4 more }

</summary>

count: number

[Link to this property](#)

interval: number

[Link to this property](#)

sampleInterval: number

[Link to this property](#)

value: number

[Link to this property](#)

firstSeen: optional string

[Link to this property](#)

<details>

<summary>

groups: optional array of object { key, value }

</summary>

key: string

[Link to this property](#)

<details>

<summary>

value: string or number or boolean

</summary>

One of the following:

string

[Link to this property](#)

number

[Link to this property](#)

boolean

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

lastSeen: optional string

[Link to this property](#)

</details>

[Link to this property](#)

time: string

[Link to this property](#)

</details>

[Link to this property](#)

alias: optional string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

distribution: optional object { bins, bucketBoundaries, bucketMode, 2 more }

Bucketed 2D histogram of a numeric field over time. Present when chartType is ‘distribution’.

</summary>

bins: array of string

Time-bucket labels (ISO-8601 strings), one per matrix column.

[Link to this property](#)

bucketBoundaries: array of number

Raw bucket edges in the value’s native unit, length buckets.length + 1. Used for the colour scale and percentile mapping.

[Link to this property](#)

<details>

<summary>

bucketMode: "log" or "linear"

Bucketing scheme used to derive the boundaries. ‘log’ produces geometric edges; ‘linear’ produces fixed-width edges.

</summary>

One of the following:

"log"

[Link to this property](#)

"linear"

[Link to this property](#)

</details>

[Link to this property](#)

buckets: array of string

Value-range labels, one per matrix row (e.g. ‘50–100ms’).

[Link to this property](#)

matrix: array of array of number

Sampling-corrected counts. matrix[bucketIdx][binIdx] is the estimated number of events in value-bucket ‘bucketIdx’ during time-bin ‘binIdx’.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

events: optional object { count, events, fields, series }

Individual event results. Present when the query view is ‘events’. Contains the matching log lines and their metadata.

</summary>

count: optional number

Total number of events matching the query (may exceed the number returned due to limits).

[Link to this property](#)

<details>

<summary>

events: optional array of object { "$metadata", dataset, source, 3 more }

List of individual telemetry events matching the query.

</summary>

<details>

<summary>

"$metadata": object { id, account, cloudService, 29 more }

Structured metadata extracted from the event. These fields are indexed and available for filtering and aggregation.

</summary>

id: string

Unique event ID. Use as the cursor value for offset-based pagination.

[Link to this property](#)

account: optional string

Cloudflare account identifier.

[Link to this property](#)

cloudService: optional string

Cloudflare product that generated this event (e.g. workers, pages).

[Link to this property](#)

coldStart: optional number

exclusiveMinimum

minimum0

[Link to this property](#)

cost: optional number

Estimated cost units for this invocation.

exclusiveMinimum

minimum0

[Link to this property](#)

duration: optional number

Span duration in milliseconds.

exclusiveMinimum

minimum0

[Link to this property](#)

endTime: optional number

Span end time as a Unix epoch in milliseconds.

minimum0

[Link to this property](#)

error: optional string

Error message, present when the log represents an error.

[Link to this property](#)

errorTemplate: optional string

Templatized version of the error message used for grouping similar errors.

[Link to this property](#)

fingerprint: optional string

Content-based fingerprint used to group similar events.

[Link to this property](#)

level: optional string

Log level (e.g. log, debug, info, warn, error).

[Link to this property](#)

message: optional string

Log message text.

[Link to this property](#)

messageTemplate: optional string

Templatized version of the log message used for grouping similar messages.

[Link to this property](#)

metricName: optional string

Metric name when the event represents a metric data point.

[Link to this property](#)

origin: optional string

Origin of the event (e.g. fetch, scheduled, queue).

[Link to this property](#)

parentSpanId: optional string

Span ID of the parent span in the trace hierarchy.

[Link to this property](#)

provider: optional string

Infrastructure provider identifier.

[Link to this property](#)

rayId: optional string

Cloudflare Ray ID from the `cf-ray` header of the request that triggered the invocation.

[Link to this property](#)

region: optional string

Cloudflare data center / region that handled the request.

[Link to this property](#)

requestId: optional string

Cloudflare request ID that ties all logs from a single invocation together.

[Link to this property](#)

service: optional string

Worker script name that produced this event.

[Link to this property](#)

spanId: optional string

Span ID for this individual unit of work within a trace.

[Link to this property](#)

spanName: optional string

Human-readable name for this span.

[Link to this property](#)

stackId: optional string

Stack / deployment identifier.

[Link to this property](#)

startTime: optional number

Span start time as a Unix epoch in milliseconds.

minimum0

[Link to this property](#)

statusCode: optional number

HTTP response status code returned by the Worker.

exclusiveMinimum

minimum0

[Link to this property](#)

traceDuration: optional number

Total duration of the entire trace in milliseconds.

exclusiveMinimum

minimum0

[Link to this property](#)

traceId: optional string

Distributed trace ID linking spans across services.

[Link to this property](#)

transactionName: optional string

Logical transaction name for this request.

[Link to this property](#)

trigger: optional string

What triggered the invocation (e.g. GET /users, POST /orders, queue message).

[Link to this property](#)

type: optional string

Event type classifier (e.g. cf-worker-event, cf-worker-log).

[Link to this property](#)

url: optional string

Request URL that triggered the Worker invocation.

[Link to this property](#)

</details>

[Link to this property](#)

dataset: string

The dataset this event belongs to (e.g. cloudflare-workers).

[Link to this property](#)

<details>

<summary>

source: string or map[unknown]

Raw log payload. May be a string or a structured object depending on how the log was emitted.

</summary>

One of the following:

string

[Link to this property](#)

map[unknown]

[Link to this property](#)

</details>

[Link to this property](#)

timestamp: number

Event timestamp as a Unix epoch in milliseconds.

minimum0

[Link to this property](#)

"$containers": optional map[unknown]

Cloudflare Containers event information that enriches your logs for identifying and debugging issues.

[Link to this property](#)

<details>

<summary>

"$workers": optional object { eventType, requestId, scriptName, 10 more } or object { cpuTimeMs, eventType, outcome, 14 more }

Cloudflare Workers event information that enriches your logs for identifying and debugging issues.

</summary>

One of the following:

<details>

<summary>

object { eventType, requestId, scriptName, 10 more }

</summary>

<details>

<summary>

eventType: "fetch" or "scheduled" or "alarm" or 9 more

</summary>

One of the following:

"fetch"

[Link to this property](#)

"scheduled"

[Link to this property](#)

"alarm"

[Link to this property](#)

"cron"

[Link to this property](#)

"queue"

[Link to this property](#)

"email"

[Link to this property](#)

"tail"

[Link to this property](#)

"rpc"

[Link to this property](#)

"jsrpc"

[Link to this property](#)

"websocket"

[Link to this property](#)

"workflow"

[Link to this property](#)

"unknown"

[Link to this property](#)

</details>

[Link to this property](#)

requestId: string

[Link to this property](#)

scriptName: string

[Link to this property](#)

durableObjectId: optional string

[Link to this property](#)

entrypoint: optional string

[Link to this property](#)

event: optional map[unknown]

[Link to this property](#)

<details>

<summary>

executionModel: optional "durableObject" or "stateless"

</summary>

One of the following:

"durableObject"

[Link to this property](#)

"stateless"

[Link to this property](#)

</details>

[Link to this property](#)

outcome: optional string

[Link to this property](#)

<details>

<summary>

preview: optional object { id, name, slug }

</summary>

id: optional string

[Link to this property](#)

name: optional string

[Link to this property](#)

slug: optional string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

scriptVersion: optional object { id, message, tag }

</summary>

id: optional string

[Link to this property](#)

message: optional string

[Link to this property](#)

tag: optional string

[Link to this property](#)

</details>

[Link to this property](#)

spanId: optional string

[Link to this property](#)

traceId: optional string

[Link to this property](#)

truncated: optional boolean

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

object { cpuTimeMs, eventType, outcome, 14 more }

</summary>

cpuTimeMs: number

[Link to this property](#)

<details>

<summary>

eventType: "fetch" or "scheduled" or "alarm" or 9 more

</summary>

One of the following:

"fetch"

[Link to this property](#)

"scheduled"

[Link to this property](#)

"alarm"

[Link to this property](#)

"cron"

[Link to this property](#)

"queue"

[Link to this property](#)

"email"

[Link to this property](#)

"tail"

[Link to this property](#)

"rpc"

[Link to this property](#)

"jsrpc"

[Link to this property](#)

"websocket"

[Link to this property](#)

"workflow"

[Link to this property](#)

"unknown"

[Link to this property](#)

</details>

[Link to this property](#)

outcome: string

[Link to this property](#)

requestId: string

[Link to this property](#)

scriptName: string

[Link to this property](#)

wallTimeMs: number

[Link to this property](#)

<details>

<summary>

diagnosticsChannelEvents: optional array of object { channel, message, timestamp }

</summary>

channel: string

[Link to this property](#)

message: string

[Link to this property](#)

timestamp: number

[Link to this property](#)

</details>

[Link to this property](#)

dispatchNamespace: optional string

[Link to this property](#)

durableObjectId: optional string

[Link to this property](#)

entrypoint: optional string

[Link to this property](#)

event: optional map[unknown]

[Link to this property](#)

<details>

<summary>

executionModel: optional "durableObject" or "stateless"

</summary>

One of the following:

"durableObject"

[Link to this property](#)

"stateless"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

preview: optional object { id, name, slug }

</summary>

id: optional string

[Link to this property](#)

name: optional string

[Link to this property](#)

slug: optional string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

scriptVersion: optional object { id, message, tag }

</summary>

id: optional string

[Link to this property](#)

message: optional string

[Link to this property](#)

tag: optional string

[Link to this property](#)

</details>

[Link to this property](#)

spanId: optional string

[Link to this property](#)

traceId: optional string

[Link to this property](#)

truncated: optional boolean

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

fields: optional array of object { key, type }

List of fields discovered in the matched events. Useful for building dynamic UIs.

</summary>

key: string

Field name present in the matched events.

[Link to this property](#)

type: string

Data type of the field (string, number, or boolean).

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

series: optional array of object { data, time }

Time-series data for the matched events, bucketed by the query granularity.

</summary>

<details>

<summary>

data: array of object { aggregates, count, interval, 3 more }

</summary>

<details>

<summary>

aggregates: object { _count, _interval, _firstSeen, 2 more }

</summary>

Deprecated_count: number

exclusiveMinimum

minimum0

[Link to this property](#)

Deprecated_interval: number

exclusiveMinimum

minimum0

[Link to this property](#)

Deprecated_firstSeen: optional string

[Link to this property](#)

Deprecated_lastSeen: optional string

[Link to this property](#)

Deprecatedbin: optional unknown

[Link to this property](#)

</details>

[Link to this property](#)

count: number

[Link to this property](#)

interval: number

[Link to this property](#)

sampleInterval: number

[Link to this property](#)

errors: optional number

[Link to this property](#)

<details>

<summary>

groups: optional map[string or number or boolean]

Groups in the query results.

</summary>

One of the following:

string

[Link to this property](#)

number

[Link to this property](#)

boolean

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

time: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

invocations: optional map[array of object { "$metadata", dataset, source, 3 more } ]

Events grouped by invocation (request ID). Present when the query view is ‘invocations’. Each key is a request ID mapping to all events from that invocation.

</summary>

<details>

<summary>

"$metadata": object { id, account, cloudService, 29 more }

Structured metadata extracted from the event. These fields are indexed and available for filtering and aggregation.

</summary>

id: string

Unique event ID. Use as the cursor value for offset-based pagination.

[Link to this property](#)

account: optional string

Cloudflare account identifier.

[Link to this property](#)

cloudService: optional string

Cloudflare product that generated this event (e.g. workers, pages).

[Link to this property](#)

coldStart: optional number

exclusiveMinimum

minimum0

[Link to this property](#)

cost: optional number

Estimated cost units for this invocation.

exclusiveMinimum

minimum0

[Link to this property](#)

duration: optional number

Span duration in milliseconds.

exclusiveMinimum

minimum0

[Link to this property](#)

endTime: optional number

Span end time as a Unix epoch in milliseconds.

minimum0

[Link to this property](#)

error: optional string

Error message, present when the log represents an error.

[Link to this property](#)

errorTemplate: optional string

Templatized version of the error message used for grouping similar errors.

[Link to this property](#)

fingerprint: optional string

Content-based fingerprint used to group similar events.

[Link to this property](#)

level: optional string

Log level (e.g. log, debug, info, warn, error).

[Link to this property](#)

message: optional string

Log message text.

[Link to this property](#)

messageTemplate: optional string

Templatized version of the log message used for grouping similar messages.

[Link to this property](#)

metricName: optional string

Metric name when the event represents a metric data point.

[Link to this property](#)

origin: optional string

Origin of the event (e.g. fetch, scheduled, queue).

[Link to this property](#)

parentSpanId: optional string

Span ID of the parent span in the trace hierarchy.

[Link to this property](#)

provider: optional string

Infrastructure provider identifier.

[Link to this property](#)

rayId: optional string

Cloudflare Ray ID from the `cf-ray` header of the request that triggered the invocation.

[Link to this property](#)

region: optional string

Cloudflare data center / region that handled the request.

[Link to this property](#)

requestId: optional string

Cloudflare request ID that ties all logs from a single invocation together.

[Link to this property](#)

service: optional string

Worker script name that produced this event.

[Link to this property](#)

spanId: optional string

Span ID for this individual unit of work within a trace.

[Link to this property](#)

spanName: optional string

Human-readable name for this span.

[Link to this property](#)

stackId: optional string

Stack / deployment identifier.

[Link to this property](#)

startTime: optional number

Span start time as a Unix epoch in milliseconds.

minimum0

[Link to this property](#)

statusCode: optional number

HTTP response status code returned by the Worker.

exclusiveMinimum

minimum0

[Link to this property](#)

traceDuration: optional number

Total duration of the entire trace in milliseconds.

exclusiveMinimum

minimum0

[Link to this property](#)

traceId: optional string

Distributed trace ID linking spans across services.

[Link to this property](#)

transactionName: optional string

Logical transaction name for this request.

[Link to this property](#)

trigger: optional string

What triggered the invocation (e.g. GET /users, POST /orders, queue message).

[Link to this property](#)

type: optional string

Event type classifier (e.g. cf-worker-event, cf-worker-log).

[Link to this property](#)

url: optional string

Request URL that triggered the Worker invocation.

[Link to this property](#)

</details>

[Link to this property](#)

dataset: string

The dataset this event belongs to (e.g. cloudflare-workers).

[Link to this property](#)

<details>

<summary>

source: string or map[unknown]

Raw log payload. May be a string or a structured object depending on how the log was emitted.

</summary>

One of the following:

string

[Link to this property](#)

map[unknown]

[Link to this property](#)

</details>

[Link to this property](#)

timestamp: number

Event timestamp as a Unix epoch in milliseconds.

minimum0

[Link to this property](#)

"$containers": optional map[unknown]

Cloudflare Containers event information that enriches your logs for identifying and debugging issues.

[Link to this property](#)

<details>

<summary>

"$workers": optional object { eventType, requestId, scriptName, 10 more } or object { cpuTimeMs, eventType, outcome, 14 more }

Cloudflare Workers event information that enriches your logs for identifying and debugging issues.

</summary>

One of the following:

<details>

<summary>

object { eventType, requestId, scriptName, 10 more }

</summary>

<details>

<summary>

eventType: "fetch" or "scheduled" or "alarm" or 9 more

</summary>

One of the following:

"fetch"

[Link to this property](#)

"scheduled"

[Link to this property](#)

"alarm"

[Link to this property](#)

"cron"

[Link to this property](#)

"queue"

[Link to this property](#)

"email"

[Link to this property](#)

"tail"

[Link to this property](#)

"rpc"

[Link to this property](#)

"jsrpc"

[Link to this property](#)

"websocket"

[Link to this property](#)

"workflow"

[Link to this property](#)

"unknown"

[Link to this property](#)

</details>

[Link to this property](#)

requestId: string

[Link to this property](#)

scriptName: string

[Link to this property](#)

durableObjectId: optional string

[Link to this property](#)

entrypoint: optional string

[Link to this property](#)

event: optional map[unknown]

[Link to this property](#)

<details>

<summary>

executionModel: optional "durableObject" or "stateless"

</summary>

One of the following:

"durableObject"

[Link to this property](#)

"stateless"

[Link to this property](#)

</details>

[Link to this property](#)

outcome: optional string

[Link to this property](#)

<details>

<summary>

preview: optional object { id, name, slug }

</summary>

id: optional string

[Link to this property](#)

name: optional string

[Link to this property](#)

slug: optional string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

scriptVersion: optional object { id, message, tag }

</summary>

id: optional string

[Link to this property](#)

message: optional string

[Link to this property](#)

tag: optional string

[Link to this property](#)

</details>

[Link to this property](#)

spanId: optional string

[Link to this property](#)

traceId: optional string

[Link to this property](#)

truncated: optional boolean

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

object { cpuTimeMs, eventType, outcome, 14 more }

</summary>

cpuTimeMs: number

[Link to this property](#)

<details>

<summary>

eventType: "fetch" or "scheduled" or "alarm" or 9 more

</summary>

One of the following:

"fetch"

[Link to this property](#)

"scheduled"

[Link to this property](#)

"alarm"

[Link to this property](#)

"cron"

[Link to this property](#)

"queue"

[Link to this property](#)

"email"

[Link to this property](#)

"tail"

[Link to this property](#)

"rpc"

[Link to this property](#)

"jsrpc"

[Link to this property](#)

"websocket"

[Link to this property](#)

"workflow"

[Link to this property](#)

"unknown"

[Link to this property](#)

</details>

[Link to this property](#)

outcome: string

[Link to this property](#)

requestId: string

[Link to this property](#)

scriptName: string

[Link to this property](#)

wallTimeMs: number

[Link to this property](#)

<details>

<summary>

diagnosticsChannelEvents: optional array of object { channel, message, timestamp }

</summary>

channel: string

[Link to this property](#)

message: string

[Link to this property](#)

timestamp: number

[Link to this property](#)

</details>

[Link to this property](#)

dispatchNamespace: optional string

[Link to this property](#)

durableObjectId: optional string

[Link to this property](#)

entrypoint: optional string

[Link to this property](#)

event: optional map[unknown]

[Link to this property](#)

<details>

<summary>

executionModel: optional "durableObject" or "stateless"

</summary>

One of the following:

"durableObject"

[Link to this property](#)

"stateless"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

preview: optional object { id, name, slug }

</summary>

id: optional string

[Link to this property](#)

name: optional string

[Link to this property](#)

slug: optional string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

scriptVersion: optional object { id, message, tag }

</summary>

id: optional string

[Link to this property](#)

message: optional string

[Link to this property](#)

tag: optional string

[Link to this property](#)

</details>

[Link to this property](#)

spanId: optional string

[Link to this property](#)

traceId: optional string

[Link to this property](#)

truncated: optional boolean

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

traces: optional array of object { rootSpanName, rootTransactionName, service, 6 more }

Trace summaries matching the query. Present when the query view is ‘traces’. Each entry represents a distributed trace with its spans, duration, and services involved.

</summary>

rootSpanName: string

Name of the root span that initiated the trace.

[Link to this property](#)

rootTransactionName: string

Logical transaction name for the root span.

[Link to this property](#)

service: array of string

List of Worker services involved in the trace.

[Link to this property](#)

spans: number

Total number of spans in the trace.

[Link to this property](#)

traceDurationMs: number

Total duration of the trace in milliseconds.

[Link to this property](#)

traceEndMs: number

Trace end time as a Unix epoch in milliseconds.

[Link to this property](#)

traceId: string

Unique identifier for the distributed trace.

[Link to this property](#)

traceStartMs: number

Trace start time as a Unix epoch in milliseconds.

[Link to this property](#)

errors: optional array of string

Error messages encountered during the trace, if any.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

TelemetryValuesResponse object { dataset, key, type, value }

</summary>

dataset: string

[Link to this property](#)

key: string

[Link to this property](#)

<details>

<summary>

type: "string" or "boolean" or "number"

</summary>

One of the following:

"string"

[Link to this property](#)

"boolean"

[Link to this property](#)

"number"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

value: string or number or boolean

</summary>

One of the following:

string

[Link to this property](#)

number

[Link to this property](#)

boolean

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

TelemetryLiveTailResponse object { wsUrl }

</summary>

wsUrl: string

WebSocket URL clients connect to in order to stream live tail events.

formaturi

[Link to this property](#)

</details>

[Link to this property](#)

TelemetryLiveTailHeartbeatResponse = unknown

[Link to this property](#)

##### [Get Destinations](/api/resources/workers/subresources/observability/subresources/destinations/methods/list)

GET/accounts/{account_id}/workers/observability/destinations

##### [Create Destination](/api/resources/workers/subresources/observability/subresources/destinations/methods/create)

POST/accounts/{account_id}/workers/observability/destinations

##### [Update Destination](/api/resources/workers/subresources/observability/subresources/destinations/methods/update)

PATCH/accounts/{account_id}/workers/observability/destinations/{slug}

##### [Delete Destination](/api/resources/workers/subresources/observability/subresources/destinations/methods/delete)

DELETE/accounts/{account_id}/workers/observability/destinations/{slug}

##### Models

<details>

<summary>

DestinationListResponse object { configuration, enabled, name, 2 more }

</summary>

<details>

<summary>

configuration: object { destination_conf, headers, jobStatus, 3 more }

</summary>

destination_conf: string

[Link to this property](#)

headers: map[string]

[Link to this property](#)

<details>

<summary>

jobStatus: object { error_message, last_complete, last_error }

</summary>

error_message: string

[Link to this property](#)

last_complete: string

[Link to this property](#)

last_error: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

logpushDataset: "opentelemetry-traces" or "opentelemetry-logs" or "opentelemetry-metrics"

</summary>

One of the following:

"opentelemetry-traces"

[Link to this property](#)

"opentelemetry-logs"

[Link to this property](#)

"opentelemetry-metrics"

[Link to this property](#)

</details>

[Link to this property](#)

type: "logpush"

[Link to this property](#)

url: string

[Link to this property](#)

</details>

[Link to this property](#)

enabled: boolean

[Link to this property](#)

name: string

[Link to this property](#)

scripts: array of string

[Link to this property](#)

slug: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DestinationCreateResponse object { configuration, enabled, name, 2 more }

</summary>

<details>

<summary>

configuration: object { destination_conf, logpushDataset, logpushJob, 2 more }

</summary>

destination_conf: string

[Link to this property](#)

<details>

<summary>

logpushDataset: "opentelemetry-traces" or "opentelemetry-logs" or "opentelemetry-metrics"

</summary>

One of the following:

"opentelemetry-traces"

[Link to this property](#)

"opentelemetry-logs"

[Link to this property](#)

"opentelemetry-metrics"

[Link to this property](#)

</details>

[Link to this property](#)

logpushJob: number

[Link to this property](#)

type: "logpush"

[Link to this property](#)

url: string

[Link to this property](#)

</details>

[Link to this property](#)

enabled: boolean

[Link to this property](#)

name: string

[Link to this property](#)

scripts: array of string

[Link to this property](#)

slug: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DestinationUpdateResponse object { configuration, enabled, name, 2 more }

</summary>

<details>

<summary>

configuration: object { destination_conf, logpushDataset, logpushJob, 2 more }

</summary>

destination_conf: string

[Link to this property](#)

<details>

<summary>

logpushDataset: "opentelemetry-traces" or "opentelemetry-logs" or "opentelemetry-metrics"

</summary>

One of the following:

"opentelemetry-traces"

[Link to this property](#)

"opentelemetry-logs"

[Link to this property](#)

"opentelemetry-metrics"

[Link to this property](#)

</details>

[Link to this property](#)

logpushJob: number

[Link to this property](#)

type: "logpush"

[Link to this property](#)

url: string

[Link to this property](#)

</details>

[Link to this property](#)

enabled: boolean

[Link to this property](#)

name: string

[Link to this property](#)

scripts: array of string

[Link to this property](#)

slug: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DestinationDeleteResponse object { configuration, enabled, name, 2 more }

</summary>

<details>

<summary>

configuration: object { destination_conf, logpushDataset, logpushJob, 2 more }

</summary>

destination_conf: string

[Link to this property](#)

<details>

<summary>

logpushDataset: "opentelemetry-traces" or "opentelemetry-logs" or "opentelemetry-metrics"

</summary>

One of the following:

"opentelemetry-traces"

[Link to this property](#)

"opentelemetry-logs"

[Link to this property](#)

"opentelemetry-metrics"

[Link to this property](#)

</details>

[Link to this property](#)

logpushJob: number

[Link to this property](#)

type: "logpush"

[Link to this property](#)

url: string

[Link to this property](#)

</details>

[Link to this property](#)

enabled: boolean

[Link to this property](#)

name: string

[Link to this property](#)

scripts: array of string

[Link to this property](#)

slug: string

[Link to this property](#)

</details>

[Link to this property](#)

##### [Save query](/api/resources/workers/subresources/observability/subresources/queries/methods/create)

POST/accounts/{account_id}/workers/observability/queries

##### [List queries](/api/resources/workers/subresources/observability/subresources/queries/methods/list)

GET/accounts/{account_id}/workers/observability/queries

##### Models

<details>

<summary>

QueryCreateResponse object { id, adhoc, created, 6 more }

</summary>

id: string

[Link to this property](#)

adhoc: boolean

If the query wasn’t explcitly saved

[Link to this property](#)

created: string

formatdate-time

[Link to this property](#)

createdBy: string

[Link to this property](#)

description: string

maxLength1000

[Link to this property](#)

name: string

Query name

maxLength250

minLength1

[Link to this property](#)

<details>

<summary>

parameters: object { calculations, datasets, filterCombination, 6 more }

</summary>

<details>

<summary>

calculations: optional array of object { operator, alias, key, keyType } or object { key, operator, alias, keyType }

Create Calculations to compute as part of the query.

</summary>

One of the following:

<details>

<summary>

object { operator, alias, key, keyType }

</summary>

<details>

<summary>

operator: "count" or "COUNT"

</summary>

One of the following:

"count"

[Link to this property](#)

"COUNT"

[Link to this property](#)

</details>

[Link to this property](#)

alias: optional string

[Link to this property](#)

key: optional string

[Link to this property](#)

<details>

<summary>

keyType: optional "string" or "number" or "boolean"

</summary>

One of the following:

"string"

[Link to this property](#)

"number"

[Link to this property](#)

"boolean"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

object { key, operator, alias, keyType }

</summary>

key: string

[Link to this property](#)

<details>

<summary>

operator: "uniq" or "max" or "min" or 33 more

</summary>

One of the following:

"uniq"

[Link to this property](#)

"max"

[Link to this property](#)

"min"

[Link to this property](#)

"sum"

[Link to this property](#)

"avg"

[Link to this property](#)

"median"

[Link to this property](#)

"p001"

[Link to this property](#)

"p01"

[Link to this property](#)

"p05"

[Link to this property](#)

"p10"

[Link to this property](#)

"p25"

[Link to this property](#)

"p75"

[Link to this property](#)

"p90"

[Link to this property](#)

"p95"

[Link to this property](#)

"p99"

[Link to this property](#)

"p999"

[Link to this property](#)

"stddev"

[Link to this property](#)

"variance"

[Link to this property](#)

"COUNT_DISTINCT"

[Link to this property](#)

"MAX"

[Link to this property](#)

"MIN"

[Link to this property](#)

"SUM"

[Link to this property](#)

"AVG"

[Link to this property](#)

"MEDIAN"

[Link to this property](#)

"P001"

[Link to this property](#)

"P01"

[Link to this property](#)

"P05"

[Link to this property](#)

"P10"

[Link to this property](#)

"P25"

[Link to this property](#)

"P75"

[Link to this property](#)

"P90"

[Link to this property](#)

"P95"

[Link to this property](#)

"P99"

[Link to this property](#)

"P999"

[Link to this property](#)

"STDDEV"

[Link to this property](#)

"VARIANCE"

[Link to this property](#)

</details>

[Link to this property](#)

alias: optional string

[Link to this property](#)

<details>

<summary>

keyType: optional "string" or "number" or "boolean"

</summary>

One of the following:

"string"

[Link to this property](#)

"number"

[Link to this property](#)

"boolean"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

datasets: optional array of string

Set the Datasets to query. Leave it empty to query all the datasets.

[Link to this property](#)

<details>

<summary>

filterCombination: optional "and" or "or" or "AND" or "OR"

Set a Flag to describe how to combine the filters on the query.

</summary>

One of the following:

"and"

[Link to this property](#)

"or"

[Link to this property](#)

"AND"

[Link to this property](#)

"OR"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

filters: optional array of object { filterCombination, filters, kind } or object { key, operation, type, 2 more }

Configure the Filters to apply to the query. Supports nested groups via kind: ‘group’.

</summary>

One of the following:

<details>

<summary>

object { filterCombination, filters, kind }

</summary>

<details>

<summary>

filterCombination: "and" or "or" or "AND" or "OR"

</summary>

One of the following:

"and"

[Link to this property](#)

"or"

[Link to this property](#)

"AND"

[Link to this property](#)

"OR"

[Link to this property](#)

</details>

[Link to this property](#)

filters: array of unknown

[Link to this property](#)

kind: "group"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

WorkersObservabilityFilterLeaf object { key, operation, type, 2 more }

A filter condition applied to query results. Use the keys and values endpoints to discover available fields and their values before constructing filters.

</summary>

key: string

Filter field name. Use verified keys from previous query results or the keys endpoint. Common keys include $metadata.service, $metadata.origin, $metadata.trigger, $metadata.message, and $metadata.error.

[Link to this property](#)

<details>

<summary>

operation: "includes" or "not_includes" or "starts_with" or 27 more

Comparison operator. String operators: includes, not_includes, starts_with, ends_with, regex. Existence: exists, is_null. Set membership: in, not_in (comma-separated values). Numeric: eq, neq, gt, gte, lt, lte.

</summary>

One of the following:

"includes"

[Link to this property](#)

"not_includes"

[Link to this property](#)

"starts_with"

[Link to this property](#)

"ends_with"

[Link to this property](#)

"regex"

[Link to this property](#)

"exists"

[Link to this property](#)

"is_null"

[Link to this property](#)

"in"

[Link to this property](#)

"not_in"

[Link to this property](#)

"eq"

[Link to this property](#)

"neq"

[Link to this property](#)

"gt"

[Link to this property](#)

"gte"

[Link to this property](#)

"lt"

[Link to this property](#)

"lte"

[Link to this property](#)

"="

[Link to this property](#)

"!="

[Link to this property](#)

">"

[Link to this property](#)

">="

[Link to this property](#)

"<"

[Link to this property](#)

"<="

[Link to this property](#)

"INCLUDES"

[Link to this property](#)

"DOES_NOT_INCLUDE"

[Link to this property](#)

"MATCH_REGEX"

[Link to this property](#)

"EXISTS"

[Link to this property](#)

"DOES_NOT_EXIST"

[Link to this property](#)

"IN"

[Link to this property](#)

"NOT_IN"

[Link to this property](#)

"STARTS_WITH"

[Link to this property](#)

"ENDS_WITH"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

type: "string" or "number" or "boolean"

Data type of the filter field. Must match the actual type of the key being filtered.

</summary>

One of the following:

"string"

[Link to this property](#)

"number"

[Link to this property](#)

"boolean"

[Link to this property](#)

</details>

[Link to this property](#)

kind: optional "filter"

Discriminator for leaf filter nodes. Always ‘filter’ when present; may be omitted.

[Link to this property](#)

<details>

<summary>

value: optional string or number or boolean

Comparison value. Must match actual values in your data — verify with the values endpoint. Ensure the value type (string/number/boolean) matches the field type. String comparisons are case-sensitive. Regex uses RE2 syntax (no lookaheads/lookbehinds).

</summary>

One of the following:

string

[Link to this property](#)

number

[Link to this property](#)

boolean

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

groupBys: optional array of object { type, value }

Define how to group the results of the query.

</summary>

<details>

<summary>

type: "string" or "number" or "boolean"

</summary>

One of the following:

"string"

[Link to this property](#)

"number"

[Link to this property](#)

"boolean"

[Link to this property](#)

</details>

[Link to this property](#)

value: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

havings: optional array of object { key, operation, value }

Configure the Having clauses that filter on calculations in the query result.

</summary>

key: string

[Link to this property](#)

<details>

<summary>

operation: "eq" or "neq" or "gt" or 3 more

</summary>

One of the following:

"eq"

[Link to this property](#)

"neq"

[Link to this property](#)

"gt"

[Link to this property](#)

"gte"

[Link to this property](#)

"lt"

[Link to this property](#)

"lte"

[Link to this property](#)

</details>

[Link to this property](#)

value: number

[Link to this property](#)

</details>

[Link to this property](#)

limit: optional number

Set a limit on the number of results / records returned by the query

maximum100

minimum0

[Link to this property](#)

<details>

<summary>

needle: optional object { value, isRegex, matchCase }

Define an expression to search using full-text search.

</summary>

<details>

<summary>

value: string or number or boolean

maxLength1000

</summary>

One of the following:

string

[Link to this property](#)

number

[Link to this property](#)

boolean

[Link to this property](#)

</details>

[Link to this property](#)

isRegex: optional boolean

[Link to this property](#)

matchCase: optional boolean

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

orderBy: optional object { value, order }

Configure the order of the results returned by the query.

</summary>

value: string

Configure which Calculation to order the results by.

[Link to this property](#)

<details>

<summary>

order: optional "asc" or "desc"

Set the order of the results

</summary>

One of the following:

"asc"

[Link to this property](#)

"desc"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

updated: string

formatdate-time

[Link to this property](#)

updatedBy: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

QueryListResponse object { id, adhoc, created, 6 more }

</summary>

id: string

[Link to this property](#)

adhoc: boolean

If the query wasn’t explcitly saved

[Link to this property](#)

created: string

formatdate-time

[Link to this property](#)

createdBy: string

[Link to this property](#)

description: string

maxLength1000

[Link to this property](#)

name: string

Query name

maxLength250

minLength1

[Link to this property](#)

<details>

<summary>

parameters: object { calculations, datasets, filterCombination, 6 more }

</summary>

<details>

<summary>

calculations: optional array of object { operator, alias, key, keyType } or object { key, operator, alias, keyType }

Create Calculations to compute as part of the query.

</summary>

One of the following:

<details>

<summary>

object { operator, alias, key, keyType }

</summary>

<details>

<summary>

operator: "count" or "COUNT"

</summary>

One of the following:

"count"

[Link to this property](#)

"COUNT"

[Link to this property](#)

</details>

[Link to this property](#)

alias: optional string

[Link to this property](#)

key: optional string

[Link to this property](#)

<details>

<summary>

keyType: optional "string" or "number" or "boolean"

</summary>

One of the following:

"string"

[Link to this property](#)

"number"

[Link to this property](#)

"boolean"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

object { key, operator, alias, keyType }

</summary>

key: string

[Link to this property](#)

<details>

<summary>

operator: "uniq" or "max" or "min" or 33 more

</summary>

One of the following:

"uniq"

[Link to this property](#)

"max"

[Link to this property](#)

"min"

[Link to this property](#)

"sum"

[Link to this property](#)

"avg"

[Link to this property](#)

"median"

[Link to this property](#)

"p001"

[Link to this property](#)

"p01"

[Link to this property](#)

"p05"

[Link to this property](#)

"p10"

[Link to this property](#)

"p25"

[Link to this property](#)

"p75"

[Link to this property](#)

"p90"

[Link to this property](#)

"p95"

[Link to this property](#)

"p99"

[Link to this property](#)

"p999"

[Link to this property](#)

"stddev"

[Link to this property](#)

"variance"

[Link to this property](#)

"COUNT_DISTINCT"

[Link to this property](#)

"MAX"

[Link to this property](#)

"MIN"

[Link to this property](#)

"SUM"

[Link to this property](#)

"AVG"

[Link to this property](#)

"MEDIAN"

[Link to this property](#)

"P001"

[Link to this property](#)

"P01"

[Link to this property](#)

"P05"

[Link to this property](#)

"P10"

[Link to this property](#)

"P25"

[Link to this property](#)

"P75"

[Link to this property](#)

"P90"

[Link to this property](#)

"P95"

[Link to this property](#)

"P99"

[Link to this property](#)

"P999"

[Link to this property](#)

"STDDEV"

[Link to this property](#)

"VARIANCE"

[Link to this property](#)

</details>

[Link to this property](#)

alias: optional string

[Link to this property](#)

<details>

<summary>

keyType: optional "string" or "number" or "boolean"

</summary>

One of the following:

"string"

[Link to this property](#)

"number"

[Link to this property](#)

"boolean"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

datasets: optional array of string

Set the Datasets to query. Leave it empty to query all the datasets.

[Link to this property](#)

<details>

<summary>

filterCombination: optional "and" or "or" or "AND" or "OR"

Set a Flag to describe how to combine the filters on the query.

</summary>

One of the following:

"and"

[Link to this property](#)

"or"

[Link to this property](#)

"AND"

[Link to this property](#)

"OR"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

filters: optional array of object { filterCombination, filters, kind } or object { key, operation, type, 2 more }

Configure the Filters to apply to the query. Supports nested groups via kind: ‘group’.

</summary>

One of the following:

<details>

<summary>

object { filterCombination, filters, kind }

</summary>

<details>

<summary>

filterCombination: "and" or "or" or "AND" or "OR"

</summary>

One of the following:

"and"

[Link to this property](#)

"or"

[Link to this property](#)

"AND"

[Link to this property](#)

"OR"

[Link to this property](#)

</details>

[Link to this property](#)

filters: array of unknown

[Link to this property](#)

kind: "group"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

WorkersObservabilityFilterLeaf object { key, operation, type, 2 more }

A filter condition applied to query results. Use the keys and values endpoints to discover available fields and their values before constructing filters.

</summary>

key: string

Filter field name. Use verified keys from previous query results or the keys endpoint. Common keys include $metadata.service, $metadata.origin, $metadata.trigger, $metadata.message, and $metadata.error.

[Link to this property](#)

<details>

<summary>

operation: "includes" or "not_includes" or "starts_with" or 27 more

Comparison operator. String operators: includes, not_includes, starts_with, ends_with, regex. Existence: exists, is_null. Set membership: in, not_in (comma-separated values). Numeric: eq, neq, gt, gte, lt, lte.

</summary>

One of the following:

"includes"

[Link to this property](#)

"not_includes"

[Link to this property](#)

"starts_with"

[Link to this property](#)

"ends_with"

[Link to this property](#)

"regex"

[Link to this property](#)

"exists"

[Link to this property](#)

"is_null"

[Link to this property](#)

"in"

[Link to this property](#)

"not_in"

[Link to this property](#)

"eq"

[Link to this property](#)

"neq"

[Link to this property](#)

"gt"

[Link to this property](#)

"gte"

[Link to this property](#)

"lt"

[Link to this property](#)

"lte"

[Link to this property](#)

"="

[Link to this property](#)

"!="

[Link to this property](#)

">"

[Link to this property](#)

">="

[Link to this property](#)

"<"

[Link to this property](#)

"<="

[Link to this property](#)

"INCLUDES"

[Link to this property](#)

"DOES_NOT_INCLUDE"

[Link to this property](#)

"MATCH_REGEX"

[Link to this property](#)

"EXISTS"

[Link to this property](#)

"DOES_NOT_EXIST"

[Link to this property](#)

"IN"

[Link to this property](#)

"NOT_IN"

[Link to this property](#)

"STARTS_WITH"

[Link to this property](#)

"ENDS_WITH"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

type: "string" or "number" or "boolean"

Data type of the filter field. Must match the actual type of the key being filtered.

</summary>

One of the following:

"string"

[Link to this property](#)

"number"

[Link to this property](#)

"boolean"

[Link to this property](#)

</details>

[Link to this property](#)

kind: optional "filter"

Discriminator for leaf filter nodes. Always ‘filter’ when present; may be omitted.

[Link to this property](#)

<details>

<summary>

value: optional string or number or boolean

Comparison value. Must match actual values in your data — verify with the values endpoint. Ensure the value type (string/number/boolean) matches the field type. String comparisons are case-sensitive. Regex uses RE2 syntax (no lookaheads/lookbehinds).

</summary>

One of the following:

string

[Link to this property](#)

number

[Link to this property](#)

boolean

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

groupBys: optional array of object { type, value }

Define how to group the results of the query.

</summary>

<details>

<summary>

type: "string" or "number" or "boolean"

</summary>

One of the following:

"string"

[Link to this property](#)

"number"

[Link to this property](#)

"boolean"

[Link to this property](#)

</details>

[Link to this property](#)

value: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

havings: optional array of object { key, operation, value }

Configure the Having clauses that filter on calculations in the query result.

</summary>

key: string

[Link to this property](#)

<details>

<summary>

operation: "eq" or "neq" or "gt" or 3 more

</summary>

One of the following:

"eq"

[Link to this property](#)

"neq"

[Link to this property](#)

"gt"

[Link to this property](#)

"gte"

[Link to this property](#)

"lt"

[Link to this property](#)

"lte"

[Link to this property](#)

</details>

[Link to this property](#)

value: number

[Link to this property](#)

</details>

[Link to this property](#)

limit: optional number

Set a limit on the number of results / records returned by the query

maximum100

minimum0

[Link to this property](#)

<details>

<summary>

needle: optional object { value, isRegex, matchCase }

Define an expression to search using full-text search.

</summary>

<details>

<summary>

value: string or number or boolean

maxLength1000

</summary>

One of the following:

string

[Link to this property](#)

number

[Link to this property](#)

boolean

[Link to this property](#)

</details>

[Link to this property](#)

isRegex: optional boolean

[Link to this property](#)

matchCase: optional boolean

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

orderBy: optional object { value, order }

Configure the order of the results returned by the query.

</summary>

value: string

Configure which Calculation to order the results by.

[Link to this property](#)

<details>

<summary>

order: optional "asc" or "desc"

Set the order of the results

</summary>

One of the following:

"asc"

[Link to this property](#)

"desc"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

updated: string

formatdate-time

[Link to this property](#)

updatedBy: string

[Link to this property](#)

</details>

[Link to this property](#)

##### [Create a sharable link to a query result](/api/resources/workers/subresources/observability/subresources/shared_queries/methods/create)

POST/accounts/{account_id}/workers/observability/shared/query

##### [View a query that has been shared](/api/resources/workers/subresources/observability/subresources/shared_queries/methods/get)

GET/accounts/{account_id}/workers/observability/shared/query/{id}

##### Models

<details>

<summary>

SharedQueryCreateResponse object { id }

</summary>

id: string

Specify the ID of the shared query.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SharedQueryGetResponse object { run, statistics, agents, 6 more }

Complete results of a query run. The populated fields depend on the requested view type (events, calculations, invocations, traces, or agents).

</summary>

<details>

<summary>

run: object { id, accountId, dry, 8 more }

Represents a single execution of a query against Workers Observability data, including the query definition, execution status, and performance statistics.

</summary>

id: string

Unique identifier for this query run.

[Link to this property](#)

accountId: string

Cloudflare account ID that owns this query run.

[Link to this property](#)

dry: boolean

Whether this was a dry run (results not persisted).

[Link to this property](#)

granularity: number

Number of time-series buckets used for the query. Higher values produce more detailed series data.

[Link to this property](#)

<details>

<summary>

query: object { id, adhoc, created, 6 more }

A saved query definition with its parameters, metadata, and ownership information.

</summary>

id: string

[Link to this property](#)

adhoc: boolean

If the query wasn’t explcitly saved

[Link to this property](#)

<details>

<summary>

created: string or string

formatdate-time

</summary>

One of the following:

string

[Link to this property](#)

string

[Link to this property](#)

</details>

[Link to this property](#)

createdBy: string

[Link to this property](#)

description: string

maxLength1000

[Link to this property](#)

name: string

Query name

maxLength250

minLength1

[Link to this property](#)

<details>

<summary>

parameters: object { calculations, datasets, filterCombination, 6 more }

</summary>

<details>

<summary>

calculations: optional array of object { operator, alias, key, keyType } or object { key, operator, alias, keyType }

Create Calculations to compute as part of the query.

</summary>

One of the following:

<details>

<summary>

object { operator, alias, key, keyType }

</summary>

<details>

<summary>

operator: "count" or "COUNT"

</summary>

One of the following:

"count"

[Link to this property](#)

"COUNT"

[Link to this property](#)

</details>

[Link to this property](#)

alias: optional string

[Link to this property](#)

key: optional string

[Link to this property](#)

<details>

<summary>

keyType: optional "string" or "number" or "boolean"

</summary>

One of the following:

"string"

[Link to this property](#)

"number"

[Link to this property](#)

"boolean"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

object { key, operator, alias, keyType }

</summary>

key: string

[Link to this property](#)

<details>

<summary>

operator: "uniq" or "max" or "min" or 33 more

</summary>

One of the following:

"uniq"

[Link to this property](#)

"max"

[Link to this property](#)

"min"

[Link to this property](#)

"sum"

[Link to this property](#)

"avg"

[Link to this property](#)

"median"

[Link to this property](#)

"p001"

[Link to this property](#)

"p01"

[Link to this property](#)

"p05"

[Link to this property](#)

"p10"

[Link to this property](#)

"p25"

[Link to this property](#)

"p75"

[Link to this property](#)

"p90"

[Link to this property](#)

"p95"

[Link to this property](#)

"p99"

[Link to this property](#)

"p999"

[Link to this property](#)

"stddev"

[Link to this property](#)

"variance"

[Link to this property](#)

"COUNT_DISTINCT"

[Link to this property](#)

"MAX"

[Link to this property](#)

"MIN"

[Link to this property](#)

"SUM"

[Link to this property](#)

"AVG"

[Link to this property](#)

"MEDIAN"

[Link to this property](#)

"P001"

[Link to this property](#)

"P01"

[Link to this property](#)

"P05"

[Link to this property](#)

"P10"

[Link to this property](#)

"P25"

[Link to this property](#)

"P75"

[Link to this property](#)

"P90"

[Link to this property](#)

"P95"

[Link to this property](#)

"P99"

[Link to this property](#)

"P999"

[Link to this property](#)

"STDDEV"

[Link to this property](#)

"VARIANCE"

[Link to this property](#)

</details>

[Link to this property](#)

alias: optional string

[Link to this property](#)

<details>

<summary>

keyType: optional "string" or "number" or "boolean"

</summary>

One of the following:

"string"

[Link to this property](#)

"number"

[Link to this property](#)

"boolean"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

datasets: optional array of string

Set the Datasets to query. Leave it empty to query all the datasets.

[Link to this property](#)

<details>

<summary>

filterCombination: optional "and" or "or" or "AND" or "OR"

Set a Flag to describe how to combine the filters on the query.

</summary>

One of the following:

"and"

[Link to this property](#)

"or"

[Link to this property](#)

"AND"

[Link to this property](#)

"OR"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

filters: optional array of object { filterCombination, filters, kind } or object { key, operation, type, 2 more }

Configure the Filters to apply to the query. Supports nested groups via kind: ‘group’.

</summary>

One of the following:

<details>

<summary>

object { filterCombination, filters, kind }

</summary>

<details>

<summary>

filterCombination: "and" or "or" or "AND" or "OR"

</summary>

One of the following:

"and"

[Link to this property](#)

"or"

[Link to this property](#)

"AND"

[Link to this property](#)

"OR"

[Link to this property](#)

</details>

[Link to this property](#)

filters: array of unknown

[Link to this property](#)

kind: "group"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

WorkersObservabilityFilterLeaf object { key, operation, type, 2 more }

A filter condition applied to query results. Use the keys and values endpoints to discover available fields and their values before constructing filters.

</summary>

key: string

Filter field name. Use verified keys from previous query results or the keys endpoint. Common keys include $metadata.service, $metadata.origin, $metadata.trigger, $metadata.message, and $metadata.error.

[Link to this property](#)

<details>

<summary>

operation: "includes" or "not_includes" or "starts_with" or 27 more

Comparison operator. String operators: includes, not_includes, starts_with, ends_with, regex. Existence: exists, is_null. Set membership: in, not_in (comma-separated values). Numeric: eq, neq, gt, gte, lt, lte.

</summary>

One of the following:

"includes"

[Link to this property](#)

"not_includes"

[Link to this property](#)

"starts_with"

[Link to this property](#)

"ends_with"

[Link to this property](#)

"regex"

[Link to this property](#)

"exists"

[Link to this property](#)

"is_null"

[Link to this property](#)

"in"

[Link to this property](#)

"not_in"

[Link to this property](#)

"eq"

[Link to this property](#)

"neq"

[Link to this property](#)

"gt"

[Link to this property](#)

"gte"

[Link to this property](#)

"lt"

[Link to this property](#)

"lte"

[Link to this property](#)

"="

[Link to this property](#)

"!="

[Link to this property](#)

">"

[Link to this property](#)

">="

[Link to this property](#)

"<"

[Link to this property](#)

"<="

[Link to this property](#)

"INCLUDES"

[Link to this property](#)

"DOES_NOT_INCLUDE"

[Link to this property](#)

"MATCH_REGEX"

[Link to this property](#)

"EXISTS"

[Link to this property](#)

"DOES_NOT_EXIST"

[Link to this property](#)

"IN"

[Link to this property](#)

"NOT_IN"

[Link to this property](#)

"STARTS_WITH"

[Link to this property](#)

"ENDS_WITH"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

type: "string" or "number" or "boolean"

Data type of the filter field. Must match the actual type of the key being filtered.

</summary>

One of the following:

"string"

[Link to this property](#)

"number"

[Link to this property](#)

"boolean"

[Link to this property](#)

</details>

[Link to this property](#)

kind: optional "filter"

Discriminator for leaf filter nodes. Always ‘filter’ when present; may be omitted.

[Link to this property](#)

<details>

<summary>

value: optional string or number or boolean

Comparison value. Must match actual values in your data — verify with the values endpoint. Ensure the value type (string/number/boolean) matches the field type. String comparisons are case-sensitive. Regex uses RE2 syntax (no lookaheads/lookbehinds).

</summary>

One of the following:

string

[Link to this property](#)

number

[Link to this property](#)

boolean

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

groupBys: optional array of object { type, value }

Define how to group the results of the query.

</summary>

<details>

<summary>

type: "string" or "number" or "boolean"

</summary>

One of the following:

"string"

[Link to this property](#)

"number"

[Link to this property](#)

"boolean"

[Link to this property](#)

</details>

[Link to this property](#)

value: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

havings: optional array of object { key, operation, value }

Configure the Having clauses that filter on calculations in the query result.

</summary>

key: string

[Link to this property](#)

<details>

<summary>

operation: "eq" or "neq" or "gt" or 3 more

</summary>

One of the following:

"eq"

[Link to this property](#)

"neq"

[Link to this property](#)

"gt"

[Link to this property](#)

"gte"

[Link to this property](#)

"lt"

[Link to this property](#)

"lte"

[Link to this property](#)

</details>

[Link to this property](#)

value: number

[Link to this property](#)

</details>

[Link to this property](#)

limit: optional number

Set a limit on the number of results / records returned by the query

maximum100

minimum0

[Link to this property](#)

<details>

<summary>

needle: optional object { value, isRegex, matchCase }

Define an expression to search using full-text search.

</summary>

value:

[Link to this property](#)

isRegex: optional boolean

[Link to this property](#)

matchCase: optional boolean

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

orderBy: optional object { value, order }

Configure the order of the results returned by the query.

</summary>

value: string

Configure which Calculation to order the results by.

[Link to this property](#)

<details>

<summary>

order: optional "asc" or "desc"

Set the order of the results

</summary>

One of the following:

"asc"

[Link to this property](#)

"desc"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

updated: string or string

formatdate-time

</summary>

One of the following:

string

[Link to this property](#)

string

[Link to this property](#)

</details>

[Link to this property](#)

updatedBy: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

status: "STARTED" or "COMPLETED"

Current execution status of the query run.

</summary>

One of the following:

"STARTED"

[Link to this property](#)

"COMPLETED"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

timeframe: object { from, to }

Time range for the query execution. ‘from’ must be earlier than ‘to’. No fractional milliseconds.

</summary>

from: number

Start timestamp for the query timeframe. Unix timestamp in milliseconds

maximum253402300799999

minimum0

[Link to this property](#)

to: number

End timestamp for the query timeframe. Unix timestamp in milliseconds

maximum253402300799999

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

userId: string

ID of the user who initiated the query run.

[Link to this property](#)

created: optional string

ISO-8601 timestamp when the query run was created.

[Link to this property](#)

<details>

<summary>

statistics: optional object { bytes_read, elapsed, rows_read, abr_level }

Query performance statistics from the database (does not include network latency).

</summary>

bytes_read: number

Number of uncompressed bytes read from the table.

[Link to this property](#)

elapsed: number

Time in seconds for the query to run.

[Link to this property](#)

rows_read: number

Number of rows scanned from the table.

[Link to this property](#)

abr_level: optional number

The level of Adaptive Bit Rate (ABR) sampling used for the query. If empty the ABR level is 1

[Link to this property](#)

</details>

[Link to this property](#)

updated: optional string

ISO-8601 timestamp when the query run was last updated.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

statistics: object { bytes_read, elapsed, rows_read, abr_level }

Query performance statistics from the database. Includes execution time, rows scanned, and bytes read. Does not include network latency.

</summary>

bytes_read: number

Number of uncompressed bytes read from the table.

[Link to this property](#)

elapsed: number

Time in seconds for the query to run.

[Link to this property](#)

rows_read: number

Number of rows scanned from the table.

[Link to this property](#)

abr_level: optional number

The level of Adaptive Bit Rate (ABR) sampling used for the query. If empty the ABR level is 1

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

agents: optional array of object { id, errors, models, 13 more }

Agent run summaries. Present when the query view is ‘agents’. Each entry represents one trace containing at least one agent invocation.

</summary>

id: string

Stable pagination cursor for this agent run.

[Link to this property](#)

errors: array of string

Distinct errors reported by spans in the run.

[Link to this property](#)

models: array of string

Distinct models reported by chat spans across the run’s trace.

[Link to this property](#)

providers: array of string

Distinct GenAI providers reported by chat spans in the run.

[Link to this property](#)

services: array of string

Worker services represented in the run’s trace.

[Link to this property](#)

spans: number

Number of spans in the run’s trace.

[Link to this property](#)

<details>

<summary>

status: "completed" or "error"

Observed run status.

</summary>

One of the following:

"completed"

[Link to this property](#)

"error"

[Link to this property](#)

</details>

[Link to this property](#)

traceDurationMs: number

Total trace duration in milliseconds.

[Link to this property](#)

traceEndMs: number

End of the run’s trace as a Unix epoch in milliseconds.

[Link to this property](#)

traceId: string

Trace identifier for this agent run.

[Link to this property](#)

traceStartMs: number

Start of the run’s trace as a Unix epoch in milliseconds.

[Link to this property](#)

agentId: optional string

ID from the earliest agent invocation that provides one.

[Link to this property](#)

agentName: optional string

Name from the earliest agent invocation that provides one.

[Link to this property](#)

conversationId: optional string

Conversation ID from the earliest invocation that provides one.

[Link to this property](#)

inputTokens: optional number

Input tokens summed across chat spans in the run’s trace; informational, not billing data.

[Link to this property](#)

outputTokens: optional number

Output tokens summed across chat spans in the run’s trace; informational, not billing data.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

calculations: optional array of object { aggregates, calculation, series, alias }

Aggregated calculation results. Present when the query view is ‘calculations’. Contains computed metrics (count, avg, p99, etc.) with optional group-by breakdowns and time-series data.

</summary>

<details>

<summary>

aggregates: array of object { count, interval, sampleInterval, 2 more }

</summary>

count: number

[Link to this property](#)

interval: number

[Link to this property](#)

sampleInterval: number

[Link to this property](#)

value: number

[Link to this property](#)

<details>

<summary>

groups: optional array of object { key, value }

</summary>

key: string

[Link to this property](#)

<details>

<summary>

value: string or number or boolean

</summary>

One of the following:

string

[Link to this property](#)

number

[Link to this property](#)

boolean

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

calculation: string

[Link to this property](#)

<details>

<summary>

series: array of object { data, time }

</summary>

<details>

<summary>

data: array of object { count, interval, sampleInterval, 4 more }

</summary>

count: number

[Link to this property](#)

interval: number

[Link to this property](#)

sampleInterval: number

[Link to this property](#)

value: number

[Link to this property](#)

firstSeen: optional string

[Link to this property](#)

<details>

<summary>

groups: optional array of object { key, value }

</summary>

key: string

[Link to this property](#)

<details>

<summary>

value: string or number or boolean

</summary>

One of the following:

string

[Link to this property](#)

number

[Link to this property](#)

boolean

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

lastSeen: optional string

[Link to this property](#)

</details>

[Link to this property](#)

time: string

[Link to this property](#)

</details>

[Link to this property](#)

alias: optional string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

compare: optional array of object { aggregates, calculation, series, alias }

Comparison calculation results from the previous time period. Present when the compare option is enabled. Same structure as calculations.

</summary>

<details>

<summary>

aggregates: array of object { count, interval, sampleInterval, 2 more }

</summary>

count: number

[Link to this property](#)

interval: number

[Link to this property](#)

sampleInterval: number

[Link to this property](#)

value: number

[Link to this property](#)

<details>

<summary>

groups: optional array of object { key, value }

</summary>

key: string

[Link to this property](#)

<details>

<summary>

value: string or number or boolean

</summary>

One of the following:

string

[Link to this property](#)

number

[Link to this property](#)

boolean

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

calculation: string

[Link to this property](#)

<details>

<summary>

series: array of object { data, time }

</summary>

<details>

<summary>

data: array of object { count, interval, sampleInterval, 4 more }

</summary>

count: number

[Link to this property](#)

interval: number

[Link to this property](#)

sampleInterval: number

[Link to this property](#)

value: number

[Link to this property](#)

firstSeen: optional string

[Link to this property](#)

<details>

<summary>

groups: optional array of object { key, value }

</summary>

key: string

[Link to this property](#)

<details>

<summary>

value: string or number or boolean

</summary>

One of the following:

string

[Link to this property](#)

number

[Link to this property](#)

boolean

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

lastSeen: optional string

[Link to this property](#)

</details>

[Link to this property](#)

time: string

[Link to this property](#)

</details>

[Link to this property](#)

alias: optional string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

distribution: optional object { bins, bucketBoundaries, bucketMode, 2 more }

Bucketed 2D histogram of a numeric field over time. Present when chartType is ‘distribution’.

</summary>

bins: array of string

Time-bucket labels (ISO-8601 strings), one per matrix column.

[Link to this property](#)

bucketBoundaries: array of number

Raw bucket edges in the value’s native unit, length buckets.length + 1. Used for the colour scale and percentile mapping.

[Link to this property](#)

<details>

<summary>

bucketMode: "log" or "linear"

Bucketing scheme used to derive the boundaries. ‘log’ produces geometric edges; ‘linear’ produces fixed-width edges.

</summary>

One of the following:

"log"

[Link to this property](#)

"linear"

[Link to this property](#)

</details>

[Link to this property](#)

buckets: array of string

Value-range labels, one per matrix row (e.g. ‘50–100ms’).

[Link to this property](#)

matrix: array of array of number

Sampling-corrected counts. matrix[bucketIdx][binIdx] is the estimated number of events in value-bucket ‘bucketIdx’ during time-bin ‘binIdx’.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

events: optional object { count, events, fields, series }

Individual event results. Present when the query view is ‘events’. Contains the matching log lines and their metadata.

</summary>

count: optional number

Total number of events matching the query (may exceed the number returned due to limits).

[Link to this property](#)

<details>

<summary>

events: optional array of object { "$metadata", dataset, source, 3 more }

List of individual telemetry events matching the query.

</summary>

<details>

<summary>

"$metadata": object { id, account, cloudService, 29 more }

Structured metadata extracted from the event. These fields are indexed and available for filtering and aggregation.

</summary>

id: string

Unique event ID. Use as the cursor value for offset-based pagination.

[Link to this property](#)

account: optional string

Cloudflare account identifier.

[Link to this property](#)

cloudService: optional string

Cloudflare product that generated this event (e.g. workers, pages).

[Link to this property](#)

coldStart: optional number

exclusiveMinimum

minimum0

[Link to this property](#)

cost: optional number

Estimated cost units for this invocation.

exclusiveMinimum

minimum0

[Link to this property](#)

duration: optional number

Span duration in milliseconds.

exclusiveMinimum

minimum0

[Link to this property](#)

endTime: optional number

Span end time as a Unix epoch in milliseconds.

minimum0

[Link to this property](#)

error: optional string

Error message, present when the log represents an error.

[Link to this property](#)

errorTemplate: optional string

Templatized version of the error message used for grouping similar errors.

[Link to this property](#)

fingerprint: optional string

Content-based fingerprint used to group similar events.

[Link to this property](#)

level: optional string

Log level (e.g. log, debug, info, warn, error).

[Link to this property](#)

message: optional string

Log message text.

[Link to this property](#)

messageTemplate: optional string

Templatized version of the log message used for grouping similar messages.

[Link to this property](#)

metricName: optional string

Metric name when the event represents a metric data point.

[Link to this property](#)

origin: optional string

Origin of the event (e.g. fetch, scheduled, queue).

[Link to this property](#)

parentSpanId: optional string

Span ID of the parent span in the trace hierarchy.

[Link to this property](#)

provider: optional string

Infrastructure provider identifier.

[Link to this property](#)

rayId: optional string

Cloudflare Ray ID from the `cf-ray` header of the request that triggered the invocation.

[Link to this property](#)

region: optional string

Cloudflare data center / region that handled the request.

[Link to this property](#)

requestId: optional string

Cloudflare request ID that ties all logs from a single invocation together.

[Link to this property](#)

service: optional string

Worker script name that produced this event.

[Link to this property](#)

spanId: optional string

Span ID for this individual unit of work within a trace.

[Link to this property](#)

spanName: optional string

Human-readable name for this span.

[Link to this property](#)

stackId: optional string

Stack / deployment identifier.

[Link to this property](#)

startTime: optional number

Span start time as a Unix epoch in milliseconds.

minimum0

[Link to this property](#)

statusCode: optional number

HTTP response status code returned by the Worker.

exclusiveMinimum

minimum0

[Link to this property](#)

traceDuration: optional number

Total duration of the entire trace in milliseconds.

exclusiveMinimum

minimum0

[Link to this property](#)

traceId: optional string

Distributed trace ID linking spans across services.

[Link to this property](#)

transactionName: optional string

Logical transaction name for this request.

[Link to this property](#)

trigger: optional string

What triggered the invocation (e.g. GET /users, POST /orders, queue message).

[Link to this property](#)

type: optional string

Event type classifier (e.g. cf-worker-event, cf-worker-log).

[Link to this property](#)

url: optional string

Request URL that triggered the Worker invocation.

[Link to this property](#)

</details>

[Link to this property](#)

dataset: string

The dataset this event belongs to (e.g. cloudflare-workers).

[Link to this property](#)

<details>

<summary>

source: string or map[unknown]

Raw log payload. May be a string or a structured object depending on how the log was emitted.

</summary>

One of the following:

string

[Link to this property](#)

map[unknown]

[Link to this property](#)

</details>

[Link to this property](#)

timestamp: number

Event timestamp as a Unix epoch in milliseconds.

minimum0

[Link to this property](#)

"$containers": optional map[unknown]

Cloudflare Containers event information that enriches your logs for identifying and debugging issues.

[Link to this property](#)

<details>

<summary>

"$workers": optional object { eventType, requestId, scriptName, 10 more } or object { cpuTimeMs, eventType, outcome, 14 more }

Cloudflare Workers event information that enriches your logs for identifying and debugging issues.

</summary>

One of the following:

<details>

<summary>

object { eventType, requestId, scriptName, 10 more }

</summary>

<details>

<summary>

eventType: "fetch" or "scheduled" or "alarm" or 9 more

</summary>

One of the following:

"fetch"

[Link to this property](#)

"scheduled"

[Link to this property](#)

"alarm"

[Link to this property](#)

"cron"

[Link to this property](#)

"queue"

[Link to this property](#)

"email"

[Link to this property](#)

"tail"

[Link to this property](#)

"rpc"

[Link to this property](#)

"jsrpc"

[Link to this property](#)

"websocket"

[Link to this property](#)

"workflow"

[Link to this property](#)

"unknown"

[Link to this property](#)

</details>

[Link to this property](#)

requestId: string

[Link to this property](#)

scriptName: string

[Link to this property](#)

durableObjectId: optional string

[Link to this property](#)

entrypoint: optional string

[Link to this property](#)

event: optional map[unknown]

[Link to this property](#)

<details>

<summary>

executionModel: optional "durableObject" or "stateless"

</summary>

One of the following:

"durableObject"

[Link to this property](#)

"stateless"

[Link to this property](#)

</details>

[Link to this property](#)

outcome: optional string

[Link to this property](#)

<details>

<summary>

preview: optional object { id, name, slug }

</summary>

id: optional string

[Link to this property](#)

name: optional string

[Link to this property](#)

slug: optional string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

scriptVersion: optional object { id, message, tag }

</summary>

id: optional string

[Link to this property](#)

message: optional string

[Link to this property](#)

tag: optional string

[Link to this property](#)

</details>

[Link to this property](#)

spanId: optional string

[Link to this property](#)

traceId: optional string

[Link to this property](#)

truncated: optional boolean

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

object { cpuTimeMs, eventType, outcome, 14 more }

</summary>

cpuTimeMs: number

[Link to this property](#)

<details>

<summary>

eventType: "fetch" or "scheduled" or "alarm" or 9 more

</summary>

One of the following:

"fetch"

[Link to this property](#)

"scheduled"

[Link to this property](#)

"alarm"

[Link to this property](#)

"cron"

[Link to this property](#)

"queue"

[Link to this property](#)

"email"

[Link to this property](#)

"tail"

[Link to this property](#)

"rpc"

[Link to this property](#)

"jsrpc"

[Link to this property](#)

"websocket"

[Link to this property](#)

"workflow"

[Link to this property](#)

"unknown"

[Link to this property](#)

</details>

[Link to this property](#)

outcome: string

[Link to this property](#)

requestId: string

[Link to this property](#)

scriptName: string

[Link to this property](#)

wallTimeMs: number

[Link to this property](#)

<details>

<summary>

diagnosticsChannelEvents: optional array of object { channel, message, timestamp }

</summary>

channel: string

[Link to this property](#)

message: string

[Link to this property](#)

timestamp: number

[Link to this property](#)

</details>

[Link to this property](#)

dispatchNamespace: optional string

[Link to this property](#)

durableObjectId: optional string

[Link to this property](#)

entrypoint: optional string

[Link to this property](#)

event: optional map[unknown]

[Link to this property](#)

<details>

<summary>

executionModel: optional "durableObject" or "stateless"

</summary>

One of the following:

"durableObject"

[Link to this property](#)

"stateless"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

preview: optional object { id, name, slug }

</summary>

id: optional string

[Link to this property](#)

name: optional string

[Link to this property](#)

slug: optional string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

scriptVersion: optional object { id, message, tag }

</summary>

id: optional string

[Link to this property](#)

message: optional string

[Link to this property](#)

tag: optional string

[Link to this property](#)

</details>

[Link to this property](#)

spanId: optional string

[Link to this property](#)

traceId: optional string

[Link to this property](#)

truncated: optional boolean

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

fields: optional array of object { key, type }

List of fields discovered in the matched events. Useful for building dynamic UIs.

</summary>

key: string

Field name present in the matched events.

[Link to this property](#)

type: string

Data type of the field (string, number, or boolean).

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

series: optional array of object { data, time }

Time-series data for the matched events, bucketed by the query granularity.

</summary>

<details>

<summary>

data: array of object { aggregates, count, interval, 3 more }

</summary>

<details>

<summary>

aggregates: object { _count, _interval, _firstSeen, 2 more }

</summary>

Deprecated_count: number

exclusiveMinimum

minimum0

[Link to this property](#)

Deprecated_interval: number

exclusiveMinimum

minimum0

[Link to this property](#)

Deprecated_firstSeen: optional string

[Link to this property](#)

Deprecated_lastSeen: optional string

[Link to this property](#)

Deprecatedbin: optional unknown

[Link to this property](#)

</details>

[Link to this property](#)

count: number

[Link to this property](#)

interval: number

[Link to this property](#)

sampleInterval: number

[Link to this property](#)

errors: optional number

[Link to this property](#)

<details>

<summary>

groups: optional map[string or number or boolean]

Groups in the query results.

</summary>

One of the following:

string

[Link to this property](#)

number

[Link to this property](#)

boolean

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

time: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

invocations: optional map[array of object { "$metadata", dataset, source, 3 more } ]

Events grouped by invocation (request ID). Present when the query view is ‘invocations’. Each key is a request ID mapping to all events from that invocation.

</summary>

<details>

<summary>

"$metadata": object { id, account, cloudService, 29 more }

Structured metadata extracted from the event. These fields are indexed and available for filtering and aggregation.

</summary>

id: string

Unique event ID. Use as the cursor value for offset-based pagination.

[Link to this property](#)

account: optional string

Cloudflare account identifier.

[Link to this property](#)

cloudService: optional string

Cloudflare product that generated this event (e.g. workers, pages).

[Link to this property](#)

coldStart: optional number

exclusiveMinimum

minimum0

[Link to this property](#)

cost: optional number

Estimated cost units for this invocation.

exclusiveMinimum

minimum0

[Link to this property](#)

duration: optional number

Span duration in milliseconds.

exclusiveMinimum

minimum0

[Link to this property](#)

endTime: optional number

Span end time as a Unix epoch in milliseconds.

minimum0

[Link to this property](#)

error: optional string

Error message, present when the log represents an error.

[Link to this property](#)

errorTemplate: optional string

Templatized version of the error message used for grouping similar errors.

[Link to this property](#)

fingerprint: optional string

Content-based fingerprint used to group similar events.

[Link to this property](#)

level: optional string

Log level (e.g. log, debug, info, warn, error).

[Link to this property](#)

message: optional string

Log message text.

[Link to this property](#)

messageTemplate: optional string

Templatized version of the log message used for grouping similar messages.

[Link to this property](#)

metricName: optional string

Metric name when the event represents a metric data point.

[Link to this property](#)

origin: optional string

Origin of the event (e.g. fetch, scheduled, queue).

[Link to this property](#)

parentSpanId: optional string

Span ID of the parent span in the trace hierarchy.

[Link to this property](#)

provider: optional string

Infrastructure provider identifier.

[Link to this property](#)

rayId: optional string

Cloudflare Ray ID from the `cf-ray` header of the request that triggered the invocation.

[Link to this property](#)

region: optional string

Cloudflare data center / region that handled the request.

[Link to this property](#)

requestId: optional string

Cloudflare request ID that ties all logs from a single invocation together.

[Link to this property](#)

service: optional string

Worker script name that produced this event.

[Link to this property](#)

spanId: optional string

Span ID for this individual unit of work within a trace.

[Link to this property](#)

spanName: optional string

Human-readable name for this span.

[Link to this property](#)

stackId: optional string

Stack / deployment identifier.

[Link to this property](#)

startTime: optional number

Span start time as a Unix epoch in milliseconds.

minimum0

[Link to this property](#)

statusCode: optional number

HTTP response status code returned by the Worker.

exclusiveMinimum

minimum0

[Link to this property](#)

traceDuration: optional number

Total duration of the entire trace in milliseconds.

exclusiveMinimum

minimum0

[Link to this property](#)

traceId: optional string

Distributed trace ID linking spans across services.

[Link to this property](#)

transactionName: optional string

Logical transaction name for this request.

[Link to this property](#)

trigger: optional string

What triggered the invocation (e.g. GET /users, POST /orders, queue message).

[Link to this property](#)

type: optional string

Event type classifier (e.g. cf-worker-event, cf-worker-log).

[Link to this property](#)

url: optional string

Request URL that triggered the Worker invocation.

[Link to this property](#)

</details>

[Link to this property](#)

dataset: string

The dataset this event belongs to (e.g. cloudflare-workers).

[Link to this property](#)

<details>

<summary>

source: string or map[unknown]

Raw log payload. May be a string or a structured object depending on how the log was emitted.

</summary>

One of the following:

string

[Link to this property](#)

map[unknown]

[Link to this property](#)

</details>

[Link to this property](#)

timestamp: number

Event timestamp as a Unix epoch in milliseconds.

minimum0

[Link to this property](#)

"$containers": optional map[unknown]

Cloudflare Containers event information that enriches your logs for identifying and debugging issues.

[Link to this property](#)

<details>

<summary>

"$workers": optional object { eventType, requestId, scriptName, 10 more } or object { cpuTimeMs, eventType, outcome, 14 more }

Cloudflare Workers event information that enriches your logs for identifying and debugging issues.

</summary>

One of the following:

<details>

<summary>

object { eventType, requestId, scriptName, 10 more }

</summary>

<details>

<summary>

eventType: "fetch" or "scheduled" or "alarm" or 9 more

</summary>

One of the following:

"fetch"

[Link to this property](#)

"scheduled"

[Link to this property](#)

"alarm"

[Link to this property](#)

"cron"

[Link to this property](#)

"queue"

[Link to this property](#)

"email"

[Link to this property](#)

"tail"

[Link to this property](#)

"rpc"

[Link to this property](#)

"jsrpc"

[Link to this property](#)

"websocket"

[Link to this property](#)

"workflow"

[Link to this property](#)

"unknown"

[Link to this property](#)

</details>

[Link to this property](#)

requestId: string

[Link to this property](#)

scriptName: string

[Link to this property](#)

durableObjectId: optional string

[Link to this property](#)

entrypoint: optional string

[Link to this property](#)

event: optional map[unknown]

[Link to this property](#)

<details>

<summary>

executionModel: optional "durableObject" or "stateless"

</summary>

One of the following:

"durableObject"

[Link to this property](#)

"stateless"

[Link to this property](#)

</details>

[Link to this property](#)

outcome: optional string

[Link to this property](#)

<details>

<summary>

preview: optional object { id, name, slug }

</summary>

id: optional string

[Link to this property](#)

name: optional string

[Link to this property](#)

slug: optional string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

scriptVersion: optional object { id, message, tag }

</summary>

id: optional string

[Link to this property](#)

message: optional string

[Link to this property](#)

tag: optional string

[Link to this property](#)

</details>

[Link to this property](#)

spanId: optional string

[Link to this property](#)

traceId: optional string

[Link to this property](#)

truncated: optional boolean

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

object { cpuTimeMs, eventType, outcome, 14 more }

</summary>

cpuTimeMs: number

[Link to this property](#)

<details>

<summary>

eventType: "fetch" or "scheduled" or "alarm" or 9 more

</summary>

One of the following:

"fetch"

[Link to this property](#)

"scheduled"

[Link to this property](#)

"alarm"

[Link to this property](#)

"cron"

[Link to this property](#)

"queue"

[Link to this property](#)

"email"

[Link to this property](#)

"tail"

[Link to this property](#)

"rpc"

[Link to this property](#)

"jsrpc"

[Link to this property](#)

"websocket"

[Link to this property](#)

"workflow"

[Link to this property](#)

"unknown"

[Link to this property](#)

</details>

[Link to this property](#)

outcome: string

[Link to this property](#)

requestId: string

[Link to this property](#)

scriptName: string

[Link to this property](#)

wallTimeMs: number

[Link to this property](#)

<details>

<summary>

diagnosticsChannelEvents: optional array of object { channel, message, timestamp }

</summary>

channel: string

[Link to this property](#)

message: string

[Link to this property](#)

timestamp: number

[Link to this property](#)

</details>

[Link to this property](#)

dispatchNamespace: optional string

[Link to this property](#)

durableObjectId: optional string

[Link to this property](#)

entrypoint: optional string

[Link to this property](#)

event: optional map[unknown]

[Link to this property](#)

<details>

<summary>

executionModel: optional "durableObject" or "stateless"

</summary>

One of the following:

"durableObject"

[Link to this property](#)

"stateless"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

preview: optional object { id, name, slug }

</summary>

id: optional string

[Link to this property](#)

name: optional string

[Link to this property](#)

slug: optional string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

scriptVersion: optional object { id, message, tag }

</summary>

id: optional string

[Link to this property](#)

message: optional string

[Link to this property](#)

tag: optional string

[Link to this property](#)

</details>

[Link to this property](#)

spanId: optional string

[Link to this property](#)

traceId: optional string

[Link to this property](#)

truncated: optional boolean

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

traces: optional array of object { rootSpanName, rootTransactionName, service, 6 more }

Trace summaries matching the query. Present when the query view is ‘traces’. Each entry represents a distributed trace with its spans, duration, and services involved.

</summary>

rootSpanName: string

Name of the root span that initiated the trace.

[Link to this property](#)

rootTransactionName: string

Logical transaction name for the root span.

[Link to this property](#)

service: array of string

List of Worker services involved in the trace.

[Link to this property](#)

spans: number

Total number of spans in the trace.

[Link to this property](#)

traceDurationMs: number

Total duration of the trace in milliseconds.

[Link to this property](#)

traceEndMs: number

Trace end time as a Unix epoch in milliseconds.

[Link to this property](#)

traceId: string

Unique identifier for the distributed trace.

[Link to this property](#)

traceStartMs: number

Trace start time as a Unix epoch in milliseconds.

[Link to this property](#)

errors: optional array of string

Error messages encountered during the trace, if any.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)
