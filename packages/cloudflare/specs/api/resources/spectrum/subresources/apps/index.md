---
title: Apps
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Spectrum](https://developers.cloudflare.com/api/resources/spectrum)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Apps

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