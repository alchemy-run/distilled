---
title: Retrieve information about all schemas on a zone
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[API Gateway](https://developers.cloudflare.com/api/resources/api_gateway)

[User Schemas](https://developers.cloudflare.com/api/resources/api_gateway/subresources/user_schemas)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Retrieve information about all schemas on a zone

Deprecated: Use \[Schema Validation API](https://developers.cloudflare.com/api/resources/schema\_validation/) instead.

GET/zones/{zone\_id}/api\_gateway/user\_schemas

Lists all OpenAPI schemas uploaded to API Shield for the zone, including their validation status and associated operations. Deprecated; use `/zones/{zone_id}/schema_validation/schemas` instead.

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

`Account API Gateway``Account API Gateway Read``Domain API Gateway``Domain API Gateway Read`

##### P ath ParametersExpand Collapse

zone\_id: string

Identifier.

maxLength32

[Link to this property](#)%20api_gateway.user_schemas%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

omit\_source: optional boolean

Omit the source-files of schemas and only retrieve their meta-data.

[Link to this property](#)%20api_gateway.user_schemas%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20omit_source%20%3E%20(schema)>)

page: optional number

Page number of paginated results.

minimum1

[Link to this property](#)%20api_gateway.user_schemas%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: optional number

Maximum number of results per page.

maximum50

minimum5

[Link to this property](#)%20api_gateway.user_schemas%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

validation\_enabled: optional boolean

Flag whether schema is enabled for validation.

[Link to this property](#)%20api_gateway.user_schemas%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20validation_enabled%20%3E%20(schema)>)

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

[Link to this property](#)%20api_gateway.user_schemas%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20api_gateway.user_schemas%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: array of <a href="https://developers.cloudflare.com/api/resources/api_gateway#(resource)%20api_gateway.user_schemas%20%3E%20(model)%20old_public_schema%20%3E%20(schema)">OldPublicSchema</a> { created\_at, kind, name, 3 more }

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

[Link to this property](#)%20api_gateway.user_schemas%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20api_gateway.user_schemas%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result\_info: optional object {count, page, per\_page, 2 more }

</summary>

count: optional number

Total number of results for the requested service.

<a href="#">Link to this property</a>

page: optional number

Current page within paginated list of results.

<a href="#">Link to this property</a>

per\_page: optional number

Number of results per page of results.

<a href="#">Link to this property</a>

total\_count: optional number

Total results available without any search parameters.

<a href="#">Link to this property</a>

total\_pages: optional number

The number of total pages in the entire result set.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20api_gateway.user_schemas%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### Retrieve information about all schemas on a zone

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/api_gateway/user_schemas \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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
  "result": [
    {
      "created_at": "2014-01-01T05:20:00.12345Z",
      "kind": "openapi_v3",
      "name": "petstore schema",
      "schema_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "source": "<schema file bytes>",
      "validation_enabled": true
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
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
  "result": [
    {
      "created_at": "2014-01-01T05:20:00.12345Z",
      "kind": "openapi_v3",
      "name": "petstore schema",
      "schema_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "source": "<schema file bytes>",
      "validation_enabled": true
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```