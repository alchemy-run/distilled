---
title: List Requests
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Cloudforce One](https://developers.cloudflare.com/api/resources/cloudforce_one)

[Requests](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/requests)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List Requests

POST/accounts/{account\_id}/cloudforce-one/requests

Lists Cloudforce One intelligence requests with filtering and pagination.

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

[Link to this property](#)%20cloudforce_one.requests%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

page: number

Page number of results.

[Link to this property](#)%20cloudforce_one.requests%20%3E%20(method)%20list%20%3E%20(params)%200%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: number

Number of results per page.

[Link to this property](#)%20cloudforce_one.requests%20%3E%20(method)%20list%20%3E%20(params)%200%20%3E%20(param)%20per_page%20%3E%20(schema)>)

completed\_after: optional string

Retrieve requests completed after this time.

formatdate-time

[Link to this property](#)%20cloudforce_one.requests%20%3E%20(method)%20list%20%3E%20(params)%200%20%3E%20(param)%20completed_after%20%3E%20(schema)>)

completed\_before: optional string

Retrieve requests completed before this time.

formatdate-time

[Link to this property](#)%20cloudforce_one.requests%20%3E%20(method)%20list%20%3E%20(params)%200%20%3E%20(param)%20completed_before%20%3E%20(schema)>)

created\_after: optional string

Retrieve requests created after this time.

formatdate-time

[Link to this property](#)%20cloudforce_one.requests%20%3E%20(method)%20list%20%3E%20(params)%200%20%3E%20(param)%20created_after%20%3E%20(schema)>)

created\_before: optional string

Retrieve requests created before this time.

formatdate-time

[Link to this property](#)%20cloudforce_one.requests%20%3E%20(method)%20list%20%3E%20(params)%200%20%3E%20(param)%20created_before%20%3E%20(schema)>)

request\_type: optional string

Requested information from request.

[Link to this property](#)%20cloudforce_one.requests%20%3E%20(method)%20list%20%3E%20(params)%200%20%3E%20(param)%20request_type%20%3E%20(schema)>)

sort\_by: optional string

Field to sort results by.

[Link to this property](#)%20cloudforce_one.requests%20%3E%20(method)%20list%20%3E%20(params)%200%20%3E%20(param)%20sort_by%20%3E%20(schema)>)

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

[Link to this property](#)%20cloudforce_one.requests%20%3E%20(method)%20list%20%3E%20(params)%200%20%3E%20(param)%20sort_order%20%3E%20(schema)>)

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

[Link to this property](#)%20cloudforce_one.requests%20%3E%20(method)%20list%20%3E%20(params)%200%20%3E%20(param)%20status%20%3E%20(schema)>)

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

[Link to this property](#)%20cloudforce_one.requests%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20cloudforce_one.requests%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20cloudforce_one.requests%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional array of <a href="https://developers.cloudflare.com/api/resources/cloudforce_one#(resource)%20cloudforce_one.requests%20%3E%20(model)%20list_item%20%3E%20(schema)">ListItem</a> { id, created, priority, 9 more }

</summary>

id: string

UUID.

maxLength36

<a href="#">Link to this property</a>

created: string

Request creation time.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

priority: "routine"or "high"or "urgent"

</summary>

One of the following:

"routine"

<a href="#">Link to this property</a>

"high"

<a href="#">Link to this property</a>

"urgent"

<a href="#">Link to this property</a>

</details>

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

Request last updated time.

formatdate-time

<a href="#">Link to this property</a>

completed: optional string

Request completion time.

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

[Link to this property](#)%20cloudforce_one.requests%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### List Requests

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/requests \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "page": 0,
          "per_page": 10,
          "completed_after": "2022-01-01T00:00:00Z",
          "completed_before": "2024-01-01T00:00:00Z",
          "created_after": "2022-01-01T00:00:00Z",
          "created_before": "2024-01-01T00:00:00Z",
          "request_type": "Victomology",
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
      "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "created": "2022-04-01T00:00:00Z",
      "priority": "routine",
      "request": "Victomology",
      "summary": "DoS attack",
      "tlp": "clear",
      "updated": "2022-04-01T00:00:00Z",
      "completed": "2024-01-01T00:00:00Z",
      "message_tokens": 16,
      "readable_id": "RFI-2022-000001",
      "status": "open",
      "tokens": 0
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
      "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "created": "2022-04-01T00:00:00Z",
      "priority": "routine",
      "request": "Victomology",
      "summary": "DoS attack",
      "tlp": "clear",
      "updated": "2022-04-01T00:00:00Z",
      "completed": "2024-01-01T00:00:00Z",
      "message_tokens": 16,
      "readable_id": "RFI-2022-000001",
      "status": "open",
      "tokens": 0
    }
  ]
}
```