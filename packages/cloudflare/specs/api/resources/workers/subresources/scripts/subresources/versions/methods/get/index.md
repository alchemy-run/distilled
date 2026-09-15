---
title: Get Version Detail
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Workers](https://developers.cloudflare.com/api/resources/workers)

[Scripts](https://developers.cloudflare.com/api/resources/workers/subresources/scripts)

[Versions](https://developers.cloudflare.com/api/resources/workers/subresources/scripts/subresources/versions)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get Version Detail

GET/accounts/{account\_id}/workers/scripts/{script\_name}/versions/{version\_id}

Retrieves detailed information about a specific version of a Workers script.

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

[Link to this property](#)%20workers.scripts.versions%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

script\_name: string

Name of the script.

[Link to this property](#)%20workers.scripts.versions%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20script_name%20%3E%20(schema)>)

version\_id: string

maxLength36

[Link to this property](#)%20workers.scripts.versions%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20version_id%20%3E%20(schema)>)

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

[Link to this property](#)%20workers.scripts.versions%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20workers.scripts.versions%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {resources, id, metadata, number }

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

[Link to this property](#)%20workers.scripts.versions%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20workers.scripts.versions%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get Version Detail

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/scripts/$SCRIPT_NAME/versions/$VERSION_ID \
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
    "resources": {
      "bindings": {},
      "script": {
        "etag": "13a3240e8fb414561b0366813b0b8f42b3e6cfa0d9e70e99835dae83d0d8a794",
        "handlers": [
          "fetch"
        ],
        "last_deployed_from": "api",
        "named_handlers": [
          {
            "handlers": [
              "fetch"
            ],
            "name": "MyClass"
          }
        ]
      },
      "script_runtime": {
        "compatibility_date": "2022-11-08T00:00:00Z",
        "compatibility_flags": [
          "x"
        ],
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
        "limits": {
          "cpu_ms": 50
        },
        "migration_tag": "v1",
        "usage_model": "standard"
      }
    },
    "id": "18f97339-c287-4872-9bdd-e2135c07ec12",
    "metadata": {
      "author_email": "user@example.com",
      "author_id": "408cbcdfd4dda4617efef40b04d168a1",
      "created_on": "2022-11-08T17:19:29.176266Z",
      "hasPreview": true,
      "modified_on": "2022-11-08T17:19:29.176266Z",
      "source": "api"
    },
    "number": 1
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
    "resources": {
      "bindings": {},
      "script": {
        "etag": "13a3240e8fb414561b0366813b0b8f42b3e6cfa0d9e70e99835dae83d0d8a794",
        "handlers": [
          "fetch"
        ],
        "last_deployed_from": "api",
        "named_handlers": [
          {
            "handlers": [
              "fetch"
            ],
            "name": "MyClass"
          }
        ]
      },
      "script_runtime": {
        "compatibility_date": "2022-11-08T00:00:00Z",
        "compatibility_flags": [
          "x"
        ],
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
        "limits": {
          "cpu_ms": 50
        },
        "migration_tag": "v1",
        "usage_model": "standard"
      }
    },
    "id": "18f97339-c287-4872-9bdd-e2135c07ec12",
    "metadata": {
      "author_email": "user@example.com",
      "author_id": "408cbcdfd4dda4617efef40b04d168a1",
      "created_on": "2022-11-08T17:19:29.176266Z",
      "hasPreview": true,
      "modified_on": "2022-11-08T17:19:29.176266Z",
      "source": "api"
    },
    "number": 1
  },
  "success": true
}
```