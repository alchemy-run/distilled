---
title: Create Internal DNS View
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[DNS](https://developers.cloudflare.com/api/resources/dns)

[Settings](https://developers.cloudflare.com/api/resources/dns/subresources/settings)

[Account](https://developers.cloudflare.com/api/resources/dns/subresources/settings/subresources/account)

[Views](https://developers.cloudflare.com/api/resources/dns/subresources/settings/subresources/account/subresources/views)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Create Internal DNS View

POST/accounts/{account\_id}/dns\_settings/views

Create Internal DNS View for an account

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

`DNS View Write`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier.

maxLength32

[Link to this property](#)%20dns.settings.account.views%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

name: string

The name of the view.

maxLength255

minLength1

[Link to this property](#)%20dns.settings.account.views%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20name%20%3E%20(schema)>)

zones: array of string

The list of zones linked to this view.

[Link to this property](#)%20dns.settings.account.views%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20zones%20%3E%20(schema)>)

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

[Link to this property](#)%20dns.settings.account.views%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20dns.settings.account.views%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20dns.settings.account.views%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {id, created\_time, modified\_time, 2 more }

</summary>

id: string

Identifier.

maxLength32

<a href="#">Link to this property</a>

created\_time: string

When the view was created.

formatdate-time

<a href="#">Link to this property</a>

modified\_time: string

When the view was last modified.

formatdate-time

<a href="#">Link to this property</a>

name: string

The name of the view.

maxLength255

minLength1

<a href="#">Link to this property</a>

zones: array of string

The list of zones linked to this view.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dns.settings.account.views%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Create Internal DNS View

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dns_settings/views \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "my view",
          "zones": [
            "372e67954025e0ba6aaa6d586b9e0b59"
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
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "created_time": "2014-01-01T05:20:00.12345Z",
    "modified_time": "2014-01-01T05:20:00.12345Z",
    "name": "my view",
    "zones": [
      "372e67954025e0ba6aaa6d586b9e0b59"
    ]
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
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "created_time": "2014-01-01T05:20:00.12345Z",
    "modified_time": "2014-01-01T05:20:00.12345Z",
    "name": "my view",
    "zones": [
      "372e67954025e0ba6aaa6d586b9e0b59"
    ]
  }
}
```