---
title: Retrieve a list of all slots matching the specified parameters
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Network Interconnects](https://developers.cloudflare.com/api/resources/network_interconnects)

[Slots](https://developers.cloudflare.com/api/resources/network_interconnects/subresources/slots)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Retrieve a list of all slots matching the specified parameters

GET/accounts/{account\_id}/cni/slots

Lists all available infrastructure slots for the account, showing allocation status and capacity.

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

`Magic WAN Write``Magic WAN Read``Magic Transit Read``Magic Transit Write`

##### P ath ParametersExpand Collapse

account\_id: string

Customer account tag

[Link to this property](#)%20network_interconnects.slots%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

address\_contains: optional string

If specified, only show slots with the given text in their address field

[Link to this property](#)%20network_interconnects.slots%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20address_contains%20%3E%20(schema)>)

cursor: optional number

formatint32

[Link to this property](#)%20network_interconnects.slots%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20cursor%20%3E%20(schema)>)

limit: optional number

minimum0

[Link to this property](#)%20network_interconnects.slots%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20limit%20%3E%20(schema)>)

occupied: optional boolean

If specified, only show slots with a specific occupied/unoccupied state

[Link to this property](#)%20network_interconnects.slots%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20occupied%20%3E%20(schema)>)

site: optional string

If specified, only show slots located at the given site

[Link to this property](#)%20network_interconnects.slots%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20site%20%3E%20(schema)>)

speed: optional string

If specified, only show slots that support the given speed

[Link to this property](#)%20network_interconnects.slots%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20speed%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

items: array of object {id, facility, occupied, 4 more }

</summary>

id: string

Slot ID

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

facility: object {address, name }

</summary>

address: array of string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

occupied: boolean

Whether the slot is occupied or not

<a href="#">Link to this property</a>

site: string

<a href="#">Link to this property</a>

speed: string

<a href="#">Link to this property</a>

account: optional string

Customer account tag

<a href="#">Link to this property</a>

ccr\_device\_name: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20network_interconnects.slots%20%3E%20(model)%20slot_list_response%20%3E%20(schema)%20%3E%20(property)%20items>)

next: optional number

formatint32

[Link to this property](#)%20network_interconnects.slots%20%3E%20(model)%20slot_list_response%20%3E%20(schema)%20%3E%20(property)%20next>)

### Retrieve a list of all slots matching the specified parameters

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cni/slots \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "items": [
    {
      "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "facility": {
        "address": [
          "string"
        ],
        "name": "name"
      },
      "occupied": true,
      "site": "site",
      "speed": "speed",
      "account": "account",
      "ccr_device_name": "ccr_device_name"
    }
  ],
  "next": 0
}
```

##### Returns Examples

200 example

```
{
  "items": [
    {
      "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "facility": {
        "address": [
          "string"
        ],
        "name": "name"
      },
      "occupied": true,
      "site": "site",
      "speed": "speed",
      "account": "account",
      "ccr_device_name": "ccr_device_name"
    }
  ],
  "next": 0
}
```