---
title: Get Access authentication logs
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Access](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access)

[Logs](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/logs)

[Access Requests](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/logs/subresources/access_requests)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get Access authentication logs

GET/accounts/{account\_id}/access/logs/access\_requests

Gets a list of Access authentication audit logs for an account.

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

`Access: Audit Logs Read`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier.

maxLength32

[Link to this property](#)%20zero_trust.access.logs.access_requests%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

<details>

<summary>

allowedOp: optional "eq"or "neq"

Operator for the <code>allowed</code> filter.

</summary>

One of the following:

"eq"

<a href="#">Link to this property</a>

"neq"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.logs.access_requests%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20allowedOp%20%3E%20(schema)>)

<details>

<summary>

app\_typeOp: optional "eq"or "neq"

Operator for the <code>app_type</code> filter.

</summary>

One of the following:

"eq"

<a href="#">Link to this property</a>

"neq"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.logs.access_requests%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20app_typeOp%20%3E%20(schema)>)

<details>

<summary>

app\_uidOp: optional "eq"or "neq"

Operator for the <code>app_uid</code> filter.

</summary>

One of the following:

"eq"

<a href="#">Link to this property</a>

"neq"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.logs.access_requests%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20app_uidOp%20%3E%20(schema)>)

<details>

<summary>

country\_codeOp: optional "eq"or "neq"

Operator for the <code>country_code</code> filter.

</summary>

One of the following:

"eq"

<a href="#">Link to this property</a>

"neq"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.logs.access_requests%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20country_codeOp%20%3E%20(schema)>)

<details>

<summary>

direction: optional "desc"or "asc"

The chronological sorting order for the logs.

</summary>

One of the following:

"desc"

<a href="#">Link to this property</a>

"asc"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.logs.access_requests%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20direction%20%3E%20(schema)>)

email: optional string

Filter by user email. Match mode is controlled by `emailOp` (preferred) or the legacy `email_exact` flag.

- Default (no `emailOp`, `email_exact=false` or unset): substring match — `email=@example.com` returns all events with that domain.
- Exact match: set `emailOp=eq` (preferred) or `email_exact=true` — e.g. `email=user@example.com&email_exact=true` returns only that user.
- Explicit substring match: set `emailOp=contains` (without `email_exact=true`). When both are set, `email_exact=true` takes precedence and the match is exact.
- Exclusion: set `emailOp=neq`. With `email_exact=true` this is an exact-value exclusion; without it, a fuzzy substring exclusion.

formatemail

[Link to this property](#)%20zero_trust.access.logs.access_requests%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20email%20%3E%20(schema)>)

email\_exact: optional boolean

When true, `email` is matched exactly instead of substring matching.

[Link to this property](#)%20zero_trust.access.logs.access_requests%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20email_exact%20%3E%20(schema)>)

<details>

<summary>

emailOp: optional "eq"or "neq"or "contains"

Operator for the <code>email</code> filter. <code>contains</code> performs a substring (case-sensitive) match. When <code>email_exact=true</code> is also set, <code>email_exact</code> takes precedence and <code>contains</code> is ignored.

</summary>

One of the following:

"eq"

<a href="#">Link to this property</a>

"neq"

<a href="#">Link to this property</a>

"contains"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.logs.access_requests%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20emailOp%20%3E%20(schema)>)

fields: optional string

Comma-separated list of fields to include in the response. When omitted, all fields are returned.

[Link to this property](#)%20zero_trust.access.logs.access_requests%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20fields%20%3E%20(schema)>)

<details>

<summary>

idpOp: optional "eq"or "neq"

Operator for the <code>idp</code> filter.

</summary>

One of the following:

"eq"

<a href="#">Link to this property</a>

"neq"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.logs.access_requests%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20idpOp%20%3E%20(schema)>)

limit: optional number

The maximum number of log entries to retrieve.

[Link to this property](#)%20zero_trust.access.logs.access_requests%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20limit%20%3E%20(schema)>)

<details>

<summary>

non\_identityOp: optional "eq"or "neq"

Operator for the <code>non_identity</code> filter.

</summary>

One of the following:

"eq"

<a href="#">Link to this property</a>

"neq"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.logs.access_requests%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20non_identityOp%20%3E%20(schema)>)

page: optional number

Page number of results.

[Link to this property](#)%20zero_trust.access.logs.access_requests%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: optional number

Number of results per page.

[Link to this property](#)%20zero_trust.access.logs.access_requests%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

<details>

<summary>

ray\_idOp: optional "eq"or "neq"

Operator for the <code>ray_id</code> filter.

</summary>

One of the following:

"eq"

<a href="#">Link to this property</a>

"neq"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.logs.access_requests%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20ray_idOp%20%3E%20(schema)>)

since: optional string

The earliest event timestamp to query.

formatdate-time

[Link to this property](#)%20zero_trust.access.logs.access_requests%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20since%20%3E%20(schema)>)

until: optional string

The latest event timestamp to query.

formatdate-time

[Link to this property](#)%20zero_trust.access.logs.access_requests%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20until%20%3E%20(schema)>)

user\_id: optional string

Deprecated. Accepted for backward compatibility but no longer applied as a filter. Use `email` instead.

formatuuid

[Link to this property](#)%20zero_trust.access.logs.access_requests%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20user_id%20%3E%20(schema)>)

<details>

<summary>

user\_idOp: optional "eq"or "neq"

Deprecated. Accepted for backward compatibility but no longer applied as a filter (the <code>user_id</code> parameter is itself deprecated).

</summary>

One of the following:

"eq"

<a href="#">Link to this property</a>

"neq"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.logs.access_requests%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20user_idOp%20%3E%20(schema)>)

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

[Link to this property](#)%20zero_trust.access.logs.access_requests%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20zero_trust.access.logs.access_requests%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20zero_trust.access.logs.access_requests%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional array of <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.access.logs.scim%20%3E%20(model)%20access_request%20%3E%20(schema)">AccessRequest</a> { action, allowed, app\_domain, 6 more }

</summary>

action: optional string

The event that occurred, such as a login attempt.

<a href="#">Link to this property</a>

allowed: optional boolean

The result of the authentication event.

<a href="#">Link to this property</a>

app\_domain: optional string

The URL of the Access application.

<a href="#">Link to this property</a>

app\_uid: optional string

The unique identifier for the Access application.

<a href="#">Link to this property</a>

connection: optional string

The IdP used to authenticate.

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

ip\_address: optional string

The IP address of the authenticating user.

<a href="#">Link to this property</a>

ray\_id: optional string

The unique identifier for the request to Cloudflare.

maxLength16

<a href="#">Link to this property</a>

user\_email: optional string

The email address of the authenticating user.

formatemail

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.logs.access_requests%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Get Access authentication logs

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/logs/access_requests \
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
      "action": "login",
      "allowed": true,
      "app_domain": "test.example.com/admin",
      "app_uid": "df7e2w5f-02b7-4d9d-af26-8d1988fca630",
      "connection": "saml",
      "created_at": "2014-01-01T05:20:00.12345Z",
      "ip_address": "198.41.129.166",
      "ray_id": "187d944c61940c77",
      "user_email": "user@example.com"
    }
  ]
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
      "action": "login",
      "allowed": true,
      "app_domain": "test.example.com/admin",
      "app_uid": "df7e2w5f-02b7-4d9d-af26-8d1988fca630",
      "connection": "saml",
      "created_at": "2014-01-01T05:20:00.12345Z",
      "ip_address": "198.41.129.166",
      "ray_id": "187d944c61940c77",
      "user_email": "user@example.com"
    }
  ]
}
```