---
title: Get Request Priority, Status, and TLP constants
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Cloudforce One](https://developers.cloudflare.com/api/resources/cloudforce_one)

[Requests](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/requests)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get Request Priority, Status, and TLP constants

GET/accounts/{account\_id}/cloudforce-one/requests/constants

Retrieves constant values used in Cloudforce One requests, including valid statuses and types.

##### Security

API Email + API Key

The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**`X-Auth-Email: user@example.com`

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**`X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194`

##### Accepted Permissions (at least one required)

`Cloudforce One Write``Cloudforce One Read`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier.

maxLength32

[Link to this property](#)%20cloudforce_one.requests%20%3E%20(method)%20constants%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

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

[Link to this property](#)%20cloudforce_one.requests%20%3E%20(method)%20constants%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20cloudforce_one.requests%20%3E%20(method)%20constants%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20cloudforce_one.requests%20%3E%20(method)%20constants%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional <a href="https://developers.cloudflare.com/api/resources/cloudforce_one#(resource)%20cloudforce_one.requests%20%3E%20(model)%20request_constants%20%3E%20(schema)">RequestConstants</a> { priority, status, tlp }

</summary>

<details>

<summary>

priority: optional array of "routine"or "high"or "urgent"

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

<details>

<summary>

status: optional array of "open"or "accepted"or "reported"or 3 more

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

<details>

<summary>

tlp: optional array of "clear"or "amber"or "amber-strict"or 2 more

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

</details>

[Link to this property](#)%20cloudforce_one.requests%20%3E%20(method)%20constants%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Get Request Priority, Status, and TLP constants

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/requests/constants \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
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
    "priority": [
      "routine",
      "high",
      "urgent"
    ],
    "status": [
      "open",
      "accepted",
      "reported",
      "approved",
      "completed",
      "declined"
    ],
    "tlp": [
      "clear",
      "green",
      "amber",
      "amber-strict",
      "red"
    ]
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
    "priority": [
      "routine",
      "high",
      "urgent"
    ],
    "status": [
      "open",
      "accepted",
      "reported",
      "approved",
      "completed",
      "declined"
    ],
    "tlp": [
      "clear",
      "green",
      "amber",
      "amber-strict",
      "red"
    ]
  }
}
```