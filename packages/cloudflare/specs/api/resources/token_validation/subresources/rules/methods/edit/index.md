---
title: Edit a token validation rule
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Token Validation](https://developers.cloudflare.com/api/resources/token_validation)

[Rules](https://developers.cloudflare.com/api/resources/token_validation/subresources/rules)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Edit a token validation rule

PATCH/zones/{zone\_id}/token\_validation/rules/{rule\_id}

Updates only the supplied fields on a token validation rule.

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

`Account API Gateway``Domain API Gateway`

##### P ath ParametersExpand Collapse

zone\_id: string

Identifier.

maxLength32

[Link to this property](#)%20token_validation.rules%20%3E%20(method)%20edit%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

rule\_id: string

UUID.

maxLength36

[Link to this property](#)%20token_validation.rules%20%3E%20(method)%20edit%20%3E%20(params)%20default%20%3E%20(param)%20rule_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

<details>

<summary>

action: optional "log"or "block"

Action to take on requests that match operations included in <code>selector</code> and fail <code>expression</code>.

</summary>

One of the following:

"log"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20token_validation.rules%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20action%20%3E%20(schema)>)

description: optional string

A human-readable description that gives more details than `title`.

maxLength500

[Link to this property](#)%20token_validation.rules%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20description%20%3E%20(schema)>)

enabled: optional boolean

Toggle rule on or off.

[Link to this property](#)%20token_validation.rules%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20enabled%20%3E%20(schema)>)

expression: optional string

Rule expression. Requests that fail to match this expression will be subject to `action`.

For details on expressions, see the [Cloudflare Docs](https://developers.cloudflare.com/api-shield/security/jwt-validation/).

[Link to this property](#)%20token_validation.rules%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20expression%20%3E%20(schema)>)

<details>

<summary>

position: optional object {index } or object {before } or object {after }

Update rule order among zone rules.

</summary>

One of the following:

<details>

<summary>

APIShieldIndex object {index }

</summary>

index: number

Move rule to this position

minimum1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

APIShieldBefore object {before }

Move rule to after rule with ID.

</summary>

before: optional string

Move rule to before rule with this ID.

formatuuid

maxLength36

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

APIShieldAfter object {after }

Move rule to before rule with ID.

</summary>

after: optional string

Move rule to after rule with this ID.

formatuuid

maxLength36

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20token_validation.rules%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20position%20%3E%20(schema)>)

<details>

<summary>

selector: optional object {exclude, include }

Select operations covered by this rule.

For details on selectors, see the <a href="https://developers.cloudflare.com/api-shield/security/jwt-validation/">Cloudflare Docs</a>.

</summary>

<details>

<summary>

exclude: optional array of object {operation\_ids }

Ignore operations that were otherwise included by <code>include</code>.

</summary>

operation\_ids: optional array of string

Excluded operation IDs.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

include: optional array of object {host }

Select all matching operations.

</summary>

host: optional array of string

Included hostnames.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20token_validation.rules%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20selector%20%3E%20(schema)>)

title: optional string

A human-readable name for the rule.

maxLength50

[Link to this property](#)%20token_validation.rules%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20title%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: <a href="https://developers.cloudflare.com/api/resources/api_gateway#(resource)%20api_gateway.user_schemas%20%3E%20(model)%20message%20%3E%20(schema)">Message</a> { code, message, documentation\_url, source }

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

[Link to this property](#)%20token_validation.rules%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: <a href="https://developers.cloudflare.com/api/resources/api_gateway#(resource)%20api_gateway.user_schemas%20%3E%20(model)%20message%20%3E%20(schema)">Message</a> { code, message, documentation\_url, source }

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

[Link to this property](#)%20token_validation.rules%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: <a href="https://developers.cloudflare.com/api/resources/token_validation#(resource)%20token_validation.rules%20%3E%20(model)%20token_validation_rule%20%3E%20(schema)">TokenValidationRule</a> { action, description, enabled, 6 more }

A Token Validation rule that can enforce security policies using JWT Tokens.

</summary>

<details>

<summary>

action: "log"or "block"

Action to take on requests that match operations included in <code>selector</code> and fail <code>expression</code>.

</summary>

One of the following:

"log"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

description: string

A human-readable description that gives more details than <code>title</code>.

maxLength500

<a href="#">Link to this property</a>

enabled: boolean

Toggle rule on or off.

<a href="#">Link to this property</a>

expression: string

Rule expression. Requests that fail to match this expression will be subject to <code>action</code>.

For details on expressions, see the <a href="https://developers.cloudflare.com/api-shield/security/jwt-validation/">Cloudflare Docs</a>.

<a href="#">Link to this property</a>

<details>

<summary>

selector: object {exclude, include }

Select operations covered by this rule.

For details on selectors, see the <a href="https://developers.cloudflare.com/api-shield/security/jwt-validation/">Cloudflare Docs</a>.

</summary>

<details>

<summary>

exclude: optional array of object {operation\_ids }

Ignore operations that were otherwise included by <code>include</code>.

</summary>

operation\_ids: optional array of string

Excluded operation IDs.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

include: optional array of object {host }

Select all matching operations.

</summary>

host: optional array of string

Included hostnames.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

title: string

A human-readable name for the rule.

maxLength50

<a href="#">Link to this property</a>

id: optional string

UUID.

maxLength36

minLength36

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

last\_updated: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20token_validation.rules%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20token_validation.rules%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Edit a token validation rule

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/token_validation/rules/$RULE_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "action": "log",
          "description": "Long description for Token Validation Rule",
          "enabled": true,
          "expression": "is_jwt_valid(\\"52973293-cb04-4a97-8f55-e7d2ad1107dd\\") or is_jwt_valid(\\"46eab8d1-6376-45e3-968f-2c649d77d423\\")",
          "title": "Example Token Validation Rule"
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
  "result": {
    "action": "log",
    "description": "Long description for Token Validation Rule",
    "enabled": true,
    "expression": "is_jwt_valid(\"52973293-cb04-4a97-8f55-e7d2ad1107dd\") or is_jwt_valid(\"46eab8d1-6376-45e3-968f-2c649d77d423\")",
    "selector": {
      "exclude": [
        {
          "operation_ids": [
            "f9c5615e-fe15-48ce-bec6-cfc1946f1bec",
            "56828eae-035a-4396-ba07-51c66d680a04"
          ]
        }
      ],
      "include": [
        {
          "host": [
            "v1.example.com",
            "v2.example.com"
          ]
        }
      ]
    },
    "title": "Example Token Validation Rule",
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "last_updated": "2014-01-01T05:20:00.12345Z"
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
    "action": "log",
    "description": "Long description for Token Validation Rule",
    "enabled": true,
    "expression": "is_jwt_valid(\"52973293-cb04-4a97-8f55-e7d2ad1107dd\") or is_jwt_valid(\"46eab8d1-6376-45e3-968f-2c649d77d423\")",
    "selector": {
      "exclude": [
        {
          "operation_ids": [
            "f9c5615e-fe15-48ce-bec6-cfc1946f1bec",
            "56828eae-035a-4396-ba07-51c66d680a04"
          ]
        }
      ],
      "include": [
        {
          "host": [
            "v1.example.com",
            "v2.example.com"
          ]
        }
      ]
    },
    "title": "Example Token Validation Rule",
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "last_updated": "2014-01-01T05:20:00.12345Z"
  },
  "success": true
}
```