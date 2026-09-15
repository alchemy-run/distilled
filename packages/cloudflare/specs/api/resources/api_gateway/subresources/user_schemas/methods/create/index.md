---
title: Upload a legacy schema
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[API Gateway](https://developers.cloudflare.com/api/resources/api_gateway)

[User Schemas](https://developers.cloudflare.com/api/resources/api_gateway/subresources/user_schemas)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Upload a legacy schema

Deprecated: Use \[Schema Validation API](https://developers.cloudflare.com/api/resources/schema\_validation/) instead.

POST/zones/{zone\_id}/api\_gateway/user\_schemas

Uploads an OpenAPI schema that defines expected request formats for API endpoints. Deprecated; use `/zones/{zone_id}/schema_validation/schemas` instead.

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

[Link to this property](#)%20api_gateway.user_schemas%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

##### Body ParametersForm DataExpand Collapse

file: file

Schema file bytes

[Link to this property](#)%20api_gateway.user_schemas%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20file%20%3E%20(schema)>)

kind: "openapi\_v3"

Kind of schema

[Link to this property](#)%20api_gateway.user_schemas%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20kind%20%3E%20(schema)>)

name: optional string

Name of the schema

[Link to this property](#)%20api_gateway.user_schemas%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20name%20%3E%20(schema)>)

<details>

<summary>

validation\_enabled: optional "true"or "false"

Flag whether schema is enabled for validation.

</summary>

One of the following:

"true"

<a href="#">Link to this property</a>

"false"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20api_gateway.user_schemas%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20validation_enabled%20%3E%20(schema)>)

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

[Link to this property](#)%20api_gateway.user_schemas%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20api_gateway.user_schemas%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {schema, upload\_details }

</summary>

<details>

<summary>

schema: <a href="https://developers.cloudflare.com/api/resources/api_gateway#(resource)%20api_gateway.user_schemas%20%3E%20(model)%20old_public_schema%20%3E%20(schema)">OldPublicSchema</a> { created\_at, kind, name, 3 more }

</summary>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

kind: "openapi\_v3"

Kind of schema

<a href="#">Link to this property</a>

name: string

Name of the schema

<a href="#">Link to this property</a>

schema\_id: string

UUID.

maxLength36

minLength36

<a href="#">Link to this property</a>

source: optional string

Source of the schema

<a href="#">Link to this property</a>

validation\_enabled: optional boolean

Flag whether schema is enabled for validation.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

upload\_details: optional object {warnings }

</summary>

<details>

<summary>

warnings: optional array of object {code, locations, message }

Diagnostic warning events that occurred during processing. These events are non-critical errors found within the schema.

</summary>

code: number

Code that identifies the event that occurred.

<a href="#">Link to this property</a>

locations: optional array of string

JSONPath location(s) in the schema where these events were encountered. See <a href="https://goessner.net/articles/JsonPath/">https://goessner.net/articles/JsonPath/</a> for JSONPath specification.

<a href="#">Link to this property</a>

message: optional string

Diagnostic message that describes the event.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20api_gateway.user_schemas%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20api_gateway.user_schemas%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Upload a legacy schema

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/api_gateway/user_schemas \
    -H 'Content-Type: multipart/form-data' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -F 'file=@/path/to/file' \
    -F kind=openapi_v3 \
    -F name='petstore schema'
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
    "schema": {
      "created_at": "2014-01-01T05:20:00.12345Z",
      "kind": "openapi_v3",
      "name": "petstore schema",
      "schema_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "source": "<schema file bytes>",
      "validation_enabled": true
    },
    "upload_details": {
      "warnings": [
        {
          "code": 28,
          "locations": [
            ".paths[\"/user/{username}\"].put"
          ],
          "message": "unsupported media type: application/octet-stream"
        }
      ]
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
    "schema": {
      "created_at": "2014-01-01T05:20:00.12345Z",
      "kind": "openapi_v3",
      "name": "petstore schema",
      "schema_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "source": "<schema file bytes>",
      "validation_enabled": true
    },
    "upload_details": {
      "warnings": [
        {
          "code": 28,
          "locations": [
            ".paths[\"/user/{username}\"].put"
          ],
          "message": "unsupported media type: application/octet-stream"
        }
      ]
    }
  },
  "success": true
}
```