---
title: Update the AI Security for Apps custom topics of a zone.
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[AI Security](https://developers.cloudflare.com/api/resources/ai_security)

[Custom Topics](https://developers.cloudflare.com/api/resources/ai_security/subresources/custom_topics)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Update the AI Security for Apps custom topics of a zone.

PUT/zones/{zone\_id}/ai-security/custom-topics

Update the custom topic list of the zone, overwriting it entirely with the topics in the request, so include every topic you want to keep. Changes can take up to a minute to propagate.

Each entry has a `label`, used to reference the topic in rule expressions and analytics, and a `topic` description, which the classifier scores prompts against while AI Security for Apps is enabled. The following rules apply:

- A zone can hold at most 20 topics.
- `label` must be 2–20 characters, using only lowercase letters (a–z), digits (0–9), and hyphens.
- `topic` must be 2–50 printable ASCII characters.
- Labels must be unique within the zone, and so must topic descriptions.

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

zone\_id: string

Defines the zone.

maxLength32

[Link to this property](#)%20ai_security.custom_topics%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

<details>

<summary>

topics: optional array of object {label, topic }

Custom topic categories for AI Security for Apps content detection.

</summary>

label: string

Unique label identifier. Must contain only lowercase letters (a–z), digits (0–9), and hyphens.

maxLength20

minLength2

<a href="#">Link to this property</a>

topic: string

Description of the topic category. Must contain only printable ASCII characters.

maxLength50

minLength2

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_security.custom_topics%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20topics%20%3E%20(schema)>)

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

[Link to this property](#)%20ai_security.custom_topics%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20ai_security.custom_topics%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {topics }

</summary>

<details>

<summary>

topics: optional array of object {label, topic }

Custom topic categories for AI Security for Apps content detection.

</summary>

label: string

Unique label identifier. Must contain only lowercase letters (a–z), digits (0–9), and hyphens.

maxLength20

minLength2

<a href="#">Link to this property</a>

topic: string

Description of the topic category. Must contain only printable ASCII characters.

maxLength50

minLength2

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_security.custom_topics%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Defines whether the API call was successful.

[Link to this property](#)%20ai_security.custom_topics%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Update the AI Security for Apps custom topics of a zone.

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/ai-security/custom-topics \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{}'
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
  "result": {
    "topics": [
      {
        "label": "credit-cards",
        "topic": "credit card numbers"
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
  "result": {
    "topics": [
      {
        "label": "credit-cards",
        "topic": "credit card numbers"
      }
    ]
  },
  "success": true
}
```