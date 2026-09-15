---
title: Spectrum
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Spectrum

##### ModelsExpand Collapse

<details>

<summary>

DNS object {name, type }

The name and type of DNS record for the Spectrum application.

</summary>

name: optional string

The name of the DNS record associated with the application.

formathostname

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "CNAME"or "ADDRESS"

The type of DNS record associated with the application.

</summary>

One of the following:

"CNAME"

<a href="#">Link to this property</a>

"ADDRESS"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20spectrum%20%3E%20(model)%20dns%20%3E%20(schema)>)

<details>

<summary>

EdgeIPs = object {connectivity, type } or object {ips, type }

The anycast edge IP configuration for the hostname of this application.

</summary>

One of the following:

<details>

<summary>

Dynamic object {connectivity, type }

</summary>

<details>

<summary>

connectivity: optional "all"or "ipv4"or "ipv6"

The IP versions supported for inbound connections on Spectrum anycast IPs.

</summary>

One of the following:

"all"

<a href="#">Link to this property</a>

"ipv4"

<a href="#">Link to this property</a>

"ipv6"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: optional "dynamic"

The type of edge IP configuration specified. Dynamically allocated edge IPs use Spectrum anycast IPs in accordance with the connectivity you specify. Only valid with CNAME DNS names.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Static object {ips, type }

</summary>

ips: optional array of string

The array of customer owned IPs we broadcast via anycast for this hostname and application.

<a href="#">Link to this property</a>

type: optional "static"

The type of edge IP configuration specified. Statically allocated edge IPs use customer IPs in accordance with the ips array you specify. Only valid with ADDRESS DNS names.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20spectrum%20%3E%20(model)%20edge_ips%20%3E%20(schema)>)

<details>

<summary>

OriginDNS object {name, ttl, type }

The name and type of DNS record for the Spectrum application.

</summary>

name: optional string

The name of the DNS record associated with the origin.

formathostname

<a href="#">Link to this property</a>

ttl: optional number

The TTL of our resolution of your DNS record in seconds.

minimum600

<a href="#">Link to this property</a>

<details>

<summary>

type: optional ""or "A"or "AAAA"or "SRV"

The type of DNS record associated with the origin. "" is used to specify a combination of A/AAAA records.

</summary>

One of the following:

""

<a href="#">Link to this property</a>

"A"

<a href="#">Link to this property</a>

"AAAA"

<a href="#">Link to this property</a>

"SRV"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20spectrum%20%3E%20(model)%20origin_dns%20%3E%20(schema)>)

<details>

<summary>

OriginPort = numberor string

The destination port at the origin. Only specified in conjunction with origin\_dns. May use an integer to specify a single origin port, for example <code>1000</code>, or a string to specify a range of origin ports, for example <code>"1000-2000"</code>. Notes: If specifying a port range, the number of ports in the range must match the number of ports specified in the “protocol” field.

</summary>

One of the following:

number

<a href="#">Link to this property</a>

string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20spectrum%20%3E%20(model)%20origin_port%20%3E%20(schema)>)

#### SpectrumAnalytics

#### SpectrumAnalyticsAggregates

#### SpectrumAnalyticsAggregatesCurrents

##### [Get current aggregated analytics](https://developers.cloudflare.com/api/resources/spectrum/subresources/analytics/subresources/aggregates/subresources/currents/methods/get)

GET/zones/{zone\_id}/spectrum/analytics/aggregate/current

##### ModelsExpand Collapse

<details>

<summary>

CurrentGetResponse = array of object {appID, bytesEgress, bytesIngress, 2 more }

</summary>

appID: string

Application identifier.

maxLength32

<a href="#">Link to this property</a>

bytesEgress: number

Number of bytes sent.

<a href="#">Link to this property</a>

bytesIngress: number

Number of bytes received.

<a href="#">Link to this property</a>

connections: number

Number of connections.

<a href="#">Link to this property</a>

durationAvg: number

Average duration of connections.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20spectrum.analytics.aggregates.currents%20%3E%20(model)%20current_get_response%20%3E%20(schema)>)

#### SpectrumAnalyticsEvents

##### ModelsExpand Collapse

<details>

<summary>

Dimension = "event"or "appID"or "coloName"or "ipVersion"

</summary>

One of the following:

"event"

<a href="#">Link to this property</a>

"appID"

<a href="#">Link to this property</a>

"coloName"

<a href="#">Link to this property</a>

"ipVersion"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20spectrum.analytics.events%20%3E%20(model)%20dimension%20%3E%20(schema)>)

#### SpectrumAnalyticsEventsBytimes

##### [Get analytics by time](https://developers.cloudflare.com/api/resources/spectrum/subresources/analytics/subresources/events/subresources/bytimes/methods/get)

GET/zones/{zone\_id}/spectrum/analytics/events/bytime

##### ModelsExpand Collapse

<details>

<summary>

BytimeGetResponse object {data, data\_lag, max, 5 more }

</summary>

<details>

<summary>

data: array of object {dimensions, metrics }

List of columns returned by the analytics query.

</summary>

dimensions: optional array of string

<a href="#">Link to this property</a>

<details>

<summary>

metrics: optional array of numberor array of array of number

</summary>

One of the following:

array of number

<a href="#">Link to this property</a>

array of array of number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

data\_lag: number

Number of seconds between current time and last processed event, i.e. how many seconds of data could be missing.

minimum0

<a href="#">Link to this property</a>

max: map\[number]

Maximum result for each selected metrics across all data.

<a href="#">Link to this property</a>

min: map\[number]

Minimum result for each selected metrics across all data.

<a href="#">Link to this property</a>

<details>

<summary>

query: object {dimensions, filters, limit, 4 more }

</summary>

<details>

<summary>

dimensions: optional array of <a href="https://developers.cloudflare.com/api/resources/spectrum#(resource)%20spectrum.analytics.events%20%3E%20(model)%20dimension%20%3E%20(schema)">Dimension</a>

Can be used to break down the data by given attributes. Options are:

| Dimension | Name | Example |
| --- | --- | --- |
| event | Connection Event | connect, progress, disconnect, originError, clientFiltered |
| appID | Application ID | 40d67c87c6cd4b889a4fd57805225e85 |
| coloName | Colo Name | SFO |
| ipVersion | IP version used by the client | 4, 6. |

</summary>

One of the following:

"event"

<a href="#">Link to this property</a>

"appID"

<a href="#">Link to this property</a>

"coloName"

<a href="#">Link to this property</a>

"ipVersion"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

filters: optional string

Used to filter rows by one or more dimensions. Filters can be combined using OR and AND boolean logic. AND takes precedence over OR in all the expressions. The OR operator is defined using a comma (,) or OR keyword surrounded by whitespace. The AND operator is defined using a semicolon (;) or AND keyword surrounded by whitespace. Note that the semicolon is a reserved character in URLs (rfc1738) and needs to be percent-encoded as %3B. Comparison options are:

| Operator | Name | URL Encoded |
| --- | --- | --- |
| == | Equals | %3D%3D |
| != | Does not equals | !%3D |
| &gt; | Greater Than | %3E |
| &lt; | Less Than | %3C |
| &gt;= | Greater than or equal to | %3E%3D |
| &lt;= | Less than or equal to | %3C%3D |

Use the above to construct filters.

<a href="#">Link to this property</a>

limit: optional number

Limit number of returned metrics.

<a href="#">Link to this property</a>

<details>

<summary>

metrics: optional array of "count"or "bytesIngress"or "bytesEgress"or 4 more

One or more metrics to compute. Options are:

| Metric | Name | Example | Unit |
| --- | --- | --- | --- |
| count | Count of total events | 1000 | Count |
| bytesIngress | Sum of ingress bytes | 1000 | Sum |
| bytesEgress | Sum of egress bytes | 1000 | Sum |
| durationAvg | Average connection duration | 1.0 | Time in milliseconds |
| durationMedian | Median connection duration | 1.0 | Time in milliseconds |
| duration90th | 90th percentile connection duration | 1.0 | Time in milliseconds |
| duration99th | 99th percentile connection duration | 1.0 | Time in milliseconds. |

</summary>

One of the following:

"count"

<a href="#">Link to this property</a>

"bytesIngress"

<a href="#">Link to this property</a>

"bytesEgress"

<a href="#">Link to this property</a>

"durationAvg"

<a href="#">Link to this property</a>

"durationMedian"

<a href="#">Link to this property</a>

"duration90th"

<a href="#">Link to this property</a>

"duration99th"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

since: optional string

Start of time interval to query, defaults to <code>until</code> - 6 hours. Timestamp must be in RFC3339 format and uses UTC unless otherwise specified.

formatdate-time

<a href="#">Link to this property</a>

sort: optional array of string

The sort order for the result set; sort fields must be included in <code>metrics</code> or <code>dimensions</code>.

<a href="#">Link to this property</a>

until: optional string

End of time interval to query, defaults to current time. Timestamp must be in RFC3339 format and uses UTC unless otherwise specified.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

rows: number

Total number of rows in the result.

minimum0

<a href="#">Link to this property</a>

totals: map\[number]

Total result for each selected metrics across all data.

<a href="#">Link to this property</a>

time\_intervals: optional array of array of string

List of time interval buckets: \[start, end].

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20spectrum.analytics.events.bytimes%20%3E%20(model)%20bytime_get_response%20%3E%20(schema)>)

#### SpectrumAnalyticsEventsSummaries

##### [Get analytics summary](https://developers.cloudflare.com/api/resources/spectrum/subresources/analytics/subresources/events/subresources/summaries/methods/get)

GET/zones/{zone\_id}/spectrum/analytics/events/summary

##### ModelsExpand Collapse

<details>

<summary>

SummaryGetResponse object {data, data\_lag, max, 5 more }

</summary>

<details>

<summary>

data: array of object {dimensions, metrics }

List of columns returned by the analytics query.

</summary>

dimensions: optional array of string

<a href="#">Link to this property</a>

<details>

<summary>

metrics: optional array of numberor array of array of number

</summary>

One of the following:

array of number

<a href="#">Link to this property</a>

array of array of number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

data\_lag: number

Number of seconds between current time and last processed event, i.e. how many seconds of data could be missing.

minimum0

<a href="#">Link to this property</a>

max: map\[number]

Maximum result for each selected metrics across all data.

<a href="#">Link to this property</a>

min: map\[number]

Minimum result for each selected metrics across all data.

<a href="#">Link to this property</a>

<details>

<summary>

query: object {dimensions, filters, limit, 4 more }

</summary>

<details>

<summary>

dimensions: optional array of <a href="https://developers.cloudflare.com/api/resources/spectrum#(resource)%20spectrum.analytics.events%20%3E%20(model)%20dimension%20%3E%20(schema)">Dimension</a>

Can be used to break down the data by given attributes. Options are:

| Dimension | Name | Example |
| --- | --- | --- |
| event | Connection Event | connect, progress, disconnect, originError, clientFiltered |
| appID | Application ID | 40d67c87c6cd4b889a4fd57805225e85 |
| coloName | Colo Name | SFO |
| ipVersion | IP version used by the client | 4, 6. |

</summary>

One of the following:

"event"

<a href="#">Link to this property</a>

"appID"

<a href="#">Link to this property</a>

"coloName"

<a href="#">Link to this property</a>

"ipVersion"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

filters: optional string

Used to filter rows by one or more dimensions. Filters can be combined using OR and AND boolean logic. AND takes precedence over OR in all the expressions. The OR operator is defined using a comma (,) or OR keyword surrounded by whitespace. The AND operator is defined using a semicolon (;) or AND keyword surrounded by whitespace. Note that the semicolon is a reserved character in URLs (rfc1738) and needs to be percent-encoded as %3B. Comparison options are:

| Operator | Name | URL Encoded |
| --- | --- | --- |
| == | Equals | %3D%3D |
| != | Does not equals | !%3D |
| &gt; | Greater Than | %3E |
| &lt; | Less Than | %3C |
| &gt;= | Greater than or equal to | %3E%3D |
| &lt;= | Less than or equal to | %3C%3D |

Use the above to construct filters.

<a href="#">Link to this property</a>

limit: optional number

Limit number of returned metrics.

<a href="#">Link to this property</a>

<details>

<summary>

metrics: optional array of "count"or "bytesIngress"or "bytesEgress"or 4 more

One or more metrics to compute. Options are:

| Metric | Name | Example | Unit |
| --- | --- | --- | --- |
| count | Count of total events | 1000 | Count |
| bytesIngress | Sum of ingress bytes | 1000 | Sum |
| bytesEgress | Sum of egress bytes | 1000 | Sum |
| durationAvg | Average connection duration | 1.0 | Time in milliseconds |
| durationMedian | Median connection duration | 1.0 | Time in milliseconds |
| duration90th | 90th percentile connection duration | 1.0 | Time in milliseconds |
| duration99th | 99th percentile connection duration | 1.0 | Time in milliseconds. |

</summary>

One of the following:

"count"

<a href="#">Link to this property</a>

"bytesIngress"

<a href="#">Link to this property</a>

"bytesEgress"

<a href="#">Link to this property</a>

"durationAvg"

<a href="#">Link to this property</a>

"durationMedian"

<a href="#">Link to this property</a>

"duration90th"

<a href="#">Link to this property</a>

"duration99th"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

since: optional string

Start of time interval to query, defaults to <code>until</code> - 6 hours. Timestamp must be in RFC3339 format and uses UTC unless otherwise specified.

formatdate-time

<a href="#">Link to this property</a>

sort: optional array of string

The sort order for the result set; sort fields must be included in <code>metrics</code> or <code>dimensions</code>.

<a href="#">Link to this property</a>

until: optional string

End of time interval to query, defaults to current time. Timestamp must be in RFC3339 format and uses UTC unless otherwise specified.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

rows: number

Total number of rows in the result.

minimum0

<a href="#">Link to this property</a>

totals: map\[number]

Total result for each selected metrics across all data.

<a href="#">Link to this property</a>

time\_intervals: optional array of array of string

List of time interval buckets: \[start, end].

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20spectrum.analytics.events.summaries%20%3E%20(model)%20summary_get_response%20%3E%20(schema)>)

#### SpectrumApps

##### [List Spectrum applications](https://developers.cloudflare.com/api/resources/spectrum/subresources/apps/methods/list)

GET/zones/{zone\_id}/spectrum/apps

##### [Get Spectrum application configuration](https://developers.cloudflare.com/api/resources/spectrum/subresources/apps/methods/get)

GET/zones/{zone\_id}/spectrum/apps/{app\_id}

##### [Create Spectrum application using a name for the origin](https://developers.cloudflare.com/api/resources/spectrum/subresources/apps/methods/create)

POST/zones/{zone\_id}/spectrum/apps

##### [Update Spectrum application configuration using a name for the origin](https://developers.cloudflare.com/api/resources/spectrum/subresources/apps/methods/update)

PUT/zones/{zone\_id}/spectrum/apps/{app\_id}

##### [Delete Spectrum application](https://developers.cloudflare.com/api/resources/spectrum/subresources/apps/methods/delete)

DELETE/zones/{zone\_id}/spectrum/apps/{app\_id}

##### ModelsExpand Collapse

<details>

<summary>

AppListResponse = object {id, created\_on, dns, 12 more } or object {id, created\_on, dns, 3 more }

</summary>

One of the following:

<details>

<summary>

SpectrumConfigAppConfig object {id, created\_on, dns, 12 more }

</summary>

id: string

App identifier.

maxLength32

<a href="#">Link to this property</a>

created\_on: string

When the Application was created.

formatdate-time

<a href="#">Link to this property</a>

dns: <a href="https://developers.cloudflare.com/api/resources/spectrum#(resource)%20spectrum%20%3E%20(model)%20dns%20%3E%20(schema)">DNS</a> { name, type }

The name and type of DNS record for the Spectrum application.

<a href="#">Link to this property</a>

modified\_on: string

When the Application was last modified.

formatdate-time

<a href="#">Link to this property</a>

protocol: string

The port configuration at Cloudflare’s edge. May specify a single port, for example <code>"tcp/1000"</code>, or a range of ports, for example <code>"tcp/1000-2000"</code>.

<a href="#">Link to this property</a>

<details>

<summary>

traffic\_type: "direct"or "http"or "https"

Determines how data travels from the edge to your origin. When set to “direct”, Spectrum will send traffic directly to your origin, and the application’s type is derived from the <code>protocol</code>. When set to “http” or “https”, Spectrum will apply Cloudflare’s HTTP/HTTPS features as it sends traffic to your origin, and the application type matches this property exactly.

</summary>

One of the following:

"direct"

<a href="#">Link to this property</a>

"http"

<a href="#">Link to this property</a>

"https"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

argo\_smart\_routing: optional boolean

Enables Argo Smart Routing for this application. Notes: Only available for TCP or UDP applications with traffic\_type set to “direct”.

<a href="#">Link to this property</a>

edge\_ips: optional <a href="https://developers.cloudflare.com/api/resources/spectrum#(resource)%20spectrum%20%3E%20(model)%20edge_ips%20%3E%20(schema)">EdgeIPs</a>

The anycast edge IP configuration for the hostname of this application.

<a href="#">Link to this property</a>

ip\_firewall: optional boolean

Enables IP Access Rules for this application. Notes: Only available for TCP applications.

<a href="#">Link to this property</a>

origin\_direct: optional array of string

List of origin IP addresses. Array may contain multiple IP addresses for load balancing.

<a href="#">Link to this property</a>

origin\_dns: optional <a href="https://developers.cloudflare.com/api/resources/spectrum#(resource)%20spectrum%20%3E%20(model)%20origin_dns%20%3E%20(schema)">OriginDNS</a> { name, ttl, type }

The name and type of DNS record for the Spectrum application.

<a href="#">Link to this property</a>

origin\_port: optional <a href="https://developers.cloudflare.com/api/resources/spectrum#(resource)%20spectrum%20%3E%20(model)%20origin_port%20%3E%20(schema)">OriginPort</a>

The destination port at the origin. Only specified in conjunction with origin\_dns. May use an integer to specify a single origin port, for example <code>1000</code>, or a string to specify a range of origin ports, for example <code>"1000-2000"</code>. Notes: If specifying a port range, the number of ports in the range must match the number of ports specified in the “protocol” field.

maximum65535

minimum1

<a href="#">Link to this property</a>

<details>

<summary>

proxy\_protocol: optional "off"or "v1"or "v2"or "simple"

Enables Proxy Protocol to the origin. Refer to <a href="https://developers.cloudflare.com/spectrum/getting-started/proxy-protocol/">Enable Proxy protocol</a> for implementation details on PROXY Protocol V1, PROXY Protocol V2, and Simple Proxy Protocol.

</summary>

One of the following:

"off"

<a href="#">Link to this property</a>

"v1"

<a href="#">Link to this property</a>

"v2"

<a href="#">Link to this property</a>

"simple"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

tls: optional "off"or "flexible"or "full"or "strict"

The type of TLS termination associated with the application.

</summary>

One of the following:

"off"

<a href="#">Link to this property</a>

"flexible"

<a href="#">Link to this property</a>

"full"

<a href="#">Link to this property</a>

"strict"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

virtual\_network\_id: optional string

Optional UUID of a virtual network for routing origin traffic through tunnel virtual networks.

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

SpectrumConfigPaygoAppConfig object {id, created\_on, dns, 3 more }

</summary>

id: string

App identifier.

maxLength32

<a href="#">Link to this property</a>

created\_on: string

When the Application was created.

formatdate-time

<a href="#">Link to this property</a>

dns: <a href="https://developers.cloudflare.com/api/resources/spectrum#(resource)%20spectrum%20%3E%20(model)%20dns%20%3E%20(schema)">DNS</a> { name, type }

The name and type of DNS record for the Spectrum application.

<a href="#">Link to this property</a>

modified\_on: string

When the Application was last modified.

formatdate-time

<a href="#">Link to this property</a>

protocol: string

The port configuration at Cloudflare’s edge. May specify a single port, for example <code>"tcp/1000"</code>, or a range of ports, for example <code>"tcp/1000-2000"</code>.

<a href="#">Link to this property</a>

origin\_direct: optional array of string

List of origin IP addresses. Array may contain multiple IP addresses for load balancing.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20spectrum.apps%20%3E%20(model)%20app_list_response%20%3E%20(schema)>)

<details>

<summary>

AppGetResponse = object {id, created\_on, dns, 12 more } or object {id, created\_on, dns, 3 more }

</summary>

One of the following:

<details>

<summary>

SpectrumConfigAppConfig object {id, created\_on, dns, 12 more }

</summary>

id: string

App identifier.

maxLength32

<a href="#">Link to this property</a>

created\_on: string

When the Application was created.

formatdate-time

<a href="#">Link to this property</a>

dns: <a href="https://developers.cloudflare.com/api/resources/spectrum#(resource)%20spectrum%20%3E%20(model)%20dns%20%3E%20(schema)">DNS</a> { name, type }

The name and type of DNS record for the Spectrum application.

<a href="#">Link to this property</a>

modified\_on: string

When the Application was last modified.

formatdate-time

<a href="#">Link to this property</a>

protocol: string

The port configuration at Cloudflare’s edge. May specify a single port, for example <code>"tcp/1000"</code>, or a range of ports, for example <code>"tcp/1000-2000"</code>.

<a href="#">Link to this property</a>

<details>

<summary>

traffic\_type: "direct"or "http"or "https"

Determines how data travels from the edge to your origin. When set to “direct”, Spectrum will send traffic directly to your origin, and the application’s type is derived from the <code>protocol</code>. When set to “http” or “https”, Spectrum will apply Cloudflare’s HTTP/HTTPS features as it sends traffic to your origin, and the application type matches this property exactly.

</summary>

One of the following:

"direct"

<a href="#">Link to this property</a>

"http"

<a href="#">Link to this property</a>

"https"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

argo\_smart\_routing: optional boolean

Enables Argo Smart Routing for this application. Notes: Only available for TCP or UDP applications with traffic\_type set to “direct”.

<a href="#">Link to this property</a>

edge\_ips: optional <a href="https://developers.cloudflare.com/api/resources/spectrum#(resource)%20spectrum%20%3E%20(model)%20edge_ips%20%3E%20(schema)">EdgeIPs</a>

The anycast edge IP configuration for the hostname of this application.

<a href="#">Link to this property</a>

ip\_firewall: optional boolean

Enables IP Access Rules for this application. Notes: Only available for TCP applications.

<a href="#">Link to this property</a>

origin\_direct: optional array of string

List of origin IP addresses. Array may contain multiple IP addresses for load balancing.

<a href="#">Link to this property</a>

origin\_dns: optional <a href="https://developers.cloudflare.com/api/resources/spectrum#(resource)%20spectrum%20%3E%20(model)%20origin_dns%20%3E%20(schema)">OriginDNS</a> { name, ttl, type }

The name and type of DNS record for the Spectrum application.

<a href="#">Link to this property</a>

origin\_port: optional <a href="https://developers.cloudflare.com/api/resources/spectrum#(resource)%20spectrum%20%3E%20(model)%20origin_port%20%3E%20(schema)">OriginPort</a>

The destination port at the origin. Only specified in conjunction with origin\_dns. May use an integer to specify a single origin port, for example <code>1000</code>, or a string to specify a range of origin ports, for example <code>"1000-2000"</code>. Notes: If specifying a port range, the number of ports in the range must match the number of ports specified in the “protocol” field.

maximum65535

minimum1

<a href="#">Link to this property</a>

<details>

<summary>

proxy\_protocol: optional "off"or "v1"or "v2"or "simple"

Enables Proxy Protocol to the origin. Refer to <a href="https://developers.cloudflare.com/spectrum/getting-started/proxy-protocol/">Enable Proxy protocol</a> for implementation details on PROXY Protocol V1, PROXY Protocol V2, and Simple Proxy Protocol.

</summary>

One of the following:

"off"

<a href="#">Link to this property</a>

"v1"

<a href="#">Link to this property</a>

"v2"

<a href="#">Link to this property</a>

"simple"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

tls: optional "off"or "flexible"or "full"or "strict"

The type of TLS termination associated with the application.

</summary>

One of the following:

"off"

<a href="#">Link to this property</a>

"flexible"

<a href="#">Link to this property</a>

"full"

<a href="#">Link to this property</a>

"strict"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

virtual\_network\_id: optional string

Optional UUID of a virtual network for routing origin traffic through tunnel virtual networks.

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

SpectrumConfigPaygoAppConfig object {id, created\_on, dns, 3 more }

</summary>

id: string

App identifier.

maxLength32

<a href="#">Link to this property</a>

created\_on: string

When the Application was created.

formatdate-time

<a href="#">Link to this property</a>

dns: <a href="https://developers.cloudflare.com/api/resources/spectrum#(resource)%20spectrum%20%3E%20(model)%20dns%20%3E%20(schema)">DNS</a> { name, type }

The name and type of DNS record for the Spectrum application.

<a href="#">Link to this property</a>

modified\_on: string

When the Application was last modified.

formatdate-time

<a href="#">Link to this property</a>

protocol: string

The port configuration at Cloudflare’s edge. May specify a single port, for example <code>"tcp/1000"</code>, or a range of ports, for example <code>"tcp/1000-2000"</code>.

<a href="#">Link to this property</a>

origin\_direct: optional array of string

List of origin IP addresses. Array may contain multiple IP addresses for load balancing.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20spectrum.apps%20%3E%20(model)%20app_get_response%20%3E%20(schema)>)

<details>

<summary>

AppCreateResponse = object {id, created\_on, dns, 12 more } or object {id, created\_on, dns, 3 more }

</summary>

One of the following:

<details>

<summary>

SpectrumConfigAppConfig object {id, created\_on, dns, 12 more }

</summary>

id: string

App identifier.

maxLength32

<a href="#">Link to this property</a>

created\_on: string

When the Application was created.

formatdate-time

<a href="#">Link to this property</a>

dns: <a href="https://developers.cloudflare.com/api/resources/spectrum#(resource)%20spectrum%20%3E%20(model)%20dns%20%3E%20(schema)">DNS</a> { name, type }

The name and type of DNS record for the Spectrum application.

<a href="#">Link to this property</a>

modified\_on: string

When the Application was last modified.

formatdate-time

<a href="#">Link to this property</a>

protocol: string

The port configuration at Cloudflare’s edge. May specify a single port, for example <code>"tcp/1000"</code>, or a range of ports, for example <code>"tcp/1000-2000"</code>.

<a href="#">Link to this property</a>

<details>

<summary>

traffic\_type: "direct"or "http"or "https"

Determines how data travels from the edge to your origin. When set to “direct”, Spectrum will send traffic directly to your origin, and the application’s type is derived from the <code>protocol</code>. When set to “http” or “https”, Spectrum will apply Cloudflare’s HTTP/HTTPS features as it sends traffic to your origin, and the application type matches this property exactly.

</summary>

One of the following:

"direct"

<a href="#">Link to this property</a>

"http"

<a href="#">Link to this property</a>

"https"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

argo\_smart\_routing: optional boolean

Enables Argo Smart Routing for this application. Notes: Only available for TCP or UDP applications with traffic\_type set to “direct”.

<a href="#">Link to this property</a>

edge\_ips: optional <a href="https://developers.cloudflare.com/api/resources/spectrum#(resource)%20spectrum%20%3E%20(model)%20edge_ips%20%3E%20(schema)">EdgeIPs</a>

The anycast edge IP configuration for the hostname of this application.

<a href="#">Link to this property</a>

ip\_firewall: optional boolean

Enables IP Access Rules for this application. Notes: Only available for TCP applications.

<a href="#">Link to this property</a>

origin\_direct: optional array of string

List of origin IP addresses. Array may contain multiple IP addresses for load balancing.

<a href="#">Link to this property</a>

origin\_dns: optional <a href="https://developers.cloudflare.com/api/resources/spectrum#(resource)%20spectrum%20%3E%20(model)%20origin_dns%20%3E%20(schema)">OriginDNS</a> { name, ttl, type }

The name and type of DNS record for the Spectrum application.

<a href="#">Link to this property</a>

origin\_port: optional <a href="https://developers.cloudflare.com/api/resources/spectrum#(resource)%20spectrum%20%3E%20(model)%20origin_port%20%3E%20(schema)">OriginPort</a>

The destination port at the origin. Only specified in conjunction with origin\_dns. May use an integer to specify a single origin port, for example <code>1000</code>, or a string to specify a range of origin ports, for example <code>"1000-2000"</code>. Notes: If specifying a port range, the number of ports in the range must match the number of ports specified in the “protocol” field.

maximum65535

minimum1

<a href="#">Link to this property</a>

<details>

<summary>

proxy\_protocol: optional "off"or "v1"or "v2"or "simple"

Enables Proxy Protocol to the origin. Refer to <a href="https://developers.cloudflare.com/spectrum/getting-started/proxy-protocol/">Enable Proxy protocol</a> for implementation details on PROXY Protocol V1, PROXY Protocol V2, and Simple Proxy Protocol.

</summary>

One of the following:

"off"

<a href="#">Link to this property</a>

"v1"

<a href="#">Link to this property</a>

"v2"

<a href="#">Link to this property</a>

"simple"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

tls: optional "off"or "flexible"or "full"or "strict"

The type of TLS termination associated with the application.

</summary>

One of the following:

"off"

<a href="#">Link to this property</a>

"flexible"

<a href="#">Link to this property</a>

"full"

<a href="#">Link to this property</a>

"strict"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

virtual\_network\_id: optional string

Optional UUID of a virtual network for routing origin traffic through tunnel virtual networks.

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

SpectrumConfigPaygoAppConfig object {id, created\_on, dns, 3 more }

</summary>

id: string

App identifier.

maxLength32

<a href="#">Link to this property</a>

created\_on: string

When the Application was created.

formatdate-time

<a href="#">Link to this property</a>

dns: <a href="https://developers.cloudflare.com/api/resources/spectrum#(resource)%20spectrum%20%3E%20(model)%20dns%20%3E%20(schema)">DNS</a> { name, type }

The name and type of DNS record for the Spectrum application.

<a href="#">Link to this property</a>

modified\_on: string

When the Application was last modified.

formatdate-time

<a href="#">Link to this property</a>

protocol: string

The port configuration at Cloudflare’s edge. May specify a single port, for example <code>"tcp/1000"</code>, or a range of ports, for example <code>"tcp/1000-2000"</code>.

<a href="#">Link to this property</a>

origin\_direct: optional array of string

List of origin IP addresses. Array may contain multiple IP addresses for load balancing.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20spectrum.apps%20%3E%20(model)%20app_create_response%20%3E%20(schema)>)

<details>

<summary>

AppUpdateResponse = object {id, created\_on, dns, 12 more } or object {id, created\_on, dns, 3 more }

</summary>

One of the following:

<details>

<summary>

SpectrumConfigAppConfig object {id, created\_on, dns, 12 more }

</summary>

id: string

App identifier.

maxLength32

<a href="#">Link to this property</a>

created\_on: string

When the Application was created.

formatdate-time

<a href="#">Link to this property</a>

dns: <a href="https://developers.cloudflare.com/api/resources/spectrum#(resource)%20spectrum%20%3E%20(model)%20dns%20%3E%20(schema)">DNS</a> { name, type }

The name and type of DNS record for the Spectrum application.

<a href="#">Link to this property</a>

modified\_on: string

When the Application was last modified.

formatdate-time

<a href="#">Link to this property</a>

protocol: string

The port configuration at Cloudflare’s edge. May specify a single port, for example <code>"tcp/1000"</code>, or a range of ports, for example <code>"tcp/1000-2000"</code>.

<a href="#">Link to this property</a>

<details>

<summary>

traffic\_type: "direct"or "http"or "https"

Determines how data travels from the edge to your origin. When set to “direct”, Spectrum will send traffic directly to your origin, and the application’s type is derived from the <code>protocol</code>. When set to “http” or “https”, Spectrum will apply Cloudflare’s HTTP/HTTPS features as it sends traffic to your origin, and the application type matches this property exactly.

</summary>

One of the following:

"direct"

<a href="#">Link to this property</a>

"http"

<a href="#">Link to this property</a>

"https"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

argo\_smart\_routing: optional boolean

Enables Argo Smart Routing for this application. Notes: Only available for TCP or UDP applications with traffic\_type set to “direct”.

<a href="#">Link to this property</a>

edge\_ips: optional <a href="https://developers.cloudflare.com/api/resources/spectrum#(resource)%20spectrum%20%3E%20(model)%20edge_ips%20%3E%20(schema)">EdgeIPs</a>

The anycast edge IP configuration for the hostname of this application.

<a href="#">Link to this property</a>

ip\_firewall: optional boolean

Enables IP Access Rules for this application. Notes: Only available for TCP applications.

<a href="#">Link to this property</a>

origin\_direct: optional array of string

List of origin IP addresses. Array may contain multiple IP addresses for load balancing.

<a href="#">Link to this property</a>

origin\_dns: optional <a href="https://developers.cloudflare.com/api/resources/spectrum#(resource)%20spectrum%20%3E%20(model)%20origin_dns%20%3E%20(schema)">OriginDNS</a> { name, ttl, type }

The name and type of DNS record for the Spectrum application.

<a href="#">Link to this property</a>

origin\_port: optional <a href="https://developers.cloudflare.com/api/resources/spectrum#(resource)%20spectrum%20%3E%20(model)%20origin_port%20%3E%20(schema)">OriginPort</a>

The destination port at the origin. Only specified in conjunction with origin\_dns. May use an integer to specify a single origin port, for example <code>1000</code>, or a string to specify a range of origin ports, for example <code>"1000-2000"</code>. Notes: If specifying a port range, the number of ports in the range must match the number of ports specified in the “protocol” field.

maximum65535

minimum1

<a href="#">Link to this property</a>

<details>

<summary>

proxy\_protocol: optional "off"or "v1"or "v2"or "simple"

Enables Proxy Protocol to the origin. Refer to <a href="https://developers.cloudflare.com/spectrum/getting-started/proxy-protocol/">Enable Proxy protocol</a> for implementation details on PROXY Protocol V1, PROXY Protocol V2, and Simple Proxy Protocol.

</summary>

One of the following:

"off"

<a href="#">Link to this property</a>

"v1"

<a href="#">Link to this property</a>

"v2"

<a href="#">Link to this property</a>

"simple"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

tls: optional "off"or "flexible"or "full"or "strict"

The type of TLS termination associated with the application.

</summary>

One of the following:

"off"

<a href="#">Link to this property</a>

"flexible"

<a href="#">Link to this property</a>

"full"

<a href="#">Link to this property</a>

"strict"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

virtual\_network\_id: optional string

Optional UUID of a virtual network for routing origin traffic through tunnel virtual networks.

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

SpectrumConfigPaygoAppConfig object {id, created\_on, dns, 3 more }

</summary>

id: string

App identifier.

maxLength32

<a href="#">Link to this property</a>

created\_on: string

When the Application was created.

formatdate-time

<a href="#">Link to this property</a>

dns: <a href="https://developers.cloudflare.com/api/resources/spectrum#(resource)%20spectrum%20%3E%20(model)%20dns%20%3E%20(schema)">DNS</a> { name, type }

The name and type of DNS record for the Spectrum application.

<a href="#">Link to this property</a>

modified\_on: string

When the Application was last modified.

formatdate-time

<a href="#">Link to this property</a>

protocol: string

The port configuration at Cloudflare’s edge. May specify a single port, for example <code>"tcp/1000"</code>, or a range of ports, for example <code>"tcp/1000-2000"</code>.

<a href="#">Link to this property</a>

origin\_direct: optional array of string

List of origin IP addresses. Array may contain multiple IP addresses for load balancing.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20spectrum.apps%20%3E%20(model)%20app_update_response%20%3E%20(schema)>)

<details>

<summary>

AppDeleteResponse object {id }

</summary>

id: string

Identifier.

maxLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20spectrum.apps%20%3E%20(model)%20app_delete_response%20%3E%20(schema)>)

#### SpectrumProtocols

##### [List Spectrum application protocols](https://developers.cloudflare.com/api/resources/spectrum/subresources/protocols/methods/list)

GET/zones/{zone\_id}/spectrum/protocols

##### ModelsExpand Collapse

<details>

<summary>

ProtocolListResponse object {description, name, ports, transport }

</summary>

description: string

The full name of the application protocol.

<a href="#">Link to this property</a>

name: string

The short name of the application protocol.

<a href="#">Link to this property</a>

ports: array of number

The available listening ports for the given protocol.

<a href="#">Link to this property</a>

transport: string

The transport layer protocol used by the application protocol

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20spectrum.protocols%20%3E%20(model)%20protocol_list_response%20%3E%20(schema)>)