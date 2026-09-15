---
title: Create Workers VPC connectivity service
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Connectivity](https://developers.cloudflare.com/api/resources/connectivity)

[Directory](https://developers.cloudflare.com/api/resources/connectivity/subresources/directory)

[Services](https://developers.cloudflare.com/api/resources/connectivity/subresources/directory/subresources/services)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Create Workers VPC connectivity service

POST/accounts/{account\_id}/connectivity/directory/services

Creates a new Workers VPC connectivity service in the account.

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

Account identifier

maxLength32

[Link to this property](#)%20connectivity.directory.services%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

<details>

<summary>

body: object {host, name, type, 6 more } or object {host, name, type, 6 more }

</summary>

One of the following:

<details>

<summary>

InfraHTTPServiceConfig object {host, name, type, 6 more }

</summary>

<details>

<summary>

host: object {ipv4, network } or object {ipv6, network } or object {ipv4, ipv6, network } or object {hostname, resolver\_network }

</summary>

One of the following:

<details>

<summary>

InfraIPv4Host object {ipv4, network }

</summary>

ipv4: string

<a href="#">Link to this property</a>

<details>

<summary>

network: object {tunnel\_id }

</summary>

tunnel\_id: string

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

InfraIPv6Host object {ipv6, network }

</summary>

ipv6: string

<a href="#">Link to this property</a>

<details>

<summary>

network: object {tunnel\_id }

</summary>

tunnel\_id: string

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

InfraDualStackHost object {ipv4, ipv6, network }

</summary>

ipv4: string

<a href="#">Link to this property</a>

ipv6: string

<a href="#">Link to this property</a>

<details>

<summary>

network: object {tunnel\_id }

</summary>

tunnel\_id: string

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

InfraHostnameHost object {hostname, resolver\_network }

</summary>

hostname: string

<a href="#">Link to this property</a>

<details>

<summary>

resolver\_network: object {tunnel\_id, resolver\_ips }

</summary>

tunnel\_id: string

formatuuid

<a href="#">Link to this property</a>

resolver\_ips: optional array of string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

<details>

<summary>

type: "tcp"or "http"

</summary>

One of the following:

"tcp"

<a href="#">Link to this property</a>

"http"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

http\_port: optional number

formatint32

minimum1

<a href="#">Link to this property</a>

https\_port: optional number

formatint32

minimum1

<a href="#">Link to this property</a>

service\_id: optional string

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

tls\_settings: optional object {cert\_verification\_mode }

TLS settings for a connectivity service.

If omitted, the default mode (<code>verify_full</code>) is used.

</summary>

cert\_verification\_mode: string

TLS certificate verification mode for the connection to the origin.

- <code>"verify_full"</code> — verify certificate chain and hostname (default)
- <code>"verify_ca"</code> — verify certificate chain only, skip hostname check
- <code>"disabled"</code> — do not verify the server certificate at all

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

InfraTCPServiceConfig object {host, name, type, 6 more }

</summary>

<details>

<summary>

host: object {ipv4, network } or object {ipv6, network } or object {ipv4, ipv6, network } or object {hostname, resolver\_network }

</summary>

One of the following:

<details>

<summary>

InfraIPv4Host object {ipv4, network }

</summary>

ipv4: string

<a href="#">Link to this property</a>

<details>

<summary>

network: object {tunnel\_id }

</summary>

tunnel\_id: string

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

InfraIPv6Host object {ipv6, network }

</summary>

ipv6: string

<a href="#">Link to this property</a>

<details>

<summary>

network: object {tunnel\_id }

</summary>

tunnel\_id: string

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

InfraDualStackHost object {ipv4, ipv6, network }

</summary>

ipv4: string

<a href="#">Link to this property</a>

ipv6: string

<a href="#">Link to this property</a>

<details>

<summary>

network: object {tunnel\_id }

</summary>

tunnel\_id: string

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

InfraHostnameHost object {hostname, resolver\_network }

</summary>

hostname: string

<a href="#">Link to this property</a>

<details>

<summary>

resolver\_network: object {tunnel\_id, resolver\_ips }

</summary>

tunnel\_id: string

formatuuid

<a href="#">Link to this property</a>

resolver\_ips: optional array of string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

<details>

<summary>

type: "tcp"or "http"

</summary>

One of the following:

"tcp"

<a href="#">Link to this property</a>

"http"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

app\_protocol: optional "postgresql"or "mysql"

</summary>

One of the following:

"postgresql"

<a href="#">Link to this property</a>

"mysql"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

service\_id: optional string

formatuuid

<a href="#">Link to this property</a>

tcp\_port: optional number

formatint32

minimum1

<a href="#">Link to this property</a>

<details>

<summary>

tls\_settings: optional object {cert\_verification\_mode }

TLS settings for a connectivity service.

If omitted, the default mode (<code>verify_full</code>) is used.

</summary>

cert\_verification\_mode: string

TLS certificate verification mode for the connection to the origin.

- <code>"verify_full"</code> — verify certificate chain and hostname (default)
- <code>"verify_ca"</code> — verify certificate chain only, skip hostname check
- <code>"disabled"</code> — do not verify the server certificate at all

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20connectivity.directory.services%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20body%20%3E%20(schema)>)

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

[Link to this property](#)%20connectivity.directory.services%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20connectivity.directory.services%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20connectivity.directory.services%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {host, name, type, 6 more } or object {host, name, type, 6 more }

</summary>

One of the following:

<details>

<summary>

InfraHTTPServiceConfig object {host, name, type, 6 more }

</summary>

<details>

<summary>

host: object {ipv4, network } or object {ipv6, network } or object {ipv4, ipv6, network } or object {hostname, resolver\_network }

</summary>

One of the following:

<details>

<summary>

InfraIPv4Host object {ipv4, network }

</summary>

ipv4: string

<a href="#">Link to this property</a>

<details>

<summary>

network: object {tunnel\_id }

</summary>

tunnel\_id: string

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

InfraIPv6Host object {ipv6, network }

</summary>

ipv6: string

<a href="#">Link to this property</a>

<details>

<summary>

network: object {tunnel\_id }

</summary>

tunnel\_id: string

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

InfraDualStackHost object {ipv4, ipv6, network }

</summary>

ipv4: string

<a href="#">Link to this property</a>

ipv6: string

<a href="#">Link to this property</a>

<details>

<summary>

network: object {tunnel\_id }

</summary>

tunnel\_id: string

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

InfraHostnameHost object {hostname, resolver\_network }

</summary>

hostname: string

<a href="#">Link to this property</a>

<details>

<summary>

resolver\_network: object {tunnel\_id, resolver\_ips }

</summary>

tunnel\_id: string

formatuuid

<a href="#">Link to this property</a>

resolver\_ips: optional array of string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

<details>

<summary>

type: "tcp"or "http"

</summary>

One of the following:

"tcp"

<a href="#">Link to this property</a>

"http"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

http\_port: optional number

formatint32

minimum1

<a href="#">Link to this property</a>

https\_port: optional number

formatint32

minimum1

<a href="#">Link to this property</a>

service\_id: optional string

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

tls\_settings: optional object {cert\_verification\_mode }

TLS settings for a connectivity service.

If omitted, the default mode (<code>verify_full</code>) is used.

</summary>

cert\_verification\_mode: string

TLS certificate verification mode for the connection to the origin.

- <code>"verify_full"</code> — verify certificate chain and hostname (default)
- <code>"verify_ca"</code> — verify certificate chain only, skip hostname check
- <code>"disabled"</code> — do not verify the server certificate at all

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

InfraTCPServiceConfig object {host, name, type, 6 more }

</summary>

<details>

<summary>

host: object {ipv4, network } or object {ipv6, network } or object {ipv4, ipv6, network } or object {hostname, resolver\_network }

</summary>

One of the following:

<details>

<summary>

InfraIPv4Host object {ipv4, network }

</summary>

ipv4: string

<a href="#">Link to this property</a>

<details>

<summary>

network: object {tunnel\_id }

</summary>

tunnel\_id: string

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

InfraIPv6Host object {ipv6, network }

</summary>

ipv6: string

<a href="#">Link to this property</a>

<details>

<summary>

network: object {tunnel\_id }

</summary>

tunnel\_id: string

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

InfraDualStackHost object {ipv4, ipv6, network }

</summary>

ipv4: string

<a href="#">Link to this property</a>

ipv6: string

<a href="#">Link to this property</a>

<details>

<summary>

network: object {tunnel\_id }

</summary>

tunnel\_id: string

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

InfraHostnameHost object {hostname, resolver\_network }

</summary>

hostname: string

<a href="#">Link to this property</a>

<details>

<summary>

resolver\_network: object {tunnel\_id, resolver\_ips }

</summary>

tunnel\_id: string

formatuuid

<a href="#">Link to this property</a>

resolver\_ips: optional array of string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

<details>

<summary>

type: "tcp"or "http"

</summary>

One of the following:

"tcp"

<a href="#">Link to this property</a>

"http"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

app\_protocol: optional "postgresql"or "mysql"

</summary>

One of the following:

"postgresql"

<a href="#">Link to this property</a>

"mysql"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

service\_id: optional string

formatuuid

<a href="#">Link to this property</a>

tcp\_port: optional number

formatint32

minimum1

<a href="#">Link to this property</a>

<details>

<summary>

tls\_settings: optional object {cert\_verification\_mode }

TLS settings for a connectivity service.

If omitted, the default mode (<code>verify_full</code>) is used.

</summary>

cert\_verification\_mode: string

TLS certificate verification mode for the connection to the origin.

- <code>"verify_full"</code> — verify certificate chain and hostname (default)
- <code>"verify_ca"</code> — verify certificate chain only, skip hostname check
- <code>"disabled"</code> — do not verify the server certificate at all

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20connectivity.directory.services%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Create Workers VPC connectivity service

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/connectivity/directory/services \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "host": {
            "ipv4": "10.0.0.1",
            "network": {
              "tunnel_id": "0191dce4-9ab4-7fce-b660-8e5dec5172da"
            }
          },
          "name": "web-app",
          "type": "http",
          "http_port": 8080,
          "https_port": 8443
        }'
```

200 example

200 example

```
{
  "errors": [],
  "messages": [],
  "result": {
    "created_at": "2024-01-15T09:30:00Z",
    "host": {
      "hostname": "api.example.com",
      "resolver_network": {
        "tunnel_id": "0191dce4-9ab4-7fce-b660-8e5dec5172da"
      }
    },
    "name": "web-server",
    "service_id": "550e8400-e29b-41d4-a716-446655440000",
    "type": "http",
    "updated_at": "2024-01-15T09:30:00Z"
  },
  "success": true
}
```

```
{
  "errors": [],
  "messages": [],
  "result": {
    "created_at": "2024-01-15T09:30:00Z",
    "host": {
      "ipv4": "10.0.0.1",
      "network": {
        "tunnel_id": "0191dce4-9ab4-7fce-b660-8e5dec5172da"
      }
    },
    "name": "postgres-db",
    "service_id": "550e8400-e29b-41d4-a716-446655440001",
    "tcp_port": 5432,
    "type": "tcp",
    "updated_at": "2024-01-15T09:30:00Z"
  },
  "success": true
}
```

##### Returns Examples

200 example

200 example

```
{
  "errors": [],
  "messages": [],
  "result": {
    "created_at": "2024-01-15T09:30:00Z",
    "host": {
      "hostname": "api.example.com",
      "resolver_network": {
        "tunnel_id": "0191dce4-9ab4-7fce-b660-8e5dec5172da"
      }
    },
    "name": "web-server",
    "service_id": "550e8400-e29b-41d4-a716-446655440000",
    "type": "http",
    "updated_at": "2024-01-15T09:30:00Z"
  },
  "success": true
}
```

```
{
  "errors": [],
  "messages": [],
  "result": {
    "created_at": "2024-01-15T09:30:00Z",
    "host": {
      "ipv4": "10.0.0.1",
      "network": {
        "tunnel_id": "0191dce4-9ab4-7fce-b660-8e5dec5172da"
      }
    },
    "name": "postgres-db",
    "service_id": "550e8400-e29b-41d4-a716-446655440001",
    "tcp_port": 5432,
    "type": "tcp",
    "updated_at": "2024-01-15T09:30:00Z"
  },
  "success": true
}
```