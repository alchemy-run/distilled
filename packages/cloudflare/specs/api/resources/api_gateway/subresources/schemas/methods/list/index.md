---
title: Export web and API operations as OpenAPI schemas
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[API Gateway](https://developers.cloudflare.com/api/resources/api_gateway)

[Schemas](https://developers.cloudflare.com/api/resources/api_gateway/subresources/schemas)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Export web and API operations as OpenAPI schemas

GET/zones/{zone\_id}/api\_gateway/schemas

Returns tracked web and API operations and their feature configuration rendered as OpenAPI schemas.

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

[Link to this property](#)%20api_gateway.schemas%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

<details>

<summary>

feature: optional array of "thresholds"or "parameter\_schemas"or "schema\_info"or "confidence\_intervals"

Add feature(s) to the results. The feature name that is given here corresponds to the resulting feature object. Have a look at the top-level object description for more details on the specific meaning.

</summary>

One of the following:

"thresholds"

<a href="#">Link to this property</a>

"parameter\_schemas"

<a href="#">Link to this property</a>

"schema\_info"

<a href="#">Link to this property</a>

"confidence\_intervals"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20api_gateway.schemas%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20feature%20%3E%20(schema)>)

host: optional array of string

Receive schema only for the given host(s).

[Link to this property](#)%20api_gateway.schemas%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20host%20%3E%20(schema)>)

include\_schema\_kind: optional array of "learned"

Schema kinds to include in exported OpenAPI schemas.

[Link to this property](#)%20api_gateway.schemas%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20include_schema_kind%20%3E%20(schema)>)

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

[Link to this property](#)%20api_gateway.schemas%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20api_gateway.schemas%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {schemas, timestamp }

</summary>

schemas: optional array of unknown

<a href="#">Link to this property</a>

timestamp: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20api_gateway.schemas%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20api_gateway.schemas%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Export web and API operations as OpenAPI schemas

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/api_gateway/schemas \
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
  "result": {
    "schemas": [
      {
        "info": {
          "title": "OpenAPI JSON schema for www.example.com",
          "version": "1.0"
        },
        "openapi": "3.0.0",
        "paths": {
          "... Further paths ...": {},
          "/api/v1/users/{var1}": {
            "get": {
              "parameters": [
                {
                  "name": "var1",
                  "in": "path",
                  "required": true,
                  "schema": {
                    "type": "string"
                  }
                }
              ]
            }
          }
        },
        "servers": [
          {
            "url": "www.example.com"
          }
        ]
      }
    ],
    "timestamp": "timestamp"
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
    "schemas": [
      {
        "info": {
          "title": "OpenAPI JSON schema for www.example.com",
          "version": "1.0"
        },
        "openapi": "3.0.0",
        "paths": {
          "... Further paths ...": {},
          "/api/v1/users/{var1}": {
            "get": {
              "parameters": [
                {
                  "name": "var1",
                  "in": "path",
                  "required": true,
                  "schema": {
                    "type": "string"
                  }
                }
              ]
            }
          }
        },
        "servers": [
          {
            "url": "www.example.com"
          }
        ]
      }
    ],
    "timestamp": "timestamp"
  },
  "success": true
}
```