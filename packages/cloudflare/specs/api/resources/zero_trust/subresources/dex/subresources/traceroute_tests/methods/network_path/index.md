---
title: Get network path breakdown for a traceroute test
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

# Get network path breakdown for a traceroute test

GET/accounts/{account\_id}/dex/traceroute-tests/{test\_id}/network-path

Get a breakdown of metrics by hop for individual traceroute test runs.

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

[Link to this property](#)%20zero_trust.dex.traceroute_tests%20%3E%20(method)%20network_path%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

test\_id: string

API Resource UUID tag.

maxLength36

[Link to this property](#)%20zero_trust.dex.traceroute_tests%20%3E%20(method)%20network_path%20%3E%20(params)%20default%20%3E%20(param)%20test_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

deviceId: string

Device to filter traceroute result runs to.

[Link to this property](#)%20zero_trust.dex.traceroute_tests%20%3E%20(method)%20network_path%20%3E%20(params)%20default%20%3E%20(param)%20deviceId%20%3E%20(schema)>)

from: string

Start time for aggregate metrics in ISO ms.

[Link to this property](#)%20zero_trust.dex.traceroute_tests%20%3E%20(method)%20network_path%20%3E%20(params)%20default%20%3E%20(param)%20from%20%3E%20(schema)>)

<details>

<summary>

interval: "minute"or "hour"

Time interval for aggregate time slots.

</summary>

One of the following:

"minute"

<a href="#">Link to this property</a>

"hour"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dex.traceroute_tests%20%3E%20(method)%20network_path%20%3E%20(params)%20default%20%3E%20(param)%20interval%20%3E%20(schema)>)

to: string

End time for aggregate metrics in ISO ms.

[Link to this property](#)%20zero_trust.dex.traceroute_tests%20%3E%20(method)%20network_path%20%3E%20(params)%20default%20%3E%20(param)%20to%20%3E%20(schema)>)

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

[Link to this property](#)%20zero_trust.dex.traceroute_tests%20%3E%20(method)%20network_path%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20zero_trust.dex.traceroute_tests%20%3E%20(method)%20network_path%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20zero_trust.dex.traceroute_tests%20%3E%20(method)%20network_path%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dex%20%3E%20(model)%20network_path_response%20%3E%20(schema)">NetworkPathResponse</a> { id, deviceName, interval, 4 more }

</summary>

id: string

API Resource UUID tag.

maxLength36

<a href="#">Link to this property</a>

deviceName: optional string

Name of the device that ran the test.

<a href="#">Link to this property</a>

interval: optional string

The interval at which the Traceroute synthetic application test is set to run.

<a href="#">Link to this property</a>

kind: optional "traceroute"

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

<details>

<summary>

networkPath: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dex%20%3E%20(model)%20network_path%20%3E%20(schema)">NetworkPath</a> { slots, sampling }

</summary>

<details>

<summary>

slots: array of object {id, clientToAppRttMs, clientToCfEgressRttMs, 3 more }

</summary>

id: string

API Resource UUID tag.

maxLength36

<a href="#">Link to this property</a>

clientToAppRttMs: number

Round trip time in ms of the client to app mile

<a href="#">Link to this property</a>

clientToCfEgressRttMs: number

Round trip time in ms of the client to Cloudflare egress mile

<a href="#">Link to this property</a>

clientToCfIngressRttMs: number

Round trip time in ms of the client to Cloudflare ingress mile

<a href="#">Link to this property</a>

timestamp: string

<a href="#">Link to this property</a>

clientToIspRttMs: optional number

Round trip time in ms of the client to ISP mile

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

sampling: optional object {unit, value }

Specifies the sampling applied, if any, to the slots response. When sampled, results shown represent the first test run to the start of each sampling interval.

</summary>

unit: "hours"

<a href="#">Link to this property</a>

value: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

url: optional string

The host of the Traceroute synthetic application test.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dex.traceroute_tests%20%3E%20(method)%20network_path%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Get network path breakdown for a traceroute test

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dex/traceroute-tests/$TEST_ID/network-path \
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
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "deviceName": "deviceName",
    "interval": "0h5m0s",
    "kind": "traceroute",
    "name": "name",
    "networkPath": {
      "slots": [
        {
          "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
          "clientToAppRttMs": 0,
          "clientToCfEgressRttMs": 0,
          "clientToCfIngressRttMs": 0,
          "timestamp": "2023-07-16 15:00:00+00",
          "clientToIspRttMs": 0
        }
      ],
      "sampling": {
        "unit": "hours",
        "value": 0
      }
    },
    "url": "1.1.1.1"
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
    "deviceName": "deviceName",
    "interval": "0h5m0s",
    "kind": "traceroute",
    "name": "name",
    "networkPath": {
      "slots": [
        {
          "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
          "clientToAppRttMs": 0,
          "clientToCfEgressRttMs": 0,
          "clientToCfIngressRttMs": 0,
          "timestamp": "2023-07-16 15:00:00+00",
          "clientToIspRttMs": 0
        }
      ],
      "sampling": {
        "unit": "hours",
        "value": 0
      }
    },
    "url": "1.1.1.1"
  }
}
```