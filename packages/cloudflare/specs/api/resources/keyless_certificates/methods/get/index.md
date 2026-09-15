---
title: Get Keyless SSL Configuration
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Keyless Certificates](https://developers.cloudflare.com/api/resources/keyless_certificates)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get Keyless SSL Configuration

GET/zones/{zone\_id}/keyless\_certificates/{keyless\_certificate\_id}

Get details for one Keyless SSL configuration.

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

`Trust and Safety Write``Trust and Safety Read``Zero Trust: PII Read``Zaraz Edit``Zaraz Read``Zaraz Admin``Access: Apps and Policies Revoke``Access: Apps and Policies Write``Access: Apps and Policies Read``Access: Apps and Policies Revoke``Access: Mutual TLS Certificates Write``Access: Organizations, Identity Providers, and Groups Write``Zone Settings Write``Zone Settings Read``Zone Read``DNS Read``Workers Scripts Write``Workers Scripts Read``Zone Write``Workers Routes Write``Workers Routes Read``Stream Write``Stream Read``SSL and Certificates Write``SSL and Certificates Read``Logs Write``Logs Read``Cache Purge``Page Rules Write``Page Rules Read``Load Balancers Write``Load Balancers Read``Firewall Services Write``Firewall Services Read``DNS Write``Apps Write``Analytics Read``Access: Apps and Policies Write``Access: Apps and Policies Read`

##### P ath ParametersExpand Collapse

zone\_id: string

Identifier.

maxLength32

[Link to this property](#)%20keyless_certificates%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

keyless\_certificate\_id: string

Identifier.

maxLength32

[Link to this property](#)%20keyless_certificates%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20keyless_certificate_id%20%3E%20(schema)>)

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

[Link to this property](#)%20keyless_certificates%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20keyless_certificates%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20keyless_certificates%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional <a href="https://developers.cloudflare.com/api/resources/keyless_certificates#(resource)%20keyless_certificates%20%3E%20(model)%20keyless_certificate%20%3E%20(schema)">KeylessCertificate</a> { id, created\_on, enabled, 7 more }

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

[Link to this property](#)%20keyless_certificates%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Get Keyless SSL Configuration

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/keyless_certificates/$KEYLESS_CERTIFICATE_ID \
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
  }
}
```