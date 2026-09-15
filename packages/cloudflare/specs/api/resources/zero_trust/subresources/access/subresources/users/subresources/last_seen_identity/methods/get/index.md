---
title: Get last seen identity
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Access](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access)

[Users](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/users)

[Last Seen Identity](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/users/subresources/last_seen_identity)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get last seen identity

GET/accounts/{account\_id}/access/users/{user\_id}/last\_seen\_identity

Get last seen identity for a single user.

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

`Access: Audit Logs Read`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier.

maxLength32

[Link to this property](#)%20zero_trust.access.users.last_seen_identity%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

user\_id: string

UUID.

maxLength36

[Link to this property](#)%20zero_trust.access.users.last_seen_identity%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20user_id%20%3E%20(schema)>)

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

[Link to this property](#)%20zero_trust.access.users.last_seen_identity%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20zero_trust.access.users.last_seen_identity%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20zero_trust.access.users.last_seen_identity%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.access.users.last_seen_identity%20%3E%20(model)%20identity%20%3E%20(schema)">Identity</a> { account\_id, auth\_status, common\_name, 15 more }

</summary>

account\_id: optional string

<a href="#">Link to this property</a>

auth\_status: optional string

<a href="#">Link to this property</a>

common\_name: optional string

<a href="#">Link to this property</a>

device\_id: optional string

<a href="#">Link to this property</a>

<details>

<summary>

device\_sessions: optional map\[object {last\_authenticated } ]

</summary>

last\_authenticated: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

devicePosture: optional map\[object {id, check, data, 6 more } ]

</summary>

id: optional string

<a href="#">Link to this property</a>

<details>

<summary>

check: optional object {exists, path }

</summary>

exists: optional boolean

<a href="#">Link to this property</a>

path: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

data: optional unknown

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

error: optional string

<a href="#">Link to this property</a>

rule\_name: optional string

<a href="#">Link to this property</a>

success: optional boolean

<a href="#">Link to this property</a>

timestamp: optional string

<a href="#">Link to this property</a>

type: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

email: optional string

<a href="#">Link to this property</a>

<details>

<summary>

geo: optional object {country }

</summary>

country: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

iat: optional number

<a href="#">Link to this property</a>

<details>

<summary>

idp: optional object {id, type }

</summary>

id: optional string

<a href="#">Link to this property</a>

type: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

ip: optional string

<a href="#">Link to this property</a>

is\_gateway: optional boolean

<a href="#">Link to this property</a>

is\_warp: optional boolean

<a href="#">Link to this property</a>

<details>

<summary>

mtls\_auth: optional object {auth\_status, cert\_issuer\_dn, cert\_issuer\_ski, 2 more }

</summary>

auth\_status: optional string

<a href="#">Link to this property</a>

cert\_issuer\_dn: optional string

<a href="#">Link to this property</a>

cert\_issuer\_ski: optional string

<a href="#">Link to this property</a>

cert\_presented: optional boolean

<a href="#">Link to this property</a>

cert\_serial: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

service\_token\_id: optional string

<a href="#">Link to this property</a>

service\_token\_status: optional boolean

<a href="#">Link to this property</a>

user\_uuid: optional string

<a href="#">Link to this property</a>

version: optional number

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.users.last_seen_identity%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Get last seen identity

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/users/$USER_ID/last_seen_identity \
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
    "account_id": "1234567890",
    "auth_status": "NONE",
    "common_name": "",
    "device_id": "",
    "device_sessions": {
      "foo": {
        "last_authenticated": 1638832687
      }
    },
    "devicePosture": {
      "foo": {
        "id": "id",
        "check": {
          "exists": true,
          "path": "path"
        },
        "data": {},
        "description": "description",
        "error": "error",
        "rule_name": "rule_name",
        "success": true,
        "timestamp": "timestamp",
        "type": "type"
      }
    },
    "email": "test@cloudflare.com",
    "geo": {
      "country": "US"
    },
    "iat": 1694791905,
    "idp": {
      "id": "id",
      "type": "type"
    },
    "ip": "127.0.0.0",
    "is_gateway": false,
    "is_warp": false,
    "mtls_auth": {
      "auth_status": "auth_status",
      "cert_issuer_dn": "cert_issuer_dn",
      "cert_issuer_ski": "cert_issuer_ski",
      "cert_presented": true,
      "cert_serial": "cert_serial"
    },
    "service_token_id": "",
    "service_token_status": false,
    "user_uuid": "57cf8cf2-f55a-4588-9ac9-f5e41e9f09b4",
    "version": 2
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
    "account_id": "1234567890",
    "auth_status": "NONE",
    "common_name": "",
    "device_id": "",
    "device_sessions": {
      "foo": {
        "last_authenticated": 1638832687
      }
    },
    "devicePosture": {
      "foo": {
        "id": "id",
        "check": {
          "exists": true,
          "path": "path"
        },
        "data": {},
        "description": "description",
        "error": "error",
        "rule_name": "rule_name",
        "success": true,
        "timestamp": "timestamp",
        "type": "type"
      }
    },
    "email": "test@cloudflare.com",
    "geo": {
      "country": "US"
    },
    "iat": 1694791905,
    "idp": {
      "id": "id",
      "type": "type"
    },
    "ip": "127.0.0.0",
    "is_gateway": false,
    "is_warp": false,
    "mtls_auth": {
      "auth_status": "auth_status",
      "cert_issuer_dn": "cert_issuer_dn",
      "cert_issuer_ski": "cert_issuer_ski",
      "cert_presented": true,
      "cert_serial": "cert_serial"
    },
    "service_token_id": "",
    "service_token_status": false,
    "user_uuid": "57cf8cf2-f55a-4588-9ac9-f5e41e9f09b4",
    "version": 2
  }
}
```