---
title: Upload Custom Origin Trust Store
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[ACM](https://developers.cloudflare.com/api/resources/acm)

[Custom Trust Store](https://developers.cloudflare.com/api/resources/acm/subresources/custom_trust_store)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Upload Custom Origin Trust Store

POST/zones/{zone\_id}/acm/custom\_trust\_store

Upload a root CA certificate to the Custom Origin Trust Store for a Zone. Only root CA certificates are accepted.

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

`SSL and Certificates Write`

##### P ath ParametersExpand Collapse

zone\_id: string

Identifier.

maxLength32

[Link to this property](#)%20acm.custom_trust_store%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

certificate: string

The root CA certificate in PEM format. Only root CA certificates are accepted; intermediate and leaf certificates are not supported.

[Link to this property](#)%20acm.custom_trust_store%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20certificate%20%3E%20(schema)>)

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

[Link to this property](#)%20acm.custom_trust_store%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20acm.custom_trust_store%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20acm.custom_trust_store%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional <a href="https://developers.cloudflare.com/api/resources/acm#(resource)%20acm.custom_trust_store%20%3E%20(model)%20custom-trust-store%20%3E%20(schema)">CustomTrustStore</a> { id, certificate, expires\_on, 5 more }

</summary>

id: string

Identifier.

maxLength32

<a href="#">Link to this property</a>

certificate: string

The root CA certificate in PEM format. Only root CA certificates are accepted; intermediate and leaf certificates are not supported.

<a href="#">Link to this property</a>

expires\_on: string

When the certificate expires.

formatdate-time

<a href="#">Link to this property</a>

issuer: string

The certificate authority that issued the certificate.

<a href="#">Link to this property</a>

signature: string

The type of hash used for the certificate.

<a href="#">Link to this property</a>

<details>

<summary>

status: "initializing"or "pending\_deployment"or "active"or 3 more

Status of the zone’s custom SSL.

</summary>

One of the following:

"initializing"

<a href="#">Link to this property</a>

"pending\_deployment"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"pending\_deletion"

<a href="#">Link to this property</a>

"deleted"

<a href="#">Link to this property</a>

"expired"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated\_at: string

When the certificate was last modified.

formatdate-time

<a href="#">Link to this property</a>

uploaded\_on: string

When the certificate was uploaded to Cloudflare.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20acm.custom_trust_store%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Upload Custom Origin Trust Store

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/acm/custom_trust_store \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "certificate": "-----BEGIN CERTIFICATE-----\\nMIIDdjCCAl6gAwIBAgIJAPnMg0Fs+/B0MA0GCSqGSIb3DQEBCwUAMFsx...\\n-----END CERTIFICATE-----\\n"
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
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "certificate": "-----BEGIN CERTIFICATE-----\nMIIDdjCCAl6gAwIBAgIJAPnMg0Fs+/B0MA0GCSqGSIb3DQEBCwUAMFsx...\n-----END CERTIFICATE-----\n",
    "expires_on": "2122-10-29T16:59:47Z",
    "issuer": "GlobalSign",
    "signature": "SHA256WithRSA",
    "status": "active",
    "updated_at": "2014-01-01T05:20:00Z",
    "uploaded_on": "2014-01-01T05:20:00Z"
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
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "certificate": "-----BEGIN CERTIFICATE-----\nMIIDdjCCAl6gAwIBAgIJAPnMg0Fs+/B0MA0GCSqGSIb3DQEBCwUAMFsx...\n-----END CERTIFICATE-----\n",
    "expires_on": "2122-10-29T16:59:47Z",
    "issuer": "GlobalSign",
    "signature": "SHA256WithRSA",
    "status": "active",
    "updated_at": "2014-01-01T05:20:00Z",
    "uploaded_on": "2014-01-01T05:20:00Z"
  }
}
```