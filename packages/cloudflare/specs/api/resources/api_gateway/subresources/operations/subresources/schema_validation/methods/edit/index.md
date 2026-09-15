---
title: Update multiple operation-level schema validation settings
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[API Gateway](https://developers.cloudflare.com/api/resources/api_gateway)

[Operations](https://developers.cloudflare.com/api/resources/api_gateway/subresources/operations)

[Schema Validation](https://developers.cloudflare.com/api/resources/api_gateway/subresources/operations/subresources/schema_validation)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Update multiple operation-level schema validation settings

Deprecated: Use \[Schema Validation API](https://developers.cloudflare.com/api/resources/schema\_validation/) instead.

PATCH/zones/{zone\_id}/api\_gateway/operations/schema\_validation

Updates multiple operation-level schema validation settings on the zone. Deprecated; use `/zones/{zone_id}/schema_validation/settings/operations` instead.

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

[Link to this property](#)%20api_gateway.operations.schema_validation%20%3E%20(method)%20edit%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

<details>

<summary>

settings\_multiple\_request: <a href="https://developers.cloudflare.com/api/resources/api_gateway#(resource)%20api_gateway.operations.schema_validation%20%3E%20(model)%20settings_multiple_request%20%3E%20(schema)">SettingsMultipleRequest</a> { mitigation\_action }

</summary>

<details>

<summary>

mitigation\_action: optional "log"or "block"or "none"

When set, this applies a mitigation action to this operation

- <code>log</code> log request when request does not conform to schema for this operation
- <code>block</code> deny access to the site when request does not conform to schema for this operation
- <code>none</code> will skip mitigation for this operation
- <code>null</code> indicates that no operation level mitigation is in place, see Zone Level Schema Validation Settings for mitigation action that will be applied

</summary>

One of the following:

"log"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

"none"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20api_gateway.operations.schema_validation%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20settings_multiple_request%20%3E%20(schema)>)

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

[Link to this property](#)%20api_gateway.operations.schema_validation%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20api_gateway.operations.schema_validation%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: <a href="https://developers.cloudflare.com/api/resources/api_gateway#(resource)%20api_gateway.operations.schema_validation%20%3E%20(model)%20settings_multiple_request%20%3E%20(schema)">SettingsMultipleRequest</a> { mitigation\_action }

</summary>

<details>

<summary>

mitigation\_action: optional "log"or "block"or "none"

When set, this applies a mitigation action to this operation

- <code>log</code> log request when request does not conform to schema for this operation
- <code>block</code> deny access to the site when request does not conform to schema for this operation
- <code>none</code> will skip mitigation for this operation
- <code>null</code> indicates that no operation level mitigation is in place, see Zone Level Schema Validation Settings for mitigation action that will be applied

</summary>

One of the following:

"log"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

"none"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20api_gateway.operations.schema_validation%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20api_gateway.operations.schema_validation%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Update multiple operation-level schema validation settings

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/api_gateway/operations/schema_validation \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "3818d821-5901-4147-a474-f5f5aec1d54e": {
            "mitigation_action": "log"
          },
          "b17c8043-99a0-4202-b7d9-8f7cdbee02cd": {
            "mitigation_action": "block"
          }
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
    "3818d821-5901-4147-a474-f5f5aec1d54e": {
      "mitigation_action": "log"
    },
    "b17c8043-99a0-4202-b7d9-8f7cdbee02cd": {
      "mitigation_action": "block"
    }
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
    "3818d821-5901-4147-a474-f5f5aec1d54e": {
      "mitigation_action": "log"
    },
    "b17c8043-99a0-4202-b7d9-8f7cdbee02cd": {
      "mitigation_action": "block"
    }
  },
  "success": true
}
```