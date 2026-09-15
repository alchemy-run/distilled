---
title: Fetch a specific dataset
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[DLP](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp)

[Datasets](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp/subresources/datasets)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Fetch a specific dataset

GET/accounts/{account\_id}/dlp/datasets/{dataset\_id}

Gets a dataset and its latest upload status.

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

`Zero Trust Read``Zero Trust Write`

##### P ath ParametersExpand Collapse

account\_id: string

[Link to this property](#)%20zero_trust.dlp.datasets%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

dataset\_id: string

formatuuid

[Link to this property](#)%20zero_trust.dlp.datasets%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20dataset_id%20%3E%20(schema)>)

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

[Link to this property](#)%20zero_trust.dlp.datasets%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20zero_trust.dlp.datasets%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20zero_trust.dlp.datasets%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dlp.datasets%20%3E%20(model)%20dataset%20%3E%20(schema)">Dataset</a> { id, columns, created\_at, 9 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

columns: array of object {entry\_id, header\_name, num\_cells, upload\_status }

</summary>

entry\_id: string

formatuuid

<a href="#">Link to this property</a>

header\_name: string

<a href="#">Link to this property</a>

num\_cells: number

formatint64

<a href="#">Link to this property</a>

<details>

<summary>

upload\_status: "empty"or "uploading"or "pending"or 3 more

</summary>

One of the following:

"empty"

<a href="#">Link to this property</a>

"uploading"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"processing"

<a href="#">Link to this property</a>

"failed"

<a href="#">Link to this property</a>

"complete"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

encoding\_version: number

formatint32

minimum0

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

num\_cells: number

formatint64

<a href="#">Link to this property</a>

secret: boolean

<a href="#">Link to this property</a>

<details>

<summary>

status: "empty"or "uploading"or "pending"or 3 more

</summary>

One of the following:

"empty"

<a href="#">Link to this property</a>

"uploading"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"processing"

<a href="#">Link to this property</a>

"failed"

<a href="#">Link to this property</a>

"complete"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated\_at: string

Stores when the dataset was last updated.

This includes name or description changes as well as uploads.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

uploads: array of object {num\_cells, status, version }

</summary>

num\_cells: number

formatint64

<a href="#">Link to this property</a>

<details>

<summary>

status: "empty"or "uploading"or "pending"or 3 more

</summary>

One of the following:

"empty"

<a href="#">Link to this property</a>

"uploading"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"processing"

<a href="#">Link to this property</a>

"failed"

<a href="#">Link to this property</a>

"complete"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

version: number

formatint64

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

case\_sensitive: optional boolean

<a href="#">Link to this property</a>

description: optional string

The description of the dataset.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dlp.datasets%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Fetch a specific dataset

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/datasets/$DATASET_ID \
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
  "success": true,
  "result": {
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "columns": [
      {
        "entry_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
        "header_name": "header_name",
        "num_cells": 0,
        "upload_status": "empty"
      }
    ],
    "created_at": "2019-12-27T18:11:19.117Z",
    "encoding_version": 0,
    "name": "name",
    "num_cells": 0,
    "secret": true,
    "status": "empty",
    "updated_at": "2019-12-27T18:11:19.117Z",
    "uploads": [
      {
        "num_cells": 0,
        "status": "empty",
        "version": 0
      }
    ],
    "case_sensitive": true,
    "description": "description"
  }
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
  "success": true,
  "result": {
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "columns": [
      {
        "entry_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
        "header_name": "header_name",
        "num_cells": 0,
        "upload_status": "empty"
      }
    ],
    "created_at": "2019-12-27T18:11:19.117Z",
    "encoding_version": 0,
    "name": "name",
    "num_cells": 0,
    "secret": true,
    "status": "empty",
    "updated_at": "2019-12-27T18:11:19.117Z",
    "uploads": [
      {
        "num_cells": 0,
        "status": "empty",
        "version": 0
      }
    ],
    "case_sensitive": true,
    "description": "description"
  }
}
```