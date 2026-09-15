---
title: Get the current status of an interconnect object
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Network Interconnects](https://developers.cloudflare.com/api/resources/network_interconnects)

[Interconnects](https://developers.cloudflare.com/api/resources/network_interconnects/subresources/interconnects)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get the current status of an interconnect object

GET/accounts/{account\_id}/cni/interconnects/{icon}/status

Gets the current operational status of a network interconnect, including link state and traffic metrics.

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

[Link to this property](#)%20network_interconnects.interconnects%20%3E%20(method)%20status%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

icon: string

[Link to this property](#)%20network_interconnects.interconnects%20%3E%20(method)%20status%20%3E%20(params)%20default%20%3E%20(param)%20icon%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

Pending object {state }

</summary>

state: "Pending"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20network_interconnects.interconnects%20%3E%20(model)%20interconnect_status_response%20%3E%20(schema)%20%3E%20(variant)%200>)

<details>

<summary>

Down object {state, reason }

</summary>

state: "Down"

<a href="#">Link to this property</a>

reason: optional string

Diagnostic information, if available

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20network_interconnects.interconnects%20%3E%20(model)%20interconnect_status_response%20%3E%20(schema)%20%3E%20(variant)%201>)

<details>

<summary>

Unhealthy object {state, reason }

</summary>

state: "Unhealthy"

<a href="#">Link to this property</a>

reason: optional string

Diagnostic information, if available

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20network_interconnects.interconnects%20%3E%20(model)%20interconnect_status_response%20%3E%20(schema)%20%3E%20(variant)%202>)

<details>

<summary>

Healthy object {state }

</summary>

state: "Healthy"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20network_interconnects.interconnects%20%3E%20(model)%20interconnect_status_response%20%3E%20(schema)%20%3E%20(variant)%203>)

### Get the current status of an interconnect object

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cni/interconnects/$ICON/status \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "state": "Pending"
}
```

##### Returns Examples

200 example

```
{
  "state": "Pending"
}
```