---
title: List OAuth Clients
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[IAM](https://developers.cloudflare.com/api/resources/iam)

[OAuth Clients](https://developers.cloudflare.com/api/resources/iam/subresources/oauth_clients)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List OAuth Clients

GET/accounts/{account\_id}/oauth\_clients

List all OAuth clients for an account.

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

`OAuth Client Read`

##### P ath ParametersExpand Collapse

account\_id: string

Account identifier tag.

maxLength32

minLength32

[Link to this property](#)%20iam.oauth_clients%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

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

[Link to this property](#)%20iam.oauth_clients%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20iam.oauth_clients%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20iam.oauth_clients%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional array of object {client\_id, visibility, allowed\_cors\_origins, 17 more }

</summary>

client\_id: string

The unique identifier for an OAuth client.

<a href="#">Link to this property</a>

<details>

<summary>

visibility: "public"or "private"

Visibility of the OAuth client.

</summary>

One of the following:

"public"

<a href="#">Link to this property</a>

"private"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

allowed\_cors\_origins: optional array of string

Array of allowed CORS origins.

<a href="#">Link to this property</a>

client\_name: optional string

Human-readable name of the OAuth client.

<a href="#">Link to this property</a>

client\_uri: optional string

URL of the home page of the client.

<a href="#">Link to this property</a>

<details>

<summary>

client\_uri\_verification: optional object {status, text }

Client URI domain control verification state.

</summary>

<details>

<summary>

status: optional "pending"or "in\_progress"or "verified"or "failed"

Current verification status for the client URI host.

</summary>

One of the following:

"pending"

<a href="#">Link to this property</a>

"in\_progress"

<a href="#">Link to this property</a>

"verified"

<a href="#">Link to this property</a>

"failed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

text: optional string

Exact TXT record value that must be added to DNS to prove ownership of the client URI host.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_at: optional string

Timestamp when the OAuth client was created.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

grant\_types: optional array of "authorization\_code"or "refresh\_token"

Array of OAuth grant types the client is allowed to use. <code>authorization_code</code> is required; <code>refresh_token</code> may be included optionally.

</summary>

One of the following:

"authorization\_code"

<a href="#">Link to this property</a>

"refresh\_token"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

has\_rotated\_secret: optional boolean

Indicates whether the client has a rotated secret that has not yet been deleted.

<a href="#">Link to this property</a>

logo\_uri: optional string

URL of the client’s logo.

<a href="#">Link to this property</a>

optional\_scopes: optional array of string

Scopes that the authorizing user may decline during consent. Each value must also appear in <code>scopes</code>. The scopes <code>openid</code>, <code>offline</code>, and <code>offline_access</code> cannot be optional.

<a href="#">Link to this property</a>

policy\_uri: optional string

URL that points to a privacy policy document.

<a href="#">Link to this property</a>

post\_logout\_redirect\_uris: optional array of string

Array of allowed post-logout redirect URIs.

<a href="#">Link to this property</a>

promoted\_at: optional string

Timestamp when the OAuth client was promoted to public visibility.

formatdate-time

<a href="#">Link to this property</a>

redirect\_uris: optional array of string

Array of allowed redirect URIs for the client.

<a href="#">Link to this property</a>

<details>

<summary>

response\_types: optional array of "token"or "id\_token"or "code"

Array of OAuth response types the client is allowed to use.

</summary>

One of the following:

"token"

<a href="#">Link to this property</a>

"id\_token"

<a href="#">Link to this property</a>

"code"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

scopes: optional array of string

Array of OAuth scopes the client is allowed to request. Colon-delimited scopes are not accepted. Dot-delimited scopes are validated against available OAuth API scopes; simple identity scopes are allowed. Protocol scopes <code>offline_access</code> and <code>openid</code> are added or removed automatically based on <code>grant_types</code> and <code>response_types</code>.

<a href="#">Link to this property</a>

<details>

<summary>

token\_endpoint\_auth\_method: optional "none"or "client\_secret\_basic"or "client\_secret\_post"

The authentication method the client uses at the token endpoint.

</summary>

One of the following:

"none"

<a href="#">Link to this property</a>

"client\_secret\_basic"

<a href="#">Link to this property</a>

"client\_secret\_post"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

tos\_uri: optional string

URL that points to a terms of service document.

<a href="#">Link to this property</a>

updated\_at: optional string

Timestamp when the OAuth client was last updated.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20iam.oauth_clients%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

<details>

<summary>

result\_info: optional object {count, page, per\_page, total\_count }

</summary>

count: optional number

Total number of results for the requested service

<a href="#">Link to this property</a>

page: optional number

Current page within paginated list of results

<a href="#">Link to this property</a>

per\_page: optional number

Number of results per page of results

<a href="#">Link to this property</a>

total\_count: optional number

Total results available without any search parameters

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20iam.oauth_clients%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### List OAuth Clients

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/oauth_clients \
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
  "result": [
    {
      "client_id": "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4",
      "visibility": "private",
      "allowed_cors_origins": [
        "https://example.com"
      ],
      "client_name": "My OAuth App",
      "client_uri": "https://example.com",
      "client_uri_verification": {
        "status": "in_progress",
        "text": "cloudflare_oauth_client_publisher=example"
      },
      "created_at": "2025-01-01T00:00:00Z",
      "grant_types": [
        "authorization_code",
        "refresh_token"
      ],
      "has_rotated_secret": false,
      "logo_uri": "https://example.com/logo.png",
      "optional_scopes": [
        "account.write"
      ],
      "policy_uri": "https://example.com/privacy",
      "post_logout_redirect_uris": [
        "https://example.com/logout"
      ],
      "promoted_at": "2026-05-13T12:00:00Z",
      "redirect_uris": [
        "https://example.com/callback"
      ],
      "response_types": [
        "code"
      ],
      "scopes": [
        "account.read"
      ],
      "token_endpoint_auth_method": "client_secret_post",
      "tos_uri": "https://example.com/tos",
      "updated_at": "2025-01-01T00:00:00Z"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
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
  "result": [
    {
      "client_id": "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4",
      "visibility": "private",
      "allowed_cors_origins": [
        "https://example.com"
      ],
      "client_name": "My OAuth App",
      "client_uri": "https://example.com",
      "client_uri_verification": {
        "status": "in_progress",
        "text": "cloudflare_oauth_client_publisher=example"
      },
      "created_at": "2025-01-01T00:00:00Z",
      "grant_types": [
        "authorization_code",
        "refresh_token"
      ],
      "has_rotated_secret": false,
      "logo_uri": "https://example.com/logo.png",
      "optional_scopes": [
        "account.write"
      ],
      "policy_uri": "https://example.com/privacy",
      "post_logout_redirect_uris": [
        "https://example.com/logout"
      ],
      "promoted_at": "2026-05-13T12:00:00Z",
      "redirect_uris": [
        "https://example.com/callback"
      ],
      "response_types": [
        "code"
      ],
      "scopes": [
        "account.read"
      ],
      "token_endpoint_auth_method": "client_secret_post",
      "tos_uri": "https://example.com/tos",
      "updated_at": "2025-01-01T00:00:00Z"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```