---
title: List WARP change events.
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[DEX](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex)

[WARP Change Events](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex/subresources/warp_change_events)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List WARP change events.

GET/accounts/{account\_id}/dex/warp-change-events

List WARP configuration and enablement toggle change events by device.

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

[Link to this property](#)%20zero_trust.dex.warp_change_events%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

from: string

Start time for the query in ISO (RFC3339 - ISO 8601) format.

[Link to this property](#)%20zero_trust.dex.warp_change_events%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20from%20%3E%20(schema)>)

page: number

Page number of paginated results.

minimum1

[Link to this property](#)%20zero_trust.dex.warp_change_events%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: number

Number of results per page.

maximum50

minimum1

[Link to this property](#)%20zero_trust.dex.warp_change_events%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

to: string

End time for the query in ISO (RFC3339 - ISO 8601) format.

[Link to this property](#)%20zero_trust.dex.warp_change_events%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20to%20%3E%20(schema)>)

account\_name: optional string

Filter events by account name.

[Link to this property](#)%20zero_trust.dex.warp_change_events%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_name%20%3E%20(schema)>)

config\_name: optional string

Filter events by WARP configuration name changed from or to. Applicable to type=‘config’ events only.

[Link to this property](#)%20zero_trust.dex.warp_change_events%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20config_name%20%3E%20(schema)>)

<details>

<summary>

sort\_order: optional "ASC"or "DESC"

Sort response by event timestamp.

</summary>

One of the following:

"ASC"

<a href="#">Link to this property</a>

"DESC"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dex.warp_change_events%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20sort_order%20%3E%20(schema)>)

<details>

<summary>

toggle: optional "on"or "off"

Filter events by type toggle value. Applicable to type=‘toggle’ events only.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dex.warp_change_events%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20toggle%20%3E%20(schema)>)

<details>

<summary>

type: optional "config"or "toggle"

Filter events by type ‘config’ or ‘toggle’.

</summary>

One of the following:

"config"

<a href="#">Link to this property</a>

"toggle"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dex.warp_change_events%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20type%20%3E%20(schema)>)

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

[Link to this property](#)%20zero_trust.dex.warp_change_events%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20zero_trust.dex.warp_change_events%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20zero_trust.dex.warp_change_events%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional array of object {account\_name, account\_tag, device\_id, 7 more } or object {device\_id, device\_registration, from, 6 more }

</summary>

One of the following:

<details>

<summary>

DigitalExperienceMonitoringWARPToggleChangeEvent object {account\_name, account\_tag, device\_id, 7 more }

</summary>

account\_name: optional string

The account name.

<a href="#">Link to this property</a>

account\_tag: optional string

The public account identifier.

<a href="#">Link to this property</a>

device\_id: optional string

The device ID.

maxLength36

<a href="#">Link to this property</a>

Deprecateddevice\_registration: optional string

Use <code>registration_id</code> instead.

Deprecated: use registration\_id. The device registration ID.

maxLength36

<a href="#">Link to this property</a>

hostname: optional string

The hostname of the machine the event is from.

<a href="#">Link to this property</a>

registration\_id: optional string

The device registration ID.

maxLength36

<a href="#">Link to this property</a>

serial\_number: optional string

The serial number of the machine the event is from.

<a href="#">Link to this property</a>

timestamp: optional string

The event time.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

toggle: optional "on"or "off"

The state of the WARP toggle.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

user\_email: optional string

Email tied to the device.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

DigitalExperienceMonitoringWARPConfigChangeEvent object {device\_id, device\_registration, from, 6 more }

</summary>

device\_id: optional string

The device ID.

maxLength36

<a href="#">Link to this property</a>

Deprecateddevice\_registration: optional string

Use <code>registration_id</code> instead.

Deprecated: use registration\_id. The device registration ID.

maxLength36

<a href="#">Link to this property</a>

<details>

<summary>

from: optional object {account\_name, account\_tag, config\_name }

The details for the WARP configuration that was switched from.

</summary>

account\_name: optional string

The account name.

<a href="#">Link to this property</a>

account\_tag: optional string

The public account identifier.

maxLength36

<a href="#">Link to this property</a>

config\_name: optional string

The name of the WARP configuration.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

hostname: optional string

The hostname of the machine the event is from.

<a href="#">Link to this property</a>

registration\_id: optional string

The device registration ID.

maxLength36

<a href="#">Link to this property</a>

serial\_number: optional string

The serial number of the machine the event is from.

<a href="#">Link to this property</a>

timestamp: optional string

The event time.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

to: optional object {account\_name, account\_tag, config\_name }

The details for the WARP configuration that was switched to.

</summary>

account\_name: optional string

The account name.

<a href="#">Link to this property</a>

account\_tag: optional string

The public account identifier.

maxLength36

<a href="#">Link to this property</a>

config\_name: optional string

The name of the WARP configuration.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

user\_email: optional string

Email tied to the device.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dex.warp_change_events%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

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

[Link to this property](#)%20zero_trust.dex.warp_change_events%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### List WARP change events.

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dex/warp-change-events \
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
      "account_name": "account_name",
      "account_tag": "account_tag",
      "device_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "device_registration": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "hostname": "hostname",
      "registration_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "serial_number": "serial_number",
      "timestamp": "2023-10-11T00:00:00Z",
      "toggle": "on",
      "user_email": "user_email"
    }
  ],
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
  "result": [
    {
      "account_name": "account_name",
      "account_tag": "account_tag",
      "device_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "device_registration": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "hostname": "hostname",
      "registration_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "serial_number": "serial_number",
      "timestamp": "2023-10-11T00:00:00Z",
      "toggle": "on",
      "user_email": "user_email"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```