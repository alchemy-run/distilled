---
title: List Client Certificates
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Client Certificates](https://developers.cloudflare.com/api/resources/client_certificates)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List Client Certificates

GET/zones/{zone\_id}/client\_certificates

List all of your Zone’s API Shield mTLS Client Certificates by Status and/or using Pagination.

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

`SSL and Certificates Write``SSL and Certificates Read`

##### P ath ParametersExpand Collapse

zone\_id: string

Identifier.

maxLength32

[Link to this property](#)%20client_certificates%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

limit: optional number

Limit to the number of records returned.

[Link to this property](#)%20client_certificates%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20limit%20%3E%20(schema)>)

offset: optional number

Offset the results.

[Link to this property](#)%20client_certificates%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20offset%20%3E%20(schema)>)

page: optional number

Page number of paginated results.

minimum1

[Link to this property](#)%20client_certificates%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: optional number

Number of records per page.

maximum50

minimum5

[Link to this property](#)%20client_certificates%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

<details>

<summary>

status: optional "all"or "active"or "pending\_reactivation"or 2 more

Client Certitifcate Status to filter results by.

</summary>

One of the following:

"all"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"pending\_reactivation"

<a href="#">Link to this property</a>

"pending\_revocation"

<a href="#">Link to this property</a>

"revoked"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20client_certificates%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20status%20%3E%20(schema)>)

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

[Link to this property](#)%20client_certificates%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20client_certificates%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20client_certificates%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional array of <a href="https://developers.cloudflare.com/api/resources/client_certificates#(resource)%20client_certificates%20%3E%20(model)%20client_certificate%20%3E%20(schema)">ClientCertificate</a> { id, certificate, certificate\_authority, 15 more }

</summary>

id: optional string

Identifier.

maxLength32

<a href="#">Link to this property</a>

certificate: optional string

The Client Certificate PEM.

<a href="#">Link to this property</a>

<details>

<summary>

certificate\_authority: optional object {id, name }

Certificate Authority used to issue the Client Certificate.

</summary>

id: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

common\_name: optional string

Common Name of the Client Certificate.

<a href="#">Link to this property</a>

country: optional string

Country, provided by the CSR.

<a href="#">Link to this property</a>

csr: optional string

The Certificate Signing Request (CSR). Must be newline-encoded.

<a href="#">Link to this property</a>

expires\_on: optional string

Date that the Client Certificate expires.

<a href="#">Link to this property</a>

fingerprint\_sha256: optional string

Unique identifier of the Client Certificate.

<a href="#">Link to this property</a>

issued\_on: optional string

Date that the Client Certificate was issued by the Certificate Authority.

<a href="#">Link to this property</a>

location: optional string

Location, provided by the CSR.

<a href="#">Link to this property</a>

organization: optional string

Organization, provided by the CSR.

<a href="#">Link to this property</a>

organizational\_unit: optional string

Organizational Unit, provided by the CSR.

<a href="#">Link to this property</a>

serial\_number: optional string

The serial number on the created Client Certificate.

<a href="#">Link to this property</a>

signature: optional string

The type of hash used for the Client Certificate..

<a href="#">Link to this property</a>

ski: optional string

Subject Key Identifier.

<a href="#">Link to this property</a>

state: optional string

State, provided by the CSR.

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "active"or "pending\_reactivation"or "pending\_revocation"or "revoked"

Client Certificates may be active or revoked, and the pending\_reactivation or pending\_revocation represent in-progress asynchronous transitions.

</summary>

One of the following:

"active"

<a href="#">Link to this property</a>

"pending\_reactivation"

<a href="#">Link to this property</a>

"pending\_revocation"

<a href="#">Link to this property</a>

"revoked"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

validity\_days: optional number

The number of days the Client Certificate will be valid after the issued\_on date.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20client_certificates%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

<details>

<summary>

result\_info: optional object {count, page, per\_page, 2 more }

</summary>

count: optional number

Total number of results for the requested service.

<a href="#">Link to this property</a>

page: optional number

Current page within paginated list of results.

<a href="#">Link to this property</a>

per\_page: optional number

Number of results per page of results.

<a href="#">Link to this property</a>

total\_count: optional number

Total results available without any search parameters.

<a href="#">Link to this property</a>

total\_pages: optional number

The number of total pages in the entire result set.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20client_certificates%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### List Client Certificates

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/client_certificates \
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
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "certificate": "-----BEGIN CERTIFICATE-----\nMIIDmDCCAoC...dhDDE\n-----END CERTIFICATE-----",
      "certificate_authority": {
        "id": "568b6b74-7b0c-4755-8840-4e3b8c24adeb",
        "name": "Cloudflare Managed CA for account"
      },
      "common_name": "Cloudflare",
      "country": "US",
      "csr": "-----BEGIN CERTIFICATE REQUEST-----\nMIICY....\n-----END CERTIFICATE REQUEST-----",
      "expires_on": "2033-02-20T23:18:00Z",
      "fingerprint_sha256": "256c24690243359fb8cf139a125bd05ebf1d968b71e4caf330718e9f5c8a89ea",
      "issued_on": "2023-02-23T23:18:00Z",
      "location": "Somewhere",
      "organization": "Organization",
      "organizational_unit": "Organizational Unit",
      "serial_number": "3bb94ff144ac567b9f75ad664b6c55f8d5e48182",
      "signature": "SHA256WithRSA",
      "ski": "8e375af1389a069a0f921f8cc8e1eb12d784b949",
      "state": "CA",
      "status": "active",
      "validity_days": 3650
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
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
  "result": [
    {
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "certificate": "-----BEGIN CERTIFICATE-----\nMIIDmDCCAoC...dhDDE\n-----END CERTIFICATE-----",
      "certificate_authority": {
        "id": "568b6b74-7b0c-4755-8840-4e3b8c24adeb",
        "name": "Cloudflare Managed CA for account"
      },
      "common_name": "Cloudflare",
      "country": "US",
      "csr": "-----BEGIN CERTIFICATE REQUEST-----\nMIICY....\n-----END CERTIFICATE REQUEST-----",
      "expires_on": "2033-02-20T23:18:00Z",
      "fingerprint_sha256": "256c24690243359fb8cf139a125bd05ebf1d968b71e4caf330718e9f5c8a89ea",
      "issued_on": "2023-02-23T23:18:00Z",
      "location": "Somewhere",
      "organization": "Organization",
      "organizational_unit": "Organizational Unit",
      "serial_number": "3bb94ff144ac567b9f75ad664b6c55f8d5e48182",
      "signature": "SHA256WithRSA",
      "ski": "8e375af1389a069a0f921f8cc8e1eb12d784b949",
      "state": "CA",
      "status": "active",
      "validity_days": 3650
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```