---
title: Upload a schema
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Schema Validation](https://developers.cloudflare.com/api/resources/schema_validation)

[Schemas](https://developers.cloudflare.com/api/resources/schema_validation/subresources/schemas)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Upload a schema

POST/zones/{zone\_id}/schema\_validation/schemas

Uploads an OpenAPI schema that defines expected request formats for API operations.

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

[Link to this property](#)%20schema_validation.schemas%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

kind: "openapi\_v3"

The kind of the schema

[Link to this property](#)%20schema_validation.schemas%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20kind%20%3E%20(schema)>)

name: string

A human-readable name for the schema

[Link to this property](#)%20schema_validation.schemas%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20name%20%3E%20(schema)>)

source: string

The raw schema, e.g., the OpenAPI schema, either as JSON or YAML

[Link to this property](#)%20schema_validation.schemas%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20source%20%3E%20(schema)>)

validation\_enabled: boolean

An indicator if this schema is enabled

[Link to this property](#)%20schema_validation.schemas%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20validation_enabled%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of object {code, message, documentation\_url, source }

</summary>

code: number

A unique error code that describes the kind of issue with the schema

minimum1000

<a href="#">Link to this property</a>

message: string

A short text explaining the issue with the schema

<a href="#">Link to this property</a>

documentation\_url: optional string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {locations, pointer }

</summary>

locations: optional array of string

A list of JSON path expression(s) that describe the location(s) of the issue within the provided resource. See <a href="https://goessner.net/articles/JsonPath/">https://goessner.net/articles/JsonPath/</a> for JSONPath specification.

<a href="#">Link to this property</a>

pointer: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20schema_validation.schemas%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {code, message, documentation\_url, source }

</summary>

code: number

A unique error code that describes the kind of issue with the schema

minimum1000

<a href="#">Link to this property</a>

message: string

A short text explaining the issue with the schema

<a href="#">Link to this property</a>

documentation\_url: optional string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {locations, pointer }

</summary>

locations: optional array of string

A list of JSON path expression(s) that describe the location(s) of the issue within the provided resource. See <a href="https://goessner.net/articles/JsonPath/">https://goessner.net/articles/JsonPath/</a> for JSONPath specification.

<a href="#">Link to this property</a>

pointer: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20schema_validation.schemas%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: <a href="https://developers.cloudflare.com/api/resources/schema_validation#(resource)%20schema_validation.schemas%20%3E%20(model)%20public_schema%20%3E%20(schema)">PublicSchema</a> { created\_at, kind, name, 3 more }

A schema used in schema validation

</summary>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

kind: "openapi\_v3"

The kind of the schema

<a href="#">Link to this property</a>

name: string

A human-readable name for the schema

<a href="#">Link to this property</a>

schema\_id: string

A unique identifier of this schema

maxLength36

minLength36

formatuuid

<a href="#">Link to this property</a>

source: string

The raw schema, e.g., the OpenAPI schema, either as JSON or YAML

<a href="#">Link to this property</a>

validation\_enabled: optional boolean

An indicator if this schema is enabled

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20schema_validation.schemas%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20schema_validation.schemas%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Upload a schema

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/schema_validation/schemas \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "kind": "openapi_v3",
          "name": "petstore schema",
          "source": "<schema file contents>",
          "validation_enabled": true
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
        "locations": [
          ".paths[\"/user/{username}\"].put"
        ],
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
        "locations": [
          ".paths[\"/user/{username}\"].put"
        ],
        "pointer": "pointer"
      }
    }
  ],
  "result": {
    "created_at": "2014-01-01T05:20:00.12345Z",
    "kind": "openapi_v3",
    "name": "petstore schema",
    "schema_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "source": "<schema file contents>",
    "validation_enabled": true
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
        "locations": [
          ".paths[\"/user/{username}\"].put"
        ],
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
        "locations": [
          ".paths[\"/user/{username}\"].put"
        ],
        "pointer": "pointer"
      }
    }
  ],
  "result": {
    "created_at": "2014-01-01T05:20:00.12345Z",
    "kind": "openapi_v3",
    "name": "petstore schema",
    "schema_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "source": "<schema file contents>",
    "validation_enabled": true
  },
  "success": true
}
```