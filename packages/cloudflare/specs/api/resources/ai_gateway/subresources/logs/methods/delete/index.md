---
title: Delete Gateway Logs
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[AI Gateway](https://developers.cloudflare.com/api/resources/ai_gateway)

[Logs](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/logs)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Delete Gateway Logs

DELETE/accounts/{account\_id}/ai-gateway/gateways/{gateway\_id}/logs

Deletes gateway log entries matching the specified criteria.

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

[Link to this property](#)%20ai_gateway.logs%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

gateway\_id: string

gateway id

maxLength64

minLength1

[Link to this property](#)%20ai_gateway.logs%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20gateway_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

<details>

<summary>

filters: optional array of object {key, operator, value }

</summary>

<details>

<summary>

key: "id"or "created\_at"or "request\_content\_type"or 21 more

</summary>

One of the following:

"id"

<a href="#">Link to this property</a>

"created\_at"

<a href="#">Link to this property</a>

"request\_content\_type"

<a href="#">Link to this property</a>

"response\_content\_type"

<a href="#">Link to this property</a>

"request\_type"

<a href="#">Link to this property</a>

"success"

<a href="#">Link to this property</a>

"cached"

<a href="#">Link to this property</a>

"provider"

<a href="#">Link to this property</a>

"model"

<a href="#">Link to this property</a>

"model\_type"

<a href="#">Link to this property</a>

"cost"

<a href="#">Link to this property</a>

"tokens"

<a href="#">Link to this property</a>

"tokens\_in"

<a href="#">Link to this property</a>

"tokens\_out"

<a href="#">Link to this property</a>

"duration"

<a href="#">Link to this property</a>

"feedback"

<a href="#">Link to this property</a>

"event\_id"

<a href="#">Link to this property</a>

"metadata.key"

<a href="#">Link to this property</a>

"metadata.value"

<a href="#">Link to this property</a>

"authentication"

<a href="#">Link to this property</a>

"wholesale"

<a href="#">Link to this property</a>

"compatibilityMode"

<a href="#">Link to this property</a>

"dlp\_action"

<a href="#">Link to this property</a>

"user\_agent"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

operator: "eq"or "neq"or "contains"or 2 more

</summary>

One of the following:

"eq"

<a href="#">Link to this property</a>

"neq"

<a href="#">Link to this property</a>

"contains"

<a href="#">Link to this property</a>

"lt"

<a href="#">Link to this property</a>

"gt"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

value: array of stringor numberor boolean

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_gateway.logs%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20filters%20%3E%20(schema)>)

limit: optional number

maximum10000

minimum1

[Link to this property](#)%20ai_gateway.logs%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20limit%20%3E%20(schema)>)

<details>

<summary>

order\_by: optional "created\_at"or "provider"or "model"or 8 more

</summary>

One of the following:

"created\_at"

<a href="#">Link to this property</a>

"provider"

<a href="#">Link to this property</a>

"model"

<a href="#">Link to this property</a>

"model\_type"

<a href="#">Link to this property</a>

"success"

<a href="#">Link to this property</a>

"cached"

<a href="#">Link to this property</a>

"cost"

<a href="#">Link to this property</a>

"tokens\_in"

<a href="#">Link to this property</a>

"tokens\_out"

<a href="#">Link to this property</a>

"duration"

<a href="#">Link to this property</a>

"feedback"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_gateway.logs%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20order_by%20%3E%20(schema)>)

<details>

<summary>

order\_by\_direction: optional "asc"or "desc"

</summary>

One of the following:

"asc"

<a href="#">Link to this property</a>

"desc"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_gateway.logs%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20order_by_direction%20%3E%20(schema)>)

##### ReturnsExpand Collapse

success: boolean

[Link to this property](#)%20ai_gateway.logs%20%3E%20(model)%20log_delete_response%20%3E%20(schema)%20%3E%20(property)%20success>)

### Delete Gateway Logs

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/gateways/$GATEWAY_ID/logs \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "success": true
}
```