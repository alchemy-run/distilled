---
title: List zone feedback reports
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Bot Management](https://developers.cloudflare.com/api/resources/bot_management)

[Feedback](https://developers.cloudflare.com/api/resources/bot_management/subresources/feedback)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List zone feedback reports

GET/zones/{zone\_id}/bot\_management/feedback

Returns all feedback reports previously submitted for the specified zone. Feedback reports help improve detection by sharing samples of traffic that were misclassified as bots or humans.

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

`Bot Management Feedback Report Write``Bot Management Feedback Report Read``Bot Management Write``Bot Management Read`

##### P ath ParametersExpand Collapse

zone\_id: string

Identifier.

maxLength32

[Link to this property](#)%20bot_management.feedback%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

description: string

[Link to this property](#)%20bot_management.feedback%20%3E%20(model)%20feedback_report%20%3E%20(schema)%20%3E%20(property)%20description>)

expression: string

Wirefilter expression describing the traffic being reported.

[Link to this property](#)%20bot_management.feedback%20%3E%20(model)%20feedback_report%20%3E%20(schema)%20%3E%20(property)%20expression>)

first\_request\_seen\_at: string

formatdate-time

[Link to this property](#)%20bot_management.feedback%20%3E%20(model)%20feedback_report%20%3E%20(schema)%20%3E%20(property)%20first_request_seen_at>)

last\_request\_seen\_at: string

formatdate-time

[Link to this property](#)%20bot_management.feedback%20%3E%20(model)%20feedback_report%20%3E%20(schema)%20%3E%20(property)%20last_request_seen_at>)

requests: number

formatint64

[Link to this property](#)%20bot_management.feedback%20%3E%20(model)%20feedback_report%20%3E%20(schema)%20%3E%20(property)%20requests>)

<details>

<summary>

requests\_by\_attribute: <a href="https://developers.cloudflare.com/api/resources/bot_management#(resource)%20bot_management.feedback%20%3E%20(model)%20requests_by_attribute%20%3E%20(schema)">RequestsByAttribute</a> { metric, requests }

Top attributes contributing to the feedback sample. Keys include topASNs, topCountries, topHosts, topIPs, topJA3Hashes, topJA4s, topPaths, topUserAgents.

</summary>

metric: string

<a href="#">Link to this property</a>

requests: number

formatint64

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20bot_management.feedback%20%3E%20(model)%20feedback_report%20%3E%20(schema)%20%3E%20(property)%20requests_by_attribute>)

requests\_by\_score: [RequestsByScore](<https://developers.cloudflare.com/api/resources/bot_management#(resource)%20bot_management.feedback%20%3E%20(model)%20requests_by_score%20%3E%20(schema)>)

Map of bot scores (1-99) to request counts. Sum must equal `requests`.

[Link to this property](#)%20bot_management.feedback%20%3E%20(model)%20feedback_report%20%3E%20(schema)%20%3E%20(property)%20requests_by_score>)

requests\_by\_score\_src: [RequestsByScoreSrc](<https://developers.cloudflare.com/api/resources/bot_management#(resource)%20bot_management.feedback%20%3E%20(model)%20requests_by_score_src%20%3E%20(schema)>)

Map of score source to request counts. Sum must equal `requests`.

[Link to this property](#)%20bot_management.feedback%20%3E%20(model)%20feedback_report%20%3E%20(schema)%20%3E%20(property)%20requests_by_score_src>)

<details>

<summary>

type: <a href="https://developers.cloudflare.com/api/resources/bot_management#(resource)%20bot_management.feedback%20%3E%20(model)%20feedback_type%20%3E%20(schema)">FeedbackType</a>

Type of feedback report.

</summary>

One of the following:

"false\_positive"

<a href="#">Link to this property</a>

"false\_negative"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20bot_management.feedback%20%3E%20(model)%20feedback_report%20%3E%20(schema)%20%3E%20(property)%20type>)

created\_at: optional string

formatdate-time

[Link to this property](#)%20bot_management.feedback%20%3E%20(model)%20feedback_report%20%3E%20(schema)%20%3E%20(property)%20created_at>)

subtype: optional string

[Link to this property](#)%20bot_management.feedback%20%3E%20(model)%20feedback_report%20%3E%20(schema)%20%3E%20(property)%20subtype>)

### List zone feedback reports

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/bot_management/feedback \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
[
  {
    "created_at": "2025-10-01T12:00:00Z",
    "description": "Legitimate checkout traffic was blocked as bots",
    "expression": "(http.host eq 'shop.example.com' and http.request.uri.path starts_with '/checkout') and cf.bot_management.score lt 5",
    "first_request_seen_at": "2025-09-30T08:00:00Z",
    "last_request_seen_at": "2025-09-30T09:00:00Z",
    "requests": 1200,
    "requests_by_attribute": {
      "topIPs": [
        {
          "metric": "203.0.113.10",
          "requests": 180
        },
        {
          "metric": "203.0.113.11",
          "requests": 150
        }
      ],
      "topPaths": [
        {
          "metric": "/checkout",
          "requests": 1000
        }
      ]
    },
    "requests_by_score": {
      "1": 200,
      "2": 300,
      "3": 400,
      "4": 300
    },
    "requests_by_score_src": {
      "heuristics": 200,
      "machine_learning": 1000
    },
    "subtype": "Spamming",
    "type": "false_positive"
  }
]
```

##### Returns Examples

200 example

```
[
  {
    "created_at": "2025-10-01T12:00:00Z",
    "description": "Legitimate checkout traffic was blocked as bots",
    "expression": "(http.host eq 'shop.example.com' and http.request.uri.path starts_with '/checkout') and cf.bot_management.score lt 5",
    "first_request_seen_at": "2025-09-30T08:00:00Z",
    "last_request_seen_at": "2025-09-30T09:00:00Z",
    "requests": 1200,
    "requests_by_attribute": {
      "topIPs": [
        {
          "metric": "203.0.113.10",
          "requests": 180
        },
        {
          "metric": "203.0.113.11",
          "requests": 150
        }
      ],
      "topPaths": [
        {
          "metric": "/checkout",
          "requests": 1000
        }
      ]
    },
    "requests_by_score": {
      "1": 200,
      "2": 300,
      "3": 400,
      "4": 300
    },
    "requests_by_score_src": {
      "heuristics": 200,
      "machine_learning": 1000
    },
    "subtype": "Spamming",
    "type": "false_positive"
  }
]
```