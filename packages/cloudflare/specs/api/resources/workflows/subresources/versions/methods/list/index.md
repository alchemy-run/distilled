---
title: List deployed Workflow versions
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Workflows](https://developers.cloudflare.com/api/resources/workflows)

[Versions](https://developers.cloudflare.com/api/resources/workflows/subresources/versions)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List deployed Workflow versions

GET/accounts/{account\_id}/workflows/{workflow\_name}/versions

Lists all deployed versions of a workflow.

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

[Link to this property](#)%20workflows.versions%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

workflow\_name: string

maxLength64

minLength1

[Link to this property](#)%20workflows.versions%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20workflow_name%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

page: optional number

minimum1

[Link to this property](#)%20workflows.versions%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: optional number

maximum100

minimum1

[Link to this property](#)%20workflows.versions%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

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

[Link to this property](#)%20workflows.versions%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {code, message }

</summary>

code: number

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workflows.versions%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: array of object {id, class\_name, created\_on, 7 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

class\_name: string

<a href="#">Link to this property</a>

created\_on: string

formatdate-time

<a href="#">Link to this property</a>

has\_dag: boolean

<a href="#">Link to this property</a>

<details>

<summary>

language: "javascript"or "python"

The programming language of the workflow implementation.

</summary>

One of the following:

"javascript"

<a href="#">Link to this property</a>

"python"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: string

formatdate-time

<a href="#">Link to this property</a>

workflow\_id: string

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

concurrency: optional object {limit }

</summary>

limit: optional number

Maximum number of instances of this workflow that can run concurrently. Additional instances are queued and started as running instances complete. Must not exceed the account concurrency limit.

maximum9007199254740991

minimum1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

default\_retention: optional object {error\_retention, success\_retention }

</summary>

error\_retention: optional number

Default error retention in milliseconds.

maximum9007199254740991

minimum-9007199254740991

<a href="#">Link to this property</a>

success\_retention: optional number

Default success retention in milliseconds.

maximum9007199254740991

minimum-9007199254740991

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

limits: optional object {steps }

</summary>

steps: optional number

maximum9007199254740991

minimum1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workflows.versions%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

[Link to this property](#)%20workflows.versions%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

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

[Link to this property](#)%20workflows.versions%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### List deployed Workflow versions

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workflows/$WORKFLOW_NAME/versions \
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
  "result": [
    {
      "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "class_name": "class_name",
      "created_on": "2019-12-27T18:11:19.117Z",
      "has_dag": true,
      "language": "javascript",
      "modified_on": "2019-12-27T18:11:19.117Z",
      "workflow_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "concurrency": {
        "limit": 1
      },
      "default_retention": {
        "error_retention": -9007199254740991,
        "success_retention": -9007199254740991
      },
      "limits": {
        "steps": 1
      }
    }
  ],
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
  "result": [
    {
      "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "class_name": "class_name",
      "created_on": "2019-12-27T18:11:19.117Z",
      "has_dag": true,
      "language": "javascript",
      "modified_on": "2019-12-27T18:11:19.117Z",
      "workflow_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "concurrency": {
        "limit": 1
      },
      "default_retention": {
        "error_retention": -9007199254740991,
        "success_retention": -9007199254740991
      },
      "limits": {
        "steps": 1
      }
    }
  ],
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