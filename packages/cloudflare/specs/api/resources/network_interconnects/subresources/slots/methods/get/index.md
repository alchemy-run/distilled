---
title: Get information about the specified slot
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Network Interconnects](https://developers.cloudflare.com/api/resources/network_interconnects)

[Slots](https://developers.cloudflare.com/api/resources/network_interconnects/subresources/slots)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get information about the specified slot

GET/accounts/{account\_id}/cni/slots/{slot}

Gets information about a specific infrastructure slot allocation.

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

[Link to this property](#)%20network_interconnects.slots%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

slot: string

formatuuid

[Link to this property](#)%20network_interconnects.slots%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20slot%20%3E%20(schema)>)

##### ReturnsExpand Collapse

id: string

Slot ID

formatuuid

[Link to this property](#)%20network_interconnects.slots%20%3E%20(model)%20slot_get_response%20%3E%20(schema)%20%3E%20(property)%20id>)

<details>

<summary>

facility: object {address, name }

</summary>

address: array of string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20network_interconnects.slots%20%3E%20(model)%20slot_get_response%20%3E%20(schema)%20%3E%20(property)%20facility>)

occupied: boolean

Whether the slot is occupied or not

[Link to this property](#)%20network_interconnects.slots%20%3E%20(model)%20slot_get_response%20%3E%20(schema)%20%3E%20(property)%20occupied>)

site: string

[Link to this property](#)%20network_interconnects.slots%20%3E%20(model)%20slot_get_response%20%3E%20(schema)%20%3E%20(property)%20site>)

speed: string

[Link to this property](#)%20network_interconnects.slots%20%3E%20(model)%20slot_get_response%20%3E%20(schema)%20%3E%20(property)%20speed>)

account: optional string

Customer account tag

[Link to this property](#)%20network_interconnects.slots%20%3E%20(model)%20slot_get_response%20%3E%20(schema)%20%3E%20(property)%20account>)

ccr\_device\_name: optional string

[Link to this property](#)%20network_interconnects.slots%20%3E%20(model)%20slot_get_response%20%3E%20(schema)%20%3E%20(property)%20ccr_device_name>)

### Get information about the specified slot

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cni/slots/$SLOT \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
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
```

##### Returns Examples

200 example

```
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
```