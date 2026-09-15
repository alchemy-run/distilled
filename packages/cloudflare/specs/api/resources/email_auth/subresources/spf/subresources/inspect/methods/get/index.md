---
title: Inspect SPF Record
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Email Auth](https://developers.cloudflare.com/api/resources/email_auth)

[SPF](https://developers.cloudflare.com/api/resources/email_auth/subresources/spf)

[Inspect](https://developers.cloudflare.com/api/resources/email_auth/subresources/spf/subresources/inspect)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Inspect SPF Record

GET/zones/{zone\_id}/email/auth/spf/inspect

Inspects a specific SPF TXT record and returns a parsed tree structure in the spflimit-worker format.

The record ID must be provided via the `id` query parameter.

Returns a recursive tree showing:

- Parsed components with their qualifiers and types
- Nested includes recursively resolved within components
- Per-component and total lookup counts
- Detailed error information with context

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

zone\_id: string

Identifier.

maxLength32

[Link to this property](#)%20email_auth.spf.inspect%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

id: string

DNS record ID (rec\_tag) to inspect

[Link to this property](#)%20email_auth.spf.inspect%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20id%20%3E%20(schema)>)

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

[Link to this property](#)%20email_auth.spf.inspect%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20email_auth.spf.inspect%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20email_auth.spf.inspect%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {components, domain, record, 2 more }

Recursive SPF inspection tree

</summary>

components: array of unknown

Parsed SPF components (mechanisms)

<a href="#">Link to this property</a>

domain: string

Domain being inspected

<a href="#">Link to this property</a>

record: string

Raw SPF record content

<a href="#">Link to this property</a>

total\_lookups: number

Total number of DNS lookups performed across all includes

<a href="#">Link to this property</a>

<details>

<summary>

errors: optional array of object {code, domain, message, details }

All errors encountered during inspection, collected from the entire tree. This includes errors from nested includes at any depth, providing a quick overview of all issues without needing to traverse the nested structure. Each error includes a <code>domain</code> field to identify where it occurred. Empty array if no errors (omitted from JSON when empty).

</summary>

code: string

Error code. Known values:

- <code>lookup_failed</code> — DNS TXT lookup failed
- <code>spf_not_found</code> — no SPF record found
- <code>invalid_spf</code> — record does not start with <code>v=spf1</code>
- <code>invalid_domain</code> — PSL validation failed
- <code>loop_detected</code> — include/redirect cycle detected
- <code>invalid_mechanism</code> — unrecognised or malformed mechanism
- <code>resource_limit_exceeded</code> — internal resource protection limits exceeded (recursion depth or query budget)
- <code>max_lookups</code> — RFC 7208 10-lookup limit exceeded

<a href="#">Link to this property</a>

domain: string

Domain where the error occurred

<a href="#">Link to this property</a>

message: string

Human-readable error message

<a href="#">Link to this property</a>

details: optional string

Additional error-specific details (optional).

- For <code>invalid_domain</code> errors: the invalid domain string
- For <code>invalid_mechanism</code> errors: the invalid mechanism text (e.g., “invalidmech123”)
- For <code>loop_detected</code> errors: the domain that caused the loop
- For other error types: not present

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_auth.spf.inspect%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Inspect SPF Record

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/email/auth/spf/inspect \
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
    "components": [
      {}
    ],
    "domain": "example.com",
    "record": "v=spf1 ip4:203.0.113.1 include:spf.example.com -all",
    "total_lookups": 2,
    "errors": [
      {
        "code": "max_lookups",
        "domain": "example.com",
        "message": "RFC 7208 10-lookup limit exceeded",
        "details": "invalid"
      }
    ]
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
    "components": [
      {}
    ],
    "domain": "example.com",
    "record": "v=spf1 ip4:203.0.113.1 include:spf.example.com -all",
    "total_lookups": 2,
    "errors": [
      {
        "code": "max_lookups",
        "domain": "example.com",
        "message": "RFC 7208 10-lookup limit exceeded",
        "details": "invalid"
      }
    ]
  }
}
```