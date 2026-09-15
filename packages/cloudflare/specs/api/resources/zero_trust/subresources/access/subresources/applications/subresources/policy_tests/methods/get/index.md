---
title: Get the current status of a given Access policy test
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Access](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access)

[Applications](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/applications)

[Policy Tests](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/applications/subresources/policy_tests)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get the current status of a given Access policy test

GET/accounts/{account\_id}/access/policy-tests/{policy\_test\_id}

Fetches the current status of a given Access policy test.

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

`Access: Policy Test Write``Access: Policy Test Read`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier.

maxLength32

[Link to this property](#)%20zero_trust.access.applications.policy_tests%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

policy\_test\_id: string

The UUID of the policy test.

maxLength64

[Link to this property](#)%20zero_trust.access.applications.policy_tests%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20policy_test_id%20%3E%20(schema)>)

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

[Link to this property](#)%20zero_trust.access.applications.policy_tests%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20zero_trust.access.applications.policy_tests%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20zero_trust.access.applications.policy_tests%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {id, percent\_approved, percent\_blocked, 7 more }

</summary>

id: optional string

The UUID of the policy test.

maxLength64

<a href="#">Link to this property</a>

percent\_approved: optional number

The percentage of (processed) users approved based on policy evaluation results.

<a href="#">Link to this property</a>

percent\_blocked: optional number

The percentage of (processed) users blocked based on policy evaluation results.

<a href="#">Link to this property</a>

percent\_errored: optional number

The percentage of (processed) users errored based on policy evaluation results.

<a href="#">Link to this property</a>

percent\_users\_processed: optional number

The percentage of users processed so far (of the entire user base).

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "blocked"or "processing"or "exceeded time"or "complete"

The status of the policy test.

</summary>

One of the following:

"blocked"

<a href="#">Link to this property</a>

"processing"

<a href="#">Link to this property</a>

"exceeded time"

<a href="#">Link to this property</a>

"complete"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

total\_users: optional number

The total number of users in the user base.

<a href="#">Link to this property</a>

users\_approved: optional number

The number of (processed) users approved based on policy evaluation results.

<a href="#">Link to this property</a>

users\_blocked: optional number

The number of (processed) users blocked based on policy evaluation results.

<a href="#">Link to this property</a>

users\_errored: optional number

The number of (processed) users errored based on policy evaluation results.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.applications.policy_tests%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Get the current status of a given Access policy test

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/policy-tests/$POLICY_TEST_ID \
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
  "success": true,
  "result": {
    "id": "f1a8b3c9d4e5f6789a0b1c2d3e4f5678a9b0c1d2e3f4a5b67890c1d2e3f4b5a6",
    "percent_approved": 25,
    "percent_blocked": 25,
    "percent_errored": 25,
    "percent_users_processed": 50,
    "status": "complete",
    "total_users": 20,
    "users_approved": 5,
    "users_blocked": 5,
    "users_errored": 5
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
    "id": "f1a8b3c9d4e5f6789a0b1c2d3e4f5678a9b0c1d2e3f4a5b67890c1d2e3f4b5a6",
    "percent_approved": 25,
    "percent_blocked": 25,
    "percent_errored": 25,
    "percent_users_processed": 50,
    "status": "complete",
    "total_users": 20,
    "users_approved": 5,
    "users_blocked": 5,
    "users_errored": 5
  }
}
```