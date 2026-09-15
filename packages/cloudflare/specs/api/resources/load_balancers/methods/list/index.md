---
title: List account or zone Load Balancers
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Load Balancers](https://developers.cloudflare.com/api/resources/load_balancers)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List account or zone Load Balancers

GET/{accounts\_or\_zones}/{account\_or\_zone\_id}/load\_balancers

List configured account or zone-scoped load balancers.

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

`Load Balancers Account Write``Load Balancers Account Read`

##### P ath ParametersExpand Collapse

account\_id: optional string

The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

[Link to this property](#)%20load_balancers%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

zone\_id: optional string

The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

[Link to this property](#)%20load_balancers%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

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

[Link to this property](#)%20load_balancers%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20load_balancers%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: array of <a href="https://developers.cloudflare.com/api/resources/load_balancers#(resource)%20load_balancers%20%3E%20(model)%20load_balancer%20%3E%20(schema)">LoadBalancer</a> { id, adaptive\_routing, country\_pools, 21 more }

</summary>

id: optional string

<a href="#">Link to this property</a>

<details>

<summary>

adaptive\_routing: optional <a href="https://developers.cloudflare.com/api/resources/load_balancers#(resource)%20load_balancers%20%3E%20(model)%20adaptive_routing%20%3E%20(schema)">AdaptiveRouting</a> { failover\_across\_pools }

Controls features that modify the routing of requests to pools and origins in response to dynamic conditions, such as during the interval between active health monitoring requests. For example, zero-downtime failover occurs immediately when an origin becomes unavailable due to HTTP 521, 522, or 523 response codes. If there is another healthy origin in the same pool, the request is retried once against this alternate origin.

</summary>

failover\_across\_pools: optional boolean

Extends zero-downtime failover of requests to healthy origins from alternate pools, when no healthy alternate exists in the same pool, according to the failover order defined by traffic and origin steering. When set false (the default) zero-downtime failover will only occur between origins within the same pool. See <code>session_affinity_attributes</code> for control over when sessions are broken or reassigned.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

country\_pools: optional map\[array of string]

A mapping of country codes to a list of pool IDs (ordered by their failover priority) for the given country. Any country not explicitly defined will fall back to using the corresponding region\_pool mapping if it exists else to default\_pools.

<a href="#">Link to this property</a>

created\_on: optional string

<a href="#">Link to this property</a>

default\_pools: optional array of <a href="https://developers.cloudflare.com/api/resources/load_balancers#(resource)%20load_balancers%20%3E%20(model)%20default_pools%20%3E%20(schema)">DefaultPools</a>

A list of pool IDs ordered by their failover priority. Pools defined here are used by default, or when region\_pools are not configured for a given region.

<a href="#">Link to this property</a>

description: optional string

Object description.

<a href="#">Link to this property</a>

enabled: optional boolean

Whether to enable (the default) this load balancer.

<a href="#">Link to this property</a>

fallback\_pool: optional string

The pool ID to use when all other pools are detected as unhealthy.

<a href="#">Link to this property</a>

<details>

<summary>

location\_strategy: optional <a href="https://developers.cloudflare.com/api/resources/load_balancers#(resource)%20load_balancers%20%3E%20(model)%20location_strategy%20%3E%20(schema)">LocationStrategy</a> { mode, prefer\_ecs }

Controls location-based steering for non-proxied requests. See <code>steering_policy</code> to learn how steering is affected.

</summary>

<details>

<summary>

mode: optional "pop"or "resolver\_ip"

Determines the authoritative location when ECS is not preferred, does not exist in the request, or its GeoIP lookup is unsuccessful.

- <code>"pop"</code>: Use the Cloudflare PoP location.
- <code>"resolver_ip"</code>: Use the DNS resolver GeoIP location. If the GeoIP lookup is unsuccessful, use the Cloudflare PoP location.

</summary>

One of the following:

"pop"

<a href="#">Link to this property</a>

"resolver\_ip"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

prefer\_ecs: optional "always"or "never"or "proximity"or "geo"

Whether the EDNS Client Subnet (ECS) GeoIP should be preferred as the authoritative location.

- <code>"always"</code>: Always prefer ECS.
- <code>"never"</code>: Never prefer ECS.
- <code>"proximity"</code>: Prefer ECS only when <code>steering_policy="proximity"</code>.
- <code>"geo"</code>: Prefer ECS only when <code>steering_policy="geo"</code>.

</summary>

One of the following:

"always"

<a href="#">Link to this property</a>

"never"

<a href="#">Link to this property</a>

"proximity"

<a href="#">Link to this property</a>

"geo"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

<a href="#">Link to this property</a>

name: optional string

The DNS hostname to associate with your Load Balancer. If this hostname already exists as a DNS record in Cloudflare’s DNS, the Load Balancer will take precedence and the DNS record will not be used.

<a href="#">Link to this property</a>

networks: optional array of string

List of networks where Load Balancer or Pool is enabled.

<a href="#">Link to this property</a>

<details>

<summary>

pool\_sets: optional array of object {disabled, fixed\_response, match, 2 more }

An optional list of pool sets, evaluated in array order with first match wins. Pool sets are independent from the standard steering fields (<code>region_pools</code> / <code>country_pools</code> / <code>pop_pools</code> / <code>default_pools</code> / <code>steering_policy</code> / <code>random_steering</code> / <code>fallback_pool</code> / <code>rules</code>). On a PATCH, an empty array (<code>pool_sets: []</code>) clears all pool sets, while omitting the field leaves existing pool sets unchanged.

</summary>

disabled: optional boolean

Disable this specific pool set. It will no longer be evaluated.

<a href="#">Link to this property</a>

<details>

<summary>

fixed\_response: optional object {content\_type, location, message\_body, status\_code }

A collection of fields used to directly respond to the client instead of routing to a pool. When supplied on a rule, that rule stops further rule evaluation.

</summary>

content\_type: optional string

The http ‘Content-Type’ header to include in the response.

maxLength32

<a href="#">Link to this property</a>

location: optional string

The http ‘Location’ header to include in the response.

maxLength2048

<a href="#">Link to this property</a>

message\_body: optional string

Text to include as the http body.

maxLength1024

<a href="#">Link to this property</a>

status\_code: optional number

The http status code to respond with.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

match: optional object {default, topology }

Determines which requests a pool set applies to. Set <code>topology</code> to match by location or <code>default: true</code> to match all requests; the two are mutually exclusive. A pool set with no <code>match</code> matches all requests.

</summary>

default: optional boolean

When true, matches every request. Cannot be combined with <code>topology</code>.

<a href="#">Link to this property</a>

<details>

<summary>

topology: optional object {countries, pops, regions }

Matches requests by location. Set any combination of <code>pops</code>, <code>countries</code>, and <code>regions</code> (at least one is required); a request matches when its value appears in any populated list (e.g. <code>regions: ["WNAM"]</code> with <code>countries: ["US"]</code> matches a request in either WNAM or the US).

</summary>

countries: optional array of string

A list of ISO 3166-1 alpha-2 country codes. Matches when the request’s country is in this list.

<a href="#">Link to this property</a>

pops: optional array of string

A list of Cloudflare PoP codes. Matches when the request’s PoP is in this list.

<a href="#">Link to this property</a>

regions: optional array of string

A list of Cloudflare region codes (e.g. <code>WNAM</code>, <code>ENAM</code>, <code>WEU</code>). Matches when the request’s region is in this list.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: optional string

A human-readable name for this pool set.

maxLength200

<a href="#">Link to this property</a>

<details>

<summary>

overrides: optional object {fallback\_pool, pool\_default\_weight, pool\_weights, 2 more }

The behavior a pool set applies when its <code>match</code> succeeds. A strict subset of a rule’s <code>overrides</code>: a pool set replaces the topology wholesale with a flat pool list (<code>pools</code>), so only the declarative pool-routing fields plus <code>fallback_pool</code> and <code>steering_policy</code> are settable. All fields are optional.

</summary>

fallback\_pool: optional string

The pool ID to use when all other pools are detected as unhealthy.

<a href="#">Link to this property</a>

pool\_default\_weight: optional number

The default weight for pools not listed in <code>pool_weights</code>. The declarative alternative to <code>random_steering.default_weight</code>; mutually exclusive with <code>random_steering</code>.

maximum1

minimum0

multipleOf0.1

<a href="#">Link to this property</a>

pool\_weights: optional map\[number]

A mapping of pool IDs to custom weights, relative to the other pools. The declarative alternative to <code>random_steering.pool_weights</code>; mutually exclusive with <code>random_steering</code>.

<a href="#">Link to this property</a>

pools: optional array of string

A flat, ordered list of pool IDs to route the matched audience to. Replaces the resolved topology with exactly these pools. Mutually exclusive with <code>fixed_response</code>.

<a href="#">Link to this property</a>

<details>

<summary>

steering\_policy: optional <a href="https://developers.cloudflare.com/api/resources/load_balancers#(resource)%20load_balancers%20%3E%20(model)%20steering_policy%20%3E%20(schema)">SteeringPolicy</a>

Steering Policy for this load balancer.

- <code>"off"</code>: Use <code>default_pools</code>.
- <code>"geo"</code>: Use <code>region_pools</code>/<code>country_pools</code>/<code>pop_pools</code>. For non-proxied requests, the country for <code>country_pools</code> is determined by <code>location_strategy</code>.
- <code>"random"</code>: Select a pool randomly.
- <code>"dynamic_latency"</code>: Use round trip time to select the closest pool in default\_pools (requires pool health checks).
- <code>"proximity"</code>: Use the pools’ latitude and longitude to select the closest pool using the Cloudflare PoP location for proxied requests or the location determined by <code>location_strategy</code> for non-proxied requests.
- <code>"least_outstanding_requests"</code>: Select a pool by taking into consideration <code>random_steering</code> weights, as well as each pool’s number of outstanding requests. Pools with more pending requests are weighted proportionately less relative to others.
- <code>"least_connections"</code>: Select a pool by taking into consideration <code>random_steering</code> weights, as well as each pool’s number of open connections. Pools with more open connections are weighted proportionately less relative to others. Supported for HTTP/1 and HTTP/2 connections.
- <code>""</code>: Will map to <code>"geo"</code> if you use <code>region_pools</code>/<code>country_pools</code>/<code>pop_pools</code> otherwise <code>"off"</code>.

</summary>

One of the following:

"off"

<a href="#">Link to this property</a>

"geo"

<a href="#">Link to this property</a>

"random"

<a href="#">Link to this property</a>

"dynamic\_latency"

<a href="#">Link to this property</a>

"proximity"

<a href="#">Link to this property</a>

"least\_outstanding\_requests"

<a href="#">Link to this property</a>

"least\_connections"

<a href="#">Link to this property</a>

""

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

pop\_pools: optional map\[array of string]

Enterprise only: A mapping of Cloudflare PoP identifiers to a list of pool IDs (ordered by their failover priority) for the PoP (datacenter). Any PoPs not explicitly defined will fall back to using the corresponding country\_pool, then region\_pool mapping if it exists else to default\_pools.

<a href="#">Link to this property</a>

proxied: optional boolean

Whether the hostname should be gray clouded (false) or orange clouded (true).

<a href="#">Link to this property</a>

<details>

<summary>

random\_steering: optional <a href="https://developers.cloudflare.com/api/resources/load_balancers#(resource)%20load_balancers%20%3E%20(model)%20random_steering%20%3E%20(schema)">RandomSteering</a> { default\_weight, pool\_weights }

Configures pool weights.

- <code>steering_policy="random"</code>: A random pool is selected with probability proportional to pool weights.
- <code>steering_policy="least_outstanding_requests"</code>: Use pool weights to scale each pool’s outstanding requests.
- <code>steering_policy="least_connections"</code>: Use pool weights to scale each pool’s open connections.

</summary>

default\_weight: optional number

The default weight for pools in the load balancer that are not specified in the pool\_weights map.

maximum1

minimum0

multipleOf0.1

<a href="#">Link to this property</a>

pool\_weights: optional map\[number]

A mapping of pool IDs to custom weights. The weight is relative to other pools in the load balancer.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

region\_pools: optional map\[array of string]

A mapping of region codes to a list of pool IDs (ordered by their failover priority) for the given region. Any regions not explicitly defined will fall back to using default\_pools.

<a href="#">Link to this property</a>

<details>

<summary>

rules: optional array of <a href="https://developers.cloudflare.com/api/resources/load_balancers#(resource)%20load_balancers%20%3E%20(model)%20rules%20%3E%20(schema)">Rules</a> { condition, disabled, fixed\_response, 4 more }

BETA Field Not General Access: A list of rules for this load balancer to execute.

</summary>

condition: optional string

The condition expressions to evaluate. If the condition evaluates to true, the overrides or fixed\_response in this rule will be applied. An empty condition is always true. For more details on condition expressions, please see <a href="https://developers.cloudflare.com/load-balancing/understand-basics/load-balancing-rules/expressions">https://developers.cloudflare.com/load-balancing/understand-basics/load-balancing-rules/expressions</a>.

<a href="#">Link to this property</a>

disabled: optional boolean

Disable this specific rule. It will no longer be evaluated by this load balancer.

<a href="#">Link to this property</a>

<details>

<summary>

fixed\_response: optional object {content\_type, location, message\_body, status\_code }

A collection of fields used to directly respond to the client instead of routing to a pool. When supplied on a rule, that rule stops further rule evaluation.

</summary>

content\_type: optional string

The http ‘Content-Type’ header to include in the response.

maxLength32

<a href="#">Link to this property</a>

location: optional string

The http ‘Location’ header to include in the response.

maxLength2048

<a href="#">Link to this property</a>

message\_body: optional string

Text to include as the http body.

maxLength1024

<a href="#">Link to this property</a>

status\_code: optional number

The http status code to respond with.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: optional string

Name of this rule. Only used for human readability.

maxLength200

<a href="#">Link to this property</a>

<details>

<summary>

overrides: optional object {adaptive\_routing, country\_pools, default\_pools, 13 more }

A collection of overrides to apply when this rule’s condition (or a pool set’s <code>match</code>) is true. All fields are optional.

</summary>

<details>

<summary>

adaptive\_routing: optional <a href="https://developers.cloudflare.com/api/resources/load_balancers#(resource)%20load_balancers%20%3E%20(model)%20adaptive_routing%20%3E%20(schema)">AdaptiveRouting</a> { failover\_across\_pools }

Controls features that modify the routing of requests to pools and origins in response to dynamic conditions, such as during the interval between active health monitoring requests. For example, zero-downtime failover occurs immediately when an origin becomes unavailable due to HTTP 521, 522, or 523 response codes. If there is another healthy origin in the same pool, the request is retried once against this alternate origin.

</summary>

failover\_across\_pools: optional boolean

Extends zero-downtime failover of requests to healthy origins from alternate pools, when no healthy alternate exists in the same pool, according to the failover order defined by traffic and origin steering. When set false (the default) zero-downtime failover will only occur between origins within the same pool. See <code>session_affinity_attributes</code> for control over when sessions are broken or reassigned.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

country\_pools: optional map\[array of string]

A mapping of country codes to a list of pool IDs (ordered by their failover priority) for the given country. Any country not explicitly defined will fall back to using the corresponding region\_pool mapping if it exists else to default\_pools.

<a href="#">Link to this property</a>

default\_pools: optional array of <a href="https://developers.cloudflare.com/api/resources/load_balancers#(resource)%20load_balancers%20%3E%20(model)%20default_pools%20%3E%20(schema)">DefaultPools</a>

A list of pool IDs ordered by their failover priority. Pools defined here are used by default, or when region\_pools are not configured for a given region.

<a href="#">Link to this property</a>

fallback\_pool: optional string

The pool ID to use when all other pools are detected as unhealthy.

<a href="#">Link to this property</a>

<details>

<summary>

location\_strategy: optional <a href="https://developers.cloudflare.com/api/resources/load_balancers#(resource)%20load_balancers%20%3E%20(model)%20location_strategy%20%3E%20(schema)">LocationStrategy</a> { mode, prefer\_ecs }

Controls location-based steering for non-proxied requests. See <code>steering_policy</code> to learn how steering is affected.

</summary>

<details>

<summary>

mode: optional "pop"or "resolver\_ip"

Determines the authoritative location when ECS is not preferred, does not exist in the request, or its GeoIP lookup is unsuccessful.

- <code>"pop"</code>: Use the Cloudflare PoP location.
- <code>"resolver_ip"</code>: Use the DNS resolver GeoIP location. If the GeoIP lookup is unsuccessful, use the Cloudflare PoP location.

</summary>

One of the following:

"pop"

<a href="#">Link to this property</a>

"resolver\_ip"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

prefer\_ecs: optional "always"or "never"or "proximity"or "geo"

Whether the EDNS Client Subnet (ECS) GeoIP should be preferred as the authoritative location.

- <code>"always"</code>: Always prefer ECS.
- <code>"never"</code>: Never prefer ECS.
- <code>"proximity"</code>: Prefer ECS only when <code>steering_policy="proximity"</code>.
- <code>"geo"</code>: Prefer ECS only when <code>steering_policy="geo"</code>.

</summary>

One of the following:

"always"

<a href="#">Link to this property</a>

"never"

<a href="#">Link to this property</a>

"proximity"

<a href="#">Link to this property</a>

"geo"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

pool\_default\_weight: optional number

The default weight for pools not listed in <code>pool_weights</code>. The declarative alternative to <code>random_steering.default_weight</code>; mutually exclusive with <code>random_steering</code>.

maximum1

minimum0

multipleOf0.1

<a href="#">Link to this property</a>

pool\_weights: optional map\[number]

A mapping of pool IDs to custom weights, relative to the other pools. The declarative alternative to <code>random_steering.pool_weights</code>; mutually exclusive with <code>random_steering</code>.

<a href="#">Link to this property</a>

pools: optional array of string

A flat, ordered list of pool IDs to route the matched audience to. Replaces the resolved topology with exactly these pools. Mutually exclusive with <code>fixed_response</code>.

<a href="#">Link to this property</a>

pop\_pools: optional map\[array of string]

Enterprise only: A mapping of Cloudflare PoP identifiers to a list of pool IDs (ordered by their failover priority) for the PoP (datacenter). Any PoPs not explicitly defined will fall back to using the corresponding country\_pool, then region\_pool mapping if it exists else to default\_pools.

<a href="#">Link to this property</a>

<details>

<summary>

random\_steering: optional <a href="https://developers.cloudflare.com/api/resources/load_balancers#(resource)%20load_balancers%20%3E%20(model)%20random_steering%20%3E%20(schema)">RandomSteering</a> { default\_weight, pool\_weights }

Configures pool weights.

- <code>steering_policy="random"</code>: A random pool is selected with probability proportional to pool weights.
- <code>steering_policy="least_outstanding_requests"</code>: Use pool weights to scale each pool’s outstanding requests.
- <code>steering_policy="least_connections"</code>: Use pool weights to scale each pool’s open connections.

</summary>

default\_weight: optional number

The default weight for pools in the load balancer that are not specified in the pool\_weights map.

maximum1

minimum0

multipleOf0.1

<a href="#">Link to this property</a>

pool\_weights: optional map\[number]

A mapping of pool IDs to custom weights. The weight is relative to other pools in the load balancer.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

region\_pools: optional map\[array of string]

A mapping of region codes to a list of pool IDs (ordered by their failover priority) for the given region. Any regions not explicitly defined will fall back to using default\_pools.

<a href="#">Link to this property</a>

<details>

<summary>

session\_affinity: optional <a href="https://developers.cloudflare.com/api/resources/load_balancers#(resource)%20load_balancers%20%3E%20(model)%20session_affinity%20%3E%20(schema)">SessionAffinity</a>

Specifies the type of session affinity the load balancer should use unless specified as <code>"none"</code>. The supported types are: - <code>"cookie"</code>: On the first request to a proxied load balancer, a cookie is generated, encoding information of which origin the request will be forwarded to. Subsequent requests, by the same client to the same load balancer, will be sent to the origin server the cookie encodes, for the duration of the cookie and as long as the origin server remains healthy. If the cookie has expired or the origin server is unhealthy, then a new origin server is calculated and used. - <code>"ip_cookie"</code>: Behaves the same as <code>"cookie"</code> except the initial origin selection is stable and based on the client’s ip address. - <code>"header"</code>: On the first request to a proxied load balancer, a session key based on the configured HTTP headers (see <code>session_affinity_attributes.headers</code>) is generated, encoding the request headers used for storing in the load balancer session state which origin the request will be forwarded to. Subsequent requests to the load balancer with the same headers will be sent to the same origin server, for the duration of the session and as long as the origin server remains healthy. If the session has been idle for the duration of <code>session_affinity_ttl</code> seconds or the origin server is unhealthy, then a new origin server is calculated and used. See <code>headers</code> in <code>session_affinity_attributes</code> for additional required configuration.

</summary>

One of the following:

"none"

<a href="#">Link to this property</a>

"cookie"

<a href="#">Link to this property</a>

"ip\_cookie"

<a href="#">Link to this property</a>

"header"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

session\_affinity\_attributes: optional <a href="https://developers.cloudflare.com/api/resources/load_balancers#(resource)%20load_balancers%20%3E%20(model)%20session_affinity_attributes%20%3E%20(schema)">SessionAffinityAttributes</a> { drain\_duration, headers, require\_all\_headers, 3 more }

Configures attributes for session affinity.

</summary>

drain\_duration: optional number

Configures the drain duration in seconds. This field is only used when session affinity is enabled on the load balancer.

<a href="#">Link to this property</a>

headers: optional array of string

Configures the names of HTTP headers to base session affinity on when header <code>session_affinity</code> is enabled. At least one HTTP header name must be provided. To specify the exact cookies to be used, include an item in the following format: <code>"cookie:&lt;cookie-name-1&gt;,&lt;cookie-name-2&gt;"</code> (example) where everything after the colon is a comma-separated list of cookie names. Providing only <code>"cookie"</code> will result in all cookies being used. The default max number of HTTP header names that can be provided depends on your plan: 5 for Enterprise, 1 for all other plans.

<a href="#">Link to this property</a>

require\_all\_headers: optional boolean

When header <code>session_affinity</code> is enabled, this option can be used to specify how HTTP headers on load balancing requests will be used. The supported values are: - <code>"true"</code>: Load balancing requests must contain *all* of the HTTP headers specified by the <code>headers</code> session affinity attribute, otherwise sessions aren’t created. - <code>"false"</code>: Load balancing requests must contain *at least one* of the HTTP headers specified by the <code>headers</code> session affinity attribute, otherwise sessions aren’t created.

<a href="#">Link to this property</a>

<details>

<summary>

samesite: optional "Auto"or "Lax"or "None"or "Strict"

Configures the SameSite attribute on session affinity cookie. Value “Auto” will be translated to “Lax” or “None” depending if Always Use HTTPS is enabled. Note: when using value “None”, the secure attribute can not be set to “Never”.

</summary>

One of the following:

"Auto"

<a href="#">Link to this property</a>

"Lax"

<a href="#">Link to this property</a>

"None"

<a href="#">Link to this property</a>

"Strict"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

secure: optional "Auto"or "Always"or "Never"

Configures the Secure attribute on session affinity cookie. Value “Always” indicates the Secure attribute will be set in the Set-Cookie header, “Never” indicates the Secure attribute will not be set, and “Auto” will set the Secure attribute depending if Always Use HTTPS is enabled.

</summary>

One of the following:

"Auto"

<a href="#">Link to this property</a>

"Always"

<a href="#">Link to this property</a>

"Never"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

zero\_downtime\_failover: optional "none"or "temporary"or "sticky"

Configures the zero-downtime failover between origins within a pool when session affinity is enabled. This feature is currently incompatible with Argo, Tiered Cache, and Bandwidth Alliance. The supported values are: - <code>"none"</code>: No failover takes place for sessions pinned to the origin (default). - <code>"temporary"</code>: Traffic will be sent to another other healthy origin until the originally pinned origin is available; note that this can potentially result in heavy origin flapping. - <code>"sticky"</code>: The session affinity cookie is updated and subsequent requests are sent to the new origin. Note: Zero-downtime failover with sticky sessions is currently not supported for session affinity by header.

</summary>

One of the following:

"none"

<a href="#">Link to this property</a>

"temporary"

<a href="#">Link to this property</a>

"sticky"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

session\_affinity\_ttl: optional number

Time, in seconds, until a client’s session expires after being created. Once the expiry time has been reached, subsequent requests may get sent to a different origin server. The accepted ranges per <code>session_affinity</code> policy are: - <code>"cookie"</code> / <code>"ip_cookie"</code>: The current default of 23 hours will be used unless explicitly set. The accepted range of values is between \[1800, 604800]. - <code>"header"</code>: The current default of 1800 seconds will be used unless explicitly set. The accepted range of values is between \[30, 3600]. Note: With session affinity by header, sessions only expire after they haven’t been used for the number of seconds specified.

<a href="#">Link to this property</a>

<details>

<summary>

steering\_policy: optional <a href="https://developers.cloudflare.com/api/resources/load_balancers#(resource)%20load_balancers%20%3E%20(model)%20steering_policy%20%3E%20(schema)">SteeringPolicy</a>

Steering Policy for this load balancer.

- <code>"off"</code>: Use <code>default_pools</code>.
- <code>"geo"</code>: Use <code>region_pools</code>/<code>country_pools</code>/<code>pop_pools</code>. For non-proxied requests, the country for <code>country_pools</code> is determined by <code>location_strategy</code>.
- <code>"random"</code>: Select a pool randomly.
- <code>"dynamic_latency"</code>: Use round trip time to select the closest pool in default\_pools (requires pool health checks).
- <code>"proximity"</code>: Use the pools’ latitude and longitude to select the closest pool using the Cloudflare PoP location for proxied requests or the location determined by <code>location_strategy</code> for non-proxied requests.
- <code>"least_outstanding_requests"</code>: Select a pool by taking into consideration <code>random_steering</code> weights, as well as each pool’s number of outstanding requests. Pools with more pending requests are weighted proportionately less relative to others.
- <code>"least_connections"</code>: Select a pool by taking into consideration <code>random_steering</code> weights, as well as each pool’s number of open connections. Pools with more open connections are weighted proportionately less relative to others. Supported for HTTP/1 and HTTP/2 connections.
- <code>""</code>: Will map to <code>"geo"</code> if you use <code>region_pools</code>/<code>country_pools</code>/<code>pop_pools</code> otherwise <code>"off"</code>.

</summary>

One of the following:

"off"

<a href="#">Link to this property</a>

"geo"

<a href="#">Link to this property</a>

"random"

<a href="#">Link to this property</a>

"dynamic\_latency"

<a href="#">Link to this property</a>

"proximity"

<a href="#">Link to this property</a>

"least\_outstanding\_requests"

<a href="#">Link to this property</a>

"least\_connections"

<a href="#">Link to this property</a>

""

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

ttl: optional number

Time to live (TTL) of the DNS entry for the IP address returned by this load balancer. This only applies to gray-clouded (unproxied) load balancers.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

priority: optional number

The order in which rules should be executed in relation to each other. Lower values are executed first. Values do not need to be sequential. If no value is provided for any rule the array order of the rules field will be used to assign a priority.

minimum0

<a href="#">Link to this property</a>

terminates: optional boolean

If this rule’s condition is true, this causes rule evaluation to stop after processing this rule.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

session\_affinity: optional <a href="https://developers.cloudflare.com/api/resources/load_balancers#(resource)%20load_balancers%20%3E%20(model)%20session_affinity%20%3E%20(schema)">SessionAffinity</a>

Specifies the type of session affinity the load balancer should use unless specified as <code>"none"</code>. The supported types are: - <code>"cookie"</code>: On the first request to a proxied load balancer, a cookie is generated, encoding information of which origin the request will be forwarded to. Subsequent requests, by the same client to the same load balancer, will be sent to the origin server the cookie encodes, for the duration of the cookie and as long as the origin server remains healthy. If the cookie has expired or the origin server is unhealthy, then a new origin server is calculated and used. - <code>"ip_cookie"</code>: Behaves the same as <code>"cookie"</code> except the initial origin selection is stable and based on the client’s ip address. - <code>"header"</code>: On the first request to a proxied load balancer, a session key based on the configured HTTP headers (see <code>session_affinity_attributes.headers</code>) is generated, encoding the request headers used for storing in the load balancer session state which origin the request will be forwarded to. Subsequent requests to the load balancer with the same headers will be sent to the same origin server, for the duration of the session and as long as the origin server remains healthy. If the session has been idle for the duration of <code>session_affinity_ttl</code> seconds or the origin server is unhealthy, then a new origin server is calculated and used. See <code>headers</code> in <code>session_affinity_attributes</code> for additional required configuration.

</summary>

One of the following:

"none"

<a href="#">Link to this property</a>

"cookie"

<a href="#">Link to this property</a>

"ip\_cookie"

<a href="#">Link to this property</a>

"header"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

session\_affinity\_attributes: optional <a href="https://developers.cloudflare.com/api/resources/load_balancers#(resource)%20load_balancers%20%3E%20(model)%20session_affinity_attributes%20%3E%20(schema)">SessionAffinityAttributes</a> { drain\_duration, headers, require\_all\_headers, 3 more }

Configures attributes for session affinity.

</summary>

drain\_duration: optional number

Configures the drain duration in seconds. This field is only used when session affinity is enabled on the load balancer.

<a href="#">Link to this property</a>

headers: optional array of string

Configures the names of HTTP headers to base session affinity on when header <code>session_affinity</code> is enabled. At least one HTTP header name must be provided. To specify the exact cookies to be used, include an item in the following format: <code>"cookie:&lt;cookie-name-1&gt;,&lt;cookie-name-2&gt;"</code> (example) where everything after the colon is a comma-separated list of cookie names. Providing only <code>"cookie"</code> will result in all cookies being used. The default max number of HTTP header names that can be provided depends on your plan: 5 for Enterprise, 1 for all other plans.

<a href="#">Link to this property</a>

require\_all\_headers: optional boolean

When header <code>session_affinity</code> is enabled, this option can be used to specify how HTTP headers on load balancing requests will be used. The supported values are: - <code>"true"</code>: Load balancing requests must contain *all* of the HTTP headers specified by the <code>headers</code> session affinity attribute, otherwise sessions aren’t created. - <code>"false"</code>: Load balancing requests must contain *at least one* of the HTTP headers specified by the <code>headers</code> session affinity attribute, otherwise sessions aren’t created.

<a href="#">Link to this property</a>

<details>

<summary>

samesite: optional "Auto"or "Lax"or "None"or "Strict"

Configures the SameSite attribute on session affinity cookie. Value “Auto” will be translated to “Lax” or “None” depending if Always Use HTTPS is enabled. Note: when using value “None”, the secure attribute can not be set to “Never”.

</summary>

One of the following:

"Auto"

<a href="#">Link to this property</a>

"Lax"

<a href="#">Link to this property</a>

"None"

<a href="#">Link to this property</a>

"Strict"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

secure: optional "Auto"or "Always"or "Never"

Configures the Secure attribute on session affinity cookie. Value “Always” indicates the Secure attribute will be set in the Set-Cookie header, “Never” indicates the Secure attribute will not be set, and “Auto” will set the Secure attribute depending if Always Use HTTPS is enabled.

</summary>

One of the following:

"Auto"

<a href="#">Link to this property</a>

"Always"

<a href="#">Link to this property</a>

"Never"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

zero\_downtime\_failover: optional "none"or "temporary"or "sticky"

Configures the zero-downtime failover between origins within a pool when session affinity is enabled. This feature is currently incompatible with Argo, Tiered Cache, and Bandwidth Alliance. The supported values are: - <code>"none"</code>: No failover takes place for sessions pinned to the origin (default). - <code>"temporary"</code>: Traffic will be sent to another other healthy origin until the originally pinned origin is available; note that this can potentially result in heavy origin flapping. - <code>"sticky"</code>: The session affinity cookie is updated and subsequent requests are sent to the new origin. Note: Zero-downtime failover with sticky sessions is currently not supported for session affinity by header.

</summary>

One of the following:

"none"

<a href="#">Link to this property</a>

"temporary"

<a href="#">Link to this property</a>

"sticky"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

session\_affinity\_ttl: optional number

Time, in seconds, until a client’s session expires after being created. Once the expiry time has been reached, subsequent requests may get sent to a different origin server. The accepted ranges per <code>session_affinity</code> policy are: - <code>"cookie"</code> / <code>"ip_cookie"</code>: The current default of 23 hours will be used unless explicitly set. The accepted range of values is between \[1800, 604800]. - <code>"header"</code>: The current default of 1800 seconds will be used unless explicitly set. The accepted range of values is between \[30, 3600]. Note: With session affinity by header, sessions only expire after they haven’t been used for the number of seconds specified.

<a href="#">Link to this property</a>

<details>

<summary>

steering\_policy: optional <a href="https://developers.cloudflare.com/api/resources/load_balancers#(resource)%20load_balancers%20%3E%20(model)%20steering_policy%20%3E%20(schema)">SteeringPolicy</a>

Steering Policy for this load balancer.

- <code>"off"</code>: Use <code>default_pools</code>.
- <code>"geo"</code>: Use <code>region_pools</code>/<code>country_pools</code>/<code>pop_pools</code>. For non-proxied requests, the country for <code>country_pools</code> is determined by <code>location_strategy</code>.
- <code>"random"</code>: Select a pool randomly.
- <code>"dynamic_latency"</code>: Use round trip time to select the closest pool in default\_pools (requires pool health checks).
- <code>"proximity"</code>: Use the pools’ latitude and longitude to select the closest pool using the Cloudflare PoP location for proxied requests or the location determined by <code>location_strategy</code> for non-proxied requests.
- <code>"least_outstanding_requests"</code>: Select a pool by taking into consideration <code>random_steering</code> weights, as well as each pool’s number of outstanding requests. Pools with more pending requests are weighted proportionately less relative to others.
- <code>"least_connections"</code>: Select a pool by taking into consideration <code>random_steering</code> weights, as well as each pool’s number of open connections. Pools with more open connections are weighted proportionately less relative to others. Supported for HTTP/1 and HTTP/2 connections.
- <code>""</code>: Will map to <code>"geo"</code> if you use <code>region_pools</code>/<code>country_pools</code>/<code>pop_pools</code> otherwise <code>"off"</code>.

</summary>

One of the following:

"off"

<a href="#">Link to this property</a>

"geo"

<a href="#">Link to this property</a>

"random"

<a href="#">Link to this property</a>

"dynamic\_latency"

<a href="#">Link to this property</a>

"proximity"

<a href="#">Link to this property</a>

"least\_outstanding\_requests"

<a href="#">Link to this property</a>

"least\_connections"

<a href="#">Link to this property</a>

""

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

ttl: optional number

Time to live (TTL) of the DNS entry for the IP address returned by this load balancer. This only applies to gray-clouded (unproxied) load balancers.

<a href="#">Link to this property</a>

zone\_name: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20load_balancers%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20load_balancers%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result\_info: optional object {count, page, per\_page, 2 more }

</summary>

count: optional number

Total number of results on the current page.

<a href="#">Link to this property</a>

page: optional number

Current page within paginated list of results.

<a href="#">Link to this property</a>

per\_page: optional number

Number of results per page.

<a href="#">Link to this property</a>

total\_count: optional number

Total results available without any search parameters.

<a href="#">Link to this property</a>

total\_pages: optional number

Total number of pages available.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20load_balancers%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### List account or zone Load Balancers

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/load_balancers \
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
  "result": [
    {
      "id": "699d98642c564d2e855e9661899b7252",
      "adaptive_routing": {
        "failover_across_pools": true
      },
      "country_pools": {
        "GB": [
          "abd90f38ced07c2e2f4df50b1f61d4194"
        ],
        "US": [
          "de90f38ced07c2e2f4df50b1f61d4194",
          "00920f38ce07c2e2f4df50b1f61d4194"
        ]
      },
      "created_on": "2014-01-01T05:20:00.12345Z",
      "default_pools": [
        "17b5962d775c646f3f9725cbc7a53df4",
        "9290f38c5d07c2e2f4df57b1f61d4196",
        "00920f38ce07c2e2f4df50b1f61d4194"
      ],
      "description": "Load Balancer for www.example.com",
      "enabled": true,
      "fallback_pool": "fallback_pool",
      "location_strategy": {
        "mode": "resolver_ip",
        "prefer_ecs": "always"
      },
      "modified_on": "2014-01-01T05:20:00.12345Z",
      "name": "www.example.com",
      "networks": [
        "string"
      ],
      "pool_sets": [
        {
          "disabled": true,
          "fixed_response": {
            "content_type": "application/json",
            "location": "www.example.com",
            "message_body": "Testing Hello",
            "status_code": 0
          },
          "match": {
            "default": true,
            "topology": {
              "countries": [
                "string"
              ],
              "pops": [
                "string"
              ],
              "regions": [
                "WNAM"
              ]
            }
          },
          "name": "wnam-primary",
          "overrides": {
            "fallback_pool": "9290f38c5d07c2e2f4df57b1f61d4196",
            "pool_default_weight": 0.2,
            "pool_weights": {
              "9290f38c5d07c2e2f4df57b1f61d4196": 0.5,
              "de90f38ced07c2e2f4df50b1f61d4194": 0.3
            },
            "pools": [
              "17b5962d775c646f3f9725cbc7a53df4"
            ],
            "steering_policy": "random"
          }
        }
      ],
      "pop_pools": {
        "LAX": [
          "de90f38ced07c2e2f4df50b1f61d4194",
          "9290f38c5d07c2e2f4df57b1f61d4196"
        ],
        "LHR": [
          "abd90f38ced07c2e2f4df50b1f61d4194",
          "f9138c5d07c2e2f4df57b1f61d4196"
        ],
        "SJC": [
          "00920f38ce07c2e2f4df50b1f61d4194"
        ]
      },
      "proxied": true,
      "random_steering": {
        "default_weight": 0.2,
        "pool_weights": {
          "9290f38c5d07c2e2f4df57b1f61d4196": 0.5,
          "de90f38ced07c2e2f4df50b1f61d4194": 0.3
        }
      },
      "region_pools": {
        "ENAM": [
          "00920f38ce07c2e2f4df50b1f61d4194"
        ],
        "WNAM": [
          "de90f38ced07c2e2f4df50b1f61d4194",
          "9290f38c5d07c2e2f4df57b1f61d4196"
        ]
      },
      "rules": [
        {
          "condition": "http.request.uri.path contains \"/testing\"",
          "disabled": true,
          "fixed_response": {
            "content_type": "application/json",
            "location": "www.example.com",
            "message_body": "Testing Hello",
            "status_code": 0
          },
          "name": "route the path /testing to testing datacenter.",
          "overrides": {
            "adaptive_routing": {
              "failover_across_pools": true
            },
            "country_pools": {
              "GB": [
                "abd90f38ced07c2e2f4df50b1f61d4194"
              ],
              "US": [
                "de90f38ced07c2e2f4df50b1f61d4194",
                "00920f38ce07c2e2f4df50b1f61d4194"
              ]
            },
            "default_pools": [
              "17b5962d775c646f3f9725cbc7a53df4",
              "9290f38c5d07c2e2f4df57b1f61d4196",
              "00920f38ce07c2e2f4df50b1f61d4194"
            ],
            "fallback_pool": "fallback_pool",
            "location_strategy": {
              "mode": "resolver_ip",
              "prefer_ecs": "always"
            },
            "pool_default_weight": 0.2,
            "pool_weights": {
              "9290f38c5d07c2e2f4df57b1f61d4196": 0.5,
              "de90f38ced07c2e2f4df50b1f61d4194": 0.3
            },
            "pools": [
              "17b5962d775c646f3f9725cbc7a53df4"
            ],
            "pop_pools": {
              "LAX": [
                "de90f38ced07c2e2f4df50b1f61d4194",
                "9290f38c5d07c2e2f4df57b1f61d4196"
              ],
              "LHR": [
                "abd90f38ced07c2e2f4df50b1f61d4194",
                "f9138c5d07c2e2f4df57b1f61d4196"
              ],
              "SJC": [
                "00920f38ce07c2e2f4df50b1f61d4194"
              ]
            },
            "random_steering": {
              "default_weight": 0.2,
              "pool_weights": {
                "9290f38c5d07c2e2f4df57b1f61d4196": 0.5,
                "de90f38ced07c2e2f4df50b1f61d4194": 0.3
              }
            },
            "region_pools": {
              "ENAM": [
                "00920f38ce07c2e2f4df50b1f61d4194"
              ],
              "WNAM": [
                "de90f38ced07c2e2f4df50b1f61d4194",
                "9290f38c5d07c2e2f4df57b1f61d4196"
              ]
            },
            "session_affinity": "cookie",
            "session_affinity_attributes": {
              "drain_duration": 100,
              "headers": [
                "x"
              ],
              "require_all_headers": true,
              "samesite": "Auto",
              "secure": "Auto",
              "zero_downtime_failover": "sticky"
            },
            "session_affinity_ttl": 1800,
            "steering_policy": "dynamic_latency",
            "ttl": 30
          },
          "priority": 0,
          "terminates": true
        }
      ],
      "session_affinity": "cookie",
      "session_affinity_attributes": {
        "drain_duration": 100,
        "headers": [
          "x"
        ],
        "require_all_headers": true,
        "samesite": "Auto",
        "secure": "Auto",
        "zero_downtime_failover": "sticky"
      },
      "session_affinity_ttl": 1800,
      "steering_policy": "dynamic_latency",
      "ttl": 30,
      "zone_name": "example.com"
    }
  ],
  "success": true,
  "result_info": {
    "count": 20,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
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
  "result": [
    {
      "id": "699d98642c564d2e855e9661899b7252",
      "adaptive_routing": {
        "failover_across_pools": true
      },
      "country_pools": {
        "GB": [
          "abd90f38ced07c2e2f4df50b1f61d4194"
        ],
        "US": [
          "de90f38ced07c2e2f4df50b1f61d4194",
          "00920f38ce07c2e2f4df50b1f61d4194"
        ]
      },
      "created_on": "2014-01-01T05:20:00.12345Z",
      "default_pools": [
        "17b5962d775c646f3f9725cbc7a53df4",
        "9290f38c5d07c2e2f4df57b1f61d4196",
        "00920f38ce07c2e2f4df50b1f61d4194"
      ],
      "description": "Load Balancer for www.example.com",
      "enabled": true,
      "fallback_pool": "fallback_pool",
      "location_strategy": {
        "mode": "resolver_ip",
        "prefer_ecs": "always"
      },
      "modified_on": "2014-01-01T05:20:00.12345Z",
      "name": "www.example.com",
      "networks": [
        "string"
      ],
      "pool_sets": [
        {
          "disabled": true,
          "fixed_response": {
            "content_type": "application/json",
            "location": "www.example.com",
            "message_body": "Testing Hello",
            "status_code": 0
          },
          "match": {
            "default": true,
            "topology": {
              "countries": [
                "string"
              ],
              "pops": [
                "string"
              ],
              "regions": [
                "WNAM"
              ]
            }
          },
          "name": "wnam-primary",
          "overrides": {
            "fallback_pool": "9290f38c5d07c2e2f4df57b1f61d4196",
            "pool_default_weight": 0.2,
            "pool_weights": {
              "9290f38c5d07c2e2f4df57b1f61d4196": 0.5,
              "de90f38ced07c2e2f4df50b1f61d4194": 0.3
            },
            "pools": [
              "17b5962d775c646f3f9725cbc7a53df4"
            ],
            "steering_policy": "random"
          }
        }
      ],
      "pop_pools": {
        "LAX": [
          "de90f38ced07c2e2f4df50b1f61d4194",
          "9290f38c5d07c2e2f4df57b1f61d4196"
        ],
        "LHR": [
          "abd90f38ced07c2e2f4df50b1f61d4194",
          "f9138c5d07c2e2f4df57b1f61d4196"
        ],
        "SJC": [
          "00920f38ce07c2e2f4df50b1f61d4194"
        ]
      },
      "proxied": true,
      "random_steering": {
        "default_weight": 0.2,
        "pool_weights": {
          "9290f38c5d07c2e2f4df57b1f61d4196": 0.5,
          "de90f38ced07c2e2f4df50b1f61d4194": 0.3
        }
      },
      "region_pools": {
        "ENAM": [
          "00920f38ce07c2e2f4df50b1f61d4194"
        ],
        "WNAM": [
          "de90f38ced07c2e2f4df50b1f61d4194",
          "9290f38c5d07c2e2f4df57b1f61d4196"
        ]
      },
      "rules": [
        {
          "condition": "http.request.uri.path contains \"/testing\"",
          "disabled": true,
          "fixed_response": {
            "content_type": "application/json",
            "location": "www.example.com",
            "message_body": "Testing Hello",
            "status_code": 0
          },
          "name": "route the path /testing to testing datacenter.",
          "overrides": {
            "adaptive_routing": {
              "failover_across_pools": true
            },
            "country_pools": {
              "GB": [
                "abd90f38ced07c2e2f4df50b1f61d4194"
              ],
              "US": [
                "de90f38ced07c2e2f4df50b1f61d4194",
                "00920f38ce07c2e2f4df50b1f61d4194"
              ]
            },
            "default_pools": [
              "17b5962d775c646f3f9725cbc7a53df4",
              "9290f38c5d07c2e2f4df57b1f61d4196",
              "00920f38ce07c2e2f4df50b1f61d4194"
            ],
            "fallback_pool": "fallback_pool",
            "location_strategy": {
              "mode": "resolver_ip",
              "prefer_ecs": "always"
            },
            "pool_default_weight": 0.2,
            "pool_weights": {
              "9290f38c5d07c2e2f4df57b1f61d4196": 0.5,
              "de90f38ced07c2e2f4df50b1f61d4194": 0.3
            },
            "pools": [
              "17b5962d775c646f3f9725cbc7a53df4"
            ],
            "pop_pools": {
              "LAX": [
                "de90f38ced07c2e2f4df50b1f61d4194",
                "9290f38c5d07c2e2f4df57b1f61d4196"
              ],
              "LHR": [
                "abd90f38ced07c2e2f4df50b1f61d4194",
                "f9138c5d07c2e2f4df57b1f61d4196"
              ],
              "SJC": [
                "00920f38ce07c2e2f4df50b1f61d4194"
              ]
            },
            "random_steering": {
              "default_weight": 0.2,
              "pool_weights": {
                "9290f38c5d07c2e2f4df57b1f61d4196": 0.5,
                "de90f38ced07c2e2f4df50b1f61d4194": 0.3
              }
            },
            "region_pools": {
              "ENAM": [
                "00920f38ce07c2e2f4df50b1f61d4194"
              ],
              "WNAM": [
                "de90f38ced07c2e2f4df50b1f61d4194",
                "9290f38c5d07c2e2f4df57b1f61d4196"
              ]
            },
            "session_affinity": "cookie",
            "session_affinity_attributes": {
              "drain_duration": 100,
              "headers": [
                "x"
              ],
              "require_all_headers": true,
              "samesite": "Auto",
              "secure": "Auto",
              "zero_downtime_failover": "sticky"
            },
            "session_affinity_ttl": 1800,
            "steering_policy": "dynamic_latency",
            "ttl": 30
          },
          "priority": 0,
          "terminates": true
        }
      ],
      "session_affinity": "cookie",
      "session_affinity_attributes": {
        "drain_duration": 100,
        "headers": [
          "x"
        ],
        "require_all_headers": true,
        "samesite": "Auto",
        "secure": "Auto",
        "zero_downtime_failover": "sticky"
      },
      "session_affinity_ttl": 1800,
      "steering_policy": "dynamic_latency",
      "ttl": 30,
      "zone_name": "example.com"
    }
  ],
  "success": true,
  "result_info": {
    "count": 20,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```