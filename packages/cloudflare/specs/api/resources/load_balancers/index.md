---
title: Load Balancers
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Load Balancers

##### [List account or zone Load Balancers](https://developers.cloudflare.com/api/resources/load_balancers/methods/list)

GET/{accounts\_or\_zones}/{account\_or\_zone\_id}/load\_balancers

##### [account or zone Load Balancer Details](https://developers.cloudflare.com/api/resources/load_balancers/methods/get)

GET/{accounts\_or\_zones}/{account\_or\_zone\_id}/load\_balancers/{load\_balancer\_id}

##### [Create account or zone Load Balancer](https://developers.cloudflare.com/api/resources/load_balancers/methods/create)

POST/{accounts\_or\_zones}/{account\_or\_zone\_id}/load\_balancers

##### [Update account or zone Load Balancer](https://developers.cloudflare.com/api/resources/load_balancers/methods/update)

PUT/{accounts\_or\_zones}/{account\_or\_zone\_id}/load\_balancers/{load\_balancer\_id}

##### [Patch account or zone Load Balancer](https://developers.cloudflare.com/api/resources/load_balancers/methods/edit)

PATCH/{accounts\_or\_zones}/{account\_or\_zone\_id}/load\_balancers/{load\_balancer\_id}

##### [Delete account or zone Load Balancer](https://developers.cloudflare.com/api/resources/load_balancers/methods/delete)

DELETE/{accounts\_or\_zones}/{account\_or\_zone\_id}/load\_balancers/{load\_balancer\_id}

##### ModelsExpand Collapse

<details>

<summary>

AdaptiveRouting object {failover\_across\_pools }

Controls features that modify the routing of requests to pools and origins in response to dynamic conditions, such as during the interval between active health monitoring requests. For example, zero-downtime failover occurs immediately when an origin becomes unavailable due to HTTP 521, 522, or 523 response codes. If there is another healthy origin in the same pool, the request is retried once against this alternate origin.

</summary>

failover\_across\_pools: optional boolean

Extends zero-downtime failover of requests to healthy origins from alternate pools, when no healthy alternate exists in the same pool, according to the failover order defined by traffic and origin steering. When set false (the default) zero-downtime failover will only occur between origins within the same pool. See <code>session_affinity_attributes</code> for control over when sessions are broken or reassigned.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20load_balancers%20%3E%20(model)%20adaptive_routing%20%3E%20(schema)>)

<details>

<summary>

CheckRegion = "WNAM"or "ENAM"or "WEU"or 12 more

WNAM: Western North America, ENAM: Eastern North America, WEU: Western Europe, EEU: Eastern Europe, NSAM: Northern South America, SSAM: Southern South America, OC: Oceania, ME: Middle East, NAF: North Africa, SAF: South Africa, SAS: Southern Asia, SEAS: South East Asia, NEAS: North East Asia, CHINA: China (ENTERPRISE customers only), ALL\_REGIONS: all regions (ENTERPRISE customers only).

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

[Link to this property](#)%20load_balancers%20%3E%20(model)%20check_region%20%3E%20(schema)>)

DefaultPools = string

A pool ID.

[Link to this property](#)%20load_balancers%20%3E%20(model)%20default_pools%20%3E%20(schema)>)

<details>

<summary>

FilterOptions object {disable, healthy }

Filter options for a particular resource type (pool or origin). Use null to reset.

</summary>

disable: optional boolean

If set true, disable notifications for this type of resource (pool or origin).

<a href="#">Link to this property</a>

healthy: optional boolean

If present, send notifications only for this health status (e.g. false for only DOWN events). Use null to reset (all events).

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20load_balancers%20%3E%20(model)%20filter_options%20%3E%20(schema)>)

<details>

<summary>

Header object {Host }

The request header is used to pass additional information with an HTTP request. Currently supported header is ‘Host’.

</summary>

Host: optional array of <a href="https://developers.cloudflare.com/api/resources/load_balancers#(resource)%20load_balancers%20%3E%20(model)%20host%20%3E%20(schema)">Host</a>

The ‘Host’ header allows to override the hostname set in the HTTP request. Current support is 1 ‘Host’ header override per origin.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20load_balancers%20%3E%20(model)%20header%20%3E%20(schema)>)

Host = string

[Link to this property](#)%20load_balancers%20%3E%20(model)%20host%20%3E%20(schema)>)

<details>

<summary>

LoadBalancer object {id, adaptive\_routing, country\_pools, 21 more }

</summary>

id: optional string

<a href="#">Link to this property</a>

adaptive\_routing: optional <a href="https://developers.cloudflare.com/api/resources/load_balancers#(resource)%20load_balancers%20%3E%20(model)%20adaptive_routing%20%3E%20(schema)">AdaptiveRouting</a> { failover\_across\_pools }

Controls features that modify the routing of requests to pools and origins in response to dynamic conditions, such as during the interval between active health monitoring requests. For example, zero-downtime failover occurs immediately when an origin becomes unavailable due to HTTP 521, 522, or 523 response codes. If there is another healthy origin in the same pool, the request is retried once against this alternate origin.

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

location\_strategy: optional <a href="https://developers.cloudflare.com/api/resources/load_balancers#(resource)%20load_balancers%20%3E%20(model)%20location_strategy%20%3E%20(schema)">LocationStrategy</a> { mode, prefer\_ecs }

Controls location-based steering for non-proxied requests. See <code>steering_policy</code> to learn how steering is affected.

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

random\_steering: optional <a href="https://developers.cloudflare.com/api/resources/load_balancers#(resource)%20load_balancers%20%3E%20(model)%20random_steering%20%3E%20(schema)">RandomSteering</a> { default\_weight, pool\_weights }

Configures pool weights.

- <code>steering_policy="random"</code>: A random pool is selected with probability proportional to pool weights.
- <code>steering_policy="least_outstanding_requests"</code>: Use pool weights to scale each pool’s outstanding requests.
- <code>steering_policy="least_connections"</code>: Use pool weights to scale each pool’s open connections.

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

adaptive\_routing: optional <a href="https://developers.cloudflare.com/api/resources/load_balancers#(resource)%20load_balancers%20%3E%20(model)%20adaptive_routing%20%3E%20(schema)">AdaptiveRouting</a> { failover\_across\_pools }

Controls features that modify the routing of requests to pools and origins in response to dynamic conditions, such as during the interval between active health monitoring requests. For example, zero-downtime failover occurs immediately when an origin becomes unavailable due to HTTP 521, 522, or 523 response codes. If there is another healthy origin in the same pool, the request is retried once against this alternate origin.

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

location\_strategy: optional <a href="https://developers.cloudflare.com/api/resources/load_balancers#(resource)%20load_balancers%20%3E%20(model)%20location_strategy%20%3E%20(schema)">LocationStrategy</a> { mode, prefer\_ecs }

Controls location-based steering for non-proxied requests. See <code>steering_policy</code> to learn how steering is affected.

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

random\_steering: optional <a href="https://developers.cloudflare.com/api/resources/load_balancers#(resource)%20load_balancers%20%3E%20(model)%20random_steering%20%3E%20(schema)">RandomSteering</a> { default\_weight, pool\_weights }

Configures pool weights.

- <code>steering_policy="random"</code>: A random pool is selected with probability proportional to pool weights.
- <code>steering_policy="least_outstanding_requests"</code>: Use pool weights to scale each pool’s outstanding requests.
- <code>steering_policy="least_connections"</code>: Use pool weights to scale each pool’s open connections.

<a href="#">Link to this property</a>

region\_pools: optional map\[array of string]

A mapping of region codes to a list of pool IDs (ordered by their failover priority) for the given region. Any regions not explicitly defined will fall back to using default\_pools.

<a href="#">Link to this property</a>

session\_affinity: optional <a href="https://developers.cloudflare.com/api/resources/load_balancers#(resource)%20load_balancers%20%3E%20(model)%20session_affinity%20%3E%20(schema)">SessionAffinity</a>

Specifies the type of session affinity the load balancer should use unless specified as <code>"none"</code>. The supported types are: - <code>"cookie"</code>: On the first request to a proxied load balancer, a cookie is generated, encoding information of which origin the request will be forwarded to. Subsequent requests, by the same client to the same load balancer, will be sent to the origin server the cookie encodes, for the duration of the cookie and as long as the origin server remains healthy. If the cookie has expired or the origin server is unhealthy, then a new origin server is calculated and used. - <code>"ip_cookie"</code>: Behaves the same as <code>"cookie"</code> except the initial origin selection is stable and based on the client’s ip address. - <code>"header"</code>: On the first request to a proxied load balancer, a session key based on the configured HTTP headers (see <code>session_affinity_attributes.headers</code>) is generated, encoding the request headers used for storing in the load balancer session state which origin the request will be forwarded to. Subsequent requests to the load balancer with the same headers will be sent to the same origin server, for the duration of the session and as long as the origin server remains healthy. If the session has been idle for the duration of <code>session_affinity_ttl</code> seconds or the origin server is unhealthy, then a new origin server is calculated and used. See <code>headers</code> in <code>session_affinity_attributes</code> for additional required configuration.

<a href="#">Link to this property</a>

session\_affinity\_attributes: optional <a href="https://developers.cloudflare.com/api/resources/load_balancers#(resource)%20load_balancers%20%3E%20(model)%20session_affinity_attributes%20%3E%20(schema)">SessionAffinityAttributes</a> { drain\_duration, headers, require\_all\_headers, 3 more }

Configures attributes for session affinity.

<a href="#">Link to this property</a>

session\_affinity\_ttl: optional number

Time, in seconds, until a client’s session expires after being created. Once the expiry time has been reached, subsequent requests may get sent to a different origin server. The accepted ranges per <code>session_affinity</code> policy are: - <code>"cookie"</code> / <code>"ip_cookie"</code>: The current default of 23 hours will be used unless explicitly set. The accepted range of values is between \[1800, 604800]. - <code>"header"</code>: The current default of 1800 seconds will be used unless explicitly set. The accepted range of values is between \[30, 3600]. Note: With session affinity by header, sessions only expire after they haven’t been used for the number of seconds specified.

<a href="#">Link to this property</a>

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

session\_affinity: optional <a href="https://developers.cloudflare.com/api/resources/load_balancers#(resource)%20load_balancers%20%3E%20(model)%20session_affinity%20%3E%20(schema)">SessionAffinity</a>

Specifies the type of session affinity the load balancer should use unless specified as <code>"none"</code>. The supported types are: - <code>"cookie"</code>: On the first request to a proxied load balancer, a cookie is generated, encoding information of which origin the request will be forwarded to. Subsequent requests, by the same client to the same load balancer, will be sent to the origin server the cookie encodes, for the duration of the cookie and as long as the origin server remains healthy. If the cookie has expired or the origin server is unhealthy, then a new origin server is calculated and used. - <code>"ip_cookie"</code>: Behaves the same as <code>"cookie"</code> except the initial origin selection is stable and based on the client’s ip address. - <code>"header"</code>: On the first request to a proxied load balancer, a session key based on the configured HTTP headers (see <code>session_affinity_attributes.headers</code>) is generated, encoding the request headers used for storing in the load balancer session state which origin the request will be forwarded to. Subsequent requests to the load balancer with the same headers will be sent to the same origin server, for the duration of the session and as long as the origin server remains healthy. If the session has been idle for the duration of <code>session_affinity_ttl</code> seconds or the origin server is unhealthy, then a new origin server is calculated and used. See <code>headers</code> in <code>session_affinity_attributes</code> for additional required configuration.

<a href="#">Link to this property</a>

session\_affinity\_attributes: optional <a href="https://developers.cloudflare.com/api/resources/load_balancers#(resource)%20load_balancers%20%3E%20(model)%20session_affinity_attributes%20%3E%20(schema)">SessionAffinityAttributes</a> { drain\_duration, headers, require\_all\_headers, 3 more }

Configures attributes for session affinity.

<a href="#">Link to this property</a>

session\_affinity\_ttl: optional number

Time, in seconds, until a client’s session expires after being created. Once the expiry time has been reached, subsequent requests may get sent to a different origin server. The accepted ranges per <code>session_affinity</code> policy are: - <code>"cookie"</code> / <code>"ip_cookie"</code>: The current default of 23 hours will be used unless explicitly set. The accepted range of values is between \[1800, 604800]. - <code>"header"</code>: The current default of 1800 seconds will be used unless explicitly set. The accepted range of values is between \[30, 3600]. Note: With session affinity by header, sessions only expire after they haven’t been used for the number of seconds specified.

<a href="#">Link to this property</a>

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

<a href="#">Link to this property</a>

ttl: optional number

Time to live (TTL) of the DNS entry for the IP address returned by this load balancer. This only applies to gray-clouded (unproxied) load balancers.

<a href="#">Link to this property</a>

zone\_name: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20load_balancers%20%3E%20(model)%20load_balancer%20%3E%20(schema)>)

<details>

<summary>

LoadShedding object {default\_percent, default\_policy, session\_percent, session\_policy }

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

[Link to this property](#)%20load_balancers%20%3E%20(model)%20load_shedding%20%3E%20(schema)>)

<details>

<summary>

LocationStrategy object {mode, prefer\_ecs }

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

[Link to this property](#)%20load_balancers%20%3E%20(model)%20location_strategy%20%3E%20(schema)>)

<details>

<summary>

NotificationFilter object {origin, pool }

Filter pool and origin health notifications by resource type or health status. Use null to reset.

</summary>

origin: optional <a href="https://developers.cloudflare.com/api/resources/load_balancers#(resource)%20load_balancers%20%3E%20(model)%20filter_options%20%3E%20(schema)">FilterOptions</a> { disable, healthy }

Filter options for a particular resource type (pool or origin). Use null to reset.

<a href="#">Link to this property</a>

pool: optional <a href="https://developers.cloudflare.com/api/resources/load_balancers#(resource)%20load_balancers%20%3E%20(model)%20filter_options%20%3E%20(schema)">FilterOptions</a> { disable, healthy }

Filter options for a particular resource type (pool or origin). Use null to reset.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20load_balancers%20%3E%20(model)%20notification_filter%20%3E%20(schema)>)

<details>

<summary>

Origin object {address, disabled\_at, enabled, 6 more }

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

header: optional <a href="https://developers.cloudflare.com/api/resources/load_balancers#(resource)%20load_balancers%20%3E%20(model)%20header%20%3E%20(schema)">Header</a> { Host }

The request header is used to pass additional information with an HTTP request. Currently supported header is ‘Host’.

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

[Link to this property](#)%20load_balancers%20%3E%20(model)%20origin%20%3E%20(schema)>)

<details>

<summary>

OriginSteering object {policy }

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

[Link to this property](#)%20load_balancers%20%3E%20(model)%20origin_steering%20%3E%20(schema)>)

<details>

<summary>

RandomSteering object {default\_weight, pool\_weights }

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

[Link to this property](#)%20load_balancers%20%3E%20(model)%20random_steering%20%3E%20(schema)>)

<details>

<summary>

Rules object {condition, disabled, fixed\_response, 4 more }

A rule object containing conditions and overrides for this load balancer to evaluate.

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

adaptive\_routing: optional <a href="https://developers.cloudflare.com/api/resources/load_balancers#(resource)%20load_balancers%20%3E%20(model)%20adaptive_routing%20%3E%20(schema)">AdaptiveRouting</a> { failover\_across\_pools }

Controls features that modify the routing of requests to pools and origins in response to dynamic conditions, such as during the interval between active health monitoring requests. For example, zero-downtime failover occurs immediately when an origin becomes unavailable due to HTTP 521, 522, or 523 response codes. If there is another healthy origin in the same pool, the request is retried once against this alternate origin.

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

location\_strategy: optional <a href="https://developers.cloudflare.com/api/resources/load_balancers#(resource)%20load_balancers%20%3E%20(model)%20location_strategy%20%3E%20(schema)">LocationStrategy</a> { mode, prefer\_ecs }

Controls location-based steering for non-proxied requests. See <code>steering_policy</code> to learn how steering is affected.

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

random\_steering: optional <a href="https://developers.cloudflare.com/api/resources/load_balancers#(resource)%20load_balancers%20%3E%20(model)%20random_steering%20%3E%20(schema)">RandomSteering</a> { default\_weight, pool\_weights }

Configures pool weights.

- <code>steering_policy="random"</code>: A random pool is selected with probability proportional to pool weights.
- <code>steering_policy="least_outstanding_requests"</code>: Use pool weights to scale each pool’s outstanding requests.
- <code>steering_policy="least_connections"</code>: Use pool weights to scale each pool’s open connections.

<a href="#">Link to this property</a>

region\_pools: optional map\[array of string]

A mapping of region codes to a list of pool IDs (ordered by their failover priority) for the given region. Any regions not explicitly defined will fall back to using default\_pools.

<a href="#">Link to this property</a>

session\_affinity: optional <a href="https://developers.cloudflare.com/api/resources/load_balancers#(resource)%20load_balancers%20%3E%20(model)%20session_affinity%20%3E%20(schema)">SessionAffinity</a>

Specifies the type of session affinity the load balancer should use unless specified as <code>"none"</code>. The supported types are: - <code>"cookie"</code>: On the first request to a proxied load balancer, a cookie is generated, encoding information of which origin the request will be forwarded to. Subsequent requests, by the same client to the same load balancer, will be sent to the origin server the cookie encodes, for the duration of the cookie and as long as the origin server remains healthy. If the cookie has expired or the origin server is unhealthy, then a new origin server is calculated and used. - <code>"ip_cookie"</code>: Behaves the same as <code>"cookie"</code> except the initial origin selection is stable and based on the client’s ip address. - <code>"header"</code>: On the first request to a proxied load balancer, a session key based on the configured HTTP headers (see <code>session_affinity_attributes.headers</code>) is generated, encoding the request headers used for storing in the load balancer session state which origin the request will be forwarded to. Subsequent requests to the load balancer with the same headers will be sent to the same origin server, for the duration of the session and as long as the origin server remains healthy. If the session has been idle for the duration of <code>session_affinity_ttl</code> seconds or the origin server is unhealthy, then a new origin server is calculated and used. See <code>headers</code> in <code>session_affinity_attributes</code> for additional required configuration.

<a href="#">Link to this property</a>

session\_affinity\_attributes: optional <a href="https://developers.cloudflare.com/api/resources/load_balancers#(resource)%20load_balancers%20%3E%20(model)%20session_affinity_attributes%20%3E%20(schema)">SessionAffinityAttributes</a> { drain\_duration, headers, require\_all\_headers, 3 more }

Configures attributes for session affinity.

<a href="#">Link to this property</a>

session\_affinity\_ttl: optional number

Time, in seconds, until a client’s session expires after being created. Once the expiry time has been reached, subsequent requests may get sent to a different origin server. The accepted ranges per <code>session_affinity</code> policy are: - <code>"cookie"</code> / <code>"ip_cookie"</code>: The current default of 23 hours will be used unless explicitly set. The accepted range of values is between \[1800, 604800]. - <code>"header"</code>: The current default of 1800 seconds will be used unless explicitly set. The accepted range of values is between \[30, 3600]. Note: With session affinity by header, sessions only expire after they haven’t been used for the number of seconds specified.

<a href="#">Link to this property</a>

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

[Link to this property](#)%20load_balancers%20%3E%20(model)%20rules%20%3E%20(schema)>)

<details>

<summary>

SessionAffinity = "none"or "cookie"or "ip\_cookie"or "header"

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

[Link to this property](#)%20load_balancers%20%3E%20(model)%20session_affinity%20%3E%20(schema)>)

<details>

<summary>

SessionAffinityAttributes object {drain\_duration, headers, require\_all\_headers, 3 more }

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

[Link to this property](#)%20load_balancers%20%3E%20(model)%20session_affinity_attributes%20%3E%20(schema)>)

<details>

<summary>

SteeringPolicy = "off"or "geo"or "random"or 5 more

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

[Link to this property](#)%20load_balancers%20%3E%20(model)%20steering_policy%20%3E%20(schema)>)

<details>

<summary>

LoadBalancerDeleteResponse object {id }

</summary>

id: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20load_balancers%20%3E%20(model)%20load_balancer_delete_response%20%3E%20(schema)>)

#### Load BalancersMonitors

##### [List Monitors](https://developers.cloudflare.com/api/resources/load_balancers/subresources/monitors/methods/list)

GET/accounts/{account\_id}/load\_balancers/monitors

##### [Monitor Details](https://developers.cloudflare.com/api/resources/load_balancers/subresources/monitors/methods/get)

GET/accounts/{account\_id}/load\_balancers/monitors/{monitor\_id}

##### [Create Monitor](https://developers.cloudflare.com/api/resources/load_balancers/subresources/monitors/methods/create)

POST/accounts/{account\_id}/load\_balancers/monitors

##### [Update Monitor](https://developers.cloudflare.com/api/resources/load_balancers/subresources/monitors/methods/update)

PUT/accounts/{account\_id}/load\_balancers/monitors/{monitor\_id}

##### [Patch Monitor](https://developers.cloudflare.com/api/resources/load_balancers/subresources/monitors/methods/edit)

PATCH/accounts/{account\_id}/load\_balancers/monitors/{monitor\_id}

##### [Delete Monitor](https://developers.cloudflare.com/api/resources/load_balancers/subresources/monitors/methods/delete)

DELETE/accounts/{account\_id}/load\_balancers/monitors/{monitor\_id}

##### ModelsExpand Collapse

<details>

<summary>

Monitor object {id, allow\_insecure, consecutive\_down, 16 more }

</summary>

id: optional string

<a href="#">Link to this property</a>

allow\_insecure: optional boolean

Do not validate the certificate when monitor use HTTPS. This parameter is currently only valid for HTTP and HTTPS monitors.

<a href="#">Link to this property</a>

consecutive\_down: optional number

To be marked unhealthy the monitored origin must fail this healthcheck N consecutive times.

<a href="#">Link to this property</a>

consecutive\_up: optional number

To be marked healthy the monitored origin must pass this healthcheck N consecutive times.

<a href="#">Link to this property</a>

created\_on: optional string

<a href="#">Link to this property</a>

description: optional string

Object description.

<a href="#">Link to this property</a>

expected\_body: optional string

A case-insensitive sub-string to look for in the response body. If this string is not found, the origin will be marked as unhealthy. This parameter is only valid for HTTP and HTTPS monitors.

<a href="#">Link to this property</a>

expected\_codes: optional string

The expected HTTP response code or code range of the health check. This parameter is only valid for HTTP and HTTPS monitors.

<a href="#">Link to this property</a>

follow\_redirects: optional boolean

Follow redirects if returned by the origin. This parameter is only valid for HTTP and HTTPS monitors.

<a href="#">Link to this property</a>

header: optional map\[array of string]

The HTTP request headers to send in the health check. It is recommended you set a Host header by default. The User-Agent header cannot be overridden. This parameter is only valid for HTTP and HTTPS monitors.

<a href="#">Link to this property</a>

interval: optional number

The interval between each health check. Shorter intervals may improve failover time, but will increase load on the origins as we check from multiple locations.

<a href="#">Link to this property</a>

method: optional string

The method to use for the health check. This defaults to ‘GET’ for HTTP/HTTPS based checks and ‘connection\_established’ for TCP based health checks.

<a href="#">Link to this property</a>

modified\_on: optional string

<a href="#">Link to this property</a>

path: optional string

The endpoint path you want to conduct a health check against. This parameter is only valid for HTTP and HTTPS monitors.

<a href="#">Link to this property</a>

port: optional number

The port number to connect to for the health check. Required for TCP, UDP, and SMTP checks. HTTP and HTTPS checks should only define the port when using a non-standard port (HTTP: default 80, HTTPS: default 443).

<a href="#">Link to this property</a>

probe\_zone: optional string

Assign this monitor to emulate the specified zone while probing. This parameter is only valid for HTTP and HTTPS monitors.

<a href="#">Link to this property</a>

retries: optional number

The number of retries to attempt in case of a timeout before marking the origin as unhealthy. Retries are attempted immediately.

<a href="#">Link to this property</a>

timeout: optional number

The timeout (in seconds) before marking the health check as failed.

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "http"or "https"or "tcp"or 3 more

The protocol to use for the health check. Currently supported protocols are ‘HTTP’,‘HTTPS’, ‘TCP’, ‘ICMP-PING’, ‘UDP-ICMP’, and ‘SMTP’.

</summary>

One of the following:

"http"

<a href="#">Link to this property</a>

"https"

<a href="#">Link to this property</a>

"tcp"

<a href="#">Link to this property</a>

"udp\_icmp"

<a href="#">Link to this property</a>

"icmp\_ping"

<a href="#">Link to this property</a>

"smtp"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20load_balancers.monitors%20%3E%20(model)%20monitor%20%3E%20(schema)>)

<details>

<summary>

MonitorDeleteResponse object {id }

</summary>

id: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20load_balancers.monitors%20%3E%20(model)%20monitor_delete_response%20%3E%20(schema)>)

#### Load BalancersMonitorsPreviews

##### [Preview Monitor](https://developers.cloudflare.com/api/resources/load_balancers/subresources/monitors/subresources/previews/methods/create)

POST/accounts/{account\_id}/load\_balancers/monitors/{monitor\_id}/preview

##### ModelsExpand Collapse

<details>

<summary>

PreviewCreateResponse object {pools, preview\_id }

</summary>

pools: optional map\[string]

Monitored pool IDs mapped to their respective names.

<a href="#">Link to this property</a>

preview\_id: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20load_balancers.monitors.previews%20%3E%20(model)%20preview_create_response%20%3E%20(schema)>)

#### Load BalancersMonitorsReferences

##### [List Monitor References](https://developers.cloudflare.com/api/resources/load_balancers/subresources/monitors/subresources/references/methods/get)

GET/accounts/{account\_id}/load\_balancers/monitors/{monitor\_id}/references

##### ModelsExpand Collapse

<details>

<summary>

ReferenceGetResponse object {reference\_type, resource\_id, resource\_name, resource\_type }

</summary>

<details>

<summary>

reference\_type: optional "\*"or "referral"or "referrer"

</summary>

One of the following:

"\*"

<a href="#">Link to this property</a>

"referral"

<a href="#">Link to this property</a>

"referrer"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

resource\_id: optional string

<a href="#">Link to this property</a>

resource\_name: optional string

<a href="#">Link to this property</a>

resource\_type: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20load_balancers.monitors.references%20%3E%20(model)%20reference_get_response%20%3E%20(schema)>)

#### Load BalancersMonitor Groups

##### [List Monitor Groups](https://developers.cloudflare.com/api/resources/load_balancers/subresources/monitor_groups/methods/list)

GET/accounts/{account\_id}/load\_balancers/monitor\_groups

##### [Monitor Group Details](https://developers.cloudflare.com/api/resources/load_balancers/subresources/monitor_groups/methods/get)

GET/accounts/{account\_id}/load\_balancers/monitor\_groups/{monitor\_group\_id}

##### [Create Monitor Group](https://developers.cloudflare.com/api/resources/load_balancers/subresources/monitor_groups/methods/create)

POST/accounts/{account\_id}/load\_balancers/monitor\_groups

##### [Update Monitor Group](https://developers.cloudflare.com/api/resources/load_balancers/subresources/monitor_groups/methods/update)

PUT/accounts/{account\_id}/load\_balancers/monitor\_groups/{monitor\_group\_id}

##### [Patch Monitor Group](https://developers.cloudflare.com/api/resources/load_balancers/subresources/monitor_groups/methods/edit)

PATCH/accounts/{account\_id}/load\_balancers/monitor\_groups/{monitor\_group\_id}

##### [Delete Monitor Group](https://developers.cloudflare.com/api/resources/load_balancers/subresources/monitor_groups/methods/delete)

DELETE/accounts/{account\_id}/load\_balancers/monitor\_groups/{monitor\_group\_id}

##### ModelsExpand Collapse

<details>

<summary>

MonitorGroup object {id, description, members, 2 more }

</summary>

id: string

The ID of the Monitor Group to use for checking the health of origins within this pool.

<a href="#">Link to this property</a>

description: string

A short description of the monitor group

<a href="#">Link to this property</a>

<details>

<summary>

members: array of object {enabled, monitor\_id, monitoring\_only, 3 more }

List of monitors in this group

</summary>

enabled: boolean

Whether this monitor is enabled in the group

<a href="#">Link to this property</a>

monitor\_id: string

The ID of the Monitor to use for checking the health of origins within this pool.

<a href="#">Link to this property</a>

monitoring\_only: boolean

Whether this monitor is used for monitoring only (does not affect pool health)

<a href="#">Link to this property</a>

must\_be\_healthy: boolean

Whether this monitor must be healthy for the pool to be considered healthy

<a href="#">Link to this property</a>

created\_at: optional string

The timestamp of when the monitor was added to the group

formatdate-time

<a href="#">Link to this property</a>

updated\_at: optional string

The timestamp of when the monitor group member was last updated

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_on: optional string

The timestamp of when the monitor group was created

formatdate-time

<a href="#">Link to this property</a>

modified\_on: optional string

The timestamp of when the monitor group was last updated

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20load_balancers.monitor_groups%20%3E%20(model)%20monitor_group%20%3E%20(schema)>)

#### Load BalancersMonitor GroupsReferences

##### [List Monitor Group References](https://developers.cloudflare.com/api/resources/load_balancers/subresources/monitor_groups/subresources/references/methods/get)

GET/accounts/{account\_id}/load\_balancers/monitor\_groups/{monitor\_group\_id}/references

##### ModelsExpand Collapse

<details>

<summary>

ReferenceGetResponse object {reference\_type, resource\_id, resource\_name, resource\_type }

</summary>

<details>

<summary>

reference\_type: optional "\*"or "referral"or "referrer"

</summary>

One of the following:

"\*"

<a href="#">Link to this property</a>

"referral"

<a href="#">Link to this property</a>

"referrer"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

resource\_id: optional string

<a href="#">Link to this property</a>

resource\_name: optional string

<a href="#">Link to this property</a>

resource\_type: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20load_balancers.monitor_groups.references%20%3E%20(model)%20reference_get_response%20%3E%20(schema)>)

#### Load BalancersPools

##### [List Pools](https://developers.cloudflare.com/api/resources/load_balancers/subresources/pools/methods/list)

GET/accounts/{account\_id}/load\_balancers/pools

##### [Pool Details](https://developers.cloudflare.com/api/resources/load_balancers/subresources/pools/methods/get)

GET/accounts/{account\_id}/load\_balancers/pools/{pool\_id}

##### [Create Pool](https://developers.cloudflare.com/api/resources/load_balancers/subresources/pools/methods/create)

POST/accounts/{account\_id}/load\_balancers/pools

##### [Update Pool](https://developers.cloudflare.com/api/resources/load_balancers/subresources/pools/methods/update)

PUT/accounts/{account\_id}/load\_balancers/pools/{pool\_id}

##### [Patch Pool](https://developers.cloudflare.com/api/resources/load_balancers/subresources/pools/methods/edit)

PATCH/accounts/{account\_id}/load\_balancers/pools/{pool\_id}

##### [Delete Pool](https://developers.cloudflare.com/api/resources/load_balancers/subresources/pools/methods/delete)

DELETE/accounts/{account\_id}/load\_balancers/pools/{pool\_id}

##### [Patch Pools](https://developers.cloudflare.com/api/resources/load_balancers/subresources/pools/methods/bulk_edit)

PATCH/accounts/{account\_id}/load\_balancers/pools

##### ModelsExpand Collapse

<details>

<summary>

Pool object {id, check\_regions, created\_on, 17 more }

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

load\_shedding: optional <a href="https://developers.cloudflare.com/api/resources/load_balancers#(resource)%20load_balancers%20%3E%20(model)%20load_shedding%20%3E%20(schema)">LoadShedding</a> { default\_percent, default\_policy, session\_percent, session\_policy }

Configures load shedding policies and percentages for the pool.

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

notification\_filter: optional <a href="https://developers.cloudflare.com/api/resources/load_balancers#(resource)%20load_balancers%20%3E%20(model)%20notification_filter%20%3E%20(schema)">NotificationFilter</a> { origin, pool }

Filter pool and origin health notifications by resource type or health status. Use null to reset.

<a href="#">Link to this property</a>

origin\_steering: optional <a href="https://developers.cloudflare.com/api/resources/load_balancers#(resource)%20load_balancers%20%3E%20(model)%20origin_steering%20%3E%20(schema)">OriginSteering</a> { policy }

Configures origin steering for the pool. Controls how origins are selected for new sessions and traffic without session affinity.

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

header: optional <a href="https://developers.cloudflare.com/api/resources/load_balancers#(resource)%20load_balancers%20%3E%20(model)%20header%20%3E%20(schema)">Header</a> { Host }

The request header is used to pass additional information with an HTTP request. Currently supported header is ‘Host’.

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

[Link to this property](#)%20load_balancers.pools%20%3E%20(model)%20pool%20%3E%20(schema)>)

<details>

<summary>

PoolDeleteResponse object {id }

</summary>

id: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20load_balancers.pools%20%3E%20(model)%20pool_delete_response%20%3E%20(schema)>)

#### Load BalancersPoolsHealth

##### [Pool Health Details](https://developers.cloudflare.com/api/resources/load_balancers/subresources/pools/subresources/health/methods/get)

GET/accounts/{account\_id}/load\_balancers/pools/{pool\_id}/health

##### [Preview Pool](https://developers.cloudflare.com/api/resources/load_balancers/subresources/pools/subresources/health/methods/create)

POST/accounts/{account\_id}/load\_balancers/pools/{pool\_id}/preview

##### ModelsExpand Collapse

<details>

<summary>

HealthGetResponse object {pool\_id, pop\_health }

A list of regions from which to run health checks. Null means every Cloudflare data center.

</summary>

pool\_id: optional string

Pool ID.

<a href="#">Link to this property</a>

<details>

<summary>

pop\_health: optional object {healthy, origins }

List of regions and associated health status.

</summary>

healthy: optional boolean

Whether health check in region is healthy.

<a href="#">Link to this property</a>

<details>

<summary>

origins: optional array of object {ip }

</summary>

<details>

<summary>

ip: optional object {failure\_reason, healthy, response\_code, rtt }

</summary>

failure\_reason: optional string

Failure reason.

<a href="#">Link to this property</a>

healthy: optional boolean

Origin health status.

<a href="#">Link to this property</a>

response\_code: optional number

Response code from origin health check.

<a href="#">Link to this property</a>

rtt: optional string

Origin RTT (Round Trip Time) response.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20load_balancers.pools.health%20%3E%20(model)%20health_get_response%20%3E%20(schema)>)

<details>

<summary>

HealthCreateResponse object {pools, preview\_id }

</summary>

pools: optional map\[string]

Monitored pool IDs mapped to their respective names.

<a href="#">Link to this property</a>

preview\_id: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20load_balancers.pools.health%20%3E%20(model)%20health_create_response%20%3E%20(schema)>)

#### Load BalancersPoolsReferences

##### [List Pool References](https://developers.cloudflare.com/api/resources/load_balancers/subresources/pools/subresources/references/methods/get)

GET/accounts/{account\_id}/load\_balancers/pools/{pool\_id}/references

##### ModelsExpand Collapse

<details>

<summary>

ReferenceGetResponse object {reference\_type, resource\_id, resource\_name, resource\_type }

</summary>

<details>

<summary>

reference\_type: optional "\*"or "referral"or "referrer"

</summary>

One of the following:

"\*"

<a href="#">Link to this property</a>

"referral"

<a href="#">Link to this property</a>

"referrer"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

resource\_id: optional string

<a href="#">Link to this property</a>

resource\_name: optional string

<a href="#">Link to this property</a>

resource\_type: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20load_balancers.pools.references%20%3E%20(model)%20reference_get_response%20%3E%20(schema)>)

#### Load BalancersPreviews

##### [Preview Result](https://developers.cloudflare.com/api/resources/load_balancers/subresources/previews/methods/get)

GET/accounts/{account\_id}/load\_balancers/preview/{preview\_id}

##### ModelsExpand Collapse

<details>

<summary>

PreviewGetResponse = map\[object {healthy, origins } ]

Resulting health data from a preview operation.

</summary>

healthy: optional boolean

<a href="#">Link to this property</a>

<details>

<summary>

origins: optional array of map\[object {failure\_reason, healthy, response\_code, rtt } ]

</summary>

failure\_reason: optional string

<a href="#">Link to this property</a>

healthy: optional boolean

<a href="#">Link to this property</a>

response\_code: optional number

<a href="#">Link to this property</a>

rtt: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20load_balancers.previews%20%3E%20(model)%20preview_get_response%20%3E%20(schema)>)

#### Load BalancersRegions

##### [List Regions](https://developers.cloudflare.com/api/resources/load_balancers/subresources/regions/methods/list)

GET/accounts/{account\_id}/load\_balancers/regions

##### [Get Region](https://developers.cloudflare.com/api/resources/load_balancers/subresources/regions/methods/get)

GET/accounts/{account\_id}/load\_balancers/regions/{region\_id}

##### ModelsExpand Collapse

<details>

<summary>

RegionListResponse = unknownor string

</summary>

One of the following:

unknown

<a href="#">Link to this property</a>

string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20load_balancers.regions%20%3E%20(model)%20region_list_response%20%3E%20(schema)>)

<details>

<summary>

RegionGetResponse = unknownor string

A list of countries and subdivisions mapped to a region.

</summary>

One of the following:

unknown

<a href="#">Link to this property</a>

string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20load_balancers.regions%20%3E%20(model)%20region_get_response%20%3E%20(schema)>)

#### Load BalancersSearches

##### [Search Resources](https://developers.cloudflare.com/api/resources/load_balancers/subresources/searches/methods/list)

GET/accounts/{account\_id}/load\_balancers/search

##### ModelsExpand Collapse

<details>

<summary>

SearchListResponse object {resources }

</summary>

<details>

<summary>

resources: optional array of object {reference\_type, references, resource\_id, 2 more }

A list of resources matching the search query.

</summary>

<details>

<summary>

reference\_type: optional "referral"or "referrer"

When listed as a reference, the type (direction) of the reference.

</summary>

One of the following:

"referral"

<a href="#">Link to this property</a>

"referrer"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

references: optional array of unknown

A list of references to (referrer) or from (referral) this resource.

<a href="#">Link to this property</a>

resource\_id: optional string

<a href="#">Link to this property</a>

resource\_name: optional string

The human-identifiable name of the resource.

<a href="#">Link to this property</a>

<details>

<summary>

resource\_type: optional "load\_balancer"or "monitor"or "pool"

The type of the resource.

</summary>

One of the following:

"load\_balancer"

<a href="#">Link to this property</a>

"monitor"

<a href="#">Link to this property</a>

"pool"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20load_balancers.searches%20%3E%20(model)%20search_list_response%20%3E%20(schema)>)