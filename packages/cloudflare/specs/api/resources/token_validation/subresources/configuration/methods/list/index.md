---
title: List token validation configurations
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Token Validation](https://developers.cloudflare.com/api/resources/token_validation)

[Configuration](https://developers.cloudflare.com/api/resources/token_validation/subresources/configuration)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List token validation configurations

GET/zones/{zone\_id}/token\_validation/config

Lists the JWT validation configurations defined for the zone.

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

[Link to this property](#)%20token_validation.configuration%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

page: optional number

Page number of paginated results.

minimum1

[Link to this property](#)%20token_validation.configuration%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: optional number

Maximum number of results per page.

maximum50

minimum5

[Link to this property](#)%20token_validation.configuration%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

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

[Link to this property](#)%20token_validation.configuration%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20token_validation.configuration%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: array of <a href="https://developers.cloudflare.com/api/resources/token_validation#(resource)%20token_validation.configuration%20%3E%20(model)%20token_config%20%3E%20(schema)">TokenConfig</a> { id, created\_at, credentials, 5 more }

</summary>

id: string

UUID.

maxLength36

minLength36

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

credentials: object {keys }

</summary>

<details>

<summary>

keys: array of object {alg, e, kid, 2 more } or object {alg, crv, kid, 3 more } or object {alg, crv, kid, 3 more } or object {alg, kid, kty }

</summary>

One of the following:

<details>

<summary>

APIShieldCredentialsJWTKeyRSA object {alg, e, kid, 2 more }

JSON representation of an RSA key.

</summary>

<details>

<summary>

alg: "RS256"or "RS384"or "RS512"or 3 more

Algorithm

</summary>

One of the following:

"RS256"

<a href="#">Link to this property</a>

"RS384"

<a href="#">Link to this property</a>

"RS512"

<a href="#">Link to this property</a>

"PS256"

<a href="#">Link to this property</a>

"PS384"

<a href="#">Link to this property</a>

"PS512"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

e: string

RSA exponent

<a href="#">Link to this property</a>

kid: string

Key ID

<a href="#">Link to this property</a>

kty: "RSA"

Key Type

<a href="#">Link to this property</a>

n: string

RSA modulus

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

APIShieldCredentialsJWTKeyEcEs256 object {alg, crv, kid, 3 more }

JSON representation of an ES256 key

</summary>

alg: "ES256"

Algorithm

<a href="#">Link to this property</a>

crv: "P-256"

Curve

<a href="#">Link to this property</a>

kid: string

Key ID

<a href="#">Link to this property</a>

kty: "EC"

Key Type

<a href="#">Link to this property</a>

x: string

X EC coordinate

<a href="#">Link to this property</a>

y: string

Y EC coordinate

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

APIShieldCredentialsJWTKeyEcEs384 object {alg, crv, kid, 3 more }

JSON representation of an ES384 key

</summary>

alg: "ES384"

Algorithm

<a href="#">Link to this property</a>

crv: "P-384"

Curve

<a href="#">Link to this property</a>

kid: string

Key ID

<a href="#">Link to this property</a>

kty: "EC"

Key Type

<a href="#">Link to this property</a>

x: string

X EC coordinate

<a href="#">Link to this property</a>

y: string

Y EC coordinate

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

APIShieldCredentialsJWTKeyOctResponse object {alg, kid, kty }

JSON representation of a symmetric verification key in API responses (secret material is redacted).

</summary>

<details>

<summary>

alg: "HS256"or "HS384"or "HS512"

Algorithm

</summary>

One of the following:

"HS256"

<a href="#">Link to this property</a>

"HS384"

<a href="#">Link to this property</a>

"HS512"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

kid: string

Key ID

<a href="#">Link to this property</a>

kty: "oct"

Key Type

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

description: string

maxLength500

<a href="#">Link to this property</a>

last\_updated: string

formatdate-time

<a href="#">Link to this property</a>

title: string

maxLength50

<a href="#">Link to this property</a>

token\_sources: array of string

<a href="#">Link to this property</a>

token\_type: "JWT"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20token_validation.configuration%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20token_validation.configuration%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

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

[Link to this property](#)%20token_validation.configuration%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### List token validation configurations

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/token_validation/config \
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
      "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "created_at": "2014-01-01T05:20:00.12345Z",
      "credentials": {
        "keys": [
          {
            "alg": "ES256",
            "crv": "P-256",
            "kid": "38013f13-c266-4eec-a72a-92ec92779f21",
            "kty": "EC",
            "x": "KN53JRwN3wCjm2o39bvZUX2VdrsHzS8pxOAGjm8m7EQ",
            "y": "lnkkzIxaveggz-HFhcMWW15nxvOj0Z_uQsXbpK0GFcY"
          }
        ]
      },
      "description": "Long description for Token Validation Configuration",
      "last_updated": "2014-01-01T05:20:00.12345Z",
      "title": "Example Token Validation Configuration",
      "token_sources": [
        "http.request.headers[\"x-auth\"][0]",
        "http.request.cookies[\"Authorization\"][0]"
      ],
      "token_type": "JWT"
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
      "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "created_at": "2014-01-01T05:20:00.12345Z",
      "credentials": {
        "keys": [
          {
            "alg": "ES256",
            "crv": "P-256",
            "kid": "38013f13-c266-4eec-a72a-92ec92779f21",
            "kty": "EC",
            "x": "KN53JRwN3wCjm2o39bvZUX2VdrsHzS8pxOAGjm8m7EQ",
            "y": "lnkkzIxaveggz-HFhcMWW15nxvOj0Z_uQsXbpK0GFcY"
          }
        ]
      },
      "description": "Long description for Token Validation Configuration",
      "last_updated": "2014-01-01T05:20:00.12345Z",
      "title": "Example Token Validation Configuration",
      "token_sources": [
        "http.request.headers[\"x-auth\"][0]",
        "http.request.cookies[\"Authorization\"][0]"
      ],
      "token_type": "JWT"
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