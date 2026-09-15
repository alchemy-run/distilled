---
title: Model Search
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[AI](https://developers.cloudflare.com/api/resources/ai)

[Models](https://developers.cloudflare.com/api/resources/ai/subresources/models)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Model Search

GET/accounts/{account\_id}/ai/models/search

Searches Workers AI models by name or description.

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

`Workers AI Write``Workers AI Read`

##### P ath ParametersExpand Collapse

account\_id: string

[Link to this property](#)%20ai.models%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

author: optional string

Filter by Author.

[Link to this property](#)%20ai.models%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20author%20%3E%20(schema)>)

format: optional "openrouter"

If set, return models in the requested marketplace format instead of the default response.

[Link to this property](#)%20ai.models%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20format%20%3E%20(schema)>)

hide\_experimental: optional boolean

Filter to hide experimental models.

[Link to this property](#)%20ai.models%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20hide_experimental%20%3E%20(schema)>)

include\_deprecated: optional boolean

If true, include models for up to three months after their deprecation date. Defaults to false.

[Link to this property](#)%20ai.models%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20include_deprecated%20%3E%20(schema)>)

page: optional number

[Link to this property](#)%20ai.models%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: optional number

[Link to this property](#)%20ai.models%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

search: optional string

Search.

[Link to this property](#)%20ai.models%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20search%20%3E%20(schema)>)

source: optional number

Filter by Source Id.

[Link to this property](#)%20ai.models%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20source%20%3E%20(schema)>)

task: optional string

Filter by Task Name.

[Link to this property](#)%20ai.models%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20task%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

object {errors, messages, result, success }

</summary>

errors: array of unknown

<a href="#">Link to this property</a>

messages: array of string

<a href="#">Link to this property</a>

result: array of unknown

<a href="#">Link to this property</a>

success: boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai.models%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(variant)%200>)

<details>

<summary>

Data object {data }

Marketplace-format response. See <a href="https://openrouter.ai/docs/guides/get-started/for-providers">https://openrouter.ai/docs/guides/get-started/for-providers</a>.

</summary>

data: array of unknown

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai.models%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(variant)%201>)

### Model Search

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai/models/search \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "errors": [
    {}
  ],
  "messages": [
    "string"
  ],
  "result": [
    {}
  ],
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "errors": [
    {}
  ],
  "messages": [
    "string"
  ],
  "result": [
    {}
  ],
  "success": true
}
```