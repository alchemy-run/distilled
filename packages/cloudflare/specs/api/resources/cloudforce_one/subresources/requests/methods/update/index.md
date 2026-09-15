---
title: Update a Request
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Cloudforce One](https://developers.cloudflare.com/api/resources/cloudforce_one)

[Requests](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/requests)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Update a Request

PUT/accounts/{account\_id}/cloudforce-one/requests/{request\_id}

Updating a request alters the request in the Cloudforce One queue. This API may be used to update any attributes of the request after the initial submission. Only fields that you choose to update need to be add to the request body.

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

[Link to this property](#)%20cloudforce_one.requests%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

request\_id: string

UUID.

maxLength36

[Link to this property](#)%20cloudforce_one.requests%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20request_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

content: optional string

Request content.

[Link to this property](#)%20cloudforce_one.requests%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20content%20%3E%20(schema)>)

priority: optional string

Priority for analyzing the request.

[Link to this property](#)%20cloudforce_one.requests%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20priority%20%3E%20(schema)>)

request\_type: optional string

Requested information from request.

[Link to this property](#)%20cloudforce_one.requests%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20request_type%20%3E%20(schema)>)

summary: optional string

Brief description of the request.

[Link to this property](#)%20cloudforce_one.requests%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20summary%20%3E%20(schema)>)

<details>

<summary>

tlp: optional "clear"or "amber"or "amber-strict"or 2 more

The CISA defined Traffic Light Protocol (TLP).

</summary>

One of the following:

"clear"

<a href="#">Link to this property</a>

"amber"

<a href="#">Link to this property</a>

"amber-strict"

<a href="#">Link to this property</a>

"green"

<a href="#">Link to this property</a>

"red"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.requests%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20tlp%20%3E%20(schema)>)

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

[Link to this property](#)%20cloudforce_one.requests%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20cloudforce_one.requests%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20cloudforce_one.requests%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional <a href="https://developers.cloudflare.com/api/resources/cloudforce_one#(resource)%20cloudforce_one.requests%20%3E%20(model)%20item%20%3E%20(schema)">Item</a> { id, content, created, 10 more }

</summary>

id: string

UUID.

maxLength36

<a href="#">Link to this property</a>

content: string

Request content.

<a href="#">Link to this property</a>

created: string

formatdate-time

<a href="#">Link to this property</a>

priority: string

formatdate-time

<a href="#">Link to this property</a>

request: string

Requested information from request.

<a href="#">Link to this property</a>

summary: string

Brief description of the request.

<a href="#">Link to this property</a>

<details>

<summary>

tlp: "clear"or "amber"or "amber-strict"or 2 more

The CISA defined Traffic Light Protocol (TLP).

</summary>

One of the following:

"clear"

<a href="#">Link to this property</a>

"amber"

<a href="#">Link to this property</a>

"amber-strict"

<a href="#">Link to this property</a>

"green"

<a href="#">Link to this property</a>

"red"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated: string

formatdate-time

<a href="#">Link to this property</a>

completed: optional string

formatdate-time

<a href="#">Link to this property</a>

message\_tokens: optional number

Tokens for the request messages.

<a href="#">Link to this property</a>

readable\_id: optional string

Readable Request ID.

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "open"or "accepted"or "reported"or 3 more

Request Status.

</summary>

One of the following:

"open"

<a href="#">Link to this property</a>

"accepted"

<a href="#">Link to this property</a>

"reported"

<a href="#">Link to this property</a>

"approved"

<a href="#">Link to this property</a>

"completed"

<a href="#">Link to this property</a>

"declined"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

tokens: optional number

Tokens for the request.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.requests%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Update a Request

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/requests/$REQUEST_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "content": "What regions were most effected by the recent DoS?",
          "priority": "routine",
          "request_type": "Victomology",
          "summary": "DoS attack"
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
  "result": {
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "content": "What regions were most effected by the recent DoS?",
    "created": "2022-04-01T05:20:00Z",
    "priority": "2022-04-01T05:20:00Z",
    "request": "Victomology",
    "summary": "DoS attack",
    "tlp": "clear",
    "updated": "2022-04-01T05:20:00Z",
    "completed": "2022-04-01T05:20:00Z",
    "message_tokens": 1,
    "readable_id": "RFI-2022-000001",
    "status": "open",
    "tokens": 16
  }
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
  "result": {
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "content": "What regions were most effected by the recent DoS?",
    "created": "2022-04-01T05:20:00Z",
    "priority": "2022-04-01T05:20:00Z",
    "request": "Victomology",
    "summary": "DoS attack",
    "tlp": "clear",
    "updated": "2022-04-01T05:20:00Z",
    "completed": "2022-04-01T05:20:00Z",
    "message_tokens": 1,
    "readable_id": "RFI-2022-000001",
    "status": "open",
    "tokens": 16
  }
}
```