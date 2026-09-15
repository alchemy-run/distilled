---
title: Search for available domains
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Registrar](https://developers.cloudflare.com/api/resources/registrar)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Search for available domains

GET/accounts/{account\_id}/registrar/domain-search

Searches for domain name suggestions based on a keyword, phrase, or partial domain name. Returns a list of potentially available domains with pricing information.

**Important:** Results are non-authoritative and based on cached data. Always use the `/domain-check` endpoint to verify real-time availability before attempting registration.

Suggestions are scoped to extensions supported for programmatic registration via this API (`POST /registrations`). Domains on unsupported extensions will not appear in results, even if they are available at the registry level.

### Use cases

- Brand name discovery (e.g., “acme corp” → acmecorp.com, acmecorp.dev)
- Keyword-based suggestions (e.g., “coffee shop” → coffeeshop.com, mycoffeeshop.net)
- Alternative extension discovery (e.g., “example.com” → example.com, example.app, example.xyz)

### Workflow

1. Call this endpoint with a keyword or domain name.
2. Present suggestions to the user.
3. Call `/domain-check` with the user’s chosen domains to confirm real-time availability and pricing.
4. Proceed to `POST /registrations` only for supported non-premium domains where the Check response returns `registrable: true`.

**Note:** Searching with just a domain extension (e.g., “com” or “.app”) is not supported. Provide a keyword or domain name.

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

[Link to this property](#)%20registrar%20%3E%20(method)%20search%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

q: string

The search term to find domain suggestions. Accepts keywords, phrases, or full domain names.

- Phrases: “coffee shop” returns coffeeshop.com, mycoffeeshop.net, etc.
- Domain names: “example.com” returns example.com and variations across extensions

maxLength100

minLength1

[Link to this property](#)%20registrar%20%3E%20(method)%20search%20%3E%20(params)%20default%20%3E%20(param)%20q%20%3E%20(schema)>)

extensions: optional array of string

Limits results to specific domain extensions from the supported set. If not specified, returns results across all supported extensions. Extensions not in the supported set are silently ignored.

[Link to this property](#)%20registrar%20%3E%20(method)%20search%20%3E%20(params)%20default%20%3E%20(param)%20extensions%20%3E%20(schema)>)

limit: optional number

Maximum number of domain suggestions to return. Defaults to 20 if not specified.

maximum50

minimum1

[Link to this property](#)%20registrar%20%3E%20(method)%20search%20%3E%20(params)%20default%20%3E%20(param)%20limit%20%3E%20(schema)>)

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

[Link to this property](#)%20registrar%20%3E%20(method)%20search%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20registrar%20%3E%20(method)%20search%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {domains }

Contains the search results.

</summary>

<details>

<summary>

domains: array of object {name, registrable, pricing, 2 more }

Lists domain suggestions in relevance order. An empty array indicates that the search criteria matched zero domains.

</summary>

name: string

The fully qualified domain name (FQDN) in punycode format for internationalized domain names (IDNs).

<a href="#">Link to this property</a>

registrable: boolean

Indicates domain availability according to potentially stale, non-authoritative search data.

- <code>true</code>: The domain appears available. Use POST /domain-check to confirm before registration.
- <code>false</code>: Search results mark the domain ineligible for registration through this API. See <code>reason</code> for details.

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

Appears only when <code>registrable</code> is <code>false</code> and explains the advisory search result. Use POST /domain-check for authoritative status.

- <code>extension_not_supported_via_api</code>: Cloudflare Registrar supports this extension in the dashboard but currently excludes it from programmatic registration through this API.
- <code>extension_not_supported</code>: Cloudflare Registrar excludes this extension entirely.
- <code>extension_disallows_registration</code>: The extension’s registry temporarily or permanently freezes new registrations.
- <code>domain_premium</code>: The domain carries premium pricing. This API currently supports standard registrations only.
- <code>domain_unavailable</code>: The domain appears unavailable.

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

[Link to this property](#)%20registrar%20%3E%20(method)%20search%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20registrar%20%3E%20(method)%20search%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Search for available domains

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/registrar/domain-search \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

200 example

200 example

200 example

200 example

400 example

400 example

```
{
  "errors": [],
  "messages": [],
  "result": {
    "domains": [
      {
        "name": "acmecorp.com",
        "pricing": {
          "currency": "USD",
          "registration_cost": "8.57",
          "renewal_cost": "8.57"
        },
        "registrable": true,
        "tier": "standard"
      },
      {
        "name": "acmecorp.dev",
        "pricing": {
          "currency": "USD",
          "registration_cost": "10.11",
          "renewal_cost": "10.11"
        },
        "registrable": true,
        "tier": "standard"
      },
      {
        "name": "acmecorp.app",
        "pricing": {
          "currency": "USD",
          "registration_cost": "11.00",
          "renewal_cost": "11.00"
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
        "name": "bestpizza.com",
        "pricing": {
          "currency": "USD",
          "registration_cost": "8.57",
          "renewal_cost": "8.57"
        },
        "registrable": true,
        "tier": "standard"
      },
      {
        "name": "bestpizza.net",
        "pricing": {
          "currency": "USD",
          "registration_cost": "9.95",
          "renewal_cost": "9.95"
        },
        "registrable": true,
        "tier": "standard"
      },
      {
        "name": "bestpizzashop.com",
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
  "errors": [],
  "messages": [],
  "result": {
    "domains": [
      {
        "name": "coffeeshop.com",
        "pricing": {
          "currency": "USD",
          "registration_cost": "8.57",
          "renewal_cost": "8.57"
        },
        "registrable": true,
        "tier": "standard"
      },
      {
        "name": "coffeeshoponline.com",
        "pricing": {
          "currency": "USD",
          "registration_cost": "8.57",
          "renewal_cost": "8.57"
        },
        "registrable": true,
        "tier": "standard"
      },
      {
        "name": "mycoffeeshop.net",
        "pricing": {
          "currency": "USD",
          "registration_cost": "9.95",
          "renewal_cost": "9.95"
        },
        "registrable": true,
        "tier": "standard"
      },
      {
        "name": "thecoffeeshop.shop",
        "pricing": {
          "currency": "USD",
          "registration_cost": "11.00",
          "renewal_cost": "11.00"
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
    "domains": []
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
        "name": "crypto.com",
        "pricing": {
          "currency": "USD",
          "registration_cost": "100000.00",
          "renewal_cost": "5000.00"
        },
        "registrable": true,
        "tier": "premium"
      },
      {
        "name": "cryptotrading.com",
        "pricing": {
          "currency": "USD",
          "registration_cost": "8.57",
          "renewal_cost": "8.57"
        },
        "registrable": true,
        "tier": "standard"
      },
      {
        "name": "mycrypto.net",
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
  "errors": [
    {
      "code": 1002,
      "message": "Parameter q exceeds maximum length of 100 characters"
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
      "code": 1001,
      "message": "Missing required parameter: q"
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

400 example

400 example

```
{
  "errors": [],
  "messages": [],
  "result": {
    "domains": [
      {
        "name": "acmecorp.com",
        "pricing": {
          "currency": "USD",
          "registration_cost": "8.57",
          "renewal_cost": "8.57"
        },
        "registrable": true,
        "tier": "standard"
      },
      {
        "name": "acmecorp.dev",
        "pricing": {
          "currency": "USD",
          "registration_cost": "10.11",
          "renewal_cost": "10.11"
        },
        "registrable": true,
        "tier": "standard"
      },
      {
        "name": "acmecorp.app",
        "pricing": {
          "currency": "USD",
          "registration_cost": "11.00",
          "renewal_cost": "11.00"
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
        "name": "bestpizza.com",
        "pricing": {
          "currency": "USD",
          "registration_cost": "8.57",
          "renewal_cost": "8.57"
        },
        "registrable": true,
        "tier": "standard"
      },
      {
        "name": "bestpizza.net",
        "pricing": {
          "currency": "USD",
          "registration_cost": "9.95",
          "renewal_cost": "9.95"
        },
        "registrable": true,
        "tier": "standard"
      },
      {
        "name": "bestpizzashop.com",
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
  "errors": [],
  "messages": [],
  "result": {
    "domains": [
      {
        "name": "coffeeshop.com",
        "pricing": {
          "currency": "USD",
          "registration_cost": "8.57",
          "renewal_cost": "8.57"
        },
        "registrable": true,
        "tier": "standard"
      },
      {
        "name": "coffeeshoponline.com",
        "pricing": {
          "currency": "USD",
          "registration_cost": "8.57",
          "renewal_cost": "8.57"
        },
        "registrable": true,
        "tier": "standard"
      },
      {
        "name": "mycoffeeshop.net",
        "pricing": {
          "currency": "USD",
          "registration_cost": "9.95",
          "renewal_cost": "9.95"
        },
        "registrable": true,
        "tier": "standard"
      },
      {
        "name": "thecoffeeshop.shop",
        "pricing": {
          "currency": "USD",
          "registration_cost": "11.00",
          "renewal_cost": "11.00"
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
    "domains": []
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
        "name": "crypto.com",
        "pricing": {
          "currency": "USD",
          "registration_cost": "100000.00",
          "renewal_cost": "5000.00"
        },
        "registrable": true,
        "tier": "premium"
      },
      {
        "name": "cryptotrading.com",
        "pricing": {
          "currency": "USD",
          "registration_cost": "8.57",
          "renewal_cost": "8.57"
        },
        "registrable": true,
        "tier": "standard"
      },
      {
        "name": "mycrypto.net",
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
  "errors": [
    {
      "code": 1002,
      "message": "Parameter q exceeds maximum length of 100 characters"
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
      "code": 1001,
      "message": "Missing required parameter: q"
    }
  ],
  "messages": [],
  "result": null,
  "success": false
}
```