---
title: Download Item Content.
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[AI Search](https://developers.cloudflare.com/api/resources/ai_search)

[Namespaces](https://developers.cloudflare.com/api/resources/ai_search/subresources/namespaces)

[Instances](https://developers.cloudflare.com/api/resources/ai_search/subresources/namespaces/subresources/instances)

[Items](https://developers.cloudflare.com/api/resources/ai_search/subresources/namespaces/subresources/instances/subresources/items)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Download Item Content.

GET/accounts/{account\_id}/ai-search/namespaces/{name}/instances/{id}/items/{item\_id}/download

Downloads the raw file content for a specific item from the managed AI Search instance storage.

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

[Link to this property](#)%20ai_search.namespaces.instances.items%20%3E%20(method)%20download%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

name: string

[Link to this property](#)%20ai_search.namespaces.instances.items%20%3E%20(method)%20download%20%3E%20(params)%20default%20%3E%20(param)%20name%20%3E%20(schema)>)

id: string

AI Search instance ID. Lowercase alphanumeric, hyphens, and underscores.

maxLength64

minLength1

[Link to this property](#)%20ai_search.namespaces.instances.items%20%3E%20(method)%20download%20%3E%20(params)%20default%20%3E%20(param)%20id%20%3E%20(schema)>)

item\_id: string

[Link to this property](#)%20ai_search.namespaces.instances.items%20%3E%20(method)%20download%20%3E%20(params)%20default%20%3E%20(param)%20item_id%20%3E%20(schema)>)

### Download Item Content.

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-search/namespaces/$NAME/instances/$ID/items/$ITEM_ID/download \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

##### Returns Examples