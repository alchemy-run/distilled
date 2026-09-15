---
title: Delete R2 catalog metadata
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[R2 Data Catalog](https://developers.cloudflare.com/api/resources/r2_data_catalog)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Delete R2 catalog metadata

POST/accounts/{account\_id}/r2-catalog/{bucket\_name}/delete

Removes the catalog from the control plane without deleting R2 bucket objects. Set force=true to remove catalog namespaces, tables, views, and maintenance metadata. Force deletion is limited to a configured catalog object count.

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

`Workers R2 Data Catalog Write`

##### P ath ParametersExpand Collapse

account\_id: string

Use this to identify the account.

[Link to this property](#)%20r2_data_catalog%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

bucket\_name: string

Specifies the R2 bucket name.

maxLength63

minLength3

[Link to this property](#)%20r2_data_catalog%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20bucket_name%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

force: optional boolean

Remove child metadata before deleting the catalog.

[Link to this property](#)%20r2_data_catalog%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20force%20%3E%20(schema)>)

### Delete R2 catalog metadata

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2-catalog/$BUCKET_NAME/delete \
    -X POST \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

##### Returns Examples