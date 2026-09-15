---
title: Update the current settings for the active account
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Network Interconnects](https://developers.cloudflare.com/api/resources/network_interconnects)

[Settings](https://developers.cloudflare.com/api/resources/network_interconnects/subresources/settings)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Update the current settings for the active account

PUT/accounts/{account\_id}/cni/settings

Updates configuration settings for the specified resource or service.

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

`Magic WAN Write``Magic Transit Write`

##### P ath ParametersExpand Collapse

account\_id: string

[Link to this property](#)%20network_interconnects.settings%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

default\_asn: optional number

formatint32

minimum0

[Link to this property](#)%20network_interconnects.settings%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20default_asn%20%3E%20(schema)>)

##### ReturnsExpand Collapse

default\_asn: number

formatint32

minimum0

[Link to this property](#)%20network_interconnects.settings%20%3E%20(model)%20setting_update_response%20%3E%20(schema)%20%3E%20(property)%20default_asn>)

### Update the current settings for the active account

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cni/settings \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{}'
```

200 example

```
{
  "default_asn": 0
}
```

##### Returns Examples

200 example

```
{
  "default_asn": 0
}
```