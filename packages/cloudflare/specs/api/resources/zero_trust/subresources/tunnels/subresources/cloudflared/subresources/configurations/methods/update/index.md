---
title: Update Tunnel configuration
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Tunnels](https://developers.cloudflare.com/api/resources/zero_trust/subresources/tunnels)

[Cloudflared](https://developers.cloudflare.com/api/resources/zero_trust/subresources/tunnels/subresources/cloudflared)

[Configurations](https://developers.cloudflare.com/api/resources/zero_trust/subresources/tunnels/subresources/cloudflared/subresources/configurations)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Update Tunnel configuration

PUT/accounts/{account\_id}/cfd\_tunnel/{tunnel\_id}/configurations

Replaces the configuration for a remotely managed Cloudflare Tunnel, including its ingress rules and origin request settings.

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

`Cloudflare One Connectors Write``Cloudflare One Connector: cloudflared Write``Cloudflare Tunnel Write`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier.

maxLength32

[Link to this property](#)%20zero_trust.tunnels.cloudflared.configurations%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

tunnel\_id: string

UUID of the tunnel.

formatuuid

maxLength36

[Link to this property](#)%20zero_trust.tunnels.cloudflared.configurations%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20tunnel_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

<details>

<summary>

config: optional object {ingress, originRequest }

The tunnel configuration and ingress rules.

</summary>

<details>

<summary>

ingress: optional array of object {hostname, service, originRequest, path }

List of public hostname definitions. At least one ingress rule needs to be defined for the tunnel.

</summary>

hostname: string

Public hostname for this service.

<a href="#">Link to this property</a>

service: string

Protocol and address of destination server. Supported protocols: http://, https://, unix://, tcp://, ssh://, rdp://, unix+tls://, smb://. Alternatively can return a HTTP status code http\_status:\[code] e.g. ‘http\_status:404’.

<a href="#">Link to this property</a>

<details>

<summary>

originRequest: optional object {access, caPool, connectTimeout, 12 more }

Configuration parameters for the public hostname specific connection settings between cloudflared and origin server.

</summary>

<details>

<summary>

access: optional object {audTag, teamName, required }

For all L7 requests to this hostname, cloudflared will validate each request’s Cf-Access-Jwt-Assertion request header.

</summary>

audTag: array of string

Access applications that are allowed to reach this hostname for this Tunnel. Audience tags can be identified in the dashboard or via the List Access policies API.

<a href="#">Link to this property</a>

teamName: string

<a href="#">Link to this property</a>

required: optional boolean

Deny traffic that has not fulfilled Access authorization.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

caPool: optional string

Path to the certificate authority (CA) for the certificate of your origin. This option should be used only if your certificate is not signed by Cloudflare.

<a href="#">Link to this property</a>

connectTimeout: optional number

Timeout for establishing a new TCP connection to your origin server. This excludes the time taken to establish TLS, which is controlled by tlsTimeout.

<a href="#">Link to this property</a>

disableChunkedEncoding: optional boolean

Disables chunked transfer encoding. Useful if you are running a WSGI server.

<a href="#">Link to this property</a>

http2Origin: optional boolean

Attempt to connect to origin using HTTP2. Origin must be configured as https.

<a href="#">Link to this property</a>

httpHostHeader: optional string

Sets the HTTP Host header on requests sent to the local service.

<a href="#">Link to this property</a>

keepAliveConnections: optional number

Maximum number of idle keepalive connections between Tunnel and your origin. This does not restrict the total number of concurrent connections.

<a href="#">Link to this property</a>

keepAliveTimeout: optional number

Timeout after which an idle keepalive connection can be discarded.

<a href="#">Link to this property</a>

matchSNItoHost: optional boolean

Auto configure the Hostname on the origin server certificate.

<a href="#">Link to this property</a>

noHappyEyeballs: optional boolean

Disable the “happy eyeballs” algorithm for IPv4/IPv6 fallback if your local network has misconfigured one of the protocols.

<a href="#">Link to this property</a>

noTLSVerify: optional boolean

Disables TLS verification of the certificate presented by your origin. Will allow any certificate from the origin to be accepted.

<a href="#">Link to this property</a>

originServerName: optional string

Hostname that cloudflared should expect from your origin server certificate.

<a href="#">Link to this property</a>

proxyType: optional string

cloudflared starts a proxy server to translate HTTP traffic into TCP when proxying, for example, SSH or RDP. This configures what type of proxy will be started. Valid options are: "" for the regular proxy and “socks” for a SOCKS5 proxy.

<a href="#">Link to this property</a>

tcpKeepAlive: optional number

The timeout after which a TCP keepalive packet is sent on a connection between Tunnel and the origin server.

<a href="#">Link to this property</a>

tlsTimeout: optional number

Timeout for completing a TLS handshake to your origin server, if you have chosen to connect Tunnel to an HTTPS server.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

path: optional string

Requests with this path route to this public hostname.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

originRequest: optional object {access, caPool, connectTimeout, 12 more }

Configuration parameters for the public hostname specific connection settings between cloudflared and origin server.

</summary>

<details>

<summary>

access: optional object {audTag, teamName, required }

For all L7 requests to this hostname, cloudflared will validate each request’s Cf-Access-Jwt-Assertion request header.

</summary>

audTag: array of string

Access applications that are allowed to reach this hostname for this Tunnel. Audience tags can be identified in the dashboard or via the List Access policies API.

<a href="#">Link to this property</a>

teamName: string

<a href="#">Link to this property</a>

required: optional boolean

Deny traffic that has not fulfilled Access authorization.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

caPool: optional string

Path to the certificate authority (CA) for the certificate of your origin. This option should be used only if your certificate is not signed by Cloudflare.

<a href="#">Link to this property</a>

connectTimeout: optional number

Timeout for establishing a new TCP connection to your origin server. This excludes the time taken to establish TLS, which is controlled by tlsTimeout.

<a href="#">Link to this property</a>

disableChunkedEncoding: optional boolean

Disables chunked transfer encoding. Useful if you are running a WSGI server.

<a href="#">Link to this property</a>

http2Origin: optional boolean

Attempt to connect to origin using HTTP2. Origin must be configured as https.

<a href="#">Link to this property</a>

httpHostHeader: optional string

Sets the HTTP Host header on requests sent to the local service.

<a href="#">Link to this property</a>

keepAliveConnections: optional number

Maximum number of idle keepalive connections between Tunnel and your origin. This does not restrict the total number of concurrent connections.

<a href="#">Link to this property</a>

keepAliveTimeout: optional number

Timeout after which an idle keepalive connection can be discarded.

<a href="#">Link to this property</a>

matchSNItoHost: optional boolean

Auto configure the Hostname on the origin server certificate.

<a href="#">Link to this property</a>

noHappyEyeballs: optional boolean

Disable the “happy eyeballs” algorithm for IPv4/IPv6 fallback if your local network has misconfigured one of the protocols.

<a href="#">Link to this property</a>

noTLSVerify: optional boolean

Disables TLS verification of the certificate presented by your origin. Will allow any certificate from the origin to be accepted.

<a href="#">Link to this property</a>

originServerName: optional string

Hostname that cloudflared should expect from your origin server certificate.

<a href="#">Link to this property</a>

proxyType: optional string

cloudflared starts a proxy server to translate HTTP traffic into TCP when proxying, for example, SSH or RDP. This configures what type of proxy will be started. Valid options are: "" for the regular proxy and “socks” for a SOCKS5 proxy.

<a href="#">Link to this property</a>

tcpKeepAlive: optional number

The timeout after which a TCP keepalive packet is sent on a connection between Tunnel and the origin server.

<a href="#">Link to this property</a>

tlsTimeout: optional number

Timeout for completing a TLS handshake to your origin server, if you have chosen to connect Tunnel to an HTTPS server.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.tunnels.cloudflared.configurations%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20config%20%3E%20(schema)>)

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

[Link to this property](#)%20zero_trust.tunnels.cloudflared.configurations%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20zero_trust.tunnels.cloudflared.configurations%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20zero_trust.tunnels.cloudflared.configurations%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {account\_id, config, created\_at, 3 more }

Cloudflare Tunnel configuration

</summary>

account\_id: optional string

Identifier.

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

config: optional object {ingress, originRequest }

The tunnel configuration and ingress rules.

</summary>

<details>

<summary>

ingress: optional array of object {hostname, service, originRequest, path }

List of public hostname definitions. At least one ingress rule needs to be defined for the tunnel.

</summary>

hostname: string

Public hostname for this service.

<a href="#">Link to this property</a>

service: string

Protocol and address of destination server. Supported protocols: http://, https://, unix://, tcp://, ssh://, rdp://, unix+tls://, smb://. Alternatively can return a HTTP status code http\_status:\[code] e.g. ‘http\_status:404’.

<a href="#">Link to this property</a>

<details>

<summary>

originRequest: optional object {access, caPool, connectTimeout, 12 more }

Configuration parameters for the public hostname specific connection settings between cloudflared and origin server.

</summary>

<details>

<summary>

access: optional object {audTag, teamName, required }

For all L7 requests to this hostname, cloudflared will validate each request’s Cf-Access-Jwt-Assertion request header.

</summary>

audTag: array of string

Access applications that are allowed to reach this hostname for this Tunnel. Audience tags can be identified in the dashboard or via the List Access policies API.

<a href="#">Link to this property</a>

teamName: string

<a href="#">Link to this property</a>

required: optional boolean

Deny traffic that has not fulfilled Access authorization.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

caPool: optional string

Path to the certificate authority (CA) for the certificate of your origin. This option should be used only if your certificate is not signed by Cloudflare.

<a href="#">Link to this property</a>

connectTimeout: optional number

Timeout for establishing a new TCP connection to your origin server. This excludes the time taken to establish TLS, which is controlled by tlsTimeout.

<a href="#">Link to this property</a>

disableChunkedEncoding: optional boolean

Disables chunked transfer encoding. Useful if you are running a WSGI server.

<a href="#">Link to this property</a>

http2Origin: optional boolean

Attempt to connect to origin using HTTP2. Origin must be configured as https.

<a href="#">Link to this property</a>

httpHostHeader: optional string

Sets the HTTP Host header on requests sent to the local service.

<a href="#">Link to this property</a>

keepAliveConnections: optional number

Maximum number of idle keepalive connections between Tunnel and your origin. This does not restrict the total number of concurrent connections.

<a href="#">Link to this property</a>

keepAliveTimeout: optional number

Timeout after which an idle keepalive connection can be discarded.

<a href="#">Link to this property</a>

matchSNItoHost: optional boolean

Auto configure the Hostname on the origin server certificate.

<a href="#">Link to this property</a>

noHappyEyeballs: optional boolean

Disable the “happy eyeballs” algorithm for IPv4/IPv6 fallback if your local network has misconfigured one of the protocols.

<a href="#">Link to this property</a>

noTLSVerify: optional boolean

Disables TLS verification of the certificate presented by your origin. Will allow any certificate from the origin to be accepted.

<a href="#">Link to this property</a>

originServerName: optional string

Hostname that cloudflared should expect from your origin server certificate.

<a href="#">Link to this property</a>

proxyType: optional string

cloudflared starts a proxy server to translate HTTP traffic into TCP when proxying, for example, SSH or RDP. This configures what type of proxy will be started. Valid options are: "" for the regular proxy and “socks” for a SOCKS5 proxy.

<a href="#">Link to this property</a>

tcpKeepAlive: optional number

The timeout after which a TCP keepalive packet is sent on a connection between Tunnel and the origin server.

<a href="#">Link to this property</a>

tlsTimeout: optional number

Timeout for completing a TLS handshake to your origin server, if you have chosen to connect Tunnel to an HTTPS server.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

path: optional string

Requests with this path route to this public hostname.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

originRequest: optional object {access, caPool, connectTimeout, 12 more }

Configuration parameters for the public hostname specific connection settings between cloudflared and origin server.

</summary>

<details>

<summary>

access: optional object {audTag, teamName, required }

For all L7 requests to this hostname, cloudflared will validate each request’s Cf-Access-Jwt-Assertion request header.

</summary>

audTag: array of string

Access applications that are allowed to reach this hostname for this Tunnel. Audience tags can be identified in the dashboard or via the List Access policies API.

<a href="#">Link to this property</a>

teamName: string

<a href="#">Link to this property</a>

required: optional boolean

Deny traffic that has not fulfilled Access authorization.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

caPool: optional string

Path to the certificate authority (CA) for the certificate of your origin. This option should be used only if your certificate is not signed by Cloudflare.

<a href="#">Link to this property</a>

connectTimeout: optional number

Timeout for establishing a new TCP connection to your origin server. This excludes the time taken to establish TLS, which is controlled by tlsTimeout.

<a href="#">Link to this property</a>

disableChunkedEncoding: optional boolean

Disables chunked transfer encoding. Useful if you are running a WSGI server.

<a href="#">Link to this property</a>

http2Origin: optional boolean

Attempt to connect to origin using HTTP2. Origin must be configured as https.

<a href="#">Link to this property</a>

httpHostHeader: optional string

Sets the HTTP Host header on requests sent to the local service.

<a href="#">Link to this property</a>

keepAliveConnections: optional number

Maximum number of idle keepalive connections between Tunnel and your origin. This does not restrict the total number of concurrent connections.

<a href="#">Link to this property</a>

keepAliveTimeout: optional number

Timeout after which an idle keepalive connection can be discarded.

<a href="#">Link to this property</a>

matchSNItoHost: optional boolean

Auto configure the Hostname on the origin server certificate.

<a href="#">Link to this property</a>

noHappyEyeballs: optional boolean

Disable the “happy eyeballs” algorithm for IPv4/IPv6 fallback if your local network has misconfigured one of the protocols.

<a href="#">Link to this property</a>

noTLSVerify: optional boolean

Disables TLS verification of the certificate presented by your origin. Will allow any certificate from the origin to be accepted.

<a href="#">Link to this property</a>

originServerName: optional string

Hostname that cloudflared should expect from your origin server certificate.

<a href="#">Link to this property</a>

proxyType: optional string

cloudflared starts a proxy server to translate HTTP traffic into TCP when proxying, for example, SSH or RDP. This configures what type of proxy will be started. Valid options are: "" for the regular proxy and “socks” for a SOCKS5 proxy.

<a href="#">Link to this property</a>

tcpKeepAlive: optional number

The timeout after which a TCP keepalive packet is sent on a connection between Tunnel and the origin server.

<a href="#">Link to this property</a>

tlsTimeout: optional number

Timeout for completing a TLS handshake to your origin server, if you have chosen to connect Tunnel to an HTTPS server.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

source: optional "local"or "cloudflare"

Indicates if this is a locally or remotely configured tunnel. If <code>local</code>, manage the tunnel using a YAML file on the origin machine. If <code>cloudflare</code>, manage the tunnel’s configuration on the Zero Trust dashboard.

</summary>

One of the following:

"local"

<a href="#">Link to this property</a>

"cloudflare"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

tunnel\_id: optional string

UUID of the tunnel.

formatuuid

maxLength36

<a href="#">Link to this property</a>

version: optional number

The version of the Tunnel Configuration.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.tunnels.cloudflared.configurations%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Update Tunnel configuration

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cfd_tunnel/$TUNNEL_ID/configurations \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{}'
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
    "account_id": "023e105f4ecef8ad9ca31a8372d0c353",
    "config": {
      "ingress": [
        {
          "hostname": "tunnel.example.com",
          "service": "https://localhost:8001",
          "originRequest": {
            "access": {
              "audTag": [
                "string"
              ],
              "teamName": "zero-trust-organization-name",
              "required": false
            },
            "caPool": "caPool",
            "connectTimeout": 10,
            "disableChunkedEncoding": true,
            "http2Origin": true,
            "httpHostHeader": "httpHostHeader",
            "keepAliveConnections": 100,
            "keepAliveTimeout": 90,
            "matchSNItoHost": false,
            "noHappyEyeballs": false,
            "noTLSVerify": false,
            "originServerName": "originServerName",
            "proxyType": "proxyType",
            "tcpKeepAlive": 30,
            "tlsTimeout": 10
          },
          "path": "subpath"
        }
      ],
      "originRequest": {
        "access": {
          "audTag": [
            "string"
          ],
          "teamName": "zero-trust-organization-name",
          "required": false
        },
        "caPool": "caPool",
        "connectTimeout": 10,
        "disableChunkedEncoding": true,
        "http2Origin": true,
        "httpHostHeader": "httpHostHeader",
        "keepAliveConnections": 100,
        "keepAliveTimeout": 90,
        "matchSNItoHost": false,
        "noHappyEyeballs": false,
        "noTLSVerify": false,
        "originServerName": "originServerName",
        "proxyType": "proxyType",
        "tcpKeepAlive": 30,
        "tlsTimeout": 10
      },
      "warp-routing": {
        "enabled": true
      }
    },
    "created_at": "2014-01-01T05:20:00.12345Z",
    "source": "cloudflare",
    "tunnel_id": "f70ff985-a4ef-4643-bbbc-4a0ed4fc8415",
    "version": 0
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
    "account_id": "023e105f4ecef8ad9ca31a8372d0c353",
    "config": {
      "ingress": [
        {
          "hostname": "tunnel.example.com",
          "service": "https://localhost:8001",
          "originRequest": {
            "access": {
              "audTag": [
                "string"
              ],
              "teamName": "zero-trust-organization-name",
              "required": false
            },
            "caPool": "caPool",
            "connectTimeout": 10,
            "disableChunkedEncoding": true,
            "http2Origin": true,
            "httpHostHeader": "httpHostHeader",
            "keepAliveConnections": 100,
            "keepAliveTimeout": 90,
            "matchSNItoHost": false,
            "noHappyEyeballs": false,
            "noTLSVerify": false,
            "originServerName": "originServerName",
            "proxyType": "proxyType",
            "tcpKeepAlive": 30,
            "tlsTimeout": 10
          },
          "path": "subpath"
        }
      ],
      "originRequest": {
        "access": {
          "audTag": [
            "string"
          ],
          "teamName": "zero-trust-organization-name",
          "required": false
        },
        "caPool": "caPool",
        "connectTimeout": 10,
        "disableChunkedEncoding": true,
        "http2Origin": true,
        "httpHostHeader": "httpHostHeader",
        "keepAliveConnections": 100,
        "keepAliveTimeout": 90,
        "matchSNItoHost": false,
        "noHappyEyeballs": false,
        "noTLSVerify": false,
        "originServerName": "originServerName",
        "proxyType": "proxyType",
        "tcpKeepAlive": 30,
        "tlsTimeout": 10
      },
      "warp-routing": {
        "enabled": true
      }
    },
    "created_at": "2014-01-01T05:20:00.12345Z",
    "source": "cloudflare",
    "tunnel_id": "f70ff985-a4ef-4643-bbbc-4a0ed4fc8415",
    "version": 0
  }
}
```