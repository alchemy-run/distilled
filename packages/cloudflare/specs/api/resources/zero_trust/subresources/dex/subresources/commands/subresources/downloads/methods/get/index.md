---
title: Download command output file
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[DEX](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex)

[Commands](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex/subresources/commands)

[Downloads](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex/subresources/commands/subresources/downloads)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Download command output file

GET/accounts/{account\_id}/dex/commands/{command\_id}/downloads/{filename}

Downloads artifacts for an executed command. Bulk downloads are not supported

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

`Cloudflare DEX Write``Cloudflare DEX Read``Zero Trust Report``Zero Trust Read`

##### P ath ParametersExpand Collapse

account\_id: string

Unique identifier linked to an account.

maxLength32

[Link to this property](#)%20zero_trust.dex.commands.downloads%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

command\_id: string

Unique identifier for a command

[Link to this property](#)%20zero_trust.dex.commands.downloads%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20command_id%20%3E%20(schema)>)

filename: string

[Link to this property](#)%20zero_trust.dex.commands.downloads%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20filename%20%3E%20(schema)>)

### Download command output file

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dex/commands/$COMMAND_ID/downloads/$FILENAME \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

##### Returns Examples