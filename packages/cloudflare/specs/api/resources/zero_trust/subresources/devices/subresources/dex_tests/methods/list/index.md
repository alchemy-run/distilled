---
title: List Device DEX tests
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Devices](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices)

[DEX Tests](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices/subresources/dex_tests)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List Device DEX tests

GET/accounts/{account\_id}/dex/devices/dex\_tests

Fetch all DEX tests.

##### Security

API Email + API Key

The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**`X-Auth-Email: user@example.com`

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**`X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194`

##### Accepted Permissions (at least one required)

`Cloudflare DEX Write``Cloudflare DEX Read``Zero Trust Report``Zero Trust Read`

##### P ath ParametersExpand Collapse

account\_id: string

Unique identifier linked to an account.

maxLength32

[Link to this property](#)%20zero_trust.devices.dex_tests%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

<details>

<summary>

kind: optional "http"or "traceroute"

Filter by test type.

</summary>

One of the following:

"http"

<a href="#">Link to this property</a>

"traceroute"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.devices.dex_tests%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20kind%20%3E%20(schema)>)

page: optional number

Page number of paginated results.

minimum1

[Link to this property](#)%20zero_trust.devices.dex_tests%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: optional number

Number of results per page.

maximum50

minimum1

[Link to this property](#)%20zero_trust.devices.dex_tests%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

testName: optional string

Filter by test name.

[Link to this property](#)%20zero_trust.devices.dex_tests%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20testName%20%3E%20(schema)>)

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

[Link to this property](#)%20zero_trust.devices.dex_tests%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20zero_trust.devices.dex_tests%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20zero_trust.devices.dex_tests%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional array of <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.devices.dex_tests%20%3E%20(model)%20schema_http%20%3E%20(schema)">SchemaHTTP</a> { data, enabled, interval, 7 more }

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

Determines whether or not the test is active.

<a href="#">Link to this property</a>

interval: string

How often the test will run.

<a href="#">Link to this property</a>

name: string

The name of the DEX test. Must be unique.

<a href="#">Link to this property</a>

created: optional string

Date the test was created, in RFC 3339 format.

formatdate-time

<a href="#">Link to this property</a>

description: optional string

Additional details about the test.

<a href="#">Link to this property</a>

<details>

<summary>

target\_policies: optional array of object {id, default, name }

DEX rules targeted by this test

</summary>

id: string

The id of the DEX rule.

maxLength36

<a href="#">Link to this property</a>

default: optional boolean

Whether the DEX rule is the account default.

<a href="#">Link to this property</a>

name: optional string

The name of the DEX rule.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

targeted: optional boolean

<a href="#">Link to this property</a>

test\_id: optional string

The unique identifier for the test.

maxLength32

<a href="#">Link to this property</a>

updated: optional string

Date the test was last updated, in RFC 3339 format.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.devices.dex_tests%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### List Device DEX tests

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dex/devices/dex_tests \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
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
      "data": {
        "host": "https://dash.cloudflare.com",
        "kind": "http",
        "method": "GET"
      },
      "enabled": true,
      "interval": "30m",
      "name": "HTTP dash health check",
      "created": "2023-10-11T00:00:00Z",
      "description": "Checks the dash endpoint every 30 minutes",
      "target_policies": [
        {
          "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
          "default": true,
          "name": "name"
        }
      ],
      "targeted": true,
      "test_id": "372e67954025e0ba6aaa6d586b9e0b59",
      "updated": "2023-10-11T00:00:00Z"
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
      "data": {
        "host": "https://dash.cloudflare.com",
        "kind": "http",
        "method": "GET"
      },
      "enabled": true,
      "interval": "30m",
      "name": "HTTP dash health check",
      "created": "2023-10-11T00:00:00Z",
      "description": "Checks the dash endpoint every 30 minutes",
      "target_policies": [
        {
          "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
          "default": true,
          "name": "name"
        }
      ],
      "targeted": true,
      "test_id": "372e67954025e0ba6aaa6d586b9e0b59",
      "updated": "2023-10-11T00:00:00Z"
    }
  ]
}
```