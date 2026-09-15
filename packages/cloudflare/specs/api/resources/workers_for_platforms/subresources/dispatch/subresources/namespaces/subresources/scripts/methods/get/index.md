---
title: Worker Details
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Workers For Platforms](https://developers.cloudflare.com/api/resources/workers_for_platforms)

[Dispatch](https://developers.cloudflare.com/api/resources/workers_for_platforms/subresources/dispatch)

[Namespaces](https://developers.cloudflare.com/api/resources/workers_for_platforms/subresources/dispatch/subresources/namespaces)

[Scripts](https://developers.cloudflare.com/api/resources/workers_for_platforms/subresources/dispatch/subresources/namespaces/subresources/scripts)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Worker Details

GET/accounts/{account\_id}/workers/dispatch/namespaces/{dispatch\_namespace}/scripts/{script\_name}

Fetch information about a script uploaded to a Workers for Platforms namespace.

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

[Link to this property](#)%20workers_for_platforms.dispatch.namespaces.scripts%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

dispatch\_namespace: string

Name of the Workers for Platforms dispatch namespace.

[Link to this property](#)%20workers_for_platforms.dispatch.namespaces.scripts%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20dispatch_namespace%20%3E%20(schema)>)

script\_name: string

Name of the script, used in URLs and route configuration.

[Link to this property](#)%20workers_for_platforms.dispatch.namespaces.scripts%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20script_name%20%3E%20(schema)>)

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

[Link to this property](#)%20workers_for_platforms.dispatch.namespaces.scripts%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20workers_for_platforms.dispatch.namespaces.scripts%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: <a href="https://developers.cloudflare.com/api/resources/workers_for_platforms#(resource)%20workers_for_platforms.dispatch.namespaces.scripts%20%3E%20(model)%20script%20%3E%20(schema)">Script</a> { created\_on, dispatch\_namespace, modified\_on, script }

Details about a worker uploaded to a Workers for Platforms namespace.

</summary>

created\_on: optional string

When the script was created.

formatdate-time

<a href="#">Link to this property</a>

dispatch\_namespace: optional string

Name of the Workers for Platforms dispatch namespace.

<a href="#">Link to this property</a>

modified\_on: optional string

When the script was last modified.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

script: optional <a href="https://developers.cloudflare.com/api/resources/workers#(resource)%20workers.scripts%20%3E%20(model)%20script%20%3E%20(schema)">Script</a> { id, cache\_options, compatibility\_date, 20 more }

</summary>

id: optional string

The name used to identify the script.

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

created\_on: optional string

When the script was created.

formatdate-time

<a href="#">Link to this property</a>

etag: optional string

Hashed script content, can be used in a If-None-Match header when updating.

<a href="#">Link to this property</a>

<details>

<summary>

exports: optional map\[object {type, cache, state } or object {storage, type, container, state } or object {state, type } or 3 more]

Declarative exports for the Worker’s most recent version, including Durable Object classes (with their <code>storage</code> backend) and named Worker entrypoints. Tombstoned lifecycle entries are omitted, so only live exports (<code>created</code> and <code>expecting-transfer</code>) are returned.

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

handlers: optional array of string

The names of handlers exported as part of the default export.

<a href="#">Link to this property</a>

has\_assets: optional boolean

Whether a Worker contains assets.

<a href="#">Link to this property</a>

has\_modules: optional boolean

Whether a Worker contains modules.

<a href="#">Link to this property</a>

last\_deployed\_from: optional string

The client most recently used to deploy this Worker.

<a href="#">Link to this property</a>

logpush: optional boolean

Whether Logpush is turned on for the Worker.

<a href="#">Link to this property</a>

migration\_tag: optional string

The tag of the Durable Object migration that was most recently applied for this Worker.

<a href="#">Link to this property</a>

modified\_on: optional string

When the script was last modified.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

named\_handlers: optional array of object {handlers, name }

Named exports, such as Durable Object class implementations and named entrypoints.

</summary>

handlers: optional array of string

The names of handlers exported as part of the named export.

<a href="#">Link to this property</a>

name: optional string

The name of the export.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

observability: optional object {enabled, head\_sampling\_rate, logs, 2 more }

Observability settings for the Worker.

</summary>

enabled: boolean

Whether observability is enabled for the Worker.

<a href="#">Link to this property</a>

head\_sampling\_rate: optional number

The sampling rate for incoming requests. From 0 to 1 (1 = 100%, 0.1 = 10%). Default is 1.

<a href="#">Link to this property</a>

<details>

<summary>

logs: optional object {enabled, invocation\_logs, destinations, 2 more }

Log settings for the Worker.

</summary>

enabled: boolean

Whether logs are enabled for the Worker.

<a href="#">Link to this property</a>

invocation\_logs: boolean

Whether <a href="https://developers.cloudflare.com/workers/observability/logs/workers-logs/#invocation-logs">invocation logs</a> are enabled for the Worker.

<a href="#">Link to this property</a>

destinations: optional array of string

A list of destinations where logs will be exported to.

<a href="#">Link to this property</a>

head\_sampling\_rate: optional number

The sampling rate for logs. From 0 to 1 (1 = 100%, 0.1 = 10%). Default is 1.

<a href="#">Link to this property</a>

persist: optional boolean

Whether log persistence is enabled for the Worker.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

redact\_query\_string: optional boolean

Whether query strings are removed from request URLs in logs and traces.

<a href="#">Link to this property</a>

<details>

<summary>

traces: optional object {destinations, enabled, head\_sampling\_rate, 2 more }

Trace settings for the Worker.

</summary>

destinations: optional array of string

A list of destinations where traces will be exported to.

<a href="#">Link to this property</a>

enabled: optional boolean

Whether traces are enabled for the Worker.

<a href="#">Link to this property</a>

head\_sampling\_rate: optional number

The sampling rate for traces. From 0 to 1 (1 = 100%, 0.1 = 10%). Default is 1.

<a href="#">Link to this property</a>

persist: optional boolean

Whether trace persistence is enabled for the Worker.

<a href="#">Link to this property</a>

<details>

<summary>

propagation\_policy: optional "authenticated"or "accept"

Controls how inbound trace context (traceparent/tracestate) headers on incoming requests are handled. “authenticated” honors inbound trace context only when accompanied by a valid trace auth token. “accept” unconditionally accepts inbound trace context. Requires the trace propagation feature to be enabled. Returns null when the trace propagation feature is not enabled for the account.

</summary>

One of the following:

"authenticated"

<a href="#">Link to this property</a>

"accept"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

placement: optional object {mode, last\_analyzed\_at, status } or object {region, last\_analyzed\_at, status } or object {hostname, last\_analyzed\_at, status } or 5 more

Configuration for <a href="https://developers.cloudflare.com/workers/configuration/smart-placement">Smart Placement</a>. Specify mode=‘smart’ for Smart Placement, or one of region/hostname/host.

</summary>

One of the following:

<details>

<summary>

object {mode, last\_analyzed\_at, status }

</summary>

mode: "smart"

Enables <a href="https://developers.cloudflare.com/workers/configuration/smart-placement">Smart Placement</a>.

<a href="#">Link to this property</a>

last\_analyzed\_at: optional string

The last time the script was analyzed for <a href="https://developers.cloudflare.com/workers/configuration/smart-placement">Smart Placement</a>.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "SUCCESS"or "UNSUPPORTED\_APPLICATION"or "INSUFFICIENT\_INVOCATIONS"

Status of <a href="https://developers.cloudflare.com/workers/configuration/smart-placement">Smart Placement</a>.

</summary>

One of the following:

"SUCCESS"

<a href="#">Link to this property</a>

"UNSUPPORTED\_APPLICATION"

<a href="#">Link to this property</a>

"INSUFFICIENT\_INVOCATIONS"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {region, last\_analyzed\_at, status }

</summary>

region: string

Cloud region for targeted placement in format ‘provider:region’.

<a href="#">Link to this property</a>

last\_analyzed\_at: optional string

The last time the script was analyzed for <a href="https://developers.cloudflare.com/workers/configuration/smart-placement">Smart Placement</a>.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "SUCCESS"or "UNSUPPORTED\_APPLICATION"or "INSUFFICIENT\_INVOCATIONS"

Status of <a href="https://developers.cloudflare.com/workers/configuration/smart-placement">Smart Placement</a>.

</summary>

One of the following:

"SUCCESS"

<a href="#">Link to this property</a>

"UNSUPPORTED\_APPLICATION"

<a href="#">Link to this property</a>

"INSUFFICIENT\_INVOCATIONS"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {hostname, last\_analyzed\_at, status }

</summary>

hostname: string

HTTP hostname for targeted placement.

<a href="#">Link to this property</a>

last\_analyzed\_at: optional string

The last time the script was analyzed for <a href="https://developers.cloudflare.com/workers/configuration/smart-placement">Smart Placement</a>.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "SUCCESS"or "UNSUPPORTED\_APPLICATION"or "INSUFFICIENT\_INVOCATIONS"

Status of <a href="https://developers.cloudflare.com/workers/configuration/smart-placement">Smart Placement</a>.

</summary>

One of the following:

"SUCCESS"

<a href="#">Link to this property</a>

"UNSUPPORTED\_APPLICATION"

<a href="#">Link to this property</a>

"INSUFFICIENT\_INVOCATIONS"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {host, last\_analyzed\_at, status }

</summary>

host: string

TCP host and port for targeted placement.

<a href="#">Link to this property</a>

last\_analyzed\_at: optional string

The last time the script was analyzed for <a href="https://developers.cloudflare.com/workers/configuration/smart-placement">Smart Placement</a>.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "SUCCESS"or "UNSUPPORTED\_APPLICATION"or "INSUFFICIENT\_INVOCATIONS"

Status of <a href="https://developers.cloudflare.com/workers/configuration/smart-placement">Smart Placement</a>.

</summary>

One of the following:

"SUCCESS"

<a href="#">Link to this property</a>

"UNSUPPORTED\_APPLICATION"

<a href="#">Link to this property</a>

"INSUFFICIENT\_INVOCATIONS"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {mode, region, last\_analyzed\_at, status }

</summary>

mode: "targeted"

Targeted placement mode.

<a href="#">Link to this property</a>

region: string

Cloud region for targeted placement in format ‘provider:region’.

<a href="#">Link to this property</a>

last\_analyzed\_at: optional string

The last time the script was analyzed for <a href="https://developers.cloudflare.com/workers/configuration/smart-placement">Smart Placement</a>.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "SUCCESS"or "UNSUPPORTED\_APPLICATION"or "INSUFFICIENT\_INVOCATIONS"

Status of <a href="https://developers.cloudflare.com/workers/configuration/smart-placement">Smart Placement</a>.

</summary>

One of the following:

"SUCCESS"

<a href="#">Link to this property</a>

"UNSUPPORTED\_APPLICATION"

<a href="#">Link to this property</a>

"INSUFFICIENT\_INVOCATIONS"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {hostname, mode, last\_analyzed\_at, status }

</summary>

hostname: string

HTTP hostname for targeted placement.

<a href="#">Link to this property</a>

mode: "targeted"

Targeted placement mode.

<a href="#">Link to this property</a>

last\_analyzed\_at: optional string

The last time the script was analyzed for <a href="https://developers.cloudflare.com/workers/configuration/smart-placement">Smart Placement</a>.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "SUCCESS"or "UNSUPPORTED\_APPLICATION"or "INSUFFICIENT\_INVOCATIONS"

Status of <a href="https://developers.cloudflare.com/workers/configuration/smart-placement">Smart Placement</a>.

</summary>

One of the following:

"SUCCESS"

<a href="#">Link to this property</a>

"UNSUPPORTED\_APPLICATION"

<a href="#">Link to this property</a>

"INSUFFICIENT\_INVOCATIONS"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {host, mode, last\_analyzed\_at, status }

</summary>

host: string

TCP host and port for targeted placement.

<a href="#">Link to this property</a>

mode: "targeted"

Targeted placement mode.

<a href="#">Link to this property</a>

last\_analyzed\_at: optional string

The last time the script was analyzed for <a href="https://developers.cloudflare.com/workers/configuration/smart-placement">Smart Placement</a>.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "SUCCESS"or "UNSUPPORTED\_APPLICATION"or "INSUFFICIENT\_INVOCATIONS"

Status of <a href="https://developers.cloudflare.com/workers/configuration/smart-placement">Smart Placement</a>.

</summary>

One of the following:

"SUCCESS"

<a href="#">Link to this property</a>

"UNSUPPORTED\_APPLICATION"

<a href="#">Link to this property</a>

"INSUFFICIENT\_INVOCATIONS"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {mode, target, last\_analyzed\_at, status }

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

last\_analyzed\_at: optional string

The last time the script was analyzed for <a href="https://developers.cloudflare.com/workers/configuration/smart-placement">Smart Placement</a>.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "SUCCESS"or "UNSUPPORTED\_APPLICATION"or "INSUFFICIENT\_INVOCATIONS"

Status of <a href="https://developers.cloudflare.com/workers/configuration/smart-placement">Smart Placement</a>.

</summary>

One of the following:

"SUCCESS"

<a href="#">Link to this property</a>

"UNSUPPORTED\_APPLICATION"

<a href="#">Link to this property</a>

"INSUFFICIENT\_INVOCATIONS"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Deprecatedplacement\_mode: optional "smart"or "targeted"

Configuration for <a href="https://developers.cloudflare.com/workers/configuration/smart-placement">Smart Placement</a>. Specify mode=‘smart’ for Smart Placement, or one of region/hostname/host.

</summary>

One of the following:

"smart"

<a href="#">Link to this property</a>

"targeted"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Deprecatedplacement\_status: optional "SUCCESS"or "UNSUPPORTED\_APPLICATION"or "INSUFFICIENT\_INVOCATIONS"

Status of <a href="https://developers.cloudflare.com/workers/configuration/smart-placement">Smart Placement</a>.

</summary>

One of the following:

"SUCCESS"

<a href="#">Link to this property</a>

"UNSUPPORTED\_APPLICATION"

<a href="#">Link to this property</a>

"INSUFFICIENT\_INVOCATIONS"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

tag: optional string

The immutable ID of the script.

<a href="#">Link to this property</a>

tags: optional array of string

Tags associated with the Worker.

<a href="#">Link to this property</a>

<details>

<summary>

tail\_consumers: optional array of <a href="https://developers.cloudflare.com/api/resources/workers#(resource)%20workers.scripts.tail%20%3E%20(model)%20consumer_script%20%3E%20(schema)">ConsumerScript</a> { service, environment, namespace }

List of Workers that will consume logs from the attached Worker.

</summary>

service: string

Name of Worker that is to be the consumer.

<a href="#">Link to this property</a>

environment: optional string

Optional environment if the Worker utilizes one.

<a href="#">Link to this property</a>

namespace: optional string

Optional dispatch namespace the script belongs to.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

usage\_model: optional "standard"or "bundled"or "unbound"

Usage model for the Worker invocations.

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

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers_for_platforms.dispatch.namespaces.scripts%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20workers_for_platforms.dispatch.namespaces.scripts%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Worker Details

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/dispatch/namespaces/$DISPATCH_NAMESPACE/scripts/$SCRIPT_NAME \
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
  "result": {
    "created_on": "2017-01-01T00:00:00Z",
    "dispatch_namespace": "my-dispatch-namespace",
    "modified_on": "2017-01-01T00:00:00Z",
    "script": {
      "id": "my-workers-script",
      "cache_options": {
        "enabled": true,
        "cross_version_cache": true
      },
      "compatibility_date": "2021-01-01T00:00:00Z",
      "compatibility_flags": [
        "nodejs_compat"
      ],
      "created_on": "2017-01-01T00:00:00Z",
      "etag": "ea95132c15732412d22c1476fa83f27a",
      "exports": {
        "Admin": {
          "type": "worker",
          "cache": {
            "enabled": true
          },
          "state": "created"
        },
        "Counter": {
          "storage": "sqlite",
          "type": "durable-object",
          "container": "my-container",
          "state": "created"
        },
        "OldCounter": {
          "state": "renamed",
          "type": "durable-object"
        },
        "default": {
          "type": "worker",
          "cache": {
            "enabled": false
          },
          "state": "created"
        }
      },
      "handlers": [
        "fetch",
        "scheduled"
      ],
      "has_assets": false,
      "has_modules": false,
      "last_deployed_from": "wrangler",
      "logpush": false,
      "migration_tag": "v1",
      "modified_on": "2017-01-01T00:00:00Z",
      "named_handlers": [
        {
          "handlers": [
            "class"
          ],
          "name": "MyDurableObject"
        }
      ],
      "observability": {
        "enabled": true,
        "head_sampling_rate": 0.1,
        "logs": {
          "enabled": true,
          "invocation_logs": true,
          "destinations": [
            "cloudflare"
          ],
          "head_sampling_rate": 0.1,
          "persist": true
        },
        "redact_query_string": false,
        "traces": {
          "destinations": [
            "cloudflare"
          ],
          "enabled": true,
          "head_sampling_rate": 0.1,
          "persist": true,
          "propagation_policy": "authenticated"
        }
      },
      "placement": {
        "mode": "smart",
        "last_analyzed_at": "2025-01-01T00:00:00Z",
        "status": "SUCCESS"
      },
      "placement_mode": "smart",
      "placement_status": "SUCCESS",
      "tag": "e8f70fdbc8b1fb0b8ddb1af166186758",
      "tags": [
        "my-team",
        "my-public-api"
      ],
      "tail_consumers": [
        {
          "service": "my-log-consumer",
          "environment": "production",
          "namespace": "my-namespace"
        }
      ],
      "usage_model": "standard"
    }
  },
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
  "result": {
    "created_on": "2017-01-01T00:00:00Z",
    "dispatch_namespace": "my-dispatch-namespace",
    "modified_on": "2017-01-01T00:00:00Z",
    "script": {
      "id": "my-workers-script",
      "cache_options": {
        "enabled": true,
        "cross_version_cache": true
      },
      "compatibility_date": "2021-01-01T00:00:00Z",
      "compatibility_flags": [
        "nodejs_compat"
      ],
      "created_on": "2017-01-01T00:00:00Z",
      "etag": "ea95132c15732412d22c1476fa83f27a",
      "exports": {
        "Admin": {
          "type": "worker",
          "cache": {
            "enabled": true
          },
          "state": "created"
        },
        "Counter": {
          "storage": "sqlite",
          "type": "durable-object",
          "container": "my-container",
          "state": "created"
        },
        "OldCounter": {
          "state": "renamed",
          "type": "durable-object"
        },
        "default": {
          "type": "worker",
          "cache": {
            "enabled": false
          },
          "state": "created"
        }
      },
      "handlers": [
        "fetch",
        "scheduled"
      ],
      "has_assets": false,
      "has_modules": false,
      "last_deployed_from": "wrangler",
      "logpush": false,
      "migration_tag": "v1",
      "modified_on": "2017-01-01T00:00:00Z",
      "named_handlers": [
        {
          "handlers": [
            "class"
          ],
          "name": "MyDurableObject"
        }
      ],
      "observability": {
        "enabled": true,
        "head_sampling_rate": 0.1,
        "logs": {
          "enabled": true,
          "invocation_logs": true,
          "destinations": [
            "cloudflare"
          ],
          "head_sampling_rate": 0.1,
          "persist": true
        },
        "redact_query_string": false,
        "traces": {
          "destinations": [
            "cloudflare"
          ],
          "enabled": true,
          "head_sampling_rate": 0.1,
          "persist": true,
          "propagation_policy": "authenticated"
        }
      },
      "placement": {
        "mode": "smart",
        "last_analyzed_at": "2025-01-01T00:00:00Z",
        "status": "SUCCESS"
      },
      "placement_mode": "smart",
      "placement_status": "SUCCESS",
      "tag": "e8f70fdbc8b1fb0b8ddb1af166186758",
      "tags": [
        "my-team",
        "my-public-api"
      ],
      "tail_consumers": [
        {
          "service": "my-log-consumer",
          "environment": "production",
          "namespace": "my-namespace"
        }
      ],
      "usage_model": "standard"
    }
  },
  "success": true
}
```