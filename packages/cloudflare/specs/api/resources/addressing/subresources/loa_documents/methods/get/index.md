---
title: Download LOA Document
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Addressing](https://developers.cloudflare.com/api/resources/addressing)

[LOA Documents](https://developers.cloudflare.com/api/resources/addressing/subresources/loa_documents)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Download LOA Document

GET/accounts/{account\_id}/addressing/loa\_documents/{loa\_document\_id}/download

Download specified LOA document under the account.

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

`Magic Transit Read``Magic Transit Write`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier of a Cloudflare account.

maxLength32

[Link to this property](#)%20addressing.loa_documents%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

loa\_document\_id: string

Identifier for the uploaded LOA document.

maxLength32

[Link to this property](#)%20addressing.loa_documents%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20loa_document_id%20%3E%20(schema)>)

### Download LOA Document

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/loa_documents/$LOA_DOCUMENT_ID/download \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

##### Returns Examples