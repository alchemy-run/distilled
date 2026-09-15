---
title: Update per-operation schema validation setting
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Schema Validation](https://developers.cloudflare.com/api/resources/schema_validation)

[Settings](https://developers.cloudflare.com/api/resources/schema_validation/subresources/settings)

[Operations](https://developers.cloudflare.com/api/resources/schema_validation/subresources/settings/subresources/operations)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Update per-operation schema validation setting

PUT/zones/{zone\_id}/schema\_validation/settings/operations/{operation\_id}

Fully updates schema validation settings for a specific API operation.

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

[Link to this property](#)%20schema_validation.settings.operations%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

operation\_id: string

UUID.

maxLength36

[Link to this property](#)%20schema_validation.settings.operations%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20operation_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

<details>

<summary>

mitigation\_action: "log"or "block"or "none"

When set, this applies a mitigation action to this operation

- <code>"log"</code> - log request when request does not conform to schema for this operation
- <code>"block"</code> - deny access to the site when request does not conform to schema for this operation
- <code>"none"</code> - will skip mitigation for this operation
- <code>null</code> - clears any mitigation action

</summary>

One of the following:

"log"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

"none"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20schema_validation.settings.operations%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20mitigation_action%20%3E%20(schema)>)

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

[Link to this property](#)%20schema_validation.settings.operations%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20schema_validation.settings.operations%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {mitigation\_action, operation\_id }

</summary>

<details>

<summary>

mitigation\_action: "log"or "block"or "none"

When set, this applies a mitigation action to this operation which supersedes a global schema validation setting just for this operation

- <code>"log"</code> - log request when request does not conform to schema for this operation
- <code>"block"</code> - deny access to the site when request does not conform to schema for this operation
- <code>"none"</code> - will skip mitigation for this operation

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

operation\_id: string

UUID.

maxLength36

minLength36

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20schema_validation.settings.operations%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20schema_validation.settings.operations%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Update per-operation schema validation setting

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/schema_validation/settings/operations/$OPERATION_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "mitigation_action": "block"
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
    "mitigation_action": "block",
    "operation_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
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
    "mitigation_action": "block",
    "operation_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
  },
  "success": true
}
```