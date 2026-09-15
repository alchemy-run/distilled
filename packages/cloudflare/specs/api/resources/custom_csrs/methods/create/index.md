---
title: Create Custom CSR
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Custom Csrs](https://developers.cloudflare.com/api/resources/custom_csrs)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Create Custom CSR

POST/{accounts\_or\_zones}/{account\_or\_zone\_id}/custom\_csrs

Generate a new custom Certificate Signing Request (CSR) for an account or zone. Cloudflare generates and securely stores the private key associated with the CSR.

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

`Account: SSL and Certificates Write`

##### P ath ParametersExpand Collapse

account\_id: optional string

The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

[Link to this property](#)%20custom_csrs%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

zone\_id: optional string

The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

[Link to this property](#)%20custom_csrs%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

common\_name: string

The common name (domain) for the CSR. Must be at most 64 characters.

maxLength64

[Link to this property](#)%20custom_csrs%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20common_name%20%3E%20(schema)>)

country: string

Two-letter ISO 3166-1 alpha-2 country code.

[Link to this property](#)%20custom_csrs%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20country%20%3E%20(schema)>)

locality: string

City or locality name.

[Link to this property](#)%20custom_csrs%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20locality%20%3E%20(schema)>)

organization: string

Organization name.

[Link to this property](#)%20custom_csrs%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20organization%20%3E%20(schema)>)

sans: array of string

Subject Alternative Names for the CSR. At least one SAN is required.

[Link to this property](#)%20custom_csrs%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20sans%20%3E%20(schema)>)

state: string

State or province name.

[Link to this property](#)%20custom_csrs%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20state%20%3E%20(schema)>)

description: optional string

Optional description for the CSR.

[Link to this property](#)%20custom_csrs%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20description%20%3E%20(schema)>)

<details>

<summary>

key\_type: optional "rsa2048"or "p256v1"

Key algorithm to use for the CSR. Defaults to rsa2048 if not specified.

</summary>

One of the following:

"rsa2048"

<a href="#">Link to this property</a>

"p256v1"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20custom_csrs%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20key_type%20%3E%20(schema)>)

name: optional string

Human-readable name for the CSR.

[Link to this property](#)%20custom_csrs%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20name%20%3E%20(schema)>)

organizational\_unit: optional string

Organizational unit name.

[Link to this property](#)%20custom_csrs%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20organizational_unit%20%3E%20(schema)>)

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

[Link to this property](#)%20custom_csrs%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20custom_csrs%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20custom_csrs%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {id, created\_at, key\_type, 11 more }

A custom Certificate Signing Request (CSR).

</summary>

id: string

Custom CSR identifier tag.

maxLength36

<a href="#">Link to this property</a>

created\_at: string

When the CSR was created.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

key\_type: "rsa2048"or "p256v1"

The key algorithm used to generate the CSR.

</summary>

One of the following:

"rsa2048"

<a href="#">Link to this property</a>

"p256v1"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

account\_tag: optional string

Account identifier associated with this CSR.

<a href="#">Link to this property</a>

common\_name: optional string

The common name (domain) for the CSR.

maxLength64

<a href="#">Link to this property</a>

country: optional string

Two-letter ISO 3166-1 alpha-2 country code.

<a href="#">Link to this property</a>

csr: optional string

The PEM-encoded Certificate Signing Request.

<a href="#">Link to this property</a>

description: optional string

Optional description for the CSR.

<a href="#">Link to this property</a>

locality: optional string

City or locality name.

<a href="#">Link to this property</a>

name: optional string

Human-readable name for the CSR.

<a href="#">Link to this property</a>

organization: optional string

Organization name.

<a href="#">Link to this property</a>

organizational\_unit: optional string

Organizational unit name.

<a href="#">Link to this property</a>

sans: optional array of string

Subject Alternative Names included in the CSR.

<a href="#">Link to this property</a>

state: optional string

State or province name.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20custom_csrs%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Create Custom CSR

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/custom_csrs \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "common_name": "example.com",
          "country": "US",
          "locality": "San Francisco",
          "organization": "Cloudflare, Inc.",
          "sans": [
            "example.com",
            "www.example.com"
          ],
          "state": "California",
          "description": "CSR for example.com wildcard",
          "key_type": "rsa2048",
          "name": "My Custom CSR",
          "organizational_unit": "Engineering"
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
    "id": "7b163417-1d2b-4c84-a38a-2fb7a0cd7752",
    "created_at": "2024-01-15T10:30:00Z",
    "key_type": "rsa2048",
    "account_tag": "23e087bd19bc1d40ae95b6f297263ceb",
    "common_name": "example.com",
    "country": "US",
    "csr": "-----BEGIN CERTIFICATE REQUEST-----\nMIICYzCCAUsCAQAwHj...",
    "description": "CSR for example.com wildcard",
    "locality": "San Francisco",
    "name": "My Custom CSR",
    "organization": "Cloudflare, Inc.",
    "organizational_unit": "Engineering",
    "sans": [
      "example.com",
      "www.example.com"
    ],
    "state": "California"
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
    "id": "7b163417-1d2b-4c84-a38a-2fb7a0cd7752",
    "created_at": "2024-01-15T10:30:00Z",
    "key_type": "rsa2048",
    "account_tag": "23e087bd19bc1d40ae95b6f297263ceb",
    "common_name": "example.com",
    "country": "US",
    "csr": "-----BEGIN CERTIFICATE REQUEST-----\nMIICYzCCAUsCAQAwHj...",
    "description": "CSR for example.com wildcard",
    "locality": "San Francisco",
    "name": "My Custom CSR",
    "organization": "Cloudflare, Inc.",
    "organizational_unit": "Engineering",
    "sans": [
      "example.com",
      "www.example.com"
    ],
    "state": "California"
  }
}
```