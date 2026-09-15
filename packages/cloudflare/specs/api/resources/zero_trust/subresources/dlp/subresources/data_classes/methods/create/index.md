---
title: Creates a new data class
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[DLP](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp)

[Data Classes](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp/subresources/data_classes)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Creates a new data class

POST/accounts/{account\_id}/dlp/data\_classes

Creates a data class for use in DLP profiles.

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

[Link to this property](#)%20zero_trust.dlp.data_classes%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

data\_tags: array of string

[Link to this property](#)%20zero_trust.dlp.data_classes%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20data_tags%20%3E%20(schema)>)

expression: string

[Link to this property](#)%20zero_trust.dlp.data_classes%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20expression%20%3E%20(schema)>)

name: string

[Link to this property](#)%20zero_trust.dlp.data_classes%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20name%20%3E%20(schema)>)

<details>

<summary>

sensitivity\_levels: array of object {group\_id, level\_id }

</summary>

group\_id: string

formatuuid

<a href="#">Link to this property</a>

level\_id: string

formatuuid

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dlp.data_classes%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20sensitivity_levels%20%3E%20(schema)>)

description: optional string

[Link to this property](#)%20zero_trust.dlp.data_classes%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20description%20%3E%20(schema)>)

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

[Link to this property](#)%20zero_trust.dlp.data_classes%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20zero_trust.dlp.data_classes%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20zero_trust.dlp.data_classes%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {id, created\_at, data\_tags, 5 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

data\_tags: array of string

<a href="#">Link to this property</a>

expression: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

<details>

<summary>

sensitivity\_levels: array of object {group\_id, level\_id }

</summary>

group\_id: string

formatuuid

<a href="#">Link to this property</a>

level\_id: string

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated\_at: string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dlp.data_classes%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Creates a new data class

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/data_classes \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "data_tags": [
            "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
          ],
          "expression": "expression",
          "name": "name",
          "sensitivity_levels": [
            {
              "group_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
              "level_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
            }
          ]
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
  "result": {
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "created_at": "2019-12-27T18:11:19.117Z",
    "data_tags": [
      "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
    ],
    "expression": "expression",
    "name": "name",
    "sensitivity_levels": [
      {
        "group_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
        "level_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
      }
    ],
    "updated_at": "2019-12-27T18:11:19.117Z",
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
    "created_at": "2019-12-27T18:11:19.117Z",
    "data_tags": [
      "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
    ],
    "expression": "expression",
    "name": "name",
    "sensitivity_levels": [
      {
        "group_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
        "level_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
      }
    ],
    "updated_at": "2019-12-27T18:11:19.117Z",
    "description": "description"
  }
}
```