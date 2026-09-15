---
title: Update User Subscription
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[User](https://developers.cloudflare.com/api/resources/user)

[Subscriptions](https://developers.cloudflare.com/api/resources/user/subresources/subscriptions)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Update User Subscription

PUT/user/subscriptions/{identifier}

Updates a user’s subscriptions.

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

`Billing Write`

##### P ath ParametersExpand Collapse

identifier: string

Subscription identifier tag.

maxLength32

[Link to this property](#)%20user.subscriptions%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20identifier%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

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

[Link to this property](#)%20user.subscriptions%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20frequency%20%3E%20(schema)>)

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

[Link to this property](#)%20user.subscriptions%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20rate_plan%20%3E%20(schema)>)

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

[Link to this property](#)%20user.subscriptions%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20user.subscriptions%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: unknownor string

</summary>

One of the following:

unknown

<a href="#">Link to this property</a>

string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20user.subscriptions%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful

[Link to this property](#)%20user.subscriptions%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Update User Subscription

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/user/subscriptions/$IDENTIFIER \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "frequency": "monthly"
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
  "result": {},
  "success": true
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
  "result": {},
  "success": true
}
```