---
title: Create PagerDuty integration token
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Alerting](https://developers.cloudflare.com/api/resources/alerting)

[Destinations](https://developers.cloudflare.com/api/resources/alerting/subresources/destinations)

[Pagerduty](https://developers.cloudflare.com/api/resources/alerting/subresources/destinations/subresources/pagerduty)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Create PagerDuty integration token

POST/accounts/{account\_id}/alerting/v3/destinations/pagerduty/connect

Creates a new token for integrating with PagerDuty.

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

`Notifications Write``Account Settings Write`

##### P ath ParametersExpand Collapse

account\_id: string

The account id

maxLength32

[Link to this property](#)%20alerting.destinations.pagerduty%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

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

[Link to this property](#)%20alerting.destinations.pagerduty%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20alerting.destinations.pagerduty%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful

[Link to this property](#)%20alerting.destinations.pagerduty%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {id }

</summary>

id: optional string

token in form of UUID

maxLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20alerting.destinations.pagerduty%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Create PagerDuty integration token

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/alerting/v3/destinations/pagerduty/connect \
    -X POST \
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
    "id": "a313ba7d3e464c0ea40808fafbc3816a"
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
    "id": "a313ba7d3e464c0ea40808fafbc3816a"
  }
}
```