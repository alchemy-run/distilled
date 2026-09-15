---
title: Traceroute Test Results
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[DEX](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Traceroute Test Results

#### Traceroute Test ResultsNetwork Path

##### [Get details for a specific traceroute test run](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex/subresources/traceroute_test_results/subresources/network_path/methods/get)

GET/accounts/{account\_id}/dex/traceroute-test-results/{test\_result\_id}/network-path

##### ModelsExpand Collapse

<details>

<summary>

NetworkPathGetResponse object {hops, resultId, colo, 6 more }

</summary>

<details>

<summary>

hops: array of object {ttl, asn, aso, 6 more }

An array of the hops taken by the device to reach the end destination.

</summary>

ttl: number

<a href="#">Link to this property</a>

asn: optional number

<a href="#">Link to this property</a>

aso: optional string

<a href="#">Link to this property</a>

ipAddress: optional string

<a href="#">Link to this property</a>

<details>

<summary>

location: optional object {city, state, zip }

</summary>

city: optional string

<a href="#">Link to this property</a>

state: optional string

<a href="#">Link to this property</a>

zip: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

mile: optional "client-to-app"or "client-to-cf-egress"or "client-to-cf-ingress"or "client-to-isp"

</summary>

One of the following:

"client-to-app"

<a href="#">Link to this property</a>

"client-to-cf-egress"

<a href="#">Link to this property</a>

"client-to-cf-ingress"

<a href="#">Link to this property</a>

"client-to-isp"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

packetLossPct: optional number

formatfloat

<a href="#">Link to this property</a>

rttMs: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

resultId: string

API Resource UUID tag.

maxLength36

<a href="#">Link to this property</a>

colo: optional string

Cloudflare colo airport code.

<a href="#">Link to this property</a>

deviceName: optional string

Name of the device associated with this network path response.

<a href="#">Link to this property</a>

<details>

<summary>

execution\_context: optional "EXECUTION\_CONTEXT\_INVALID"or "OUT\_OF\_TUNNEL"or "IN\_TUNNEL"

Whether the test was run inside or outside of the WARP tunnel.

</summary>

One of the following:

"EXECUTION\_CONTEXT\_INVALID"

<a href="#">Link to this property</a>

"OUT\_OF\_TUNNEL"

<a href="#">Link to this property</a>

"IN\_TUNNEL"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

testId: optional string

API Resource UUID tag.

maxLength36

<a href="#">Link to this property</a>

testName: optional string

Name of the traceroute test.

<a href="#">Link to this property</a>

time\_start: optional string

Timestamp indicating when the traceroute test execution began.

<a href="#">Link to this property</a>

tunnel\_type: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dex.traceroute_test_results.network_path%20%3E%20(model)%20network_path_get_response%20%3E%20(schema)>)