---
title: Healthchecks
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Healthchecks

##### [List Health Checks](https://developers.cloudflare.com/api/resources/healthchecks/methods/list)

GET/zones/{zone\_id}/healthchecks

##### [Health Check Details](https://developers.cloudflare.com/api/resources/healthchecks/methods/get)

GET/zones/{zone\_id}/healthchecks/{healthcheck\_id}

##### [Create Health Check](https://developers.cloudflare.com/api/resources/healthchecks/methods/create)

POST/zones/{zone\_id}/healthchecks

##### [Update Health Check](https://developers.cloudflare.com/api/resources/healthchecks/methods/update)

PUT/zones/{zone\_id}/healthchecks/{healthcheck\_id}

##### [Patch Health Check](https://developers.cloudflare.com/api/resources/healthchecks/methods/edit)

PATCH/zones/{zone\_id}/healthchecks/{healthcheck\_id}

##### [Delete Health Check](https://developers.cloudflare.com/api/resources/healthchecks/methods/delete)

DELETE/zones/{zone\_id}/healthchecks/{healthcheck\_id}

##### ModelsExpand Collapse

<details>

<summary>

CheckRegion = "WNAM"or "ENAM"or "WEU"or 11 more

WNAM: Western North America, ENAM: Eastern North America, WEU: Western Europe, EEU: Eastern Europe, NSAM: Northern South America, SSAM: Southern South America, OC: Oceania, ME: Middle East, NAF: North Africa, SAF: South Africa, IN: India, SEAS: South East Asia, NEAS: North East Asia, ALL\_REGIONS: all regions (BUSINESS and ENTERPRISE customers only).

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

"IN"

<a href="#">Link to this property</a>

"SEAS"

<a href="#">Link to this property</a>

"NEAS"

<a href="#">Link to this property</a>

"ALL\_REGIONS"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20healthchecks%20%3E%20(model)%20check_region%20%3E%20(schema)>)

<details>

<summary>

Healthcheck object {id, address, check\_regions, 15 more }

</summary>

id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

address: optional string

The hostname or IP address of the origin server to run health checks on.

<a href="#">Link to this property</a>

<details>

<summary>

check\_regions: optional array of <a href="https://developers.cloudflare.com/api/resources/healthchecks#(resource)%20healthchecks%20%3E%20(model)%20check_region%20%3E%20(schema)">CheckRegion</a>

A list of regions from which to run health checks. Null means Cloudflare will pick a default region.

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

"IN"

<a href="#">Link to this property</a>

"SEAS"

<a href="#">Link to this property</a>

"NEAS"

<a href="#">Link to this property</a>

"ALL\_REGIONS"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

consecutive\_fails: optional number

The number of consecutive fails required from a health check before changing the health to unhealthy.

<a href="#">Link to this property</a>

consecutive\_successes: optional number

The number of consecutive successes required from a health check before changing the health to healthy.

<a href="#">Link to this property</a>

created\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

A human-readable description of the health check.

<a href="#">Link to this property</a>

failure\_reason: optional string

The current failure reason if status is unhealthy.

<a href="#">Link to this property</a>

http\_config: optional <a href="https://developers.cloudflare.com/api/resources/healthchecks#(resource)%20healthchecks%20%3E%20(model)%20http_configuration%20%3E%20(schema)">HTTPConfiguration</a> { allow\_insecure, expected\_body, expected\_codes, 5 more }

Parameters specific to an HTTP or HTTPS health check.

<a href="#">Link to this property</a>

interval: optional number

The interval between each health check. Shorter intervals may give quicker notifications if the origin status changes, but will increase load on the origin as we check from multiple locations.

<a href="#">Link to this property</a>

modified\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

name: optional string

A short name to identify the health check. Only alphanumeric characters, hyphens and underscores are allowed.

<a href="#">Link to this property</a>

retries: optional number

The number of retries to attempt in case of a timeout before marking the origin as unhealthy. Retries are attempted immediately.

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "unknown"or "healthy"or "unhealthy"or "suspended"

The current status of the origin server according to the health check.

</summary>

One of the following:

"unknown"

<a href="#">Link to this property</a>

"healthy"

<a href="#">Link to this property</a>

"unhealthy"

<a href="#">Link to this property</a>

"suspended"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

suspended: optional boolean

If suspended, no health checks are sent to the origin.

<a href="#">Link to this property</a>

tcp\_config: optional <a href="https://developers.cloudflare.com/api/resources/healthchecks#(resource)%20healthchecks%20%3E%20(model)%20tcp_configuration%20%3E%20(schema)">TCPConfiguration</a> { method, port }

Parameters specific to TCP health check.

<a href="#">Link to this property</a>

timeout: optional number

The timeout (in seconds) before marking the health check as failed.

<a href="#">Link to this property</a>

type: optional string

The protocol to use for the health check. Currently supported protocols are ‘HTTP’, ‘HTTPS’ and ‘TCP’.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20healthchecks%20%3E%20(model)%20healthcheck%20%3E%20(schema)>)

<details>

<summary>

HTTPConfiguration object {allow\_insecure, expected\_body, expected\_codes, 5 more }

Parameters specific to an HTTP or HTTPS health check.

</summary>

allow\_insecure: optional boolean

Do not validate the certificate when the health check uses HTTPS.

<a href="#">Link to this property</a>

expected\_body: optional string

A case-insensitive sub-string to look for in the response body. If this string is not found, the origin will be marked as unhealthy.

<a href="#">Link to this property</a>

expected\_codes: optional array of string

The expected HTTP response codes (e.g. “200”) or code ranges (e.g. “2xx” for all codes starting with 2) of the health check.

<a href="#">Link to this property</a>

follow\_redirects: optional boolean

Follow redirects if the origin returns a 3xx status code.

<a href="#">Link to this property</a>

header: optional map\[array of string]

The HTTP request headers to send in the health check. It is recommended you set a Host header by default. The User-Agent header cannot be overridden.

<a href="#">Link to this property</a>

<details>

<summary>

method: optional "GET"or "HEAD"

The HTTP method to use for the health check.

</summary>

One of the following:

"GET"

<a href="#">Link to this property</a>

"HEAD"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

path: optional string

The endpoint path to health check against.

<a href="#">Link to this property</a>

port: optional number

Port number to connect to for the health check. Defaults to 80 if type is HTTP or 443 if type is HTTPS.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20healthchecks%20%3E%20(model)%20http_configuration%20%3E%20(schema)>)

<details>

<summary>

QueryHealthcheck object {address, name, check\_regions, 10 more }

</summary>

address: string

The hostname or IP address of the origin server to run health checks on.

<a href="#">Link to this property</a>

name: string

A short name to identify the health check. Only alphanumeric characters, hyphens and underscores are allowed.

<a href="#">Link to this property</a>

<details>

<summary>

check\_regions: optional array of <a href="https://developers.cloudflare.com/api/resources/healthchecks#(resource)%20healthchecks%20%3E%20(model)%20check_region%20%3E%20(schema)">CheckRegion</a>

A list of regions from which to run health checks. Null means Cloudflare will pick a default region.

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

"IN"

<a href="#">Link to this property</a>

"SEAS"

<a href="#">Link to this property</a>

"NEAS"

<a href="#">Link to this property</a>

"ALL\_REGIONS"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

consecutive\_fails: optional number

The number of consecutive fails required from a health check before changing the health to unhealthy.

<a href="#">Link to this property</a>

consecutive\_successes: optional number

The number of consecutive successes required from a health check before changing the health to healthy.

<a href="#">Link to this property</a>

description: optional string

A human-readable description of the health check.

<a href="#">Link to this property</a>

http\_config: optional <a href="https://developers.cloudflare.com/api/resources/healthchecks#(resource)%20healthchecks%20%3E%20(model)%20http_configuration%20%3E%20(schema)">HTTPConfiguration</a> { allow\_insecure, expected\_body, expected\_codes, 5 more }

Parameters specific to an HTTP or HTTPS health check.

<a href="#">Link to this property</a>

interval: optional number

The interval between each health check. Shorter intervals may give quicker notifications if the origin status changes, but will increase load on the origin as we check from multiple locations.

<a href="#">Link to this property</a>

retries: optional number

The number of retries to attempt in case of a timeout before marking the origin as unhealthy. Retries are attempted immediately.

<a href="#">Link to this property</a>

suspended: optional boolean

If suspended, no health checks are sent to the origin.

<a href="#">Link to this property</a>

tcp\_config: optional <a href="https://developers.cloudflare.com/api/resources/healthchecks#(resource)%20healthchecks%20%3E%20(model)%20tcp_configuration%20%3E%20(schema)">TCPConfiguration</a> { method, port }

Parameters specific to TCP health check.

<a href="#">Link to this property</a>

timeout: optional number

The timeout (in seconds) before marking the health check as failed.

<a href="#">Link to this property</a>

type: optional string

The protocol to use for the health check. Currently supported protocols are ‘HTTP’, ‘HTTPS’ and ‘TCP’.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20healthchecks%20%3E%20(model)%20query_healthcheck%20%3E%20(schema)>)

<details>

<summary>

TCPConfiguration object {method, port }

Parameters specific to TCP health check.

</summary>

method: optional "connection\_established"

The TCP connection method to use for the health check.

<a href="#">Link to this property</a>

port: optional number

Port number to connect to for the health check. Defaults to 80.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20healthchecks%20%3E%20(model)%20tcp_configuration%20%3E%20(schema)>)

<details>

<summary>

HealthcheckDeleteResponse object {id }

</summary>

id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20healthchecks%20%3E%20(model)%20healthcheck_delete_response%20%3E%20(schema)>)

#### HealthchecksPreviews

##### [Health Check Preview Details](https://developers.cloudflare.com/api/resources/healthchecks/subresources/previews/methods/get)

GET/zones/{zone\_id}/healthchecks/preview/{healthcheck\_id}

##### [Create Preview Health Check](https://developers.cloudflare.com/api/resources/healthchecks/subresources/previews/methods/create)

POST/zones/{zone\_id}/healthchecks/preview

##### [Delete Preview Health Check](https://developers.cloudflare.com/api/resources/healthchecks/subresources/previews/methods/delete)

DELETE/zones/{zone\_id}/healthchecks/preview/{healthcheck\_id}

##### ModelsExpand Collapse

<details>

<summary>

PreviewDeleteResponse object {id }

</summary>

id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20healthchecks.previews%20%3E%20(model)%20preview_delete_response%20%3E%20(schema)>)