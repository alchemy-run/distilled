---
title: Get a zone snippet content
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Snippets](https://developers.cloudflare.com/api/resources/snippets)

[Content](https://developers.cloudflare.com/api/resources/snippets/subresources/content)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get a zone snippet content

GET/zones/{zone\_id}/snippets/{snippet\_name}/content

Fetches the content of a snippet belonging to the zone.

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

`Snippets Write``Snippets Read`

##### P ath ParametersExpand Collapse

zone\_id: string

Use this field to specify the unique ID of the zone.

[Link to this property](#)%20snippets.content%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

snippet\_name: string

Identify the snippet.

[Link to this property](#)%20snippets.content%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20snippet_name%20%3E%20(schema)>)

### Get a zone snippet content

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/snippets/$SNIPPET_NAME/content \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

##### Returns Examples