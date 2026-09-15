---
title: List devices eligible for remote captures
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[DEX](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex)

[Commands](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex/subresources/commands)

[Devices](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex/subresources/commands/subresources/devices)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List devices eligible for remote captures

GET/accounts/{account\_id}/dex/commands/devices

List devices with WARP client support for remote captures which have been connected in the last 1 hour.

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

[Link to this property](#)%20zero_trust.dex.commands.devices%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

page: number

Page number of paginated results.

minimum1

[Link to this property](#)%20zero_trust.dex.commands.devices%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: number

Number of results per page.

maximum50

minimum1

[Link to this property](#)%20zero_trust.dex.commands.devices%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

search: optional string

Filter devices by name or email.

[Link to this property](#)%20zero_trust.dex.commands.devices%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20search%20%3E%20(schema)>)

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

[Link to this property](#)%20zero_trust.dex.commands.devices%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20zero_trust.dex.commands.devices%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20zero_trust.dex.commands.devices%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {devices }

</summary>

<details>

<summary>

devices: optional array of object {deviceId, deviceName, eligible, 7 more }

List of eligible devices

</summary>

deviceId: optional string

Device identifier (UUID v4)

<a href="#">Link to this property</a>

deviceName: optional string

Device identifier (human readable)

<a href="#">Link to this property</a>

eligible: optional boolean

Whether the device is eligible for remote captures

<a href="#">Link to this property</a>

ineligibleReason: optional string

If the device is not eligible, the reason why.

<a href="#">Link to this property</a>

personEmail: optional string

User contact email address

<a href="#">Link to this property</a>

platform: optional string

Operating system.

<a href="#">Link to this property</a>

registrationId: optional string

Device registration identifier (UUID v4). On multi-user devices, this uniquely identifies a user’s registration on the device.

<a href="#">Link to this property</a>

status: optional string

Network status.

<a href="#">Link to this property</a>

timestamp: optional string

<a href="#">Link to this property</a>

version: optional string

WARP client version.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dex.commands.devices%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

<details>

<summary>

result\_info: optional object {count, page, per\_page, 2 more }

</summary>

count: optional number

Total number of results for the requested service.

<a href="#">Link to this property</a>

page: optional number

Current page within paginated list of results.

<a href="#">Link to this property</a>

per\_page: optional number

Number of results per page of results.

<a href="#">Link to this property</a>

total\_count: optional number

Total results available without any search parameters.

<a href="#">Link to this property</a>

total\_pages: optional number

The number of total pages in the entire result set.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dex.commands.devices%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### List devices eligible for remote captures

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dex/commands/devices \
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
    "devices": [
      {
        "deviceId": "deviceId",
        "deviceName": "deviceName",
        "eligible": true,
        "ineligibleReason": "ineligibleReason",
        "personEmail": "personEmail",
        "platform": "windows",
        "registrationId": "registrationId",
        "status": "connected",
        "timestamp": "2023-10-11 00:00:00+00",
        "version": "1.0.0"
      }
    ]
  },
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
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
    "devices": [
      {
        "deviceId": "deviceId",
        "deviceName": "deviceName",
        "eligible": true,
        "ineligibleReason": "ineligibleReason",
        "personEmail": "personEmail",
        "platform": "windows",
        "registrationId": "registrationId",
        "status": "connected",
        "timestamp": "2023-10-11 00:00:00+00",
        "version": "1.0.0"
      }
    ]
  },
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```