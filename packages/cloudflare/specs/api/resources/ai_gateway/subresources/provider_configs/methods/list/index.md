---
title: List Provider Configs
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[AI Gateway](https://developers.cloudflare.com/api/resources/ai_gateway)

[Provider Configs](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/provider_configs)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List Provider Configs

GET/accounts/{account\_id}/ai-gateway/gateways/{gateway\_id}/provider\_configs

Lists all AI Gateway evaluator types configured for the account.

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

[Link to this property](#)%20ai_gateway.provider_configs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

gateway\_id: string

gateway id

maxLength64

minLength1

[Link to this property](#)%20ai_gateway.provider_configs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20gateway_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

page: optional number

minimum1

[Link to this property](#)%20ai_gateway.provider_configs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: optional number

maximum100

minimum1

[Link to this property](#)%20ai_gateway.provider_configs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: array of object {id, alias, default\_config, 7 more }

</summary>

id: string

<a href="#">Link to this property</a>

alias: string

<a href="#">Link to this property</a>

default\_config: boolean

<a href="#">Link to this property</a>

gateway\_id: string

gateway id

maxLength64

minLength1

<a href="#">Link to this property</a>

modified\_at: string

formatdate-time

<a href="#">Link to this property</a>

provider\_slug: string

<a href="#">Link to this property</a>

secret\_id: string

<a href="#">Link to this property</a>

secret\_preview: string

<a href="#">Link to this property</a>

rate\_limit: optional number

<a href="#">Link to this property</a>

rate\_limit\_period: optional number

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_gateway.provider_configs%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20ai_gateway.provider_configs%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### List Provider Configs

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/gateways/$GATEWAY_ID/provider_configs \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": [
    {
      "id": "id",
      "alias": "alias",
      "default_config": true,
      "gateway_id": "my-gateway",
      "modified_at": "2019-12-27T18:11:19.117Z",
      "provider_slug": "provider_slug",
      "secret_id": "secret_id",
      "secret_preview": "secret_preview",
      "rate_limit": 0,
      "rate_limit_period": 0
    }
  ],
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "result": [
    {
      "id": "id",
      "alias": "alias",
      "default_config": true,
      "gateway_id": "my-gateway",
      "modified_at": "2019-12-27T18:11:19.117Z",
      "provider_slug": "provider_slug",
      "secret_id": "secret_id",
      "secret_preview": "secret_preview",
      "rate_limit": 0,
      "rate_limit_period": 0
    }
  ],
  "success": true
}
```