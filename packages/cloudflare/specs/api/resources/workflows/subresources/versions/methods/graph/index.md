---
title: Get Workflow version graph
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Workflows](https://developers.cloudflare.com/api/resources/workflows)

[Versions](https://developers.cloudflare.com/api/resources/workflows/subresources/versions)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get Workflow version graph

GET/accounts/{account\_id}/workflows/{workflow\_name}/versions/{version\_id}/graph

Retrieves the graph visualization of a workflow version.

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

[Link to this property](#)%20workflows.versions%20%3E%20(method)%20graph%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

workflow\_name: string

maxLength64

minLength1

[Link to this property](#)%20workflows.versions%20%3E%20(method)%20graph%20%3E%20(params)%20default%20%3E%20(param)%20workflow_name%20%3E%20(schema)>)

version\_id: string

formatuuid

[Link to this property](#)%20workflows.versions%20%3E%20(method)%20graph%20%3E%20(params)%20default%20%3E%20(param)%20version_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of object {code, message }

</summary>

code: number

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workflows.versions%20%3E%20(method)%20graph%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {code, message }

</summary>

code: number

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workflows.versions%20%3E%20(method)%20graph%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {id, class\_name, created\_on, 3 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

class\_name: string

<a href="#">Link to this property</a>

created\_on: string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

graph: object {version, workflow }

Versioned workflow graph payload.

</summary>

version: number

<a href="#">Link to this property</a>

<details>

<summary>

workflow: object {class\_name, functions, nodes, payload }

A parsed workflow entrypoint with its step graph.

</summary>

class\_name: string

<a href="#">Link to this property</a>

<details>

<summary>

functions: map\[object {name, nodes, type } ]

</summary>

name: string

<a href="#">Link to this property</a>

nodes: array of unknown

Child nodes (recursive).

<a href="#">Link to this property</a>

type: "function\_def"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

nodes: array of object {duration, name, type, 2 more } or object {config, name, nodes, 3 more } or object {name, options, type, 3 more } or 11 more

</summary>

One of the following:

<details>

<summary>

object {duration, name, type, 2 more }

</summary>

<details>

<summary>

duration: numberor string

Duration as milliseconds (number) or human-readable string.

</summary>

One of the following:

number

<a href="#">Link to this property</a>

string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

type: "step\_sleep"

<a href="#">Link to this property</a>

resolves: optional number

<a href="#">Link to this property</a>

starts: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {config, name, nodes, 3 more }

</summary>

<details>

<summary>

config: object {retries, timeout }

Configuration for a step (retries and timeout).

</summary>

<details>

<summary>

retries: object {backoff, delay, limit }

Retry policy for a step.

</summary>

<details>

<summary>

backoff: "constant"or "linear"or "exponential"

Backoff strategy for step retries.

</summary>

One of the following:

"constant"

<a href="#">Link to this property</a>

"linear"

<a href="#">Link to this property</a>

"exponential"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

delay: numberor string

Duration as milliseconds (number) or human-readable string.

</summary>

One of the following:

number

<a href="#">Link to this property</a>

string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

limit: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

timeout: numberor string

Duration as milliseconds (number) or human-readable string.

</summary>

One of the following:

number

<a href="#">Link to this property</a>

string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

nodes: array of unknown

Child nodes (recursive).

<a href="#">Link to this property</a>

type: "step\_do"

<a href="#">Link to this property</a>

resolves: optional number

<a href="#">Link to this property</a>

starts: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {name, options, type, 3 more }

</summary>

name: string

<a href="#">Link to this property</a>

<details>

<summary>

options: object {event\_type, timeout }

Options for a waitForEvent step.

</summary>

event\_type: string

<a href="#">Link to this property</a>

<details>

<summary>

timeout: numberor string

Duration as milliseconds (number) or human-readable string.

</summary>

One of the following:

number

<a href="#">Link to this property</a>

string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: "step\_wait\_for\_event"

<a href="#">Link to this property</a>

<details>

<summary>

payload: optional object {type } or object {fields, type }

Shape descriptor for JSON payloads.

</summary>

One of the following:

<details>

<summary>

Type object {type }

</summary>

type: "unknown"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {fields, type }

</summary>

fields: map\[unknown]

Nested JsonShape fields (recursive structure).

<a href="#">Link to this property</a>

type: "object"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

resolves: optional number

<a href="#">Link to this property</a>

starts: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {name, timestamp, type, 2 more }

</summary>

name: string

<a href="#">Link to this property</a>

timestamp: string

<a href="#">Link to this property</a>

type: "step\_sleep\_until"

<a href="#">Link to this property</a>

resolves: optional number

<a href="#">Link to this property</a>

starts: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {nodes, type }

</summary>

nodes: array of unknown

Child nodes (recursive).

<a href="#">Link to this property</a>

type: "loop"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {kind, nodes, type }

</summary>

<details>

<summary>

kind: "all"or "any"or "all\_settled"or "race"

Parallel execution strategy.

</summary>

One of the following:

"all"

<a href="#">Link to this property</a>

"any"

<a href="#">Link to this property</a>

"all\_settled"

<a href="#">Link to this property</a>

"race"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

nodes: array of unknown

Child nodes (recursive).

<a href="#">Link to this property</a>

type: "parallel"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {catch\_block, finally\_block, try\_block, type }

</summary>

<details>

<summary>

catch\_block: object {nodes, type }

</summary>

nodes: array of unknown

Child nodes (recursive).

<a href="#">Link to this property</a>

type: "block"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

finally\_block: object {nodes, type }

</summary>

nodes: array of unknown

Child nodes (recursive).

<a href="#">Link to this property</a>

type: "block"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

try\_block: object {nodes, type }

</summary>

nodes: array of unknown

Child nodes (recursive).

<a href="#">Link to this property</a>

type: "block"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: "try"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {nodes, type }

</summary>

nodes: array of unknown

Child nodes (recursive).

<a href="#">Link to this property</a>

type: "block"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {branches, type }

</summary>

<details>

<summary>

branches: array of object {condition, nodes }

</summary>

condition: string

<a href="#">Link to this property</a>

nodes: array of unknown

Child nodes (recursive).

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: "if"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {branches, discriminant, type }

</summary>

<details>

<summary>

branches: array of object {condition, nodes }

</summary>

condition: string

<a href="#">Link to this property</a>

nodes: array of unknown

Child nodes (recursive).

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

discriminant: string

<a href="#">Link to this property</a>

type: "switch"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {class\_name, functions, nodes, 2 more }

</summary>

class\_name: string

<a href="#">Link to this property</a>

<details>

<summary>

functions: map\[object {name, nodes, type } ]

</summary>

name: string

<a href="#">Link to this property</a>

nodes: array of unknown

Child nodes (recursive).

<a href="#">Link to this property</a>

type: "function\_def"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

nodes: array of unknown

Child nodes (recursive).

<a href="#">Link to this property</a>

type: "start"

<a href="#">Link to this property</a>

<details>

<summary>

payload: optional object {type } or object {fields, type }

Shape descriptor for JSON payloads.

</summary>

One of the following:

<details>

<summary>

Type object {type }

</summary>

type: "unknown"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {fields, type }

</summary>

fields: map\[unknown]

Nested JsonShape fields (recursive structure).

<a href="#">Link to this property</a>

type: "object"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {name, type, resolves, starts }

</summary>

name: string

<a href="#">Link to this property</a>

type: "function\_call"

<a href="#">Link to this property</a>

resolves: optional number

<a href="#">Link to this property</a>

starts: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {name, nodes, type }

</summary>

name: string

<a href="#">Link to this property</a>

nodes: array of unknown

Child nodes (recursive).

<a href="#">Link to this property</a>

type: "function\_def"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {kind, type }

</summary>

<details>

<summary>

kind: "break"or "return"

Break or return from a loop.

</summary>

One of the following:

"break"

<a href="#">Link to this property</a>

"return"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: "break"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

payload: optional object {type } or object {fields, type }

Shape descriptor for JSON payloads.

</summary>

One of the following:

<details>

<summary>

Type object {type }

</summary>

type: "unknown"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {fields, type }

</summary>

fields: map\[unknown]

Nested JsonShape fields (recursive structure).

<a href="#">Link to this property</a>

type: "object"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: string

formatdate-time

<a href="#">Link to this property</a>

workflow\_id: string

formatuuid

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workflows.versions%20%3E%20(method)%20graph%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

[Link to this property](#)%20workflows.versions%20%3E%20(method)%20graph%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result\_info: optional object {count, per\_page, total\_count, 3 more }

</summary>

count: number

<a href="#">Link to this property</a>

per\_page: number

<a href="#">Link to this property</a>

total\_count: number

<a href="#">Link to this property</a>

cursor: optional string

<a href="#">Link to this property</a>

page: optional number

<a href="#">Link to this property</a>

total\_pages: optional number

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workflows.versions%20%3E%20(method)%20graph%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### Get Workflow version graph

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workflows/$WORKFLOW_NAME/versions/$VERSION_ID/graph \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "errors": [],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "result": {
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "class_name": "class_name",
    "created_on": "2019-12-27T18:11:19.117Z",
    "graph": {
      "version": 0,
      "workflow": {
        "class_name": "class_name",
        "functions": {
          "foo": {
            "name": "name",
            "nodes": [
              {}
            ],
            "type": "function_def"
          }
        },
        "nodes": [
          {
            "duration": 0,
            "name": "name",
            "type": "step_sleep",
            "resolves": 0,
            "starts": 0
          }
        ],
        "payload": {
          "type": "unknown"
        }
      }
    },
    "modified_on": "2019-12-27T18:11:19.117Z",
    "workflow_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
  },
  "success": true,
  "result_info": {
    "count": 0,
    "per_page": 0,
    "total_count": 0,
    "cursor": "cursor",
    "page": 0,
    "total_pages": 0
  }
}
```

##### Returns Examples

200 example

```
{
  "errors": [],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "result": {
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "class_name": "class_name",
    "created_on": "2019-12-27T18:11:19.117Z",
    "graph": {
      "version": 0,
      "workflow": {
        "class_name": "class_name",
        "functions": {
          "foo": {
            "name": "name",
            "nodes": [
              {}
            ],
            "type": "function_def"
          }
        },
        "nodes": [
          {
            "duration": 0,
            "name": "name",
            "type": "step_sleep",
            "resolves": 0,
            "starts": 0
          }
        ],
        "payload": {
          "type": "unknown"
        }
      }
    },
    "modified_on": "2019-12-27T18:11:19.117Z",
    "workflow_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
  },
  "success": true,
  "result_info": {
    "count": 0,
    "per_page": 0,
    "total_count": 0,
    "cursor": "cursor",
    "page": 0,
    "total_pages": 0
  }
}
```