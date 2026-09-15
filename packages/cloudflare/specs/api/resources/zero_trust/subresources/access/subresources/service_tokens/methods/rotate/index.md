---
title: Rotate a service token
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Access](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access)

[Service Tokens](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/service_tokens)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Rotate a service token

POST/accounts/{account\_id}/access/service\_tokens/{service\_token\_id}/rotate

Generates a new Client Secret for a service token and revokes the old one.

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

##### P ath ParametersExpand Collapse

account\_id: string

Identifier.

maxLength32

[Link to this property](#)%20zero_trust.access.service_tokens%20%3E%20(method)%20rotate%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

service\_token\_id: string

UUID.

maxLength36

[Link to this property](#)%20zero_trust.access.service_tokens%20%3E%20(method)%20rotate%20%3E%20(params)%20default%20%3E%20(param)%20service_token_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

previous\_client\_secret\_expires\_at: optional string

The expiration of the previous `client_secret`. If not provided, it defaults to the current timestamp in order to immediately expire the previous secret.

formatdate-time

[Link to this property](#)%20zero_trust.access.service_tokens%20%3E%20(method)%20rotate%20%3E%20(params)%200%20%3E%20(param)%20previous_client_secret_expires_at%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of object {code, message, documentation\_url, source }

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

[Link to this property](#)%20zero_trust.access.service_tokens%20%3E%20(method)%20rotate%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {code, message, documentation\_url, source }

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

[Link to this property](#)%20zero_trust.access.service_tokens%20%3E%20(method)%20rotate%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20zero_trust.access.service_tokens%20%3E%20(method)%20rotate%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {id, client\_id, client\_secret, 3 more }

</summary>

id: optional string

The ID of the service token.

<a href="#">Link to this property</a>

client\_id: optional string

The Client ID for the service token. Access will check for this value in the <code>CF-Access-Client-ID</code> request header.

<a href="#">Link to this property</a>

client\_secret: optional string

The Client Secret for the service token. Access will check for this value in the <code>CF-Access-Client-Secret</code> request header.

<a href="#">Link to this property</a>

duration: optional string

The duration for how long the service token will be valid. Must be in the format <code>300ms</code> or <code>2h45m</code>, or the special value <code>forever</code> for non-expiring tokens. Valid time units are: ns, us (or µs), ms, s, m, h. The default is 1 year in hours (8760h).

<a href="#">Link to this property</a>

enabled: optional boolean

Whether the service token is enabled. A disabled service token cannot be used to authenticate; both its current and previous <code>client_secret</code> stop being accepted, but the token itself is preserved and can be re-enabled at any time. Defaults to enabled when omitted on create.

<a href="#">Link to this property</a>

name: optional string

The name of the service token.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.service_tokens%20%3E%20(method)%20rotate%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Rotate a service token

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/service_tokens/$SERVICE_TOKEN_ID/rotate \
    -X POST \
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
  "success": true,
  "result": {
    "id": "id",
    "client_id": "88bf3b6d86161464f6509f7219099e57.access.example.com",
    "client_secret": "bdd31cbc4dec990953e39163fbbb194c93313ca9f0a6e420346af9d326b1d2a5",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "duration": "60m",
    "enabled": true,
    "name": "CI/CD token",
    "updated_at": "2014-01-01T05:20:00.12345Z"
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
  "success": true,
  "result": {
    "id": "id",
    "client_id": "88bf3b6d86161464f6509f7219099e57.access.example.com",
    "client_secret": "bdd31cbc4dec990953e39163fbbb194c93313ca9f0a6e420346af9d326b1d2a5",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "duration": "60m",
    "enabled": true,
    "name": "CI/CD token",
    "updated_at": "2014-01-01T05:20:00.12345Z"
  }
}
```