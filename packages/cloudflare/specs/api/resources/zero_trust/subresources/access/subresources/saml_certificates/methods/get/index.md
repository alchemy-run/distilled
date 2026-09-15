---
title: Get SAML certificate set
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Access](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access)

[SAML Certificates](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/saml_certificates)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get SAML certificate set

GET/accounts/{account\_id}/access/saml\_certificates/{saml\_cert\_set\_id}

Retrieves a specific SAML encryption certificate set by its UID, including both current and previous certificates if available.

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

[Link to this property](#)%20zero_trust.access.saml_certificates%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

saml\_cert\_set\_id: string

UUID.

maxLength36

[Link to this property](#)%20zero_trust.access.saml_certificates%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20saml_cert_set_id%20%3E%20(schema)>)

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

[Link to this property](#)%20zero_trust.access.saml_certificates%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20zero_trust.access.saml_certificates%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20zero_trust.access.saml_certificates%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {created\_at, uid, updated\_at, 2 more }

</summary>

created\_at: string

When the certificate set was created

formatdate-time

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate set

<a href="#">Link to this property</a>

updated\_at: string

When the certificate set was last updated

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

current\_certificate: optional object {is\_current, not\_after, public\_certificate, uid }

The current active certificate

</summary>

is\_current: boolean

Indicates whether the certificate can be used for IdP configuration.

<a href="#">Link to this property</a>

not\_after: string

Certificate expiration date

formatdate-time

<a href="#">Link to this property</a>

public\_certificate: string

The public certificate in PEM format

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

previous\_certificate: optional unknown

The previous certificate (maintained during rotation period). May be null when no rotation has occurred. Mirrors the structure of <code>saml_certificate</code>.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.saml_certificates%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Get SAML certificate set

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/saml_certificates/$SAML_CERT_SET_ID \
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
    "created_at": "2024-03-21T10:30:00Z",
    "uid": "a5bb4b3f-c2d1-4e6a-8f9b-1d3e4f5a6b7c",
    "updated_at": "2024-03-21T10:30:00Z",
    "current_certificate": {
      "is_current": true,
      "not_after": "2027-03-21T12:00:00Z",
      "public_certificate": "-----BEGIN CERTIFICATE-----\nMIIGAjCCA+qgAwIBAgIJAI7kymlF7CWT...\n...certificate content...\n-----END CERTIFICATE-----\n",
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
    "created_at": "2024-03-21T10:30:00Z",
    "uid": "a5bb4b3f-c2d1-4e6a-8f9b-1d3e4f5a6b7c",
    "updated_at": "2024-03-21T10:30:00Z",
    "current_certificate": {
      "is_current": true,
      "not_after": "2027-03-21T12:00:00Z",
      "public_certificate": "-----BEGIN CERTIFICATE-----\nMIIGAjCCA+qgAwIBAgIJAI7kymlF7CWT...\n...certificate content...\n-----END CERTIFICATE-----\n",
      "uid": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
    },
    "previous_certificate": {}
  }
}
```