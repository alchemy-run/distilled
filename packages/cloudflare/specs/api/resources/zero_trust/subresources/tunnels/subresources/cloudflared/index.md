---
title: Cloudflared
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Tunnels](https://developers.cloudflare.com/api/resources/zero_trust/subresources/tunnels)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Cloudflared

##### [List Cloudflare Tunnels](https://developers.cloudflare.com/api/resources/zero_trust/subresources/tunnels/subresources/cloudflared/methods/list)

GET/accounts/{account\_id}/cfd\_tunnel

##### [Get a Cloudflare Tunnel](https://developers.cloudflare.com/api/resources/zero_trust/subresources/tunnels/subresources/cloudflared/methods/get)

GET/accounts/{account\_id}/cfd\_tunnel/{tunnel\_id}

##### [Create a Cloudflare Tunnel](https://developers.cloudflare.com/api/resources/zero_trust/subresources/tunnels/subresources/cloudflared/methods/create)

POST/accounts/{account\_id}/cfd\_tunnel

##### [Update a Cloudflare Tunnel](https://developers.cloudflare.com/api/resources/zero_trust/subresources/tunnels/subresources/cloudflared/methods/edit)

PATCH/accounts/{account\_id}/cfd\_tunnel/{tunnel\_id}

##### [Delete a Cloudflare Tunnel](https://developers.cloudflare.com/api/resources/zero_trust/subresources/tunnels/subresources/cloudflared/methods/delete)

DELETE/accounts/{account\_id}/cfd\_tunnel/{tunnel\_id}

#### CloudflaredConfigurations

##### [Get Tunnel configuration](https://developers.cloudflare.com/api/resources/zero_trust/subresources/tunnels/subresources/cloudflared/subresources/configurations/methods/get)

GET/accounts/{account\_id}/cfd\_tunnel/{tunnel\_id}/configurations

##### [Update Tunnel configuration](https://developers.cloudflare.com/api/resources/zero_trust/subresources/tunnels/subresources/cloudflared/subresources/configurations/methods/update)

PUT/accounts/{account\_id}/cfd\_tunnel/{tunnel\_id}/configurations

##### ModelsExpand Collapse

<details>

<summary>

ConfigurationGetResponse object {account\_id, config, created\_at, 3 more }

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

[Link to this property](#)%20zero_trust.tunnels.cloudflared.configurations%20%3E%20(model)%20configuration_get_response%20%3E%20(schema)>)

<details>

<summary>

ConfigurationUpdateResponse object {account\_id, config, created\_at, 3 more }

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

[Link to this property](#)%20zero_trust.tunnels.cloudflared.configurations%20%3E%20(model)%20configuration_update_response%20%3E%20(schema)>)

#### CloudflaredConnections

##### [List Cloudflare Tunnel connections](https://developers.cloudflare.com/api/resources/zero_trust/subresources/tunnels/subresources/cloudflared/subresources/connections/methods/get)

GET/accounts/{account\_id}/cfd\_tunnel/{tunnel\_id}/connections

##### [Clean up Cloudflare Tunnel connections](https://developers.cloudflare.com/api/resources/zero_trust/subresources/tunnels/subresources/cloudflared/subresources/connections/methods/delete)

DELETE/accounts/{account\_id}/cfd\_tunnel/{tunnel\_id}/connections

##### ModelsExpand Collapse

<details>

<summary>

Client object {id, arch, config\_version, 4 more }

A client (typically cloudflared) that maintains connections to a Cloudflare data center.

</summary>

id: optional string

UUID of the Cloudflare Tunnel connection.

formatuuid

maxLength36

<a href="#">Link to this property</a>

arch: optional string

The cloudflared OS architecture used to establish this connection.

<a href="#">Link to this property</a>

config\_version: optional number

The version of the remote tunnel configuration. Used internally to sync cloudflared with the Zero Trust dashboard.

<a href="#">Link to this property</a>

<details>

<summary>

conns: optional array of object {id, client\_id, client\_version, 5 more }

The Cloudflare Tunnel connections between your origin and Cloudflare’s edge.

</summary>

id: optional string

UUID of the Cloudflare Tunnel connection.

formatuuid

maxLength36

<a href="#">Link to this property</a>

client\_id: optional string

UUID of the Cloudflare Tunnel connector.

formatuuid

maxLength36

<a href="#">Link to this property</a>

client\_version: optional string

The cloudflared version used to establish this connection.

<a href="#">Link to this property</a>

colo\_name: optional string

The Cloudflare data center used for this connection.

<a href="#">Link to this property</a>

Deprecatedis\_pending\_reconnect: optional boolean

This functionality has been removed. The is\_pending\_reconnect field will now always report false.

Cloudflare continues to track connections for several minutes after they disconnect. This is an optimization to improve latency and reliability of reconnecting. If <code>true</code>, the connection has disconnected but is still being tracked. If <code>false</code>, the connection is actively serving traffic.

<a href="#">Link to this property</a>

opened\_at: optional string

Timestamp of when the connection was established.

formatdate-time

<a href="#">Link to this property</a>

origin\_ip: optional string

The public IP address of the host running cloudflared.

<a href="#">Link to this property</a>

uuid: optional string

UUID of the Cloudflare Tunnel connection.

formatuuid

maxLength36

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

features: optional array of string

Features enabled for the Cloudflare Tunnel.

<a href="#">Link to this property</a>

run\_at: optional string

Timestamp of when the tunnel connection was started.

formatdate-time

<a href="#">Link to this property</a>

version: optional string

The cloudflared version used to establish this connection.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.tunnels.cloudflared.connections%20%3E%20(model)%20client%20%3E%20(schema)>)

ConnectionDeleteResponse = unknown

[Link to this property](#)%20zero_trust.tunnels.cloudflared.connections%20%3E%20(model)%20connection_delete_response%20%3E%20(schema)>)

#### CloudflaredToken

##### [Get a Cloudflare Tunnel token](https://developers.cloudflare.com/api/resources/zero_trust/subresources/tunnels/subresources/cloudflared/subresources/token/methods/get)

GET/accounts/{account\_id}/cfd\_tunnel/{tunnel\_id}/token

##### ModelsExpand Collapse

TokenGetResponse = string

The Tunnel Token is used as a mechanism to authenticate the operation of a tunnel.

[Link to this property](#)%20zero_trust.tunnels.cloudflared.token%20%3E%20(model)%20token_get_response%20%3E%20(schema)>)

#### CloudflaredConnectors

##### [Get Cloudflare Tunnel connector](https://developers.cloudflare.com/api/resources/zero_trust/subresources/tunnels/subresources/cloudflared/subresources/connectors/methods/get)

GET/accounts/{account\_id}/cfd\_tunnel/{tunnel\_id}/connectors/{connector\_id}

#### CloudflaredManagement

##### [Get a Cloudflare Tunnel management token](https://developers.cloudflare.com/api/resources/zero_trust/subresources/tunnels/subresources/cloudflared/subresources/management/methods/create)

POST/accounts/{account\_id}/cfd\_tunnel/{tunnel\_id}/management

##### ModelsExpand Collapse

ManagementCreateResponse = string

The Tunnel Token is used as a mechanism to authenticate the operation of a tunnel.

[Link to this property](#)%20zero_trust.tunnels.cloudflared.management%20%3E%20(model)%20management_create_response%20%3E%20(schema)>)