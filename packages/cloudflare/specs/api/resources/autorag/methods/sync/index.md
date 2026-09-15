---
title: Sync
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[AutoRAG](https://developers.cloudflare.com/api/resources/autorag)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Sync

Deprecated: Use AI Search instead.

PATCH/accounts/{account\_id}/autorag/rags/{id}/sync

Starts synchronization for an AutoRAG.

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

`Auto Rag Write`

##### P ath ParametersExpand Collapse

account\_id: string

[Link to this property](#)%20autorag%20%3E%20(method)%20sync%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

id: string

rag id

maxLength32

minLength1

[Link to this property](#)%20autorag%20%3E%20(method)%20sync%20%3E%20(params)%20default%20%3E%20(param)%20id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {job\_id }

</summary>

job\_id: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20autorag%20%3E%20(method)%20sync%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20autorag%20%3E%20(method)%20sync%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Sync

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/autorag/rags/$ID/sync \
    -X PATCH \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": {
    "job_id": "job_id"
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "result": {
    "job_id": "job_id"
  },
  "success": true
}
```