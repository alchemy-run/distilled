---
title: Edit global schema validation settings
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Schema Validation](https://developers.cloudflare.com/api/resources/schema_validation)

[Settings](https://developers.cloudflare.com/api/resources/schema_validation/subresources/settings)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Edit global schema validation settings

PATCH/zones/{zone\_id}/schema\_validation/settings

Partially updates global schema validation settings for a zone using PATCH semantics.

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

[Link to this property](#)%20schema_validation.settings%20%3E%20(method)%20edit%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

<details>

<summary>

validation\_default\_mitigation\_action: optional "none"or "log"or "block"

The default mitigation action used Mitigation actions are as follows:

- <code>"log"</code> - log request when request does not conform to schema
- <code>"block"</code> - deny access to the site when request does not conform to schema
- <code>"none"</code> - skip running schema validation

</summary>

One of the following:

"none"

<a href="#">Link to this property</a>

"log"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20schema_validation.settings%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20validation_default_mitigation_action%20%3E%20(schema)>)

validation\_override\_mitigation\_action: optional "none"

When set, this overrides both zone level and operation level mitigation actions.

- `"none"` - skip running schema validation entirely for the request
- `null` - clears any existing override

[Link to this property](#)%20schema_validation.settings%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20validation_override_mitigation_action%20%3E%20(schema)>)

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

[Link to this property](#)%20schema_validation.settings%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20schema_validation.settings%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {validation\_default\_mitigation\_action, validation\_override\_mitigation\_action }

</summary>

<details>

<summary>

validation\_default\_mitigation\_action: "none"or "log"or "block"

The default mitigation action used

Mitigation actions are as follows:

- <code>log</code> - log request when request does not conform to schema
- <code>block</code> - deny access to the site when request does not conform to schema
- <code>none</code> - skip running schema validation

</summary>

One of the following:

"none"

<a href="#">Link to this property</a>

"log"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

validation\_override\_mitigation\_action: optional "none"

When not null, this overrides global both zone level and operation level mitigation actions. This can serve as a quick way to disable schema validation for the whole zone.

- <code>"none"</code> will skip running schema validation entirely for the request

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20schema_validation.settings%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20schema_validation.settings%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Edit global schema validation settings

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/schema_validation/settings \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "validation_default_mitigation_action": "block"
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
    "validation_default_mitigation_action": "block",
    "validation_override_mitigation_action": "none"
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
    "validation_default_mitigation_action": "block",
    "validation_override_mitigation_action": "none"
  },
  "success": true
}
```