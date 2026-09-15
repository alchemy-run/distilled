---
title: List Connectors
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Magic Transit](https://developers.cloudflare.com/api/resources/magic_transit)

[Connectors](https://developers.cloudflare.com/api/resources/magic_transit/subresources/connectors)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List Connectors

GET/accounts/{account\_id}/magic/connectors

Lists Magic WAN Connectors.

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

`Magic WAN Write``Magic WAN Read`

##### P ath ParametersExpand Collapse

account\_id: string

maxLength32

[Link to this property](#)%20magic_transit.connectors%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

<details>

<summary>

device\_type: optional "MANAGED"or "LICENSED"

Filter connectors by device type.

</summary>

One of the following:

"MANAGED"

<a href="#">Link to this property</a>

"LICENSED"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.connectors%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20device_type%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20response_info%20%3E%20(schema)">ResponseInfo</a> { code, message, documentation\_url, source }

maxLength0

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

[Link to this property](#)%20magic_transit.connectors%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20response_info%20%3E%20(schema)">ResponseInfo</a> { code, message, documentation\_url, source }

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

[Link to this property](#)%20magic_transit.connectors%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: array of object {id, activated, interrupt\_window\_days\_of\_week, 12 more }

</summary>

id: string

<a href="#">Link to this property</a>

activated: boolean

<a href="#">Link to this property</a>

<details>

<summary>

interrupt\_window\_days\_of\_week: array of "Sunday"or "Monday"or "Tuesday"or 4 more

Allowed days of the week for upgrades. Default is all days.

</summary>

One of the following:

"Sunday"

<a href="#">Link to this property</a>

"Monday"

<a href="#">Link to this property</a>

"Tuesday"

<a href="#">Link to this property</a>

"Wednesday"

<a href="#">Link to this property</a>

"Thursday"

<a href="#">Link to this property</a>

"Friday"

<a href="#">Link to this property</a>

"Saturday"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

interrupt\_window\_duration\_hours: number

maximum24

minimum1

<a href="#">Link to this property</a>

interrupt\_window\_embargo\_dates: array of string

List of dates (YYYY-MM-DD) when upgrades are blocked.

<a href="#">Link to this property</a>

interrupt\_window\_hour\_of\_day: number

<a href="#">Link to this property</a>

last\_updated: string

<a href="#">Link to this property</a>

notes: string

<a href="#">Link to this property</a>

primary: boolean

<a href="#">Link to this property</a>

timezone: string

<a href="#">Link to this property</a>

<details>

<summary>

device: optional object {id, serial\_number, type }

</summary>

id: string

<a href="#">Link to this property</a>

serial\_number: optional string

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "MANAGED"or "LICENSED"

</summary>

One of the following:

"MANAGED"

<a href="#">Link to this property</a>

"LICENSED"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

last\_heartbeat: optional string

<a href="#">Link to this property</a>

last\_seen\_version: optional string

<a href="#">Link to this property</a>

license\_key: optional string

<a href="#">Link to this property</a>

site\_id: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.connectors%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20magic_transit.connectors%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### List Connectors

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/connectors \
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
  "result": [
    {
      "id": "id",
      "activated": true,
      "interrupt_window_days_of_week": [
        "Sunday"
      ],
      "interrupt_window_duration_hours": 1,
      "interrupt_window_embargo_dates": [
        "string"
      ],
      "interrupt_window_hour_of_day": 0,
      "last_updated": "last_updated",
      "notes": "notes",
      "primary": true,
      "timezone": "timezone",
      "device": {
        "id": "id",
        "serial_number": "serial_number",
        "type": "MANAGED"
      },
      "last_heartbeat": "last_heartbeat",
      "last_seen_version": "last_seen_version",
      "license_key": "license_key",
      "site_id": "site_id"
    }
  ],
  "success": true
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
  "result": [
    {
      "id": "id",
      "activated": true,
      "interrupt_window_days_of_week": [
        "Sunday"
      ],
      "interrupt_window_duration_hours": 1,
      "interrupt_window_embargo_dates": [
        "string"
      ],
      "interrupt_window_hour_of_day": 0,
      "last_updated": "last_updated",
      "notes": "notes",
      "primary": true,
      "timezone": "timezone",
      "device": {
        "id": "id",
        "serial_number": "serial_number",
        "type": "MANAGED"
      },
      "last_heartbeat": "last_heartbeat",
      "last_seen_version": "last_seen_version",
      "license_key": "license_key",
      "site_id": "site_id"
    }
  ],
  "success": true
}
```