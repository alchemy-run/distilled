---
title: Update Fraud Detection Settings
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Fraud](https://developers.cloudflare.com/api/resources/fraud)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Update Fraud Detection Settings

PUT/zones/{zone\_id}/fraud\_detection/settings

Update Fraud Detection settings for a zone.

Notes on `username_expressions` behavior:

- If omitted or set to null, expressions are not modified.
- If provided as an empty array `[]`, all expressions will be cleared.

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

`Fraud Detection Write`

##### P ath ParametersExpand Collapse

zone\_id: string

Identifier.

maxLength32

[Link to this property](#)%20fraud%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

<details>

<summary>

authentication\_settings: optional object {failure\_criteria, success\_criteria }

Configuration for classifying login authentication outcomes based on the origin response. Requires <code>user_profiles</code> to be enabled.

- Success and failure criteria are independently updatable — sending only <code>success_criteria</code> leaves failure codes untouched, and vice versa.
- Omit <code>authentication_settings</code> entirely to leave both unchanged.
- Status codes must not overlap between success and failure criteria.

</summary>

<details>

<summary>

failure\_criteria: optional object {kind, status\_codes }

Criterion for identifying failed login responses.

</summary>

kind: "status\_code"

The type of criterion. Currently only <code>status_code</code> is supported.

<a href="#">Link to this property</a>

status\_codes: optional array of number

HTTP status codes to match against the origin response.

- Maximum of 10 codes per criterion.
- Each code must be a valid HTTP status code (100-599).
- Codes are deduplicated and sorted on save.
- Omit to leave unchanged on update.
- Provide an empty array <code>[]</code> to clear codes on update.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

success\_criteria: optional object {kind, status\_codes }

Criterion for identifying successful login responses.

</summary>

kind: "status\_code"

The type of criterion. Currently only <code>status_code</code> is supported.

<a href="#">Link to this property</a>

status\_codes: optional array of number

HTTP status codes to match against the origin response.

- Maximum of 10 codes per criterion.
- Each code must be a valid HTTP status code (100-599).
- Codes are deduplicated and sorted on save.
- Omit to leave unchanged on update.
- Provide an empty array <code>[]</code> to clear codes on update.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20fraud%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20authentication_settings%20%3E%20(schema)>)

<details>

<summary>

user\_profiles: optional "enabled"or "disabled"

Whether Fraud User Profiles is enabled for the zone.

</summary>

One of the following:

"enabled"

<a href="#">Link to this property</a>

"disabled"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20fraud%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20user_profiles%20%3E%20(schema)>)

username\_expressions: optional array of string

List of expressions to detect usernames in write HTTP requests.

- Maximum of 10 expressions.
- Omit or set to null to leave unchanged on update.
- Provide an empty array `[]` to clear all expressions on update.
- Invalid expressions will result in a 10400 Bad Request with details in the `messages` array.

[Link to this property](#)%20fraud%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20username_expressions%20%3E%20(schema)>)

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

[Link to this property](#)%20fraud%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20fraud%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20fraud%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional <a href="https://developers.cloudflare.com/api/resources/fraud#(resource)%20fraud%20%3E%20(model)%20fraud_settings%20%3E%20(schema)">FraudSettings</a> { authentication\_settings, user\_profiles, username\_expressions }

</summary>

<details>

<summary>

authentication\_settings: optional object {failure\_criteria, success\_criteria }

Configuration for classifying login authentication outcomes based on the origin response. Requires <code>user_profiles</code> to be enabled.

- Success and failure criteria are independently updatable — sending only <code>success_criteria</code> leaves failure codes untouched, and vice versa.
- Omit <code>authentication_settings</code> entirely to leave both unchanged.
- Status codes must not overlap between success and failure criteria.

</summary>

<details>

<summary>

failure\_criteria: optional object {kind, status\_codes }

Criterion for identifying failed login responses.

</summary>

kind: "status\_code"

The type of criterion. Currently only <code>status_code</code> is supported.

<a href="#">Link to this property</a>

status\_codes: optional array of number

HTTP status codes to match against the origin response.

- Maximum of 10 codes per criterion.
- Each code must be a valid HTTP status code (100-599).
- Codes are deduplicated and sorted on save.
- Omit to leave unchanged on update.
- Provide an empty array <code>[]</code> to clear codes on update.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

success\_criteria: optional object {kind, status\_codes }

Criterion for identifying successful login responses.

</summary>

kind: "status\_code"

The type of criterion. Currently only <code>status_code</code> is supported.

<a href="#">Link to this property</a>

status\_codes: optional array of number

HTTP status codes to match against the origin response.

- Maximum of 10 codes per criterion.
- Each code must be a valid HTTP status code (100-599).
- Codes are deduplicated and sorted on save.
- Omit to leave unchanged on update.
- Provide an empty array <code>[]</code> to clear codes on update.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

user\_profiles: optional "enabled"or "disabled"

Whether Fraud User Profiles is enabled for the zone.

</summary>

One of the following:

"enabled"

<a href="#">Link to this property</a>

"disabled"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

username\_expressions: optional array of string

List of expressions to detect usernames in write HTTP requests.

- Maximum of 10 expressions.
- Omit or set to null to leave unchanged on update.
- Provide an empty array <code>[]</code> to clear all expressions on update.
- Invalid expressions will result in a 10400 Bad Request with details in the <code>messages</code> array.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20fraud%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Update Fraud Detection Settings

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/fraud_detection/settings \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "user_profiles": "disabled",
          "username_expressions": [
            "string"
          ]
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
    "authentication_settings": {
      "failure_criteria": {
        "kind": "status_code",
        "status_codes": [
          200,
          201
        ]
      },
      "success_criteria": {
        "kind": "status_code",
        "status_codes": [
          200,
          201
        ]
      }
    },
    "user_profiles": "disabled",
    "username_expressions": [
      "http.request.body.form[\"username\"][0]",
      "lookup_json_string(http.request.body.raw, \"username\")"
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
    "authentication_settings": {
      "failure_criteria": {
        "kind": "status_code",
        "status_codes": [
          200,
          201
        ]
      },
      "success_criteria": {
        "kind": "status_code",
        "status_codes": [
          200,
          201
        ]
      }
    },
    "user_profiles": "disabled",
    "username_expressions": [
      "http.request.body.form[\"username\"][0]",
      "lookup_json_string(http.request.body.raw, \"username\")"
    ]
  }
}
```