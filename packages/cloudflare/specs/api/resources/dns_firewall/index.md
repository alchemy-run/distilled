---
title: DNS Firewall
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# DNS Firewall

##### [List DNS Firewall Clusters](https://developers.cloudflare.com/api/resources/dns_firewall/methods/list)

GET/accounts/{account\_id}/dns\_firewall

##### [DNS Firewall Cluster Details](https://developers.cloudflare.com/api/resources/dns_firewall/methods/get)

GET/accounts/{account\_id}/dns\_firewall/{dns\_firewall\_id}

##### [Create DNS Firewall Cluster](https://developers.cloudflare.com/api/resources/dns_firewall/methods/create)

POST/accounts/{account\_id}/dns\_firewall

##### [Update DNS Firewall Cluster](https://developers.cloudflare.com/api/resources/dns_firewall/methods/edit)

PATCH/accounts/{account\_id}/dns\_firewall/{dns\_firewall\_id}

##### [Delete DNS Firewall Cluster](https://developers.cloudflare.com/api/resources/dns_firewall/methods/delete)

DELETE/accounts/{account\_id}/dns\_firewall/{dns\_firewall\_id}

##### ModelsExpand Collapse

<details>

<summary>

AttackMitigation object {enabled, only\_when\_upstream\_unhealthy }

Attack mitigation settings

</summary>

enabled: optional boolean

When enabled, automatically mitigate random-prefix attacks to protect upstream DNS servers

<a href="#">Link to this property</a>

only\_when\_upstream\_unhealthy: optional boolean

Only mitigate attacks when upstream servers seem unhealthy

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dns_firewall%20%3E%20(model)%20attack_mitigation%20%3E%20(schema)>)

FirewallIPs = string

Cloudflare-assigned DNS IPv4 address

[Link to this property](#)%20dns_firewall%20%3E%20(model)%20firewall_ips%20%3E%20(schema)>)

UpstreamIPs = string

Upstream DNS Server IPv4 address

[Link to this property](#)%20dns_firewall%20%3E%20(model)%20upstream_ips%20%3E%20(schema)>)

<details>

<summary>

DNSFirewallListResponse object {id, deprecate\_any\_requests, dns\_firewall\_ips, 10 more }

</summary>

id: string

Identifier.

maxLength32

<a href="#">Link to this property</a>

deprecate\_any\_requests: boolean

Whether to refuse to answer queries for the ANY type

<a href="#">Link to this property</a>

dns\_firewall\_ips: array of <a href="https://developers.cloudflare.com/api/resources/dns_firewall#(resource)%20dns_firewall%20%3E%20(model)%20firewall_ips%20%3E%20(schema)">FirewallIPs</a>

<a href="#">Link to this property</a>

ecs\_fallback: boolean

Whether to forward client IP (resolver) subnet if no EDNS Client Subnet is sent

<a href="#">Link to this property</a>

maximum\_cache\_ttl: number

By default, Cloudflare attempts to cache responses for as long as indicated by the TTL received from upstream nameservers. This setting sets an upper bound on this duration. For caching purposes, higher TTLs will be decreased to the maximum value defined by this setting.

This setting does not affect the TTL value in the DNS response Cloudflare returns to clients. Cloudflare will always forward the TTL value received from upstream nameservers.

maximum36000

minimum30

<a href="#">Link to this property</a>

minimum\_cache\_ttl: number

By default, Cloudflare attempts to cache responses for as long as indicated by the TTL received from upstream nameservers. This setting sets a lower bound on this duration. For caching purposes, lower TTLs will be increased to the minimum value defined by this setting.

This setting does not affect the TTL value in the DNS response Cloudflare returns to clients. Cloudflare will always forward the TTL value received from upstream nameservers.

Note that, even with this setting, there is no guarantee that a response will be cached for at least the specified duration. Cached responses may be removed earlier for capacity or other operational reasons.

maximum36000

minimum30

<a href="#">Link to this property</a>

modified\_on: string

Last modification of DNS Firewall cluster

formatdate-time

<a href="#">Link to this property</a>

name: string

DNS Firewall cluster name

maxLength160

minLength1

<a href="#">Link to this property</a>

negative\_cache\_ttl: number

This setting controls how long DNS Firewall should cache negative responses (e.g., NXDOMAIN) from the upstream servers.

This setting does not affect the TTL value in the DNS response Cloudflare returns to clients. Cloudflare will always forward the TTL value received from upstream nameservers.

maximum36000

minimum30

<a href="#">Link to this property</a>

ratelimit: number

Maximum number of DNS queries per second that will be forwarded to your upstream nameservers. The limit is enforced per server, where each server receives a fraction of the configured value. The actual aggregate rate for a data center may vary depending on how many servers are present. Responses served from cache do not count toward this limit. Set to null to disable rate limiting.

maximum1000000000

minimum100

<a href="#">Link to this property</a>

retries: number

Number of retries for fetching DNS responses from upstream nameservers (not counting the initial attempt)

maximum2

minimum0

<a href="#">Link to this property</a>

upstream\_ips: array of <a href="https://developers.cloudflare.com/api/resources/dns_firewall#(resource)%20dns_firewall%20%3E%20(model)%20upstream_ips%20%3E%20(schema)">UpstreamIPs</a>

minLength1

<a href="#">Link to this property</a>

attack\_mitigation: optional <a href="https://developers.cloudflare.com/api/resources/dns_firewall#(resource)%20dns_firewall%20%3E%20(model)%20attack_mitigation%20%3E%20(schema)">AttackMitigation</a> { enabled, only\_when\_upstream\_unhealthy }

Attack mitigation settings

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dns_firewall%20%3E%20(model)%20dns_firewall_list_response%20%3E%20(schema)>)

<details>

<summary>

DNSFirewallGetResponse object {id, deprecate\_any\_requests, dns\_firewall\_ips, 10 more }

</summary>

id: string

Identifier.

maxLength32

<a href="#">Link to this property</a>

deprecate\_any\_requests: boolean

Whether to refuse to answer queries for the ANY type

<a href="#">Link to this property</a>

dns\_firewall\_ips: array of <a href="https://developers.cloudflare.com/api/resources/dns_firewall#(resource)%20dns_firewall%20%3E%20(model)%20firewall_ips%20%3E%20(schema)">FirewallIPs</a>

<a href="#">Link to this property</a>

ecs\_fallback: boolean

Whether to forward client IP (resolver) subnet if no EDNS Client Subnet is sent

<a href="#">Link to this property</a>

maximum\_cache\_ttl: number

By default, Cloudflare attempts to cache responses for as long as indicated by the TTL received from upstream nameservers. This setting sets an upper bound on this duration. For caching purposes, higher TTLs will be decreased to the maximum value defined by this setting.

This setting does not affect the TTL value in the DNS response Cloudflare returns to clients. Cloudflare will always forward the TTL value received from upstream nameservers.

maximum36000

minimum30

<a href="#">Link to this property</a>

minimum\_cache\_ttl: number

By default, Cloudflare attempts to cache responses for as long as indicated by the TTL received from upstream nameservers. This setting sets a lower bound on this duration. For caching purposes, lower TTLs will be increased to the minimum value defined by this setting.

This setting does not affect the TTL value in the DNS response Cloudflare returns to clients. Cloudflare will always forward the TTL value received from upstream nameservers.

Note that, even with this setting, there is no guarantee that a response will be cached for at least the specified duration. Cached responses may be removed earlier for capacity or other operational reasons.

maximum36000

minimum30

<a href="#">Link to this property</a>

modified\_on: string

Last modification of DNS Firewall cluster

formatdate-time

<a href="#">Link to this property</a>

name: string

DNS Firewall cluster name

maxLength160

minLength1

<a href="#">Link to this property</a>

negative\_cache\_ttl: number

This setting controls how long DNS Firewall should cache negative responses (e.g., NXDOMAIN) from the upstream servers.

This setting does not affect the TTL value in the DNS response Cloudflare returns to clients. Cloudflare will always forward the TTL value received from upstream nameservers.

maximum36000

minimum30

<a href="#">Link to this property</a>

ratelimit: number

Maximum number of DNS queries per second that will be forwarded to your upstream nameservers. The limit is enforced per server, where each server receives a fraction of the configured value. The actual aggregate rate for a data center may vary depending on how many servers are present. Responses served from cache do not count toward this limit. Set to null to disable rate limiting.

maximum1000000000

minimum100

<a href="#">Link to this property</a>

retries: number

Number of retries for fetching DNS responses from upstream nameservers (not counting the initial attempt)

maximum2

minimum0

<a href="#">Link to this property</a>

upstream\_ips: array of <a href="https://developers.cloudflare.com/api/resources/dns_firewall#(resource)%20dns_firewall%20%3E%20(model)%20upstream_ips%20%3E%20(schema)">UpstreamIPs</a>

minLength1

<a href="#">Link to this property</a>

attack\_mitigation: optional <a href="https://developers.cloudflare.com/api/resources/dns_firewall#(resource)%20dns_firewall%20%3E%20(model)%20attack_mitigation%20%3E%20(schema)">AttackMitigation</a> { enabled, only\_when\_upstream\_unhealthy }

Attack mitigation settings

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dns_firewall%20%3E%20(model)%20dns_firewall_get_response%20%3E%20(schema)>)

<details>

<summary>

DNSFirewallCreateResponse object {id, deprecate\_any\_requests, dns\_firewall\_ips, 10 more }

</summary>

id: string

Identifier.

maxLength32

<a href="#">Link to this property</a>

deprecate\_any\_requests: boolean

Whether to refuse to answer queries for the ANY type

<a href="#">Link to this property</a>

dns\_firewall\_ips: array of <a href="https://developers.cloudflare.com/api/resources/dns_firewall#(resource)%20dns_firewall%20%3E%20(model)%20firewall_ips%20%3E%20(schema)">FirewallIPs</a>

<a href="#">Link to this property</a>

ecs\_fallback: boolean

Whether to forward client IP (resolver) subnet if no EDNS Client Subnet is sent

<a href="#">Link to this property</a>

maximum\_cache\_ttl: number

By default, Cloudflare attempts to cache responses for as long as indicated by the TTL received from upstream nameservers. This setting sets an upper bound on this duration. For caching purposes, higher TTLs will be decreased to the maximum value defined by this setting.

This setting does not affect the TTL value in the DNS response Cloudflare returns to clients. Cloudflare will always forward the TTL value received from upstream nameservers.

maximum36000

minimum30

<a href="#">Link to this property</a>

minimum\_cache\_ttl: number

By default, Cloudflare attempts to cache responses for as long as indicated by the TTL received from upstream nameservers. This setting sets a lower bound on this duration. For caching purposes, lower TTLs will be increased to the minimum value defined by this setting.

This setting does not affect the TTL value in the DNS response Cloudflare returns to clients. Cloudflare will always forward the TTL value received from upstream nameservers.

Note that, even with this setting, there is no guarantee that a response will be cached for at least the specified duration. Cached responses may be removed earlier for capacity or other operational reasons.

maximum36000

minimum30

<a href="#">Link to this property</a>

modified\_on: string

Last modification of DNS Firewall cluster

formatdate-time

<a href="#">Link to this property</a>

name: string

DNS Firewall cluster name

maxLength160

minLength1

<a href="#">Link to this property</a>

negative\_cache\_ttl: number

This setting controls how long DNS Firewall should cache negative responses (e.g., NXDOMAIN) from the upstream servers.

This setting does not affect the TTL value in the DNS response Cloudflare returns to clients. Cloudflare will always forward the TTL value received from upstream nameservers.

maximum36000

minimum30

<a href="#">Link to this property</a>

ratelimit: number

Maximum number of DNS queries per second that will be forwarded to your upstream nameservers. The limit is enforced per server, where each server receives a fraction of the configured value. The actual aggregate rate for a data center may vary depending on how many servers are present. Responses served from cache do not count toward this limit. Set to null to disable rate limiting.

maximum1000000000

minimum100

<a href="#">Link to this property</a>

retries: number

Number of retries for fetching DNS responses from upstream nameservers (not counting the initial attempt)

maximum2

minimum0

<a href="#">Link to this property</a>

upstream\_ips: array of <a href="https://developers.cloudflare.com/api/resources/dns_firewall#(resource)%20dns_firewall%20%3E%20(model)%20upstream_ips%20%3E%20(schema)">UpstreamIPs</a>

minLength1

<a href="#">Link to this property</a>

attack\_mitigation: optional <a href="https://developers.cloudflare.com/api/resources/dns_firewall#(resource)%20dns_firewall%20%3E%20(model)%20attack_mitigation%20%3E%20(schema)">AttackMitigation</a> { enabled, only\_when\_upstream\_unhealthy }

Attack mitigation settings

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dns_firewall%20%3E%20(model)%20dns_firewall_create_response%20%3E%20(schema)>)

<details>

<summary>

DNSFirewallEditResponse object {id, deprecate\_any\_requests, dns\_firewall\_ips, 10 more }

</summary>

id: string

Identifier.

maxLength32

<a href="#">Link to this property</a>

deprecate\_any\_requests: boolean

Whether to refuse to answer queries for the ANY type

<a href="#">Link to this property</a>

dns\_firewall\_ips: array of <a href="https://developers.cloudflare.com/api/resources/dns_firewall#(resource)%20dns_firewall%20%3E%20(model)%20firewall_ips%20%3E%20(schema)">FirewallIPs</a>

<a href="#">Link to this property</a>

ecs\_fallback: boolean

Whether to forward client IP (resolver) subnet if no EDNS Client Subnet is sent

<a href="#">Link to this property</a>

maximum\_cache\_ttl: number

By default, Cloudflare attempts to cache responses for as long as indicated by the TTL received from upstream nameservers. This setting sets an upper bound on this duration. For caching purposes, higher TTLs will be decreased to the maximum value defined by this setting.

This setting does not affect the TTL value in the DNS response Cloudflare returns to clients. Cloudflare will always forward the TTL value received from upstream nameservers.

maximum36000

minimum30

<a href="#">Link to this property</a>

minimum\_cache\_ttl: number

By default, Cloudflare attempts to cache responses for as long as indicated by the TTL received from upstream nameservers. This setting sets a lower bound on this duration. For caching purposes, lower TTLs will be increased to the minimum value defined by this setting.

This setting does not affect the TTL value in the DNS response Cloudflare returns to clients. Cloudflare will always forward the TTL value received from upstream nameservers.

Note that, even with this setting, there is no guarantee that a response will be cached for at least the specified duration. Cached responses may be removed earlier for capacity or other operational reasons.

maximum36000

minimum30

<a href="#">Link to this property</a>

modified\_on: string

Last modification of DNS Firewall cluster

formatdate-time

<a href="#">Link to this property</a>

name: string

DNS Firewall cluster name

maxLength160

minLength1

<a href="#">Link to this property</a>

negative\_cache\_ttl: number

This setting controls how long DNS Firewall should cache negative responses (e.g., NXDOMAIN) from the upstream servers.

This setting does not affect the TTL value in the DNS response Cloudflare returns to clients. Cloudflare will always forward the TTL value received from upstream nameservers.

maximum36000

minimum30

<a href="#">Link to this property</a>

ratelimit: number

Maximum number of DNS queries per second that will be forwarded to your upstream nameservers. The limit is enforced per server, where each server receives a fraction of the configured value. The actual aggregate rate for a data center may vary depending on how many servers are present. Responses served from cache do not count toward this limit. Set to null to disable rate limiting.

maximum1000000000

minimum100

<a href="#">Link to this property</a>

retries: number

Number of retries for fetching DNS responses from upstream nameservers (not counting the initial attempt)

maximum2

minimum0

<a href="#">Link to this property</a>

upstream\_ips: array of <a href="https://developers.cloudflare.com/api/resources/dns_firewall#(resource)%20dns_firewall%20%3E%20(model)%20upstream_ips%20%3E%20(schema)">UpstreamIPs</a>

minLength1

<a href="#">Link to this property</a>

attack\_mitigation: optional <a href="https://developers.cloudflare.com/api/resources/dns_firewall#(resource)%20dns_firewall%20%3E%20(model)%20attack_mitigation%20%3E%20(schema)">AttackMitigation</a> { enabled, only\_when\_upstream\_unhealthy }

Attack mitigation settings

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dns_firewall%20%3E%20(model)%20dns_firewall_edit_response%20%3E%20(schema)>)

<details>

<summary>

DNSFirewallDeleteResponse object {id }

</summary>

id: optional string

Identifier.

maxLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dns_firewall%20%3E%20(model)%20dns_firewall_delete_response%20%3E%20(schema)>)

#### DNS FirewallAnalytics

#### DNS FirewallAnalyticsReports

##### [Table](https://developers.cloudflare.com/api/resources/dns_firewall/subresources/analytics/subresources/reports/methods/get)

Deprecated

GET/accounts/{account\_id}/dns\_firewall/{dns\_firewall\_id}/dns\_analytics/report

#### DNS FirewallAnalyticsReportsBytimes

##### [By Time](https://developers.cloudflare.com/api/resources/dns_firewall/subresources/analytics/subresources/reports/subresources/bytimes/methods/get)

Deprecated

GET/accounts/{account\_id}/dns\_firewall/{dns\_firewall\_id}/dns\_analytics/report/bytime

#### DNS FirewallReverse DNS

##### [Show DNS Firewall Cluster Reverse DNS](https://developers.cloudflare.com/api/resources/dns_firewall/subresources/reverse_dns/methods/get)

GET/accounts/{account\_id}/dns\_firewall/{dns\_firewall\_id}/reverse\_dns

##### [Update DNS Firewall Cluster Reverse DNS](https://developers.cloudflare.com/api/resources/dns_firewall/subresources/reverse_dns/methods/edit)

PATCH/accounts/{account\_id}/dns\_firewall/{dns\_firewall\_id}/reverse\_dns

##### ModelsExpand Collapse

<details>

<summary>

ReverseDNSGetResponse object {ptr }

</summary>

ptr: map\[string]

Map of cluster IP addresses to PTR record contents

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dns_firewall.reverse_dns%20%3E%20(model)%20reverse_dns_get_response%20%3E%20(schema)>)

<details>

<summary>

ReverseDNSEditResponse object {ptr }

</summary>

ptr: map\[string]

Map of cluster IP addresses to PTR record contents

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dns_firewall.reverse_dns%20%3E%20(model)%20reverse_dns_edit_response%20%3E%20(schema)>)