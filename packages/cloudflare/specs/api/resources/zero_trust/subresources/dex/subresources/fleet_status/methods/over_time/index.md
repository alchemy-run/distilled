---
title: Get over time aggregate details for devices by dimension
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[DEX](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex)

[Fleet Status](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex/subresources/fleet_status)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get over time aggregate details for devices by dimension

GET/accounts/{account\_id}/dex/fleet-status/over-time

Get aggregate details for devices using WARP, up to 7 days.

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

[Link to this property](#)%20zero_trust.dex.fleet_status%20%3E%20(method)%20over_time%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

from: string

Start of the time range to query. Timestamp can be provided in ISO 8601 datetime format or milliseconds since epoch.

[Link to this property](#)%20zero_trust.dex.fleet_status%20%3E%20(method)%20over_time%20%3E%20(params)%20default%20%3E%20(param)%20from%20%3E%20(schema)>)

to: string

End of the time range to query. Timestamp can be provided in ISO 8601 datetime format or milliseconds since epoch.

[Link to this property](#)%20zero_trust.dex.fleet_status%20%3E%20(method)%20over_time%20%3E%20(params)%20default%20%3E%20(param)%20to%20%3E%20(schema)>)

colo: optional string

Cloudflare colo airport code.

[Link to this property](#)%20zero_trust.dex.fleet_status%20%3E%20(method)%20over_time%20%3E%20(params)%20default%20%3E%20(param)%20colo%20%3E%20(schema)>)

device\_id: optional string

Device-specific ID, given as UUID.

[Link to this property](#)%20zero_trust.dex.fleet_status%20%3E%20(method)%20over_time%20%3E%20(params)%20default%20%3E%20(param)%20device_id%20%3E%20(schema)>)

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

[Link to this property](#)%20zero_trust.dex.fleet_status%20%3E%20(method)%20over_time%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20zero_trust.dex.fleet_status%20%3E%20(method)%20over_time%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20zero_trust.dex.fleet_status%20%3E%20(method)%20over_time%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {deviceStats }

</summary>

<details>

<summary>

deviceStats: optional object {byMode, byStatus, uniqueDevicesTotal }

</summary>

<details>

<summary>

byMode: optional array of object {timestamp, uniqueDevicesTotal, value }

</summary>

timestamp: optional string

<a href="#">Link to this property</a>

uniqueDevicesTotal: optional number

Number of unique devices

<a href="#">Link to this property</a>

value: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

byStatus: optional array of object {timestamp, uniqueDevicesTotal, value }

</summary>

timestamp: optional string

<a href="#">Link to this property</a>

uniqueDevicesTotal: optional number

Number of unique devices

<a href="#">Link to this property</a>

value: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

uniqueDevicesTotal: optional number

Number of unique devices

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dex.fleet_status%20%3E%20(method)%20over_time%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Get over time aggregate details for devices by dimension

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dex/fleet-status/over-time \
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
    "deviceStats": {
      "byMode": [
        {
          "timestamp": "2023-10-11 00:00:00+00",
          "uniqueDevicesTotal": 0,
          "value": "value"
        }
      ],
      "byStatus": [
        {
          "timestamp": "2023-10-11 00:00:00+00",
          "uniqueDevicesTotal": 0,
          "value": "value"
        }
      ],
      "uniqueDevicesTotal": 0
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
    "deviceStats": {
      "byMode": [
        {
          "timestamp": "2023-10-11 00:00:00+00",
          "uniqueDevicesTotal": 0,
          "value": "value"
        }
      ],
      "byStatus": [
        {
          "timestamp": "2023-10-11 00:00:00+00",
          "uniqueDevicesTotal": 0,
          "value": "value"
        }
      ],
      "uniqueDevicesTotal": 0
    }
  }
}
```