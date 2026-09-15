---
title: Diagnostics
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Diagnostics

#### DiagnosticsTraceroutes

##### [Traceroute](https://developers.cloudflare.com/api/resources/diagnostics/subresources/traceroutes/methods/create)

POST/accounts/{account\_id}/diagnostics/traceroute

##### ModelsExpand Collapse

<details>

<summary>

Traceroute object {colos, target }

</summary>

<details>

<summary>

colos: optional array of object {colo, error, hops, 2 more }

</summary>

<details>

<summary>

colo: optional object {city, name }

</summary>

city: optional string

Source colo city.

<a href="#">Link to this property</a>

name: optional string

Source colo name.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

error: optional ""or "Could not gather traceroute data: Code 1"or "Could not gather traceroute data: Code 2"or 2 more

Errors resulting from collecting traceroute from colo to target.

</summary>

One of the following:

""

<a href="#">Link to this property</a>

"Could not gather traceroute data: Code 1"

<a href="#">Link to this property</a>

"Could not gather traceroute data: Code 2"

<a href="#">Link to this property</a>

"Could not gather traceroute data: Code 3"

<a href="#">Link to this property</a>

"Could not gather traceroute data: Code 4"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

hops: optional array of object {nodes, packets\_lost, packets\_sent, packets\_ttl }

</summary>

<details>

<summary>

nodes: optional array of object {asn, ip, labels, 6 more }

An array of node objects.

</summary>

asn: optional string

AS number associated with the node object.

<a href="#">Link to this property</a>

ip: optional string

IP address of the node.

<a href="#">Link to this property</a>

labels: optional array of string

Field appears if there is an additional annotation printed when the probe returns. Field also appears when running a GRE+ICMP traceroute to denote which traceroute a node comes from.

<a href="#">Link to this property</a>

max\_rtt\_ms: optional number

Maximum RTT in ms.

<a href="#">Link to this property</a>

mean\_rtt\_ms: optional number

Mean RTT in ms.

<a href="#">Link to this property</a>

min\_rtt\_ms: optional number

Minimum RTT in ms.

<a href="#">Link to this property</a>

name: optional string

Host name of the address, this may be the same as the IP address.

<a href="#">Link to this property</a>

packet\_count: optional number

Number of packets with a response from this node.

<a href="#">Link to this property</a>

std\_dev\_rtt\_ms: optional number

Standard deviation of the RTTs in ms.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

packets\_lost: optional number

Number of packets where no response was received.

<a href="#">Link to this property</a>

packets\_sent: optional number

Number of packets sent with specified TTL.

<a href="#">Link to this property</a>

packets\_ttl: optional number

The time to live (TTL).

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

target\_summary: optional unknown

Aggregated statistics from all hops about the target.

<a href="#">Link to this property</a>

traceroute\_time\_ms: optional number

Total time of traceroute in ms.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

target: optional string

The target hostname, IPv6, or IPv6 address.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20diagnostics.traceroutes%20%3E%20(model)%20traceroute%20%3E%20(schema)>)

#### DiagnosticsEndpoint Healthchecks

##### [List Endpoint Health Checks](https://developers.cloudflare.com/api/resources/diagnostics/subresources/endpoint-healthchecks/methods/list)

GET/accounts/{account\_id}/diagnostics/endpoint-healthchecks

##### [Endpoint Health Check](https://developers.cloudflare.com/api/resources/diagnostics/subresources/endpoint-healthchecks/methods/create)

POST/accounts/{account\_id}/diagnostics/endpoint-healthchecks

##### [Get Endpoint Health Check](https://developers.cloudflare.com/api/resources/diagnostics/subresources/endpoint-healthchecks/methods/get)

GET/accounts/{account\_id}/diagnostics/endpoint-healthchecks/{id}

##### [Delete Endpoint Health Check](https://developers.cloudflare.com/api/resources/diagnostics/subresources/endpoint-healthchecks/methods/delete)

DELETE/accounts/{account\_id}/diagnostics/endpoint-healthchecks/{id}

##### [Update Endpoint Health Check](https://developers.cloudflare.com/api/resources/diagnostics/subresources/endpoint-healthchecks/methods/update)

PUT/accounts/{account\_id}/diagnostics/endpoint-healthchecks/{id}

##### ModelsExpand Collapse

<details>

<summary>

EndpointHealthcheck object {check\_type, endpoint, name }

</summary>

check\_type: "icmp"

type of check to perform

<a href="#">Link to this property</a>

endpoint: string

the IP address of the host to perform checks against

<a href="#">Link to this property</a>

name: optional string

Optional name associated with this check

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20diagnostics.endpoint-healthchecks%20%3E%20(model)%20endpoint_healthcheck%20%3E%20(schema)>)

<details>

<summary>

EndpointHealthcheckListResponse object {check\_type, endpoint, id, name }

</summary>

check\_type: "icmp"

type of check to perform

<a href="#">Link to this property</a>

endpoint: string

the IP address of the host to perform checks against

<a href="#">Link to this property</a>

id: optional string

UUID.

maxLength36

<a href="#">Link to this property</a>

name: optional string

Optional name associated with this check

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20diagnostics.endpoint-healthchecks%20%3E%20(model)%20endpoint_healthcheck_list_response%20%3E%20(schema)>)

<details>

<summary>

EndpointHealthcheckCreateResponse object {check\_type, endpoint, id, name }

</summary>

check\_type: "icmp"

type of check to perform

<a href="#">Link to this property</a>

endpoint: string

the IP address of the host to perform checks against

<a href="#">Link to this property</a>

id: optional string

UUID.

maxLength36

<a href="#">Link to this property</a>

name: optional string

Optional name associated with this check

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20diagnostics.endpoint-healthchecks%20%3E%20(model)%20endpoint_healthcheck_create_response%20%3E%20(schema)>)

<details>

<summary>

EndpointHealthcheckGetResponse object {check\_type, endpoint, id, name }

</summary>

check\_type: "icmp"

type of check to perform

<a href="#">Link to this property</a>

endpoint: string

the IP address of the host to perform checks against

<a href="#">Link to this property</a>

id: optional string

UUID.

maxLength36

<a href="#">Link to this property</a>

name: optional string

Optional name associated with this check

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20diagnostics.endpoint-healthchecks%20%3E%20(model)%20endpoint_healthcheck_get_response%20%3E%20(schema)>)

<details>

<summary>

EndpointHealthcheckDeleteResponse object {errors, messages, success }

</summary>

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

<a href="#">Link to this property</a>

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

<a href="#">Link to this property</a>

success: true

Whether the API call was successful.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20diagnostics.endpoint-healthchecks%20%3E%20(model)%20endpoint_healthcheck_delete_response%20%3E%20(schema)>)

<details>

<summary>

EndpointHealthcheckUpdateResponse object {check\_type, endpoint, id, name }

</summary>

check\_type: "icmp"

type of check to perform

<a href="#">Link to this property</a>

endpoint: string

the IP address of the host to perform checks against

<a href="#">Link to this property</a>

id: optional string

UUID.

maxLength36

<a href="#">Link to this property</a>

name: optional string

Optional name associated with this check

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20diagnostics.endpoint-healthchecks%20%3E%20(model)%20endpoint_healthcheck_update_response%20%3E%20(schema)>)