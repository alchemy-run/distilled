---
title: Get Alert Types
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Alerting](https://developers.cloudflare.com/api/resources/alerting)

[Available Alerts](https://developers.cloudflare.com/api/resources/alerting/subresources/available_alerts)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get Alert Types

GET/accounts/{account\_id}/alerting/v3/available\_alerts

Gets a list of all alert types for which an account is eligible.

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

[Link to this property](#)%20alerting.available_alerts%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

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

[Link to this property](#)%20alerting.available_alerts%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20alerting.available_alerts%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful

[Link to this property](#)%20alerting.available_alerts%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional map\[array of object {description, display\_name, filter\_options, type } ]

</summary>

description: optional string

Describes the alert type.

<a href="#">Link to this property</a>

display\_name: optional string

Alert type name.

<a href="#">Link to this property</a>

filter\_options: optional array of unknown

Format of additional configuration options (filters) for the alert type. Data type of filters during policy creation: Array of strings.

<a href="#">Link to this property</a>

type: optional string

Use this value when creating and updating a notification policy.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20alerting.available_alerts%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Get Alert Types

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/alerting/v3/available_alerts \
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
    "Origin Monitoring": [
      {
        "description": "High levels of 5xx HTTP errors at your origin.",
        "display_name": "Origin Error Rate Alert",
        "filter_options": [
          {
            "AvailableValues": null,
            "ComparisonOperator": "==",
            "Key": "zones",
            "Range": "1-n"
          },
          {
            "AvailableValues": [
              {
                "Description": "Service-Level Objective of 99.7",
                "ID": "99.7"
              },
              {
                "Description": "Service-Level Objective of 99.8",
                "ID": "99.8"
              }
            ],
            "ComparisonOperator": ">=",
            "Key": "slo",
            "Range": "0-1"
          }
        ],
        "type": "http_alert_origin_error"
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
    "Origin Monitoring": [
      {
        "description": "High levels of 5xx HTTP errors at your origin.",
        "display_name": "Origin Error Rate Alert",
        "filter_options": [
          {
            "AvailableValues": null,
            "ComparisonOperator": "==",
            "Key": "zones",
            "Range": "1-n"
          },
          {
            "AvailableValues": [
              {
                "Description": "Service-Level Objective of 99.7",
                "ID": "99.7"
              },
              {
                "Description": "Service-Level Objective of 99.8",
                "ID": "99.8"
              }
            ],
            "ComparisonOperator": ">=",
            "Key": "slo",
            "Range": "0-1"
          }
        ],
        "type": "http_alert_origin_error"
      }
    ]
  }
}
```