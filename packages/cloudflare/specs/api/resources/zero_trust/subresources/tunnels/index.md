---
title: Tunnels
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Tunnels

##### [List All Tunnels](https://developers.cloudflare.com/api/resources/zero_trust/subresources/tunnels/methods/list)

GET/accounts/{account\_id}/tunnels

##### ModelsExpand Collapse

<details>

<summary>

Connection object {colo\_name, is\_pending\_reconnect, uuid }

</summary>

colo\_name: optional string

The Cloudflare data center used for this connection.

<a href="#">Link to this property</a>

Deprecatedis\_pending\_reconnect: optional boolean

This functionality has been removed. The is\_pending\_reconnect field will now always report false.

Cloudflare continues to track connections for several minutes after they disconnect. This is an optimization to improve latency and reliability of reconnecting. If <code>true</code>, the connection has disconnected but is still being tracked. If <code>false</code>, the connection is actively serving traffic.

<a href="#">Link to this property</a>

uuid: optional string

UUID of the Cloudflare Tunnel connection.

formatuuid

maxLength36

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.tunnels%20%3E%20(model)%20connection%20%3E%20(schema)>)

<details>

<summary>

TunnelListResponse = <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20cloudflare_tunnel%20%3E%20(schema)">CloudflareTunnel</a> { id, account\_tag, config\_src, 10 more } or object {id, account\_tag, connections, 8 more }

A Cloudflare Tunnel that connects your origin to Cloudflare’s edge.

</summary>

One of the following:

<details>

<summary>

CloudflareTunnel object {id, account\_tag, config\_src, 10 more }

A Cloudflare Tunnel that connects your origin to Cloudflare’s edge.

</summary>

id: optional string

UUID of the tunnel.

formatuuid

maxLength36

<a href="#">Link to this property</a>

account\_tag: optional string

Cloudflare account ID

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

config\_src: optional "local"or "cloudflare"

Indicates if this is a locally or remotely configured tunnel. If <code>local</code>, manage the tunnel using a YAML file on the origin machine. If <code>cloudflare</code>, manage the tunnel on the Zero Trust dashboard.

</summary>

One of the following:

"local"

<a href="#">Link to this property</a>

"cloudflare"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Deprecatedconnections: optional array of object {id, client\_id, client\_version, 5 more }

This field will start returning an empty array. To fetch the connections of a given tunnel, please use the dedicated endpoint <code>/accounts/{account_id}/{tunnel_type}/{tunnel_id}/connections</code>

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

conns\_active\_at: optional string

Timestamp of when the tunnel established at least one connection to Cloudflare’s edge. If <code>null</code>, the tunnel is inactive.

formatdate-time

<a href="#">Link to this property</a>

conns\_inactive\_at: optional string

Timestamp of when the tunnel became inactive (no connections to Cloudflare’s edge). If <code>null</code>, the tunnel is active.

formatdate-time

<a href="#">Link to this property</a>

created\_at: optional string

Timestamp of when the resource was created.

formatdate-time

<a href="#">Link to this property</a>

deleted\_at: optional string

Timestamp of when the resource was deleted. If <code>null</code>, the resource has not been deleted.

formatdate-time

<a href="#">Link to this property</a>

metadata: optional unknown

Metadata associated with the tunnel.

<a href="#">Link to this property</a>

name: optional string

A user-friendly name for a tunnel.

<a href="#">Link to this property</a>

Deprecatedremote\_config: optional boolean

Use the config\_src field instead.

If <code>true</code>, the tunnel can be configured remotely from the Zero Trust dashboard. If <code>false</code>, the tunnel must be configured locally on the origin machine.

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "inactive"or "degraded"or "healthy"or "down"

The status of the tunnel. Valid values are <code>inactive</code> (tunnel has never been run), <code>degraded</code> (tunnel is active and able to serve traffic but in an unhealthy state), <code>healthy</code> (tunnel is active and able to serve traffic), or <code>down</code> (tunnel can not serve traffic as it has no connections to the Cloudflare Edge).

</summary>

One of the following:

"inactive"

<a href="#">Link to this property</a>

"degraded"

<a href="#">Link to this property</a>

"healthy"

<a href="#">Link to this property</a>

"down"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

tun\_type: optional "cfd\_tunnel"or "warp\_connector"or "warp"or 4 more

The type of tunnel.

</summary>

One of the following:

"cfd\_tunnel"

<a href="#">Link to this property</a>

"warp\_connector"

<a href="#">Link to this property</a>

"warp"

<a href="#">Link to this property</a>

"magic"

<a href="#">Link to this property</a>

"ip\_sec"

<a href="#">Link to this property</a>

"gre"

<a href="#">Link to this property</a>

"cni"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

TunnelWARPConnectorTunnel object {id, account\_tag, connections, 8 more }

A Warp Connector Tunnel that connects your origin to Cloudflare’s edge.

</summary>

id: optional string

UUID of the tunnel.

formatuuid

maxLength36

<a href="#">Link to this property</a>

account\_tag: optional string

Cloudflare account ID

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

Deprecatedconnections: optional array of object {id, client\_id, client\_version, 5 more }

This field will start returning an empty array. To fetch the connections of a given tunnel, please use the dedicated endpoint <code>/accounts/{account_id}/{tunnel_type}/{tunnel_id}/connections</code>

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

conns\_active\_at: optional string

Timestamp of when the tunnel established at least one connection to Cloudflare’s edge. If <code>null</code>, the tunnel is inactive.

formatdate-time

<a href="#">Link to this property</a>

conns\_inactive\_at: optional string

Timestamp of when the tunnel became inactive (no connections to Cloudflare’s edge). If <code>null</code>, the tunnel is active.

formatdate-time

<a href="#">Link to this property</a>

created\_at: optional string

Timestamp of when the resource was created.

formatdate-time

<a href="#">Link to this property</a>

deleted\_at: optional string

Timestamp of when the resource was deleted. If <code>null</code>, the resource has not been deleted.

formatdate-time

<a href="#">Link to this property</a>

metadata: optional unknown

Metadata associated with the tunnel.

<a href="#">Link to this property</a>

name: optional string

A user-friendly name for a tunnel.

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "inactive"or "degraded"or "healthy"or "down"

The status of the tunnel. Valid values are <code>inactive</code> (tunnel has never been run), <code>degraded</code> (tunnel is active and able to serve traffic but in an unhealthy state), <code>healthy</code> (tunnel is active and able to serve traffic), or <code>down</code> (tunnel can not serve traffic as it has no connections to the Cloudflare Edge).

</summary>

One of the following:

"inactive"

<a href="#">Link to this property</a>

"degraded"

<a href="#">Link to this property</a>

"healthy"

<a href="#">Link to this property</a>

"down"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

tun\_type: optional "cfd\_tunnel"or "warp\_connector"or "warp"or 4 more

The type of tunnel.

</summary>

One of the following:

"cfd\_tunnel"

<a href="#">Link to this property</a>

"warp\_connector"

<a href="#">Link to this property</a>

"warp"

<a href="#">Link to this property</a>

"magic"

<a href="#">Link to this property</a>

"ip\_sec"

<a href="#">Link to this property</a>

"gre"

<a href="#">Link to this property</a>

"cni"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.tunnels%20%3E%20(model)%20tunnel_list_response%20%3E%20(schema)>)

#### TunnelsCloudflared

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

#### TunnelsCloudflaredConfigurations

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

#### TunnelsCloudflaredConnections

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

#### TunnelsCloudflaredToken

##### [Get a Cloudflare Tunnel token](https://developers.cloudflare.com/api/resources/zero_trust/subresources/tunnels/subresources/cloudflared/subresources/token/methods/get)

GET/accounts/{account\_id}/cfd\_tunnel/{tunnel\_id}/token

##### ModelsExpand Collapse

TokenGetResponse = string

The Tunnel Token is used as a mechanism to authenticate the operation of a tunnel.

[Link to this property](#)%20zero_trust.tunnels.cloudflared.token%20%3E%20(model)%20token_get_response%20%3E%20(schema)>)

#### TunnelsCloudflaredConnectors

##### [Get Cloudflare Tunnel connector](https://developers.cloudflare.com/api/resources/zero_trust/subresources/tunnels/subresources/cloudflared/subresources/connectors/methods/get)

GET/accounts/{account\_id}/cfd\_tunnel/{tunnel\_id}/connectors/{connector\_id}

#### TunnelsCloudflaredManagement

##### [Get a Cloudflare Tunnel management token](https://developers.cloudflare.com/api/resources/zero_trust/subresources/tunnels/subresources/cloudflared/subresources/management/methods/create)

POST/accounts/{account\_id}/cfd\_tunnel/{tunnel\_id}/management

##### ModelsExpand Collapse

ManagementCreateResponse = string

The Tunnel Token is used as a mechanism to authenticate the operation of a tunnel.

[Link to this property](#)%20zero_trust.tunnels.cloudflared.management%20%3E%20(model)%20management_create_response%20%3E%20(schema)>)

#### TunnelsWARP Connector

##### [List Warp Connector Tunnels](https://developers.cloudflare.com/api/resources/zero_trust/subresources/tunnels/subresources/warp_connector/methods/list)

GET/accounts/{account\_id}/warp\_connector

##### [Get a Warp Connector Tunnel](https://developers.cloudflare.com/api/resources/zero_trust/subresources/tunnels/subresources/warp_connector/methods/get)

GET/accounts/{account\_id}/warp\_connector/{tunnel\_id}

##### [Create a Warp Connector Tunnel](https://developers.cloudflare.com/api/resources/zero_trust/subresources/tunnels/subresources/warp_connector/methods/create)

POST/accounts/{account\_id}/warp\_connector

##### [Update a Warp Connector Tunnel](https://developers.cloudflare.com/api/resources/zero_trust/subresources/tunnels/subresources/warp_connector/methods/edit)

PATCH/accounts/{account\_id}/warp\_connector/{tunnel\_id}

##### [Delete a Warp Connector Tunnel](https://developers.cloudflare.com/api/resources/zero_trust/subresources/tunnels/subresources/warp_connector/methods/delete)

DELETE/accounts/{account\_id}/warp\_connector/{tunnel\_id}

##### ModelsExpand Collapse

<details>

<summary>

WARPConnectorListResponse object {id, account\_tag, connections, 8 more }

A Warp Connector Tunnel that connects your origin to Cloudflare’s edge.

</summary>

id: optional string

UUID of the tunnel.

formatuuid

maxLength36

<a href="#">Link to this property</a>

account\_tag: optional string

Cloudflare account ID

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

Deprecatedconnections: optional array of object {id, client\_id, client\_version, 5 more }

This field will start returning an empty array. To fetch the connections of a given tunnel, please use the dedicated endpoint <code>/accounts/{account_id}/{tunnel_type}/{tunnel_id}/connections</code>

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

conns\_active\_at: optional string

Timestamp of when the tunnel established at least one connection to Cloudflare’s edge. If <code>null</code>, the tunnel is inactive.

formatdate-time

<a href="#">Link to this property</a>

conns\_inactive\_at: optional string

Timestamp of when the tunnel became inactive (no connections to Cloudflare’s edge). If <code>null</code>, the tunnel is active.

formatdate-time

<a href="#">Link to this property</a>

created\_at: optional string

Timestamp of when the resource was created.

formatdate-time

<a href="#">Link to this property</a>

deleted\_at: optional string

Timestamp of when the resource was deleted. If <code>null</code>, the resource has not been deleted.

formatdate-time

<a href="#">Link to this property</a>

metadata: optional unknown

Metadata associated with the tunnel.

<a href="#">Link to this property</a>

name: optional string

A user-friendly name for a tunnel.

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "inactive"or "degraded"or "healthy"or "down"

The status of the tunnel. Valid values are <code>inactive</code> (tunnel has never been run), <code>degraded</code> (tunnel is active and able to serve traffic but in an unhealthy state), <code>healthy</code> (tunnel is active and able to serve traffic), or <code>down</code> (tunnel can not serve traffic as it has no connections to the Cloudflare Edge).

</summary>

One of the following:

"inactive"

<a href="#">Link to this property</a>

"degraded"

<a href="#">Link to this property</a>

"healthy"

<a href="#">Link to this property</a>

"down"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

tun\_type: optional "cfd\_tunnel"or "warp\_connector"or "warp"or 4 more

The type of tunnel.

</summary>

One of the following:

"cfd\_tunnel"

<a href="#">Link to this property</a>

"warp\_connector"

<a href="#">Link to this property</a>

"warp"

<a href="#">Link to this property</a>

"magic"

<a href="#">Link to this property</a>

"ip\_sec"

<a href="#">Link to this property</a>

"gre"

<a href="#">Link to this property</a>

"cni"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.tunnels.warp_connector%20%3E%20(model)%20warp_connector_list_response%20%3E%20(schema)>)

<details>

<summary>

WARPConnectorGetResponse object {id, account\_tag, connections, 8 more }

A Warp Connector Tunnel that connects your origin to Cloudflare’s edge.

</summary>

id: optional string

UUID of the tunnel.

formatuuid

maxLength36

<a href="#">Link to this property</a>

account\_tag: optional string

Cloudflare account ID

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

Deprecatedconnections: optional array of object {id, client\_id, client\_version, 5 more }

This field will start returning an empty array. To fetch the connections of a given tunnel, please use the dedicated endpoint <code>/accounts/{account_id}/{tunnel_type}/{tunnel_id}/connections</code>

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

conns\_active\_at: optional string

Timestamp of when the tunnel established at least one connection to Cloudflare’s edge. If <code>null</code>, the tunnel is inactive.

formatdate-time

<a href="#">Link to this property</a>

conns\_inactive\_at: optional string

Timestamp of when the tunnel became inactive (no connections to Cloudflare’s edge). If <code>null</code>, the tunnel is active.

formatdate-time

<a href="#">Link to this property</a>

created\_at: optional string

Timestamp of when the resource was created.

formatdate-time

<a href="#">Link to this property</a>

deleted\_at: optional string

Timestamp of when the resource was deleted. If <code>null</code>, the resource has not been deleted.

formatdate-time

<a href="#">Link to this property</a>

metadata: optional unknown

Metadata associated with the tunnel.

<a href="#">Link to this property</a>

name: optional string

A user-friendly name for a tunnel.

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "inactive"or "degraded"or "healthy"or "down"

The status of the tunnel. Valid values are <code>inactive</code> (tunnel has never been run), <code>degraded</code> (tunnel is active and able to serve traffic but in an unhealthy state), <code>healthy</code> (tunnel is active and able to serve traffic), or <code>down</code> (tunnel can not serve traffic as it has no connections to the Cloudflare Edge).

</summary>

One of the following:

"inactive"

<a href="#">Link to this property</a>

"degraded"

<a href="#">Link to this property</a>

"healthy"

<a href="#">Link to this property</a>

"down"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

tun\_type: optional "cfd\_tunnel"or "warp\_connector"or "warp"or 4 more

The type of tunnel.

</summary>

One of the following:

"cfd\_tunnel"

<a href="#">Link to this property</a>

"warp\_connector"

<a href="#">Link to this property</a>

"warp"

<a href="#">Link to this property</a>

"magic"

<a href="#">Link to this property</a>

"ip\_sec"

<a href="#">Link to this property</a>

"gre"

<a href="#">Link to this property</a>

"cni"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.tunnels.warp_connector%20%3E%20(model)%20warp_connector_get_response%20%3E%20(schema)>)

<details>

<summary>

WARPConnectorCreateResponse object {id, account\_tag, connections, 8 more }

A Warp Connector Tunnel that connects your origin to Cloudflare’s edge.

</summary>

id: optional string

UUID of the tunnel.

formatuuid

maxLength36

<a href="#">Link to this property</a>

account\_tag: optional string

Cloudflare account ID

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

Deprecatedconnections: optional array of object {id, client\_id, client\_version, 5 more }

This field will start returning an empty array. To fetch the connections of a given tunnel, please use the dedicated endpoint <code>/accounts/{account_id}/{tunnel_type}/{tunnel_id}/connections</code>

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

conns\_active\_at: optional string

Timestamp of when the tunnel established at least one connection to Cloudflare’s edge. If <code>null</code>, the tunnel is inactive.

formatdate-time

<a href="#">Link to this property</a>

conns\_inactive\_at: optional string

Timestamp of when the tunnel became inactive (no connections to Cloudflare’s edge). If <code>null</code>, the tunnel is active.

formatdate-time

<a href="#">Link to this property</a>

created\_at: optional string

Timestamp of when the resource was created.

formatdate-time

<a href="#">Link to this property</a>

deleted\_at: optional string

Timestamp of when the resource was deleted. If <code>null</code>, the resource has not been deleted.

formatdate-time

<a href="#">Link to this property</a>

metadata: optional unknown

Metadata associated with the tunnel.

<a href="#">Link to this property</a>

name: optional string

A user-friendly name for a tunnel.

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "inactive"or "degraded"or "healthy"or "down"

The status of the tunnel. Valid values are <code>inactive</code> (tunnel has never been run), <code>degraded</code> (tunnel is active and able to serve traffic but in an unhealthy state), <code>healthy</code> (tunnel is active and able to serve traffic), or <code>down</code> (tunnel can not serve traffic as it has no connections to the Cloudflare Edge).

</summary>

One of the following:

"inactive"

<a href="#">Link to this property</a>

"degraded"

<a href="#">Link to this property</a>

"healthy"

<a href="#">Link to this property</a>

"down"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

tun\_type: optional "cfd\_tunnel"or "warp\_connector"or "warp"or 4 more

The type of tunnel.

</summary>

One of the following:

"cfd\_tunnel"

<a href="#">Link to this property</a>

"warp\_connector"

<a href="#">Link to this property</a>

"warp"

<a href="#">Link to this property</a>

"magic"

<a href="#">Link to this property</a>

"ip\_sec"

<a href="#">Link to this property</a>

"gre"

<a href="#">Link to this property</a>

"cni"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.tunnels.warp_connector%20%3E%20(model)%20warp_connector_create_response%20%3E%20(schema)>)

<details>

<summary>

WARPConnectorEditResponse object {id, account\_tag, connections, 8 more }

A Warp Connector Tunnel that connects your origin to Cloudflare’s edge.

</summary>

id: optional string

UUID of the tunnel.

formatuuid

maxLength36

<a href="#">Link to this property</a>

account\_tag: optional string

Cloudflare account ID

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

Deprecatedconnections: optional array of object {id, client\_id, client\_version, 5 more }

This field will start returning an empty array. To fetch the connections of a given tunnel, please use the dedicated endpoint <code>/accounts/{account_id}/{tunnel_type}/{tunnel_id}/connections</code>

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

conns\_active\_at: optional string

Timestamp of when the tunnel established at least one connection to Cloudflare’s edge. If <code>null</code>, the tunnel is inactive.

formatdate-time

<a href="#">Link to this property</a>

conns\_inactive\_at: optional string

Timestamp of when the tunnel became inactive (no connections to Cloudflare’s edge). If <code>null</code>, the tunnel is active.

formatdate-time

<a href="#">Link to this property</a>

created\_at: optional string

Timestamp of when the resource was created.

formatdate-time

<a href="#">Link to this property</a>

deleted\_at: optional string

Timestamp of when the resource was deleted. If <code>null</code>, the resource has not been deleted.

formatdate-time

<a href="#">Link to this property</a>

metadata: optional unknown

Metadata associated with the tunnel.

<a href="#">Link to this property</a>

name: optional string

A user-friendly name for a tunnel.

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "inactive"or "degraded"or "healthy"or "down"

The status of the tunnel. Valid values are <code>inactive</code> (tunnel has never been run), <code>degraded</code> (tunnel is active and able to serve traffic but in an unhealthy state), <code>healthy</code> (tunnel is active and able to serve traffic), or <code>down</code> (tunnel can not serve traffic as it has no connections to the Cloudflare Edge).

</summary>

One of the following:

"inactive"

<a href="#">Link to this property</a>

"degraded"

<a href="#">Link to this property</a>

"healthy"

<a href="#">Link to this property</a>

"down"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

tun\_type: optional "cfd\_tunnel"or "warp\_connector"or "warp"or 4 more

The type of tunnel.

</summary>

One of the following:

"cfd\_tunnel"

<a href="#">Link to this property</a>

"warp\_connector"

<a href="#">Link to this property</a>

"warp"

<a href="#">Link to this property</a>

"magic"

<a href="#">Link to this property</a>

"ip\_sec"

<a href="#">Link to this property</a>

"gre"

<a href="#">Link to this property</a>

"cni"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.tunnels.warp_connector%20%3E%20(model)%20warp_connector_edit_response%20%3E%20(schema)>)

<details>

<summary>

WARPConnectorDeleteResponse object {id, account\_tag, connections, 8 more }

A Warp Connector Tunnel that connects your origin to Cloudflare’s edge.

</summary>

id: optional string

UUID of the tunnel.

formatuuid

maxLength36

<a href="#">Link to this property</a>

account\_tag: optional string

Cloudflare account ID

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

Deprecatedconnections: optional array of object {id, client\_id, client\_version, 5 more }

This field will start returning an empty array. To fetch the connections of a given tunnel, please use the dedicated endpoint <code>/accounts/{account_id}/{tunnel_type}/{tunnel_id}/connections</code>

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

conns\_active\_at: optional string

Timestamp of when the tunnel established at least one connection to Cloudflare’s edge. If <code>null</code>, the tunnel is inactive.

formatdate-time

<a href="#">Link to this property</a>

conns\_inactive\_at: optional string

Timestamp of when the tunnel became inactive (no connections to Cloudflare’s edge). If <code>null</code>, the tunnel is active.

formatdate-time

<a href="#">Link to this property</a>

created\_at: optional string

Timestamp of when the resource was created.

formatdate-time

<a href="#">Link to this property</a>

deleted\_at: optional string

Timestamp of when the resource was deleted. If <code>null</code>, the resource has not been deleted.

formatdate-time

<a href="#">Link to this property</a>

metadata: optional unknown

Metadata associated with the tunnel.

<a href="#">Link to this property</a>

name: optional string

A user-friendly name for a tunnel.

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "inactive"or "degraded"or "healthy"or "down"

The status of the tunnel. Valid values are <code>inactive</code> (tunnel has never been run), <code>degraded</code> (tunnel is active and able to serve traffic but in an unhealthy state), <code>healthy</code> (tunnel is active and able to serve traffic), or <code>down</code> (tunnel can not serve traffic as it has no connections to the Cloudflare Edge).

</summary>

One of the following:

"inactive"

<a href="#">Link to this property</a>

"degraded"

<a href="#">Link to this property</a>

"healthy"

<a href="#">Link to this property</a>

"down"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

tun\_type: optional "cfd\_tunnel"or "warp\_connector"or "warp"or 4 more

The type of tunnel.

</summary>

One of the following:

"cfd\_tunnel"

<a href="#">Link to this property</a>

"warp\_connector"

<a href="#">Link to this property</a>

"warp"

<a href="#">Link to this property</a>

"magic"

<a href="#">Link to this property</a>

"ip\_sec"

<a href="#">Link to this property</a>

"gre"

<a href="#">Link to this property</a>

"cni"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.tunnels.warp_connector%20%3E%20(model)%20warp_connector_delete_response%20%3E%20(schema)>)

#### TunnelsWARP ConnectorToken

##### [Get a Warp Connector Tunnel token](https://developers.cloudflare.com/api/resources/zero_trust/subresources/tunnels/subresources/warp_connector/subresources/token/methods/get)

GET/accounts/{account\_id}/warp\_connector/{tunnel\_id}/token

##### ModelsExpand Collapse

TokenGetResponse = string

The Tunnel Token is used as a mechanism to authenticate the operation of a tunnel.

[Link to this property](#)%20zero_trust.tunnels.warp_connector.token%20%3E%20(model)%20token_get_response%20%3E%20(schema)>)

#### TunnelsWARP ConnectorConnections

##### [List WARP Connector Tunnel connections](https://developers.cloudflare.com/api/resources/zero_trust/subresources/tunnels/subresources/warp_connector/subresources/connections/methods/get)

GET/accounts/{account\_id}/warp\_connector/{tunnel\_id}/connections

##### ModelsExpand Collapse

<details>

<summary>

ConnectionGetResponse object {id, arch, conns, 4 more }

A WARP Connector client that maintains a connection to a Cloudflare data center.

</summary>

id: optional string

UUID of the Cloudflare Tunnel connector.

formatuuid

maxLength36

<a href="#">Link to this property</a>

arch: optional string

The cloudflared OS architecture used to establish this connection.

<a href="#">Link to this property</a>

<details>

<summary>

conns: optional array of object {id, client\_id, client\_version, 3 more }

The WARP Connector Tunnel connections between your origin and Cloudflare’s edge.

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

opened\_at: optional string

Timestamp of when the connection was established.

formatdate-time

<a href="#">Link to this property</a>

origin\_ip: optional string

The public IP address of the host running WARP Connector.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

features: optional array of string

Features enabled for the Cloudflare Tunnel.

<a href="#">Link to this property</a>

<details>

<summary>

ha\_status: optional "offline"or "passive"or "active"

The HA status of a WARP Connector client.

</summary>

One of the following:

"offline"

<a href="#">Link to this property</a>

"passive"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

run\_at: optional string

Timestamp of when the tunnel connection was started.

formatdate-time

<a href="#">Link to this property</a>

version: optional string

The cloudflared version used to establish this connection.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.tunnels.warp_connector.connections%20%3E%20(model)%20connection_get_response%20%3E%20(schema)>)

#### TunnelsWARP ConnectorConnectors

##### [Get WARP Connector Tunnel connector](https://developers.cloudflare.com/api/resources/zero_trust/subresources/tunnels/subresources/warp_connector/subresources/connectors/methods/get)

GET/accounts/{account\_id}/warp\_connector/{tunnel\_id}/connectors/{connector\_id}

##### ModelsExpand Collapse

<details>

<summary>

ConnectorGetResponse object {id, arch, conns, 4 more }

A WARP Connector client that maintains a connection to a Cloudflare data center.

</summary>

id: optional string

UUID of the Cloudflare Tunnel connector.

formatuuid

maxLength36

<a href="#">Link to this property</a>

arch: optional string

The cloudflared OS architecture used to establish this connection.

<a href="#">Link to this property</a>

<details>

<summary>

conns: optional array of object {id, client\_id, client\_version, 3 more }

The WARP Connector Tunnel connections between your origin and Cloudflare’s edge.

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

opened\_at: optional string

Timestamp of when the connection was established.

formatdate-time

<a href="#">Link to this property</a>

origin\_ip: optional string

The public IP address of the host running WARP Connector.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

features: optional array of string

Features enabled for the Cloudflare Tunnel.

<a href="#">Link to this property</a>

<details>

<summary>

ha\_status: optional "offline"or "passive"or "active"

The HA status of a WARP Connector client.

</summary>

One of the following:

"offline"

<a href="#">Link to this property</a>

"passive"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

run\_at: optional string

Timestamp of when the tunnel connection was started.

formatdate-time

<a href="#">Link to this property</a>

version: optional string

The cloudflared version used to establish this connection.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.tunnels.warp_connector.connectors%20%3E%20(model)%20connector_get_response%20%3E%20(schema)>)

#### TunnelsWARP ConnectorFailover

##### [Trigger a manual failover for a WARP Connector Tunnel](https://developers.cloudflare.com/api/resources/zero_trust/subresources/tunnels/subresources/warp_connector/subresources/failover/methods/update)

PUT/accounts/{account\_id}/warp\_connector/{tunnel\_id}/failover

##### ModelsExpand Collapse

FailoverUpdateResponse = unknown

[Link to this property](#)%20zero_trust.tunnels.warp_connector.failover%20%3E%20(model)%20failover_update_response%20%3E%20(schema)>)

#### TunnelsWARP ConnectorConfigurations

##### [Get WARP Connector HA configuration](https://developers.cloudflare.com/api/resources/zero_trust/subresources/tunnels/subresources/warp_connector/subresources/configurations/methods/get)

GET/accounts/{account\_id}/warp\_connector/{tunnel\_id}/configurations

##### [Update WARP Connector HA configuration](https://developers.cloudflare.com/api/resources/zero_trust/subresources/tunnels/subresources/warp_connector/subresources/configurations/methods/update)

PUT/accounts/{account\_id}/warp\_connector/{tunnel\_id}/configurations

##### ModelsExpand Collapse

<details>

<summary>

ConfigurationGetResponse object {configuration\_version, created\_at, ha\_mode, 3 more }

</summary>

configuration\_version: number

Monotonically increasing configuration version, incremented on each PUT.

<a href="#">Link to this property</a>

created\_at: string

Timestamp of when the resource was created.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

ha\_mode: "none"or "disabled"or "aws"or "local"

High-availability mode for the WARP Connector tunnel. <code>none</code> means HA is enabled but no provider is configured yet (newly created tunnels default to this). <code>disabled</code> means HA is explicitly turned off. <code>aws</code> uses AWS ENI move for failover. <code>local</code> uses virtual IPs (VIPs) on the local interface.

</summary>

One of the following:

"none"

<a href="#">Link to this property</a>

"disabled"

<a href="#">Link to this property</a>

"aws"

<a href="#">Link to this property</a>

"local"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

tunnel\_id: string

UUID of the tunnel.

formatuuid

maxLength36

<a href="#">Link to this property</a>

<details>

<summary>

config: optional object {fnr\_id } or object {vips, vips\_previous }

Provider-specific configuration. Present for <code>aws</code> and <code>local</code> modes.

</summary>

One of the following:

<details>

<summary>

TunnelMeshAwsConfig object {fnr\_id }

</summary>

fnr\_id: string

Floating Network Resource ID — the secondary ENI that is moved between nodes on failover.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

TunnelMeshLocalConfig object {vips, vips\_previous }

</summary>

<details>

<summary>

vips: array of object {address }

VIPs to assign on the CloudflareWARP interface.

</summary>

address: string

Virtual IP address (IPv4 or IPv6).

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

vips\_previous: optional array of object {address }

VIPs to clean up on demotion or version drift.

</summary>

address: string

Virtual IP address (IPv4 or IPv6).

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated\_at: optional string

Timestamp of the last update. Null if never updated.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.tunnels.warp_connector.configurations%20%3E%20(model)%20configuration_get_response%20%3E%20(schema)>)

<details>

<summary>

ConfigurationUpdateResponse object {configuration\_version, created\_at, ha\_mode, 3 more }

</summary>

configuration\_version: number

Monotonically increasing configuration version, incremented on each PUT.

<a href="#">Link to this property</a>

created\_at: string

Timestamp of when the resource was created.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

ha\_mode: "none"or "disabled"or "aws"or "local"

High-availability mode for the WARP Connector tunnel. <code>none</code> means HA is enabled but no provider is configured yet (newly created tunnels default to this). <code>disabled</code> means HA is explicitly turned off. <code>aws</code> uses AWS ENI move for failover. <code>local</code> uses virtual IPs (VIPs) on the local interface.

</summary>

One of the following:

"none"

<a href="#">Link to this property</a>

"disabled"

<a href="#">Link to this property</a>

"aws"

<a href="#">Link to this property</a>

"local"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

tunnel\_id: string

UUID of the tunnel.

formatuuid

maxLength36

<a href="#">Link to this property</a>

<details>

<summary>

config: optional object {fnr\_id } or object {vips, vips\_previous }

Provider-specific configuration. Present for <code>aws</code> and <code>local</code> modes.

</summary>

One of the following:

<details>

<summary>

TunnelMeshAwsConfig object {fnr\_id }

</summary>

fnr\_id: string

Floating Network Resource ID — the secondary ENI that is moved between nodes on failover.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

TunnelMeshLocalConfig object {vips, vips\_previous }

</summary>

<details>

<summary>

vips: array of object {address }

VIPs to assign on the CloudflareWARP interface.

</summary>

address: string

Virtual IP address (IPv4 or IPv6).

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

vips\_previous: optional array of object {address }

VIPs to clean up on demotion or version drift.

</summary>

address: string

Virtual IP address (IPv4 or IPv6).

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated\_at: optional string

Timestamp of the last update. Null if never updated.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.tunnels.warp_connector.configurations%20%3E%20(model)%20configuration_update_response%20%3E%20(schema)>)