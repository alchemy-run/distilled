---
title: Submit a feedback report
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Bot Management](https://developers.cloudflare.com/api/resources/bot_management)

[Feedback](https://developers.cloudflare.com/api/resources/bot_management/subresources/feedback)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Submit a feedback report

POST/zones/{zone\_id}/bot\_management/feedback

Submit a feedback report for the specified zone. Use `type` to indicate whether the report is a false positive (good traffic flagged as bot) or a false negative (bot traffic missed). Furthermore, you can also use `expression` as a wirefilter to identify the affected traffic sample.

See more accepted API fields and expression types at https://developers.cloudflare.com/bots/concepts/feedback-loop/#api-fields and https://developers.cloudflare.com/bots/concepts/feedback-loop/#expression-fields, respectively.

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

[Link to this property](#)%20bot_management.feedback%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

description: string

[Link to this property](#)%20bot_management.feedback%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20description%20%3E%20(schema)>)

expression: string

Wirefilter expression describing the traffic being reported.

[Link to this property](#)%20bot_management.feedback%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20expression%20%3E%20(schema)>)

first\_request\_seen\_at: string

formatdate-time

[Link to this property](#)%20bot_management.feedback%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20first_request_seen_at%20%3E%20(schema)>)

last\_request\_seen\_at: string

formatdate-time

[Link to this property](#)%20bot_management.feedback%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20last_request_seen_at%20%3E%20(schema)>)

requests: number

formatint64

[Link to this property](#)%20bot_management.feedback%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20requests%20%3E%20(schema)>)

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

[Link to this property](#)%20bot_management.feedback%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20requests_by_attribute%20%3E%20(schema)>)

requests\_by\_score: [RequestsByScore](<https://developers.cloudflare.com/api/resources/bot_management#(resource)%20bot_management.feedback%20%3E%20(model)%20requests_by_score%20%3E%20(schema)>)

Map of bot scores (1-99) to request counts. Sum must equal `requests`.

[Link to this property](#)%20bot_management.feedback%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20requests_by_score%20%3E%20(schema)>)

requests\_by\_score\_src: [RequestsByScoreSrc](<https://developers.cloudflare.com/api/resources/bot_management#(resource)%20bot_management.feedback%20%3E%20(model)%20requests_by_score_src%20%3E%20(schema)>)

Map of score source to request counts. Sum must equal `requests`.

[Link to this property](#)%20bot_management.feedback%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20requests_by_score_src%20%3E%20(schema)>)

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

[Link to this property](#)%20bot_management.feedback%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20type%20%3E%20(schema)>)

subtype: optional string

[Link to this property](#)%20bot_management.feedback%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20subtype%20%3E%20(schema)>)

### Submit a feedback report

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/bot_management/feedback \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d "{
          \"description\": \"Automated scraping missed by detections\",
          \"expression\": \"http.host eq 'www.example.com' and http.request.uri.path starts_with '/products' and cf.bot_management.score gt 25\",
          \"first_request_seen_at\": \"2025-09-29T00:00:00Z\",
          \"last_request_seen_at\": \"2025-09-29T06:00:00Z\",
          \"requests\": 2000,
          \"requests_by_attribute\": {
            \"topIPs\": [
              {
                \"metric\": \"203.0.113.55\",
                \"requests\": 400
              }
            ],
            \"topJA3Hashes\": [
              {
                \"metric\": \"ab12cd34ef56...\",
                \"requests\": 900
              }
            ]
          },
          \"requests_by_score\": {
            \"30\": 800,
            \"40\": 700,
            \"50\": 500
          },
          \"requests_by_score_src\": {
            \"heuristics\": 200,
            \"ml\": 1800
          },
          \"type\": \"false_negative\"
        }"
```

##### Returns Examples