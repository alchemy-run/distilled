---
title: Update session identifier settings
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[API Gateway](https://developers.cloudflare.com/api/resources/api_gateway)

[Configurations](https://developers.cloudflare.com/api/resources/api_gateway/subresources/configurations)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Update session identifier settings

PUT/zones/{zone\_id}/api\_gateway/configuration

Replaces the zone’s authentication identifier characteristics used to identify distinct API sessions.

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

[Link to this property](#)%20api_gateway.configurations%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

normalize: optional boolean

Ensures that the configuration is written or retrieved in normalized fashion

[Link to this property](#)%20api_gateway.configurations%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20normalize%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

<details>

<summary>

auth\_id\_characteristics: array of object {name, type } or object {name, type }

</summary>

One of the following:

<details>

<summary>

APIShieldAuthIDCharacteristic object {name, type }

Auth ID Characteristic

</summary>

name: string

The name of the characteristic field, i.e., the header or cookie name.

maxLength128

<a href="#">Link to this property</a>

<details>

<summary>

type: "header"or "cookie"

The type of characteristic.

</summary>

One of the following:

"header"

<a href="#">Link to this property</a>

"cookie"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

APIShieldAuthIDCharacteristicJWTClaim object {name, type }

Auth ID Characteristic extracted from JWT Token Claims

</summary>

name: string

Claim location expressed as <code>$(token_config_id):$(json_path)</code>, where <code>token_config_id</code> is the ID of the token configuration used in validating the JWT, and <code>json_path</code> is a RFC 9535 JSONPath (<a href="https://goessner.net/articles/JsonPath/">https://goessner.net/articles/JsonPath/</a>, <a href="https://www.rfc-editor.org/rfc/rfc9535.html">https://www.rfc-editor.org/rfc/rfc9535.html</a>). The JSONPath expression may be in dot or bracket notation, may only specify literal keys or array indexes, and must return a singleton value, which will be interpreted as a string.

maxLength128

<a href="#">Link to this property</a>

type: "jwt"

The type of characteristic.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20api_gateway.configurations%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20auth_id_characteristics%20%3E%20(schema)>)

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

[Link to this property](#)%20api_gateway.configurations%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20api_gateway.configurations%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: <a href="https://developers.cloudflare.com/api/resources/api_gateway#(resource)%20api_gateway.configurations%20%3E%20(model)%20configuration%20%3E%20(schema)">Configuration</a> { auth\_id\_characteristics }

</summary>

<details>

<summary>

auth\_id\_characteristics: array of object {name, type } or object {name, type }

</summary>

One of the following:

<details>

<summary>

APIShieldAuthIDCharacteristic object {name, type }

Auth ID Characteristic

</summary>

name: string

The name of the characteristic field, i.e., the header or cookie name.

maxLength128

<a href="#">Link to this property</a>

<details>

<summary>

type: "header"or "cookie"

The type of characteristic.

</summary>

One of the following:

"header"

<a href="#">Link to this property</a>

"cookie"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

APIShieldAuthIDCharacteristicJWTClaim object {name, type }

Auth ID Characteristic extracted from JWT Token Claims

</summary>

name: string

Claim location expressed as <code>$(token_config_id):$(json_path)</code>, where <code>token_config_id</code> is the ID of the token configuration used in validating the JWT, and <code>json_path</code> is a RFC 9535 JSONPath (<a href="https://goessner.net/articles/JsonPath/">https://goessner.net/articles/JsonPath/</a>, <a href="https://www.rfc-editor.org/rfc/rfc9535.html">https://www.rfc-editor.org/rfc/rfc9535.html</a>). The JSONPath expression may be in dot or bracket notation, may only specify literal keys or array indexes, and must return a singleton value, which will be interpreted as a string.

maxLength128

<a href="#">Link to this property</a>

type: "jwt"

The type of characteristic.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20api_gateway.configurations%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20api_gateway.configurations%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Update session identifier settings

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/api_gateway/configuration \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "auth_id_characteristics": [
            {
              "name": "authorization",
              "type": "header"
            }
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
  "result": {
    "auth_id_characteristics": [
      {
        "name": "authorization",
        "type": "header"
      }
    ]
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
    "auth_id_characteristics": [
      {
        "name": "authorization",
        "type": "header"
      }
    ]
  },
  "success": true
}
```