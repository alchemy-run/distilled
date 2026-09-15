---
title: Check domain availability
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Registrar](https://developers.cloudflare.com/api/resources/registrar)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Check domain availability

POST/accounts/{account\_id}/registrar/domain-check

Performs real-time, authoritative availability checks directly against domain registries. Use this endpoint to verify a domain is available before attempting registration via `POST /registrations`.

**Important:** Unlike the Search endpoint, these results are authoritative and reflect current registry status. Always check availability immediately before registration as domain status can change rapidly.

**Note:** This endpoint uses POST to accept a list of domains in the request body. It is a read-only operation — it does not create, modify, or reserve any domains.

### Extension support

Only domains on extensions supported for programmatic registration by this API can be registered. If you check a domain on an unsupported extension, the response will include `registrable: false` with a `reason` field explaining why:

- `extension_not_supported_via_api` — Cloudflare Registrar supports this extension in the dashboard, but it is not yet available for programmatic registration via this API. Register via `https://dash.cloudflare.com/{account_id}/domains/registrations` instead.
- `extension_not_supported` — This extension is not supported by Cloudflare Registrar.
- `extension_disallows_registration` — The extension’s registry has temporarily or permanently frozen new registrations. No registrar can register domains on this extension at this time.
- `domain_premium` — The domain is premium priced. Premium registration is not currently supported by this API.
- `domain_unavailable` — The domain is already registered, reserved, or otherwise not available for registration on a supported extension.

The `reason` field is only present when `registrable` is `false`.

### Behavior

- Maximum 20 domains per request
- Pricing is only returned for domains where `registrable: true`
- Results are not cached; each request queries the registry

### Workflow

1. Call this endpoint with domains the user wants to register.
2. For each domain where `registrable: true`, present pricing to the user.
3. If `tier: premium`, note that premium registration is not currently supported by this API and do not proceed to `POST /registrations`.
4. Proceed to `POST /registrations` only for supported non-premium domains.

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

[Link to this property](#)%20registrar%20%3E%20(method)%20check%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

domains: array of string

List of fully qualified domain names (FQDNs) to check for availability. Each domain must include the extension.

- Minimum: 1 domain.
- Maximum: 20 domains per request.
- The response returns domains on unsupported extensions with `registrable: false` and a `reason` field.
- The response may omit malformed domain names (e.g., names missing an extension).

[Link to this property](#)%20registrar%20%3E%20(method)%20check%20%3E%20(params)%200%20%3E%20(param)%20domains%20%3E%20(schema)>)

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

[Link to this property](#)%20registrar%20%3E%20(method)%20check%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20registrar%20%3E%20(method)%20check%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {domains }

Contains the availability check results.

</summary>

<details>

<summary>

domains: array of object {name, registrable, pricing, 2 more }

Array of domain availability results. Results for unsupported extensions contain <code>registrable: false</code> and a <code>reason</code> field. The response may omit malformed domain names.

</summary>

name: string

The fully qualified domain name (FQDN) in punycode format for internationalized domain names (IDNs).

<a href="#">Link to this property</a>

registrable: boolean

Indicates programmatic registration eligibility according to a real-time registry check.

- <code>true</code>: The domain is available for registration. The response includes the <code>pricing</code> object.
- <code>false</code>: A restriction prevents registration. See the <code>reason</code> field for details. Some results, such as premium domains, may still include <code>tier</code>.

<a href="#">Link to this property</a>

<details>

<summary>

pricing: optional object {currency, registration\_cost, renewal\_cost }

Provides annual pricing information for a registrable domain. This object appears only when <code>registrable</code> is <code>true</code>. The API returns all per-year prices as strings to preserve decimal precision.

<code>registration_cost</code> and <code>renewal_cost</code> frequently have the same value, but may differ, especially when registries set different premium rates for initial registration and renewal. For a multi-year registration (e.g., 4 years), <code>registration_cost</code> applies to the first year and <code>renewal_cost</code> applies to each subsequent year. The values reflect the current registry rate, which may change over time. Search and Check may surface premium pricing, but this API currently supports standard registrations only.

</summary>

currency: string

ISO-4217 currency code for the prices (e.g., “USD”, “EUR”, “GBP”).

<a href="#">Link to this property</a>

registration\_cost: string

The first-year cost to register this domain. For premium domains (<code>tier: premium</code>), the registry sets this price, which may significantly exceed standard pricing. For multi-year registrations, this cost applies to the first year only; <code>renewal_cost</code> applies to subsequent years.

<a href="#">Link to this property</a>

renewal\_cost: string

Per-year renewal cost for this domain. Applied to each year beyond the first year of a multi-year registration, and to each annual auto-renewal thereafter. May differ from <code>registration_cost</code>, especially for premium domains where initial registration often costs more than renewals.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

reason: optional "extension\_not\_supported\_via\_api"or "extension\_not\_supported"or "extension\_disallows\_registration"or 2 more

Appears only when <code>registrable</code> is <code>false</code> and explains the result.

- <code>extension_not_supported_via_api</code>: Cloudflare Registrar supports this extension in the dashboard but currently excludes it from programmatic registration through this API. The user can register via <code>https://dash.cloudflare.com/{account_id}/domains/registrations</code>.
- <code>extension_not_supported</code>: Cloudflare Registrar excludes this extension entirely.
- <code>extension_disallows_registration</code>: The extension’s registry temporarily or permanently freezes new registrations. Registrars currently cannot register domains on this extension.
- <code>domain_premium</code>: The domain carries premium pricing. This API currently supports standard registrations only.
- <code>domain_unavailable</code>: An existing registration, reservation, or other registry restriction makes the domain unavailable on a supported extension.

</summary>

One of the following:

"extension\_not\_supported\_via\_api"

<a href="#">Link to this property</a>

"extension\_not\_supported"

<a href="#">Link to this property</a>

"extension\_disallows\_registration"

<a href="#">Link to this property</a>

"domain\_premium"

<a href="#">Link to this property</a>

"domain\_unavailable"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

tier: optional "standard"or "premium"

The pricing tier for this domain. A <code>registrable</code> value of <code>true</code> always includes this field, which defaults to <code>standard</code> for most domains. A <code>registrable</code> value of <code>false</code> may omit it.

- <code>standard</code>: Standard registry pricing.
- <code>premium</code>: Premium domain with higher pricing from the registry.

</summary>

One of the following:

"standard"

<a href="#">Link to this property</a>

"premium"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20registrar%20%3E%20(method)%20check%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20registrar%20%3E%20(method)%20check%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Check domain availability

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/registrar/domain-check \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "domains": [
            "myawesomebrand.com",
            "myawesomebrand.net",
            "myawesomebrand.org",
            "myawesomebrand.app",
            "myawesomebrand.dev"
          ]
        }'
```

200 example

200 example

200 example

200 example

200 example

200 example

200 example

400 example

400 example

400 example

```
{
  "errors": [],
  "messages": [],
  "result": {
    "domains": [
      {
        "name": "xq7mz9brand.com",
        "pricing": {
          "currency": "USD",
          "registration_cost": "8.57",
          "renewal_cost": "8.57"
        },
        "registrable": true,
        "tier": "standard"
      },
      {
        "name": "xq7mz9brand.net",
        "pricing": {
          "currency": "USD",
          "registration_cost": "9.95",
          "renewal_cost": "9.95"
        },
        "registrable": true,
        "tier": "standard"
      }
    ]
  },
  "success": true
}
```

```
{
  "errors": [],
  "messages": [],
  "result": {
    "domains": [
      {
        "name": "example.com",
        "reason": "domain_unavailable",
        "registrable": false
      },
      {
        "name": "example.net",
        "reason": "domain_unavailable",
        "registrable": false
      },
      {
        "name": "example.org",
        "reason": "domain_unavailable",
        "registrable": false
      }
    ]
  },
  "success": true
}
```

```
{
  "errors": [],
  "messages": [],
  "result": {
    "domains": [
      {
        "name": "cloudflare.com",
        "reason": "domain_unavailable",
        "registrable": false
      },
      {
        "name": "my-unique-startup-name-2024.com",
        "pricing": {
          "currency": "USD",
          "registration_cost": "8.57",
          "renewal_cost": "8.57"
        },
        "registrable": true,
        "tier": "standard"
      },
      {
        "name": "my-unique-startup-name-2024.dev",
        "pricing": {
          "currency": "USD",
          "registration_cost": "10.11",
          "renewal_cost": "10.11"
        },
        "registrable": true,
        "tier": "standard"
      }
    ]
  },
  "success": true
}
```

```
{
  "errors": [],
  "messages": [],
  "result": {
    "domains": [
      {
        "name": "coffee.xyz",
        "reason": "domain_premium",
        "registrable": false,
        "tier": "premium"
      }
    ]
  },
  "success": true
}
```

```
{
  "errors": [],
  "messages": [],
  "result": {
    "domains": [
      {
        "name": "example.py",
        "reason": "extension_disallows_registration",
        "registrable": false
      }
    ]
  },
  "success": true
}
```

```
{
  "errors": [],
  "messages": [],
  "result": {
    "domains": [
      {
        "name": "example.horse",
        "reason": "extension_not_supported",
        "registrable": false
      }
    ]
  },
  "success": true
}
```

```
{
  "errors": [],
  "messages": [],
  "result": {
    "domains": [
      {
        "name": "mybrand.uk",
        "reason": "extension_not_supported_via_api",
        "registrable": false
      },
      {
        "name": "mybrand.com",
        "pricing": {
          "currency": "USD",
          "registration_cost": "8.57",
          "renewal_cost": "8.57"
        },
        "registrable": true,
        "tier": "standard"
      }
    ]
  },
  "success": true
}
```

```
{
  "errors": [
    {
      "code": 1006,
      "message": "domains array must contain at least one domain"
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
      "code": 1008,
      "message": "None of the provided domains are valid or have supported extensions"
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
      "code": 1007,
      "message": "domains array exceeds maximum of 20 domains"
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

200 example

200 example

200 example

400 example

400 example

400 example

```
{
  "errors": [],
  "messages": [],
  "result": {
    "domains": [
      {
        "name": "xq7mz9brand.com",
        "pricing": {
          "currency": "USD",
          "registration_cost": "8.57",
          "renewal_cost": "8.57"
        },
        "registrable": true,
        "tier": "standard"
      },
      {
        "name": "xq7mz9brand.net",
        "pricing": {
          "currency": "USD",
          "registration_cost": "9.95",
          "renewal_cost": "9.95"
        },
        "registrable": true,
        "tier": "standard"
      }
    ]
  },
  "success": true
}
```

```
{
  "errors": [],
  "messages": [],
  "result": {
    "domains": [
      {
        "name": "example.com",
        "reason": "domain_unavailable",
        "registrable": false
      },
      {
        "name": "example.net",
        "reason": "domain_unavailable",
        "registrable": false
      },
      {
        "name": "example.org",
        "reason": "domain_unavailable",
        "registrable": false
      }
    ]
  },
  "success": true
}
```

```
{
  "errors": [],
  "messages": [],
  "result": {
    "domains": [
      {
        "name": "cloudflare.com",
        "reason": "domain_unavailable",
        "registrable": false
      },
      {
        "name": "my-unique-startup-name-2024.com",
        "pricing": {
          "currency": "USD",
          "registration_cost": "8.57",
          "renewal_cost": "8.57"
        },
        "registrable": true,
        "tier": "standard"
      },
      {
        "name": "my-unique-startup-name-2024.dev",
        "pricing": {
          "currency": "USD",
          "registration_cost": "10.11",
          "renewal_cost": "10.11"
        },
        "registrable": true,
        "tier": "standard"
      }
    ]
  },
  "success": true
}
```

```
{
  "errors": [],
  "messages": [],
  "result": {
    "domains": [
      {
        "name": "coffee.xyz",
        "reason": "domain_premium",
        "registrable": false,
        "tier": "premium"
      }
    ]
  },
  "success": true
}
```

```
{
  "errors": [],
  "messages": [],
  "result": {
    "domains": [
      {
        "name": "example.py",
        "reason": "extension_disallows_registration",
        "registrable": false
      }
    ]
  },
  "success": true
}
```

```
{
  "errors": [],
  "messages": [],
  "result": {
    "domains": [
      {
        "name": "example.horse",
        "reason": "extension_not_supported",
        "registrable": false
      }
    ]
  },
  "success": true
}
```

```
{
  "errors": [],
  "messages": [],
  "result": {
    "domains": [
      {
        "name": "mybrand.uk",
        "reason": "extension_not_supported_via_api",
        "registrable": false
      },
      {
        "name": "mybrand.com",
        "pricing": {
          "currency": "USD",
          "registration_cost": "8.57",
          "renewal_cost": "8.57"
        },
        "registrable": true,
        "tier": "standard"
      }
    ]
  },
  "success": true
}
```

```
{
  "errors": [
    {
      "code": 1006,
      "message": "domains array must contain at least one domain"
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
      "code": 1008,
      "message": "None of the provided domains are valid or have supported extensions"
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
      "code": 1007,
      "message": "domains array exceeds maximum of 20 domains"
    }
  ],
  "messages": [],
  "result": null,
  "success": false
}
```