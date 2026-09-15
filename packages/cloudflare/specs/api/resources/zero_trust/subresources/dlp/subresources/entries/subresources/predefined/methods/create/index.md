---
title: Create predefined entry
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[DLP](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp)

[Entries](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp/subresources/entries)

[Predefined](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp/subresources/entries/subresources/predefined)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Create predefined entry

POST/accounts/{account\_id}/dlp/entries/predefined

Predefined entries can’t be created, this will update an existing predefined entry. This is needed for our generated terraform API.

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

`Zero Trust Write`

##### P ath ParametersExpand Collapse

account\_id: string

[Link to this property](#)%20zero_trust.dlp.entries.predefined%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

enabled: boolean

[Link to this property](#)%20zero_trust.dlp.entries.predefined%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20enabled%20%3E%20(schema)>)

entry\_id: string

formatuuid

[Link to this property](#)%20zero_trust.dlp.entries.predefined%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20entry_id%20%3E%20(schema)>)

profile\_id: optional string

This field is not used as the owning profile. For predefined entries it is already set to a predefined profile.

formatuuid

[Link to this property](#)%20zero_trust.dlp.entries.predefined%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20profile_id%20%3E%20(schema)>)

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

[Link to this property](#)%20zero_trust.dlp.entries.predefined%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20zero_trust.dlp.entries.predefined%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20zero_trust.dlp.entries.predefined%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {id, confidence, enabled, 4 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

confidence: object {ai\_context\_available, available }

</summary>

ai\_context\_available: boolean

Indicates whether this entry has AI remote service validation.

<a href="#">Link to this property</a>

available: boolean

Indicates whether this entry has any form of validation that is not an AI remote service.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

enabled: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

deprecated: optional boolean

Whether this entry is deprecated for new use. This is computed from the static catalog and emitted only when true.

<a href="#">Link to this property</a>

Deprecatedprofile\_id: optional string

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

variant: optional object {topic\_type, type, description } or object {type, description }

A Predefined AI prompt classification topic entry.

</summary>

One of the following:

<details>

<summary>

object {topic\_type, type, description }

A Predefined AI prompt classification topic entry.

</summary>

<details>

<summary>

topic\_type: "Intent"or "Content"

</summary>

One of the following:

"Intent"

<a href="#">Link to this property</a>

"Content"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: "PromptTopic"

<a href="#">Link to this property</a>

description: optional string

A customer-facing explanation of what this predefined AI prompt topic represents.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {type, description }

A general predefined entry.

</summary>

type: "General"

<a href="#">Link to this property</a>

description: optional string

A customer-facing explanation of what this predefined entry represents.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dlp.entries.predefined%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Create predefined entry

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/entries/predefined \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "enabled": true,
          "entry_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
        }'
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
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "confidence": {
      "ai_context_available": true,
      "available": true
    },
    "enabled": true,
    "name": "name",
    "deprecated": true,
    "profile_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "variant": {
      "topic_type": "Intent",
      "type": "PromptTopic",
      "description": "description"
    }
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
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "confidence": {
      "ai_context_available": true,
      "available": true
    },
    "enabled": true,
    "name": "name",
    "deprecated": true,
    "profile_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "variant": {
      "topic_type": "Intent",
      "type": "PromptTopic",
      "description": "description"
    }
  }
}
```