---
title: List History
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Alerting](https://developers.cloudflare.com/api/resources/alerting)

[History](https://developers.cloudflare.com/api/resources/alerting/subresources/history)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List History

GET/accounts/{account\_id}/alerting/v3/history

Gets a list of history records for notifications sent to an account. The records are displayed for last `x` number of days based on the zone plan (free = 30, pro = 30, biz = 30, ent = 90).

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

`Zero Trust: PII Read``Notifications Write``Notifications Read``Account Settings Write``Account Settings Read`

##### P ath ParametersExpand Collapse

account\_id: string

The account id

maxLength32

[Link to this property](#)%20alerting.history%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

before: optional string

Limit the returned results to history records older than the specified date. This must be a timestamp that conforms to RFC3339.

formatdate-time

[Link to this property](#)%20alerting.history%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20before%20%3E%20(schema)>)

page: optional number

Page number of paginated results.

minimum1

[Link to this property](#)%20alerting.history%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: optional number

Number of items per page.

maximum1000

minimum5

[Link to this property](#)%20alerting.history%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

since: optional string

Limit the returned results to history records newer than the specified date. This must be a timestamp that conforms to RFC3339.

formatdate-time

[Link to this property](#)%20alerting.history%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20since%20%3E%20(schema)>)

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

[Link to this property](#)%20alerting.history%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20alerting.history%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful

[Link to this property](#)%20alerting.history%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional array of <a href="https://developers.cloudflare.com/api/resources/alerting#(resource)%20alerting.history%20%3E%20(model)%20history%20%3E%20(schema)">History</a> { id, alert\_body, alert\_type, 6 more }

</summary>

id: optional string

UUID

maxLength32

<a href="#">Link to this property</a>

alert\_body: optional string

Message body included in the notification sent.

<a href="#">Link to this property</a>

alert\_type: optional string

Type of notification that has been dispatched.

<a href="#">Link to this property</a>

description: optional string

Description of the notification policy (if present).

<a href="#">Link to this property</a>

mechanism: optional string

The mechanism to which the notification has been dispatched.

<a href="#">Link to this property</a>

<details>

<summary>

mechanism\_type: optional "email"or "pagerduty"or "webhook"

The type of mechanism to which the notification has been dispatched. This can be email/pagerduty/webhook based on the mechanism configured.

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

name: optional string

Name of the policy.

<a href="#">Link to this property</a>

policy\_id: optional string

The unique identifier of a notification policy

maxLength32

<a href="#">Link to this property</a>

sent: optional string

Timestamp of when the notification was dispatched in ISO 8601 format.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20alerting.history%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

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

[Link to this property](#)%20alerting.history%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### List History

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/alerting/v3/history \
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
  "result": [
    {
      "id": "f174e90afafe4643bbbc4a0ed4fc8415",
      "alert_body": "SSL certificate has expired",
      "alert_type": "universal_ssl_event_type",
      "description": "Universal Certificate validation status, issuance, renewal, and expiration notices",
      "mechanism": "test@example.com",
      "mechanism_type": "email",
      "name": "SSL Notification Event Policy",
      "policy_id": "0da2b59ef118439d8097bdfb215203c9",
      "sent": "2021-10-08T17:52:17.571336Z"
    }
  ],
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
  "result": [
    {
      "id": "f174e90afafe4643bbbc4a0ed4fc8415",
      "alert_body": "SSL certificate has expired",
      "alert_type": "universal_ssl_event_type",
      "description": "Universal Certificate validation status, issuance, renewal, and expiration notices",
      "mechanism": "test@example.com",
      "mechanism_type": "email",
      "name": "SSL Notification Event Policy",
      "policy_id": "0da2b59ef118439d8097bdfb215203c9",
      "sent": "2021-10-08T17:52:17.571336Z"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```