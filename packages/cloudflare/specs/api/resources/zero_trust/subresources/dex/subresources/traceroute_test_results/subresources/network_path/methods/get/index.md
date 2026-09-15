---
title: Get details for a specific traceroute test run
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[DEX](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex)

[Traceroute Test Results](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex/subresources/traceroute_test_results)

[Network Path](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex/subresources/traceroute_test_results/subresources/network_path)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get details for a specific traceroute test run

GET/accounts/{account\_id}/dex/traceroute-test-results/{test\_result\_id}/network-path

Get a breakdown of hops and performance metrics for a specific traceroute test run

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

[Link to this property](#)%20zero_trust.dex.traceroute_test_results.network_path%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

test\_result\_id: string

API Resource UUID tag.

maxLength36

[Link to this property](#)%20zero_trust.dex.traceroute_test_results.network_path%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20test_result_id%20%3E%20(schema)>)

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

[Link to this property](#)%20zero_trust.dex.traceroute_test_results.network_path%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20zero_trust.dex.traceroute_test_results.network_path%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20zero_trust.dex.traceroute_test_results.network_path%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {hops, resultId, colo, 6 more }

</summary>

<details>

<summary>

hops: array of object {ttl, asn, aso, 6 more }

An array of the hops taken by the device to reach the end destination.

</summary>

ttl: number

<a href="#">Link to this property</a>

asn: optional number

<a href="#">Link to this property</a>

aso: optional string

<a href="#">Link to this property</a>

ipAddress: optional string

<a href="#">Link to this property</a>

<details>

<summary>

location: optional object {city, state, zip }

</summary>

city: optional string

<a href="#">Link to this property</a>

state: optional string

<a href="#">Link to this property</a>

zip: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

mile: optional "client-to-app"or "client-to-cf-egress"or "client-to-cf-ingress"or "client-to-isp"

</summary>

One of the following:

"client-to-app"

<a href="#">Link to this property</a>

"client-to-cf-egress"

<a href="#">Link to this property</a>

"client-to-cf-ingress"

<a href="#">Link to this property</a>

"client-to-isp"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

packetLossPct: optional number

formatfloat

<a href="#">Link to this property</a>

rttMs: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

resultId: string

API Resource UUID tag.

maxLength36

<a href="#">Link to this property</a>

colo: optional string

Cloudflare colo airport code.

<a href="#">Link to this property</a>

deviceName: optional string

Name of the device associated with this network path response.

<a href="#">Link to this property</a>

<details>

<summary>

execution\_context: optional "EXECUTION\_CONTEXT\_INVALID"or "OUT\_OF\_TUNNEL"or "IN\_TUNNEL"

Whether the test was run inside or outside of the WARP tunnel.

</summary>

One of the following:

"EXECUTION\_CONTEXT\_INVALID"

<a href="#">Link to this property</a>

"OUT\_OF\_TUNNEL"

<a href="#">Link to this property</a>

"IN\_TUNNEL"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

testId: optional string

API Resource UUID tag.

maxLength36

<a href="#">Link to this property</a>

testName: optional string

Name of the traceroute test.

<a href="#">Link to this property</a>

time\_start: optional string

Timestamp indicating when the traceroute test execution began.

<a href="#">Link to this property</a>

tunnel\_type: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dex.traceroute_test_results.network_path%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Get details for a specific traceroute test run

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dex/traceroute-test-results/$TEST_RESULT_ID/network-path \
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
    "hops": [
      {
        "ttl": 0,
        "asn": 0,
        "aso": "aso",
        "ipAddress": "ipAddress",
        "location": {
          "city": "city",
          "state": "state",
          "zip": "zip"
        },
        "mile": "client-to-app",
        "name": "name",
        "packetLossPct": 0,
        "rttMs": 0
      }
    ],
    "resultId": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "colo": "SJC",
    "deviceName": "deviceName",
    "execution_context": "EXECUTION_CONTEXT_INVALID",
    "testId": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "testName": "testName",
    "time_start": "2023-07-16 15:00:00+00",
    "tunnel_type": "tunnel_type"
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
    "hops": [
      {
        "ttl": 0,
        "asn": 0,
        "aso": "aso",
        "ipAddress": "ipAddress",
        "location": {
          "city": "city",
          "state": "state",
          "zip": "zip"
        },
        "mile": "client-to-app",
        "name": "name",
        "packetLossPct": 0,
        "rttMs": 0
      }
    ],
    "resultId": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "colo": "SJC",
    "deviceName": "deviceName",
    "execution_context": "EXECUTION_CONTEXT_INVALID",
    "testId": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "testName": "testName",
    "time_start": "2023-07-16 15:00:00+00",
    "tunnel_type": "tunnel_type"
  }
}
```