---
title: Get Script Content
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Workers For Platforms](https://developers.cloudflare.com/api/resources/workers_for_platforms)

[Dispatch](https://developers.cloudflare.com/api/resources/workers_for_platforms/subresources/dispatch)

[Namespaces](https://developers.cloudflare.com/api/resources/workers_for_platforms/subresources/dispatch/subresources/namespaces)

[Scripts](https://developers.cloudflare.com/api/resources/workers_for_platforms/subresources/dispatch/subresources/namespaces/subresources/scripts)

[Content](https://developers.cloudflare.com/api/resources/workers_for_platforms/subresources/dispatch/subresources/namespaces/subresources/scripts/subresources/content)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get Script Content

GET/accounts/{account\_id}/workers/dispatch/namespaces/{dispatch\_namespace}/scripts/{script\_name}/content

Fetch script content from a script uploaded to a Workers for Platforms namespace.

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

`Workers Tail Read``Workers Scripts Write``Workers Scripts Read`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier.

maxLength32

[Link to this property](#)%20workers_for_platforms.dispatch.namespaces.scripts.content%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

dispatch\_namespace: string

Name of the Workers for Platforms dispatch namespace.

[Link to this property](#)%20workers_for_platforms.dispatch.namespaces.scripts.content%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20dispatch_namespace%20%3E%20(schema)>)

script\_name: string

Name of the script, used in URLs and route configuration.

[Link to this property](#)%20workers_for_platforms.dispatch.namespaces.scripts.content%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20script_name%20%3E%20(schema)>)

### Get Script Content

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/dispatch/namespaces/$DISPATCH_NAMESPACE/scripts/$SCRIPT_NAME/content \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

##### Returns Examples