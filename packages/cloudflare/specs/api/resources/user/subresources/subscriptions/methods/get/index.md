---
title: Get User Subscriptions
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[User](https://developers.cloudflare.com/api/resources/user)

[Subscriptions](https://developers.cloudflare.com/api/resources/user/subresources/subscriptions)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get User Subscriptions

GET/user/subscriptions

Lists all of a user’s subscriptions.

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

`Billing Write``Billing Read`

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20response_info%20%3E%20(schema)">ResponseInfo</a> { code, message, documentation\_url, source }

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

[Link to this property](#)%20user.subscriptions%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20response_info%20%3E%20(schema)">ResponseInfo</a> { code, message, documentation\_url, source }

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

[Link to this property](#)%20user.subscriptions%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20subscription%20%3E%20(schema)">Subscription</a> { id, currency, current\_period\_end, 5 more }

</summary>

id: optional string

Subscription identifier tag.

maxLength32

<a href="#">Link to this property</a>

currency: optional string

The monetary unit in which pricing information is displayed.

<a href="#">Link to this property</a>

current\_period\_end: optional string

The end of the current period and also when the next billing is due.

formatdate-time

<a href="#">Link to this property</a>

current\_period\_start: optional string

When the current billing period started. May match initial\_period\_start if this is the first period.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

frequency: optional "weekly"or "monthly"or "quarterly"or "yearly"

How often the subscription is renewed automatically.

</summary>

One of the following:

"weekly"

<a href="#">Link to this property</a>

"monthly"

<a href="#">Link to this property</a>

"quarterly"

<a href="#">Link to this property</a>

"yearly"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

price: optional number

The price of the subscription that will be billed, in US dollars.

<a href="#">Link to this property</a>

<details>

<summary>

rate\_plan: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20rate_plan%20%3E%20(schema)">RatePlan</a> { id, currency, externally\_managed, 4 more }

The rate plan applied to the subscription.

</summary>

<details>

<summary>

id: optional "free"or "lite"or "pro"or 7 more

The ID of the rate plan.

</summary>

One of the following:

"free"

<a href="#">Link to this property</a>

"lite"

<a href="#">Link to this property</a>

"pro"

<a href="#">Link to this property</a>

"pro\_plus"

<a href="#">Link to this property</a>

"business"

<a href="#">Link to this property</a>

"enterprise"

<a href="#">Link to this property</a>

"partners\_free"

<a href="#">Link to this property</a>

"partners\_pro"

<a href="#">Link to this property</a>

"partners\_business"

<a href="#">Link to this property</a>

"partners\_enterprise"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

currency: optional string

The currency applied to the rate plan subscription.

<a href="#">Link to this property</a>

externally\_managed: optional boolean

Whether this rate plan is managed externally from Cloudflare.

<a href="#">Link to this property</a>

is\_contract: optional boolean

Whether a rate plan is enterprise-based (or newly adopted term contract).

<a href="#">Link to this property</a>

public\_name: optional string

The full name of the rate plan.

<a href="#">Link to this property</a>

scope: optional string

The scope that this rate plan applies to.

<a href="#">Link to this property</a>

sets: optional array of string

The list of sets this rate plan applies to. Returns array of strings.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

state: optional "Trial"or "Provisioned"or "Paid"or 4 more

The state that the subscription is in.

</summary>

One of the following:

"Trial"

<a href="#">Link to this property</a>

"Provisioned"

<a href="#">Link to this property</a>

"Paid"

<a href="#">Link to this property</a>

"AwaitingPayment"

<a href="#">Link to this property</a>

"Cancelled"

<a href="#">Link to this property</a>

"Failed"

<a href="#">Link to this property</a>

"Expired"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20user.subscriptions%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful

[Link to this property](#)%20user.subscriptions%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result\_info: optional object {count, page, per\_page, total\_count }

</summary>

count: optional number

Total number of results for the requested service

<a href="#">Link to this property</a>

page: optional number

Current page within paginated list of results

<a href="#">Link to this property</a>

per\_page: optional number

Number of results per page of results

<a href="#">Link to this property</a>

total\_count: optional number

Total results available without any search parameters

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20user.subscriptions%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### Get User Subscriptions

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/user/subscriptions \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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
  "result": [
    {
      "id": "506e3185e9c882d175a2d0cb0093d9f2",
      "currency": "USD",
      "current_period_end": "2014-03-31T12:20:00Z",
      "current_period_start": "2014-05-11T12:20:00Z",
      "frequency": "monthly",
      "price": 20,
      "rate_plan": {
        "id": "free",
        "currency": "USD",
        "externally_managed": false,
        "is_contract": false,
        "public_name": "Business Plan",
        "scope": "zone",
        "sets": [
          "string"
        ]
      },
      "state": "Paid"
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
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
  "result": [
    {
      "id": "506e3185e9c882d175a2d0cb0093d9f2",
      "currency": "USD",
      "current_period_end": "2014-03-31T12:20:00Z",
      "current_period_start": "2014-05-11T12:20:00Z",
      "frequency": "monthly",
      "price": 20,
      "rate_plan": {
        "id": "free",
        "currency": "USD",
        "externally_managed": false,
        "is_contract": false,
        "public_name": "Business Plan",
        "scope": "zone",
        "sets": [
          "string"
        ]
      },
      "state": "Paid"
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```