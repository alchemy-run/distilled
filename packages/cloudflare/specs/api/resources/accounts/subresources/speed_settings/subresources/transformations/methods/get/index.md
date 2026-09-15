---
title: List Image Resizing configurations for account
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Accounts](https://developers.cloudflare.com/api/resources/accounts)

[Speed Settings](https://developers.cloudflare.com/api/resources/accounts/subresources/speed_settings)

[Transformations](https://developers.cloudflare.com/api/resources/accounts/subresources/speed_settings/subresources/transformations)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List Image Resizing configurations for account

GET/accounts/{account\_id}/settings/transformations

Returns a list of Image Resizing configurations across all zones for the account. This endpoint is useful for retrieving the transformations (image\_resizing) state for all zones belonging to an account.

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

`Zone Settings Write``Zone Settings Read`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier.

maxLength32

[Link to this property](#)%20accounts.speed_settings.transformations%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20response_info%20%3E%20(schema)">ResponseInfo</a> { code, message, documentation\_url, source }

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

[Link to this property](#)%20accounts.speed_settings.transformations%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20response_info%20%3E%20(schema)">ResponseInfo</a> { code, message, documentation\_url, source }

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

[Link to this property](#)%20accounts.speed_settings.transformations%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: boolean

Whether the API call was successful.

[Link to this property](#)%20accounts.speed_settings.transformations%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional array of <a href="https://developers.cloudflare.com/api/resources/accounts#(resource)%20accounts.speed_settings.transformations%20%3E%20(model)%20transformations_config%20%3E%20(schema)">TransformationsConfig</a> { id, cf\_zone\_tag, editable, 2 more }

</summary>

id: optional string

Feature identifier.

<a href="#">Link to this property</a>

cf\_zone\_tag: optional string

Zone tag identifier.

<a href="#">Link to this property</a>

editable: optional boolean

Whether this setting can be modified.

<a href="#">Link to this property</a>

modified\_on: optional string

When this setting was last modified.

formatdate-time

<a href="#">Link to this property</a>

value: optional string

Current value of the feature setting.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20accounts.speed_settings.transformations%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### List Image Resizing configurations for account

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/settings/transformations \
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
  "result": [
    {
      "id": "image_resizing",
      "cf_zone_tag": "023e105f4ecef8ad9ca31a8372d0c353",
      "editable": true,
      "modified_on": "2024-01-15T10:30:00Z",
      "value": "on"
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
      "id": "image_resizing",
      "cf_zone_tag": "023e105f4ecef8ad9ca31a8372d0c353",
      "editable": true,
      "modified_on": "2024-01-15T10:30:00Z",
      "value": "on"
    }
  ]
}
```