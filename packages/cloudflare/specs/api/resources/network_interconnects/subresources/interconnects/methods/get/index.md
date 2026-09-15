---
title: Get information about an interconnect object
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Network Interconnects](https://developers.cloudflare.com/api/resources/network_interconnects)

[Interconnects](https://developers.cloudflare.com/api/resources/network_interconnects/subresources/interconnects)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get information about an interconnect object

GET/accounts/{account\_id}/cni/interconnects/{icon}

Retrieves configuration and status details for a specific network interconnect.

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

[Link to this property](#)%20network_interconnects.interconnects%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

icon: string

[Link to this property](#)%20network_interconnects.interconnects%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20icon%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

NscInterconnectPhysicalBody object {account, facility, name, 7 more }

</summary>

account: string

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

name: string

<a href="#">Link to this property</a>

site: string

A Cloudflare site name.

<a href="#">Link to this property</a>

slot\_id: string

formatuuid

<a href="#">Link to this property</a>

speed: string

<a href="#">Link to this property</a>

type: string

<a href="#">Link to this property</a>

virtual\_port\_reservation\_id: string

formatuuid

<a href="#">Link to this property</a>

ccr\_device\_name: optional string

<a href="#">Link to this property</a>

owner: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20network_interconnects.interconnects%20%3E%20(model)%20interconnect_get_response%20%3E%20(schema)%20%3E%20(variant)%200>)

<details>

<summary>

NscInterconnectGcpPartnerBody object {account, name, region, 4 more }

</summary>

account: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

region: string

<a href="#">Link to this property</a>

type: string

<a href="#">Link to this property</a>

virtual\_port\_reservation\_id: string

formatuuid

<a href="#">Link to this property</a>

owner: optional string

<a href="#">Link to this property</a>

<details>

<summary>

speed: optional "50M"or "100M"or "200M"or 9 more

Bandwidth structure as visible through the customer-facing API.

</summary>

One of the following:

"50M"

<a href="#">Link to this property</a>

"100M"

<a href="#">Link to this property</a>

"200M"

<a href="#">Link to this property</a>

"300M"

<a href="#">Link to this property</a>

"400M"

<a href="#">Link to this property</a>

"500M"

<a href="#">Link to this property</a>

"1G"

<a href="#">Link to this property</a>

"2G"

<a href="#">Link to this property</a>

"5G"

<a href="#">Link to this property</a>

"10G"

<a href="#">Link to this property</a>

"20G"

<a href="#">Link to this property</a>

"50G"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20network_interconnects.interconnects%20%3E%20(model)%20interconnect_get_response%20%3E%20(schema)%20%3E%20(variant)%201>)

### Get information about an interconnect object

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cni/interconnects/$ICON \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "account": "account",
  "facility": {
    "address": [
      "string"
    ],
    "name": "name"
  },
  "name": "name",
  "site": "site",
  "slot_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
  "speed": "speed",
  "type": "type",
  "virtual_port_reservation_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
  "ccr_device_name": "ccr_device_name",
  "owner": "owner"
}
```

##### Returns Examples

200 example

```
{
  "account": "account",
  "facility": {
    "address": [
      "string"
    ],
    "name": "name"
  },
  "name": "name",
  "site": "site",
  "slot_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
  "speed": "speed",
  "type": "type",
  "virtual_port_reservation_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
  "ccr_device_name": "ccr_device_name",
  "owner": "owner"
}
```