---
title: SSL Configuration Details
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Custom Certificates](https://developers.cloudflare.com/api/resources/custom_certificates)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# SSL Configuration Details

GET/zones/{zone\_id}/custom\_certificates/{custom\_certificate\_id}

Retrieves details for a specific custom SSL certificate, including certificate metadata, bundle method, geographic restrictions, and associated keyless server configuration.

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

`Access: Mutual TLS Certificates Write``Access: Mutual TLS Certificates Read``SSL and Certificates Write``SSL and Certificates Read`

##### P ath ParametersExpand Collapse

zone\_id: string

Identifier.

maxLength32

[Link to this property](#)%20custom_certificates%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

custom\_certificate\_id: string

Identifier.

maxLength32

[Link to this property](#)%20custom_certificates%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20custom_certificate_id%20%3E%20(schema)>)

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

[Link to this property](#)%20custom_certificates%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20custom_certificates%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20custom_certificates%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional <a href="https://developers.cloudflare.com/api/resources/custom_certificates#(resource)%20custom_certificates%20%3E%20(model)%20custom_certificate%20%3E%20(schema)">CustomCertificate</a> { id, zone\_id, bundle\_method, 12 more }

</summary>

id: string

Identifier.

maxLength32

<a href="#">Link to this property</a>

zone\_id: string

Identifier.

maxLength32

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

custom\_csr\_id: optional string

The identifier for the Custom CSR that was used.

<a href="#">Link to this property</a>

expires\_on: optional string

When the certificate from the authority expires.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

geo\_restrictions: optional <a href="https://developers.cloudflare.com/api/resources/custom_certificates#(resource)%20custom_certificates%20%3E%20(model)%20geo_restrictions%20%3E%20(schema)">GeoRestrictions</a> { label }

Specify the region where your private key can be held locally for optimal TLS performance. HTTPS connections to any excluded data center will still be fully encrypted, but will incur some latency while Keyless SSL is used to complete the handshake with the nearest allowed data center. Options allow distribution to only to U.S. data centers, only to E.U. data centers, or only to highest security data centers. Default distribution is to all Cloudflare datacenters, for optimal performance.

</summary>

<details>

<summary>

label: optional "us"or "eu"or "highest\_security"

</summary>

One of the following:

"us"

<a href="#">Link to this property</a>

"eu"

<a href="#">Link to this property</a>

"highest\_security"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

hosts: optional array of string

<a href="#">Link to this property</a>

issuer: optional string

The certificate authority that issued the certificate.

<a href="#">Link to this property</a>

<details>

<summary>

keyless\_server: optional <a href="https://developers.cloudflare.com/api/resources/keyless_certificates#(resource)%20keyless_certificates%20%3E%20(model)%20keyless_certificate%20%3E%20(schema)">KeylessCertificate</a> { id, created\_on, enabled, 7 more }

</summary>

id: string

Keyless certificate identifier tag.

maxLength32

<a href="#">Link to this property</a>

created\_on: string

When the Keyless SSL was created.

formatdate-time

<a href="#">Link to this property</a>

enabled: boolean

Whether or not the Keyless SSL is on or off.

<a href="#">Link to this property</a>

host: string

The keyless SSL name.

formathostname

maxLength253

<a href="#">Link to this property</a>

modified\_on: string

When the Keyless SSL was last modified.

formatdate-time

<a href="#">Link to this property</a>

name: string

The keyless SSL name.

maxLength180

<a href="#">Link to this property</a>

permissions: array of string

Available permissions for the Keyless SSL for the current user requesting the item.

<a href="#">Link to this property</a>

port: number

The keyless SSL port used to communicate between Cloudflare and the client’s Keyless SSL server.

maxLength65535

<a href="#">Link to this property</a>

<details>

<summary>

status: "active"or "deleted"

Status of the Keyless SSL.

</summary>

One of the following:

"active"

<a href="#">Link to this property</a>

"deleted"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

tunnel: optional <a href="https://developers.cloudflare.com/api/resources/keyless_certificates#(resource)%20keyless_certificates%20%3E%20(model)%20tunnel%20%3E%20(schema)">Tunnel</a> { private\_ip, vnet\_id }

Configuration for using Keyless SSL through a Cloudflare Tunnel.

</summary>

private\_ip: string

Private IP of the Key Server Host.

<a href="#">Link to this property</a>

vnet\_id: string

Cloudflare Tunnel Virtual Network ID.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

When the certificate was last modified.

formatdate-time

<a href="#">Link to this property</a>

policy\_restrictions: optional string

The policy restrictions returned by the API. This field is returned in responses when a policy has been set. The API accepts the “policy” field in requests but returns this field as “policy\_restrictions” in responses.

Specifies the region(s) where your private key can be held locally for optimal TLS performance. Format is a boolean expression, for example: “(country: US) or (region: EU)”

<a href="#">Link to this property</a>

priority: optional number

The order/priority in which the certificate will be used in a request. The higher priority will break ties across overlapping ‘legacy\_custom’ certificates, but ‘legacy\_custom’ certificates will always supercede ‘sni\_custom’ certificates.

<a href="#">Link to this property</a>

signature: optional string

The type of hash used for the certificate.

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "active"or "expired"or "deleted"or 2 more

Status of the zone’s custom SSL.

</summary>

One of the following:

"active"

<a href="#">Link to this property</a>

"expired"

<a href="#">Link to this property</a>

"deleted"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"initializing"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

uploaded\_on: optional string

When the certificate was uploaded to Cloudflare.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20custom_certificates%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### SSL Configuration Details

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/custom_certificates/$CUSTOM_CERTIFICATE_ID \
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
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "zone_id": "023e105f4ecef8ad9ca31a8372d0c353",
    "bundle_method": "ubiquitous",
    "custom_csr_id": "7b163417-1d2b-4c84-a38a-2fb7a0cd7752",
    "expires_on": "2016-01-01T05:20:00Z",
    "geo_restrictions": {
      "label": "us"
    },
    "hosts": [
      "example.com"
    ],
    "issuer": "GlobalSign",
    "keyless_server": {
      "id": "4d2844d2ce78891c34d0b6c0535a291e",
      "created_on": "2014-01-01T05:20:00Z",
      "enabled": false,
      "host": "example.com",
      "modified_on": "2014-01-01T05:20:00Z",
      "name": "example.com Keyless SSL",
      "permissions": [
        "#ssl:read",
        "#ssl:edit"
      ],
      "port": 24008,
      "status": "active",
      "tunnel": {
        "private_ip": "10.0.0.1",
        "vnet_id": "7365377a-85a4-4390-9480-531ef7dc7a3c"
      }
    },
    "modified_on": "2014-01-01T05:20:00Z",
    "policy_restrictions": "(country: US) or (region: EU)",
    "priority": 1,
    "signature": "SHA256WithRSA",
    "status": "active",
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
    "zone_id": "023e105f4ecef8ad9ca31a8372d0c353",
    "bundle_method": "ubiquitous",
    "custom_csr_id": "7b163417-1d2b-4c84-a38a-2fb7a0cd7752",
    "expires_on": "2016-01-01T05:20:00Z",
    "geo_restrictions": {
      "label": "us"
    },
    "hosts": [
      "example.com"
    ],
    "issuer": "GlobalSign",
    "keyless_server": {
      "id": "4d2844d2ce78891c34d0b6c0535a291e",
      "created_on": "2014-01-01T05:20:00Z",
      "enabled": false,
      "host": "example.com",
      "modified_on": "2014-01-01T05:20:00Z",
      "name": "example.com Keyless SSL",
      "permissions": [
        "#ssl:read",
        "#ssl:edit"
      ],
      "port": 24008,
      "status": "active",
      "tunnel": {
        "private_ip": "10.0.0.1",
        "vnet_id": "7365377a-85a4-4390-9480-531ef7dc7a3c"
      }
    },
    "modified_on": "2014-01-01T05:20:00Z",
    "policy_restrictions": "(country: US) or (region: EU)",
    "priority": 1,
    "signature": "SHA256WithRSA",
    "status": "active",
    "uploaded_on": "2014-01-01T05:20:00Z"
  }
}
```