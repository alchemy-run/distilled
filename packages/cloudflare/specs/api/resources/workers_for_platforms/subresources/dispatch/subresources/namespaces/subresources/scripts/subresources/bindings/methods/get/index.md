---
title: Get Script Bindings
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Workers For Platforms](https://developers.cloudflare.com/api/resources/workers_for_platforms)

[Dispatch](https://developers.cloudflare.com/api/resources/workers_for_platforms/subresources/dispatch)

[Namespaces](https://developers.cloudflare.com/api/resources/workers_for_platforms/subresources/dispatch/subresources/namespaces)

[Scripts](https://developers.cloudflare.com/api/resources/workers_for_platforms/subresources/dispatch/subresources/namespaces/subresources/scripts)

[Bindings](https://developers.cloudflare.com/api/resources/workers_for_platforms/subresources/dispatch/subresources/namespaces/subresources/scripts/subresources/bindings)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get Script Bindings

GET/accounts/{account\_id}/workers/dispatch/namespaces/{dispatch\_namespace}/scripts/{script\_name}/bindings

Fetch script bindings from a script uploaded to a Workers for Platforms namespace.

##### Security

<details>

<summary>API Token</summary>



The preferred authorization scheme for interacting with the Cloudflare API. <a href="https://developers.cloudflare.com/fundamentals/api/get-started/create-token/">Create a token</a>.

**Example:**<code>Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY</code>

</details>

<details>

<summary>API Email + API Key</summary>



The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**<code>X-Auth-Email: user@example.com</code>

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**<code>X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194</code>

</details>

##### Accepted Permissions (at least one required)

`Workers Tail Read``Workers Scripts Write``Workers Scripts Read`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier.

maxLength32

[Link to this property](#)%20workers_for_platforms.dispatch.namespaces.scripts.bindings%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

dispatch\_namespace: string

Name of the Workers for Platforms dispatch namespace.

[Link to this property](#)%20workers_for_platforms.dispatch.namespaces.scripts.bindings%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20dispatch_namespace%20%3E%20(schema)>)

script\_name: string

Name of the script, used in URLs and route configuration.

[Link to this property](#)%20workers_for_platforms.dispatch.namespaces.scripts.bindings%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20script_name%20%3E%20(schema)>)

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

[Link to this property](#)%20workers_for_platforms.dispatch.namespaces.scripts.bindings%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20workers_for_platforms.dispatch.namespaces.scripts.bindings%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: array of object {name, type } or object {instance\_name, name, type, namespace } or object {name, namespace, type } or 33 more

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

[Link to this property](#)%20workers_for_platforms.dispatch.namespaces.scripts.bindings%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20workers_for_platforms.dispatch.namespaces.scripts.bindings%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get Script Bindings

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/dispatch/namespaces/$DISPATCH_NAMESPACE/scripts/$SCRIPT_NAME/bindings \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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
  "result": [
    {
      "name": "MY_ENV_VAR",
      "text": "my_data",
      "type": "plain_text"
    }
  ],
  "success": true
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
  "result": [
    {
      "name": "MY_ENV_VAR",
      "text": "my_data",
      "type": "plain_text"
    }
  ],
  "success": true
}
```