---
title: Create Pool
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Load Balancers](https://developers.cloudflare.com/api/resources/load_balancers)

[Pools](https://developers.cloudflare.com/api/resources/load_balancers/subresources/pools)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Create Pool

POST/accounts/{account\_id}/load\_balancers/pools

Create a new pool.

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

`Load Balancing: Monitors and Pools Write`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier.

maxLength32

[Link to this property](#)%20load_balancers.pools%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

name: string

A short name (tag) for the pool. Only alphanumeric characters, hyphens, and underscores are allowed.

[Link to this property](#)%20load_balancers.pools%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20name%20%3E%20(schema)>)

<details>

<summary>

origins: array of <a href="https://developers.cloudflare.com/api/resources/load_balancers#(resource)%20load_balancers%20%3E%20(model)%20origin%20%3E%20(schema)">Origin</a> { address, disabled\_at, enabled, 6 more }

The list of origins within this pool. Traffic directed at this pool is balanced across all currently healthy origins, provided the pool itself is healthy.

</summary>

address: optional string

The IP address (IPv4 or IPv6) of the origin, or its publicly addressable hostname. Hostnames entered here should resolve directly to the origin, and not be a hostname proxied by Cloudflare. To set an internal/reserved address, virtual\_network\_id must also be set.

<a href="#">Link to this property</a>

disabled\_at: optional string

This field shows up only if the origin is disabled. This field is set with the time the origin was disabled.

formatdate-time

<a href="#">Link to this property</a>

enabled: optional boolean

Whether to enable (the default) this origin within the pool. Disabled origins will not receive traffic and are excluded from health checks. The origin will only be disabled for the current pool.

<a href="#">Link to this property</a>

flatten\_cname: optional boolean

Whether to flatten CNAME records for this origin, resolving them to A/AAAA records before returning to the client. When true (the default), the director resolves CNAME addresses to their underlying A/AAAA records. When false, the origin address is returned as a raw CNAME record without resolution. This setting mirrors the DNS API record flatten\_cname setting.

<a href="#">Link to this property</a>

<details>

<summary>

header: optional <a href="https://developers.cloudflare.com/api/resources/load_balancers#(resource)%20load_balancers%20%3E%20(model)%20header%20%3E%20(schema)">Header</a> { Host }

The request header is used to pass additional information with an HTTP request. Currently supported header is ‘Host’.

</summary>

Host: optional array of <a href="https://developers.cloudflare.com/api/resources/load_balancers#(resource)%20load_balancers%20%3E%20(model)%20host%20%3E%20(schema)">Host</a>

The ‘Host’ header allows to override the hostname set in the HTTP request. Current support is 1 ‘Host’ header override per origin.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: optional string

A human-identifiable name for the origin.

<a href="#">Link to this property</a>

port: optional number

The port for upstream connections. A value of 0 means the default port for the protocol will be used.

<a href="#">Link to this property</a>

virtual\_network\_id: optional string

The virtual network subnet ID the origin belongs in. Virtual network must also belong to the account.

<a href="#">Link to this property</a>

weight: optional number

The weight of this origin relative to other origins in the pool. Based on the configured weight the total traffic is distributed among origins within the pool.

- <code>origin_steering.policy="least_outstanding_requests"</code>: Use weight to scale the origin’s outstanding requests.
- <code>origin_steering.policy="least_connections"</code>: Use weight to scale the origin’s open connections.

maximum1

minimum0

multipleOf0.01

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20load_balancers.pools%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20origins%20%3E%20(schema)>)

description: optional string

A human-readable description of the pool.

[Link to this property](#)%20load_balancers.pools%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20description%20%3E%20(schema)>)

enabled: optional boolean

Whether to enable (the default) or disable this pool. Disabled pools will not receive traffic and are excluded from health checks. Disabling a pool will cause any load balancers using it to failover to the next pool (if any).

[Link to this property](#)%20load_balancers.pools%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20enabled%20%3E%20(schema)>)

latitude: optional number

The latitude of the data center containing the origins used in this pool in decimal degrees. If this is set, longitude must also be set.

[Link to this property](#)%20load_balancers.pools%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20latitude%20%3E%20(schema)>)

<details>

<summary>

load\_shedding: optional <a href="https://developers.cloudflare.com/api/resources/load_balancers#(resource)%20load_balancers%20%3E%20(model)%20load_shedding%20%3E%20(schema)">LoadShedding</a> { default\_percent, default\_policy, session\_percent, session\_policy }

Configures load shedding policies and percentages for the pool.

</summary>

default\_percent: optional number

The percent of traffic to shed from the pool, according to the default policy. Applies to new sessions and traffic without session affinity.

maximum100

minimum0

<a href="#">Link to this property</a>

<details>

<summary>

default\_policy: optional "random"or "hash"

The default policy to use when load shedding. A random policy randomly sheds a given percent of requests. A hash policy computes a hash over the CF-Connecting-IP address and sheds all requests originating from a percent of IPs.

</summary>

One of the following:

"random"

<a href="#">Link to this property</a>

"hash"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

session\_percent: optional number

The percent of existing sessions to shed from the pool, according to the session policy.

maximum100

minimum0

<a href="#">Link to this property</a>

session\_policy: optional "hash"

Only the hash policy is supported for existing sessions (to avoid exponential decay).

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20load_balancers.pools%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20load_shedding%20%3E%20(schema)>)

longitude: optional number

The longitude of the data center containing the origins used in this pool in decimal degrees. If this is set, latitude must also be set.

[Link to this property](#)%20load_balancers.pools%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20longitude%20%3E%20(schema)>)

minimum\_origins: optional number

The minimum number of origins that must be healthy for this pool to serve traffic. If the number of healthy origins falls below this number, the pool will be marked unhealthy and will failover to the next available pool.

[Link to this property](#)%20load_balancers.pools%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20minimum_origins%20%3E%20(schema)>)

monitor: optional string

The ID of the Monitor to use for checking the health of origins within this pool.

[Link to this property](#)%20load_balancers.pools%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20monitor%20%3E%20(schema)>)

monitor\_group: optional string

The ID of the Monitor Group to use for checking the health of origins within this pool.

[Link to this property](#)%20load_balancers.pools%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20monitor_group%20%3E%20(schema)>)

notification\_email: optional string

This field is now deprecated. It has been moved to Cloudflare’s Centralized Notification service https://developers.cloudflare.com/fundamentals/notifications/. The email address to send health status notifications to. This can be an individual mailbox or a mailing list. Multiple emails can be supplied as a comma delimited list.

[Link to this property](#)%20load_balancers.pools%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20notification_email%20%3E%20(schema)>)

<details>

<summary>

notification\_filter: optional <a href="https://developers.cloudflare.com/api/resources/load_balancers#(resource)%20load_balancers%20%3E%20(model)%20notification_filter%20%3E%20(schema)">NotificationFilter</a> { origin, pool }

Filter pool and origin health notifications by resource type or health status. Use null to reset.

</summary>

<details>

<summary>

origin: optional <a href="https://developers.cloudflare.com/api/resources/load_balancers#(resource)%20load_balancers%20%3E%20(model)%20filter_options%20%3E%20(schema)">FilterOptions</a> { disable, healthy }

Filter options for a particular resource type (pool or origin). Use null to reset.

</summary>

disable: optional boolean

If set true, disable notifications for this type of resource (pool or origin).

<a href="#">Link to this property</a>

healthy: optional boolean

If present, send notifications only for this health status (e.g. false for only DOWN events). Use null to reset (all events).

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

pool: optional <a href="https://developers.cloudflare.com/api/resources/load_balancers#(resource)%20load_balancers%20%3E%20(model)%20filter_options%20%3E%20(schema)">FilterOptions</a> { disable, healthy }

Filter options for a particular resource type (pool or origin). Use null to reset.

</summary>

disable: optional boolean

If set true, disable notifications for this type of resource (pool or origin).

<a href="#">Link to this property</a>

healthy: optional boolean

If present, send notifications only for this health status (e.g. false for only DOWN events). Use null to reset (all events).

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20load_balancers.pools%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20notification_filter%20%3E%20(schema)>)

<details>

<summary>

origin\_steering: optional <a href="https://developers.cloudflare.com/api/resources/load_balancers#(resource)%20load_balancers%20%3E%20(model)%20origin_steering%20%3E%20(schema)">OriginSteering</a> { policy }

Configures origin steering for the pool. Controls how origins are selected for new sessions and traffic without session affinity.

</summary>

<details>

<summary>

policy: optional "random"or "hash"or "least\_outstanding\_requests"or "least\_connections"

The type of origin steering policy to use.

- <code>"random"</code>: Select an origin randomly.
- <code>"hash"</code>: Select an origin by computing a hash over the CF-Connecting-IP address.
- <code>"least_outstanding_requests"</code>: Select an origin by taking into consideration origin weights, as well as each origin’s number of outstanding requests. Origins with more pending requests are weighted proportionately less relative to others.
- <code>"least_connections"</code>: Select an origin by taking into consideration origin weights, as well as each origin’s number of open connections. Origins with more open connections are weighted proportionately less relative to others. Supported for HTTP/1 and HTTP/2 connections.

</summary>

One of the following:

"random"

<a href="#">Link to this property</a>

"hash"

<a href="#">Link to this property</a>

"least\_outstanding\_requests"

<a href="#">Link to this property</a>

"least\_connections"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20load_balancers.pools%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20origin_steering%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20response_info%20%3E%20(schema)">ResponseInfo</a> { code, message, documentation\_url, source }

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

[Link to this property](#)%20load_balancers.pools%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20response_info%20%3E%20(schema)">ResponseInfo</a> { code, message, documentation\_url, source }

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

[Link to this property](#)%20load_balancers.pools%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: <a href="https://developers.cloudflare.com/api/resources/load_balancers#(resource)%20load_balancers.pools%20%3E%20(model)%20pool%20%3E%20(schema)">Pool</a> { id, check\_regions, created\_on, 17 more }

</summary>

id: optional string

<a href="#">Link to this property</a>

<details>

<summary>

check\_regions: optional array of <a href="https://developers.cloudflare.com/api/resources/load_balancers#(resource)%20load_balancers%20%3E%20(model)%20check_region%20%3E%20(schema)">CheckRegion</a>

A list of regions from which to run health checks. Null means every Cloudflare data center.

</summary>

One of the following:

"WNAM"

<a href="#">Link to this property</a>

"ENAM"

<a href="#">Link to this property</a>

"WEU"

<a href="#">Link to this property</a>

"EEU"

<a href="#">Link to this property</a>

"NSAM"

<a href="#">Link to this property</a>

"SSAM"

<a href="#">Link to this property</a>

"OC"

<a href="#">Link to this property</a>

"ME"

<a href="#">Link to this property</a>

"NAF"

<a href="#">Link to this property</a>

"SAF"

<a href="#">Link to this property</a>

"SAS"

<a href="#">Link to this property</a>

"SEAS"

<a href="#">Link to this property</a>

"NEAS"

<a href="#">Link to this property</a>

"CHINA"

<a href="#">Link to this property</a>

"ALL\_REGIONS"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_on: optional string

<a href="#">Link to this property</a>

description: optional string

A human-readable description of the pool.

<a href="#">Link to this property</a>

disabled\_at: optional string

This field shows up only if the pool is disabled. This field is set with the time the pool was disabled at.

formatdate-time

<a href="#">Link to this property</a>

enabled: optional boolean

Whether to enable (the default) or disable this pool. Disabled pools will not receive traffic and are excluded from health checks. Disabling a pool will cause any load balancers using it to failover to the next pool (if any).

<a href="#">Link to this property</a>

<details>

<summary>

health\_sources: optional array of "local"or "regional"or "global"

A list of health sources, ordered from highest to lowest priority, used to evaluate individual origin health and overall pool health. The load balancer uses the first source that has data and falls back to the next. Currently accepted values are null or the exact array \[“regional”, “global”]; any other combination is rejected. Null (the default) behaves like \[“local”, “global”]. \[“regional”, “global”] makes each region steer on its own health, falling back to the global decision when a region has no fresh data. Setting regional requires at least one region in check\_regions.

</summary>

One of the following:

"local"

<a href="#">Link to this property</a>

"regional"

<a href="#">Link to this property</a>

"global"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

latitude: optional number

The latitude of the data center containing the origins used in this pool in decimal degrees. If this is set, longitude must also be set.

<a href="#">Link to this property</a>

<details>

<summary>

load\_shedding: optional <a href="https://developers.cloudflare.com/api/resources/load_balancers#(resource)%20load_balancers%20%3E%20(model)%20load_shedding%20%3E%20(schema)">LoadShedding</a> { default\_percent, default\_policy, session\_percent, session\_policy }

Configures load shedding policies and percentages for the pool.

</summary>

default\_percent: optional number

The percent of traffic to shed from the pool, according to the default policy. Applies to new sessions and traffic without session affinity.

maximum100

minimum0

<a href="#">Link to this property</a>

<details>

<summary>

default\_policy: optional "random"or "hash"

The default policy to use when load shedding. A random policy randomly sheds a given percent of requests. A hash policy computes a hash over the CF-Connecting-IP address and sheds all requests originating from a percent of IPs.

</summary>

One of the following:

"random"

<a href="#">Link to this property</a>

"hash"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

session\_percent: optional number

The percent of existing sessions to shed from the pool, according to the session policy.

maximum100

minimum0

<a href="#">Link to this property</a>

session\_policy: optional "hash"

Only the hash policy is supported for existing sessions (to avoid exponential decay).

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

longitude: optional number

The longitude of the data center containing the origins used in this pool in decimal degrees. If this is set, latitude must also be set.

<a href="#">Link to this property</a>

minimum\_origins: optional number

The minimum number of origins that must be healthy for this pool to serve traffic. If the number of healthy origins falls below this number, the pool will be marked unhealthy and will failover to the next available pool.

<a href="#">Link to this property</a>

modified\_on: optional string

<a href="#">Link to this property</a>

monitor: optional string

The ID of the Monitor to use for checking the health of origins within this pool.

<a href="#">Link to this property</a>

monitor\_group: optional string

The ID of the Monitor Group to use for checking the health of origins within this pool.

<a href="#">Link to this property</a>

name: optional string

A short name (tag) for the pool. Only alphanumeric characters, hyphens, and underscores are allowed.

<a href="#">Link to this property</a>

networks: optional array of string

List of networks where Load Balancer or Pool is enabled.

<a href="#">Link to this property</a>

notification\_email: optional string

This field is now deprecated. It has been moved to Cloudflare’s Centralized Notification service <a href="https://developers.cloudflare.com/fundamentals/notifications/">https://developers.cloudflare.com/fundamentals/notifications/</a>. The email address to send health status notifications to. This can be an individual mailbox or a mailing list. Multiple emails can be supplied as a comma delimited list.

<a href="#">Link to this property</a>

<details>

<summary>

notification\_filter: optional <a href="https://developers.cloudflare.com/api/resources/load_balancers#(resource)%20load_balancers%20%3E%20(model)%20notification_filter%20%3E%20(schema)">NotificationFilter</a> { origin, pool }

Filter pool and origin health notifications by resource type or health status. Use null to reset.

</summary>

<details>

<summary>

origin: optional <a href="https://developers.cloudflare.com/api/resources/load_balancers#(resource)%20load_balancers%20%3E%20(model)%20filter_options%20%3E%20(schema)">FilterOptions</a> { disable, healthy }

Filter options for a particular resource type (pool or origin). Use null to reset.

</summary>

disable: optional boolean

If set true, disable notifications for this type of resource (pool or origin).

<a href="#">Link to this property</a>

healthy: optional boolean

If present, send notifications only for this health status (e.g. false for only DOWN events). Use null to reset (all events).

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

pool: optional <a href="https://developers.cloudflare.com/api/resources/load_balancers#(resource)%20load_balancers%20%3E%20(model)%20filter_options%20%3E%20(schema)">FilterOptions</a> { disable, healthy }

Filter options for a particular resource type (pool or origin). Use null to reset.

</summary>

disable: optional boolean

If set true, disable notifications for this type of resource (pool or origin).

<a href="#">Link to this property</a>

healthy: optional boolean

If present, send notifications only for this health status (e.g. false for only DOWN events). Use null to reset (all events).

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

origin\_steering: optional <a href="https://developers.cloudflare.com/api/resources/load_balancers#(resource)%20load_balancers%20%3E%20(model)%20origin_steering%20%3E%20(schema)">OriginSteering</a> { policy }

Configures origin steering for the pool. Controls how origins are selected for new sessions and traffic without session affinity.

</summary>

<details>

<summary>

policy: optional "random"or "hash"or "least\_outstanding\_requests"or "least\_connections"

The type of origin steering policy to use.

- <code>"random"</code>: Select an origin randomly.
- <code>"hash"</code>: Select an origin by computing a hash over the CF-Connecting-IP address.
- <code>"least_outstanding_requests"</code>: Select an origin by taking into consideration origin weights, as well as each origin’s number of outstanding requests. Origins with more pending requests are weighted proportionately less relative to others.
- <code>"least_connections"</code>: Select an origin by taking into consideration origin weights, as well as each origin’s number of open connections. Origins with more open connections are weighted proportionately less relative to others. Supported for HTTP/1 and HTTP/2 connections.

</summary>

One of the following:

"random"

<a href="#">Link to this property</a>

"hash"

<a href="#">Link to this property</a>

"least\_outstanding\_requests"

<a href="#">Link to this property</a>

"least\_connections"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

origins: optional array of <a href="https://developers.cloudflare.com/api/resources/load_balancers#(resource)%20load_balancers%20%3E%20(model)%20origin%20%3E%20(schema)">Origin</a> { address, disabled\_at, enabled, 6 more }

The list of origins within this pool. Traffic directed at this pool is balanced across all currently healthy origins, provided the pool itself is healthy.

</summary>

address: optional string

The IP address (IPv4 or IPv6) of the origin, or its publicly addressable hostname. Hostnames entered here should resolve directly to the origin, and not be a hostname proxied by Cloudflare. To set an internal/reserved address, virtual\_network\_id must also be set.

<a href="#">Link to this property</a>

disabled\_at: optional string

This field shows up only if the origin is disabled. This field is set with the time the origin was disabled.

formatdate-time

<a href="#">Link to this property</a>

enabled: optional boolean

Whether to enable (the default) this origin within the pool. Disabled origins will not receive traffic and are excluded from health checks. The origin will only be disabled for the current pool.

<a href="#">Link to this property</a>

flatten\_cname: optional boolean

Whether to flatten CNAME records for this origin, resolving them to A/AAAA records before returning to the client. When true (the default), the director resolves CNAME addresses to their underlying A/AAAA records. When false, the origin address is returned as a raw CNAME record without resolution. This setting mirrors the DNS API record flatten\_cname setting.

<a href="#">Link to this property</a>

<details>

<summary>

header: optional <a href="https://developers.cloudflare.com/api/resources/load_balancers#(resource)%20load_balancers%20%3E%20(model)%20header%20%3E%20(schema)">Header</a> { Host }

The request header is used to pass additional information with an HTTP request. Currently supported header is ‘Host’.

</summary>

Host: optional array of <a href="https://developers.cloudflare.com/api/resources/load_balancers#(resource)%20load_balancers%20%3E%20(model)%20host%20%3E%20(schema)">Host</a>

The ‘Host’ header allows to override the hostname set in the HTTP request. Current support is 1 ‘Host’ header override per origin.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: optional string

A human-identifiable name for the origin.

<a href="#">Link to this property</a>

port: optional number

The port for upstream connections. A value of 0 means the default port for the protocol will be used.

<a href="#">Link to this property</a>

virtual\_network\_id: optional string

The virtual network subnet ID the origin belongs in. Virtual network must also belong to the account.

<a href="#">Link to this property</a>

weight: optional number

The weight of this origin relative to other origins in the pool. Based on the configured weight the total traffic is distributed among origins within the pool.

- <code>origin_steering.policy="least_outstanding_requests"</code>: Use weight to scale the origin’s outstanding requests.
- <code>origin_steering.policy="least_connections"</code>: Use weight to scale the origin’s open connections.

maximum1

minimum0

multipleOf0.01

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20load_balancers.pools%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20load_balancers.pools%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Create Pool

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/load_balancers/pools \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "primary-dc-1",
          "origins": [
            {}
          ],
          "description": "Primary data center - Provider XYZ",
          "notification_email": "someone@example.com,sometwo@example.com",
          "notification_filter": {
            "origin": {
              "disable": true
            },
            "pool": {
              "healthy": false
            }
          }
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
  "result": {
    "id": "17b5962d775c646f3f9725cbc7a53df4",
    "check_regions": [
      "WEU",
      "ENAM"
    ],
    "created_on": "2014-01-01T05:20:00.12345Z",
    "description": "Primary data center - Provider XYZ",
    "disabled_at": "2019-12-27T18:11:19.117Z",
    "enabled": false,
    "health_sources": [
      "regional",
      "global"
    ],
    "latitude": 0,
    "load_shedding": {
      "default_percent": 0,
      "default_policy": "random",
      "session_percent": 0,
      "session_policy": "hash"
    },
    "longitude": 0,
    "minimum_origins": 0,
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "monitor": "monitor",
    "monitor_group": "monitor_group",
    "name": "primary-dc-1",
    "networks": [
      "string"
    ],
    "notification_email": "someone@example.com,sometwo@example.com",
    "notification_filter": {
      "origin": {
        "disable": true,
        "healthy": true
      },
      "pool": {
        "disable": true,
        "healthy": false
      }
    },
    "origin_steering": {
      "policy": "random"
    },
    "origins": [
      {
        "address": "0.0.0.0",
        "disabled_at": "2019-12-27T18:11:19.117Z",
        "enabled": true,
        "flatten_cname": true,
        "header": {
          "Host": [
            "example.com"
          ]
        },
        "name": "app-server-1",
        "port": 0,
        "virtual_network_id": "a5624d4e-044a-4ff0-b3e1-e2465353d4b4",
        "weight": 0.6
      }
    ]
  },
  "success": true
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
  "result": {
    "id": "17b5962d775c646f3f9725cbc7a53df4",
    "check_regions": [
      "WEU",
      "ENAM"
    ],
    "created_on": "2014-01-01T05:20:00.12345Z",
    "description": "Primary data center - Provider XYZ",
    "disabled_at": "2019-12-27T18:11:19.117Z",
    "enabled": false,
    "health_sources": [
      "regional",
      "global"
    ],
    "latitude": 0,
    "load_shedding": {
      "default_percent": 0,
      "default_policy": "random",
      "session_percent": 0,
      "session_policy": "hash"
    },
    "longitude": 0,
    "minimum_origins": 0,
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "monitor": "monitor",
    "monitor_group": "monitor_group",
    "name": "primary-dc-1",
    "networks": [
      "string"
    ],
    "notification_email": "someone@example.com,sometwo@example.com",
    "notification_filter": {
      "origin": {
        "disable": true,
        "healthy": true
      },
      "pool": {
        "disable": true,
        "healthy": false
      }
    },
    "origin_steering": {
      "policy": "random"
    },
    "origins": [
      {
        "address": "0.0.0.0",
        "disabled_at": "2019-12-27T18:11:19.117Z",
        "enabled": true,
        "flatten_cname": true,
        "header": {
          "Host": [
            "example.com"
          ]
        },
        "name": "app-server-1",
        "port": 0,
        "virtual_network_id": "a5624d4e-044a-4ff0-b3e1-e2465353d4b4",
        "weight": 0.6
      }
    ]
  },
  "success": true
}
```