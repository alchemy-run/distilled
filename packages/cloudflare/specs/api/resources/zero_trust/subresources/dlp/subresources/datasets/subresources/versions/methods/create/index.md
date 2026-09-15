---
title: Sets the column information for a multi-column upload
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[DLP](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp)

[Datasets](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp/subresources/datasets)

[Versions](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp/subresources/datasets/subresources/versions)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Sets the column information for a multi-column upload

POST/accounts/{account\_id}/dlp/datasets/{dataset\_id}/versions/{version}

This is used for multi-column EDMv2 datasets. The EDMv2 format can only be created in the Cloudflare dashboard. The columns in the response appear in the same order as in the request.

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

`Zero Trust Write`

##### P ath ParametersExpand Collapse

account\_id: string

[Link to this property](#)%20zero_trust.dlp.datasets.versions%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

dataset\_id: string

formatuuid

[Link to this property](#)%20zero_trust.dlp.datasets.versions%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20dataset_id%20%3E%20(schema)>)

version: number

formatint64

[Link to this property](#)%20zero_trust.dlp.datasets.versions%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20version%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

<details>

<summary>

body: array of object {entry\_id, header\_name, num\_cells } or object {entry\_name, header\_name, num\_cells }

</summary>

One of the following:

<details>

<summary>

ExistingColumn object {entry\_id, header\_name, num\_cells }

</summary>

entry\_id: string

formatuuid

<a href="#">Link to this property</a>

header\_name: optional string

<a href="#">Link to this property</a>

num\_cells: optional number

formatint64

minimum0

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

NewColumn object {entry\_name, header\_name, num\_cells }

</summary>

entry\_name: string

<a href="#">Link to this property</a>

header\_name: optional string

<a href="#">Link to this property</a>

num\_cells: optional number

formatint64

minimum0

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dlp.datasets.versions%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20body%20%3E%20(schema)>)

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

[Link to this property](#)%20zero_trust.dlp.datasets.versions%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20zero_trust.dlp.datasets.versions%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20zero_trust.dlp.datasets.versions%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional array of object {entry\_id, header\_name, num\_cells, upload\_status }

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

[Link to this property](#)%20zero_trust.dlp.datasets.versions%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Sets the column information for a multi-column upload

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/datasets/$DATASET_ID/versions/$VERSION \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '[
          {
            "entry_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
            "header_name": "header_name",
            "num_cells": 0
          }
        ]'
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
  "result": [
    {
      "entry_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "header_name": "header_name",
      "num_cells": 0,
      "upload_status": "empty"
    }
  ]
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
  "result": [
    {
      "entry_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "header_name": "header_name",
      "num_cells": 0,
      "upload_status": "empty"
    }
  ]
}
```