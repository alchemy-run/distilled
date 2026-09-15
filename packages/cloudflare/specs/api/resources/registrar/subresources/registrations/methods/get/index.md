---
title: Get Registration
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Registrar](https://developers.cloudflare.com/api/resources/registrar)

[Registrations](https://developers.cloudflare.com/api/resources/registrar/subresources/registrations)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get Registration

GET/accounts/{account\_id}/registrar/registrations/{domain\_name}

Returns the current state of a domain registration.

This is the canonical read endpoint for a domain you own. It returns the full registration resource including current settings and expiration. When the registration resource is ready, both `created_at` and `expires_at` are present in the response.

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

[Link to this property](#)%20registrar.registrations%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

domain\_name: string

Provides a fully qualified domain name (FQDN), including the extension (e.g., `example.com`, `mybrand.app`). The domain name uniquely identifies a registration. Cloudflare permits only one registration per domain, making the domain name a natural idempotency key for registration requests.

[Link to this property](#)%20registrar.registrations%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20domain_name%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of object {code, message, source }

</summary>

code: number

minimum1000

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

Location of the invalid value that caused the error.

</summary>

pointer: string

JSON Pointer to the invalid or missing request value.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20registrar.registrations%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {code, message, source }

</summary>

code: number

minimum1000

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

Location of the invalid value that caused the error.

</summary>

pointer: string

JSON Pointer to the invalid or missing request value.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20registrar.registrations%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: <a href="https://developers.cloudflare.com/api/resources/registrar#(resource)%20registrar%20%3E%20(model)%20registration%20%3E%20(schema)">Registration</a> { auto\_renew, created\_at, domain\_name, 4 more }

A domain registration resource representing the current state of a registered domain.

</summary>

auto\_renew: boolean

Whether automatic renewal occurs before expiration.

<a href="#">Link to this property</a>

created\_at: string

When the domain was registered. Present when the registration resource exists.

formatdate-time

<a href="#">Link to this property</a>

domain\_name: string

Provides a fully qualified domain name (FQDN), including the extension (e.g., <code>example.com</code>, <code>mybrand.app</code>). The domain name uniquely identifies a registration. Cloudflare permits only one registration per domain, making the domain name a natural idempotency key for registration requests.

<a href="#">Link to this property</a>

expires\_at: string

When the domain registration expires. Ready registrations include this value; only <code>registration_pending</code> may return null.

formatdate-time

<a href="#">Link to this property</a>

locked: boolean

Whether the domain is locked for transfer.

<a href="#">Link to this property</a>

<details>

<summary>

privacy\_mode: "off"or "redaction"

Current WHOIS privacy mode for the registration.

</summary>

One of the following:

"off"

<a href="#">Link to this property</a>

"redaction"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

status: "active"or "registration\_pending"or "expired"or 3 more

Current registration status.

- <code>active</code>: The domain operates with an active registration.
- <code>registration_pending</code>: Registration remains in progress.
- <code>expired</code>: The domain registration expired.
- <code>suspended</code>: The registry suspended the domain.
- <code>redemption_period</code>: The domain entered the redemption grace period.
- <code>pending_delete</code>: The registry scheduled the domain for deletion.

</summary>

One of the following:

"active"

<a href="#">Link to this property</a>

"registration\_pending"

<a href="#">Link to this property</a>

"expired"

<a href="#">Link to this property</a>

"suspended"

<a href="#">Link to this property</a>

"redemption\_period"

<a href="#">Link to this property</a>

"pending\_delete"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20registrar.registrations%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20registrar.registrations%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get Registration

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/registrar/registrations/$DOMAIN_NAME \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

4XX example

4XX example

```
{
  "errors": [],
  "messages": [],
  "result": {
    "auto_renew": true,
    "created_at": "2025-01-15T10:00:00Z",
    "domain_name": "example.com",
    "expires_at": "2026-01-15T10:00:00Z",
    "locked": true,
    "privacy_mode": "redaction",
    "status": "active"
  },
  "success": true
}
```

```
{
  "errors": [
    {
      "code": 10000,
      "message": "Domain not found"
    }
  ],
  "messages": [],
  "result": null,
  "success": false
}
```

```
{
  "errors": [
    {
      "code": 10000,
      "message": "Invalid domain name"
    }
  ],
  "messages": [],
  "result": null,
  "success": false
}
```

##### Returns Examples

200 example

4XX example

4XX example

```
{
  "errors": [],
  "messages": [],
  "result": {
    "auto_renew": true,
    "created_at": "2025-01-15T10:00:00Z",
    "domain_name": "example.com",
    "expires_at": "2026-01-15T10:00:00Z",
    "locked": true,
    "privacy_mode": "redaction",
    "status": "active"
  },
  "success": true
}
```

```
{
  "errors": [
    {
      "code": 10000,
      "message": "Domain not found"
    }
  ],
  "messages": [],
  "result": null,
  "success": false
}
```

```
{
  "errors": [
    {
      "code": 10000,
      "message": "Invalid domain name"
    }
  ],
  "messages": [],
  "result": null,
  "success": false
}
```