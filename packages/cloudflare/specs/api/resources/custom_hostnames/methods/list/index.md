---
title: List Custom Hostnames
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Custom Hostnames](https://developers.cloudflare.com/api/resources/custom_hostnames)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List Custom Hostnames

GET/zones/{zone\_id}/custom\_hostnames

List, search, sort, and filter all of your custom hostnames.

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

[Link to this property](#)%20custom_hostnames%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

id: optional string

Hostname ID to match against. This ID was generated and returned during the initial custom\_hostname creation. This parameter cannot be used with the ‘hostname’, ‘hostname.exact’, ‘hostname.contain’, or ‘hostname.startsWith’ parameters.

maxLength36

minLength36

[Link to this property](#)%20custom_hostnames%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20id%20%3E%20(schema)>)

<details>

<summary>

certificate\_authority: optional "google"or "lets\_encrypt"or "ssl\_com"

Filter by the certificate authority that issued the SSL certificate.

</summary>

One of the following:

"google"

<a href="#">Link to this property</a>

"lets\_encrypt"

<a href="#">Link to this property</a>

"ssl\_com"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20custom_hostnames%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20certificate_authority%20%3E%20(schema)>)

custom\_origin\_server: optional string

Filter by custom origin server name.

[Link to this property](#)%20custom_hostnames%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20custom_origin_server%20%3E%20(schema)>)

<details>

<summary>

direction: optional "asc"or "desc"

Direction to order hostnames.

</summary>

One of the following:

"asc"

<a href="#">Link to this property</a>

"desc"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20custom_hostnames%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20direction%20%3E%20(schema)>)

<details>

<summary>

hostname: optional object {contain, exact, startsWith }

</summary>

contain: optional string

Filters hostnames by a substring match on the hostname value. This parameter cannot be used with the ‘id’, ‘hostname’, ‘hostname.exact’, or ‘hostname.startsWith’ parameters.

maxLength255

<a href="#">Link to this property</a>

exact: optional string

Fully qualified domain name to match against. This parameter cannot be used with the ‘id’, ‘hostname’, ‘hostname.contain’, or ‘hostname.startsWith’ parameters.

maxLength255

<a href="#">Link to this property</a>

startsWith: optional string

Filters hostnames by a prefix match on the hostname value. This parameter cannot be used with the ‘id’, ‘hostname’, ‘hostname.exact’, or ‘hostname.contain’ parameters.

maxLength255

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20custom_hostnames%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20hostname%20%3E%20(schema)>)

<details>

<summary>

hostname\_status: optional "active"or "pending"or "active\_redeploying"or 13 more

Filter by the hostname’s activation status.

</summary>

One of the following:

"active"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"active\_redeploying"

<a href="#">Link to this property</a>

"moved"

<a href="#">Link to this property</a>

"pending\_deletion"

<a href="#">Link to this property</a>

"deleted"

<a href="#">Link to this property</a>

"pending\_blocked"

<a href="#">Link to this property</a>

"pending\_migration"

<a href="#">Link to this property</a>

"pending\_provisioned"

<a href="#">Link to this property</a>

"test\_pending"

<a href="#">Link to this property</a>

"test\_active"

<a href="#">Link to this property</a>

"test\_active\_apex"

<a href="#">Link to this property</a>

"test\_blocked"

<a href="#">Link to this property</a>

"test\_failed"

<a href="#">Link to this property</a>

"provisioned"

<a href="#">Link to this property</a>

"blocked"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20custom_hostnames%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20hostname_status%20%3E%20(schema)>)

<details>

<summary>

order: optional "ssl"or "ssl\_status"

Field to order hostnames by.

</summary>

One of the following:

"ssl"

<a href="#">Link to this property</a>

"ssl\_status"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20custom_hostnames%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20order%20%3E%20(schema)>)

page: optional number

Page number of paginated results.

minimum1

[Link to this property](#)%20custom_hostnames%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: optional number

Number of hostnames per page.

maximum1000

minimum5

[Link to this property](#)%20custom_hostnames%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

<details>

<summary>

ssl: optional 0or 1

Whether to filter hostnames based on if they have SSL enabled.

</summary>

One of the following:

0

<a href="#">Link to this property</a>

1

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20custom_hostnames%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20ssl%20%3E%20(schema)>)

<details>

<summary>

ssl\_status: optional "initializing"or "pending\_validation"or "deleted"or 18 more

Filter by SSL certificate status.

</summary>

One of the following:

"initializing"

<a href="#">Link to this property</a>

"pending\_validation"

<a href="#">Link to this property</a>

"deleted"

<a href="#">Link to this property</a>

"pending\_issuance"

<a href="#">Link to this property</a>

"pending\_deployment"

<a href="#">Link to this property</a>

"pending\_deletion"

<a href="#">Link to this property</a>

"pending\_expiration"

<a href="#">Link to this property</a>

"expired"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"initializing\_timed\_out"

<a href="#">Link to this property</a>

"validation\_timed\_out"

<a href="#">Link to this property</a>

"issuance\_timed\_out"

<a href="#">Link to this property</a>

"deployment\_timed\_out"

<a href="#">Link to this property</a>

"deletion\_timed\_out"

<a href="#">Link to this property</a>

"pending\_cleanup"

<a href="#">Link to this property</a>

"staging\_deployment"

<a href="#">Link to this property</a>

"staging\_active"

<a href="#">Link to this property</a>

"deactivating"

<a href="#">Link to this property</a>

"inactive"

<a href="#">Link to this property</a>

"backup\_issued"

<a href="#">Link to this property</a>

"holding\_deployment"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20custom_hostnames%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20ssl_status%20%3E%20(schema)>)

wildcard: optional boolean

Filter by whether the custom hostname is a wildcard hostname.

[Link to this property](#)%20custom_hostnames%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20wildcard%20%3E%20(schema)>)

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

[Link to this property](#)%20custom_hostnames%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

messages: array of string

Informational messages returned by the custom hostname API.

[Link to this property](#)%20custom_hostnames%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20custom_hostnames%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional array of object {id, hostname, created\_at, 8 more }

</summary>

id: string

Identifier.

maxLength32

<a href="#">Link to this property</a>

hostname: string

The custom hostname that will point to your hostname via CNAME.

maxLength255

<a href="#">Link to this property</a>

created\_at: optional string

This is the time the hostname was created.

formatdate-time

<a href="#">Link to this property</a>

custom\_metadata: optional map\[string]

Unique key/value metadata for this hostname. These are per-hostname (customer) settings.

<a href="#">Link to this property</a>

custom\_origin\_server: optional string

a valid hostname that’s been added to your DNS zone as an A, AAAA, or CNAME record.

<a href="#">Link to this property</a>

custom\_origin\_sni: optional string

A hostname that will be sent to your custom origin server as SNI for TLS handshake. This can be a valid subdomain of the zone or custom origin server name or the string ‘:request\_host\_header:’ which will cause the host header in the request to be used as SNI. Not configurable with default/fallback origin server.

<a href="#">Link to this property</a>

<details>

<summary>

ownership\_verification: optional object {name, type, value }

This is a record which can be placed to activate a hostname.

</summary>

name: optional string

DNS Name for record.

<a href="#">Link to this property</a>

type: optional "txt"

DNS Record type.

<a href="#">Link to this property</a>

value: optional string

Content for the record.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ownership\_verification\_http: optional object {http\_body, http\_url }

This presents the token to be served by the given http url to activate a hostname.

</summary>

http\_body: optional string

Token to be served.

<a href="#">Link to this property</a>

http\_url: optional string

The HTTP URL that will be checked during custom hostname verification and where the customer should host the token.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ssl: optional object {id, bundle\_method, certificate\_authority, 17 more }

</summary>

id: optional string

Custom hostname SSL identifier tag.

maxLength36

minLength36

<a href="#">Link to this property</a>

<details>

<summary>

bundle\_method: optional <a href="https://developers.cloudflare.com/api/resources/custom_hostnames#(resource)%20custom_hostnames%20%3E%20(model)%20bundle_method%20%3E%20(schema)">BundleMethod</a>

A ubiquitous bundle has the highest probability of being verified everywhere, even by clients using outdated or unusual trust stores. An optimal bundle uses the shortest chain and newest intermediates. And the force bundle verifies the chain, but does not otherwise modify it.

</summary>

One of the following:

"ubiquitous"

<a href="#">Link to this property</a>

"optimal"

<a href="#">Link to this property</a>

"force"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

certificate\_authority: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20certificate_ca%20%3E%20(schema)">CertificateCA</a>

The Certificate Authority that will issue the certificate.

</summary>

One of the following:

"digicert"

<a href="#">Link to this property</a>

"google"

<a href="#">Link to this property</a>

"lets\_encrypt"

<a href="#">Link to this property</a>

"ssl\_com"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

custom\_certificate: optional string

If a custom uploaded certificate is used.

<a href="#">Link to this property</a>

custom\_csr\_id: optional string

The identifier for the Custom CSR that was used.

<a href="#">Link to this property</a>

custom\_key: optional string

The key for a custom uploaded certificate.

<a href="#">Link to this property</a>

<details>

<summary>

dcv\_delegation\_records: optional array of object {cname, cname\_target, emails, 5 more }

DCV Delegation records for domain validation.

</summary>

cname: optional string

The CNAME record hostname for DCV delegation.

<a href="#">Link to this property</a>

cname\_target: optional string

The CNAME record target value for DCV delegation.

<a href="#">Link to this property</a>

emails: optional array of string

The set of email addresses that the certificate authority (CA) will use to complete domain validation.

<a href="#">Link to this property</a>

http\_body: optional string

The content that the certificate authority (CA) will expect to find at the http\_url during the domain validation.

<a href="#">Link to this property</a>

http\_url: optional string

The url that will be checked during domain validation.

<a href="#">Link to this property</a>

status: optional string

Status of the validation record.

<a href="#">Link to this property</a>

txt\_name: optional string

The hostname that the certificate authority (CA) will check for a TXT record during domain validation .

<a href="#">Link to this property</a>

txt\_value: optional string

The TXT record that the certificate authority (CA) will check during domain validation.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

expires\_on: optional string

The time the custom certificate expires on.

formatdate-time

<a href="#">Link to this property</a>

hosts: optional array of string

A list of Hostnames on a custom uploaded certificate.

<a href="#">Link to this property</a>

issuer: optional string

The issuer on a custom uploaded certificate.

<a href="#">Link to this property</a>

<details>

<summary>

method: optional <a href="https://developers.cloudflare.com/api/resources/custom_hostnames#(resource)%20custom_hostnames%20%3E%20(model)%20dcv_method%20%3E%20(schema)">DCVMethod</a>

Domain control validation (DCV) method used for this hostname.

</summary>

One of the following:

"http"

<a href="#">Link to this property</a>

"txt"

<a href="#">Link to this property</a>

"email"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

serial\_number: optional string

The serial number on a custom uploaded certificate.

<a href="#">Link to this property</a>

<details>

<summary>

settings: optional object {ciphers, early\_hints, http2, 2 more }

</summary>

ciphers: optional array of string

An allowlist of ciphers for TLS termination. These ciphers must be in the BoringSSL format.

<a href="#">Link to this property</a>

<details>

<summary>

early\_hints: optional "on"or "off"

Whether or not Early Hints is enabled.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

http2: optional "on"or "off"

Whether or not HTTP2 is enabled.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

min\_tls\_version: optional "1.0"or "1.1"or "1.2"or "1.3"

The minimum TLS version supported.

</summary>

One of the following:

"1.0"

<a href="#">Link to this property</a>

"1.1"

<a href="#">Link to this property</a>

"1.2"

<a href="#">Link to this property</a>

"1.3"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

tls\_1\_3: optional "on"or "off"

Whether or not TLS 1.3 is enabled.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

signature: optional string

The signature on a custom uploaded certificate.

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "initializing"or "pending\_validation"or "deleted"or 18 more

Status of the hostname’s SSL certificates.

</summary>

One of the following:

"initializing"

<a href="#">Link to this property</a>

"pending\_validation"

<a href="#">Link to this property</a>

"deleted"

<a href="#">Link to this property</a>

"pending\_issuance"

<a href="#">Link to this property</a>

"pending\_deployment"

<a href="#">Link to this property</a>

"pending\_deletion"

<a href="#">Link to this property</a>

"pending\_expiration"

<a href="#">Link to this property</a>

"expired"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"initializing\_timed\_out"

<a href="#">Link to this property</a>

"validation\_timed\_out"

<a href="#">Link to this property</a>

"issuance\_timed\_out"

<a href="#">Link to this property</a>

"deployment\_timed\_out"

<a href="#">Link to this property</a>

"deletion\_timed\_out"

<a href="#">Link to this property</a>

"pending\_cleanup"

<a href="#">Link to this property</a>

"staging\_deployment"

<a href="#">Link to this property</a>

"staging\_active"

<a href="#">Link to this property</a>

"deactivating"

<a href="#">Link to this property</a>

"inactive"

<a href="#">Link to this property</a>

"backup\_issued"

<a href="#">Link to this property</a>

"holding\_deployment"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: optional <a href="https://developers.cloudflare.com/api/resources/custom_hostnames#(resource)%20custom_hostnames%20%3E%20(model)%20domain_validation_type%20%3E%20(schema)">DomainValidationType</a>

Level of validation to be used for this hostname. Domain validation (dv) must be used.

<a href="#">Link to this property</a>

uploaded\_on: optional string

The time the custom certificate was uploaded.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

validation\_errors: optional array of object {message }

Domain validation errors that have been received by the certificate authority (CA).

</summary>

message: optional string

A domain validation error.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

validation\_records: optional array of object {cname, cname\_target, emails, 5 more }

</summary>

cname: optional string

The CNAME record hostname for DCV delegation.

<a href="#">Link to this property</a>

cname\_target: optional string

The CNAME record target value for DCV delegation.

<a href="#">Link to this property</a>

emails: optional array of string

The set of email addresses that the certificate authority (CA) will use to complete domain validation.

<a href="#">Link to this property</a>

http\_body: optional string

The content that the certificate authority (CA) will expect to find at the http\_url during the domain validation.

<a href="#">Link to this property</a>

http\_url: optional string

The url that will be checked during domain validation.

<a href="#">Link to this property</a>

status: optional string

Status of the validation record.

<a href="#">Link to this property</a>

txt\_name: optional string

The hostname that the certificate authority (CA) will check for a TXT record during domain validation .

<a href="#">Link to this property</a>

txt\_value: optional string

The TXT record that the certificate authority (CA) will check during domain validation.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

wildcard: optional boolean

Indicates whether the certificate covers a wildcard.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "active"or "pending"or "active\_redeploying"or 13 more

Status of the hostname’s activation.

</summary>

One of the following:

"active"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"active\_redeploying"

<a href="#">Link to this property</a>

"moved"

<a href="#">Link to this property</a>

"pending\_deletion"

<a href="#">Link to this property</a>

"deleted"

<a href="#">Link to this property</a>

"pending\_blocked"

<a href="#">Link to this property</a>

"pending\_migration"

<a href="#">Link to this property</a>

"pending\_provisioned"

<a href="#">Link to this property</a>

"test\_pending"

<a href="#">Link to this property</a>

"test\_active"

<a href="#">Link to this property</a>

"test\_active\_apex"

<a href="#">Link to this property</a>

"test\_blocked"

<a href="#">Link to this property</a>

"test\_failed"

<a href="#">Link to this property</a>

"provisioned"

<a href="#">Link to this property</a>

"blocked"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

verification\_errors: optional array of string

These are errors that were encountered while trying to activate a hostname.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20custom_hostnames%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

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

[Link to this property](#)%20custom_hostnames%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### List Custom Hostnames

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/custom_hostnames \
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
    "string"
  ],
  "success": true,
  "result": [
    {
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "hostname": "app.example.com",
      "created_at": "2020-02-06T18:11:23.531995Z",
      "custom_metadata": {
        "foo": "string"
      },
      "custom_origin_server": "origin2.example.com",
      "custom_origin_sni": "sni.example.com",
      "ownership_verification": {
        "name": "_cf-custom-hostname.app.example.com",
        "type": "txt",
        "value": "5cc07c04-ea62-4a5a-95f0-419334a875a4"
      },
      "ownership_verification_http": {
        "http_body": "5cc07c04-ea62-4a5a-95f0-419334a875a4",
        "http_url": "http://custom.test.com/.well-known/cf-custom-hostname-challenge/0d89c70d-ad9f-4843-b99f-6cc0252067e9"
      },
      "ssl": {
        "id": "0d89c70d-ad9f-4843-b99f-6cc0252067e9",
        "bundle_method": "ubiquitous",
        "certificate_authority": "google",
        "custom_certificate": "-----BEGIN CERTIFICATE-----\nMIIFJDCCBAygAwIBAgIQD0ifmj/Yi5NP/2gdUySbfzANBgkqhkiG9w0BAQsFADBN\nMQswCQYDVQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMScwJQYDVQQDEx5E...SzSHfXp5lnu/3V08I72q1QNzOCgY1XeL4GKVcj4or6cT6tX6oJH7ePPmfrBfqI/O\nOeH8gMJ+FuwtXYEPa4hBf38M5eU5xWG7\n-----END CERTIFICATE-----\n",
        "custom_csr_id": "7b163417-1d2b-4c84-a38a-2fb7a0cd7752",
        "custom_key": "-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCAQEAwQHoetcl9+5ikGzV6cMzWtWPJHqXT3wpbEkRU9Yz7lgvddmG\ndtcGbg/1CGZu0jJGkMoppoUo4c3dts3iwqRYmBikUP77wwY2QGmDZw2FvkJCJlKn\nabIRuGvBKwzESIXgKk2016aTP6/dAjEHyo6SeoK8lkIySUvK0fyOVlsiEsCmOpid\ntnKX/a+50GjB79CJH4ER2lLVZnhePFR/zUOyPxZQQ4naHf7yu/b5jhO0f8fwt+py\nFxIXjbEIdZliWRkRMtzrHOJIhrmJ2A1J7iOrirbbwillwjjNVUWPf3IJ3M12S9pE\newooaeO2izNTERcG9HzAacbVRn2Y2SWIyT/18QIDAQABAoIBACbhTYXBZYKmYPCb\nHBR1IBlCQA2nLGf0qRuJNJZg5iEzXows/6tc8YymZkQE7nolapWsQ+upk2y5Xdp/\naxiuprIs9JzkYK8Ox0r+dlwCG1kSW+UAbX0bQ/qUqlsTvU6muVuMP8vZYHxJ3wmb\n+ufRBKztPTQ/rYWaYQcgC0RWI20HTFBMxlTAyNxYNWzX7RKFkGVVyB9RsAtmcc8g\n+j4OdosbfNoJPS0HeIfNpAznDfHKdxDk2Yc1tV6RHBrC1ynyLE9+TaflIAdo2MVv\nKLMLq51GqYKtgJFIlBRPQqKoyXdz3fGvXrTkf/WY9QNq0J1Vk5ERePZ54mN8iZB7\n9lwy/AkCgYEA6FXzosxswaJ2wQLeoYc7ceaweX/SwTvxHgXzRyJIIT0eJWgx13Wo\n/WA3Iziimsjf6qE+SI/8laxPp2A86VMaIt3Z3mJN/CqSVGw8LK2AQst+OwdPyDMu\niacE8lj/IFGC8mwNUAb9CzGU3JpU4PxxGFjS/eMtGeRXCWkK4NE+G08CgYEA1Kp9\nN2JrVlqUz+gAX+LPmE9OEMAS9WQSQsfCHGogIFDGGcNf7+uwBM7GAaSJIP01zcoe\nVAgWdzXCv3FLhsaZoJ6RyLOLay5phbu1iaTr4UNYm5WtYTzMzqh8l1+MFFDl9xDB\nvULuCIIrglM5MeS/qnSg1uMoH2oVPj9TVst/ir8CgYEAxrI7Ws9Zc4Bt70N1As+U\nlySjaEVZCMkqvHJ6TCuVZFfQoE0r0whdLdRLU2PsLFP+q7qaeZQqgBaNSKeVcDYR\n9B+nY/jOmQoPewPVsp/vQTCnE/R81spu0mp0YI6cIheT1Z9zAy322svcc43JaWB7\nmEbeqyLOP4Z4qSOcmghZBSECgYACvR9Xs0DGn+wCsW4vze/2ei77MD4OQvepPIFX\ndFZtlBy5ADcgE9z0cuVB6CiL8DbdK5kwY9pGNr8HUCI03iHkW6Zs+0L0YmihfEVe\nPG19PSzK9CaDdhD9KFZSbLyVFmWfxOt50H7YRTTiPMgjyFpfi5j2q348yVT0tEQS\nfhRqaQKBgAcWPokmJ7EbYQGeMbS7HC8eWO/RyamlnSffdCdSc7ue3zdVJxpAkQ8W\nqu80pEIF6raIQfAf8MXiiZ7auFOSnHQTXUbhCpvDLKi0Mwq3G8Pl07l+2s6dQG6T\nlv6XTQaMyf6n1yjzL+fzDrH3qXMxHMO/b13EePXpDMpY7HQpoLDi\n-----END RSA PRIVATE KEY-----\n",
        "dcv_delegation_records": [
          {
            "cname": "_acme-challenge.example.com",
            "cname_target": "dcv.cloudflare.com",
            "emails": [
              "administrator@example.com",
              "webmaster@example.com"
            ],
            "http_body": "ca3-574923932a82475cb8592200f1a2a23d",
            "http_url": "http://app.example.com/.well-known/pki-validation/ca3-da12a1c25e7b48cf80408c6c1763b8a2.txt",
            "status": "pending",
            "txt_name": "_acme-challenge.app.example.com",
            "txt_value": "810b7d5f01154524b961ba0cd578acc2"
          }
        ],
        "expires_on": "2021-02-06T18:11:23.531995Z",
        "hosts": [
          "app.example.com",
          "*.app.example.com"
        ],
        "issuer": "DigiCertInc",
        "method": "http",
        "serial_number": "6743787633689793699141714808227354901",
        "settings": {
          "ciphers": [
            "ECDHE-RSA-AES128-GCM-SHA256",
            "AES128-SHA"
          ],
          "early_hints": "on",
          "http2": "on",
          "min_tls_version": "1.2",
          "tls_1_3": "on"
        },
        "signature": "SHA256WithRSA",
        "status": "pending_validation",
        "type": "dv",
        "uploaded_on": "2020-02-06T18:11:23.531995Z",
        "validation_errors": [
          {
            "message": "SERVFAIL looking up CAA for app.example.com"
          }
        ],
        "validation_records": [
          {
            "cname": "_acme-challenge.example.com",
            "cname_target": "dcv.cloudflare.com",
            "emails": [
              "administrator@example.com",
              "webmaster@example.com"
            ],
            "http_body": "ca3-574923932a82475cb8592200f1a2a23d",
            "http_url": "http://app.example.com/.well-known/pki-validation/ca3-da12a1c25e7b48cf80408c6c1763b8a2.txt",
            "status": "pending",
            "txt_name": "_acme-challenge.app.example.com",
            "txt_value": "810b7d5f01154524b961ba0cd578acc2"
          }
        ],
        "wildcard": false
      },
      "status": "pending",
      "verification_errors": [
        "None of the A or AAAA records are owned by this account and the pre-generated ownership verification token was not found."
      ]
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
    "string"
  ],
  "success": true,
  "result": [
    {
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "hostname": "app.example.com",
      "created_at": "2020-02-06T18:11:23.531995Z",
      "custom_metadata": {
        "foo": "string"
      },
      "custom_origin_server": "origin2.example.com",
      "custom_origin_sni": "sni.example.com",
      "ownership_verification": {
        "name": "_cf-custom-hostname.app.example.com",
        "type": "txt",
        "value": "5cc07c04-ea62-4a5a-95f0-419334a875a4"
      },
      "ownership_verification_http": {
        "http_body": "5cc07c04-ea62-4a5a-95f0-419334a875a4",
        "http_url": "http://custom.test.com/.well-known/cf-custom-hostname-challenge/0d89c70d-ad9f-4843-b99f-6cc0252067e9"
      },
      "ssl": {
        "id": "0d89c70d-ad9f-4843-b99f-6cc0252067e9",
        "bundle_method": "ubiquitous",
        "certificate_authority": "google",
        "custom_certificate": "-----BEGIN CERTIFICATE-----\nMIIFJDCCBAygAwIBAgIQD0ifmj/Yi5NP/2gdUySbfzANBgkqhkiG9w0BAQsFADBN\nMQswCQYDVQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMScwJQYDVQQDEx5E...SzSHfXp5lnu/3V08I72q1QNzOCgY1XeL4GKVcj4or6cT6tX6oJH7ePPmfrBfqI/O\nOeH8gMJ+FuwtXYEPa4hBf38M5eU5xWG7\n-----END CERTIFICATE-----\n",
        "custom_csr_id": "7b163417-1d2b-4c84-a38a-2fb7a0cd7752",
        "custom_key": "-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCAQEAwQHoetcl9+5ikGzV6cMzWtWPJHqXT3wpbEkRU9Yz7lgvddmG\ndtcGbg/1CGZu0jJGkMoppoUo4c3dts3iwqRYmBikUP77wwY2QGmDZw2FvkJCJlKn\nabIRuGvBKwzESIXgKk2016aTP6/dAjEHyo6SeoK8lkIySUvK0fyOVlsiEsCmOpid\ntnKX/a+50GjB79CJH4ER2lLVZnhePFR/zUOyPxZQQ4naHf7yu/b5jhO0f8fwt+py\nFxIXjbEIdZliWRkRMtzrHOJIhrmJ2A1J7iOrirbbwillwjjNVUWPf3IJ3M12S9pE\newooaeO2izNTERcG9HzAacbVRn2Y2SWIyT/18QIDAQABAoIBACbhTYXBZYKmYPCb\nHBR1IBlCQA2nLGf0qRuJNJZg5iEzXows/6tc8YymZkQE7nolapWsQ+upk2y5Xdp/\naxiuprIs9JzkYK8Ox0r+dlwCG1kSW+UAbX0bQ/qUqlsTvU6muVuMP8vZYHxJ3wmb\n+ufRBKztPTQ/rYWaYQcgC0RWI20HTFBMxlTAyNxYNWzX7RKFkGVVyB9RsAtmcc8g\n+j4OdosbfNoJPS0HeIfNpAznDfHKdxDk2Yc1tV6RHBrC1ynyLE9+TaflIAdo2MVv\nKLMLq51GqYKtgJFIlBRPQqKoyXdz3fGvXrTkf/WY9QNq0J1Vk5ERePZ54mN8iZB7\n9lwy/AkCgYEA6FXzosxswaJ2wQLeoYc7ceaweX/SwTvxHgXzRyJIIT0eJWgx13Wo\n/WA3Iziimsjf6qE+SI/8laxPp2A86VMaIt3Z3mJN/CqSVGw8LK2AQst+OwdPyDMu\niacE8lj/IFGC8mwNUAb9CzGU3JpU4PxxGFjS/eMtGeRXCWkK4NE+G08CgYEA1Kp9\nN2JrVlqUz+gAX+LPmE9OEMAS9WQSQsfCHGogIFDGGcNf7+uwBM7GAaSJIP01zcoe\nVAgWdzXCv3FLhsaZoJ6RyLOLay5phbu1iaTr4UNYm5WtYTzMzqh8l1+MFFDl9xDB\nvULuCIIrglM5MeS/qnSg1uMoH2oVPj9TVst/ir8CgYEAxrI7Ws9Zc4Bt70N1As+U\nlySjaEVZCMkqvHJ6TCuVZFfQoE0r0whdLdRLU2PsLFP+q7qaeZQqgBaNSKeVcDYR\n9B+nY/jOmQoPewPVsp/vQTCnE/R81spu0mp0YI6cIheT1Z9zAy322svcc43JaWB7\nmEbeqyLOP4Z4qSOcmghZBSECgYACvR9Xs0DGn+wCsW4vze/2ei77MD4OQvepPIFX\ndFZtlBy5ADcgE9z0cuVB6CiL8DbdK5kwY9pGNr8HUCI03iHkW6Zs+0L0YmihfEVe\nPG19PSzK9CaDdhD9KFZSbLyVFmWfxOt50H7YRTTiPMgjyFpfi5j2q348yVT0tEQS\nfhRqaQKBgAcWPokmJ7EbYQGeMbS7HC8eWO/RyamlnSffdCdSc7ue3zdVJxpAkQ8W\nqu80pEIF6raIQfAf8MXiiZ7auFOSnHQTXUbhCpvDLKi0Mwq3G8Pl07l+2s6dQG6T\nlv6XTQaMyf6n1yjzL+fzDrH3qXMxHMO/b13EePXpDMpY7HQpoLDi\n-----END RSA PRIVATE KEY-----\n",
        "dcv_delegation_records": [
          {
            "cname": "_acme-challenge.example.com",
            "cname_target": "dcv.cloudflare.com",
            "emails": [
              "administrator@example.com",
              "webmaster@example.com"
            ],
            "http_body": "ca3-574923932a82475cb8592200f1a2a23d",
            "http_url": "http://app.example.com/.well-known/pki-validation/ca3-da12a1c25e7b48cf80408c6c1763b8a2.txt",
            "status": "pending",
            "txt_name": "_acme-challenge.app.example.com",
            "txt_value": "810b7d5f01154524b961ba0cd578acc2"
          }
        ],
        "expires_on": "2021-02-06T18:11:23.531995Z",
        "hosts": [
          "app.example.com",
          "*.app.example.com"
        ],
        "issuer": "DigiCertInc",
        "method": "http",
        "serial_number": "6743787633689793699141714808227354901",
        "settings": {
          "ciphers": [
            "ECDHE-RSA-AES128-GCM-SHA256",
            "AES128-SHA"
          ],
          "early_hints": "on",
          "http2": "on",
          "min_tls_version": "1.2",
          "tls_1_3": "on"
        },
        "signature": "SHA256WithRSA",
        "status": "pending_validation",
        "type": "dv",
        "uploaded_on": "2020-02-06T18:11:23.531995Z",
        "validation_errors": [
          {
            "message": "SERVFAIL looking up CAA for app.example.com"
          }
        ],
        "validation_records": [
          {
            "cname": "_acme-challenge.example.com",
            "cname_target": "dcv.cloudflare.com",
            "emails": [
              "administrator@example.com",
              "webmaster@example.com"
            ],
            "http_body": "ca3-574923932a82475cb8592200f1a2a23d",
            "http_url": "http://app.example.com/.well-known/pki-validation/ca3-da12a1c25e7b48cf80408c6c1763b8a2.txt",
            "status": "pending",
            "txt_name": "_acme-challenge.app.example.com",
            "txt_value": "810b7d5f01154524b961ba0cd578acc2"
          }
        ],
        "wildcard": false
      },
      "status": "pending",
      "verification_errors": [
        "None of the A or AAAA records are owned by this account and the pre-generated ownership verification token was not found."
      ]
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