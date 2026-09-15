---
title: Get delivery mechanism eligibility
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Alerting](https://developers.cloudflare.com/api/resources/alerting)

[Destinations](https://developers.cloudflare.com/api/resources/alerting/subresources/destinations)

[Eligible](https://developers.cloudflare.com/api/resources/alerting/subresources/destinations/subresources/eligible)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get delivery mechanism eligibility

GET/accounts/{account\_id}/alerting/v3/destinations/eligible

Get a list of all delivery mechanism types for which an account is eligible.

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

The account id

maxLength32

[Link to this property](#)%20alerting.destinations.eligible%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of object {message, code }

</summary>

message: string

<a href="#">Link to this property</a>

code: optional number

minimum1000

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20alerting.destinations.eligible%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {message, code }

</summary>

message: string

<a href="#">Link to this property</a>

code: optional number

minimum1000

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20alerting.destinations.eligible%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful

[Link to this property](#)%20alerting.destinations.eligible%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional map\[array of object {eligible, ready, type } ]

</summary>

eligible: optional boolean

Determines whether or not the account is eligible for the delivery mechanism.

<a href="#">Link to this property</a>

ready: optional boolean

Beta flag. Users can create a policy with a mechanism that is not ready, but we cannot guarantee successful delivery of notifications.

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "email"or "pagerduty"or "webhook"

Determines type of delivery mechanism.

</summary>

One of the following:

"email"

<a href="#">Link to this property</a>

"pagerduty"

<a href="#">Link to this property</a>

"webhook"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20alerting.destinations.eligible%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Get delivery mechanism eligibility

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/alerting/v3/destinations/eligible \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "errors": [
    {
      "message": "message",
      "code": 1000
    }
  ],
  "messages": [
    {
      "message": "message",
      "code": 1000
    }
  ],
  "success": true,
  "result": {
    "foo": [
      {
        "eligible": true,
        "ready": true,
        "type": "email"
      }
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
      "message": "message",
      "code": 1000
    }
  ],
  "messages": [
    {
      "message": "message",
      "code": 1000
    }
  ],
  "success": true,
  "result": {
    "foo": [
      {
        "eligible": true,
        "ready": true,
        "type": "email"
      }
    ]
  }
}
```