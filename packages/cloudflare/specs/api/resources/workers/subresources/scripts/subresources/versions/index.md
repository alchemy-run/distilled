---
title: Versions
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Workers](https://developers.cloudflare.com/api/resources/workers)

[Scripts](https://developers.cloudflare.com/api/resources/workers/subresources/scripts)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Versions

##### [List Versions](https://developers.cloudflare.com/api/resources/workers/subresources/scripts/subresources/versions/methods/list)

GET/accounts/{account\_id}/workers/scripts/{script\_name}/versions

##### [Get Version Detail](https://developers.cloudflare.com/api/resources/workers/subresources/scripts/subresources/versions/methods/get)

GET/accounts/{account\_id}/workers/scripts/{script\_name}/versions/{version\_id}

##### [Upload Version](https://developers.cloudflare.com/api/resources/workers/subresources/scripts/subresources/versions/methods/create)

POST/accounts/{account\_id}/workers/scripts/{script\_name}/versions

##### ModelsExpand Collapse

<details>

<summary>

VersionListResponse object {id, metadata, number }

</summary>

id: optional string

Unique identifier for the version.

<a href="#">Link to this property</a>

<details>

<summary>

metadata: optional object {author\_email, author\_id, created\_on, 3 more }

</summary>

author\_email: optional string

Email of the user who created the version.

<a href="#">Link to this property</a>

author\_id: optional string

Identifier of the user who created the version.

<a href="#">Link to this property</a>

created\_on: optional string

When the version was created.

<a href="#">Link to this property</a>

hasPreview: optional boolean

Whether the version can be previewed.

<a href="#">Link to this property</a>

modified\_on: optional string

When the version was last modified.

<a href="#">Link to this property</a>

<details>

<summary>

source: optional "unknown"or "api"or "wrangler"or 8 more

The source of the version upload.

</summary>

One of the following:

"unknown"

<a href="#">Link to this property</a>

"api"

<a href="#">Link to this property</a>

"wrangler"

<a href="#">Link to this property</a>

"terraform"

<a href="#">Link to this property</a>

"dash"

<a href="#">Link to this property</a>

"cf\_cli"

<a href="#">Link to this property</a>

"dash\_template"

<a href="#">Link to this property</a>

"integration"

<a href="#">Link to this property</a>

"quick\_editor"

<a href="#">Link to this property</a>

"playground"

<a href="#">Link to this property</a>

"workersci"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

number: optional number

Sequential version number.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers.scripts.versions%20%3E%20(model)%20version_list_response%20%3E%20(schema)>)

<details>

<summary>

VersionGetResponse object {resources, id, metadata, number }

</summary>

<details>

<summary>

resources: object {bindings, script, script\_runtime }

</summary>

bindings: optional

List of bindings attached to a Worker. You can find more about bindings on our docs: <a href="https://developers.cloudflare.com/workers/configuration/multipart-upload-metadata/#bindings">https://developers.cloudflare.com/workers/configuration/multipart-upload-metadata/#bindings</a>.

<a href="#">Link to this property</a>

<details>

<summary>

script: optional object {etag, handlers, last\_deployed\_from, named\_handlers }

</summary>

etag: optional string

Hashed script content

<a href="#">Link to this property</a>

handlers: optional array of string

The names of handlers exported as part of the default export.

<a href="#">Link to this property</a>

last\_deployed\_from: optional string

The client most recently used to deploy this Worker.

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

The name of the exported class or entrypoint.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

script\_runtime: optional object {compatibility\_date, compatibility\_flags, exports, 3 more }

Runtime configuration for the Worker.

</summary>

compatibility\_date: optional string

Date indicating targeted support in the Workers runtime. Backwards incompatible fixes to the runtime following this date will not affect this Worker.

<a href="#">Link to this property</a>

compatibility\_flags: optional array of string

Flags that enable or disable certain features in the Workers runtime.

<a href="#">Link to this property</a>

<details>

<summary>

exports: optional map\[object {type, cache, state } or object {storage, type, container, state } or object {state, type } or 3 more]

Declarative exports for this version, including Durable Object classes (with their <code>storage</code> backend) and named Worker entrypoints. Tombstoned lifecycle entries are omitted, so only live exports (<code>created</code> and <code>expecting-transfer</code>) are returned.

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

limits: optional object {cpu\_ms }

Resource limits for the Worker.

</summary>

cpu\_ms: optional number

The amount of CPU time this Worker can use in milliseconds.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

migration\_tag: optional string

The tag of the Durable Object migration that was most recently applied for this Worker.

<a href="#">Link to this property</a>

<details>

<summary>

usage\_model: optional "bundled"or "unbound"or "standard"

Usage model for the Worker invocations.

</summary>

One of the following:

"bundled"

<a href="#">Link to this property</a>

"unbound"

<a href="#">Link to this property</a>

"standard"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

id: optional string

Unique identifier for the version.

<a href="#">Link to this property</a>

<details>

<summary>

metadata: optional object {author\_email, author\_id, created\_on, 3 more }

</summary>

author\_email: optional string

Email of the user who created the version.

<a href="#">Link to this property</a>

author\_id: optional string

Identifier of the user who created the version.

<a href="#">Link to this property</a>

created\_on: optional string

When the version was created.

<a href="#">Link to this property</a>

hasPreview: optional boolean

Whether the version can be previewed.

<a href="#">Link to this property</a>

modified\_on: optional string

When the version was last modified.

<a href="#">Link to this property</a>

<details>

<summary>

source: optional "unknown"or "api"or "wrangler"or 8 more

The source of the version upload.

</summary>

One of the following:

"unknown"

<a href="#">Link to this property</a>

"api"

<a href="#">Link to this property</a>

"wrangler"

<a href="#">Link to this property</a>

"terraform"

<a href="#">Link to this property</a>

"dash"

<a href="#">Link to this property</a>

"cf\_cli"

<a href="#">Link to this property</a>

"dash\_template"

<a href="#">Link to this property</a>

"integration"

<a href="#">Link to this property</a>

"quick\_editor"

<a href="#">Link to this property</a>

"playground"

<a href="#">Link to this property</a>

"workersci"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

number: optional number

Sequential version number.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers.scripts.versions%20%3E%20(model)%20version_get_response%20%3E%20(schema)>)

<details>

<summary>

VersionCreateResponse object {resources, id, exports\_reconciliation, 3 more }

</summary>

<details>

<summary>

resources: object {bindings, script, script\_runtime }

</summary>

bindings: optional

List of bindings attached to a Worker. You can find more about bindings on our docs: <a href="https://developers.cloudflare.com/workers/configuration/multipart-upload-metadata/#bindings">https://developers.cloudflare.com/workers/configuration/multipart-upload-metadata/#bindings</a>.

<a href="#">Link to this property</a>

<details>

<summary>

script: optional object {etag, handlers, last\_deployed\_from, named\_handlers }

</summary>

etag: optional string

Hashed script content

<a href="#">Link to this property</a>

handlers: optional array of string

The names of handlers exported as part of the default export.

<a href="#">Link to this property</a>

last\_deployed\_from: optional string

The client most recently used to deploy this Worker.

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

The name of the exported class or entrypoint.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

script\_runtime: optional object {compatibility\_date, compatibility\_flags, exports, 3 more }

Runtime configuration for the Worker.

</summary>

compatibility\_date: optional string

Date indicating targeted support in the Workers runtime. Backwards incompatible fixes to the runtime following this date will not affect this Worker.

<a href="#">Link to this property</a>

compatibility\_flags: optional array of string

Flags that enable or disable certain features in the Workers runtime.

<a href="#">Link to this property</a>

<details>

<summary>

exports: optional map\[object {type, cache, state } or object {storage, type, container, state } or object {state, type } or 3 more]

Declarative exports for this version, including Durable Object classes (with their <code>storage</code> backend) and named Worker entrypoints. Tombstoned lifecycle entries are omitted, so only live exports (<code>created</code> and <code>expecting-transfer</code>) are returned.

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

limits: optional object {cpu\_ms }

Resource limits for the Worker.

</summary>

cpu\_ms: optional number

The amount of CPU time this Worker can use in milliseconds.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

migration\_tag: optional string

The tag of the Durable Object migration that was most recently applied for this Worker.

<a href="#">Link to this property</a>

<details>

<summary>

usage\_model: optional "bundled"or "unbound"or "standard"

Usage model for the Worker invocations.

</summary>

One of the following:

"bundled"

<a href="#">Link to this property</a>

"unbound"

<a href="#">Link to this property</a>

"standard"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

id: optional string

Unique identifier for the version.

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

metadata: optional object {author\_email, author\_id, created\_on, 3 more }

</summary>

author\_email: optional string

Email of the user who created the version.

<a href="#">Link to this property</a>

author\_id: optional string

Identifier of the user who created the version.

<a href="#">Link to this property</a>

created\_on: optional string

When the version was created.

<a href="#">Link to this property</a>

hasPreview: optional boolean

Whether the version can be previewed.

<a href="#">Link to this property</a>

modified\_on: optional string

When the version was last modified.

<a href="#">Link to this property</a>

<details>

<summary>

source: optional "unknown"or "api"or "wrangler"or 8 more

The source of the version upload.

</summary>

One of the following:

"unknown"

<a href="#">Link to this property</a>

"api"

<a href="#">Link to this property</a>

"wrangler"

<a href="#">Link to this property</a>

"terraform"

<a href="#">Link to this property</a>

"dash"

<a href="#">Link to this property</a>

"cf\_cli"

<a href="#">Link to this property</a>

"dash\_template"

<a href="#">Link to this property</a>

"integration"

<a href="#">Link to this property</a>

"quick\_editor"

<a href="#">Link to this property</a>

"playground"

<a href="#">Link to this property</a>

"workersci"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

number: optional number

Sequential version number.

<a href="#">Link to this property</a>

startup\_time\_ms: optional number

Time in milliseconds spent on <a href="https://developers.cloudflare.com/workers/platform/limits/#worker-startup-time">Worker startup</a>.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers.scripts.versions%20%3E%20(model)%20version_create_response%20%3E%20(schema)>)