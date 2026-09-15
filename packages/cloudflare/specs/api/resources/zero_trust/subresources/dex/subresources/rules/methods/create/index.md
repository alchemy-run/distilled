---
title: Create a DEX Rule
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[DEX](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex)

[Rules](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex/subresources/rules)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Create a DEX Rule

POST/accounts/{account\_id}/dex/rules

Create a DEX Rule.

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

`Cloudflare DEX Write`

##### P ath ParametersExpand Collapse

account\_id: string

Unique identifier linked to an account.

maxLength32

[Link to this property](#)%20zero_trust.dex.rules%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

match: string

The wirefilter expression to match.

[Link to this property](#)%20zero_trust.dex.rules%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20match%20%3E%20(schema)>)

name: string

The name of the Rule.

[Link to this property](#)%20zero_trust.dex.rules%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20name%20%3E%20(schema)>)

description: optional string

[Link to this property](#)%20zero_trust.dex.rules%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20description%20%3E%20(schema)>)

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

[Link to this property](#)%20zero_trust.dex.rules%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20zero_trust.dex.rules%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20zero_trust.dex.rules%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {id, created\_at, match, 4 more }

</summary>

id: string

API Resource UUID tag.

maxLength36

<a href="#">Link to this property</a>

created\_at: string

<a href="#">Link to this property</a>

match: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

<details>

<summary>

targeted\_tests: optional array of object {data, enabled, name, test\_id }

</summary>

<details>

<summary>

data: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.devices.dex_tests%20%3E%20(model)%20schema_data%20%3E%20(schema)">SchemaData</a> { host, kind, method }

The configuration object which contains the details for the WARP client to conduct the test.

</summary>

host: string

The desired endpoint to test.

<a href="#">Link to this property</a>

<details>

<summary>

kind: "http"or "traceroute"

The type of test.

</summary>

One of the following:

"http"

<a href="#">Link to this property</a>

"traceroute"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

method: optional "GET"

The HTTP request method type.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

enabled: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

test\_id: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated\_at: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dex.rules%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Create a DEX Rule

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dex/rules \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "match": "match",
          "name": "name"
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
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "created_at": "2023-07-16 15:00:00+00",
    "match": "match",
    "name": "name",
    "description": "description",
    "targeted_tests": [
      {
        "data": {
          "host": "https://dash.cloudflare.com",
          "kind": "http",
          "method": "GET"
        },
        "enabled": true,
        "name": "name",
        "test_id": "test_id"
      }
    ],
    "updated_at": "2023-07-16 15:00:00+00"
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
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "created_at": "2023-07-16 15:00:00+00",
    "match": "match",
    "name": "name",
    "description": "description",
    "targeted_tests": [
      {
        "data": {
          "host": "https://dash.cloudflare.com",
          "kind": "http",
          "method": "GET"
        },
        "enabled": true,
        "name": "name",
        "test_id": "test_id"
      }
    ],
    "updated_at": "2023-07-16 15:00:00+00"
  }
}
```