---
title: Get Receipt PDF
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Accounts](https://developers.cloudflare.com/api/resources/accounts)

[Receipts](https://developers.cloudflare.com/api/resources/accounts/subresources/receipts)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get Receipt PDF

GET/accounts/{account\_id}/receipts/{receipt\_id}/pdf

Downloads a receipt as a PDF document.

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

Identifier

maxLength32

[Link to this property](#)%20accounts.receipts%20%3E%20(method)%20pdf%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

receipt\_id: string

Identifier

maxLength32

[Link to this property](#)%20accounts.receipts%20%3E%20(method)%20pdf%20%3E%20(params)%20default%20%3E%20(param)%20receipt_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

doctype: optional string

The document type to generate.

[Link to this property](#)%20accounts.receipts%20%3E%20(method)%20pdf%20%3E%20(params)%20default%20%3E%20(param)%20doctype%20%3E%20(schema)>)

### Get Receipt PDF

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/receipts/$RECEIPT_ID/pdf \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

##### Returns Examples