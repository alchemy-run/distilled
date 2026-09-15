---
title: List Request Assets
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Cloudforce One](https://developers.cloudflare.com/api/resources/cloudforce_one)

[Requests](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/requests)

[Assets](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/requests/subresources/assets)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List Request Assets

POST/accounts/{account\_id}/cloudforce-one/requests/{request\_id}/asset

Lists assets attached to a Cloudforce One intelligence request.

##### Security

API Email + API Key

The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**`X-Auth-Email: user@example.com`

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**`X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194`

##### Accepted Permissions (at least one required)

`Cloudforce One Write`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier.

maxLength32

[Link to this property](#)%20cloudforce_one.requests.assets%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

request\_id: string

UUID.

maxLength36

[Link to this property](#)%20cloudforce_one.requests.assets%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20request_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

page: number

Page number of results.

[Link to this property](#)%20cloudforce_one.requests.assets%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: number

Number of results per page.

[Link to this property](#)%20cloudforce_one.requests.assets%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20per_page%20%3E%20(schema)>)

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

[Link to this property](#)%20cloudforce_one.requests.assets%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20cloudforce_one.requests.assets%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20cloudforce_one.requests.assets%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional array of object {id, name, created, 2 more }

</summary>

id: number

Asset ID.

<a href="#">Link to this property</a>

name: string

Asset name.

<a href="#">Link to this property</a>

created: optional string

Defines the asset creation time.

formatdate-time

<a href="#">Link to this property</a>

description: optional string

Asset description.

<a href="#">Link to this property</a>

file\_type: optional string

Asset file type.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.requests.assets%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### List Request Assets

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/requests/$REQUEST_ID/asset \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "page": 0,
          "per_page": 10
        }'
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
      "id": 0,
      "name": "example.docx",
      "created": "2022-01-01T00:00:00Z",
      "description": "example description",
      "file_type": "docx"
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
      "id": 0,
      "name": "example.docx",
      "created": "2022-01-01T00:00:00Z",
      "description": "example description",
      "file_type": "docx"
    }
  ]
}
```