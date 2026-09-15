---
title: Patch Gateway Log
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[AI Gateway](https://developers.cloudflare.com/api/resources/ai_gateway)

[Logs](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/logs)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Patch Gateway Log

PATCH/accounts/{account\_id}/ai-gateway/gateways/{gateway\_id}/logs/{id}

Updates metadata for an AI Gateway log entry.

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

`AI Gateway Write`

##### P ath ParametersExpand Collapse

account\_id: string

[Link to this property](#)%20ai_gateway.logs%20%3E%20(method)%20edit%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

gateway\_id: string

gateway id

maxLength64

minLength1

[Link to this property](#)%20ai_gateway.logs%20%3E%20(method)%20edit%20%3E%20(params)%20default%20%3E%20(param)%20gateway_id%20%3E%20(schema)>)

id: string

[Link to this property](#)%20ai_gateway.logs%20%3E%20(method)%20edit%20%3E%20(params)%20default%20%3E%20(param)%20id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

feedback: optional number

maximum1

minimum-1

[Link to this property](#)%20ai_gateway.logs%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20feedback%20%3E%20(schema)>)

<details>

<summary>

metadata: optional map\[stringor numberor boolean]

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_gateway.logs%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20metadata%20%3E%20(schema)>)

score: optional number

maximum100

minimum0

[Link to this property](#)%20ai_gateway.logs%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20score%20%3E%20(schema)>)

##### ReturnsExpand Collapse

result: unknown

[Link to this property](#)%20ai_gateway.logs%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20ai_gateway.logs%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Patch Gateway Log

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/gateways/$GATEWAY_ID/logs/$ID \
    -X PATCH \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": {},
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "result": {},
  "success": true
}
```