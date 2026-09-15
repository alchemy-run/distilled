---
title: List DNSSEC ZSKs
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[DNS](https://developers.cloudflare.com/api/resources/dns)

[DNSSEC](https://developers.cloudflare.com/api/resources/dns/subresources/dnssec)

[Zsk](https://developers.cloudflare.com/api/resources/dns/subresources/dnssec/subresources/zsk)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List DNSSEC ZSKs

GET/zones/{zone\_id}/dnssec/zsk

List the Zone Signing Keys (ZSKs) that DNSSEC uses for the zone.

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

`DNS Read``DNS Write`

##### P ath ParametersExpand Collapse

zone\_id: string

Identifier.

maxLength32

[Link to this property](#)%20dns.dnssec.zsk%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

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

[Link to this property](#)%20dns.dnssec.zsk%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20dns.dnssec.zsk%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20dns.dnssec.zsk%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional array of object {DNSKEY, Location, Name, 2 more }

</summary>

<details>

<summary>

DNSKEY: optional object {Algorithm, Flags, Hdr, 2 more }

</summary>

Algorithm: optional number

<a href="#">Link to this property</a>

Flags: optional number

<a href="#">Link to this property</a>

<details>

<summary>

Hdr: optional object {Class, Name, Rdlength, 2 more }

</summary>

Class: optional number

<a href="#">Link to this property</a>

Name: optional string

<a href="#">Link to this property</a>

Rdlength: optional number

<a href="#">Link to this property</a>

Rrtype: optional number

<a href="#">Link to this property</a>

Ttl: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

Protocol: optional number

<a href="#">Link to this property</a>

PublicKey: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Location: optional "database"or "vault"

Storage backend where the DNSSEC key material is stored.

</summary>

One of the following:

"database"

<a href="#">Link to this property</a>

"vault"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

Name: optional string

Internal key name for the ZSK.

<a href="#">Link to this property</a>

<details>

<summary>

SigningKey: optional object {kek, privkey, pubkey }

</summary>

kek: optional string

Key encryption key name used to encrypt the private key.

<a href="#">Link to this property</a>

privkey: optional string

Encrypted private key material for the signing key.

formatbyte

<a href="#">Link to this property</a>

pubkey: optional string

Public key content associated with the signing key.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Tag: optional "active"or "publish"or "external"or 3 more

Lifecycle state tag attached to the DNSSEC key.

</summary>

One of the following:

"active"

<a href="#">Link to this property</a>

"publish"

<a href="#">Link to this property</a>

"external"

<a href="#">Link to this property</a>

"retired"

<a href="#">Link to this property</a>

"revoked"

<a href="#">Link to this property</a>

"removed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dns.dnssec.zsk%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### List DNSSEC ZSKs

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dnssec/zsk \
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
      "DNSKEY": {
        "Algorithm": 13,
        "Flags": 256,
        "Hdr": {
          "Class": 1,
          "Name": "example.com.",
          "Rdlength": 0,
          "Rrtype": 48,
          "Ttl": 3600
        },
        "Protocol": 3,
        "PublicKey": "oXiGYrSTO+LSCJ3mohc8EP+CzF9KxBj8/ydXJ22pKuZP3VAC3/Md/k7xZfz470CoRyZJ6gV6vml07IC3d8xqhA=="
      },
      "Location": "database",
      "Name": "zsk_default",
      "SigningKey": {
        "kek": "edge_kek_default",
        "privkey": "U3ZlbidzIHZlcnkgc2VjcmV0IGtleQ==",
        "pubkey": "256 3 13 oXiGYrSTO+LSCJ3mohc8EP+CzF9KxBj8/ydXJ22pKuZP3VAC3/Md/k7xZfz470CoRyZJ6gV6vml07IC3d8xqhA=="
      },
      "Tag": "active"
    }
  ]
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
      "DNSKEY": {
        "Algorithm": 13,
        "Flags": 256,
        "Hdr": {
          "Class": 1,
          "Name": "example.com.",
          "Rdlength": 0,
          "Rrtype": 48,
          "Ttl": 3600
        },
        "Protocol": 3,
        "PublicKey": "oXiGYrSTO+LSCJ3mohc8EP+CzF9KxBj8/ydXJ22pKuZP3VAC3/Md/k7xZfz470CoRyZJ6gV6vml07IC3d8xqhA=="
      },
      "Location": "database",
      "Name": "zsk_default",
      "SigningKey": {
        "kek": "edge_kek_default",
        "privkey": "U3ZlbidzIHZlcnkgc2VjcmV0IGtleQ==",
        "pubkey": "256 3 13 oXiGYrSTO+LSCJ3mohc8EP+CzF9KxBj8/ydXJ22pKuZP3VAC3/Md/k7xZfz470CoRyZJ6gV6vml07IC3d8xqhA=="
      },
      "Tag": "active"
    }
  ]
}
```