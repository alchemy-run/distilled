---
title: Get Account Billable Usage Info (Version 1, Alpha)
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Billing](https://developers.cloudflare.com/api/resources/billing)

[Usage](https://developers.cloudflare.com/api/resources/billing/subresources/usage)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get Account Billable Usage Info (Version 1, Alpha)

Deprecated: Use \`get\_account\_usage\_info\_v1\` instead.

GET/accounts/{account\_id}/billable-usage/info

Returns high-level usage information for the account, including coverage, and subscription metadata.

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

##### P ath ParametersExpand Collapse

account\_id: string

Represents a Cloudflare resource identifier tag.

maxLength32

[Link to this property](#)%20billing.usage%20%3E%20(method)%20paygo_info%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of object {message, code }

Contains error details if the request failed.

</summary>

message: string

Describes the error or notice.

<a href="#">Link to this property</a>

code: optional number

Identifies the error or notice type.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20billing.usage%20%3E%20(method)%20paygo_info%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {message, code }

Contains any informational messages from the API.

</summary>

message: string

Describes the error or notice.

<a href="#">Link to this property</a>

code: optional number

Identifies the error or notice type.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20billing.usage%20%3E%20(method)%20paygo_info%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {covered, subscriptions }

Contains the usage info.

</summary>

covered: boolean

Indicates whether the account is covered.

<a href="#">Link to this property</a>

<details>

<summary>

subscriptions: array of object {id, billing\_cycle\_anchor\_timestamp, start\_timestamp, end\_timestamp }

List of subscriptions for the account.

</summary>

id: string

The identifier for the Cloudflare subscription.

<a href="#">Link to this property</a>

billing\_cycle\_anchor\_timestamp: string

The subscription billing cycle anchor timestamp.

formatdate-time

<a href="#">Link to this property</a>

start\_timestamp: string

The subscription start timestamp.

formatdate-time

<a href="#">Link to this property</a>

end\_timestamp: optional string

The subscription end timestamp. Omitted for active subscriptions; present only when the subscription has been cancelled.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20billing.usage%20%3E%20(method)%20paygo_info%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Indicates whether the API call was successful.

[Link to this property](#)%20billing.usage%20%3E%20(method)%20paygo_info%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get Account Billable Usage Info (Version 1, Alpha)

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/billable-usage/info \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "errors": [
    {
      "message": "message",
      "code": 0
    }
  ],
  "messages": [
    {
      "message": "message",
      "code": 0
    }
  ],
  "result": {
    "covered": true,
    "subscriptions": [
      {
        "id": "3F3CD4CQ6N7FXO7IK6NVFJBOYA",
        "billing_cycle_anchor_timestamp": "2023-01-01T00:00:00Z",
        "start_timestamp": "2023-01-01T00:00:00Z",
        "end_timestamp": "2023-12-31T23:59:59Z"
      }
    ]
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
      "message": "message",
      "code": 0
    }
  ],
  "messages": [
    {
      "message": "message",
      "code": 0
    }
  ],
  "result": {
    "covered": true,
    "subscriptions": [
      {
        "id": "3F3CD4CQ6N7FXO7IK6NVFJBOYA",
        "billing_cycle_anchor_timestamp": "2023-01-01T00:00:00Z",
        "start_timestamp": "2023-01-01T00:00:00Z",
        "end_timestamp": "2023-12-31T23:59:59Z"
      }
    ]
  },
  "success": true
}
```