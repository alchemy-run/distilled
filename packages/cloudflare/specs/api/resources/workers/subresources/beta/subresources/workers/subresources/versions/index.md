---
title: Versions
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Workers](https://developers.cloudflare.com/api/resources/workers)

[Beta](https://developers.cloudflare.com/api/resources/workers/subresources/beta)

[Workers](https://developers.cloudflare.com/api/resources/workers/subresources/beta/subresources/workers)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Versions

##### [List Versions](https://developers.cloudflare.com/api/resources/workers/subresources/beta/subresources/workers/subresources/versions/methods/list)

GET/accounts/{account\_id}/workers/workers/{worker\_id}/versions

##### [Get Version](https://developers.cloudflare.com/api/resources/workers/subresources/beta/subresources/workers/subresources/versions/methods/get)

GET/accounts/{account\_id}/workers/workers/{worker\_id}/versions/{version\_id}

##### [Create Version](https://developers.cloudflare.com/api/resources/workers/subresources/beta/subresources/workers/subresources/versions/methods/create)

POST/accounts/{account\_id}/workers/workers/{worker\_id}/versions

##### [Delete Version](https://developers.cloudflare.com/api/resources/workers/subresources/beta/subresources/workers/subresources/versions/methods/delete)

DELETE/accounts/{account\_id}/workers/workers/{worker\_id}/versions/{version\_id}

##### ModelsExpand Collapse

<details>

<summary>

Version object {id, created\_on, number, 22 more }

</summary>

id: string

Version identifier.

formatuuid

<a href="#">Link to this property</a>

created\_on: string

When the version was created.

formatdate-time

<a href="#">Link to this property</a>

number: number

The integer version number, starting from one.

<a href="#">Link to this property</a>

urls: array of string

All routable URLs that always point to this version. Does not include alias URLs, since aliases can be updated to point to a different version.

<a href="#">Link to this property</a>

<details>

<summary>

annotations: optional object {"workers/message", "workers/tag", "workers/triggered\_by" }

Metadata about the version.

</summary>

"workers/message": optional string

Human-readable message about the version. Truncated to 1000 bytes if longer.

maxLength1000

<a href="#">Link to this property</a>

"workers/tag": optional string

User-provided identifier for the version. Maximum 100 bytes.

maxLength100

<a href="#">Link to this property</a>

"workers/triggered\_by": optional string

Operation that triggered the creation of the version.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

assets: optional object {config, jwt }

Configuration for assets within a Worker.

<a href="https://developers.cloudflare.com/workers/static-assets/headers/#custom-headers"><code>_headers</code></a> and <a href="https://developers.cloudflare.com/workers/static-assets/redirects/"><code>_redirects</code></a> files should be included as modules named <code>_headers</code> and <code>_redirects</code> with content type <code>text/plain</code>.

</summary>

<details>

<summary>

config: optional object {html\_handling, not\_found\_handling, run\_worker\_first }

Configuration for assets within a Worker.

</summary>

<details>

<summary>

html\_handling: optional "auto-trailing-slash"or "force-trailing-slash"or "drop-trailing-slash"or "none"

Determines the redirects and rewrites of requests for HTML content.

</summary>

One of the following:

"auto-trailing-slash"

<a href="#">Link to this property</a>

"force-trailing-slash"

<a href="#">Link to this property</a>

"drop-trailing-slash"

<a href="#">Link to this property</a>

"none"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

not\_found\_handling: optional "none"or "404-page"or "single-page-application"

Determines the response when a request does not match a static asset, and there is no Worker script.

</summary>

One of the following:

"none"

<a href="#">Link to this property</a>

"404-page"

<a href="#">Link to this property</a>

"single-page-application"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

run\_worker\_first: optional array of stringor boolean

Contains a list path rules to control routing to either the Worker or assets. Glob (\*) and negative (!) rules are supported. Rules must start with either ’/’ or ’!/’. At least one non-negative rule must be provided, and negative rules have higher precedence than non-negative rules.

</summary>

One of the following:

array of string

Contains a list path rules to control routing to either the Worker or assets. Glob (\*) and negative (!) rules are supported. Rules must start with either ’/’ or ’!/’. At least one non-negative rule must be provided, and negative rules have higher precedence than non-negative rules.

<a href="#">Link to this property</a>

boolean

Enables routing to always invoke the Worker script ahead of all requests. When true, this is equivalent to <code>["/*"]</code> in the string array version of this field.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

jwt: optional string

Token provided upon successful upload of all files from a registered manifest.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

author\_email: optional string

Email of the user who created the version.

formatemail

<a href="#">Link to this property</a>

author\_id: optional string

Identifier of the user who created the version.

<a href="#">Link to this property</a>

<details>

<summary>

bindings: optional array of object {name, type } or object {instance\_name, name, type, namespace } or object {name, namespace, type } or 33 more

List of bindings attached to a Worker. You can find more about bindings on our docs: <a href="https://developers.cloudflare.com/workers/configuration/multipart-upload-metadata/#bindings">https://developers.cloudflare.com/workers/configuration/multipart-upload-metadata/#bindings</a>.

</summary>

One of the following:

<details>

<summary>

AI object {name, type }

</summary>

name: string

A JavaScript variable name for the binding.

<a href="#">Link to this property</a>

type: "ai"

The kind of resource that the binding provides.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AISearch object {instance\_name, name, type, namespace }

</summary>

instance\_name: string

The user-chosen instance name. Must exist at deploy time. The worker can search, chat, update, and manage items/jobs on this instance.

<a href="#">Link to this property</a>

name: string

A JavaScript variable name for the binding.

<a href="#">Link to this property</a>

type: "ai\_search"

The kind of resource that the binding provides.

<a href="#">Link to this property</a>

namespace: optional string

The namespace the instance belongs to. Defaults to “default” if omitted. Customers who don’t use namespaces can simply omit this field.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AISearchNamespace object {name, namespace, type }

</summary>

name: string

A JavaScript variable name for the binding.

<a href="#">Link to this property</a>

namespace: string

The user-chosen namespace name. Must exist before deploy — Wrangler handles auto-creation on deploy failure (R2 bucket pattern). The “default” namespace is auto-created by config-api for new accounts. Grants full access (CRUD + search + chat) to all instances within the namespace.

<a href="#">Link to this property</a>

type: "ai\_search\_namespace"

The kind of resource that the binding provides.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Messaging object {name, namespace, type }

</summary>

name: string

A JavaScript variable name for the binding.

<a href="#">Link to this property</a>

namespace: string

The Messaging namespace to bind to.

<a href="#">Link to this property</a>

type: "messaging"

The kind of resource that the binding provides.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AnalyticsEngine object {dataset, name, type }

</summary>

dataset: string

The name of the dataset to bind to.

<a href="#">Link to this property</a>

name: string

A JavaScript variable name for the binding.

<a href="#">Link to this property</a>

type: "analytics\_engine"

The kind of resource that the binding provides.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Assets object {name, type }

</summary>

name: string

A JavaScript variable name for the binding.

<a href="#">Link to this property</a>

type: "assets"

The kind of resource that the binding provides.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Browser object {name, type }

</summary>

name: string

A JavaScript variable name for the binding.

<a href="#">Link to this property</a>

type: "browser"

The kind of resource that the binding provides.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

D1 object {database\_id, name, type, id }

</summary>

database\_id: string

Identifier of the D1 database to bind to.

<a href="#">Link to this property</a>

name: string

A JavaScript variable name for the binding.

<a href="#">Link to this property</a>

type: "d1"

The kind of resource that the binding provides.

<a href="#">Link to this property</a>

Deprecatedid: optional string

This property has been renamed to <code>database_id</code>.

Identifier of the D1 database to bind to.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

DataBlob object {name, part, type }

</summary>

name: string

A JavaScript variable name for the binding.

<a href="#">Link to this property</a>

part: string

The name of the file containing the data content. Only accepted for <code>service worker syntax</code> Workers.

<a href="#">Link to this property</a>

Deprecatedtype: "data\_blob"

The kind of resource that the binding provides.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

DispatchNamespace object {name, namespace, type, outbound }

</summary>

name: string

A JavaScript variable name for the binding.

<a href="#">Link to this property</a>

namespace: string

The name of the dispatch namespace.

<a href="#">Link to this property</a>

type: "dispatch\_namespace"

The kind of resource that the binding provides.

<a href="#">Link to this property</a>

<details>

<summary>

outbound: optional object {params, worker }

Outbound worker.

</summary>

<details>

<summary>

params: optional array of object {name }

Pass information from the Dispatch Worker to the Outbound Worker through the parameters.

</summary>

name: string

Name of the parameter.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

worker: optional object {entrypoint, environment, service }

Outbound worker.

</summary>

entrypoint: optional string

Entrypoint to invoke on the outbound worker.

<a href="#">Link to this property</a>

environment: optional string

Environment of the outbound worker.

<a href="#">Link to this property</a>

service: optional string

Name of the outbound worker.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

DurableObjectNamespace object {name, type, class\_name, 4 more }

</summary>

name: string

A JavaScript variable name for the binding.

<a href="#">Link to this property</a>

type: "durable\_object\_namespace"

The kind of resource that the binding provides.

<a href="#">Link to this property</a>

class\_name: optional string

The exported class name of the Durable Object.

<a href="#">Link to this property</a>

dispatch\_namespace: optional string

The dispatch namespace the Durable Object script belongs to.

<a href="#">Link to this property</a>

environment: optional string

The environment of the script\_name to bind to.

<a href="#">Link to this property</a>

namespace\_id: optional string

Namespace identifier tag.

maxLength32

<a href="#">Link to this property</a>

script\_name: optional string

The script where the Durable Object is defined, if it is external to this Worker.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Hyperdrive object {id, name, type }

</summary>

id: string

Identifier of the Hyperdrive connection to bind to.

<a href="#">Link to this property</a>

name: string

A JavaScript variable name for the binding.

<a href="#">Link to this property</a>

type: "hyperdrive"

The kind of resource that the binding provides.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Inherit object {name, type, old\_name, version\_id }

</summary>

name: string

The name of the inherited binding.

<a href="#">Link to this property</a>

type: "inherit"

The kind of resource that the binding provides.

<a href="#">Link to this property</a>

old\_name: optional string

The old name of the inherited binding. If set, the binding will be renamed from <code>old_name</code> to <code>name</code> in the new version. If not set, the binding will keep the same name between versions.

<a href="#">Link to this property</a>

version\_id: optional string

Identifier for the version to inherit the binding from, which can be the version ID or the literal “latest” to inherit from the latest version. Defaults to inheriting the binding from the latest version.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Images object {name, type }

</summary>

name: string

A JavaScript variable name for the binding.

<a href="#">Link to this property</a>

type: "images"

The kind of resource that the binding provides.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Json object {json, name, type }

</summary>

json: unknown

JSON data to use.

<a href="#">Link to this property</a>

name: string

A JavaScript variable name for the binding.

<a href="#">Link to this property</a>

type: "json"

The kind of resource that the binding provides.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

KVNamespace object {name, namespace\_id, type }

</summary>

name: string

A JavaScript variable name for the binding.

<a href="#">Link to this property</a>

namespace\_id: string

Namespace identifier tag.

maxLength32

<a href="#">Link to this property</a>

type: "kv\_namespace"

The kind of resource that the binding provides.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Media object {name, type }

</summary>

name: string

A JavaScript variable name for the binding.

<a href="#">Link to this property</a>

type: "media"

The kind of resource that the binding provides.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

MTLSCertificate object {certificate\_id, name, type }

</summary>

certificate\_id: string

Identifier of the certificate to bind to.

<a href="#">Link to this property</a>

name: string

A JavaScript variable name for the binding.

<a href="#">Link to this property</a>

type: "mtls\_certificate"

The kind of resource that the binding provides.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

PlainText object {name, text, type }

</summary>

name: string

A JavaScript variable name for the binding.

<a href="#">Link to this property</a>

text: string

The text value to use.

<a href="#">Link to this property</a>

type: "plain\_text"

The kind of resource that the binding provides.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Pipelines object {name, pipeline, type }

</summary>

name: string

A JavaScript variable name for the binding.

<a href="#">Link to this property</a>

pipeline: string

Name of the Pipeline to bind to.

<a href="#">Link to this property</a>

type: "pipelines"

The kind of resource that the binding provides.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Queue object {name, queue\_name, type }

</summary>

name: string

A JavaScript variable name for the binding.

<a href="#">Link to this property</a>

queue\_name: string

Name of the Queue to bind to.

<a href="#">Link to this property</a>

type: "queue"

The kind of resource that the binding provides.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Ratelimit object {name, namespace\_id, simple, type }

</summary>

name: string

A JavaScript variable name for the binding.

<a href="#">Link to this property</a>

namespace\_id: string

Identifier of the rate limit namespace to bind to.

<a href="#">Link to this property</a>

<details>

<summary>

simple: object {limit, period, mitigation\_timeout }

The rate limit configuration.

</summary>

limit: number

The limit (requests per period).

<a href="#">Link to this property</a>

period: number

The period in seconds.

<a href="#">Link to this property</a>

mitigation\_timeout: optional number

Duration in seconds to apply the mitigation action after the rate limit is exceeded. Valid values are 0 (disabled), 10, or multiples of 60 up to 86400. Must be greater than or equal to the period when non-zero.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: "ratelimit"

The kind of resource that the binding provides.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

R2Bucket object {bucket\_name, name, type, jurisdiction }

</summary>

bucket\_name: string

R2 bucket to bind to.

<a href="#">Link to this property</a>

name: string

A JavaScript variable name for the binding.

<a href="#">Link to this property</a>

type: "r2\_bucket"

The kind of resource that the binding provides.

<a href="#">Link to this property</a>

<details>

<summary>

jurisdiction: optional "eu"or "fedramp"or "fedramp-high"or "us"

The <a href="https://developers.cloudflare.com/r2/reference/data-location/#jurisdictional-restrictions">jurisdiction</a> of the R2 bucket.

</summary>

One of the following:

"eu"

<a href="#">Link to this property</a>

"fedramp"

<a href="#">Link to this property</a>

"fedramp-high"

<a href="#">Link to this property</a>

"us"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

SecretText object {name, text, type }

</summary>

name: string

A JavaScript variable name for the binding.

<a href="#">Link to this property</a>

text: string

The secret value to use.

<a href="#">Link to this property</a>

type: "secret\_text"

The kind of resource that the binding provides.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

SendEmail object {name, type, allowed\_destination\_addresses, 2 more }

</summary>

name: string

A JavaScript variable name for the binding.

<a href="#">Link to this property</a>

type: "send\_email"

The kind of resource that the binding provides.

<a href="#">Link to this property</a>

allowed\_destination\_addresses: optional array of string

List of allowed destination addresses.

<a href="#">Link to this property</a>

allowed\_sender\_addresses: optional array of string

List of allowed sender addresses.

<a href="#">Link to this property</a>

destination\_address: optional string

Destination address for the email.

formatemail

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Service object {name, service, type, 2 more }

</summary>

name: string

A JavaScript variable name for the binding.

<a href="#">Link to this property</a>

service: string

Name of Worker to bind to.

<a href="#">Link to this property</a>

type: "service"

The kind of resource that the binding provides.

<a href="#">Link to this property</a>

entrypoint: optional string

Entrypoint to invoke on the target Worker.

<a href="#">Link to this property</a>

environment: optional string

Optional environment if the Worker utilizes one.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

TextBlob object {name, part, type }

</summary>

name: string

A JavaScript variable name for the binding.

<a href="#">Link to this property</a>

part: string

The name of the file containing the text content. Only accepted for <code>service worker syntax</code> Workers.

<a href="#">Link to this property</a>

Deprecatedtype: "text\_blob"

The kind of resource that the binding provides.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Vectorize object {index\_name, name, type }

</summary>

index\_name: string

Name of the Vectorize index to bind to.

<a href="#">Link to this property</a>

name: string

A JavaScript variable name for the binding.

<a href="#">Link to this property</a>

type: "vectorize"

The kind of resource that the binding provides.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

VersionMetadata object {name, type }

</summary>

name: string

A JavaScript variable name for the binding.

<a href="#">Link to this property</a>

type: "version\_metadata"

The kind of resource that the binding provides.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

SecretsStoreSecret object {name, secret\_name, store\_id, type }

</summary>

name: string

A JavaScript variable name for the binding.

<a href="#">Link to this property</a>

secret\_name: string

Name of the secret in the store.

<a href="#">Link to this property</a>

store\_id: string

ID of the store containing the secret.

<a href="#">Link to this property</a>

type: "secrets\_store\_secret"

The kind of resource that the binding provides.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Flagship object {app\_id, name, type }

</summary>

app\_id: string

ID of the Flagship app to bind to for feature flag evaluation.

maxLength128

<a href="#">Link to this property</a>

name: string

A JavaScript variable name for the binding.

<a href="#">Link to this property</a>

type: "flagship"

The kind of resource that the binding provides.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

SecretKey object {algorithm, format, name, 4 more }

</summary>

algorithm: unknown

Algorithm-specific key parameters. <a href="https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#algorithm">Learn more</a>.

<a href="#">Link to this property</a>

<details>

<summary>

format: "raw"or "pkcs8"or "spki"or "jwk"

Data format of the key. <a href="https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#format">Learn more</a>.

</summary>

One of the following:

"raw"

<a href="#">Link to this property</a>

"pkcs8"

<a href="#">Link to this property</a>

"spki"

<a href="#">Link to this property</a>

"jwk"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

A JavaScript variable name for the binding.

<a href="#">Link to this property</a>

type: "secret\_key"

The kind of resource that the binding provides.

<a href="#">Link to this property</a>

<details>

<summary>

usages: array of "encrypt"or "decrypt"or "sign"or 5 more

Allowed operations with the key. <a href="https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#keyUsages">Learn more</a>.

</summary>

One of the following:

"encrypt"

<a href="#">Link to this property</a>

"decrypt"

<a href="#">Link to this property</a>

"sign"

<a href="#">Link to this property</a>

"verify"

<a href="#">Link to this property</a>

"deriveKey"

<a href="#">Link to this property</a>

"deriveBits"

<a href="#">Link to this property</a>

"wrapKey"

<a href="#">Link to this property</a>

"unwrapKey"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

key\_base64: optional string

Base64-encoded key data. Required if <code>format</code> is “raw”, “pkcs8”, or “spki”.

<a href="#">Link to this property</a>

key\_jwk: optional unknown

Key data in <a href="https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#json_web_key">JSON Web Key</a> format. Required if <code>format</code> is “jwk”.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Workflow object {name, type, workflow\_name, 2 more }

</summary>

name: string

A JavaScript variable name for the binding.

<a href="#">Link to this property</a>

type: "workflow"

The kind of resource that the binding provides.

<a href="#">Link to this property</a>

workflow\_name: string

Name of the Workflow to bind to.

<a href="#">Link to this property</a>

class\_name: optional string

Class name of the Workflow. Should only be provided if the Workflow belongs to this script.

<a href="#">Link to this property</a>

script\_name: optional string

Script name that contains the Workflow. If not provided, defaults to this script name.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

WasmModule object {name, part, type }

</summary>

name: string

A JavaScript variable name for the binding.

<a href="#">Link to this property</a>

part: string

The name of the file containing the WebAssembly module content. Only accepted for <code>service worker syntax</code> Workers.

<a href="#">Link to this property</a>

Deprecatedtype: "wasm\_module"

The kind of resource that the binding provides.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

VPCService object {name, service\_id, type }

</summary>

name: string

A JavaScript variable name for the binding.

<a href="#">Link to this property</a>

service\_id: string

Identifier of the VPC service to bind to.

<a href="#">Link to this property</a>

type: "vpc\_service"

The kind of resource that the binding provides.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

VPCNetwork object {name, type, identity, 2 more }

</summary>

name: string

A JavaScript variable name for the binding.

<a href="#">Link to this property</a>

type: "vpc\_network"

The kind of resource that the binding provides.

<a href="#">Link to this property</a>

identity: optional "runtime-email-alpha"

Enables Gateway identity for the binding. Requires network\_id to be “cf1:network” and cannot be combined with tunnel\_id.

<a href="#">Link to this property</a>

network\_id: optional string

Identifier of the network to bind to. Only “cf1:network” is currently supported. Mutually exclusive with tunnel\_id.

<a href="#">Link to this property</a>

tunnel\_id: optional string

UUID of the Cloudflare Tunnel to bind to. Mutually exclusive with network\_id.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

cache\_options: optional object {enabled, cross\_version\_cache }

Global CacheW configuration for the Worker. When caching is on, the platform provisions a <code>cloudflare.app</code> zone for the Worker. A <code>type: worker</code> entry in the <code>exports</code> map can override this value for a single entrypoint.

</summary>

enabled: boolean

Whether caching is enabled for this Worker.

<a href="#">Link to this property</a>

cross\_version\_cache: optional boolean

Whether cached responses are shared across Worker version uploads. This is independent of <code>enabled</code>. It can stay true while caching is off, so the preference survives turning caching off and back on.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

compatibility\_date: optional string

Date indicating targeted support in the Workers runtime. Backwards incompatible fixes to the runtime following this date will not affect this Worker.

<a href="#">Link to this property</a>

compatibility\_flags: optional array of string

Flags that enable or disable certain features in the Workers runtime. Used to enable upcoming features or opt in or out of specific changes not included in a <code>compatibility_date</code>.

<a href="#">Link to this property</a>

<details>

<summary>

containers: optional array of object {class\_name }

List of containers attached to a Worker. Containers can only be attached to Durable Object classes of this Worker script.

</summary>

class\_name: string

Select which Durable Object class should get this container attached.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

exports: optional map\[object {type, cache, state } or object {storage, type, container, state } or object {state, type } or 3 more]

Declarative exports for the version, including Durable Object classes (with their <code>storage</code> backend) and named Worker entrypoints. On reads, tombstoned lifecycle entries are omitted, so only live exports (<code>created</code> and <code>expecting-transfer</code>) are returned. <code>exports</code> and <code>migrations</code> are mutually exclusive on upload.

</summary>

One of the following:

<details>

<summary>

Worker object {type, cache, state }

A named Worker entrypoint export (<code>type: worker</code>). Worker entrypoints are always live (<code>state: created</code>) and carry no storage or lifecycle fields. The optional <code>cache</code> block overrides the Worker’s global <code>cache_options.enabled</code> for this entrypoint.

</summary>

type: "worker"

Marks this entry as a Worker entrypoint export.

<a href="#">Link to this property</a>

<details>

<summary>

cache: optional object {enabled }

Cache override for this entrypoint. Overrides the Worker’s global <code>cache_options.enabled</code> for this entrypoint only.

</summary>

enabled: boolean

Whether caching is enabled for this entrypoint.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

state: optional "created"

Live export. May be omitted; defaults to <code>created</code>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

WorkersDurableObjectExport object {storage, type, container, state }

A live Durable Object export (<code>state: created</code>, the default). The platform auto-provisions the namespace on first deploy, matches it on subsequent deploys, and never mutates or deletes it as a side effect of a code-only change. <code>storage</code> is required; <code>renamed_to</code>, <code>transferred_to</code> and <code>transfer_from</code> are not allowed on a live entry.

</summary>

<details>

<summary>

storage: "sqlite"or "legacy-kv"

Durable Object storage backend. <code>sqlite</code> is the recommended (and only) backend for new namespaces. <code>legacy-kv</code> is accepted only for a class whose namespace already exists as KV-backed; the <code>exports</code> flow never provisions a new <code>legacy-kv</code> namespace.

</summary>

One of the following:

"sqlite"

<a href="#">Link to this property</a>

"legacy-kv"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: "durable-object"

Marks this entry as a Durable Object export.

<a href="#">Link to this property</a>

container: optional string

Name of the container (declared in the upload’s <code>metadata.containers</code>) that backs this Durable Object. When set, the namespace is container-enabled. Valid only on live entries.

maxLength128

<a href="#">Link to this property</a>

state: optional "created"

Live export. May be omitted; defaults to <code>created</code>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

WorkersDurableObjectDeletedExport object {state, type }

A <code>deleted</code> tombstone: retires the provisioned namespace for this class and all of its data. The class must be absent from the uploaded code and no other Worker in the account may bind to the namespace, otherwise the deploy is rejected. No other fields are allowed. Deletion is irreversible.

</summary>

state: "deleted"

Tombstone that deletes the namespace.

<a href="#">Link to this property</a>

type: "durable-object"

Marks this entry as a Durable Object export.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

WorkersDurableObjectRenamedExport object {renamed\_to, state, type }

A <code>renamed</code> tombstone: rewrites the provisioned namespace’s class name from this map key to <code>renamed_to</code>. The source class may stay in code during the rollout window (an info notice is emitted). <code>storage</code>, <code>transferred_to</code> and <code>transfer_from</code> are not allowed.

</summary>

renamed\_to: string

The destination class name. Must differ from the source class (the map key) and must be declared as a live (<code>created</code>) entry in the same <code>exports</code> map. Write-only: never present in GET responses.

maxLength128

<a href="#">Link to this property</a>

state: "renamed"

Tombstone that renames the namespace’s class.

<a href="#">Link to this property</a>

type: "durable-object"

Marks this entry as a Durable Object export.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

WorkersDurableObjectTransferredExport object {state, transferred\_to, type }

A <code>transferred</code> tombstone (source side of a two-phase transfer): hands ownership of the provisioned namespace to another script in the same account, named by <code>transferred_to</code>. The target must have already deployed a matching <code>expecting-transfer</code> entry. The source class may stay in code during the rollout window (an info notice is emitted). <code>storage</code>, <code>renamed_to</code> and <code>transfer_from</code> are not allowed.

</summary>

state: "transferred"

Tombstone that transfers the namespace to another script.

<a href="#">Link to this property</a>

transferred\_to: string

The destination script name. Must be in the same account and the same dispatch-namespace context (or both non-dispatch). Cross-dispatch-namespace transfers are rejected. Write-only: never present in GET responses.

maxLength128

<a href="#">Link to this property</a>

type: "durable-object"

Marks this entry as a Durable Object export.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

WorkersDurableObjectExpectingTransferExport object {state, storage, transfer\_from, 2 more }

The target side of a two-phase transfer (<code>state: expecting-transfer</code>). Declares that this script expects to receive a namespace for this class from the <code>transfer_from</code> script. This is a live entry, not a tombstone: bindings resolve through the source’s namespace until the source commits with a <code>transferred</code> tombstone. <code>storage</code> and <code>transfer_from</code> are required; <code>renamed_to</code> and <code>transferred_to</code> are not allowed.

</summary>

state: "expecting-transfer"

Target side of a two-phase transfer.

<a href="#">Link to this property</a>

<details>

<summary>

storage: "sqlite"or "legacy-kv"

Durable Object storage backend. <code>sqlite</code> is the recommended (and only) backend for new namespaces. <code>legacy-kv</code> is accepted only for a class whose namespace already exists as KV-backed; the <code>exports</code> flow never provisions a new <code>legacy-kv</code> namespace.

</summary>

One of the following:

"sqlite"

<a href="#">Link to this property</a>

"legacy-kv"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

transfer\_from: string

The source script name to receive the namespace from. Must be in the same account and dispatch-namespace context. Present on reads for <code>expecting-transfer</code> entries.

maxLength128

<a href="#">Link to this property</a>

type: "durable-object"

Marks this entry as a Durable Object export.

<a href="#">Link to this property</a>

container: optional string

Name of the container (declared in the upload’s <code>metadata.containers</code>) that backs this Durable Object once the transfer settles. Valid only on live entries.

maxLength128

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

exports\_reconciliation: optional object {created, deleted, info, 6 more }

Summary of the declarative exports reconciliation that ran on this upload. Populated only when the uploaded metadata included an <code>exports</code> block. Durable Object entries drive reconciliation; <code>type: worker</code> entries do not contribute to this summary.

</summary>

created: array of string

Class names for which a new namespace was provisioned.

<a href="#">Link to this property</a>

deleted: array of string

Class names whose namespace was deleted by a <code>deleted</code> tombstone.

<a href="#">Link to this property</a>

<details>

<summary>

info: array of object {class, message, scenario, 2 more }

Non-blocking info entries (stale tombstones, tombstone applied with class still in code). See <code>exports_reconciliation_info</code>.

</summary>

class: string

The class name the info entry is about.

<a href="#">Link to this property</a>

message: string

Human-readable explanation.

<a href="#">Link to this property</a>

<details>

<summary>

scenario: "code\_class\_not\_in\_exports"or "provisioned\_class\_missing\_from\_config"or "config\_export\_not\_in\_code"or 30 more

Stable, machine-readable tag identifying which reconciliation scenario produced an error, warning, or info entry. Clients may branch on this value instead of parsing <code>message</code>.

</summary>

One of the following:

"code\_class\_not\_in\_exports"

<a href="#">Link to this property</a>

"provisioned\_class\_missing\_from\_config"

<a href="#">Link to this property</a>

"config\_export\_not\_in\_code"

<a href="#">Link to this property</a>

"config\_references\_nonexistent\_class"

<a href="#">Link to this property</a>

"orphaned\_provisioned\_namespace"

<a href="#">Link to this property</a>

"storage\_type\_mismatch"

<a href="#">Link to this property</a>

"free\_tier\_requires\_sqlite"

<a href="#">Link to this property</a>

"invalid\_export"

<a href="#">Link to this property</a>

"tombstone\_delete\_class\_still\_in\_code"

<a href="#">Link to this property</a>

"tombstone\_delete\_blocked\_by\_external\_bindings"

<a href="#">Link to this property</a>

"tombstone\_renamed\_to\_occupied"

<a href="#">Link to this property</a>

"transferred\_pending\_not\_found"

<a href="#">Link to this property</a>

"transferred\_target\_missing"

<a href="#">Link to this property</a>

"transferred\_target\_mismatch"

<a href="#">Link to this property</a>

"phase\_one\_transfer\_source\_missing"

<a href="#">Link to this property</a>

"phase\_one\_transfer\_source\_namespace\_missing"

<a href="#">Link to this property</a>

"phase\_one\_transfer\_target\_class\_provisioned"

<a href="#">Link to this property</a>

"phase\_one\_transfer\_after\_commit\_mismatch"

<a href="#">Link to this property</a>

"phase\_one\_transfer\_duplicate"

<a href="#">Link to this property</a>

"phase\_one\_transfer\_target\_in\_dispatch\_namespace"

<a href="#">Link to this property</a>

"phase\_one\_transfer\_source\_in\_dispatch\_namespace"

<a href="#">Link to this property</a>

"transferred\_source\_in\_dispatch\_namespace"

<a href="#">Link to this property</a>

"transferred\_target\_in\_dispatch\_namespace"

<a href="#">Link to this property</a>

"container\_undeclared\_reference"

<a href="#">Link to this property</a>

"container\_class\_not\_durable\_object"

<a href="#">Link to this property</a>

"container\_wiring\_inconsistent"

<a href="#">Link to this property</a>

"container\_multiple\_durable\_objects"

<a href="#">Link to this property</a>

"transfer\_container\_parity\_mismatch"

<a href="#">Link to this property</a>

"transfer\_container\_parity\_mismatch\_on\_commit"

<a href="#">Link to this property</a>

"tombstone\_class\_still\_in\_code"

<a href="#">Link to this property</a>

"stale\_tombstone"

<a href="#">Link to this property</a>

"transfer\_receive\_already\_applied"

<a href="#">Link to this property</a>

"transfer\_receive\_cleanup\_complete"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

namespace\_id: optional string

The provisioned namespace the entry relates to, when applicable.

formatuuid

<a href="#">Link to this property</a>

referencing\_scripts: optional array of string

Other Workers in the account that still bind to the affected class. Advisory: while non-empty the tombstone is not yet safe to remove — redeploy these Workers with bindings re-pointed first.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

removable\_entries: array of string

Source class names whose tombstone entry is now stale and safe to delete from <code>exports</code> (no remaining referencing scripts).

<a href="#">Link to this property</a>

<details>

<summary>

renamed: array of object {from, to }

Applied <code>renamed</code> tombstones.

</summary>

from: string

The original (source) class name.

<a href="#">Link to this property</a>

to: string

The new class name (<code>renamed_to</code>).

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

transfer\_pending: array of object {class, from }

Phase-1 transfer hints recorded on the target side.

</summary>

class: string

The target-side class name awaiting transfer.

<a href="#">Link to this property</a>

from: string

The source script the namespace will be transferred from.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

transferred: array of object {class, phase, to }

Committed <code>transferred</code> tombstones (phase-2).

</summary>

class: string

The source class name that was transferred.

<a href="#">Link to this property</a>

phase: "committed"

The transfer phase. Currently always <code>committed</code>.

<a href="#">Link to this property</a>

to: string

The destination script that now owns the namespace.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated: array of string

Class names whose provisioned namespace was mutated in place.

<a href="#">Link to this property</a>

<details>

<summary>

warnings: array of object {class, message, scenario, namespace\_id }

Non-blocking warnings. See <code>exports_reconciliation_warning</code>.

</summary>

class: string

The class name the warning is about.

<a href="#">Link to this property</a>

message: string

Human-readable explanation of the warning.

<a href="#">Link to this property</a>

<details>

<summary>

scenario: "code\_class\_not\_in\_exports"or "provisioned\_class\_missing\_from\_config"or "config\_export\_not\_in\_code"or 30 more

Stable, machine-readable tag identifying which reconciliation scenario produced an error, warning, or info entry. Clients may branch on this value instead of parsing <code>message</code>.

</summary>

One of the following:

"code\_class\_not\_in\_exports"

<a href="#">Link to this property</a>

"provisioned\_class\_missing\_from\_config"

<a href="#">Link to this property</a>

"config\_export\_not\_in\_code"

<a href="#">Link to this property</a>

"config\_references\_nonexistent\_class"

<a href="#">Link to this property</a>

"orphaned\_provisioned\_namespace"

<a href="#">Link to this property</a>

"storage\_type\_mismatch"

<a href="#">Link to this property</a>

"free\_tier\_requires\_sqlite"

<a href="#">Link to this property</a>

"invalid\_export"

<a href="#">Link to this property</a>

"tombstone\_delete\_class\_still\_in\_code"

<a href="#">Link to this property</a>

"tombstone\_delete\_blocked\_by\_external\_bindings"

<a href="#">Link to this property</a>

"tombstone\_renamed\_to\_occupied"

<a href="#">Link to this property</a>

"transferred\_pending\_not\_found"

<a href="#">Link to this property</a>

"transferred\_target\_missing"

<a href="#">Link to this property</a>

"transferred\_target\_mismatch"

<a href="#">Link to this property</a>

"phase\_one\_transfer\_source\_missing"

<a href="#">Link to this property</a>

"phase\_one\_transfer\_source\_namespace\_missing"

<a href="#">Link to this property</a>

"phase\_one\_transfer\_target\_class\_provisioned"

<a href="#">Link to this property</a>

"phase\_one\_transfer\_after\_commit\_mismatch"

<a href="#">Link to this property</a>

"phase\_one\_transfer\_duplicate"

<a href="#">Link to this property</a>

"phase\_one\_transfer\_target\_in\_dispatch\_namespace"

<a href="#">Link to this property</a>

"phase\_one\_transfer\_source\_in\_dispatch\_namespace"

<a href="#">Link to this property</a>

"transferred\_source\_in\_dispatch\_namespace"

<a href="#">Link to this property</a>

"transferred\_target\_in\_dispatch\_namespace"

<a href="#">Link to this property</a>

"container\_undeclared\_reference"

<a href="#">Link to this property</a>

"container\_class\_not\_durable\_object"

<a href="#">Link to this property</a>

"container\_wiring\_inconsistent"

<a href="#">Link to this property</a>

"container\_multiple\_durable\_objects"

<a href="#">Link to this property</a>

"transfer\_container\_parity\_mismatch"

<a href="#">Link to this property</a>

"transfer\_container\_parity\_mismatch\_on\_commit"

<a href="#">Link to this property</a>

"tombstone\_class\_still\_in\_code"

<a href="#">Link to this property</a>

"stale\_tombstone"

<a href="#">Link to this property</a>

"transfer\_receive\_already\_applied"

<a href="#">Link to this property</a>

"transfer\_receive\_cleanup\_complete"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

namespace\_id: optional string

The provisioned namespace the warning relates to, when applicable.

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

limits: optional object {cpu\_ms, subrequests }

Resource limits enforced at runtime.

</summary>

cpu\_ms: optional number

CPU time limit in milliseconds.

<a href="#">Link to this property</a>

subrequests: optional number

Subrequest limit per request.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

main\_module: optional string

The name of the main module in the <code>modules</code> array (e.g. the name of the module that exports a <code>fetch</code> handler).

<a href="#">Link to this property</a>

migration\_tag: optional string

Durable Object migration tag. Set when the version is deployed. Omitted if the version has not been deployed or the Worker does not use Durable Objects.

<a href="#">Link to this property</a>

<details>

<summary>

migrations: optional <a href="https://developers.cloudflare.com/api/resources/workers#(resource)%20workers%20%3E%20(model)%20single_step_migration%20%3E%20(schema)">SingleStepMigration</a> { deleted\_classes, new\_classes, new\_sqlite\_classes, 4 more } or object {new\_tag, old\_tag, steps }

Migrations for Durable Objects associated with the version. Migrations are applied when the version is deployed.

</summary>

One of the following:

<details>

<summary>

SingleStepMigration object {deleted\_classes, new\_classes, new\_sqlite\_classes, 4 more }

A single set of migrations to apply.

</summary>

deleted\_classes: optional array of string

A list of classes to delete Durable Object namespaces from.

<a href="#">Link to this property</a>

new\_classes: optional array of string

A list of classes to create Durable Object namespaces from.

<a href="#">Link to this property</a>

new\_sqlite\_classes: optional array of string

A list of classes to create Durable Object namespaces with SQLite from.

<a href="#">Link to this property</a>

new\_tag: optional string

Tag to set as the latest migration tag.

<a href="#">Link to this property</a>

old\_tag: optional string

Tag used to verify against the latest migration tag for this Worker. If they don’t match, the upload is rejected.

<a href="#">Link to this property</a>

<details>

<summary>

renamed\_classes: optional array of object {from, to }

A list of classes with Durable Object namespaces that were renamed.

</summary>

from: optional string

<a href="#">Link to this property</a>

to: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

transferred\_classes: optional array of object {from, from\_script, to }

A list of transfers for Durable Object namespaces from a different Worker and class to a class defined in this Worker.

</summary>

from: optional string

<a href="#">Link to this property</a>

from\_script: optional string

<a href="#">Link to this property</a>

to: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

WorkersMultipleStepMigrations object {new\_tag, old\_tag, steps }

</summary>

new\_tag: optional string

Tag to set as the latest migration tag.

<a href="#">Link to this property</a>

old\_tag: optional string

Tag used to verify against the latest migration tag for this Worker. If they don’t match, the upload is rejected.

<a href="#">Link to this property</a>

<details>

<summary>

steps: optional array of <a href="https://developers.cloudflare.com/api/resources/workers#(resource)%20workers%20%3E%20(model)%20migration_step%20%3E%20(schema)">MigrationStep</a> { deleted\_classes, new\_classes, new\_sqlite\_classes, 2 more }

Migrations to apply in order.

</summary>

deleted\_classes: optional array of string

A list of classes to delete Durable Object namespaces from.

<a href="#">Link to this property</a>

new\_classes: optional array of string

A list of classes to create Durable Object namespaces from.

<a href="#">Link to this property</a>

new\_sqlite\_classes: optional array of string

A list of classes to create Durable Object namespaces with SQLite from.

<a href="#">Link to this property</a>

<details>

<summary>

renamed\_classes: optional array of object {from, to }

A list of classes with Durable Object namespaces that were renamed.

</summary>

from: optional string

<a href="#">Link to this property</a>

to: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

transferred\_classes: optional array of object {from, from\_script, to }

A list of transfers for Durable Object namespaces from a different Worker and class to a class defined in this Worker.

</summary>

from: optional string

<a href="#">Link to this property</a>

from\_script: optional string

<a href="#">Link to this property</a>

to: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

modules: optional array of object {content\_base64, content\_type, name }

Code, sourcemaps, and other content used at runtime.

This includes <a href="https://developers.cloudflare.com/workers/static-assets/headers/#custom-headers"><code>_headers</code></a> and <a href="https://developers.cloudflare.com/workers/static-assets/redirects/"><code>_redirects</code></a> files used to configure <a href="https://developers.cloudflare.com/workers/static-assets/">Static Assets</a>. <code>_headers</code> and <code>_redirects</code> files should be included as modules named <code>_headers</code> and <code>_redirects</code> with content type <code>text/plain</code>.

</summary>

content\_base64: string

The base64-encoded module content.

formatbyte

<a href="#">Link to this property</a>

content\_type: string

The content type of the module.

<a href="#">Link to this property</a>

name: string

The name of the module.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

package\_dependencies: optional array of object {installedVersion, name, packageJsonVersion }

The list of npm packages that were installed and used when this Worker version was built.

</summary>

installedVersion: string

The exact version that was resolved and installed by the package manager.

<a href="#">Link to this property</a>

name: string

The npm package name.

<a href="#">Link to this property</a>

packageJsonVersion: string

The version constraint as written in package.json.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

placement: optional object {mode } or object {region } or object {hostname } or 5 more

Configuration for <a href="https://developers.cloudflare.com/workers/configuration/smart-placement">Smart Placement</a>. Specify mode=‘smart’ for Smart Placement, or one of region/hostname/host.

</summary>

One of the following:

<details>

<summary>

Mode object {mode }

</summary>

mode: "smart"

Enables <a href="https://developers.cloudflare.com/workers/configuration/smart-placement">Smart Placement</a>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Region object {region }

</summary>

region: string

Cloud region for targeted placement in format ‘provider:region’.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Hostname object {hostname }

</summary>

hostname: string

HTTP hostname for targeted placement.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Host object {host }

</summary>

host: string

TCP host and port for targeted placement.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {mode, region }

</summary>

mode: "targeted"

Targeted placement mode.

<a href="#">Link to this property</a>

region: string

Cloud region for targeted placement in format ‘provider:region’.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {hostname, mode }

</summary>

hostname: string

HTTP hostname for targeted placement.

<a href="#">Link to this property</a>

mode: "targeted"

Targeted placement mode.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {host, mode }

</summary>

host: string

TCP host and port for targeted placement.

<a href="#">Link to this property</a>

mode: "targeted"

Targeted placement mode.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {mode, target }

</summary>

mode: "targeted"

Targeted placement mode.

<a href="#">Link to this property</a>

<details>

<summary>

target: array of object {region } or object {hostname } or object {host }

Array of placement targets (currently limited to single target).

</summary>

One of the following:

<details>

<summary>

Region object {region }

</summary>

region: string

Cloud region in format ‘provider:region’.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Hostname object {hostname }

</summary>

hostname: string

HTTP hostname for targeted placement.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Host object {host }

</summary>

host: string

TCP host:port for targeted placement.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

source: optional string

The client used to create the version.

<a href="#">Link to this property</a>

startup\_time\_ms: optional number

Time in milliseconds spent on <a href="https://developers.cloudflare.com/workers/platform/limits/#worker-startup-time">Worker startup</a>.

<a href="#">Link to this property</a>

<details>

<summary>

Deprecatedusage\_model: optional "standard"or "bundled"or "unbound"

Usage model for the version.

</summary>

One of the following:

"standard"

<a href="#">Link to this property</a>

"bundled"

<a href="#">Link to this property</a>

"unbound"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers.beta.workers.versions%20%3E%20(model)%20version%20%3E%20(schema)>)

<details>

<summary>

VersionDeleteResponse object {errors, messages, success }

</summary>

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

<a href="#">Link to this property</a>

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

<a href="#">Link to this property</a>

success: true

Whether the API call was successful.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers.beta.workers.versions%20%3E%20(model)%20version_delete_response%20%3E%20(schema)>)