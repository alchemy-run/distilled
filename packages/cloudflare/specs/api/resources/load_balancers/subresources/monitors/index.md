---
title: Monitors
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Load Balancers](https://developers.cloudflare.com/api/resources/load_balancers)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Monitors

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

#### MonitorsPreviews

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

#### MonitorsReferences

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