---
title: Create a webhook
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Alerting](https://developers.cloudflare.com/api/resources/alerting)

[Destinations](https://developers.cloudflare.com/api/resources/alerting/subresources/destinations)

[Webhooks](https://developers.cloudflare.com/api/resources/alerting/subresources/destinations/subresources/webhooks)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Create a webhook

POST/accounts/{account\_id}/alerting/v3/destinations/webhooks

Creates a new webhook destination.

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

[Link to this property](#)%20alerting.destinations.webhooks%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

name: string

The name of the webhook destination. This will be included in the request body when you receive a webhook notification.

[Link to this property](#)%20alerting.destinations.webhooks%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20name%20%3E%20(schema)>)

url: string

The POST endpoint to call when dispatching a notification.

[Link to this property](#)%20alerting.destinations.webhooks%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20url%20%3E%20(schema)>)

secret: optional string

Optional secret that will be passed in the `cf-webhook-auth` header when dispatching generic webhook notifications or formatted for supported destinations. Secrets are not returned in any API response body.

[Link to this property](#)%20alerting.destinations.webhooks%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20secret%20%3E%20(schema)>)

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

[Link to this property](#)%20alerting.destinations.webhooks%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20alerting.destinations.webhooks%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful

[Link to this property](#)%20alerting.destinations.webhooks%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {id }

</summary>

id: optional string

UUID

maxLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20alerting.destinations.webhooks%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Create a webhook

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/alerting/v3/destinations/webhooks \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "Slack Webhook",
          "url": "https://hooks.slack.com/services/Ds3fdBFbV/456464Gdd"
        }'
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
    "id": "f174e90afafe4643bbbc4a0ed4fc8415"
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
    "id": "f174e90afafe4643bbbc4a0ed4fc8415"
  }
}
```