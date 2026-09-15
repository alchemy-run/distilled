---
title: Endpoint Health Check
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Diagnostics](https://developers.cloudflare.com/api/resources/diagnostics)

[Endpoint Healthchecks](https://developers.cloudflare.com/api/resources/diagnostics/subresources/endpoint-healthchecks)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Endpoint Health Check

POST/accounts/{account\_id}/diagnostics/endpoint-healthchecks

Create Endpoint Health Check.

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

`Magic Transit Write`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier

maxLength32

[Link to this property](#)%20diagnostics.endpoint-healthchecks%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

check\_type: "icmp"

type of check to perform

[Link to this property](#)%20diagnostics.endpoint-healthchecks%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20check_type%20%3E%20(schema)>)

endpoint: string

the IP address of the host to perform checks against

[Link to this property](#)%20diagnostics.endpoint-healthchecks%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20endpoint%20%3E%20(schema)>)

name: optional string

Optional name associated with this check

[Link to this property](#)%20diagnostics.endpoint-healthchecks%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20name%20%3E%20(schema)>)

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

[Link to this property](#)%20diagnostics.endpoint-healthchecks%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20diagnostics.endpoint-healthchecks%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20diagnostics.endpoint-healthchecks%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {check\_type, endpoint, id, name }

</summary>

check\_type: "icmp"

type of check to perform

<a href="#">Link to this property</a>

endpoint: string

the IP address of the host to perform checks against

<a href="#">Link to this property</a>

id: optional string

UUID.

maxLength36

<a href="#">Link to this property</a>

name: optional string

Optional name associated with this check

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20diagnostics.endpoint-healthchecks%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Endpoint Health Check

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/diagnostics/endpoint-healthchecks \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "check_type": "icmp",
          "endpoint": "203.0.113.1",
          "name": "My Endpoint"
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
    "check_type": "icmp",
    "endpoint": "203.0.113.1",
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "name": "My Endpoint"
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
    "check_type": "icmp",
    "endpoint": "203.0.113.1",
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "name": "My Endpoint"
  }
}
```