---
title: Edit SSL Configuration
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Custom Certificates](https://developers.cloudflare.com/api/resources/custom_certificates)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Edit SSL Configuration

PATCH/zones/{zone\_id}/custom\_certificates/{custom\_certificate\_id}

Upload a new private key and/or PEM/CRT for the SSL certificate. Note: PATCHing a configuration for sni\_custom certificates will result in a new resource id being returned, and the previous one being deleted.

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

`Access: Mutual TLS Certificates Write``SSL and Certificates Write`

##### P ath ParametersExpand Collapse

zone\_id: string

Identifier.

maxLength32

[Link to this property](#)%20custom_certificates%20%3E%20(method)%20edit%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

custom\_certificate\_id: string

Identifier.

maxLength32

[Link to this property](#)%20custom_certificates%20%3E%20(method)%20edit%20%3E%20(params)%20default%20%3E%20(param)%20custom_certificate_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

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

[Link to this property](#)%20custom_certificates%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20bundle_method%20%3E%20(schema)>)

certificate: optional string

The zone’s SSL certificate or certificate and the intermediate(s).

[Link to this property](#)%20custom_certificates%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20certificate%20%3E%20(schema)>)

custom\_csr\_id: optional string

The identifier for the Custom CSR that was used.

[Link to this property](#)%20custom_certificates%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20custom_csr_id%20%3E%20(schema)>)

<details>

<summary>

deploy: optional "staging"or "production"

The environment to deploy the certificate to, defaults to production.

</summary>

One of the following:

"staging"

<a href="#">Link to this property</a>

"production"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20custom_certificates%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20deploy%20%3E%20(schema)>)

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

[Link to this property](#)%20custom_certificates%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20geo_restrictions%20%3E%20(schema)>)

policy: optional string

Specify the policy that determines the region where your private key will be held locally. HTTPS connections to any excluded data center will still be fully encrypted, but will incur some latency while Keyless SSL is used to complete the handshake with the nearest allowed data center. Any combination of countries, specified by their two letter country code ([https://en.wikipedia.org/wiki/ISO\_3166-1\_alpha-2#Officially\_assigned\_code\_elements](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements)) can be chosen, such as ‘country: IN’, as well as ‘region: EU’ which refers to the EU region. If there are too few data centers satisfying the policy, it will be rejected. Note: The API accepts this field as either “policy” or “policy\_restrictions” in requests. Responses return this field as “policy\_restrictions”.

[Link to this property](#)%20custom_certificates%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20policy%20%3E%20(schema)>)

private\_key: optional string

The zone’s private key. Not required if custom\_csr\_id is provided, in which case the private key is retrieved from the CSR record held by Cloudflare.

[Link to this property](#)%20custom_certificates%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20private_key%20%3E%20(schema)>)

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

[Link to this property](#)%20custom_certificates%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20custom_certificates%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20custom_certificates%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

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

[Link to this property](#)%20custom_certificates%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Edit SSL Configuration

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/custom_certificates/$CUSTOM_CERTIFICATE_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "bundle_method": "ubiquitous",
          "certificate": "-----BEGIN CERTIFICATE-----\\nMIIDtTCCAp2gAwIBAgIJAMHAwfXZ5/PWMA0GCSqGSIb3DQEBCwUAMEUxCzAJBgNV\\nBAYTAkFVMRMwEQYDVQQIEwpTb21lLVN0YXRlMSEwHwYDVQQKExhJbnRlcm5ldCBX\\naWRnaXRzIFB0eSBMdGQwHhcNMTYwODI0MTY0MzAxWhcNMTYxMTIyMTY0MzAxWjBF\\nMQswCQYDVQQGEwJBVTETMBEGA1UECBMKU29tZS1TdGF0ZTEhMB8GA1UEChMYSW50\\nZXJuZXQgV2lkZ2l0cyBQdHkgTHRkMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIB\\nCgKCAQEAwQHoetcl9+5ikGzV6cMzWtWPJHqXT3wpbEkRU9Yz7lgvddmGdtcGbg/1\\nCGZu0jJGkMoppoUo4c3dts3iwqRYmBikUP77wwY2QGmDZw2FvkJCJlKnabIRuGvB\\nKwzESIXgKk2016aTP6/dAjEHyo6SeoK8lkIySUvK0fyOVlsiEsCmOpidtnKX/a+5\\n0GjB79CJH4ER2lLVZnhePFR/zUOyPxZQQ4naHf7yu/b5jhO0f8fwt+pyFxIXjbEI\\ndZliWRkRMtzrHOJIhrmJ2A1J7iOrirbbwillwjjNVUWPf3IJ3M12S9pEewooaeO2\\nizNTERcG9HzAacbVRn2Y2SWIyT/18QIDAQABo4GnMIGkMB0GA1UdDgQWBBT/LbE4\\n9rWf288N6sJA5BRb6FJIGDB1BgNVHSMEbjBsgBT/LbE49rWf288N6sJA5BRb6FJI\\nGKFJpEcwRTELMAkGA1UEBhMCQVUxEzARBgNVBAgTClNvbWUtU3RhdGUxITAfBgNV\\nBAoTGEludGVybmV0IFdpZGdpdHMgUHR5IEx0ZIIJAMHAwfXZ5/PWMAwGA1UdEwQF\\nMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAHHFwl0tH0quUYZYO0dZYt4R7SJ0pCm2\\n2satiyzHl4OnXcHDpekAo7/a09c6Lz6AU83cKy/+x3/djYHXWba7HpEu0dR3ugQP\\nMlr4zrhd9xKZ0KZKiYmtJH+ak4OM4L3FbT0owUZPyjLSlhMtJVcoRp5CJsjAMBUG\\nSvD8RX+T01wzox/Qb+lnnNnOlaWpqu8eoOenybxKp1a9ULzIVvN/LAcc+14vioFq\\n2swRWtmocBAs8QR9n4uvbpiYvS8eYueDCWMM4fvFfBhaDZ3N9IbtySh3SpFdQDhw\\nYbjM2rxXiyLGxB4Bol7QTv4zHif7Zt89FReT/NBy4rzaskDJY5L6xmY=\\n-----END CERTIFICATE-----\\n",
          "custom_csr_id": "7b163417-1d2b-4c84-a38a-2fb7a0cd7752",
          "deploy": "staging",
          "policy": "(country: US) or (region: EU)",
          "private_key": "-----BEGIN RSA PRIVATE KEY-----\\nMIIEowIBAAKCAQEAwQHoetcl9+5ikGzV6cMzWtWPJHqXT3wpbEkRU9Yz7lgvddmG\\ndtcGbg/1CGZu0jJGkMoppoUo4c3dts3iwqRYmBikUP77wwY2QGmDZw2FvkJCJlKn\\nabIRuGvBKwzESIXgKk2016aTP6/dAjEHyo6SeoK8lkIySUvK0fyOVlsiEsCmOpid\\ntnKX/a+50GjB79CJH4ER2lLVZnhePFR/zUOyPxZQQ4naHf7yu/b5jhO0f8fwt+py\\nFxIXjbEIdZliWRkRMtzrHOJIhrmJ2A1J7iOrirbbwillwjjNVUWPf3IJ3M12S9pE\\newooaeO2izNTERcG9HzAacbVRn2Y2SWIyT/18QIDAQABAoIBACbhTYXBZYKmYPCb\\nHBR1IBlCQA2nLGf0qRuJNJZg5iEzXows/6tc8YymZkQE7nolapWsQ+upk2y5Xdp/\\naxiuprIs9JzkYK8Ox0r+dlwCG1kSW+UAbX0bQ/qUqlsTvU6muVuMP8vZYHxJ3wmb\\n+ufRBKztPTQ/rYWaYQcgC0RWI20HTFBMxlTAyNxYNWzX7RKFkGVVyB9RsAtmcc8g\\n+j4OdosbfNoJPS0HeIfNpAznDfHKdxDk2Yc1tV6RHBrC1ynyLE9+TaflIAdo2MVv\\nKLMLq51GqYKtgJFIlBRPQqKoyXdz3fGvXrTkf/WY9QNq0J1Vk5ERePZ54mN8iZB7\\n9lwy/AkCgYEA6FXzosxswaJ2wQLeoYc7ceaweX/SwTvxHgXzRyJIIT0eJWgx13Wo\\n/WA3Iziimsjf6qE+SI/8laxPp2A86VMaIt3Z3mJN/CqSVGw8LK2AQst+OwdPyDMu\\niacE8lj/IFGC8mwNUAb9CzGU3JpU4PxxGFjS/eMtGeRXCWkK4NE+G08CgYEA1Kp9\\nN2JrVlqUz+gAX+LPmE9OEMAS9WQSQsfCHGogIFDGGcNf7+uwBM7GAaSJIP01zcoe\\nVAgWdzXCv3FLhsaZoJ6RyLOLay5phbu1iaTr4UNYm5WtYTzMzqh8l1+MFFDl9xDB\\nvULuCIIrglM5MeS/qnSg1uMoH2oVPj9TVst/ir8CgYEAxrI7Ws9Zc4Bt70N1As+U\\nlySjaEVZCMkqvHJ6TCuVZFfQoE0r0whdLdRLU2PsLFP+q7qaeZQqgBaNSKeVcDYR\\n9B+nY/jOmQoPewPVsp/vQTCnE/R81spu0mp0YI6cIheT1Z9zAy322svcc43JaWB7\\nmEbeqyLOP4Z4qSOcmghZBSECgYACvR9Xs0DGn+wCsW4vze/2ei77MD4OQvepPIFX\\ndFZtlBy5ADcgE9z0cuVB6CiL8DbdK5kwY9pGNr8HUCI03iHkW6Zs+0L0YmihfEVe\\nPG19PSzK9CaDdhD9KFZSbLyVFmWfxOt50H7YRTTiPMgjyFpfi5j2q348yVT0tEQS\\nfhRqaQKBgAcWPokmJ7EbYQGeMbS7HC8eWO/RyamlnSffdCdSc7ue3zdVJxpAkQ8W\\nqu80pEIF6raIQfAf8MXiiZ7auFOSnHQTXUbhCpvDLKi0Mwq3G8Pl07l+2s6dQG6T\\nlv6XTQaMyf6n1yjzL+fzDrH3qXMxHMO/b13EePXpDMpY7HQpoLDi\\n-----END RSA PRIVATE KEY-----\\n"
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