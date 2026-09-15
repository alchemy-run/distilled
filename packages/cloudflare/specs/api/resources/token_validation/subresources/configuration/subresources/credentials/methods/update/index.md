---
title: Replace token validation credentials
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Token Validation](https://developers.cloudflare.com/api/resources/token_validation)

[Configuration](https://developers.cloudflare.com/api/resources/token_validation/subresources/configuration)

[Credentials](https://developers.cloudflare.com/api/resources/token_validation/subresources/configuration/subresources/credentials)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Replace token validation credentials

PUT/zones/{zone\_id}/token\_validation/config/{config\_id}/credentials

Replaces the configuration’s complete key set. Symmetric keys must include their key material.

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

[Link to this property](#)%20token_validation.configuration.credentials%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

config\_id: string

UUID.

maxLength36

[Link to this property](#)%20token_validation.configuration.credentials%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20config_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

<details>

<summary>

keys: array of object {alg, e, kid, 2 more } or object {alg, crv, kid, 3 more } or object {alg, crv, kid, 3 more } or object {alg, k, kid, kty }

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

APIShieldCredentialsJWTKeyOctRequest object {alg, k, kid, kty }

JSON representation of a symmetric key for create/PUT requests.

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

k: string

Symmetric key material. Required for create and PUT update requests.

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

[Link to this property](#)%20token_validation.configuration.credentials%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20keys%20%3E%20(schema)>)

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

[Link to this property](#)%20token_validation.configuration.credentials%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20token_validation.configuration.credentials%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {keys }

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

[Link to this property](#)%20token_validation.configuration.credentials%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20token_validation.configuration.credentials%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Replace token validation credentials

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/token_validation/config/$CONFIG_ID/credentials \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "keys": [
            {
              "alg": "RS256",
              "e": "e",
              "kid": "kid",
              "kty": "RSA",
              "n": "n"
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
  "success": true
}
```