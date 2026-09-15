---
title: Update DLP account-level settings (full replacement).
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[DLP](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp)

[Settings](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp/subresources/settings)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Update DLP account-level settings (full replacement).

PUT/accounts/{account\_id}/dlp/settings

Missing fields are reset to initial (unconfigured) values.

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

[Link to this property](#)%20zero_trust.dlp.settings%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

ai\_context\_analysis: optional boolean

Whether AI context analysis is enabled at the account level.

[Link to this property](#)%20zero_trust.dlp.settings%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20ai_context_analysis%20%3E%20(schema)>)

ocr: optional boolean

Whether OCR is enabled at the account level.

[Link to this property](#)%20zero_trust.dlp.settings%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20ocr%20%3E%20(schema)>)

<details>

<summary>

payload\_logging: optional object {masking\_level, public\_key }

Request model for payload log settings within the DLP settings endpoint. Unlike the legacy endpoint, null and missing are treated identically here (both mean “not provided” for PATCH, “reset to default” for PUT).

</summary>

<details>

<summary>

masking\_level: optional "full"or "partial"or "clear"or "default"

Masking level for payload logs.

- <code>full</code>: The entire payload is masked.
- <code>partial</code>: Only partial payload content is masked.
- <code>clear</code>: No masking is applied to the payload content.
- <code>default</code>: DLP uses its default masking behavior.

</summary>

One of the following:

"full"

<a href="#">Link to this property</a>

"partial"

<a href="#">Link to this property</a>

"clear"

<a href="#">Link to this property</a>

"default"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

public\_key: optional string

Base64-encoded public key for encrypting payload logs.

- Set to a non-empty base64 string to enable payload logging with the given key.
- Set to an empty string to disable payload logging.
- Omit or set to null to leave unchanged (PATCH) or reset to disabled (PUT).

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dlp.settings%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20payload_logging%20%3E%20(schema)>)

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

[Link to this property](#)%20zero_trust.dlp.settings%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20zero_trust.dlp.settings%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20zero_trust.dlp.settings%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dlp.settings%20%3E%20(model)%20dlp_settings%20%3E%20(schema)">DLPSettings</a> { ai\_context\_analysis, ocr, payload\_logging }

DLP account-level settings response.

</summary>

ai\_context\_analysis: boolean

Whether AI context analysis is enabled at the account level.

<a href="#">Link to this property</a>

ocr: boolean

Whether OCR is enabled at the account level.

<a href="#">Link to this property</a>

<details>

<summary>

payload\_logging: object {updated\_at, masking\_level, public\_key }

</summary>

updated\_at: string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

masking\_level: optional "full"or "partial"or "clear"or "default"

Masking level for payload logs.

- <code>full</code>: The entire payload is masked.
- <code>partial</code>: Only partial payload content is masked.
- <code>clear</code>: No masking is applied to the payload content.
- <code>default</code>: DLP uses its default masking behavior.

</summary>

One of the following:

"full"

<a href="#">Link to this property</a>

"partial"

<a href="#">Link to this property</a>

"clear"

<a href="#">Link to this property</a>

"default"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

public\_key: optional string

Base64-encoded public key for encrypting payload logs. Null when payload logging is disabled.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dlp.settings%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Update DLP account-level settings (full replacement).

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/settings \
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
  "success": true,
  "result": {
    "ai_context_analysis": true,
    "ocr": true,
    "payload_logging": {
      "updated_at": "2019-12-27T18:11:19.117Z",
      "masking_level": "full",
      "public_key": "public_key"
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
    "ai_context_analysis": true,
    "ocr": true,
    "payload_logging": {
      "updated_at": "2019-12-27T18:11:19.117Z",
      "masking_level": "full",
      "public_key": "public_key"
    }
  }
}
```