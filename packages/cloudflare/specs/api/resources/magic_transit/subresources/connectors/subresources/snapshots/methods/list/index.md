---
title: List Snapshots
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Magic Transit](https://developers.cloudflare.com/api/resources/magic_transit)

[Connectors](https://developers.cloudflare.com/api/resources/magic_transit/subresources/connectors)

[Snapshots](https://developers.cloudflare.com/api/resources/magic_transit/subresources/connectors/subresources/snapshots)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List Snapshots

GET/accounts/{account\_id}/magic/connectors/{connector\_id}/telemetry/snapshots

Lists Magic WAN Connector Telemetry Snapshots

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

Account identifier

maxLength32

[Link to this property](#)%20magic_transit.connectors.snapshots%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

connector\_id: string

[Link to this property](#)%20magic_transit.connectors.snapshots%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20connector_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

from: number

[Link to this property](#)%20magic_transit.connectors.snapshots%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20from%20%3E%20(schema)>)

to: number

[Link to this property](#)%20magic_transit.connectors.snapshots%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20to%20%3E%20(schema)>)

cursor: optional string

[Link to this property](#)%20magic_transit.connectors.snapshots%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20cursor%20%3E%20(schema)>)

limit: optional number

[Link to this property](#)%20magic_transit.connectors.snapshots%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20limit%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {count, items, cursor }

</summary>

count: number

<a href="#">Link to this property</a>

<details>

<summary>

items: array of object {a, t }

</summary>

a: number

Time the Snapshot was collected (seconds since the Unix epoch)

<a href="#">Link to this property</a>

t: number

Time the Snapshot was recorded (seconds since the Unix epoch)

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

cursor: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.connectors.snapshots%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20magic_transit.connectors.snapshots%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

errors: optional array of object {code, message }

</summary>

code: number

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.connectors.snapshots%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: optional array of object {code, message }

</summary>

code: number

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.connectors.snapshots%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

### List Snapshots

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/connectors/$CONNECTOR_ID/telemetry/snapshots \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": {
    "count": 0,
    "items": [
      {
        "a": 0,
        "t": 0
      }
    ],
    "cursor": "cursor"
  },
  "success": true,
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ]
}
```

##### Returns Examples

200 example

```
{
  "result": {
    "count": 0,
    "items": [
      {
        "a": 0,
        "t": 0
      }
    ],
    "cursor": "cursor"
  },
  "success": true,
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ]
}
```