---
title: Generate the Letter of Authorization (LOA) for a given interconnect
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Network Interconnects](https://developers.cloudflare.com/api/resources/network_interconnects)

[Interconnects](https://developers.cloudflare.com/api/resources/network_interconnects/subresources/interconnects)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Generate the Letter of Authorization (LOA) for a given interconnect

GET/accounts/{account\_id}/cni/interconnects/{icon}/loa

Downloads the Letter of Authorization (LOA) for a network interconnect, required for physical cross-connect provisioning.

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

[Link to this property](#)%20network_interconnects.interconnects%20%3E%20(method)%20loa%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

icon: string

[Link to this property](#)%20network_interconnects.interconnects%20%3E%20(method)%20loa%20%3E%20(params)%20default%20%3E%20(param)%20icon%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

name: optional string

Custom name to use in the LOA instead of the account name (200 Character limit)

[Link to this property](#)%20network_interconnects.interconnects%20%3E%20(method)%20loa%20%3E%20(params)%20default%20%3E%20(param)%20name%20%3E%20(schema)>)

### Generate the Letter of Authorization (LOA) for a given interconnect

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cni/interconnects/$ICON/loa \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

##### Returns Examples