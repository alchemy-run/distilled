---
title: Export as Terraform
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Magic Cloud Networking](https://developers.cloudflare.com/api/resources/magic_cloud_networking)

[On Ramps](https://developers.cloudflare.com/api/resources/magic_cloud_networking/subresources/on_ramps)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Export as Terraform

POST/accounts/{account\_id}/magic/cloud/onramps/{onramp\_id}/export

Export an On-ramp to terraform ready file(s) (Closed Beta).

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

`Magic WAN Write`

##### P ath ParametersExpand Collapse

account\_id: string

[Link to this property](#)%20magic_cloud_networking.on_ramps%20%3E%20(method)%20export%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

onramp\_id: string

formatuuid

[Link to this property](#)%20magic_cloud_networking.on_ramps%20%3E%20(method)%20export%20%3E%20(params)%20default%20%3E%20(param)%20onramp_id%20%3E%20(schema)>)

### Export as Terraform

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/cloud/onramps/$ONRAMP_ID/export \
    -X POST \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

##### Returns Examples