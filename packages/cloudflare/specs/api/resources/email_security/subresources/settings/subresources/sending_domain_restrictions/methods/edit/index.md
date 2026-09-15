---
title: Update a sending domain restriction
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Email Security](https://developers.cloudflare.com/api/resources/email_security)

[Settings](https://developers.cloudflare.com/api/resources/email_security/subresources/settings)

[Sending Domain Restrictions](https://developers.cloudflare.com/api/resources/email_security/subresources/settings/subresources/sending_domain_restrictions)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Update a sending domain restriction

PATCH/accounts/{account\_id}/email-security/settings/sending\_domain\_restrictions/{sending\_domain\_restriction\_id}

Updates an existing sending domain restriction. Only provided fields will be modified. Changes affect which domains require TLS and which subdomains are excluded.

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

`Cloud Email Security: Write`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier.

maxLength32

[Link to this property](#)%20email_security.settings.sending_domain_restrictions%20%3E%20(method)%20edit%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

sending\_domain\_restriction\_id: string

Sending domain restriction identifier.

formatuuid

[Link to this property](#)%20email_security.settings.sending_domain_restrictions%20%3E%20(method)%20edit%20%3E%20(params)%20default%20%3E%20(param)%20sending_domain_restriction_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

comments: optional string

maxLength1024

[Link to this property](#)%20email_security.settings.sending_domain_restrictions%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20comments%20%3E%20(schema)>)

domain: optional string

Domain that requires TLS enforcement.

[Link to this property](#)%20email_security.settings.sending_domain_restrictions%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20domain%20%3E%20(schema)>)

exclude: optional array of string

Subdomains to exempt from TLS requirements.

[Link to this property](#)%20email_security.settings.sending_domain_restrictions%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20exclude%20%3E%20(schema)>)

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

[Link to this property](#)%20email_security.settings.sending_domain_restrictions%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20email_security.settings.sending_domain_restrictions%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20email_security.settings.sending_domain_restrictions%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {id, comments, created\_at, 4 more }

A sending domain restriction that enforces TLS (Transport Layer Security) requirements for emails from specific domains. If TLS is required, the system drops mail without TLS from the specified domain.

</summary>

id: optional string

Sending domain restriction identifier.

formatuuid

<a href="#">Link to this property</a>

comments: optional string

maxLength1024

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

domain: optional string

Domain that requires TLS enforcement.

<a href="#">Link to this property</a>

exclude: optional array of string

Subdomains to exempt from TLS requirements.

<a href="#">Link to this property</a>

Deprecatedlast\_modified: optional string

Use <code>modified_at</code> instead.

Deprecated, use <code>modified_at</code> instead. End of life: November 1, 2026.

formatdate-time

<a href="#">Link to this property</a>

modified\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.settings.sending_domain_restrictions%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Update a sending domain restriction

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/settings/sending_domain_restrictions/$SENDING_DOMAIN_RESTRICTION_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "comments": "Enforce TLS for all mail from this domain",
          "domain": "example.com",
          "exclude": [
            "subdomain.example.com"
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
  "success": true,
  "result": {
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "comments": "Enforce TLS for all mail from this domain",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "domain": "example.com",
    "exclude": [
      "subdomain.example.com"
    ],
    "last_modified": "2014-01-01T05:20:00.12345Z",
    "modified_at": "2014-01-01T05:20:00.12345Z"
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
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "comments": "Enforce TLS for all mail from this domain",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "domain": "example.com",
    "exclude": [
      "subdomain.example.com"
    ],
    "last_modified": "2014-01-01T05:20:00.12345Z",
    "modified_at": "2014-01-01T05:20:00.12345Z"
  }
}
```