---
title: Get usage history
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[AI Gateway](https://developers.cloudflare.com/api/resources/ai_gateway)

[Billing](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/billing)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get usage history

GET/accounts/{account\_id}/ai-gateway/billing/usage-history

Retrieve aggregated usage meter event summaries for the given time range.

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

`AI Gateway Write``AI Gateway Read`

##### P ath ParametersExpand Collapse

account\_id: string

[Link to this property](#)%20ai_gateway.billing%20%3E%20(method)%20usage_history%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

<details>

<summary>

value\_grouping\_window: "day"or "hour"

Grouping window for usage data.

</summary>

One of the following:

"day"

<a href="#">Link to this property</a>

"hour"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_gateway.billing%20%3E%20(method)%20usage_history%20%3E%20(params)%20default%20%3E%20(param)%20value_grouping_window%20%3E%20(schema)>)

end\_time: optional number

End time as Unix timestamp in milliseconds.

[Link to this property](#)%20ai_gateway.billing%20%3E%20(method)%20usage_history%20%3E%20(params)%20default%20%3E%20(param)%20end_time%20%3E%20(schema)>)

start\_time: optional number

Start time as Unix timestamp in milliseconds.

[Link to this property](#)%20ai_gateway.billing%20%3E%20(method)%20usage_history%20%3E%20(params)%20default%20%3E%20(param)%20start_time%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of object {code, message }

</summary>

code: number

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_gateway.billing%20%3E%20(method)%20usage_history%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {code, message }

</summary>

code: number

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_gateway.billing%20%3E%20(method)%20usage_history%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {history }

</summary>

<details>

<summary>

history: array of object {id, aggregated\_value, end\_time, start\_time }

</summary>

id: string

<a href="#">Link to this property</a>

aggregated\_value: number

<a href="#">Link to this property</a>

end\_time: number

<a href="#">Link to this property</a>

start\_time: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_gateway.billing%20%3E%20(method)%20usage_history%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

[Link to this property](#)%20ai_gateway.billing%20%3E%20(method)%20usage_history%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result\_info: optional object {has\_more, page, per\_page, total\_count }

</summary>

has\_more: boolean

<a href="#">Link to this property</a>

page: number

<a href="#">Link to this property</a>

per\_page: number

<a href="#">Link to this property</a>

total\_count: number

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_gateway.billing%20%3E%20(method)%20usage_history%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### Get usage history

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/billing/usage-history \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "result": {
    "history": [
      {
        "id": "id",
        "aggregated_value": 0,
        "end_time": 0,
        "start_time": 0
      }
    ]
  },
  "success": true,
  "result_info": {
    "has_more": true,
    "page": 0,
    "per_page": 0,
    "total_count": 0
  }
}
```

##### Returns Examples

200 example

```
{
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "result": {
    "history": [
      {
        "id": "id",
        "aggregated_value": 0,
        "end_time": 0,
        "start_time": 0
      }
    ]
  },
  "success": true,
  "result_info": {
    "has_more": true,
    "page": 0,
    "per_page": 0,
    "total_count": 0
  }
}
```