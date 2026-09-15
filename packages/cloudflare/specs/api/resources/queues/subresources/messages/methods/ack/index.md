---
title: Acknowledge + Retry Queue Messages
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Queues](https://developers.cloudflare.com/api/resources/queues)

[Messages](https://developers.cloudflare.com/api/resources/queues/subresources/messages)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Acknowledge + Retry Queue Messages

POST/accounts/{account\_id}/queues/{queue\_id}/messages/ack

Acknowledge + Retry messages from a Queue

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

[Link to this property](#)%20queues.messages%20%3E%20(method)%20ack%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

queue\_id: string

A Resource identifier.

maxLength32

[Link to this property](#)%20queues.messages%20%3E%20(method)%20ack%20%3E%20(params)%20default%20%3E%20(param)%20queue_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

<details>

<summary>

acks: optional array of object {lease\_id }

</summary>

lease\_id: optional string

An ID that represents an “in-flight” message that has been pulled from a Queue. You must hold on to this ID and use it to acknowledge this message.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20queues.messages%20%3E%20(method)%20ack%20%3E%20(params)%200%20%3E%20(param)%20acks%20%3E%20(schema)>)

<details>

<summary>

retries: optional array of object {delay\_seconds, lease\_id }

</summary>

delay\_seconds: optional number

The number of seconds to delay before making the message available for another attempt.

<a href="#">Link to this property</a>

lease\_id: optional string

An ID that represents an “in-flight” message that has been pulled from a Queue. You must hold on to this ID and use it to acknowledge this message.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20queues.messages%20%3E%20(method)%20ack%20%3E%20(params)%200%20%3E%20(param)%20retries%20%3E%20(schema)>)

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

[Link to this property](#)%20queues.messages%20%3E%20(method)%20ack%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

messages: optional array of string

[Link to this property](#)%20queues.messages%20%3E%20(method)%20ack%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: optional object {ackCount, retryCount, warnings }

</summary>

ackCount: optional number

The number of messages that were succesfully acknowledged.

<a href="#">Link to this property</a>

retryCount: optional number

The number of messages that were succesfully retried.

<a href="#">Link to this property</a>

warnings: optional map\[string]

Map of lease IDs to warning messages encountered during acknowledgement.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20queues.messages%20%3E%20(method)%20ack%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: optional true

Indicates if the API call was successful or not.

[Link to this property](#)%20queues.messages%20%3E%20(method)%20ack%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Acknowledge + Retry Queue Messages

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/queues/$QUEUE_ID/messages/ack \
    -X POST \
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
  "result": {
    "ackCount": 5,
    "retryCount": 5,
    "warnings": {
      "foo": "string"
    }
  },
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
  "result": {
    "ackCount": 5,
    "retryCount": 5,
    "warnings": {
      "foo": "string"
    }
  },
  "success": true
}
```