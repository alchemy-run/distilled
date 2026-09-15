---
title: List Registrations
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Registrar](https://developers.cloudflare.com/api/resources/registrar)

[Registrations](https://developers.cloudflare.com/api/resources/registrar/subresources/registrations)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List Registrations

GET/accounts/{account\_id}/registrar/registrations

Returns a paginated list of domain registrations owned by the account.

This endpoint uses cursor-based pagination. Results are ordered by registration date by default. To fetch the next page, pass the `cursor` value from the `result_info` object in the response as the `cursor` query parameter in your next request. An empty `cursor` string indicates there are no more pages.

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

[Link to this property](#)%20registrar.registrations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

cursor: optional string

Opaque token from a previous response’s `result_info.cursor`. Pass this value to fetch the next page of results. Omit (or pass an empty string) for the first page.

maxLength256

[Link to this property](#)%20registrar.registrations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20cursor%20%3E%20(schema)>)

<details>

<summary>

direction: optional "asc"or "desc"

Sort direction for results. Defaults to ascending order.

</summary>

One of the following:

"asc"

<a href="#">Link to this property</a>

"desc"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20registrar.registrations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20direction%20%3E%20(schema)>)

per\_page: optional number

Number of items to return per page.

maximum50

minimum1

[Link to this property](#)%20registrar.registrations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

<details>

<summary>

sort\_by: optional "registry\_created\_at"or "registry\_expires\_at"or "name"

Column to sort results by. Defaults to registration date (<code>registry_created_at</code>) when omitted.

</summary>

One of the following:

"registry\_created\_at"

<a href="#">Link to this property</a>

"registry\_expires\_at"

<a href="#">Link to this property</a>

"name"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20registrar.registrations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20sort_by%20%3E%20(schema)>)

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

[Link to this property](#)%20registrar.registrations%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20registrar.registrations%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: array of <a href="https://developers.cloudflare.com/api/resources/registrar#(resource)%20registrar%20%3E%20(model)%20registration%20%3E%20(schema)">Registration</a> { auto\_renew, created\_at, domain\_name, 4 more }

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

[Link to this property](#)%20registrar.registrations%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

<details>

<summary>

result\_info: object {count, cursor, per\_page }

Provides cursor-based pagination metadata. List endpoints use this metadata for cursor pagination. Pass the <code>cursor</code> value as a query parameter in the next request to fetch the next page. An empty string indicates the end of pagination.

</summary>

count: number

Number of items in the current result set.

<a href="#">Link to this property</a>

cursor: string

Opaque cursor for fetching the next page. Pass this value as the <code>cursor</code> query parameter in a subsequent request. An empty string indicates the end of pagination.

<a href="#">Link to this property</a>

per\_page: number

Maximum number of items per page.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20registrar.registrations%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

success: true

Whether the API call was successful.

[Link to this property](#)%20registrar.registrations%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### List Registrations

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/registrar/registrations \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

200 example

200 example

200 example

4XX example

```
{
  "errors": [],
  "messages": [],
  "result": [],
  "result_info": {
    "count": 0,
    "cursor": "",
    "per_page": 20
  },
  "success": true
}
```

```
{
  "errors": [],
  "messages": [],
  "result": [
    {
      "auto_renew": true,
      "created_at": "2025-01-15T10:00:00Z",
      "domain_name": "example.com",
      "expires_at": "2026-01-15T10:00:00Z",
      "locked": true,
      "privacy_mode": "redaction",
      "status": "active"
    },
    {
      "auto_renew": false,
      "created_at": "2025-03-20T14:30:00Z",
      "domain_name": "mybrand.dev",
      "expires_at": "2026-03-20T14:30:00Z",
      "locked": true,
      "privacy_mode": "redaction",
      "status": "active"
    }
  ],
  "result_info": {
    "count": 2,
    "cursor": "",
    "per_page": 20
  },
  "success": true
}
```

```
{
  "errors": [],
  "messages": [],
  "result": [
    {
      "auto_renew": true,
      "created_at": "2025-04-01T09:00:00Z",
      "domain_name": "charlie.org",
      "expires_at": "2026-04-01T09:00:00Z",
      "locked": true,
      "privacy_mode": "redaction",
      "status": "active"
    }
  ],
  "result_info": {
    "count": 1,
    "cursor": "",
    "per_page": 20
  },
  "success": true
}
```

```
{
  "errors": [],
  "messages": [],
  "result": [
    {
      "auto_renew": true,
      "created_at": "2024-01-15T09:30:00Z",
      "domain_name": "acmecorp.com",
      "expires_at": "2026-01-15T09:30:00Z",
      "locked": true,
      "privacy_mode": "redaction",
      "status": "active"
    },
    {
      "auto_renew": true,
      "created_at": "2024-02-20T14:00:00Z",
      "domain_name": "brightwave.net",
      "expires_at": "2026-02-20T14:00:00Z",
      "locked": true,
      "privacy_mode": "redaction",
      "status": "active"
    },
    {
      "auto_renew": true,
      "created_at": "2024-03-05T11:15:00Z",
      "domain_name": "cloudpeak.org",
      "expires_at": "2026-03-05T11:15:00Z",
      "locked": true,
      "privacy_mode": "redaction",
      "status": "active"
    },
    {
      "auto_renew": true,
      "created_at": "2024-03-22T08:45:00Z",
      "domain_name": "solarpanel.io",
      "expires_at": "2026-03-22T08:45:00Z",
      "locked": true,
      "privacy_mode": "off",
      "status": "active"
    },
    {
      "auto_renew": false,
      "created_at": "2024-04-10T16:00:00Z",
      "domain_name": "greenleaf.dev",
      "expires_at": "2026-04-10T16:00:00Z",
      "locked": true,
      "privacy_mode": "redaction",
      "status": "active"
    },
    {
      "auto_renew": true,
      "created_at": "2024-05-03T10:30:00Z",
      "domain_name": "swiftrunner.app",
      "expires_at": "2026-05-03T10:30:00Z",
      "locked": true,
      "privacy_mode": "redaction",
      "status": "active"
    },
    {
      "auto_renew": false,
      "created_at": "2024-05-18T13:00:00Z",
      "domain_name": "northerntrail.co",
      "expires_at": "2025-05-18T13:00:00Z",
      "locked": true,
      "privacy_mode": "redaction",
      "status": "expired"
    },
    {
      "auto_renew": true,
      "created_at": "2024-06-01T07:20:00Z",
      "domain_name": "pixelforge.xyz",
      "expires_at": "2026-06-01T07:20:00Z",
      "locked": false,
      "privacy_mode": "redaction",
      "status": "active"
    },
    {
      "auto_renew": true,
      "created_at": "2024-06-25T15:45:00Z",
      "domain_name": "oceandrift.com",
      "expires_at": "2026-06-25T15:45:00Z",
      "locked": true,
      "privacy_mode": "redaction",
      "status": "active"
    },
    {
      "auto_renew": true,
      "created_at": "2024-07-12T09:00:00Z",
      "domain_name": "rocketlaunch.net",
      "expires_at": "2026-07-12T09:00:00Z",
      "locked": true,
      "privacy_mode": "off",
      "status": "active"
    },
    {
      "auto_renew": false,
      "created_at": "2024-08-08T12:30:00Z",
      "domain_name": "blueprintlab.io",
      "expires_at": "2026-08-08T12:30:00Z",
      "locked": true,
      "privacy_mode": "redaction",
      "status": "active"
    },
    {
      "auto_renew": true,
      "created_at": "2024-09-01T18:00:00Z",
      "domain_name": "maplewood.org",
      "expires_at": "2026-09-01T18:00:00Z",
      "locked": true,
      "privacy_mode": "redaction",
      "status": "active"
    },
    {
      "auto_renew": false,
      "created_at": "2024-09-20T10:15:00Z",
      "domain_name": "thunderbolt.dev",
      "expires_at": "2025-09-20T10:15:00Z",
      "locked": false,
      "privacy_mode": "off",
      "status": "expired"
    },
    {
      "auto_renew": true,
      "created_at": "2024-10-05T14:45:00Z",
      "domain_name": "silverbranch.app",
      "expires_at": "2026-10-05T14:45:00Z",
      "locked": true,
      "privacy_mode": "redaction",
      "status": "active"
    },
    {
      "auto_renew": true,
      "created_at": "2024-11-11T08:00:00Z",
      "domain_name": "nightowl.co",
      "expires_at": "2026-11-11T08:00:00Z",
      "locked": true,
      "privacy_mode": "redaction",
      "status": "active"
    },
    {
      "auto_renew": true,
      "created_at": "2024-12-01T11:30:00Z",
      "domain_name": "crimsongate.com",
      "expires_at": "2026-12-01T11:30:00Z",
      "locked": true,
      "privacy_mode": "redaction",
      "status": "active"
    },
    {
      "auto_renew": false,
      "created_at": "2025-01-07T16:20:00Z",
      "domain_name": "frostedpine.net",
      "expires_at": "2027-01-07T16:20:00Z",
      "locked": true,
      "privacy_mode": "redaction",
      "status": "active"
    },
    {
      "auto_renew": true,
      "created_at": "2025-01-25T09:50:00Z",
      "domain_name": "horizonline.xyz",
      "expires_at": "2027-01-25T09:50:00Z",
      "locked": true,
      "privacy_mode": "redaction",
      "status": "active"
    },
    {
      "auto_renew": true,
      "created_at": "2025-02-14T13:00:00Z",
      "domain_name": "coppervine.io",
      "expires_at": "2027-02-14T13:00:00Z",
      "locked": true,
      "privacy_mode": "off",
      "status": "active"
    },
    {
      "auto_renew": true,
      "created_at": "2025-03-02T07:40:00Z",
      "domain_name": "starlitpath.org",
      "expires_at": "2027-03-02T07:40:00Z",
      "locked": true,
      "privacy_mode": "redaction",
      "status": "active"
    }
  ],
  "result_info": {
    "count": 20,
    "cursor": "eyJ0IjoiMjAyNS0wNi0xNVQxMjowMDowMC4wMDAwMDBaIiwibiI6ImJyYXZvLm5ldCJ9",
    "per_page": 20
  },
  "success": true
}
```

```
{
  "errors": [
    {
      "code": 10000,
      "message": "Invalid pagination cursor"
    }
  ],
  "messages": [],
  "result": null,
  "success": false
}
```

##### Returns Examples

200 example

200 example

200 example

200 example

4XX example

```
{
  "errors": [],
  "messages": [],
  "result": [],
  "result_info": {
    "count": 0,
    "cursor": "",
    "per_page": 20
  },
  "success": true
}
```

```
{
  "errors": [],
  "messages": [],
  "result": [
    {
      "auto_renew": true,
      "created_at": "2025-01-15T10:00:00Z",
      "domain_name": "example.com",
      "expires_at": "2026-01-15T10:00:00Z",
      "locked": true,
      "privacy_mode": "redaction",
      "status": "active"
    },
    {
      "auto_renew": false,
      "created_at": "2025-03-20T14:30:00Z",
      "domain_name": "mybrand.dev",
      "expires_at": "2026-03-20T14:30:00Z",
      "locked": true,
      "privacy_mode": "redaction",
      "status": "active"
    }
  ],
  "result_info": {
    "count": 2,
    "cursor": "",
    "per_page": 20
  },
  "success": true
}
```

```
{
  "errors": [],
  "messages": [],
  "result": [
    {
      "auto_renew": true,
      "created_at": "2025-04-01T09:00:00Z",
      "domain_name": "charlie.org",
      "expires_at": "2026-04-01T09:00:00Z",
      "locked": true,
      "privacy_mode": "redaction",
      "status": "active"
    }
  ],
  "result_info": {
    "count": 1,
    "cursor": "",
    "per_page": 20
  },
  "success": true
}
```

```
{
  "errors": [],
  "messages": [],
  "result": [
    {
      "auto_renew": true,
      "created_at": "2024-01-15T09:30:00Z",
      "domain_name": "acmecorp.com",
      "expires_at": "2026-01-15T09:30:00Z",
      "locked": true,
      "privacy_mode": "redaction",
      "status": "active"
    },
    {
      "auto_renew": true,
      "created_at": "2024-02-20T14:00:00Z",
      "domain_name": "brightwave.net",
      "expires_at": "2026-02-20T14:00:00Z",
      "locked": true,
      "privacy_mode": "redaction",
      "status": "active"
    },
    {
      "auto_renew": true,
      "created_at": "2024-03-05T11:15:00Z",
      "domain_name": "cloudpeak.org",
      "expires_at": "2026-03-05T11:15:00Z",
      "locked": true,
      "privacy_mode": "redaction",
      "status": "active"
    },
    {
      "auto_renew": true,
      "created_at": "2024-03-22T08:45:00Z",
      "domain_name": "solarpanel.io",
      "expires_at": "2026-03-22T08:45:00Z",
      "locked": true,
      "privacy_mode": "off",
      "status": "active"
    },
    {
      "auto_renew": false,
      "created_at": "2024-04-10T16:00:00Z",
      "domain_name": "greenleaf.dev",
      "expires_at": "2026-04-10T16:00:00Z",
      "locked": true,
      "privacy_mode": "redaction",
      "status": "active"
    },
    {
      "auto_renew": true,
      "created_at": "2024-05-03T10:30:00Z",
      "domain_name": "swiftrunner.app",
      "expires_at": "2026-05-03T10:30:00Z",
      "locked": true,
      "privacy_mode": "redaction",
      "status": "active"
    },
    {
      "auto_renew": false,
      "created_at": "2024-05-18T13:00:00Z",
      "domain_name": "northerntrail.co",
      "expires_at": "2025-05-18T13:00:00Z",
      "locked": true,
      "privacy_mode": "redaction",
      "status": "expired"
    },
    {
      "auto_renew": true,
      "created_at": "2024-06-01T07:20:00Z",
      "domain_name": "pixelforge.xyz",
      "expires_at": "2026-06-01T07:20:00Z",
      "locked": false,
      "privacy_mode": "redaction",
      "status": "active"
    },
    {
      "auto_renew": true,
      "created_at": "2024-06-25T15:45:00Z",
      "domain_name": "oceandrift.com",
      "expires_at": "2026-06-25T15:45:00Z",
      "locked": true,
      "privacy_mode": "redaction",
      "status": "active"
    },
    {
      "auto_renew": true,
      "created_at": "2024-07-12T09:00:00Z",
      "domain_name": "rocketlaunch.net",
      "expires_at": "2026-07-12T09:00:00Z",
      "locked": true,
      "privacy_mode": "off",
      "status": "active"
    },
    {
      "auto_renew": false,
      "created_at": "2024-08-08T12:30:00Z",
      "domain_name": "blueprintlab.io",
      "expires_at": "2026-08-08T12:30:00Z",
      "locked": true,
      "privacy_mode": "redaction",
      "status": "active"
    },
    {
      "auto_renew": true,
      "created_at": "2024-09-01T18:00:00Z",
      "domain_name": "maplewood.org",
      "expires_at": "2026-09-01T18:00:00Z",
      "locked": true,
      "privacy_mode": "redaction",
      "status": "active"
    },
    {
      "auto_renew": false,
      "created_at": "2024-09-20T10:15:00Z",
      "domain_name": "thunderbolt.dev",
      "expires_at": "2025-09-20T10:15:00Z",
      "locked": false,
      "privacy_mode": "off",
      "status": "expired"
    },
    {
      "auto_renew": true,
      "created_at": "2024-10-05T14:45:00Z",
      "domain_name": "silverbranch.app",
      "expires_at": "2026-10-05T14:45:00Z",
      "locked": true,
      "privacy_mode": "redaction",
      "status": "active"
    },
    {
      "auto_renew": true,
      "created_at": "2024-11-11T08:00:00Z",
      "domain_name": "nightowl.co",
      "expires_at": "2026-11-11T08:00:00Z",
      "locked": true,
      "privacy_mode": "redaction",
      "status": "active"
    },
    {
      "auto_renew": true,
      "created_at": "2024-12-01T11:30:00Z",
      "domain_name": "crimsongate.com",
      "expires_at": "2026-12-01T11:30:00Z",
      "locked": true,
      "privacy_mode": "redaction",
      "status": "active"
    },
    {
      "auto_renew": false,
      "created_at": "2025-01-07T16:20:00Z",
      "domain_name": "frostedpine.net",
      "expires_at": "2027-01-07T16:20:00Z",
      "locked": true,
      "privacy_mode": "redaction",
      "status": "active"
    },
    {
      "auto_renew": true,
      "created_at": "2025-01-25T09:50:00Z",
      "domain_name": "horizonline.xyz",
      "expires_at": "2027-01-25T09:50:00Z",
      "locked": true,
      "privacy_mode": "redaction",
      "status": "active"
    },
    {
      "auto_renew": true,
      "created_at": "2025-02-14T13:00:00Z",
      "domain_name": "coppervine.io",
      "expires_at": "2027-02-14T13:00:00Z",
      "locked": true,
      "privacy_mode": "off",
      "status": "active"
    },
    {
      "auto_renew": true,
      "created_at": "2025-03-02T07:40:00Z",
      "domain_name": "starlitpath.org",
      "expires_at": "2027-03-02T07:40:00Z",
      "locked": true,
      "privacy_mode": "redaction",
      "status": "active"
    }
  ],
  "result_info": {
    "count": 20,
    "cursor": "eyJ0IjoiMjAyNS0wNi0xNVQxMjowMDowMC4wMDAwMDBaIiwibiI6ImJyYXZvLm5ldCJ9",
    "per_page": 20
  },
  "success": true
}
```

```
{
  "errors": [
    {
      "code": 10000,
      "message": "Invalid pagination cursor"
    }
  ],
  "messages": [],
  "result": null,
  "success": false
}
```