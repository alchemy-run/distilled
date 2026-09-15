---
title: Get percentiles for a traceroute test
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[DEX](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex)

[Traceroute Tests](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex/subresources/traceroute_tests)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get percentiles for a traceroute test

GET/accounts/{account\_id}/dex/traceroute-tests/{test\_id}/percentiles

Get percentiles for a traceroute test for a given time period between 1 hour and 7 days.

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

`Cloudflare DEX Write``Cloudflare DEX Read``Zero Trust Report``Zero Trust Read`

##### P ath ParametersExpand Collapse

account\_id: string

Unique identifier linked to an account.

maxLength32

[Link to this property](#)%20zero_trust.dex.traceroute_tests%20%3E%20(method)%20percentiles%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

test\_id: string

API Resource UUID tag.

maxLength36

[Link to this property](#)%20zero_trust.dex.traceroute_tests%20%3E%20(method)%20percentiles%20%3E%20(params)%20default%20%3E%20(param)%20test_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

from: string

Start time for the query in ISO (RFC3339 - ISO 8601) format.

[Link to this property](#)%20zero_trust.dex.traceroute_tests%20%3E%20(method)%20percentiles%20%3E%20(params)%20default%20%3E%20(param)%20from%20%3E%20(schema)>)

to: string

End time for the query in ISO (RFC3339 - ISO 8601) format.

[Link to this property](#)%20zero_trust.dex.traceroute_tests%20%3E%20(method)%20percentiles%20%3E%20(params)%20default%20%3E%20(param)%20to%20%3E%20(schema)>)

colo: optional string

Optionally filter result stats to a Cloudflare colo. Cannot be used in combination with deviceId param.

[Link to this property](#)%20zero_trust.dex.traceroute_tests%20%3E%20(method)%20percentiles%20%3E%20(params)%20default%20%3E%20(param)%20colo%20%3E%20(schema)>)

deviceId: optional array of string

Optionally filter result stats to a specific device(s). Cannot be used in combination with colo param.

[Link to this property](#)%20zero_trust.dex.traceroute_tests%20%3E%20(method)%20percentiles%20%3E%20(params)%20default%20%3E%20(param)%20deviceId%20%3E%20(schema)>)

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

[Link to this property](#)%20zero_trust.dex.traceroute_tests%20%3E%20(method)%20percentiles%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20zero_trust.dex.traceroute_tests%20%3E%20(method)%20percentiles%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20zero_trust.dex.traceroute_tests%20%3E%20(method)%20percentiles%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {hopsCount, packetLossPct, roundTripTimeMs }

</summary>

<details>

<summary>

hopsCount: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dex%20%3E%20(model)%20percentiles%20%3E%20(schema)">Percentiles</a> { p50, p90, p95, p99 }

</summary>

p50: optional number

p50 observed in the time period.

<a href="#">Link to this property</a>

p90: optional number

p90 observed in the time period.

<a href="#">Link to this property</a>

p95: optional number

p95 observed in the time period.

<a href="#">Link to this property</a>

p99: optional number

p99 observed in the time period.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

packetLossPct: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dex%20%3E%20(model)%20percentiles%20%3E%20(schema)">Percentiles</a> { p50, p90, p95, p99 }

</summary>

p50: optional number

p50 observed in the time period.

<a href="#">Link to this property</a>

p90: optional number

p90 observed in the time period.

<a href="#">Link to this property</a>

p95: optional number

p95 observed in the time period.

<a href="#">Link to this property</a>

p99: optional number

p99 observed in the time period.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

roundTripTimeMs: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dex%20%3E%20(model)%20percentiles%20%3E%20(schema)">Percentiles</a> { p50, p90, p95, p99 }

</summary>

p50: optional number

p50 observed in the time period.

<a href="#">Link to this property</a>

p90: optional number

p90 observed in the time period.

<a href="#">Link to this property</a>

p95: optional number

p95 observed in the time period.

<a href="#">Link to this property</a>

p99: optional number

p99 observed in the time period.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dex.traceroute_tests%20%3E%20(method)%20percentiles%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Get percentiles for a traceroute test

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dex/traceroute-tests/$TEST_ID/percentiles \
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
    "hopsCount": {
      "p50": 0,
      "p90": 0,
      "p95": 0,
      "p99": 0
    },
    "packetLossPct": {
      "p50": 0,
      "p90": 0,
      "p95": 0,
      "p99": 0
    },
    "roundTripTimeMs": {
      "p50": 0,
      "p90": 0,
      "p95": 0,
      "p99": 0
    }
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
    "hopsCount": {
      "p50": 0,
      "p90": 0,
      "p95": 0,
      "p99": 0
    },
    "packetLossPct": {
      "p50": 0,
      "p90": 0,
      "p95": 0,
      "p99": 0
    },
    "roundTripTimeMs": {
      "p50": 0,
      "p90": 0,
      "p95": 0,
      "p99": 0
    }
  }
}
```