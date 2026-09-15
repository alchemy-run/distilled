---
title: Get Pipeline Details
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Pipelines](https://developers.cloudflare.com/api/resources/pipelines)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get Pipeline Details

GET/accounts/{account\_id}/pipelines/v1/pipelines/{pipeline\_id}

Get Pipeline details.

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

`Pipelines Write``Pipelines Read`

##### P ath ParametersExpand Collapse

account\_id: string

Specifies the public ID of the account.

[Link to this property](#)%20pipelines%20%3E%20(method)%20get_v1%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

pipeline\_id: string

Specifies the public ID of the pipeline.

maxLength32

minLength32

[Link to this property](#)%20pipelines%20%3E%20(method)%20get_v1%20%3E%20(params)%20default%20%3E%20(param)%20pipeline_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {id, created\_at, modified\_at, 5 more }

</summary>

id: string

Indicates a unique identifier for this pipeline.

<a href="#">Link to this property</a>

created\_at: string

<a href="#">Link to this property</a>

modified\_at: string

<a href="#">Link to this property</a>

name: string

Indicates the name of the Pipeline.

maxLength128

minLength1

<a href="#">Link to this property</a>

sql: string

Specifies SQL for the Pipeline processing flow.

<a href="#">Link to this property</a>

status: string

Indicates the current status of the Pipeline.

<a href="#">Link to this property</a>

<details>

<summary>

tables: array of object {id, latest, name, 2 more }

List of streams and sinks used by this pipeline.

</summary>

id: string

Unique identifier for the connection (stream or sink).

<a href="#">Link to this property</a>

latest: number

Latest available version of the connection.

<a href="#">Link to this property</a>

name: string

Name of the connection.

maxLength128

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

type: "stream"or "sink"

Type of the connection.

</summary>

One of the following:

"stream"

<a href="#">Link to this property</a>

"sink"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

version: number

Current version of the connection used by this pipeline.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

failure\_reason: optional string

Indicates the reason for the failure of the Pipeline.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20pipelines%20%3E%20(method)%20get_v1%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

Indicates whether the API call was successful.

[Link to this property](#)%20pipelines%20%3E%20(method)%20get_v1%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get Pipeline Details

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pipelines/v1/pipelines/$PIPELINE_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": {
    "id": "01234567890123457689012345678901",
    "created_at": "created_at",
    "modified_at": "modified_at",
    "name": "my_pipeline",
    "sql": "insert into sink select * from source;",
    "status": "status",
    "tables": [
      {
        "id": "1c9200d5872c018bb34e93e2cd8a438e",
        "latest": 5,
        "name": "my_table",
        "type": "stream",
        "version": 4
      }
    ],
    "failure_reason": "failure_reason"
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "result": {
    "id": "01234567890123457689012345678901",
    "created_at": "created_at",
    "modified_at": "modified_at",
    "name": "my_pipeline",
    "sql": "insert into sink select * from source;",
    "status": "status",
    "tables": [
      {
        "id": "1c9200d5872c018bb34e93e2cd8a438e",
        "latest": 5,
        "name": "my_table",
        "type": "stream",
        "version": 4
      }
    ],
    "failure_reason": "failure_reason"
  },
  "success": true
}
```