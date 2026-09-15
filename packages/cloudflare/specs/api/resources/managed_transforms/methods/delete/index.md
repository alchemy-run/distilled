---
title: Delete Managed Transforms
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Managed Transforms](https://developers.cloudflare.com/api/resources/managed_transforms)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Delete Managed Transforms

DELETE/zones/{zone\_id}/managed\_headers

Disables all Managed Transforms.

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

`Response Compression Write``Config Settings Write``Dynamic URL Redirects Write``Cache Settings Write``Custom Errors Write``Origin Write``Managed headers Write``Zone Transform Rules Write``Mass URL Redirects Write``Magic Firewall Write``L4 DDoS Managed Ruleset Write``HTTP DDoS Managed Ruleset Write``Sanitize Write``Transform Rules Write``Select Configuration Write``Bot Management Write``Zone WAF Write``Account WAF Write``Account Rulesets Write``Logs Write``Logs Write`

##### P ath ParametersExpand Collapse

zone\_id: string

The unique ID of the zone.

[Link to this property](#)%20managed_transforms%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

### Delete Managed Transforms

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/managed_headers \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

##### Returns Examples