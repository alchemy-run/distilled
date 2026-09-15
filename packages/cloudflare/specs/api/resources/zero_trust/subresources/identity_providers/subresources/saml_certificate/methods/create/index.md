---
title: Create SAML encryption certificate for Identity Provider
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Identity Providers](https://developers.cloudflare.com/api/resources/zero_trust/subresources/identity_providers)

[SAML Certificate](https://developers.cloudflare.com/api/resources/zero_trust/subresources/identity_providers/subresources/saml_certificate)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Create SAML encryption certificate for Identity Provider

POST/accounts/{account\_id}/access/identity\_providers/{identity\_provider\_id}/saml\_certificate

Creates a new SAML encryption certificate set and assigns it to the specified SAML Identity Provider. This endpoint is idempotent - if the IdP already has a certificate set assigned, the existing certificate set is returned with a 200 status.

**Workflow for enabling SAML encryption:**

1. Call this endpoint to create and assign a certificate set to the IdP
2. Update the IdP configuration (PUT `/identity_providers/{id}`) with:
   - `config.enable_encryption: true`
   - `saml_certificate_set_id: <uid from step 1>`
3. Configure the certificate’s public key in your external SAML Identity Provider

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

[Link to this property](#)%20zero_trust.identity_providers.saml_certificate%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

identity\_provider\_id: string

UUID.

maxLength36

[Link to this property](#)%20zero_trust.identity_providers.saml_certificate%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20identity_provider_id%20%3E%20(schema)>)

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

[Link to this property](#)%20zero_trust.identity_providers.saml_certificate%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20zero_trust.identity_providers.saml_certificate%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20zero_trust.identity_providers.saml_certificate%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {created\_at, uid, updated\_at, 2 more }

A SAML encryption certificate set containing current and optionally previous certificates for encryption key rotation.

</summary>

created\_at: string

Timestamp when the certificate set was created

formatdate-time

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate set

formatuuid

<a href="#">Link to this property</a>

updated\_at: string

Timestamp when the certificate set was last updated (e.g., during rotation)

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

current\_certificate: optional object {is\_current, not\_after, public\_certificate, uid }

The currently active certificate used for encrypting SAML assertions

</summary>

is\_current: boolean

Indicates whether this is the currently active certificate

<a href="#">Link to this property</a>

not\_after: string

Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

formatdate-time

<a href="#">Link to this property</a>

public\_certificate: string

PEM-encoded X.509 certificate containing the public key. Configure this certificate in your external SAML Identity Provider to enable encryption.

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

previous\_certificate: optional unknown

The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of <code>saml_certificate</code>.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.identity_providers.saml_certificate%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Create SAML encryption certificate for Identity Provider

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/identity_providers/$IDENTITY_PROVIDER_ID/saml_certificate \
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
    "created_at": "2026-05-07T19:16:19.821162Z",
    "uid": "c409ef44-e72c-41c8-8c0b-278c8a6f4fd8",
    "updated_at": "2026-05-07T19:16:19.821162Z",
    "current_certificate": {
      "is_current": true,
      "not_after": "2027-05-07T19:11:00Z",
      "public_certificate": "-----BEGIN CERTIFICATE-----\nMIIEpzCCA4+gAwIBAgIUTh2VSDDJ0oB/gabio6j1L9QwWoUwDQYJKoZIhvcNAQEL\n...\n-----END CERTIFICATE-----\n",
      "uid": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
    },
    "previous_certificate": {}
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
    "created_at": "2026-05-07T19:16:19.821162Z",
    "uid": "c409ef44-e72c-41c8-8c0b-278c8a6f4fd8",
    "updated_at": "2026-05-07T19:16:19.821162Z",
    "current_certificate": {
      "is_current": true,
      "not_after": "2027-05-07T19:11:00Z",
      "public_certificate": "-----BEGIN CERTIFICATE-----\nMIIEpzCCA4+gAwIBAgIUTh2VSDDJ0oB/gabio6j1L9QwWoUwDQYJKoZIhvcNAQEL\n...\n-----END CERTIFICATE-----\n",
      "uid": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
    },
    "previous_certificate": {}
  }
}
```