---
title: Delete targets (Deprecated)
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Access](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access)

[Infrastructure](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/infrastructure)

[Targets](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/infrastructure/subresources/targets)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Delete targets (Deprecated)

Deprecated

DELETE/accounts/{account\_id}/infrastructure/targets/batch

Removes one or more targets.

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

##### P ath ParametersExpand Collapse

account\_id: string

Account identifier

maxLength32

[Link to this property](#)%20zero_trust.access.infrastructure.targets%20%3E%20(method)%20bulk_delete%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

### Delete targets (Deprecated)

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/infrastructure/targets/batch \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

##### Returns Examples