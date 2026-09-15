---
title: Delete Queue Consumer
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Queues](https://developers.cloudflare.com/api/resources/queues)

[Consumers](https://developers.cloudflare.com/api/resources/queues/subresources/consumers)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Delete Queue Consumer

DELETE/accounts/{account\_id}/queues/{queue\_id}/consumers/{consumer\_id}

Deletes the consumer for a queue.

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

`Queues Write``Workers Scripts Write`

##### P ath ParametersExpand Collapse

account\_id: string

A Resource identifier.

maxLength32

[Link to this property](#)%20queues.consumers%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

queue\_id: string

A Resource identifier.

maxLength32

[Link to this property](#)%20queues.consumers%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20queue_id%20%3E%20(schema)>)

consumer\_id: string

A Resource identifier.

maxLength32

[Link to this property](#)%20queues.consumers%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20consumer_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: optional array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20response_info%20%3E%20(schema)">ResponseInfo</a> { code, message, documentation\_url, source }

minLength1

</summary>

code: number

minimum1000

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

documentation\_url: optional string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

</summary>

pointer: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20queues.consumers%20%3E%20(model)%20consumer_delete_response%20%3E%20(schema)%20%3E%20(property)%20errors>)

messages: optional array of string

[Link to this property](#)%20queues.consumers%20%3E%20(model)%20consumer_delete_response%20%3E%20(schema)%20%3E%20(property)%20messages>)

success: optional true

Indicates if the API call was successful or not.

[Link to this property](#)%20queues.consumers%20%3E%20(model)%20consumer_delete_response%20%3E%20(schema)%20%3E%20(property)%20success>)

### Delete Queue Consumer

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/queues/$QUEUE_ID/consumers/$CONSUMER_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "errors": [
    {
      "code": 7003,
      "message": "No route for the URI",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    "string"
  ],
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "errors": [
    {
      "code": 7003,
      "message": "No route for the URI",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    "string"
  ],
  "success": true
}
```