---
title: List Request Messages
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Cloudforce One](https://developers.cloudflare.com/api/resources/cloudforce_one)

[Requests](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/requests)

[Message](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/requests/subresources/message)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List Request Messages

POST/accounts/{account\_id}/cloudforce-one/requests/{request\_id}/message

Lists messages in a Cloudforce One intelligence request conversation.

##### Security

API Email + API Key

The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**`X-Auth-Email: user@example.com`

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**`X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194`

##### Accepted Permissions (at least one required)

`Cloudforce One Write`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier.

maxLength32

[Link to this property](#)%20cloudforce_one.requests.message%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

request\_id: string

UUID.

maxLength36

[Link to this property](#)%20cloudforce_one.requests.message%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20request_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

page: number

Page number of results.

[Link to this property](#)%20cloudforce_one.requests.message%20%3E%20(method)%20get%20%3E%20(params)%200%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: number

Number of results per page.

[Link to this property](#)%20cloudforce_one.requests.message%20%3E%20(method)%20get%20%3E%20(params)%200%20%3E%20(param)%20per_page%20%3E%20(schema)>)

after: optional string

Retrieve mes ges created after this time.

formatdate-time

[Link to this property](#)%20cloudforce_one.requests.message%20%3E%20(method)%20get%20%3E%20(params)%200%20%3E%20(param)%20after%20%3E%20(schema)>)

before: optional string

Retrieve messages created before this time.

formatdate-time

[Link to this property](#)%20cloudforce_one.requests.message%20%3E%20(method)%20get%20%3E%20(params)%200%20%3E%20(param)%20before%20%3E%20(schema)>)

sort\_by: optional string

Field to sort results by.

[Link to this property](#)%20cloudforce_one.requests.message%20%3E%20(method)%20get%20%3E%20(params)%200%20%3E%20(param)%20sort_by%20%3E%20(schema)>)

<details>

<summary>

sort\_order: optional "asc"or "desc"

Sort order (asc or desc).

</summary>

One of the following:

"asc"

<a href="#">Link to this property</a>

"desc"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.requests.message%20%3E%20(method)%20get%20%3E%20(params)%200%20%3E%20(param)%20sort_order%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of object {code, message, documentation\_url, source }

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

[Link to this property](#)%20cloudforce_one.requests.message%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {code, message, documentation\_url, source }

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

[Link to this property](#)%20cloudforce_one.requests.message%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20cloudforce_one.requests.message%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional array of <a href="https://developers.cloudflare.com/api/resources/cloudforce_one#(resource)%20cloudforce_one.requests.message%20%3E%20(model)%20message%20%3E%20(schema)">Message</a> { id, author, content, 3 more }

</summary>

id: number

Message ID.

<a href="#">Link to this property</a>

author: string

Author of message.

<a href="#">Link to this property</a>

content: string

Content of message.

<a href="#">Link to this property</a>

is\_follow\_on\_request: boolean

Whether the message is a follow-on request.

<a href="#">Link to this property</a>

updated: string

Defines the message last updated time.

formatdate-time

<a href="#">Link to this property</a>

created: optional string

Defines the message creation time.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.requests.message%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### List Request Messages

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/requests/$REQUEST_ID/message \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "page": 0,
          "per_page": 10,
          "before": "2024-01-01T00:00:00Z",
          "sort_by": "created"
        }'
```

200 example

```
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "success": true,
  "result": [
    {
      "id": 0,
      "author": "user@domain.com",
      "content": "Can you elaborate on the type of DoS that occurred?",
      "is_follow_on_request": true,
      "updated": "2022-01-01T00:00:00Z",
      "created": "2022-01-01T00:00:00Z"
    }
  ]
}
```

##### Returns Examples

200 example

```
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "success": true,
  "result": [
    {
      "id": 0,
      "author": "user@domain.com",
      "content": "Can you elaborate on the type of DoS that occurred?",
      "is_follow_on_request": true,
      "updated": "2022-01-01T00:00:00Z",
      "created": "2022-01-01T00:00:00Z"
    }
  ]
}
```