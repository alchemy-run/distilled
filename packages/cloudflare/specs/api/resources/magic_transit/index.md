---
title: Magic Transit
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Magic Transit

##### ModelsExpand Collapse

<details>

<summary>

HealthCheck object {enabled, rate, target, type }

</summary>

enabled: optional boolean

Determines whether to run healthchecks for a tunnel.

<a href="#">Link to this property</a>

rate: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit%20%3E%20(model)%20health_check_rate%20%3E%20(schema)">HealthCheckRate</a>

How frequent the health check is run. The default value is <code>mid</code>.

<a href="#">Link to this property</a>

<details>

<summary>

target: optional object {effective, saved } or string

The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to <code>customer_gre_endpoint address</code>. This field is ignored for bidirectional healthchecks as the interface\_address (not assigned to the Cloudflare side of the tunnel) is used as the target. Must be in object form if the x-magic-new-hc-target header is set to true and string form if x-magic-new-hc-target is absent or set to false.

</summary>

One of the following:

<details>

<summary>

MagicHealthCheckTarget object {effective, saved }

The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to <code>customer_gre_endpoint address</code>. This field is ignored for bidirectional healthchecks as the interface\_address (not assigned to the Cloudflare side of the tunnel) is used as the target.

</summary>

effective: optional string

The effective health check target. If ‘saved’ is empty, then this field will be populated with the calculated default value on GET requests. Ignored in POST, PUT, and PATCH requests.

<a href="#">Link to this property</a>

saved: optional string

The saved health check target. Setting the value to the empty string indicates that the calculated default value will be used.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit%20%3E%20(model)%20health_check_type%20%3E%20(schema)">HealthCheckType</a>

The type of healthcheck to run, reply or request. The default value is <code>reply</code>.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit%20%3E%20(model)%20health_check%20%3E%20(schema)>)

<details>

<summary>

HealthCheckRate = "low"or "mid"or "high"

How frequent the health check is run. The default value is <code>mid</code>.

</summary>

One of the following:

"low"

<a href="#">Link to this property</a>

"mid"

<a href="#">Link to this property</a>

"high"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit%20%3E%20(model)%20health_check_rate%20%3E%20(schema)>)

<details>

<summary>

HealthCheckType = "reply"or "request"

The type of healthcheck to run, reply or request. The default value is <code>reply</code>.

</summary>

One of the following:

"reply"

<a href="#">Link to this property</a>

"request"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit%20%3E%20(model)%20health_check_type%20%3E%20(schema)>)

#### Magic TransitApps

##### [List Apps](https://developers.cloudflare.com/api/resources/magic_transit/subresources/apps/methods/list)

GET/accounts/{account\_id}/magic/apps

##### [Create a new App](https://developers.cloudflare.com/api/resources/magic_transit/subresources/apps/methods/create)

POST/accounts/{account\_id}/magic/apps

##### [Update an App](https://developers.cloudflare.com/api/resources/magic_transit/subresources/apps/methods/update)

PUT/accounts/{account\_id}/magic/apps/{account\_app\_id}

##### [Update an App](https://developers.cloudflare.com/api/resources/magic_transit/subresources/apps/methods/edit)

PATCH/accounts/{account\_id}/magic/apps/{account\_app\_id}

##### [Delete Account App](https://developers.cloudflare.com/api/resources/magic_transit/subresources/apps/methods/delete)

DELETE/accounts/{account\_id}/magic/apps/{account\_app\_id}

##### ModelsExpand Collapse

<details>

<summary>

AppListResponse = object {account\_app\_id, hostnames, ip\_subnets, 3 more } or object {managed\_app\_id, hostnames, ip\_subnets, 3 more }

Collection of Hostnames and/or IP Subnets to associate with traffic decisions.

</summary>

One of the following:

<details>

<summary>

MagicAccountApp object {account\_app\_id, hostnames, ip\_subnets, 3 more }

Custom app defined for an account.

</summary>

account\_app\_id: string

Magic account app ID.

<a href="#">Link to this property</a>

hostnames: optional array of string

FQDNs to associate with traffic decisions.

<a href="#">Link to this property</a>

ip\_subnets: optional array of string

IPv4 CIDRs to associate with traffic decisions. (IPv6 CIDRs are currently unsupported)

<a href="#">Link to this property</a>

name: optional string

Display name for the app.

<a href="#">Link to this property</a>

source\_subnets: optional array of string

IPv4 CIDRs to associate with traffic decisions. (IPv6 CIDRs are currently unsupported)

<a href="#">Link to this property</a>

type: optional string

Category of the app.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

MagicManagedApp object {managed\_app\_id, hostnames, ip\_subnets, 3 more }

Managed app defined by Cloudflare.

</summary>

managed\_app\_id: string

Managed app ID.

<a href="#">Link to this property</a>

hostnames: optional array of string

FQDNs to associate with traffic decisions.

<a href="#">Link to this property</a>

ip\_subnets: optional array of string

IPv4 CIDRs to associate with traffic decisions. (IPv6 CIDRs are currently unsupported)

<a href="#">Link to this property</a>

name: optional string

Display name for the app.

<a href="#">Link to this property</a>

source\_subnets: optional array of string

IPv4 CIDRs to associate with traffic decisions. (IPv6 CIDRs are currently unsupported)

<a href="#">Link to this property</a>

type: optional string

Category of the app.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.apps%20%3E%20(model)%20app_list_response%20%3E%20(schema)>)

<details>

<summary>

AppCreateResponse object {account\_app\_id, hostnames, ip\_subnets, 3 more }

Custom app defined for an account.

</summary>

account\_app\_id: string

Magic account app ID.

<a href="#">Link to this property</a>

hostnames: optional array of string

FQDNs to associate with traffic decisions.

<a href="#">Link to this property</a>

ip\_subnets: optional array of string

IPv4 CIDRs to associate with traffic decisions. (IPv6 CIDRs are currently unsupported)

<a href="#">Link to this property</a>

name: optional string

Display name for the app.

<a href="#">Link to this property</a>

source\_subnets: optional array of string

IPv4 CIDRs to associate with traffic decisions. (IPv6 CIDRs are currently unsupported)

<a href="#">Link to this property</a>

type: optional string

Category of the app.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.apps%20%3E%20(model)%20app_create_response%20%3E%20(schema)>)

<details>

<summary>

AppUpdateResponse object {account\_app\_id, hostnames, ip\_subnets, 3 more }

Custom app defined for an account.

</summary>

account\_app\_id: string

Magic account app ID.

<a href="#">Link to this property</a>

hostnames: optional array of string

FQDNs to associate with traffic decisions.

<a href="#">Link to this property</a>

ip\_subnets: optional array of string

IPv4 CIDRs to associate with traffic decisions. (IPv6 CIDRs are currently unsupported)

<a href="#">Link to this property</a>

name: optional string

Display name for the app.

<a href="#">Link to this property</a>

source\_subnets: optional array of string

IPv4 CIDRs to associate with traffic decisions. (IPv6 CIDRs are currently unsupported)

<a href="#">Link to this property</a>

type: optional string

Category of the app.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.apps%20%3E%20(model)%20app_update_response%20%3E%20(schema)>)

<details>

<summary>

AppEditResponse object {account\_app\_id, hostnames, ip\_subnets, 3 more }

Custom app defined for an account.

</summary>

account\_app\_id: string

Magic account app ID.

<a href="#">Link to this property</a>

hostnames: optional array of string

FQDNs to associate with traffic decisions.

<a href="#">Link to this property</a>

ip\_subnets: optional array of string

IPv4 CIDRs to associate with traffic decisions. (IPv6 CIDRs are currently unsupported)

<a href="#">Link to this property</a>

name: optional string

Display name for the app.

<a href="#">Link to this property</a>

source\_subnets: optional array of string

IPv4 CIDRs to associate with traffic decisions. (IPv6 CIDRs are currently unsupported)

<a href="#">Link to this property</a>

type: optional string

Category of the app.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.apps%20%3E%20(model)%20app_edit_response%20%3E%20(schema)>)

<details>

<summary>

AppDeleteResponse object {account\_app\_id, hostnames, ip\_subnets, 3 more }

Custom app defined for an account.

</summary>

account\_app\_id: string

Magic account app ID.

<a href="#">Link to this property</a>

hostnames: optional array of string

FQDNs to associate with traffic decisions.

<a href="#">Link to this property</a>

ip\_subnets: optional array of string

IPv4 CIDRs to associate with traffic decisions. (IPv6 CIDRs are currently unsupported)

<a href="#">Link to this property</a>

name: optional string

Display name for the app.

<a href="#">Link to this property</a>

source\_subnets: optional array of string

IPv4 CIDRs to associate with traffic decisions. (IPv6 CIDRs are currently unsupported)

<a href="#">Link to this property</a>

type: optional string

Category of the app.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.apps%20%3E%20(model)%20app_delete_response%20%3E%20(schema)>)

#### Magic TransitCf Interconnects

##### [List interconnects](https://developers.cloudflare.com/api/resources/magic_transit/subresources/cf_interconnects/methods/list)

GET/accounts/{account\_id}/magic/cf\_interconnects

##### [List interconnect Details](https://developers.cloudflare.com/api/resources/magic_transit/subresources/cf_interconnects/methods/get)

GET/accounts/{account\_id}/magic/cf\_interconnects/{cf\_interconnect\_id}

##### [Update interconnect](https://developers.cloudflare.com/api/resources/magic_transit/subresources/cf_interconnects/methods/update)

PUT/accounts/{account\_id}/magic/cf\_interconnects/{cf\_interconnect\_id}

##### [Update multiple interconnects](https://developers.cloudflare.com/api/resources/magic_transit/subresources/cf_interconnects/methods/bulk_update)

PUT/accounts/{account\_id}/magic/cf\_interconnects

##### ModelsExpand Collapse

<details>

<summary>

CfInterconnectListResponse object {interconnects }

</summary>

<details>

<summary>

interconnects: optional array of object {id, automatic\_return\_routing, bgp, 12 more }

</summary>

id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

automatic\_return\_routing: optional boolean

True if automatic stateful return routing should be enabled for a tunnel, false otherwise. Requires the <code>coupler_integration</code> account flag to be enabled; requests setting this to <code>true</code> without that flag will be rejected.

<a href="#">Link to this property</a>

<details>

<summary>

bgp: optional object {as\_no, cloudflare\_endpoint, customer\_asn, 5 more }

</summary>

Deprecatedas\_no: optional number

Deprecated. Use customer\_asn.

formatint32

<a href="#">Link to this property</a>

Deprecatedcloudflare\_endpoint: optional string

Read-only for v1.5; derived from interface\_address.

formatipv4

<a href="#">Link to this property</a>

customer\_asn: optional number

ASN used on the customer end of the BGP session.

formatint32

<a href="#">Link to this property</a>

Deprecatedcustomer\_endpoint: optional string

Read-only for v1.5; derived from interface\_address.

formatipv4

<a href="#">Link to this property</a>

export\_filter\_id: optional string

ID of the BGP filter profile applied to routes advertised to the customer.

<a href="#">Link to this property</a>

extra\_prefixes: optional array of string

Prefixes in this list will be advertised to the customer device, in addition to the routes in the Magic routing table.

<a href="#">Link to this property</a>

import\_filter\_id: optional string

ID of the BGP filter profile applied to routes received from the customer.

<a href="#">Link to this property</a>

md5\_key: optional string

MD5 key to use for session authentication.

Note that *this is not a security measure*. MD5 is not a valid security mechanism, and the key is not treated as a secret value. This is *only* supported for preventing misconfiguration, not for defending against malicious attacks.

The MD5 key, if set, must be of non-zero length and consist only of the following types of character:

- ASCII alphanumerics: <code>[a-zA-Z0-9]</code>
- Special characters in the set <code>'!@#$%^&amp;*()+[]{}&lt;&gt;/.,;:_-~</code>= |\`

In other words, MD5 keys may contain any printable ASCII character aside from newline (0x0A), quotation mark (<code>"</code>), vertical tab (0x0B), carriage return (0x0D), tab (0x09), form feed (0x0C), and the question mark (<code>?</code>). Requests specifying an MD5 key with one or more of these disallowed characters will be rejected.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

colo\_name: optional string

The name of the interconnect. The name cannot share a name with other tunnels.

<a href="#">Link to this property</a>

created\_on: optional string

The date and time the tunnel was created.

formatdate-time

<a href="#">Link to this property</a>

description: optional string

An optional description of the interconnect.

<a href="#">Link to this property</a>

<details>

<summary>

gre: optional object {cloudflare\_endpoint }

Omitted in responses for version 1.5 interconnects.

</summary>

cloudflare\_endpoint: optional string

The IP address assigned to the Cloudflare side of the GRE tunnel created as part of the Interconnect.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

health\_check: optional object {direction, enabled, rate, 3 more }

</summary>

<details>

<summary>

direction: optional "unidirectional"or "bidirectional"

The direction of the flow of the healthcheck. Either unidirectional, where the probe comes to you via the interconnect and the result comes back to Cloudflare via the open Internet, or bidirectional where both the probe and result come and go via the interconnect.

</summary>

One of the following:

"unidirectional"

<a href="#">Link to this property</a>

"bidirectional"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

enabled: optional boolean

Determines whether to run healthchecks for a tunnel.

<a href="#">Link to this property</a>

rate: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit%20%3E%20(model)%20health_check_rate%20%3E%20(schema)">HealthCheckRate</a>

How frequent the health check is run. The default value is <code>mid</code>.

<a href="#">Link to this property</a>

source: optional string

The source IPv4 address used for bidirectional health checks. Supported only for version 1.5 interconnects. It is required when <code>direction</code> is <code>bidirectional</code> and must be omitted (and is cleared) when <code>direction</code> is <code>unidirectional</code>. The address must be within RFC1918 space, the approved link-local range 169.254.240.0/20, or the Cloudflare reserved range 198.41.199.224/27.

<a href="#">Link to this property</a>

<details>

<summary>

target: optional object {effective, saved } or string

The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to <code>customer_gre_endpoint address</code>. This field is ignored for bidirectional healthchecks as the interface\_address (not assigned to the Cloudflare side of the tunnel) is used as the target. Must be in object form if the x-magic-new-hc-target header is set to true and string form if x-magic-new-hc-target is absent or set to false.

</summary>

One of the following:

<details>

<summary>

MagicHealthCheckTarget object {effective, saved }

The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to <code>customer_gre_endpoint address</code>. This field is ignored for bidirectional healthchecks as the interface\_address (not assigned to the Cloudflare side of the tunnel) is used as the target.

</summary>

effective: optional string

The effective health check target. If ‘saved’ is empty, then this field will be populated with the calculated default value on GET requests. Ignored in POST, PUT, and PATCH requests.

<a href="#">Link to this property</a>

saved: optional string

The saved health check target. Setting the value to the empty string indicates that the calculated default value will be used.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit%20%3E%20(model)%20health_check_type%20%3E%20(schema)">HealthCheckType</a>

The type of healthcheck to run, reply or request. The default value is <code>reply</code>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

interface\_address: optional string

The IPv4 interface address for the interconnect. For MPLS Interconnects, use a /30 or /31 prefix. For GRE Interconnects, a /30 or /31 prefix may be used. Version 1.5 interconnects require a /31 prefix and may also use a prefix from the account’s authorized prefixes; otherwise, select the subnet from RFC 1918 or the approved link-local ranges.

<a href="#">Link to this property</a>

interface\_address6: optional string

A 127 bit IPV6 prefix from within the virtual\_subnet6 prefix space with the address being the first IP of the subnet and not same as the address of virtual\_subnet6. Eg if virtual\_subnet6 is 2606:54c1:7:0:a9fe:12d2::/127 , interface\_address6 could be 2606:54c1:7:0:a9fe:12d2:1:200/127

<a href="#">Link to this property</a>

modified\_on: optional string

The date and time the tunnel was last modified.

formatdate-time

<a href="#">Link to this property</a>

mtu: optional number

The Maximum Transmission Unit (MTU) in bytes for the interconnect. The minimum value is 576.

<a href="#">Link to this property</a>

name: optional string

The name of the interconnect. The name cannot share a name with other tunnels.

<a href="#">Link to this property</a>

version: optional string

Immutable interconnect version configured at creation time. One of:

- “1”
- “1.5”
- “2”

<a href="#">Link to this property</a>

virtual\_port\_reservation\_id: optional string

An identifier that correlates this interconnect with the corresponding V2 CNI interconnect resource.

maxLength32

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.cf_interconnects%20%3E%20(model)%20cf_interconnect_list_response%20%3E%20(schema)>)

<details>

<summary>

CfInterconnectGetResponse object {interconnect }

</summary>

<details>

<summary>

interconnect: optional object {id, automatic\_return\_routing, bgp, 12 more }

</summary>

id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

automatic\_return\_routing: optional boolean

True if automatic stateful return routing should be enabled for a tunnel, false otherwise. Requires the <code>coupler_integration</code> account flag to be enabled; requests setting this to <code>true</code> without that flag will be rejected.

<a href="#">Link to this property</a>

<details>

<summary>

bgp: optional object {as\_no, cloudflare\_endpoint, customer\_asn, 5 more }

</summary>

Deprecatedas\_no: optional number

Deprecated. Use customer\_asn.

formatint32

<a href="#">Link to this property</a>

Deprecatedcloudflare\_endpoint: optional string

Read-only for v1.5; derived from interface\_address.

formatipv4

<a href="#">Link to this property</a>

customer\_asn: optional number

ASN used on the customer end of the BGP session.

formatint32

<a href="#">Link to this property</a>

Deprecatedcustomer\_endpoint: optional string

Read-only for v1.5; derived from interface\_address.

formatipv4

<a href="#">Link to this property</a>

export\_filter\_id: optional string

ID of the BGP filter profile applied to routes advertised to the customer.

<a href="#">Link to this property</a>

extra\_prefixes: optional array of string

Prefixes in this list will be advertised to the customer device, in addition to the routes in the Magic routing table.

<a href="#">Link to this property</a>

import\_filter\_id: optional string

ID of the BGP filter profile applied to routes received from the customer.

<a href="#">Link to this property</a>

md5\_key: optional string

MD5 key to use for session authentication.

Note that *this is not a security measure*. MD5 is not a valid security mechanism, and the key is not treated as a secret value. This is *only* supported for preventing misconfiguration, not for defending against malicious attacks.

The MD5 key, if set, must be of non-zero length and consist only of the following types of character:

- ASCII alphanumerics: <code>[a-zA-Z0-9]</code>
- Special characters in the set <code>'!@#$%^&amp;*()+[]{}&lt;&gt;/.,;:_-~</code>= |\`

In other words, MD5 keys may contain any printable ASCII character aside from newline (0x0A), quotation mark (<code>"</code>), vertical tab (0x0B), carriage return (0x0D), tab (0x09), form feed (0x0C), and the question mark (<code>?</code>). Requests specifying an MD5 key with one or more of these disallowed characters will be rejected.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

colo\_name: optional string

The name of the interconnect. The name cannot share a name with other tunnels.

<a href="#">Link to this property</a>

created\_on: optional string

The date and time the tunnel was created.

formatdate-time

<a href="#">Link to this property</a>

description: optional string

An optional description of the interconnect.

<a href="#">Link to this property</a>

<details>

<summary>

gre: optional object {cloudflare\_endpoint }

Omitted in responses for version 1.5 interconnects.

</summary>

cloudflare\_endpoint: optional string

The IP address assigned to the Cloudflare side of the GRE tunnel created as part of the Interconnect.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

health\_check: optional object {direction, enabled, rate, 3 more }

</summary>

<details>

<summary>

direction: optional "unidirectional"or "bidirectional"

The direction of the flow of the healthcheck. Either unidirectional, where the probe comes to you via the interconnect and the result comes back to Cloudflare via the open Internet, or bidirectional where both the probe and result come and go via the interconnect.

</summary>

One of the following:

"unidirectional"

<a href="#">Link to this property</a>

"bidirectional"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

enabled: optional boolean

Determines whether to run healthchecks for a tunnel.

<a href="#">Link to this property</a>

rate: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit%20%3E%20(model)%20health_check_rate%20%3E%20(schema)">HealthCheckRate</a>

How frequent the health check is run. The default value is <code>mid</code>.

<a href="#">Link to this property</a>

source: optional string

The source IPv4 address used for bidirectional health checks. Supported only for version 1.5 interconnects. It is required when <code>direction</code> is <code>bidirectional</code> and must be omitted (and is cleared) when <code>direction</code> is <code>unidirectional</code>. The address must be within RFC1918 space, the approved link-local range 169.254.240.0/20, or the Cloudflare reserved range 198.41.199.224/27.

<a href="#">Link to this property</a>

<details>

<summary>

target: optional object {effective, saved } or string

The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to <code>customer_gre_endpoint address</code>. This field is ignored for bidirectional healthchecks as the interface\_address (not assigned to the Cloudflare side of the tunnel) is used as the target. Must be in object form if the x-magic-new-hc-target header is set to true and string form if x-magic-new-hc-target is absent or set to false.

</summary>

One of the following:

<details>

<summary>

MagicHealthCheckTarget object {effective, saved }

The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to <code>customer_gre_endpoint address</code>. This field is ignored for bidirectional healthchecks as the interface\_address (not assigned to the Cloudflare side of the tunnel) is used as the target.

</summary>

effective: optional string

The effective health check target. If ‘saved’ is empty, then this field will be populated with the calculated default value on GET requests. Ignored in POST, PUT, and PATCH requests.

<a href="#">Link to this property</a>

saved: optional string

The saved health check target. Setting the value to the empty string indicates that the calculated default value will be used.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit%20%3E%20(model)%20health_check_type%20%3E%20(schema)">HealthCheckType</a>

The type of healthcheck to run, reply or request. The default value is <code>reply</code>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

interface\_address: optional string

The IPv4 interface address for the interconnect. For MPLS Interconnects, use a /30 or /31 prefix. For GRE Interconnects, a /30 or /31 prefix may be used. Version 1.5 interconnects require a /31 prefix and may also use a prefix from the account’s authorized prefixes; otherwise, select the subnet from RFC 1918 or the approved link-local ranges.

<a href="#">Link to this property</a>

interface\_address6: optional string

A 127 bit IPV6 prefix from within the virtual\_subnet6 prefix space with the address being the first IP of the subnet and not same as the address of virtual\_subnet6. Eg if virtual\_subnet6 is 2606:54c1:7:0:a9fe:12d2::/127 , interface\_address6 could be 2606:54c1:7:0:a9fe:12d2:1:200/127

<a href="#">Link to this property</a>

modified\_on: optional string

The date and time the tunnel was last modified.

formatdate-time

<a href="#">Link to this property</a>

mtu: optional number

The Maximum Transmission Unit (MTU) in bytes for the interconnect. The minimum value is 576.

<a href="#">Link to this property</a>

name: optional string

The name of the interconnect. The name cannot share a name with other tunnels.

<a href="#">Link to this property</a>

version: optional string

Immutable interconnect version configured at creation time. One of:

- “1”
- “1.5”
- “2”

<a href="#">Link to this property</a>

virtual\_port\_reservation\_id: optional string

An identifier that correlates this interconnect with the corresponding V2 CNI interconnect resource.

maxLength32

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.cf_interconnects%20%3E%20(model)%20cf_interconnect_get_response%20%3E%20(schema)>)

<details>

<summary>

CfInterconnectUpdateResponse object {modified, modified\_interconnect }

</summary>

modified: optional boolean

<a href="#">Link to this property</a>

<details>

<summary>

modified\_interconnect: optional object {id, automatic\_return\_routing, bgp, 12 more }

</summary>

id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

automatic\_return\_routing: optional boolean

True if automatic stateful return routing should be enabled for a tunnel, false otherwise. Requires the <code>coupler_integration</code> account flag to be enabled; requests setting this to <code>true</code> without that flag will be rejected.

<a href="#">Link to this property</a>

<details>

<summary>

bgp: optional object {as\_no, cloudflare\_endpoint, customer\_asn, 5 more }

</summary>

Deprecatedas\_no: optional number

Deprecated. Use customer\_asn.

formatint32

<a href="#">Link to this property</a>

Deprecatedcloudflare\_endpoint: optional string

Read-only for v1.5; derived from interface\_address.

formatipv4

<a href="#">Link to this property</a>

customer\_asn: optional number

ASN used on the customer end of the BGP session.

formatint32

<a href="#">Link to this property</a>

Deprecatedcustomer\_endpoint: optional string

Read-only for v1.5; derived from interface\_address.

formatipv4

<a href="#">Link to this property</a>

export\_filter\_id: optional string

ID of the BGP filter profile applied to routes advertised to the customer.

<a href="#">Link to this property</a>

extra\_prefixes: optional array of string

Prefixes in this list will be advertised to the customer device, in addition to the routes in the Magic routing table.

<a href="#">Link to this property</a>

import\_filter\_id: optional string

ID of the BGP filter profile applied to routes received from the customer.

<a href="#">Link to this property</a>

md5\_key: optional string

MD5 key to use for session authentication.

Note that *this is not a security measure*. MD5 is not a valid security mechanism, and the key is not treated as a secret value. This is *only* supported for preventing misconfiguration, not for defending against malicious attacks.

The MD5 key, if set, must be of non-zero length and consist only of the following types of character:

- ASCII alphanumerics: <code>[a-zA-Z0-9]</code>
- Special characters in the set <code>'!@#$%^&amp;*()+[]{}&lt;&gt;/.,;:_-~</code>= |\`

In other words, MD5 keys may contain any printable ASCII character aside from newline (0x0A), quotation mark (<code>"</code>), vertical tab (0x0B), carriage return (0x0D), tab (0x09), form feed (0x0C), and the question mark (<code>?</code>). Requests specifying an MD5 key with one or more of these disallowed characters will be rejected.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

colo\_name: optional string

The name of the interconnect. The name cannot share a name with other tunnels.

<a href="#">Link to this property</a>

created\_on: optional string

The date and time the tunnel was created.

formatdate-time

<a href="#">Link to this property</a>

description: optional string

An optional description of the interconnect.

<a href="#">Link to this property</a>

<details>

<summary>

gre: optional object {cloudflare\_endpoint }

Omitted in responses for version 1.5 interconnects.

</summary>

cloudflare\_endpoint: optional string

The IP address assigned to the Cloudflare side of the GRE tunnel created as part of the Interconnect.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

health\_check: optional object {direction, enabled, rate, 3 more }

</summary>

<details>

<summary>

direction: optional "unidirectional"or "bidirectional"

The direction of the flow of the healthcheck. Either unidirectional, where the probe comes to you via the interconnect and the result comes back to Cloudflare via the open Internet, or bidirectional where both the probe and result come and go via the interconnect.

</summary>

One of the following:

"unidirectional"

<a href="#">Link to this property</a>

"bidirectional"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

enabled: optional boolean

Determines whether to run healthchecks for a tunnel.

<a href="#">Link to this property</a>

rate: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit%20%3E%20(model)%20health_check_rate%20%3E%20(schema)">HealthCheckRate</a>

How frequent the health check is run. The default value is <code>mid</code>.

<a href="#">Link to this property</a>

source: optional string

The source IPv4 address used for bidirectional health checks. Supported only for version 1.5 interconnects. It is required when <code>direction</code> is <code>bidirectional</code> and must be omitted (and is cleared) when <code>direction</code> is <code>unidirectional</code>. The address must be within RFC1918 space, the approved link-local range 169.254.240.0/20, or the Cloudflare reserved range 198.41.199.224/27.

<a href="#">Link to this property</a>

<details>

<summary>

target: optional object {effective, saved } or string

The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to <code>customer_gre_endpoint address</code>. This field is ignored for bidirectional healthchecks as the interface\_address (not assigned to the Cloudflare side of the tunnel) is used as the target. Must be in object form if the x-magic-new-hc-target header is set to true and string form if x-magic-new-hc-target is absent or set to false.

</summary>

One of the following:

<details>

<summary>

MagicHealthCheckTarget object {effective, saved }

The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to <code>customer_gre_endpoint address</code>. This field is ignored for bidirectional healthchecks as the interface\_address (not assigned to the Cloudflare side of the tunnel) is used as the target.

</summary>

effective: optional string

The effective health check target. If ‘saved’ is empty, then this field will be populated with the calculated default value on GET requests. Ignored in POST, PUT, and PATCH requests.

<a href="#">Link to this property</a>

saved: optional string

The saved health check target. Setting the value to the empty string indicates that the calculated default value will be used.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit%20%3E%20(model)%20health_check_type%20%3E%20(schema)">HealthCheckType</a>

The type of healthcheck to run, reply or request. The default value is <code>reply</code>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

interface\_address: optional string

The IPv4 interface address for the interconnect. For MPLS Interconnects, use a /30 or /31 prefix. For GRE Interconnects, a /30 or /31 prefix may be used. Version 1.5 interconnects require a /31 prefix and may also use a prefix from the account’s authorized prefixes; otherwise, select the subnet from RFC 1918 or the approved link-local ranges.

<a href="#">Link to this property</a>

interface\_address6: optional string

A 127 bit IPV6 prefix from within the virtual\_subnet6 prefix space with the address being the first IP of the subnet and not same as the address of virtual\_subnet6. Eg if virtual\_subnet6 is 2606:54c1:7:0:a9fe:12d2::/127 , interface\_address6 could be 2606:54c1:7:0:a9fe:12d2:1:200/127

<a href="#">Link to this property</a>

modified\_on: optional string

The date and time the tunnel was last modified.

formatdate-time

<a href="#">Link to this property</a>

mtu: optional number

The Maximum Transmission Unit (MTU) in bytes for the interconnect. The minimum value is 576.

<a href="#">Link to this property</a>

name: optional string

The name of the interconnect. The name cannot share a name with other tunnels.

<a href="#">Link to this property</a>

version: optional string

Immutable interconnect version configured at creation time. One of:

- “1”
- “1.5”
- “2”

<a href="#">Link to this property</a>

virtual\_port\_reservation\_id: optional string

An identifier that correlates this interconnect with the corresponding V2 CNI interconnect resource.

maxLength32

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.cf_interconnects%20%3E%20(model)%20cf_interconnect_update_response%20%3E%20(schema)>)

<details>

<summary>

CfInterconnectBulkUpdateResponse object {modified, modified\_interconnects }

</summary>

modified: optional boolean

<a href="#">Link to this property</a>

<details>

<summary>

modified\_interconnects: optional array of object {id, automatic\_return\_routing, bgp, 12 more }

</summary>

id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

automatic\_return\_routing: optional boolean

True if automatic stateful return routing should be enabled for a tunnel, false otherwise. Requires the <code>coupler_integration</code> account flag to be enabled; requests setting this to <code>true</code> without that flag will be rejected.

<a href="#">Link to this property</a>

<details>

<summary>

bgp: optional object {as\_no, cloudflare\_endpoint, customer\_asn, 5 more }

</summary>

Deprecatedas\_no: optional number

Deprecated. Use customer\_asn.

formatint32

<a href="#">Link to this property</a>

Deprecatedcloudflare\_endpoint: optional string

Read-only for v1.5; derived from interface\_address.

formatipv4

<a href="#">Link to this property</a>

customer\_asn: optional number

ASN used on the customer end of the BGP session.

formatint32

<a href="#">Link to this property</a>

Deprecatedcustomer\_endpoint: optional string

Read-only for v1.5; derived from interface\_address.

formatipv4

<a href="#">Link to this property</a>

export\_filter\_id: optional string

ID of the BGP filter profile applied to routes advertised to the customer.

<a href="#">Link to this property</a>

extra\_prefixes: optional array of string

Prefixes in this list will be advertised to the customer device, in addition to the routes in the Magic routing table.

<a href="#">Link to this property</a>

import\_filter\_id: optional string

ID of the BGP filter profile applied to routes received from the customer.

<a href="#">Link to this property</a>

md5\_key: optional string

MD5 key to use for session authentication.

Note that *this is not a security measure*. MD5 is not a valid security mechanism, and the key is not treated as a secret value. This is *only* supported for preventing misconfiguration, not for defending against malicious attacks.

The MD5 key, if set, must be of non-zero length and consist only of the following types of character:

- ASCII alphanumerics: <code>[a-zA-Z0-9]</code>
- Special characters in the set <code>'!@#$%^&amp;*()+[]{}&lt;&gt;/.,;:_-~</code>= |\`

In other words, MD5 keys may contain any printable ASCII character aside from newline (0x0A), quotation mark (<code>"</code>), vertical tab (0x0B), carriage return (0x0D), tab (0x09), form feed (0x0C), and the question mark (<code>?</code>). Requests specifying an MD5 key with one or more of these disallowed characters will be rejected.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

colo\_name: optional string

The name of the interconnect. The name cannot share a name with other tunnels.

<a href="#">Link to this property</a>

created\_on: optional string

The date and time the tunnel was created.

formatdate-time

<a href="#">Link to this property</a>

description: optional string

An optional description of the interconnect.

<a href="#">Link to this property</a>

<details>

<summary>

gre: optional object {cloudflare\_endpoint }

Omitted in responses for version 1.5 interconnects.

</summary>

cloudflare\_endpoint: optional string

The IP address assigned to the Cloudflare side of the GRE tunnel created as part of the Interconnect.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

health\_check: optional object {direction, enabled, rate, 3 more }

</summary>

<details>

<summary>

direction: optional "unidirectional"or "bidirectional"

The direction of the flow of the healthcheck. Either unidirectional, where the probe comes to you via the interconnect and the result comes back to Cloudflare via the open Internet, or bidirectional where both the probe and result come and go via the interconnect.

</summary>

One of the following:

"unidirectional"

<a href="#">Link to this property</a>

"bidirectional"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

enabled: optional boolean

Determines whether to run healthchecks for a tunnel.

<a href="#">Link to this property</a>

rate: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit%20%3E%20(model)%20health_check_rate%20%3E%20(schema)">HealthCheckRate</a>

How frequent the health check is run. The default value is <code>mid</code>.

<a href="#">Link to this property</a>

source: optional string

The source IPv4 address used for bidirectional health checks. Supported only for version 1.5 interconnects. It is required when <code>direction</code> is <code>bidirectional</code> and must be omitted (and is cleared) when <code>direction</code> is <code>unidirectional</code>. The address must be within RFC1918 space, the approved link-local range 169.254.240.0/20, or the Cloudflare reserved range 198.41.199.224/27.

<a href="#">Link to this property</a>

<details>

<summary>

target: optional object {effective, saved } or string

The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to <code>customer_gre_endpoint address</code>. This field is ignored for bidirectional healthchecks as the interface\_address (not assigned to the Cloudflare side of the tunnel) is used as the target. Must be in object form if the x-magic-new-hc-target header is set to true and string form if x-magic-new-hc-target is absent or set to false.

</summary>

One of the following:

<details>

<summary>

MagicHealthCheckTarget object {effective, saved }

The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to <code>customer_gre_endpoint address</code>. This field is ignored for bidirectional healthchecks as the interface\_address (not assigned to the Cloudflare side of the tunnel) is used as the target.

</summary>

effective: optional string

The effective health check target. If ‘saved’ is empty, then this field will be populated with the calculated default value on GET requests. Ignored in POST, PUT, and PATCH requests.

<a href="#">Link to this property</a>

saved: optional string

The saved health check target. Setting the value to the empty string indicates that the calculated default value will be used.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit%20%3E%20(model)%20health_check_type%20%3E%20(schema)">HealthCheckType</a>

The type of healthcheck to run, reply or request. The default value is <code>reply</code>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

interface\_address: optional string

The IPv4 interface address for the interconnect. For MPLS Interconnects, use a /30 or /31 prefix. For GRE Interconnects, a /30 or /31 prefix may be used. Version 1.5 interconnects require a /31 prefix and may also use a prefix from the account’s authorized prefixes; otherwise, select the subnet from RFC 1918 or the approved link-local ranges.

<a href="#">Link to this property</a>

interface\_address6: optional string

A 127 bit IPV6 prefix from within the virtual\_subnet6 prefix space with the address being the first IP of the subnet and not same as the address of virtual\_subnet6. Eg if virtual\_subnet6 is 2606:54c1:7:0:a9fe:12d2::/127 , interface\_address6 could be 2606:54c1:7:0:a9fe:12d2:1:200/127

<a href="#">Link to this property</a>

modified\_on: optional string

The date and time the tunnel was last modified.

formatdate-time

<a href="#">Link to this property</a>

mtu: optional number

The Maximum Transmission Unit (MTU) in bytes for the interconnect. The minimum value is 576.

<a href="#">Link to this property</a>

name: optional string

The name of the interconnect. The name cannot share a name with other tunnels.

<a href="#">Link to this property</a>

version: optional string

Immutable interconnect version configured at creation time. One of:

- “1”
- “1.5”
- “2”

<a href="#">Link to this property</a>

virtual\_port\_reservation\_id: optional string

An identifier that correlates this interconnect with the corresponding V2 CNI interconnect resource.

maxLength32

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.cf_interconnects%20%3E%20(model)%20cf_interconnect_bulk_update_response%20%3E%20(schema)>)

#### Magic TransitGRE Tunnels

##### [List GRE tunnels](https://developers.cloudflare.com/api/resources/magic_transit/subresources/gre_tunnels/methods/list)

GET/accounts/{account\_id}/magic/gre\_tunnels

##### [List GRE Tunnel Details](https://developers.cloudflare.com/api/resources/magic_transit/subresources/gre_tunnels/methods/get)

GET/accounts/{account\_id}/magic/gre\_tunnels/{gre\_tunnel\_id}

##### [Create a GRE tunnel](https://developers.cloudflare.com/api/resources/magic_transit/subresources/gre_tunnels/methods/create)

POST/accounts/{account\_id}/magic/gre\_tunnels

##### [Update GRE Tunnel](https://developers.cloudflare.com/api/resources/magic_transit/subresources/gre_tunnels/methods/update)

PUT/accounts/{account\_id}/magic/gre\_tunnels/{gre\_tunnel\_id}

##### [Delete GRE Tunnel](https://developers.cloudflare.com/api/resources/magic_transit/subresources/gre_tunnels/methods/delete)

DELETE/accounts/{account\_id}/magic/gre\_tunnels/{gre\_tunnel\_id}

##### [Update multiple GRE tunnels](https://developers.cloudflare.com/api/resources/magic_transit/subresources/gre_tunnels/methods/bulk_update)

PUT/accounts/{account\_id}/magic/gre\_tunnels

##### ModelsExpand Collapse

<details>

<summary>

GRETunnelListResponse object {gre\_tunnels }

</summary>

<details>

<summary>

gre\_tunnels: optional array of object {id, cloudflare\_gre\_endpoint, customer\_gre\_endpoint, 12 more }

</summary>

id: string

Identifier

maxLength32

<a href="#">Link to this property</a>

cloudflare\_gre\_endpoint: string

The IP address assigned to the Cloudflare side of the GRE tunnel.

<a href="#">Link to this property</a>

customer\_gre\_endpoint: string

The IP address assigned to the customer side of the GRE tunnel.

<a href="#">Link to this property</a>

interface\_address: string

A 31-bit prefix (/31 in CIDR notation) supporting two hosts, one for each side of the tunnel. Select the subnet from the following private IP space: 10.0.0.0–10.255.255.255, 172.16.0.0–172.31.255.255, 192.168.0.0–192.168.255.255.

<a href="#">Link to this property</a>

name: string

The name of the tunnel. The name cannot contain spaces or special characters, must be 15 characters or less, and cannot share a name with another GRE tunnel.

<a href="#">Link to this property</a>

automatic\_return\_routing: optional boolean

True if automatic stateful return routing should be enabled for a tunnel, false otherwise. Requires the <code>coupler_integration</code> account flag to be enabled; requests setting this to <code>true</code> without that flag will be rejected.

<a href="#">Link to this property</a>

<details>

<summary>

bgp: optional object {customer\_asn, export\_filter\_id, extra\_prefixes, 2 more }

</summary>

customer\_asn: number

ASN used on the customer end of the BGP session

formatint32

minimum0

<a href="#">Link to this property</a>

export\_filter\_id: optional string

ID of the BGP filter profile applied to routes advertised to the customer.

<a href="#">Link to this property</a>

extra\_prefixes: optional array of string

Prefixes in this list will be advertised to the customer device, in addition to the routes in the Magic routing table.

<a href="#">Link to this property</a>

import\_filter\_id: optional string

ID of the BGP filter profile applied to routes received from the customer.

<a href="#">Link to this property</a>

md5\_key: optional string

MD5 key to use for session authentication.

Note that *this is not a security measure*. MD5 is not a valid security mechanism, and the key is not treated as a secret value. This is *only* supported for preventing misconfiguration, not for defending against malicious attacks.

The MD5 key, if set, must be of non-zero length and consist only of the following types of character:

- ASCII alphanumerics: <code>[a-zA-Z0-9]</code>
- Special characters in the set <code>'!@#$%^&amp;*()+[]{}&lt;&gt;/.,;:_-~</code>= |\`

In other words, MD5 keys may contain any printable ASCII character aside from newline (0x0A), quotation mark (<code>"</code>), vertical tab (0x0B), carriage return (0x0D), tab (0x09), form feed (0x0C), and the question mark (<code>?</code>). Requests specifying an MD5 key with one or more of these disallowed characters will be rejected.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

bgp\_status: optional object {state, tcp\_established, updated\_at, 5 more }

</summary>

<details>

<summary>

state: "BGP\_DOWN"or "BGP\_UP"or "BGP\_ESTABLISHING"

</summary>

One of the following:

"BGP\_DOWN"

<a href="#">Link to this property</a>

"BGP\_UP"

<a href="#">Link to this property</a>

"BGP\_ESTABLISHING"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

tcp\_established: boolean

<a href="#">Link to this property</a>

updated\_at: string

formatdate-time

<a href="#">Link to this property</a>

bgp\_state: optional string

<a href="#">Link to this property</a>

cf\_speaker\_ip: optional string

formatipv4

<a href="#">Link to this property</a>

cf\_speaker\_port: optional number

maximum65535

minimum1

<a href="#">Link to this property</a>

customer\_speaker\_ip: optional string

formatipv4

<a href="#">Link to this property</a>

customer\_speaker\_port: optional number

maximum65535

minimum1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_on: optional string

The date and time the tunnel was created.

formatdate-time

<a href="#">Link to this property</a>

description: optional string

An optional description of the GRE tunnel.

<a href="#">Link to this property</a>

<details>

<summary>

health\_check: optional object {direction, enabled, rate, 2 more }

</summary>

<details>

<summary>

direction: optional "unidirectional"or "bidirectional"

The direction of the flow of the healthcheck. Either unidirectional, where the probe comes to you via the tunnel and the result comes back to Cloudflare via the open Internet, or bidirectional where both the probe and result come and go via the tunnel.

</summary>

One of the following:

"unidirectional"

<a href="#">Link to this property</a>

"bidirectional"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

enabled: optional boolean

Determines whether to run healthchecks for a tunnel.

<a href="#">Link to this property</a>

rate: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit%20%3E%20(model)%20health_check_rate%20%3E%20(schema)">HealthCheckRate</a>

How frequent the health check is run. The default value is <code>mid</code>.

<a href="#">Link to this property</a>

<details>

<summary>

target: optional object {effective, saved } or string

The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to <code>customer_gre_endpoint address</code>. This field is ignored for bidirectional healthchecks as the interface\_address (not assigned to the Cloudflare side of the tunnel) is used as the target. Must be in object form if the x-magic-new-hc-target header is set to true and string form if x-magic-new-hc-target is absent or set to false.

</summary>

One of the following:

<details>

<summary>

MagicHealthCheckTarget object {effective, saved }

The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to <code>customer_gre_endpoint address</code>. This field is ignored for bidirectional healthchecks as the interface\_address (not assigned to the Cloudflare side of the tunnel) is used as the target.

</summary>

effective: optional string

The effective health check target. If ‘saved’ is empty, then this field will be populated with the calculated default value on GET requests. Ignored in POST, PUT, and PATCH requests.

<a href="#">Link to this property</a>

saved: optional string

The saved health check target. Setting the value to the empty string indicates that the calculated default value will be used.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit%20%3E%20(model)%20health_check_type%20%3E%20(schema)">HealthCheckType</a>

The type of healthcheck to run, reply or request. The default value is <code>reply</code>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

interface\_address6: optional string

A 127 bit IPV6 prefix from within the virtual\_subnet6 prefix space with the address being the first IP of the subnet and not same as the address of virtual\_subnet6. Eg if virtual\_subnet6 is 2606:54c1:7:0:a9fe:12d2::/127 , interface\_address6 could be 2606:54c1:7:0:a9fe:12d2:1:200/127

<a href="#">Link to this property</a>

modified\_on: optional string

The date and time the tunnel was last modified.

formatdate-time

<a href="#">Link to this property</a>

mtu: optional number

Maximum Transmission Unit (MTU) in bytes for the GRE tunnel. The minimum value is 576.

<a href="#">Link to this property</a>

ttl: optional number

Time To Live (TTL) in number of hops of the GRE tunnel.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.gre_tunnels%20%3E%20(model)%20gre_tunnel_list_response%20%3E%20(schema)>)

<details>

<summary>

GRETunnelGetResponse object {gre\_tunnel }

</summary>

<details>

<summary>

gre\_tunnel: optional object {id, cloudflare\_gre\_endpoint, customer\_gre\_endpoint, 12 more }

</summary>

id: string

Identifier

maxLength32

<a href="#">Link to this property</a>

cloudflare\_gre\_endpoint: string

The IP address assigned to the Cloudflare side of the GRE tunnel.

<a href="#">Link to this property</a>

customer\_gre\_endpoint: string

The IP address assigned to the customer side of the GRE tunnel.

<a href="#">Link to this property</a>

interface\_address: string

A 31-bit prefix (/31 in CIDR notation) supporting two hosts, one for each side of the tunnel. Select the subnet from the following private IP space: 10.0.0.0–10.255.255.255, 172.16.0.0–172.31.255.255, 192.168.0.0–192.168.255.255.

<a href="#">Link to this property</a>

name: string

The name of the tunnel. The name cannot contain spaces or special characters, must be 15 characters or less, and cannot share a name with another GRE tunnel.

<a href="#">Link to this property</a>

automatic\_return\_routing: optional boolean

True if automatic stateful return routing should be enabled for a tunnel, false otherwise. Requires the <code>coupler_integration</code> account flag to be enabled; requests setting this to <code>true</code> without that flag will be rejected.

<a href="#">Link to this property</a>

<details>

<summary>

bgp: optional object {customer\_asn, export\_filter\_id, extra\_prefixes, 2 more }

</summary>

customer\_asn: number

ASN used on the customer end of the BGP session

formatint32

minimum0

<a href="#">Link to this property</a>

export\_filter\_id: optional string

ID of the BGP filter profile applied to routes advertised to the customer.

<a href="#">Link to this property</a>

extra\_prefixes: optional array of string

Prefixes in this list will be advertised to the customer device, in addition to the routes in the Magic routing table.

<a href="#">Link to this property</a>

import\_filter\_id: optional string

ID of the BGP filter profile applied to routes received from the customer.

<a href="#">Link to this property</a>

md5\_key: optional string

MD5 key to use for session authentication.

Note that *this is not a security measure*. MD5 is not a valid security mechanism, and the key is not treated as a secret value. This is *only* supported for preventing misconfiguration, not for defending against malicious attacks.

The MD5 key, if set, must be of non-zero length and consist only of the following types of character:

- ASCII alphanumerics: <code>[a-zA-Z0-9]</code>
- Special characters in the set <code>'!@#$%^&amp;*()+[]{}&lt;&gt;/.,;:_-~</code>= |\`

In other words, MD5 keys may contain any printable ASCII character aside from newline (0x0A), quotation mark (<code>"</code>), vertical tab (0x0B), carriage return (0x0D), tab (0x09), form feed (0x0C), and the question mark (<code>?</code>). Requests specifying an MD5 key with one or more of these disallowed characters will be rejected.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

bgp\_status: optional object {state, tcp\_established, updated\_at, 5 more }

</summary>

<details>

<summary>

state: "BGP\_DOWN"or "BGP\_UP"or "BGP\_ESTABLISHING"

</summary>

One of the following:

"BGP\_DOWN"

<a href="#">Link to this property</a>

"BGP\_UP"

<a href="#">Link to this property</a>

"BGP\_ESTABLISHING"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

tcp\_established: boolean

<a href="#">Link to this property</a>

updated\_at: string

formatdate-time

<a href="#">Link to this property</a>

bgp\_state: optional string

<a href="#">Link to this property</a>

cf\_speaker\_ip: optional string

formatipv4

<a href="#">Link to this property</a>

cf\_speaker\_port: optional number

maximum65535

minimum1

<a href="#">Link to this property</a>

customer\_speaker\_ip: optional string

formatipv4

<a href="#">Link to this property</a>

customer\_speaker\_port: optional number

maximum65535

minimum1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_on: optional string

The date and time the tunnel was created.

formatdate-time

<a href="#">Link to this property</a>

description: optional string

An optional description of the GRE tunnel.

<a href="#">Link to this property</a>

<details>

<summary>

health\_check: optional object {direction, enabled, rate, 2 more }

</summary>

<details>

<summary>

direction: optional "unidirectional"or "bidirectional"

The direction of the flow of the healthcheck. Either unidirectional, where the probe comes to you via the tunnel and the result comes back to Cloudflare via the open Internet, or bidirectional where both the probe and result come and go via the tunnel.

</summary>

One of the following:

"unidirectional"

<a href="#">Link to this property</a>

"bidirectional"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

enabled: optional boolean

Determines whether to run healthchecks for a tunnel.

<a href="#">Link to this property</a>

rate: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit%20%3E%20(model)%20health_check_rate%20%3E%20(schema)">HealthCheckRate</a>

How frequent the health check is run. The default value is <code>mid</code>.

<a href="#">Link to this property</a>

<details>

<summary>

target: optional object {effective, saved } or string

The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to <code>customer_gre_endpoint address</code>. This field is ignored for bidirectional healthchecks as the interface\_address (not assigned to the Cloudflare side of the tunnel) is used as the target. Must be in object form if the x-magic-new-hc-target header is set to true and string form if x-magic-new-hc-target is absent or set to false.

</summary>

One of the following:

<details>

<summary>

MagicHealthCheckTarget object {effective, saved }

The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to <code>customer_gre_endpoint address</code>. This field is ignored for bidirectional healthchecks as the interface\_address (not assigned to the Cloudflare side of the tunnel) is used as the target.

</summary>

effective: optional string

The effective health check target. If ‘saved’ is empty, then this field will be populated with the calculated default value on GET requests. Ignored in POST, PUT, and PATCH requests.

<a href="#">Link to this property</a>

saved: optional string

The saved health check target. Setting the value to the empty string indicates that the calculated default value will be used.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit%20%3E%20(model)%20health_check_type%20%3E%20(schema)">HealthCheckType</a>

The type of healthcheck to run, reply or request. The default value is <code>reply</code>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

interface\_address6: optional string

A 127 bit IPV6 prefix from within the virtual\_subnet6 prefix space with the address being the first IP of the subnet and not same as the address of virtual\_subnet6. Eg if virtual\_subnet6 is 2606:54c1:7:0:a9fe:12d2::/127 , interface\_address6 could be 2606:54c1:7:0:a9fe:12d2:1:200/127

<a href="#">Link to this property</a>

modified\_on: optional string

The date and time the tunnel was last modified.

formatdate-time

<a href="#">Link to this property</a>

mtu: optional number

Maximum Transmission Unit (MTU) in bytes for the GRE tunnel. The minimum value is 576.

<a href="#">Link to this property</a>

ttl: optional number

Time To Live (TTL) in number of hops of the GRE tunnel.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.gre_tunnels%20%3E%20(model)%20gre_tunnel_get_response%20%3E%20(schema)>)

<details>

<summary>

GRETunnelCreateResponse object {id, cloudflare\_gre\_endpoint, customer\_gre\_endpoint, 12 more }

</summary>

id: string

Identifier

maxLength32

<a href="#">Link to this property</a>

cloudflare\_gre\_endpoint: string

The IP address assigned to the Cloudflare side of the GRE tunnel.

<a href="#">Link to this property</a>

customer\_gre\_endpoint: string

The IP address assigned to the customer side of the GRE tunnel.

<a href="#">Link to this property</a>

interface\_address: string

A 31-bit prefix (/31 in CIDR notation) supporting two hosts, one for each side of the tunnel. Select the subnet from the following private IP space: 10.0.0.0–10.255.255.255, 172.16.0.0–172.31.255.255, 192.168.0.0–192.168.255.255.

<a href="#">Link to this property</a>

name: string

The name of the tunnel. The name cannot contain spaces or special characters, must be 15 characters or less, and cannot share a name with another GRE tunnel.

<a href="#">Link to this property</a>

automatic\_return\_routing: optional boolean

True if automatic stateful return routing should be enabled for a tunnel, false otherwise. Requires the <code>coupler_integration</code> account flag to be enabled; requests setting this to <code>true</code> without that flag will be rejected.

<a href="#">Link to this property</a>

<details>

<summary>

bgp: optional object {customer\_asn, export\_filter\_id, extra\_prefixes, 2 more }

</summary>

customer\_asn: number

ASN used on the customer end of the BGP session

formatint32

minimum0

<a href="#">Link to this property</a>

export\_filter\_id: optional string

ID of the BGP filter profile applied to routes advertised to the customer.

<a href="#">Link to this property</a>

extra\_prefixes: optional array of string

Prefixes in this list will be advertised to the customer device, in addition to the routes in the Magic routing table.

<a href="#">Link to this property</a>

import\_filter\_id: optional string

ID of the BGP filter profile applied to routes received from the customer.

<a href="#">Link to this property</a>

md5\_key: optional string

MD5 key to use for session authentication.

Note that *this is not a security measure*. MD5 is not a valid security mechanism, and the key is not treated as a secret value. This is *only* supported for preventing misconfiguration, not for defending against malicious attacks.

The MD5 key, if set, must be of non-zero length and consist only of the following types of character:

- ASCII alphanumerics: <code>[a-zA-Z0-9]</code>
- Special characters in the set <code>'!@#$%^&amp;*()+[]{}&lt;&gt;/.,;:_-~</code>= |\`

In other words, MD5 keys may contain any printable ASCII character aside from newline (0x0A), quotation mark (<code>"</code>), vertical tab (0x0B), carriage return (0x0D), tab (0x09), form feed (0x0C), and the question mark (<code>?</code>). Requests specifying an MD5 key with one or more of these disallowed characters will be rejected.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

bgp\_status: optional object {state, tcp\_established, updated\_at, 5 more }

</summary>

<details>

<summary>

state: "BGP\_DOWN"or "BGP\_UP"or "BGP\_ESTABLISHING"

</summary>

One of the following:

"BGP\_DOWN"

<a href="#">Link to this property</a>

"BGP\_UP"

<a href="#">Link to this property</a>

"BGP\_ESTABLISHING"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

tcp\_established: boolean

<a href="#">Link to this property</a>

updated\_at: string

formatdate-time

<a href="#">Link to this property</a>

bgp\_state: optional string

<a href="#">Link to this property</a>

cf\_speaker\_ip: optional string

formatipv4

<a href="#">Link to this property</a>

cf\_speaker\_port: optional number

maximum65535

minimum1

<a href="#">Link to this property</a>

customer\_speaker\_ip: optional string

formatipv4

<a href="#">Link to this property</a>

customer\_speaker\_port: optional number

maximum65535

minimum1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_on: optional string

The date and time the tunnel was created.

formatdate-time

<a href="#">Link to this property</a>

description: optional string

An optional description of the GRE tunnel.

<a href="#">Link to this property</a>

<details>

<summary>

health\_check: optional object {direction, enabled, rate, 2 more }

</summary>

<details>

<summary>

direction: optional "unidirectional"or "bidirectional"

The direction of the flow of the healthcheck. Either unidirectional, where the probe comes to you via the tunnel and the result comes back to Cloudflare via the open Internet, or bidirectional where both the probe and result come and go via the tunnel.

</summary>

One of the following:

"unidirectional"

<a href="#">Link to this property</a>

"bidirectional"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

enabled: optional boolean

Determines whether to run healthchecks for a tunnel.

<a href="#">Link to this property</a>

rate: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit%20%3E%20(model)%20health_check_rate%20%3E%20(schema)">HealthCheckRate</a>

How frequent the health check is run. The default value is <code>mid</code>.

<a href="#">Link to this property</a>

<details>

<summary>

target: optional object {effective, saved } or string

The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to <code>customer_gre_endpoint address</code>. This field is ignored for bidirectional healthchecks as the interface\_address (not assigned to the Cloudflare side of the tunnel) is used as the target. Must be in object form if the x-magic-new-hc-target header is set to true and string form if x-magic-new-hc-target is absent or set to false.

</summary>

One of the following:

<details>

<summary>

MagicHealthCheckTarget object {effective, saved }

The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to <code>customer_gre_endpoint address</code>. This field is ignored for bidirectional healthchecks as the interface\_address (not assigned to the Cloudflare side of the tunnel) is used as the target.

</summary>

effective: optional string

The effective health check target. If ‘saved’ is empty, then this field will be populated with the calculated default value on GET requests. Ignored in POST, PUT, and PATCH requests.

<a href="#">Link to this property</a>

saved: optional string

The saved health check target. Setting the value to the empty string indicates that the calculated default value will be used.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit%20%3E%20(model)%20health_check_type%20%3E%20(schema)">HealthCheckType</a>

The type of healthcheck to run, reply or request. The default value is <code>reply</code>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

interface\_address6: optional string

A 127 bit IPV6 prefix from within the virtual\_subnet6 prefix space with the address being the first IP of the subnet and not same as the address of virtual\_subnet6. Eg if virtual\_subnet6 is 2606:54c1:7:0:a9fe:12d2::/127 , interface\_address6 could be 2606:54c1:7:0:a9fe:12d2:1:200/127

<a href="#">Link to this property</a>

modified\_on: optional string

The date and time the tunnel was last modified.

formatdate-time

<a href="#">Link to this property</a>

mtu: optional number

Maximum Transmission Unit (MTU) in bytes for the GRE tunnel. The minimum value is 576.

<a href="#">Link to this property</a>

ttl: optional number

Time To Live (TTL) in number of hops of the GRE tunnel.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.gre_tunnels%20%3E%20(model)%20gre_tunnel_create_response%20%3E%20(schema)>)

<details>

<summary>

GRETunnelUpdateResponse object {modified, modified\_gre\_tunnel }

</summary>

modified: optional boolean

<a href="#">Link to this property</a>

<details>

<summary>

modified\_gre\_tunnel: optional object {id, cloudflare\_gre\_endpoint, customer\_gre\_endpoint, 12 more }

</summary>

id: string

Identifier

maxLength32

<a href="#">Link to this property</a>

cloudflare\_gre\_endpoint: string

The IP address assigned to the Cloudflare side of the GRE tunnel.

<a href="#">Link to this property</a>

customer\_gre\_endpoint: string

The IP address assigned to the customer side of the GRE tunnel.

<a href="#">Link to this property</a>

interface\_address: string

A 31-bit prefix (/31 in CIDR notation) supporting two hosts, one for each side of the tunnel. Select the subnet from the following private IP space: 10.0.0.0–10.255.255.255, 172.16.0.0–172.31.255.255, 192.168.0.0–192.168.255.255.

<a href="#">Link to this property</a>

name: string

The name of the tunnel. The name cannot contain spaces or special characters, must be 15 characters or less, and cannot share a name with another GRE tunnel.

<a href="#">Link to this property</a>

automatic\_return\_routing: optional boolean

True if automatic stateful return routing should be enabled for a tunnel, false otherwise. Requires the <code>coupler_integration</code> account flag to be enabled; requests setting this to <code>true</code> without that flag will be rejected.

<a href="#">Link to this property</a>

<details>

<summary>

bgp: optional object {customer\_asn, export\_filter\_id, extra\_prefixes, 2 more }

</summary>

customer\_asn: number

ASN used on the customer end of the BGP session

formatint32

minimum0

<a href="#">Link to this property</a>

export\_filter\_id: optional string

ID of the BGP filter profile applied to routes advertised to the customer.

<a href="#">Link to this property</a>

extra\_prefixes: optional array of string

Prefixes in this list will be advertised to the customer device, in addition to the routes in the Magic routing table.

<a href="#">Link to this property</a>

import\_filter\_id: optional string

ID of the BGP filter profile applied to routes received from the customer.

<a href="#">Link to this property</a>

md5\_key: optional string

MD5 key to use for session authentication.

Note that *this is not a security measure*. MD5 is not a valid security mechanism, and the key is not treated as a secret value. This is *only* supported for preventing misconfiguration, not for defending against malicious attacks.

The MD5 key, if set, must be of non-zero length and consist only of the following types of character:

- ASCII alphanumerics: <code>[a-zA-Z0-9]</code>
- Special characters in the set <code>'!@#$%^&amp;*()+[]{}&lt;&gt;/.,;:_-~</code>= |\`

In other words, MD5 keys may contain any printable ASCII character aside from newline (0x0A), quotation mark (<code>"</code>), vertical tab (0x0B), carriage return (0x0D), tab (0x09), form feed (0x0C), and the question mark (<code>?</code>). Requests specifying an MD5 key with one or more of these disallowed characters will be rejected.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

bgp\_status: optional object {state, tcp\_established, updated\_at, 5 more }

</summary>

<details>

<summary>

state: "BGP\_DOWN"or "BGP\_UP"or "BGP\_ESTABLISHING"

</summary>

One of the following:

"BGP\_DOWN"

<a href="#">Link to this property</a>

"BGP\_UP"

<a href="#">Link to this property</a>

"BGP\_ESTABLISHING"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

tcp\_established: boolean

<a href="#">Link to this property</a>

updated\_at: string

formatdate-time

<a href="#">Link to this property</a>

bgp\_state: optional string

<a href="#">Link to this property</a>

cf\_speaker\_ip: optional string

formatipv4

<a href="#">Link to this property</a>

cf\_speaker\_port: optional number

maximum65535

minimum1

<a href="#">Link to this property</a>

customer\_speaker\_ip: optional string

formatipv4

<a href="#">Link to this property</a>

customer\_speaker\_port: optional number

maximum65535

minimum1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_on: optional string

The date and time the tunnel was created.

formatdate-time

<a href="#">Link to this property</a>

description: optional string

An optional description of the GRE tunnel.

<a href="#">Link to this property</a>

<details>

<summary>

health\_check: optional object {direction, enabled, rate, 2 more }

</summary>

<details>

<summary>

direction: optional "unidirectional"or "bidirectional"

The direction of the flow of the healthcheck. Either unidirectional, where the probe comes to you via the tunnel and the result comes back to Cloudflare via the open Internet, or bidirectional where both the probe and result come and go via the tunnel.

</summary>

One of the following:

"unidirectional"

<a href="#">Link to this property</a>

"bidirectional"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

enabled: optional boolean

Determines whether to run healthchecks for a tunnel.

<a href="#">Link to this property</a>

rate: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit%20%3E%20(model)%20health_check_rate%20%3E%20(schema)">HealthCheckRate</a>

How frequent the health check is run. The default value is <code>mid</code>.

<a href="#">Link to this property</a>

<details>

<summary>

target: optional object {effective, saved } or string

The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to <code>customer_gre_endpoint address</code>. This field is ignored for bidirectional healthchecks as the interface\_address (not assigned to the Cloudflare side of the tunnel) is used as the target. Must be in object form if the x-magic-new-hc-target header is set to true and string form if x-magic-new-hc-target is absent or set to false.

</summary>

One of the following:

<details>

<summary>

MagicHealthCheckTarget object {effective, saved }

The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to <code>customer_gre_endpoint address</code>. This field is ignored for bidirectional healthchecks as the interface\_address (not assigned to the Cloudflare side of the tunnel) is used as the target.

</summary>

effective: optional string

The effective health check target. If ‘saved’ is empty, then this field will be populated with the calculated default value on GET requests. Ignored in POST, PUT, and PATCH requests.

<a href="#">Link to this property</a>

saved: optional string

The saved health check target. Setting the value to the empty string indicates that the calculated default value will be used.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit%20%3E%20(model)%20health_check_type%20%3E%20(schema)">HealthCheckType</a>

The type of healthcheck to run, reply or request. The default value is <code>reply</code>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

interface\_address6: optional string

A 127 bit IPV6 prefix from within the virtual\_subnet6 prefix space with the address being the first IP of the subnet and not same as the address of virtual\_subnet6. Eg if virtual\_subnet6 is 2606:54c1:7:0:a9fe:12d2::/127 , interface\_address6 could be 2606:54c1:7:0:a9fe:12d2:1:200/127

<a href="#">Link to this property</a>

modified\_on: optional string

The date and time the tunnel was last modified.

formatdate-time

<a href="#">Link to this property</a>

mtu: optional number

Maximum Transmission Unit (MTU) in bytes for the GRE tunnel. The minimum value is 576.

<a href="#">Link to this property</a>

ttl: optional number

Time To Live (TTL) in number of hops of the GRE tunnel.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.gre_tunnels%20%3E%20(model)%20gre_tunnel_update_response%20%3E%20(schema)>)

<details>

<summary>

GRETunnelDeleteResponse object {deleted, deleted\_gre\_tunnel }

</summary>

deleted: optional boolean

<a href="#">Link to this property</a>

<details>

<summary>

deleted\_gre\_tunnel: optional object {id, cloudflare\_gre\_endpoint, customer\_gre\_endpoint, 12 more }

</summary>

id: string

Identifier

maxLength32

<a href="#">Link to this property</a>

cloudflare\_gre\_endpoint: string

The IP address assigned to the Cloudflare side of the GRE tunnel.

<a href="#">Link to this property</a>

customer\_gre\_endpoint: string

The IP address assigned to the customer side of the GRE tunnel.

<a href="#">Link to this property</a>

interface\_address: string

A 31-bit prefix (/31 in CIDR notation) supporting two hosts, one for each side of the tunnel. Select the subnet from the following private IP space: 10.0.0.0–10.255.255.255, 172.16.0.0–172.31.255.255, 192.168.0.0–192.168.255.255.

<a href="#">Link to this property</a>

name: string

The name of the tunnel. The name cannot contain spaces or special characters, must be 15 characters or less, and cannot share a name with another GRE tunnel.

<a href="#">Link to this property</a>

automatic\_return\_routing: optional boolean

True if automatic stateful return routing should be enabled for a tunnel, false otherwise. Requires the <code>coupler_integration</code> account flag to be enabled; requests setting this to <code>true</code> without that flag will be rejected.

<a href="#">Link to this property</a>

<details>

<summary>

bgp: optional object {customer\_asn, export\_filter\_id, extra\_prefixes, 2 more }

</summary>

customer\_asn: number

ASN used on the customer end of the BGP session

formatint32

minimum0

<a href="#">Link to this property</a>

export\_filter\_id: optional string

ID of the BGP filter profile applied to routes advertised to the customer.

<a href="#">Link to this property</a>

extra\_prefixes: optional array of string

Prefixes in this list will be advertised to the customer device, in addition to the routes in the Magic routing table.

<a href="#">Link to this property</a>

import\_filter\_id: optional string

ID of the BGP filter profile applied to routes received from the customer.

<a href="#">Link to this property</a>

md5\_key: optional string

MD5 key to use for session authentication.

Note that *this is not a security measure*. MD5 is not a valid security mechanism, and the key is not treated as a secret value. This is *only* supported for preventing misconfiguration, not for defending against malicious attacks.

The MD5 key, if set, must be of non-zero length and consist only of the following types of character:

- ASCII alphanumerics: <code>[a-zA-Z0-9]</code>
- Special characters in the set <code>'!@#$%^&amp;*()+[]{}&lt;&gt;/.,;:_-~</code>= |\`

In other words, MD5 keys may contain any printable ASCII character aside from newline (0x0A), quotation mark (<code>"</code>), vertical tab (0x0B), carriage return (0x0D), tab (0x09), form feed (0x0C), and the question mark (<code>?</code>). Requests specifying an MD5 key with one or more of these disallowed characters will be rejected.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

bgp\_status: optional object {state, tcp\_established, updated\_at, 5 more }

</summary>

<details>

<summary>

state: "BGP\_DOWN"or "BGP\_UP"or "BGP\_ESTABLISHING"

</summary>

One of the following:

"BGP\_DOWN"

<a href="#">Link to this property</a>

"BGP\_UP"

<a href="#">Link to this property</a>

"BGP\_ESTABLISHING"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

tcp\_established: boolean

<a href="#">Link to this property</a>

updated\_at: string

formatdate-time

<a href="#">Link to this property</a>

bgp\_state: optional string

<a href="#">Link to this property</a>

cf\_speaker\_ip: optional string

formatipv4

<a href="#">Link to this property</a>

cf\_speaker\_port: optional number

maximum65535

minimum1

<a href="#">Link to this property</a>

customer\_speaker\_ip: optional string

formatipv4

<a href="#">Link to this property</a>

customer\_speaker\_port: optional number

maximum65535

minimum1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_on: optional string

The date and time the tunnel was created.

formatdate-time

<a href="#">Link to this property</a>

description: optional string

An optional description of the GRE tunnel.

<a href="#">Link to this property</a>

<details>

<summary>

health\_check: optional object {direction, enabled, rate, 2 more }

</summary>

<details>

<summary>

direction: optional "unidirectional"or "bidirectional"

The direction of the flow of the healthcheck. Either unidirectional, where the probe comes to you via the tunnel and the result comes back to Cloudflare via the open Internet, or bidirectional where both the probe and result come and go via the tunnel.

</summary>

One of the following:

"unidirectional"

<a href="#">Link to this property</a>

"bidirectional"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

enabled: optional boolean

Determines whether to run healthchecks for a tunnel.

<a href="#">Link to this property</a>

rate: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit%20%3E%20(model)%20health_check_rate%20%3E%20(schema)">HealthCheckRate</a>

How frequent the health check is run. The default value is <code>mid</code>.

<a href="#">Link to this property</a>

<details>

<summary>

target: optional object {effective, saved } or string

The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to <code>customer_gre_endpoint address</code>. This field is ignored for bidirectional healthchecks as the interface\_address (not assigned to the Cloudflare side of the tunnel) is used as the target. Must be in object form if the x-magic-new-hc-target header is set to true and string form if x-magic-new-hc-target is absent or set to false.

</summary>

One of the following:

<details>

<summary>

MagicHealthCheckTarget object {effective, saved }

The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to <code>customer_gre_endpoint address</code>. This field is ignored for bidirectional healthchecks as the interface\_address (not assigned to the Cloudflare side of the tunnel) is used as the target.

</summary>

effective: optional string

The effective health check target. If ‘saved’ is empty, then this field will be populated with the calculated default value on GET requests. Ignored in POST, PUT, and PATCH requests.

<a href="#">Link to this property</a>

saved: optional string

The saved health check target. Setting the value to the empty string indicates that the calculated default value will be used.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit%20%3E%20(model)%20health_check_type%20%3E%20(schema)">HealthCheckType</a>

The type of healthcheck to run, reply or request. The default value is <code>reply</code>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

interface\_address6: optional string

A 127 bit IPV6 prefix from within the virtual\_subnet6 prefix space with the address being the first IP of the subnet and not same as the address of virtual\_subnet6. Eg if virtual\_subnet6 is 2606:54c1:7:0:a9fe:12d2::/127 , interface\_address6 could be 2606:54c1:7:0:a9fe:12d2:1:200/127

<a href="#">Link to this property</a>

modified\_on: optional string

The date and time the tunnel was last modified.

formatdate-time

<a href="#">Link to this property</a>

mtu: optional number

Maximum Transmission Unit (MTU) in bytes for the GRE tunnel. The minimum value is 576.

<a href="#">Link to this property</a>

ttl: optional number

Time To Live (TTL) in number of hops of the GRE tunnel.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.gre_tunnels%20%3E%20(model)%20gre_tunnel_delete_response%20%3E%20(schema)>)

<details>

<summary>

GRETunnelBulkUpdateResponse object {modified, modified\_gre\_tunnels }

</summary>

modified: optional boolean

<a href="#">Link to this property</a>

<details>

<summary>

modified\_gre\_tunnels: optional array of object {id, cloudflare\_gre\_endpoint, customer\_gre\_endpoint, 12 more }

</summary>

id: string

Identifier

maxLength32

<a href="#">Link to this property</a>

cloudflare\_gre\_endpoint: string

The IP address assigned to the Cloudflare side of the GRE tunnel.

<a href="#">Link to this property</a>

customer\_gre\_endpoint: string

The IP address assigned to the customer side of the GRE tunnel.

<a href="#">Link to this property</a>

interface\_address: string

A 31-bit prefix (/31 in CIDR notation) supporting two hosts, one for each side of the tunnel. Select the subnet from the following private IP space: 10.0.0.0–10.255.255.255, 172.16.0.0–172.31.255.255, 192.168.0.0–192.168.255.255.

<a href="#">Link to this property</a>

name: string

The name of the tunnel. The name cannot contain spaces or special characters, must be 15 characters or less, and cannot share a name with another GRE tunnel.

<a href="#">Link to this property</a>

automatic\_return\_routing: optional boolean

True if automatic stateful return routing should be enabled for a tunnel, false otherwise. Requires the <code>coupler_integration</code> account flag to be enabled; requests setting this to <code>true</code> without that flag will be rejected.

<a href="#">Link to this property</a>

<details>

<summary>

bgp: optional object {customer\_asn, export\_filter\_id, extra\_prefixes, 2 more }

</summary>

customer\_asn: number

ASN used on the customer end of the BGP session

formatint32

minimum0

<a href="#">Link to this property</a>

export\_filter\_id: optional string

ID of the BGP filter profile applied to routes advertised to the customer.

<a href="#">Link to this property</a>

extra\_prefixes: optional array of string

Prefixes in this list will be advertised to the customer device, in addition to the routes in the Magic routing table.

<a href="#">Link to this property</a>

import\_filter\_id: optional string

ID of the BGP filter profile applied to routes received from the customer.

<a href="#">Link to this property</a>

md5\_key: optional string

MD5 key to use for session authentication.

Note that *this is not a security measure*. MD5 is not a valid security mechanism, and the key is not treated as a secret value. This is *only* supported for preventing misconfiguration, not for defending against malicious attacks.

The MD5 key, if set, must be of non-zero length and consist only of the following types of character:

- ASCII alphanumerics: <code>[a-zA-Z0-9]</code>
- Special characters in the set <code>'!@#$%^&amp;*()+[]{}&lt;&gt;/.,;:_-~</code>= |\`

In other words, MD5 keys may contain any printable ASCII character aside from newline (0x0A), quotation mark (<code>"</code>), vertical tab (0x0B), carriage return (0x0D), tab (0x09), form feed (0x0C), and the question mark (<code>?</code>). Requests specifying an MD5 key with one or more of these disallowed characters will be rejected.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

bgp\_status: optional object {state, tcp\_established, updated\_at, 5 more }

</summary>

<details>

<summary>

state: "BGP\_DOWN"or "BGP\_UP"or "BGP\_ESTABLISHING"

</summary>

One of the following:

"BGP\_DOWN"

<a href="#">Link to this property</a>

"BGP\_UP"

<a href="#">Link to this property</a>

"BGP\_ESTABLISHING"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

tcp\_established: boolean

<a href="#">Link to this property</a>

updated\_at: string

formatdate-time

<a href="#">Link to this property</a>

bgp\_state: optional string

<a href="#">Link to this property</a>

cf\_speaker\_ip: optional string

formatipv4

<a href="#">Link to this property</a>

cf\_speaker\_port: optional number

maximum65535

minimum1

<a href="#">Link to this property</a>

customer\_speaker\_ip: optional string

formatipv4

<a href="#">Link to this property</a>

customer\_speaker\_port: optional number

maximum65535

minimum1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_on: optional string

The date and time the tunnel was created.

formatdate-time

<a href="#">Link to this property</a>

description: optional string

An optional description of the GRE tunnel.

<a href="#">Link to this property</a>

<details>

<summary>

health\_check: optional object {direction, enabled, rate, 2 more }

</summary>

<details>

<summary>

direction: optional "unidirectional"or "bidirectional"

The direction of the flow of the healthcheck. Either unidirectional, where the probe comes to you via the tunnel and the result comes back to Cloudflare via the open Internet, or bidirectional where both the probe and result come and go via the tunnel.

</summary>

One of the following:

"unidirectional"

<a href="#">Link to this property</a>

"bidirectional"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

enabled: optional boolean

Determines whether to run healthchecks for a tunnel.

<a href="#">Link to this property</a>

rate: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit%20%3E%20(model)%20health_check_rate%20%3E%20(schema)">HealthCheckRate</a>

How frequent the health check is run. The default value is <code>mid</code>.

<a href="#">Link to this property</a>

<details>

<summary>

target: optional object {effective, saved } or string

The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to <code>customer_gre_endpoint address</code>. This field is ignored for bidirectional healthchecks as the interface\_address (not assigned to the Cloudflare side of the tunnel) is used as the target. Must be in object form if the x-magic-new-hc-target header is set to true and string form if x-magic-new-hc-target is absent or set to false.

</summary>

One of the following:

<details>

<summary>

MagicHealthCheckTarget object {effective, saved }

The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to <code>customer_gre_endpoint address</code>. This field is ignored for bidirectional healthchecks as the interface\_address (not assigned to the Cloudflare side of the tunnel) is used as the target.

</summary>

effective: optional string

The effective health check target. If ‘saved’ is empty, then this field will be populated with the calculated default value on GET requests. Ignored in POST, PUT, and PATCH requests.

<a href="#">Link to this property</a>

saved: optional string

The saved health check target. Setting the value to the empty string indicates that the calculated default value will be used.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit%20%3E%20(model)%20health_check_type%20%3E%20(schema)">HealthCheckType</a>

The type of healthcheck to run, reply or request. The default value is <code>reply</code>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

interface\_address6: optional string

A 127 bit IPV6 prefix from within the virtual\_subnet6 prefix space with the address being the first IP of the subnet and not same as the address of virtual\_subnet6. Eg if virtual\_subnet6 is 2606:54c1:7:0:a9fe:12d2::/127 , interface\_address6 could be 2606:54c1:7:0:a9fe:12d2:1:200/127

<a href="#">Link to this property</a>

modified\_on: optional string

The date and time the tunnel was last modified.

formatdate-time

<a href="#">Link to this property</a>

mtu: optional number

Maximum Transmission Unit (MTU) in bytes for the GRE tunnel. The minimum value is 576.

<a href="#">Link to this property</a>

ttl: optional number

Time To Live (TTL) in number of hops of the GRE tunnel.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.gre_tunnels%20%3E%20(model)%20gre_tunnel_bulk_update_response%20%3E%20(schema)>)

#### Magic TransitIPSEC Tunnels

##### [List IPsec tunnels](https://developers.cloudflare.com/api/resources/magic_transit/subresources/ipsec_tunnels/methods/list)

GET/accounts/{account\_id}/magic/ipsec\_tunnels

##### [List IPsec tunnel details](https://developers.cloudflare.com/api/resources/magic_transit/subresources/ipsec_tunnels/methods/get)

GET/accounts/{account\_id}/magic/ipsec\_tunnels/{ipsec\_tunnel\_id}

##### [Create an IPsec tunnel](https://developers.cloudflare.com/api/resources/magic_transit/subresources/ipsec_tunnels/methods/create)

POST/accounts/{account\_id}/magic/ipsec\_tunnels

##### [Update IPsec Tunnel](https://developers.cloudflare.com/api/resources/magic_transit/subresources/ipsec_tunnels/methods/update)

PUT/accounts/{account\_id}/magic/ipsec\_tunnels/{ipsec\_tunnel\_id}

##### [Delete IPsec Tunnel](https://developers.cloudflare.com/api/resources/magic_transit/subresources/ipsec_tunnels/methods/delete)

DELETE/accounts/{account\_id}/magic/ipsec\_tunnels/{ipsec\_tunnel\_id}

##### [Update multiple IPsec tunnels](https://developers.cloudflare.com/api/resources/magic_transit/subresources/ipsec_tunnels/methods/bulk_update)

PUT/accounts/{account\_id}/magic/ipsec\_tunnels

##### [Generate Pre-Shared Key (PSK) for IPsec tunnels](https://developers.cloudflare.com/api/resources/magic_transit/subresources/ipsec_tunnels/methods/psk_generate)

POST/accounts/{account\_id}/magic/ipsec\_tunnels/{ipsec\_tunnel\_id}/psk\_generate

##### [Set Pre-Shared Keys (PSK) for IPsec tunnels](https://developers.cloudflare.com/api/resources/magic_transit/subresources/ipsec_tunnels/methods/psk_set)

POST/accounts/{account\_id}/magic/ipsec\_tunnels/psk

##### ModelsExpand Collapse

<details>

<summary>

PSKMetadata object {last\_generated\_on }

The PSK metadata that includes when the PSK was generated.

</summary>

last\_generated\_on: optional string

The date and time the tunnel was last modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.ipsec_tunnels%20%3E%20(model)%20psk_metadata%20%3E%20(schema)>)

<details>

<summary>

IPSECTunnelListResponse object {ipsec\_tunnels }

</summary>

<details>

<summary>

ipsec\_tunnels: optional array of object {id, cloudflare\_endpoint, interface\_address, 14 more }

</summary>

id: string

Identifier

maxLength32

<a href="#">Link to this property</a>

cloudflare\_endpoint: string

The IP address assigned to the Cloudflare side of the IPsec tunnel.

<a href="#">Link to this property</a>

interface\_address: string

A 31-bit prefix (/31 in CIDR notation) supporting two hosts, one for each side of the tunnel. Select the subnet from the following private IP space: 10.0.0.0–10.255.255.255, 172.16.0.0–172.31.255.255, 192.168.0.0–192.168.255.255.

<a href="#">Link to this property</a>

name: string

The name of the IPsec tunnel. The name cannot share a name with other tunnels.

<a href="#">Link to this property</a>

allow\_null\_cipher: optional boolean

When <code>true</code>, the tunnel can use a null-cipher (<code>ENCR_NULL</code>) in the ESP tunnel (Phase 2).

<a href="#">Link to this property</a>

automatic\_return\_routing: optional boolean

True if automatic stateful return routing should be enabled for a tunnel, false otherwise. Requires the <code>coupler_integration</code> account flag to be enabled; requests setting this to <code>true</code> without that flag will be rejected.

<a href="#">Link to this property</a>

<details>

<summary>

bgp: optional object {customer\_asn, export\_filter\_id, extra\_prefixes, 2 more }

</summary>

customer\_asn: number

ASN used on the customer end of the BGP session

formatint32

minimum0

<a href="#">Link to this property</a>

export\_filter\_id: optional string

ID of the BGP filter profile applied to routes advertised to the customer.

<a href="#">Link to this property</a>

extra\_prefixes: optional array of string

Prefixes in this list will be advertised to the customer device, in addition to the routes in the Magic routing table.

<a href="#">Link to this property</a>

import\_filter\_id: optional string

ID of the BGP filter profile applied to routes received from the customer.

<a href="#">Link to this property</a>

md5\_key: optional string

MD5 key to use for session authentication.

Note that *this is not a security measure*. MD5 is not a valid security mechanism, and the key is not treated as a secret value. This is *only* supported for preventing misconfiguration, not for defending against malicious attacks.

The MD5 key, if set, must be of non-zero length and consist only of the following types of character:

- ASCII alphanumerics: <code>[a-zA-Z0-9]</code>
- Special characters in the set <code>'!@#$%^&amp;*()+[]{}&lt;&gt;/.,;:_-~</code>= |\`

In other words, MD5 keys may contain any printable ASCII character aside from newline (0x0A), quotation mark (<code>"</code>), vertical tab (0x0B), carriage return (0x0D), tab (0x09), form feed (0x0C), and the question mark (<code>?</code>). Requests specifying an MD5 key with one or more of these disallowed characters will be rejected.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

bgp\_status: optional object {state, tcp\_established, updated\_at, 5 more }

</summary>

<details>

<summary>

state: "BGP\_DOWN"or "BGP\_UP"or "BGP\_ESTABLISHING"

</summary>

One of the following:

"BGP\_DOWN"

<a href="#">Link to this property</a>

"BGP\_UP"

<a href="#">Link to this property</a>

"BGP\_ESTABLISHING"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

tcp\_established: boolean

<a href="#">Link to this property</a>

updated\_at: string

formatdate-time

<a href="#">Link to this property</a>

bgp\_state: optional string

<a href="#">Link to this property</a>

cf\_speaker\_ip: optional string

formatipv4

<a href="#">Link to this property</a>

cf\_speaker\_port: optional number

maximum65535

minimum1

<a href="#">Link to this property</a>

customer\_speaker\_ip: optional string

formatipv4

<a href="#">Link to this property</a>

customer\_speaker\_port: optional number

maximum65535

minimum1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_on: optional string

The date and time the tunnel was created.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

custom\_remote\_identities: optional object {fqdn\_id }

</summary>

fqdn\_id: optional string

A custom IKE ID of type FQDN that may be used to identity the IPsec tunnel. The generated IKE IDs can still be used even if this custom value is specified.

Must be of the form <code>&lt;custom label&gt;.&lt;account ID&gt;.custom.ipsec.cloudflare.com</code>.

This custom ID does not need to be unique. Two IPsec tunnels may have the same custom fqdn\_id. However, if another IPsec tunnel has the same value then the two tunnels cannot have the same cloudflare\_endpoint.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

customer\_endpoint: optional string

The IP address assigned to the customer side of the IPsec tunnel. Not required, but must be set for proactive traceroutes to work.

<a href="#">Link to this property</a>

description: optional string

An optional description forthe IPsec tunnel.

<a href="#">Link to this property</a>

<details>

<summary>

health\_check: optional object {direction, enabled, rate, 2 more }

</summary>

<details>

<summary>

direction: optional "unidirectional"or "bidirectional"

The direction of the flow of the healthcheck. Either unidirectional, where the probe comes to you via the tunnel and the result comes back to Cloudflare via the open Internet, or bidirectional where both the probe and result come and go via the tunnel.

</summary>

One of the following:

"unidirectional"

<a href="#">Link to this property</a>

"bidirectional"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

enabled: optional boolean

Determines whether to run healthchecks for a tunnel.

<a href="#">Link to this property</a>

rate: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit%20%3E%20(model)%20health_check_rate%20%3E%20(schema)">HealthCheckRate</a>

How frequent the health check is run. The default value is <code>mid</code>.

<a href="#">Link to this property</a>

<details>

<summary>

target: optional object {effective, saved } or string

The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to <code>customer_gre_endpoint address</code>. This field is ignored for bidirectional healthchecks as the interface\_address (not assigned to the Cloudflare side of the tunnel) is used as the target. Must be in object form if the x-magic-new-hc-target header is set to true and string form if x-magic-new-hc-target is absent or set to false.

</summary>

One of the following:

<details>

<summary>

MagicHealthCheckTarget object {effective, saved }

The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to <code>customer_gre_endpoint address</code>. This field is ignored for bidirectional healthchecks as the interface\_address (not assigned to the Cloudflare side of the tunnel) is used as the target.

</summary>

effective: optional string

The effective health check target. If ‘saved’ is empty, then this field will be populated with the calculated default value on GET requests. Ignored in POST, PUT, and PATCH requests.

<a href="#">Link to this property</a>

saved: optional string

The saved health check target. Setting the value to the empty string indicates that the calculated default value will be used.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit%20%3E%20(model)%20health_check_type%20%3E%20(schema)">HealthCheckType</a>

The type of healthcheck to run, reply or request. The default value is <code>reply</code>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

interface\_address6: optional string

A 127 bit IPV6 prefix from within the virtual\_subnet6 prefix space with the address being the first IP of the subnet and not same as the address of virtual\_subnet6. Eg if virtual\_subnet6 is 2606:54c1:7:0:a9fe:12d2::/127 , interface\_address6 could be 2606:54c1:7:0:a9fe:12d2:1:200/127

<a href="#">Link to this property</a>

modified\_on: optional string

The date and time the tunnel was last modified.

formatdate-time

<a href="#">Link to this property</a>

psk\_metadata: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.ipsec_tunnels%20%3E%20(model)%20psk_metadata%20%3E%20(schema)">PSKMetadata</a> { last\_generated\_on }

The PSK metadata that includes when the PSK was generated.

<a href="#">Link to this property</a>

replay\_protection: optional boolean

If <code>true</code>, then IPsec replay protection will be supported in the Cloudflare-to-customer direction.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.ipsec_tunnels%20%3E%20(model)%20ipsec_tunnel_list_response%20%3E%20(schema)>)

<details>

<summary>

IPSECTunnelGetResponse object {ipsec\_tunnel }

</summary>

<details>

<summary>

ipsec\_tunnel: optional object {id, cloudflare\_endpoint, interface\_address, 14 more }

</summary>

id: string

Identifier

maxLength32

<a href="#">Link to this property</a>

cloudflare\_endpoint: string

The IP address assigned to the Cloudflare side of the IPsec tunnel.

<a href="#">Link to this property</a>

interface\_address: string

A 31-bit prefix (/31 in CIDR notation) supporting two hosts, one for each side of the tunnel. Select the subnet from the following private IP space: 10.0.0.0–10.255.255.255, 172.16.0.0–172.31.255.255, 192.168.0.0–192.168.255.255.

<a href="#">Link to this property</a>

name: string

The name of the IPsec tunnel. The name cannot share a name with other tunnels.

<a href="#">Link to this property</a>

allow\_null\_cipher: optional boolean

When <code>true</code>, the tunnel can use a null-cipher (<code>ENCR_NULL</code>) in the ESP tunnel (Phase 2).

<a href="#">Link to this property</a>

automatic\_return\_routing: optional boolean

True if automatic stateful return routing should be enabled for a tunnel, false otherwise. Requires the <code>coupler_integration</code> account flag to be enabled; requests setting this to <code>true</code> without that flag will be rejected.

<a href="#">Link to this property</a>

<details>

<summary>

bgp: optional object {customer\_asn, export\_filter\_id, extra\_prefixes, 2 more }

</summary>

customer\_asn: number

ASN used on the customer end of the BGP session

formatint32

minimum0

<a href="#">Link to this property</a>

export\_filter\_id: optional string

ID of the BGP filter profile applied to routes advertised to the customer.

<a href="#">Link to this property</a>

extra\_prefixes: optional array of string

Prefixes in this list will be advertised to the customer device, in addition to the routes in the Magic routing table.

<a href="#">Link to this property</a>

import\_filter\_id: optional string

ID of the BGP filter profile applied to routes received from the customer.

<a href="#">Link to this property</a>

md5\_key: optional string

MD5 key to use for session authentication.

Note that *this is not a security measure*. MD5 is not a valid security mechanism, and the key is not treated as a secret value. This is *only* supported for preventing misconfiguration, not for defending against malicious attacks.

The MD5 key, if set, must be of non-zero length and consist only of the following types of character:

- ASCII alphanumerics: <code>[a-zA-Z0-9]</code>
- Special characters in the set <code>'!@#$%^&amp;*()+[]{}&lt;&gt;/.,;:_-~</code>= |\`

In other words, MD5 keys may contain any printable ASCII character aside from newline (0x0A), quotation mark (<code>"</code>), vertical tab (0x0B), carriage return (0x0D), tab (0x09), form feed (0x0C), and the question mark (<code>?</code>). Requests specifying an MD5 key with one or more of these disallowed characters will be rejected.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

bgp\_status: optional object {state, tcp\_established, updated\_at, 5 more }

</summary>

<details>

<summary>

state: "BGP\_DOWN"or "BGP\_UP"or "BGP\_ESTABLISHING"

</summary>

One of the following:

"BGP\_DOWN"

<a href="#">Link to this property</a>

"BGP\_UP"

<a href="#">Link to this property</a>

"BGP\_ESTABLISHING"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

tcp\_established: boolean

<a href="#">Link to this property</a>

updated\_at: string

formatdate-time

<a href="#">Link to this property</a>

bgp\_state: optional string

<a href="#">Link to this property</a>

cf\_speaker\_ip: optional string

formatipv4

<a href="#">Link to this property</a>

cf\_speaker\_port: optional number

maximum65535

minimum1

<a href="#">Link to this property</a>

customer\_speaker\_ip: optional string

formatipv4

<a href="#">Link to this property</a>

customer\_speaker\_port: optional number

maximum65535

minimum1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_on: optional string

The date and time the tunnel was created.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

custom\_remote\_identities: optional object {fqdn\_id }

</summary>

fqdn\_id: optional string

A custom IKE ID of type FQDN that may be used to identity the IPsec tunnel. The generated IKE IDs can still be used even if this custom value is specified.

Must be of the form <code>&lt;custom label&gt;.&lt;account ID&gt;.custom.ipsec.cloudflare.com</code>.

This custom ID does not need to be unique. Two IPsec tunnels may have the same custom fqdn\_id. However, if another IPsec tunnel has the same value then the two tunnels cannot have the same cloudflare\_endpoint.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

customer\_endpoint: optional string

The IP address assigned to the customer side of the IPsec tunnel. Not required, but must be set for proactive traceroutes to work.

<a href="#">Link to this property</a>

description: optional string

An optional description forthe IPsec tunnel.

<a href="#">Link to this property</a>

<details>

<summary>

health\_check: optional object {direction, enabled, rate, 2 more }

</summary>

<details>

<summary>

direction: optional "unidirectional"or "bidirectional"

The direction of the flow of the healthcheck. Either unidirectional, where the probe comes to you via the tunnel and the result comes back to Cloudflare via the open Internet, or bidirectional where both the probe and result come and go via the tunnel.

</summary>

One of the following:

"unidirectional"

<a href="#">Link to this property</a>

"bidirectional"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

enabled: optional boolean

Determines whether to run healthchecks for a tunnel.

<a href="#">Link to this property</a>

rate: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit%20%3E%20(model)%20health_check_rate%20%3E%20(schema)">HealthCheckRate</a>

How frequent the health check is run. The default value is <code>mid</code>.

<a href="#">Link to this property</a>

<details>

<summary>

target: optional object {effective, saved } or string

The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to <code>customer_gre_endpoint address</code>. This field is ignored for bidirectional healthchecks as the interface\_address (not assigned to the Cloudflare side of the tunnel) is used as the target. Must be in object form if the x-magic-new-hc-target header is set to true and string form if x-magic-new-hc-target is absent or set to false.

</summary>

One of the following:

<details>

<summary>

MagicHealthCheckTarget object {effective, saved }

The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to <code>customer_gre_endpoint address</code>. This field is ignored for bidirectional healthchecks as the interface\_address (not assigned to the Cloudflare side of the tunnel) is used as the target.

</summary>

effective: optional string

The effective health check target. If ‘saved’ is empty, then this field will be populated with the calculated default value on GET requests. Ignored in POST, PUT, and PATCH requests.

<a href="#">Link to this property</a>

saved: optional string

The saved health check target. Setting the value to the empty string indicates that the calculated default value will be used.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit%20%3E%20(model)%20health_check_type%20%3E%20(schema)">HealthCheckType</a>

The type of healthcheck to run, reply or request. The default value is <code>reply</code>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

interface\_address6: optional string

A 127 bit IPV6 prefix from within the virtual\_subnet6 prefix space with the address being the first IP of the subnet and not same as the address of virtual\_subnet6. Eg if virtual\_subnet6 is 2606:54c1:7:0:a9fe:12d2::/127 , interface\_address6 could be 2606:54c1:7:0:a9fe:12d2:1:200/127

<a href="#">Link to this property</a>

modified\_on: optional string

The date and time the tunnel was last modified.

formatdate-time

<a href="#">Link to this property</a>

psk\_metadata: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.ipsec_tunnels%20%3E%20(model)%20psk_metadata%20%3E%20(schema)">PSKMetadata</a> { last\_generated\_on }

The PSK metadata that includes when the PSK was generated.

<a href="#">Link to this property</a>

replay\_protection: optional boolean

If <code>true</code>, then IPsec replay protection will be supported in the Cloudflare-to-customer direction.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.ipsec_tunnels%20%3E%20(model)%20ipsec_tunnel_get_response%20%3E%20(schema)>)

<details>

<summary>

IPSECTunnelCreateResponse object {id, cloudflare\_endpoint, interface\_address, 14 more }

</summary>

id: string

Identifier

maxLength32

<a href="#">Link to this property</a>

cloudflare\_endpoint: string

The IP address assigned to the Cloudflare side of the IPsec tunnel.

<a href="#">Link to this property</a>

interface\_address: string

A 31-bit prefix (/31 in CIDR notation) supporting two hosts, one for each side of the tunnel. Select the subnet from the following private IP space: 10.0.0.0–10.255.255.255, 172.16.0.0–172.31.255.255, 192.168.0.0–192.168.255.255.

<a href="#">Link to this property</a>

name: string

The name of the IPsec tunnel. The name cannot share a name with other tunnels.

<a href="#">Link to this property</a>

allow\_null\_cipher: optional boolean

When <code>true</code>, the tunnel can use a null-cipher (<code>ENCR_NULL</code>) in the ESP tunnel (Phase 2).

<a href="#">Link to this property</a>

automatic\_return\_routing: optional boolean

True if automatic stateful return routing should be enabled for a tunnel, false otherwise. Requires the <code>coupler_integration</code> account flag to be enabled; requests setting this to <code>true</code> without that flag will be rejected.

<a href="#">Link to this property</a>

<details>

<summary>

bgp: optional object {customer\_asn, export\_filter\_id, extra\_prefixes, 2 more }

</summary>

customer\_asn: number

ASN used on the customer end of the BGP session

formatint32

minimum0

<a href="#">Link to this property</a>

export\_filter\_id: optional string

ID of the BGP filter profile applied to routes advertised to the customer.

<a href="#">Link to this property</a>

extra\_prefixes: optional array of string

Prefixes in this list will be advertised to the customer device, in addition to the routes in the Magic routing table.

<a href="#">Link to this property</a>

import\_filter\_id: optional string

ID of the BGP filter profile applied to routes received from the customer.

<a href="#">Link to this property</a>

md5\_key: optional string

MD5 key to use for session authentication.

Note that *this is not a security measure*. MD5 is not a valid security mechanism, and the key is not treated as a secret value. This is *only* supported for preventing misconfiguration, not for defending against malicious attacks.

The MD5 key, if set, must be of non-zero length and consist only of the following types of character:

- ASCII alphanumerics: <code>[a-zA-Z0-9]</code>
- Special characters in the set <code>'!@#$%^&amp;*()+[]{}&lt;&gt;/.,;:_-~</code>= |\`

In other words, MD5 keys may contain any printable ASCII character aside from newline (0x0A), quotation mark (<code>"</code>), vertical tab (0x0B), carriage return (0x0D), tab (0x09), form feed (0x0C), and the question mark (<code>?</code>). Requests specifying an MD5 key with one or more of these disallowed characters will be rejected.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

bgp\_status: optional object {state, tcp\_established, updated\_at, 5 more }

</summary>

<details>

<summary>

state: "BGP\_DOWN"or "BGP\_UP"or "BGP\_ESTABLISHING"

</summary>

One of the following:

"BGP\_DOWN"

<a href="#">Link to this property</a>

"BGP\_UP"

<a href="#">Link to this property</a>

"BGP\_ESTABLISHING"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

tcp\_established: boolean

<a href="#">Link to this property</a>

updated\_at: string

formatdate-time

<a href="#">Link to this property</a>

bgp\_state: optional string

<a href="#">Link to this property</a>

cf\_speaker\_ip: optional string

formatipv4

<a href="#">Link to this property</a>

cf\_speaker\_port: optional number

maximum65535

minimum1

<a href="#">Link to this property</a>

customer\_speaker\_ip: optional string

formatipv4

<a href="#">Link to this property</a>

customer\_speaker\_port: optional number

maximum65535

minimum1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_on: optional string

The date and time the tunnel was created.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

custom\_remote\_identities: optional object {fqdn\_id }

</summary>

fqdn\_id: optional string

A custom IKE ID of type FQDN that may be used to identity the IPsec tunnel. The generated IKE IDs can still be used even if this custom value is specified.

Must be of the form <code>&lt;custom label&gt;.&lt;account ID&gt;.custom.ipsec.cloudflare.com</code>.

This custom ID does not need to be unique. Two IPsec tunnels may have the same custom fqdn\_id. However, if another IPsec tunnel has the same value then the two tunnels cannot have the same cloudflare\_endpoint.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

customer\_endpoint: optional string

The IP address assigned to the customer side of the IPsec tunnel. Not required, but must be set for proactive traceroutes to work.

<a href="#">Link to this property</a>

description: optional string

An optional description forthe IPsec tunnel.

<a href="#">Link to this property</a>

<details>

<summary>

health\_check: optional object {direction, enabled, rate, 2 more }

</summary>

<details>

<summary>

direction: optional "unidirectional"or "bidirectional"

The direction of the flow of the healthcheck. Either unidirectional, where the probe comes to you via the tunnel and the result comes back to Cloudflare via the open Internet, or bidirectional where both the probe and result come and go via the tunnel.

</summary>

One of the following:

"unidirectional"

<a href="#">Link to this property</a>

"bidirectional"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

enabled: optional boolean

Determines whether to run healthchecks for a tunnel.

<a href="#">Link to this property</a>

rate: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit%20%3E%20(model)%20health_check_rate%20%3E%20(schema)">HealthCheckRate</a>

How frequent the health check is run. The default value is <code>mid</code>.

<a href="#">Link to this property</a>

<details>

<summary>

target: optional object {effective, saved } or string

The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to <code>customer_gre_endpoint address</code>. This field is ignored for bidirectional healthchecks as the interface\_address (not assigned to the Cloudflare side of the tunnel) is used as the target. Must be in object form if the x-magic-new-hc-target header is set to true and string form if x-magic-new-hc-target is absent or set to false.

</summary>

One of the following:

<details>

<summary>

MagicHealthCheckTarget object {effective, saved }

The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to <code>customer_gre_endpoint address</code>. This field is ignored for bidirectional healthchecks as the interface\_address (not assigned to the Cloudflare side of the tunnel) is used as the target.

</summary>

effective: optional string

The effective health check target. If ‘saved’ is empty, then this field will be populated with the calculated default value on GET requests. Ignored in POST, PUT, and PATCH requests.

<a href="#">Link to this property</a>

saved: optional string

The saved health check target. Setting the value to the empty string indicates that the calculated default value will be used.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit%20%3E%20(model)%20health_check_type%20%3E%20(schema)">HealthCheckType</a>

The type of healthcheck to run, reply or request. The default value is <code>reply</code>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

interface\_address6: optional string

A 127 bit IPV6 prefix from within the virtual\_subnet6 prefix space with the address being the first IP of the subnet and not same as the address of virtual\_subnet6. Eg if virtual\_subnet6 is 2606:54c1:7:0:a9fe:12d2::/127 , interface\_address6 could be 2606:54c1:7:0:a9fe:12d2:1:200/127

<a href="#">Link to this property</a>

modified\_on: optional string

The date and time the tunnel was last modified.

formatdate-time

<a href="#">Link to this property</a>

psk\_metadata: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.ipsec_tunnels%20%3E%20(model)%20psk_metadata%20%3E%20(schema)">PSKMetadata</a> { last\_generated\_on }

The PSK metadata that includes when the PSK was generated.

<a href="#">Link to this property</a>

replay\_protection: optional boolean

If <code>true</code>, then IPsec replay protection will be supported in the Cloudflare-to-customer direction.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.ipsec_tunnels%20%3E%20(model)%20ipsec_tunnel_create_response%20%3E%20(schema)>)

<details>

<summary>

IPSECTunnelUpdateResponse object {modified, modified\_ipsec\_tunnel }

</summary>

modified: optional boolean

<a href="#">Link to this property</a>

<details>

<summary>

modified\_ipsec\_tunnel: optional object {id, cloudflare\_endpoint, interface\_address, 14 more }

</summary>

id: string

Identifier

maxLength32

<a href="#">Link to this property</a>

cloudflare\_endpoint: string

The IP address assigned to the Cloudflare side of the IPsec tunnel.

<a href="#">Link to this property</a>

interface\_address: string

A 31-bit prefix (/31 in CIDR notation) supporting two hosts, one for each side of the tunnel. Select the subnet from the following private IP space: 10.0.0.0–10.255.255.255, 172.16.0.0–172.31.255.255, 192.168.0.0–192.168.255.255.

<a href="#">Link to this property</a>

name: string

The name of the IPsec tunnel. The name cannot share a name with other tunnels.

<a href="#">Link to this property</a>

allow\_null\_cipher: optional boolean

When <code>true</code>, the tunnel can use a null-cipher (<code>ENCR_NULL</code>) in the ESP tunnel (Phase 2).

<a href="#">Link to this property</a>

automatic\_return\_routing: optional boolean

True if automatic stateful return routing should be enabled for a tunnel, false otherwise. Requires the <code>coupler_integration</code> account flag to be enabled; requests setting this to <code>true</code> without that flag will be rejected.

<a href="#">Link to this property</a>

<details>

<summary>

bgp: optional object {customer\_asn, export\_filter\_id, extra\_prefixes, 2 more }

</summary>

customer\_asn: number

ASN used on the customer end of the BGP session

formatint32

minimum0

<a href="#">Link to this property</a>

export\_filter\_id: optional string

ID of the BGP filter profile applied to routes advertised to the customer.

<a href="#">Link to this property</a>

extra\_prefixes: optional array of string

Prefixes in this list will be advertised to the customer device, in addition to the routes in the Magic routing table.

<a href="#">Link to this property</a>

import\_filter\_id: optional string

ID of the BGP filter profile applied to routes received from the customer.

<a href="#">Link to this property</a>

md5\_key: optional string

MD5 key to use for session authentication.

Note that *this is not a security measure*. MD5 is not a valid security mechanism, and the key is not treated as a secret value. This is *only* supported for preventing misconfiguration, not for defending against malicious attacks.

The MD5 key, if set, must be of non-zero length and consist only of the following types of character:

- ASCII alphanumerics: <code>[a-zA-Z0-9]</code>
- Special characters in the set <code>'!@#$%^&amp;*()+[]{}&lt;&gt;/.,;:_-~</code>= |\`

In other words, MD5 keys may contain any printable ASCII character aside from newline (0x0A), quotation mark (<code>"</code>), vertical tab (0x0B), carriage return (0x0D), tab (0x09), form feed (0x0C), and the question mark (<code>?</code>). Requests specifying an MD5 key with one or more of these disallowed characters will be rejected.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

bgp\_status: optional object {state, tcp\_established, updated\_at, 5 more }

</summary>

<details>

<summary>

state: "BGP\_DOWN"or "BGP\_UP"or "BGP\_ESTABLISHING"

</summary>

One of the following:

"BGP\_DOWN"

<a href="#">Link to this property</a>

"BGP\_UP"

<a href="#">Link to this property</a>

"BGP\_ESTABLISHING"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

tcp\_established: boolean

<a href="#">Link to this property</a>

updated\_at: string

formatdate-time

<a href="#">Link to this property</a>

bgp\_state: optional string

<a href="#">Link to this property</a>

cf\_speaker\_ip: optional string

formatipv4

<a href="#">Link to this property</a>

cf\_speaker\_port: optional number

maximum65535

minimum1

<a href="#">Link to this property</a>

customer\_speaker\_ip: optional string

formatipv4

<a href="#">Link to this property</a>

customer\_speaker\_port: optional number

maximum65535

minimum1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_on: optional string

The date and time the tunnel was created.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

custom\_remote\_identities: optional object {fqdn\_id }

</summary>

fqdn\_id: optional string

A custom IKE ID of type FQDN that may be used to identity the IPsec tunnel. The generated IKE IDs can still be used even if this custom value is specified.

Must be of the form <code>&lt;custom label&gt;.&lt;account ID&gt;.custom.ipsec.cloudflare.com</code>.

This custom ID does not need to be unique. Two IPsec tunnels may have the same custom fqdn\_id. However, if another IPsec tunnel has the same value then the two tunnels cannot have the same cloudflare\_endpoint.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

customer\_endpoint: optional string

The IP address assigned to the customer side of the IPsec tunnel. Not required, but must be set for proactive traceroutes to work.

<a href="#">Link to this property</a>

description: optional string

An optional description forthe IPsec tunnel.

<a href="#">Link to this property</a>

<details>

<summary>

health\_check: optional object {direction, enabled, rate, 2 more }

</summary>

<details>

<summary>

direction: optional "unidirectional"or "bidirectional"

The direction of the flow of the healthcheck. Either unidirectional, where the probe comes to you via the tunnel and the result comes back to Cloudflare via the open Internet, or bidirectional where both the probe and result come and go via the tunnel.

</summary>

One of the following:

"unidirectional"

<a href="#">Link to this property</a>

"bidirectional"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

enabled: optional boolean

Determines whether to run healthchecks for a tunnel.

<a href="#">Link to this property</a>

rate: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit%20%3E%20(model)%20health_check_rate%20%3E%20(schema)">HealthCheckRate</a>

How frequent the health check is run. The default value is <code>mid</code>.

<a href="#">Link to this property</a>

<details>

<summary>

target: optional object {effective, saved } or string

The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to <code>customer_gre_endpoint address</code>. This field is ignored for bidirectional healthchecks as the interface\_address (not assigned to the Cloudflare side of the tunnel) is used as the target. Must be in object form if the x-magic-new-hc-target header is set to true and string form if x-magic-new-hc-target is absent or set to false.

</summary>

One of the following:

<details>

<summary>

MagicHealthCheckTarget object {effective, saved }

The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to <code>customer_gre_endpoint address</code>. This field is ignored for bidirectional healthchecks as the interface\_address (not assigned to the Cloudflare side of the tunnel) is used as the target.

</summary>

effective: optional string

The effective health check target. If ‘saved’ is empty, then this field will be populated with the calculated default value on GET requests. Ignored in POST, PUT, and PATCH requests.

<a href="#">Link to this property</a>

saved: optional string

The saved health check target. Setting the value to the empty string indicates that the calculated default value will be used.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit%20%3E%20(model)%20health_check_type%20%3E%20(schema)">HealthCheckType</a>

The type of healthcheck to run, reply or request. The default value is <code>reply</code>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

interface\_address6: optional string

A 127 bit IPV6 prefix from within the virtual\_subnet6 prefix space with the address being the first IP of the subnet and not same as the address of virtual\_subnet6. Eg if virtual\_subnet6 is 2606:54c1:7:0:a9fe:12d2::/127 , interface\_address6 could be 2606:54c1:7:0:a9fe:12d2:1:200/127

<a href="#">Link to this property</a>

modified\_on: optional string

The date and time the tunnel was last modified.

formatdate-time

<a href="#">Link to this property</a>

psk\_metadata: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.ipsec_tunnels%20%3E%20(model)%20psk_metadata%20%3E%20(schema)">PSKMetadata</a> { last\_generated\_on }

The PSK metadata that includes when the PSK was generated.

<a href="#">Link to this property</a>

replay\_protection: optional boolean

If <code>true</code>, then IPsec replay protection will be supported in the Cloudflare-to-customer direction.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.ipsec_tunnels%20%3E%20(model)%20ipsec_tunnel_update_response%20%3E%20(schema)>)

<details>

<summary>

IPSECTunnelDeleteResponse object {deleted, deleted\_ipsec\_tunnel }

</summary>

deleted: optional boolean

<a href="#">Link to this property</a>

<details>

<summary>

deleted\_ipsec\_tunnel: optional object {id, cloudflare\_endpoint, interface\_address, 14 more }

</summary>

id: string

Identifier

maxLength32

<a href="#">Link to this property</a>

cloudflare\_endpoint: string

The IP address assigned to the Cloudflare side of the IPsec tunnel.

<a href="#">Link to this property</a>

interface\_address: string

A 31-bit prefix (/31 in CIDR notation) supporting two hosts, one for each side of the tunnel. Select the subnet from the following private IP space: 10.0.0.0–10.255.255.255, 172.16.0.0–172.31.255.255, 192.168.0.0–192.168.255.255.

<a href="#">Link to this property</a>

name: string

The name of the IPsec tunnel. The name cannot share a name with other tunnels.

<a href="#">Link to this property</a>

allow\_null\_cipher: optional boolean

When <code>true</code>, the tunnel can use a null-cipher (<code>ENCR_NULL</code>) in the ESP tunnel (Phase 2).

<a href="#">Link to this property</a>

automatic\_return\_routing: optional boolean

True if automatic stateful return routing should be enabled for a tunnel, false otherwise. Requires the <code>coupler_integration</code> account flag to be enabled; requests setting this to <code>true</code> without that flag will be rejected.

<a href="#">Link to this property</a>

<details>

<summary>

bgp: optional object {customer\_asn, export\_filter\_id, extra\_prefixes, 2 more }

</summary>

customer\_asn: number

ASN used on the customer end of the BGP session

formatint32

minimum0

<a href="#">Link to this property</a>

export\_filter\_id: optional string

ID of the BGP filter profile applied to routes advertised to the customer.

<a href="#">Link to this property</a>

extra\_prefixes: optional array of string

Prefixes in this list will be advertised to the customer device, in addition to the routes in the Magic routing table.

<a href="#">Link to this property</a>

import\_filter\_id: optional string

ID of the BGP filter profile applied to routes received from the customer.

<a href="#">Link to this property</a>

md5\_key: optional string

MD5 key to use for session authentication.

Note that *this is not a security measure*. MD5 is not a valid security mechanism, and the key is not treated as a secret value. This is *only* supported for preventing misconfiguration, not for defending against malicious attacks.

The MD5 key, if set, must be of non-zero length and consist only of the following types of character:

- ASCII alphanumerics: <code>[a-zA-Z0-9]</code>
- Special characters in the set <code>'!@#$%^&amp;*()+[]{}&lt;&gt;/.,;:_-~</code>= |\`

In other words, MD5 keys may contain any printable ASCII character aside from newline (0x0A), quotation mark (<code>"</code>), vertical tab (0x0B), carriage return (0x0D), tab (0x09), form feed (0x0C), and the question mark (<code>?</code>). Requests specifying an MD5 key with one or more of these disallowed characters will be rejected.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

bgp\_status: optional object {state, tcp\_established, updated\_at, 5 more }

</summary>

<details>

<summary>

state: "BGP\_DOWN"or "BGP\_UP"or "BGP\_ESTABLISHING"

</summary>

One of the following:

"BGP\_DOWN"

<a href="#">Link to this property</a>

"BGP\_UP"

<a href="#">Link to this property</a>

"BGP\_ESTABLISHING"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

tcp\_established: boolean

<a href="#">Link to this property</a>

updated\_at: string

formatdate-time

<a href="#">Link to this property</a>

bgp\_state: optional string

<a href="#">Link to this property</a>

cf\_speaker\_ip: optional string

formatipv4

<a href="#">Link to this property</a>

cf\_speaker\_port: optional number

maximum65535

minimum1

<a href="#">Link to this property</a>

customer\_speaker\_ip: optional string

formatipv4

<a href="#">Link to this property</a>

customer\_speaker\_port: optional number

maximum65535

minimum1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_on: optional string

The date and time the tunnel was created.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

custom\_remote\_identities: optional object {fqdn\_id }

</summary>

fqdn\_id: optional string

A custom IKE ID of type FQDN that may be used to identity the IPsec tunnel. The generated IKE IDs can still be used even if this custom value is specified.

Must be of the form <code>&lt;custom label&gt;.&lt;account ID&gt;.custom.ipsec.cloudflare.com</code>.

This custom ID does not need to be unique. Two IPsec tunnels may have the same custom fqdn\_id. However, if another IPsec tunnel has the same value then the two tunnels cannot have the same cloudflare\_endpoint.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

customer\_endpoint: optional string

The IP address assigned to the customer side of the IPsec tunnel. Not required, but must be set for proactive traceroutes to work.

<a href="#">Link to this property</a>

description: optional string

An optional description forthe IPsec tunnel.

<a href="#">Link to this property</a>

<details>

<summary>

health\_check: optional object {direction, enabled, rate, 2 more }

</summary>

<details>

<summary>

direction: optional "unidirectional"or "bidirectional"

The direction of the flow of the healthcheck. Either unidirectional, where the probe comes to you via the tunnel and the result comes back to Cloudflare via the open Internet, or bidirectional where both the probe and result come and go via the tunnel.

</summary>

One of the following:

"unidirectional"

<a href="#">Link to this property</a>

"bidirectional"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

enabled: optional boolean

Determines whether to run healthchecks for a tunnel.

<a href="#">Link to this property</a>

rate: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit%20%3E%20(model)%20health_check_rate%20%3E%20(schema)">HealthCheckRate</a>

How frequent the health check is run. The default value is <code>mid</code>.

<a href="#">Link to this property</a>

<details>

<summary>

target: optional object {effective, saved } or string

The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to <code>customer_gre_endpoint address</code>. This field is ignored for bidirectional healthchecks as the interface\_address (not assigned to the Cloudflare side of the tunnel) is used as the target. Must be in object form if the x-magic-new-hc-target header is set to true and string form if x-magic-new-hc-target is absent or set to false.

</summary>

One of the following:

<details>

<summary>

MagicHealthCheckTarget object {effective, saved }

The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to <code>customer_gre_endpoint address</code>. This field is ignored for bidirectional healthchecks as the interface\_address (not assigned to the Cloudflare side of the tunnel) is used as the target.

</summary>

effective: optional string

The effective health check target. If ‘saved’ is empty, then this field will be populated with the calculated default value on GET requests. Ignored in POST, PUT, and PATCH requests.

<a href="#">Link to this property</a>

saved: optional string

The saved health check target. Setting the value to the empty string indicates that the calculated default value will be used.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit%20%3E%20(model)%20health_check_type%20%3E%20(schema)">HealthCheckType</a>

The type of healthcheck to run, reply or request. The default value is <code>reply</code>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

interface\_address6: optional string

A 127 bit IPV6 prefix from within the virtual\_subnet6 prefix space with the address being the first IP of the subnet and not same as the address of virtual\_subnet6. Eg if virtual\_subnet6 is 2606:54c1:7:0:a9fe:12d2::/127 , interface\_address6 could be 2606:54c1:7:0:a9fe:12d2:1:200/127

<a href="#">Link to this property</a>

modified\_on: optional string

The date and time the tunnel was last modified.

formatdate-time

<a href="#">Link to this property</a>

psk\_metadata: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.ipsec_tunnels%20%3E%20(model)%20psk_metadata%20%3E%20(schema)">PSKMetadata</a> { last\_generated\_on }

The PSK metadata that includes when the PSK was generated.

<a href="#">Link to this property</a>

replay\_protection: optional boolean

If <code>true</code>, then IPsec replay protection will be supported in the Cloudflare-to-customer direction.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.ipsec_tunnels%20%3E%20(model)%20ipsec_tunnel_delete_response%20%3E%20(schema)>)

<details>

<summary>

IPSECTunnelBulkUpdateResponse object {modified, modified\_ipsec\_tunnels }

</summary>

modified: optional boolean

<a href="#">Link to this property</a>

<details>

<summary>

modified\_ipsec\_tunnels: optional array of object {id, cloudflare\_endpoint, interface\_address, 14 more }

</summary>

id: string

Identifier

maxLength32

<a href="#">Link to this property</a>

cloudflare\_endpoint: string

The IP address assigned to the Cloudflare side of the IPsec tunnel.

<a href="#">Link to this property</a>

interface\_address: string

A 31-bit prefix (/31 in CIDR notation) supporting two hosts, one for each side of the tunnel. Select the subnet from the following private IP space: 10.0.0.0–10.255.255.255, 172.16.0.0–172.31.255.255, 192.168.0.0–192.168.255.255.

<a href="#">Link to this property</a>

name: string

The name of the IPsec tunnel. The name cannot share a name with other tunnels.

<a href="#">Link to this property</a>

allow\_null\_cipher: optional boolean

When <code>true</code>, the tunnel can use a null-cipher (<code>ENCR_NULL</code>) in the ESP tunnel (Phase 2).

<a href="#">Link to this property</a>

automatic\_return\_routing: optional boolean

True if automatic stateful return routing should be enabled for a tunnel, false otherwise. Requires the <code>coupler_integration</code> account flag to be enabled; requests setting this to <code>true</code> without that flag will be rejected.

<a href="#">Link to this property</a>

<details>

<summary>

bgp: optional object {customer\_asn, export\_filter\_id, extra\_prefixes, 2 more }

</summary>

customer\_asn: number

ASN used on the customer end of the BGP session

formatint32

minimum0

<a href="#">Link to this property</a>

export\_filter\_id: optional string

ID of the BGP filter profile applied to routes advertised to the customer.

<a href="#">Link to this property</a>

extra\_prefixes: optional array of string

Prefixes in this list will be advertised to the customer device, in addition to the routes in the Magic routing table.

<a href="#">Link to this property</a>

import\_filter\_id: optional string

ID of the BGP filter profile applied to routes received from the customer.

<a href="#">Link to this property</a>

md5\_key: optional string

MD5 key to use for session authentication.

Note that *this is not a security measure*. MD5 is not a valid security mechanism, and the key is not treated as a secret value. This is *only* supported for preventing misconfiguration, not for defending against malicious attacks.

The MD5 key, if set, must be of non-zero length and consist only of the following types of character:

- ASCII alphanumerics: <code>[a-zA-Z0-9]</code>
- Special characters in the set <code>'!@#$%^&amp;*()+[]{}&lt;&gt;/.,;:_-~</code>= |\`

In other words, MD5 keys may contain any printable ASCII character aside from newline (0x0A), quotation mark (<code>"</code>), vertical tab (0x0B), carriage return (0x0D), tab (0x09), form feed (0x0C), and the question mark (<code>?</code>). Requests specifying an MD5 key with one or more of these disallowed characters will be rejected.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

bgp\_status: optional object {state, tcp\_established, updated\_at, 5 more }

</summary>

<details>

<summary>

state: "BGP\_DOWN"or "BGP\_UP"or "BGP\_ESTABLISHING"

</summary>

One of the following:

"BGP\_DOWN"

<a href="#">Link to this property</a>

"BGP\_UP"

<a href="#">Link to this property</a>

"BGP\_ESTABLISHING"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

tcp\_established: boolean

<a href="#">Link to this property</a>

updated\_at: string

formatdate-time

<a href="#">Link to this property</a>

bgp\_state: optional string

<a href="#">Link to this property</a>

cf\_speaker\_ip: optional string

formatipv4

<a href="#">Link to this property</a>

cf\_speaker\_port: optional number

maximum65535

minimum1

<a href="#">Link to this property</a>

customer\_speaker\_ip: optional string

formatipv4

<a href="#">Link to this property</a>

customer\_speaker\_port: optional number

maximum65535

minimum1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_on: optional string

The date and time the tunnel was created.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

custom\_remote\_identities: optional object {fqdn\_id }

</summary>

fqdn\_id: optional string

A custom IKE ID of type FQDN that may be used to identity the IPsec tunnel. The generated IKE IDs can still be used even if this custom value is specified.

Must be of the form <code>&lt;custom label&gt;.&lt;account ID&gt;.custom.ipsec.cloudflare.com</code>.

This custom ID does not need to be unique. Two IPsec tunnels may have the same custom fqdn\_id. However, if another IPsec tunnel has the same value then the two tunnels cannot have the same cloudflare\_endpoint.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

customer\_endpoint: optional string

The IP address assigned to the customer side of the IPsec tunnel. Not required, but must be set for proactive traceroutes to work.

<a href="#">Link to this property</a>

description: optional string

An optional description forthe IPsec tunnel.

<a href="#">Link to this property</a>

<details>

<summary>

health\_check: optional object {direction, enabled, rate, 2 more }

</summary>

<details>

<summary>

direction: optional "unidirectional"or "bidirectional"

The direction of the flow of the healthcheck. Either unidirectional, where the probe comes to you via the tunnel and the result comes back to Cloudflare via the open Internet, or bidirectional where both the probe and result come and go via the tunnel.

</summary>

One of the following:

"unidirectional"

<a href="#">Link to this property</a>

"bidirectional"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

enabled: optional boolean

Determines whether to run healthchecks for a tunnel.

<a href="#">Link to this property</a>

rate: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit%20%3E%20(model)%20health_check_rate%20%3E%20(schema)">HealthCheckRate</a>

How frequent the health check is run. The default value is <code>mid</code>.

<a href="#">Link to this property</a>

<details>

<summary>

target: optional object {effective, saved } or string

The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to <code>customer_gre_endpoint address</code>. This field is ignored for bidirectional healthchecks as the interface\_address (not assigned to the Cloudflare side of the tunnel) is used as the target. Must be in object form if the x-magic-new-hc-target header is set to true and string form if x-magic-new-hc-target is absent or set to false.

</summary>

One of the following:

<details>

<summary>

MagicHealthCheckTarget object {effective, saved }

The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to <code>customer_gre_endpoint address</code>. This field is ignored for bidirectional healthchecks as the interface\_address (not assigned to the Cloudflare side of the tunnel) is used as the target.

</summary>

effective: optional string

The effective health check target. If ‘saved’ is empty, then this field will be populated with the calculated default value on GET requests. Ignored in POST, PUT, and PATCH requests.

<a href="#">Link to this property</a>

saved: optional string

The saved health check target. Setting the value to the empty string indicates that the calculated default value will be used.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit%20%3E%20(model)%20health_check_type%20%3E%20(schema)">HealthCheckType</a>

The type of healthcheck to run, reply or request. The default value is <code>reply</code>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

interface\_address6: optional string

A 127 bit IPV6 prefix from within the virtual\_subnet6 prefix space with the address being the first IP of the subnet and not same as the address of virtual\_subnet6. Eg if virtual\_subnet6 is 2606:54c1:7:0:a9fe:12d2::/127 , interface\_address6 could be 2606:54c1:7:0:a9fe:12d2:1:200/127

<a href="#">Link to this property</a>

modified\_on: optional string

The date and time the tunnel was last modified.

formatdate-time

<a href="#">Link to this property</a>

psk\_metadata: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.ipsec_tunnels%20%3E%20(model)%20psk_metadata%20%3E%20(schema)">PSKMetadata</a> { last\_generated\_on }

The PSK metadata that includes when the PSK was generated.

<a href="#">Link to this property</a>

replay\_protection: optional boolean

If <code>true</code>, then IPsec replay protection will be supported in the Cloudflare-to-customer direction.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.ipsec_tunnels%20%3E%20(model)%20ipsec_tunnel_bulk_update_response%20%3E%20(schema)>)

<details>

<summary>

IPSECTunnelPSKGenerateResponse object {ipsec\_tunnel\_id, psk, psk\_metadata }

</summary>

ipsec\_tunnel\_id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

psk: optional string

A randomly generated or provided string for use in the IPsec tunnel.

<a href="#">Link to this property</a>

psk\_metadata: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.ipsec_tunnels%20%3E%20(model)%20psk_metadata%20%3E%20(schema)">PSKMetadata</a> { last\_generated\_on }

The PSK metadata that includes when the PSK was generated.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.ipsec_tunnels%20%3E%20(model)%20ipsec_tunnel_psk_generate_response%20%3E%20(schema)>)

<details>

<summary>

IPSECTunnelPSKSetResponse object {successfully\_applied\_psks, unapplied\_psks }

</summary>

<details>

<summary>

successfully\_applied\_psks: optional map\[object {ipsec\_id, ipsec\_tunnel\_id, psk, psk\_metadata } ]

Map of tunnel IDs to successfully applied PSK details.

</summary>

ipsec\_id: string

The IKE identifier used for this tunnel on the Cloudflare edge.

<a href="#">Link to this property</a>

ipsec\_tunnel\_id: string

Identifier

maxLength32

<a href="#">Link to this property</a>

psk: string

A randomly generated or provided string for use in the IPsec tunnel.

<a href="#">Link to this property</a>

psk\_metadata: <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.ipsec_tunnels%20%3E%20(model)%20psk_metadata%20%3E%20(schema)">PSKMetadata</a> { last\_generated\_on }

The PSK metadata that includes when the PSK was generated.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

unapplied\_psks: optional map\[string]

Map of tunnel IDs to failure reasons for PSKs that could not be applied.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.ipsec_tunnels%20%3E%20(model)%20ipsec_tunnel_psk_set_response%20%3E%20(schema)>)

#### Magic TransitRoutes

##### [List Routes](https://developers.cloudflare.com/api/resources/magic_transit/subresources/routes/methods/list)

GET/accounts/{account\_id}/magic/routes

##### [Route Details](https://developers.cloudflare.com/api/resources/magic_transit/subresources/routes/methods/get)

GET/accounts/{account\_id}/magic/routes/{route\_id}

##### [Create a Route](https://developers.cloudflare.com/api/resources/magic_transit/subresources/routes/methods/create)

POST/accounts/{account\_id}/magic/routes

##### [Update Route](https://developers.cloudflare.com/api/resources/magic_transit/subresources/routes/methods/update)

PUT/accounts/{account\_id}/magic/routes/{route\_id}

##### [Delete Route](https://developers.cloudflare.com/api/resources/magic_transit/subresources/routes/methods/delete)

DELETE/accounts/{account\_id}/magic/routes/{route\_id}

##### [Update Many Routes](https://developers.cloudflare.com/api/resources/magic_transit/subresources/routes/methods/bulk_update)

PUT/accounts/{account\_id}/magic/routes

##### [Delete Many Routes](https://developers.cloudflare.com/api/resources/magic_transit/subresources/routes/methods/empty)

DELETE/accounts/{account\_id}/magic/routes

##### ModelsExpand Collapse

<details>

<summary>

Scope object {colo\_names, colo\_regions }

Used only for ECMP routes.

</summary>

colo\_names: optional array of string

List of colo names for the ECMP scope.

<a href="#">Link to this property</a>

colo\_regions: optional array of string

List of colo regions for the ECMP scope.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.routes%20%3E%20(model)%20scope%20%3E%20(schema)>)

<details>

<summary>

RouteListResponse object {routes }

</summary>

<details>

<summary>

routes: optional array of object {id, nexthop, prefix, 6 more }

</summary>

id: string

Identifier

maxLength32

<a href="#">Link to this property</a>

nexthop: string

The next-hop IP Address for the static route.

<a href="#">Link to this property</a>

prefix: string

IP Prefix in Classless Inter-Domain Routing format.

<a href="#">Link to this property</a>

priority: number

Priority of the static route.

<a href="#">Link to this property</a>

created\_on: optional string

When the route was created.

formatdate-time

<a href="#">Link to this property</a>

description: optional string

An optional human provided description of the static route.

<a href="#">Link to this property</a>

modified\_on: optional string

When the route was last modified.

formatdate-time

<a href="#">Link to this property</a>

scope: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.routes%20%3E%20(model)%20scope%20%3E%20(schema)">Scope</a> { colo\_names, colo\_regions }

Used only for ECMP routes.

<a href="#">Link to this property</a>

weight: optional number

Optional weight of the ECMP scope - if provided.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.routes%20%3E%20(model)%20route_list_response%20%3E%20(schema)>)

<details>

<summary>

RouteGetResponse object {route }

</summary>

<details>

<summary>

route: optional object {id, nexthop, prefix, 6 more }

</summary>

id: string

Identifier

maxLength32

<a href="#">Link to this property</a>

nexthop: string

The next-hop IP Address for the static route.

<a href="#">Link to this property</a>

prefix: string

IP Prefix in Classless Inter-Domain Routing format.

<a href="#">Link to this property</a>

priority: number

Priority of the static route.

<a href="#">Link to this property</a>

created\_on: optional string

When the route was created.

formatdate-time

<a href="#">Link to this property</a>

description: optional string

An optional human provided description of the static route.

<a href="#">Link to this property</a>

modified\_on: optional string

When the route was last modified.

formatdate-time

<a href="#">Link to this property</a>

scope: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.routes%20%3E%20(model)%20scope%20%3E%20(schema)">Scope</a> { colo\_names, colo\_regions }

Used only for ECMP routes.

<a href="#">Link to this property</a>

weight: optional number

Optional weight of the ECMP scope - if provided.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.routes%20%3E%20(model)%20route_get_response%20%3E%20(schema)>)

<details>

<summary>

RouteCreateResponse object {id, nexthop, prefix, 6 more }

</summary>

id: string

Identifier

maxLength32

<a href="#">Link to this property</a>

nexthop: string

The next-hop IP Address for the static route.

<a href="#">Link to this property</a>

prefix: string

IP Prefix in Classless Inter-Domain Routing format.

<a href="#">Link to this property</a>

priority: number

Priority of the static route.

<a href="#">Link to this property</a>

created\_on: optional string

When the route was created.

formatdate-time

<a href="#">Link to this property</a>

description: optional string

An optional human provided description of the static route.

<a href="#">Link to this property</a>

modified\_on: optional string

When the route was last modified.

formatdate-time

<a href="#">Link to this property</a>

scope: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.routes%20%3E%20(model)%20scope%20%3E%20(schema)">Scope</a> { colo\_names, colo\_regions }

Used only for ECMP routes.

<a href="#">Link to this property</a>

weight: optional number

Optional weight of the ECMP scope - if provided.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.routes%20%3E%20(model)%20route_create_response%20%3E%20(schema)>)

<details>

<summary>

RouteUpdateResponse object {modified, modified\_route }

</summary>

modified: optional boolean

<a href="#">Link to this property</a>

<details>

<summary>

modified\_route: optional object {id, nexthop, prefix, 6 more }

</summary>

id: string

Identifier

maxLength32

<a href="#">Link to this property</a>

nexthop: string

The next-hop IP Address for the static route.

<a href="#">Link to this property</a>

prefix: string

IP Prefix in Classless Inter-Domain Routing format.

<a href="#">Link to this property</a>

priority: number

Priority of the static route.

<a href="#">Link to this property</a>

created\_on: optional string

When the route was created.

formatdate-time

<a href="#">Link to this property</a>

description: optional string

An optional human provided description of the static route.

<a href="#">Link to this property</a>

modified\_on: optional string

When the route was last modified.

formatdate-time

<a href="#">Link to this property</a>

scope: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.routes%20%3E%20(model)%20scope%20%3E%20(schema)">Scope</a> { colo\_names, colo\_regions }

Used only for ECMP routes.

<a href="#">Link to this property</a>

weight: optional number

Optional weight of the ECMP scope - if provided.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.routes%20%3E%20(model)%20route_update_response%20%3E%20(schema)>)

<details>

<summary>

RouteDeleteResponse object {deleted, deleted\_route }

</summary>

deleted: optional boolean

<a href="#">Link to this property</a>

<details>

<summary>

deleted\_route: optional object {id, nexthop, prefix, 6 more }

</summary>

id: string

Identifier

maxLength32

<a href="#">Link to this property</a>

nexthop: string

The next-hop IP Address for the static route.

<a href="#">Link to this property</a>

prefix: string

IP Prefix in Classless Inter-Domain Routing format.

<a href="#">Link to this property</a>

priority: number

Priority of the static route.

<a href="#">Link to this property</a>

created\_on: optional string

When the route was created.

formatdate-time

<a href="#">Link to this property</a>

description: optional string

An optional human provided description of the static route.

<a href="#">Link to this property</a>

modified\_on: optional string

When the route was last modified.

formatdate-time

<a href="#">Link to this property</a>

scope: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.routes%20%3E%20(model)%20scope%20%3E%20(schema)">Scope</a> { colo\_names, colo\_regions }

Used only for ECMP routes.

<a href="#">Link to this property</a>

weight: optional number

Optional weight of the ECMP scope - if provided.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.routes%20%3E%20(model)%20route_delete_response%20%3E%20(schema)>)

<details>

<summary>

RouteBulkUpdateResponse object {modified, modified\_routes }

</summary>

modified: optional boolean

<a href="#">Link to this property</a>

<details>

<summary>

modified\_routes: optional array of object {id, nexthop, prefix, 6 more }

</summary>

id: string

Identifier

maxLength32

<a href="#">Link to this property</a>

nexthop: string

The next-hop IP Address for the static route.

<a href="#">Link to this property</a>

prefix: string

IP Prefix in Classless Inter-Domain Routing format.

<a href="#">Link to this property</a>

priority: number

Priority of the static route.

<a href="#">Link to this property</a>

created\_on: optional string

When the route was created.

formatdate-time

<a href="#">Link to this property</a>

description: optional string

An optional human provided description of the static route.

<a href="#">Link to this property</a>

modified\_on: optional string

When the route was last modified.

formatdate-time

<a href="#">Link to this property</a>

scope: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.routes%20%3E%20(model)%20scope%20%3E%20(schema)">Scope</a> { colo\_names, colo\_regions }

Used only for ECMP routes.

<a href="#">Link to this property</a>

weight: optional number

Optional weight of the ECMP scope - if provided.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.routes%20%3E%20(model)%20route_bulk_update_response%20%3E%20(schema)>)

<details>

<summary>

RouteEmptyResponse object {deleted, deleted\_routes }

</summary>

deleted: optional boolean

<a href="#">Link to this property</a>

<details>

<summary>

deleted\_routes: optional array of object {id, nexthop, prefix, 6 more }

</summary>

id: string

Identifier

maxLength32

<a href="#">Link to this property</a>

nexthop: string

The next-hop IP Address for the static route.

<a href="#">Link to this property</a>

prefix: string

IP Prefix in Classless Inter-Domain Routing format.

<a href="#">Link to this property</a>

priority: number

Priority of the static route.

<a href="#">Link to this property</a>

created\_on: optional string

When the route was created.

formatdate-time

<a href="#">Link to this property</a>

description: optional string

An optional human provided description of the static route.

<a href="#">Link to this property</a>

modified\_on: optional string

When the route was last modified.

formatdate-time

<a href="#">Link to this property</a>

scope: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.routes%20%3E%20(model)%20scope%20%3E%20(schema)">Scope</a> { colo\_names, colo\_regions }

Used only for ECMP routes.

<a href="#">Link to this property</a>

weight: optional number

Optional weight of the ECMP scope - if provided.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.routes%20%3E%20(model)%20route_empty_response%20%3E%20(schema)>)

#### Magic TransitBGP Filter Profiles

##### [List BGP Filter Profiles](https://developers.cloudflare.com/api/resources/magic_transit/subresources/bgp_filter_profiles/methods/list)

GET/accounts/{account\_id}/magic/bgp/filter\_profiles

##### [Get BGP Filter Profile](https://developers.cloudflare.com/api/resources/magic_transit/subresources/bgp_filter_profiles/methods/get)

GET/accounts/{account\_id}/magic/bgp/filter\_profiles/{profile\_id}

##### [Create BGP Filter Profile](https://developers.cloudflare.com/api/resources/magic_transit/subresources/bgp_filter_profiles/methods/create)

POST/accounts/{account\_id}/magic/bgp/filter\_profiles

##### [Update BGP Filter Profile](https://developers.cloudflare.com/api/resources/magic_transit/subresources/bgp_filter_profiles/methods/update)

PUT/accounts/{account\_id}/magic/bgp/filter\_profiles/{profile\_id}

##### [Delete BGP Filter Profile](https://developers.cloudflare.com/api/resources/magic_transit/subresources/bgp_filter_profiles/methods/delete)

DELETE/accounts/{account\_id}/magic/bgp/filter\_profiles/{profile\_id}

##### ModelsExpand Collapse

<details>

<summary>

BGPFilterProfileListResponse object {id, description, match\_action, 4 more }

</summary>

id: string

Identifier

maxLength32

<a href="#">Link to this property</a>

description: string

Description of the filter profile

maxLength1024

<a href="#">Link to this property</a>

<details>

<summary>

match\_action: "allow"or "deny"

Action to take when a route matches one of the targets in this profile

</summary>

One of the following:

"allow"

<a href="#">Link to this property</a>

"deny"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

Friendly name for the filter profile

maxLength255

minLength1

<a href="#">Link to this property</a>

targets: array of string

List of CIDR prefixes. Each entry may carry an optional suffix that specifies which prefix lengths to match relative to the prefix length N: ‘{X,Y}’ matches prefix lengths in the inclusive range \[X, Y] where N &lt;= X &lt;= Y &lt;= max (max is 32 for IPv4, 128 for IPv6), ‘{X}’ matches exactly length X (equivalent to {X,X}), ’+’ is shorthand for {N, max} (the prefix and all more-specific subnets, including at length N itself; valid even when N is the maximum length). Omit the suffix to match the prefix exactly at length N.

<a href="#">Link to this property</a>

created\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

modified\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.bgp_filter_profiles%20%3E%20(model)%20bgp_filter_profile_list_response%20%3E%20(schema)>)

<details>

<summary>

BGPFilterProfileGetResponse object {id, description, match\_action, 4 more }

</summary>

id: string

Identifier

maxLength32

<a href="#">Link to this property</a>

description: string

Description of the filter profile

maxLength1024

<a href="#">Link to this property</a>

<details>

<summary>

match\_action: "allow"or "deny"

Action to take when a route matches one of the targets in this profile

</summary>

One of the following:

"allow"

<a href="#">Link to this property</a>

"deny"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

Friendly name for the filter profile

maxLength255

minLength1

<a href="#">Link to this property</a>

targets: array of string

List of CIDR prefixes. Each entry may carry an optional suffix that specifies which prefix lengths to match relative to the prefix length N: ‘{X,Y}’ matches prefix lengths in the inclusive range \[X, Y] where N &lt;= X &lt;= Y &lt;= max (max is 32 for IPv4, 128 for IPv6), ‘{X}’ matches exactly length X (equivalent to {X,X}), ’+’ is shorthand for {N, max} (the prefix and all more-specific subnets, including at length N itself; valid even when N is the maximum length). Omit the suffix to match the prefix exactly at length N.

<a href="#">Link to this property</a>

created\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

modified\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.bgp_filter_profiles%20%3E%20(model)%20bgp_filter_profile_get_response%20%3E%20(schema)>)

<details>

<summary>

BGPFilterProfileCreateResponse object {id, description, match\_action, 4 more }

</summary>

id: string

Identifier

maxLength32

<a href="#">Link to this property</a>

description: string

Description of the filter profile

maxLength1024

<a href="#">Link to this property</a>

<details>

<summary>

match\_action: "allow"or "deny"

Action to take when a route matches one of the targets in this profile

</summary>

One of the following:

"allow"

<a href="#">Link to this property</a>

"deny"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

Friendly name for the filter profile

maxLength255

minLength1

<a href="#">Link to this property</a>

targets: array of string

List of CIDR prefixes. Each entry may carry an optional suffix that specifies which prefix lengths to match relative to the prefix length N: ‘{X,Y}’ matches prefix lengths in the inclusive range \[X, Y] where N &lt;= X &lt;= Y &lt;= max (max is 32 for IPv4, 128 for IPv6), ‘{X}’ matches exactly length X (equivalent to {X,X}), ’+’ is shorthand for {N, max} (the prefix and all more-specific subnets, including at length N itself; valid even when N is the maximum length). Omit the suffix to match the prefix exactly at length N.

<a href="#">Link to this property</a>

created\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

modified\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.bgp_filter_profiles%20%3E%20(model)%20bgp_filter_profile_create_response%20%3E%20(schema)>)

<details>

<summary>

BGPFilterProfileUpdateResponse object {id, description, match\_action, 4 more }

</summary>

id: string

Identifier

maxLength32

<a href="#">Link to this property</a>

description: string

Description of the filter profile

maxLength1024

<a href="#">Link to this property</a>

<details>

<summary>

match\_action: "allow"or "deny"

Action to take when a route matches one of the targets in this profile

</summary>

One of the following:

"allow"

<a href="#">Link to this property</a>

"deny"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

Friendly name for the filter profile

maxLength255

minLength1

<a href="#">Link to this property</a>

targets: array of string

List of CIDR prefixes. Each entry may carry an optional suffix that specifies which prefix lengths to match relative to the prefix length N: ‘{X,Y}’ matches prefix lengths in the inclusive range \[X, Y] where N &lt;= X &lt;= Y &lt;= max (max is 32 for IPv4, 128 for IPv6), ‘{X}’ matches exactly length X (equivalent to {X,X}), ’+’ is shorthand for {N, max} (the prefix and all more-specific subnets, including at length N itself; valid even when N is the maximum length). Omit the suffix to match the prefix exactly at length N.

<a href="#">Link to this property</a>

created\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

modified\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.bgp_filter_profiles%20%3E%20(model)%20bgp_filter_profile_update_response%20%3E%20(schema)>)

<details>

<summary>

BGPFilterProfileDeleteResponse object {id, description, match\_action, 4 more }

</summary>

id: string

Identifier

maxLength32

<a href="#">Link to this property</a>

description: string

Description of the filter profile

maxLength1024

<a href="#">Link to this property</a>

<details>

<summary>

match\_action: "allow"or "deny"

Action to take when a route matches one of the targets in this profile

</summary>

One of the following:

"allow"

<a href="#">Link to this property</a>

"deny"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

Friendly name for the filter profile

maxLength255

minLength1

<a href="#">Link to this property</a>

targets: array of string

List of CIDR prefixes. Each entry may carry an optional suffix that specifies which prefix lengths to match relative to the prefix length N: ‘{X,Y}’ matches prefix lengths in the inclusive range \[X, Y] where N &lt;= X &lt;= Y &lt;= max (max is 32 for IPv4, 128 for IPv6), ‘{X}’ matches exactly length X (equivalent to {X,X}), ’+’ is shorthand for {N, max} (the prefix and all more-specific subnets, including at length N itself; valid even when N is the maximum length). Omit the suffix to match the prefix exactly at length N.

<a href="#">Link to this property</a>

created\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

modified\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.bgp_filter_profiles%20%3E%20(model)%20bgp_filter_profile_delete_response%20%3E%20(schema)>)

#### Magic TransitSites

##### [List Sites](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites/methods/list)

GET/accounts/{account\_id}/magic/sites

##### [Site Details](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites/methods/get)

GET/accounts/{account\_id}/magic/sites/{site\_id}

##### [Create a new Site](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites/methods/create)

POST/accounts/{account\_id}/magic/sites

##### [Update Site](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites/methods/update)

PUT/accounts/{account\_id}/magic/sites/{site\_id}

##### [Patch Site](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites/methods/edit)

PATCH/accounts/{account\_id}/magic/sites/{site\_id}

##### [Delete Site](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites/methods/delete)

DELETE/accounts/{account\_id}/magic/sites/{site\_id}

##### ModelsExpand Collapse

<details>

<summary>

Site object {id, connector\_id, description, 4 more }

</summary>

id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

connector\_id: optional string

Magic Connector identifier tag.

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

ha\_mode: optional boolean

Site high availability mode. If set to true, the site can have two connectors and runs in high availability mode.

<a href="#">Link to this property</a>

location: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.sites%20%3E%20(model)%20site_location%20%3E%20(schema)">SiteLocation</a> { lat, lon }

Location of site in latitude and longitude.

<a href="#">Link to this property</a>

name: optional string

The name of the site.

<a href="#">Link to this property</a>

secondary\_connector\_id: optional string

Magic Connector identifier tag. Used when high availability mode is on.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.sites%20%3E%20(model)%20site%20%3E%20(schema)>)

<details>

<summary>

SiteLocation object {lat, lon }

Location of site in latitude and longitude.

</summary>

lat: optional string

Latitude

<a href="#">Link to this property</a>

lon: optional string

Longitude

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.sites%20%3E%20(model)%20site_location%20%3E%20(schema)>)

#### Magic TransitSitesApp Configuration

##### [List App Configs](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites/subresources/app_configuration/methods/list)

GET/accounts/{account\_id}/magic/sites/{site\_id}/app\_configs

##### [Create a new App Config](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites/subresources/app_configuration/methods/create)

POST/accounts/{account\_id}/magic/sites/{site\_id}/app\_configs

##### [Update an App Config](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites/subresources/app_configuration/methods/update)

PUT/accounts/{account\_id}/magic/sites/{site\_id}/app\_configs/{app\_config\_id}

##### [Update an App Config](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites/subresources/app_configuration/methods/edit)

PATCH/accounts/{account\_id}/magic/sites/{site\_id}/app\_configs/{app\_config\_id}

##### [Delete App Config](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites/subresources/app_configuration/methods/delete)

DELETE/accounts/{account\_id}/magic/sites/{site\_id}/app\_configs/{app\_config\_id}

##### ModelsExpand Collapse

<details>

<summary>

AppConfigurationListResponse = object {account\_app\_id, id, breakout, 3 more } or object {managed\_app\_id, id, breakout, 3 more }

Traffic decision configuration for an app.

</summary>

One of the following:

<details>

<summary>

AccountApp object {account\_app\_id, id, breakout, 3 more }

</summary>

account\_app\_id: string

Magic account app ID.

<a href="#">Link to this property</a>

id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

breakout: optional boolean

Whether to breakout traffic to the app’s endpoints directly. Null preserves default behavior.

<a href="#">Link to this property</a>

preferred\_wans: optional array of string

WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

<a href="#">Link to this property</a>

priority: optional number

Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

maximum1

minimum0

<a href="#">Link to this property</a>

site\_id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ManagedApp object {managed\_app\_id, id, breakout, 3 more }

</summary>

managed\_app\_id: string

Managed app ID.

<a href="#">Link to this property</a>

id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

breakout: optional boolean

Whether to breakout traffic to the app’s endpoints directly. Null preserves default behavior.

<a href="#">Link to this property</a>

preferred\_wans: optional array of string

WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

<a href="#">Link to this property</a>

priority: optional number

Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

maximum1

minimum0

<a href="#">Link to this property</a>

site\_id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.sites.app_configuration%20%3E%20(model)%20app_configuration_list_response%20%3E%20(schema)>)

<details>

<summary>

AppConfigurationCreateResponse = object {account\_app\_id, id, breakout, 3 more } or object {managed\_app\_id, id, breakout, 3 more }

Traffic decision configuration for an app.

</summary>

One of the following:

<details>

<summary>

AccountApp object {account\_app\_id, id, breakout, 3 more }

</summary>

account\_app\_id: string

Magic account app ID.

<a href="#">Link to this property</a>

id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

breakout: optional boolean

Whether to breakout traffic to the app’s endpoints directly. Null preserves default behavior.

<a href="#">Link to this property</a>

preferred\_wans: optional array of string

WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

<a href="#">Link to this property</a>

priority: optional number

Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

maximum1

minimum0

<a href="#">Link to this property</a>

site\_id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ManagedApp object {managed\_app\_id, id, breakout, 3 more }

</summary>

managed\_app\_id: string

Managed app ID.

<a href="#">Link to this property</a>

id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

breakout: optional boolean

Whether to breakout traffic to the app’s endpoints directly. Null preserves default behavior.

<a href="#">Link to this property</a>

preferred\_wans: optional array of string

WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

<a href="#">Link to this property</a>

priority: optional number

Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

maximum1

minimum0

<a href="#">Link to this property</a>

site\_id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.sites.app_configuration%20%3E%20(model)%20app_configuration_create_response%20%3E%20(schema)>)

<details>

<summary>

AppConfigurationUpdateResponse = object {account\_app\_id, id, breakout, 3 more } or object {managed\_app\_id, id, breakout, 3 more }

Traffic decision configuration for an app.

</summary>

One of the following:

<details>

<summary>

AccountApp object {account\_app\_id, id, breakout, 3 more }

</summary>

account\_app\_id: string

Magic account app ID.

<a href="#">Link to this property</a>

id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

breakout: optional boolean

Whether to breakout traffic to the app’s endpoints directly. Null preserves default behavior.

<a href="#">Link to this property</a>

preferred\_wans: optional array of string

WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

<a href="#">Link to this property</a>

priority: optional number

Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

maximum1

minimum0

<a href="#">Link to this property</a>

site\_id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ManagedApp object {managed\_app\_id, id, breakout, 3 more }

</summary>

managed\_app\_id: string

Managed app ID.

<a href="#">Link to this property</a>

id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

breakout: optional boolean

Whether to breakout traffic to the app’s endpoints directly. Null preserves default behavior.

<a href="#">Link to this property</a>

preferred\_wans: optional array of string

WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

<a href="#">Link to this property</a>

priority: optional number

Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

maximum1

minimum0

<a href="#">Link to this property</a>

site\_id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.sites.app_configuration%20%3E%20(model)%20app_configuration_update_response%20%3E%20(schema)>)

<details>

<summary>

AppConfigurationEditResponse = object {account\_app\_id, id, breakout, 3 more } or object {managed\_app\_id, id, breakout, 3 more }

Traffic decision configuration for an app.

</summary>

One of the following:

<details>

<summary>

AccountApp object {account\_app\_id, id, breakout, 3 more }

</summary>

account\_app\_id: string

Magic account app ID.

<a href="#">Link to this property</a>

id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

breakout: optional boolean

Whether to breakout traffic to the app’s endpoints directly. Null preserves default behavior.

<a href="#">Link to this property</a>

preferred\_wans: optional array of string

WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

<a href="#">Link to this property</a>

priority: optional number

Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

maximum1

minimum0

<a href="#">Link to this property</a>

site\_id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ManagedApp object {managed\_app\_id, id, breakout, 3 more }

</summary>

managed\_app\_id: string

Managed app ID.

<a href="#">Link to this property</a>

id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

breakout: optional boolean

Whether to breakout traffic to the app’s endpoints directly. Null preserves default behavior.

<a href="#">Link to this property</a>

preferred\_wans: optional array of string

WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

<a href="#">Link to this property</a>

priority: optional number

Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

maximum1

minimum0

<a href="#">Link to this property</a>

site\_id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.sites.app_configuration%20%3E%20(model)%20app_configuration_edit_response%20%3E%20(schema)>)

<details>

<summary>

AppConfigurationDeleteResponse = object {account\_app\_id, id, breakout, 3 more } or object {managed\_app\_id, id, breakout, 3 more }

Traffic decision configuration for an app.

</summary>

One of the following:

<details>

<summary>

AccountApp object {account\_app\_id, id, breakout, 3 more }

</summary>

account\_app\_id: string

Magic account app ID.

<a href="#">Link to this property</a>

id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

breakout: optional boolean

Whether to breakout traffic to the app’s endpoints directly. Null preserves default behavior.

<a href="#">Link to this property</a>

preferred\_wans: optional array of string

WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

<a href="#">Link to this property</a>

priority: optional number

Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

maximum1

minimum0

<a href="#">Link to this property</a>

site\_id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ManagedApp object {managed\_app\_id, id, breakout, 3 more }

</summary>

managed\_app\_id: string

Managed app ID.

<a href="#">Link to this property</a>

id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

breakout: optional boolean

Whether to breakout traffic to the app’s endpoints directly. Null preserves default behavior.

<a href="#">Link to this property</a>

preferred\_wans: optional array of string

WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

<a href="#">Link to this property</a>

priority: optional number

Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

maximum1

minimum0

<a href="#">Link to this property</a>

site\_id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.sites.app_configuration%20%3E%20(model)%20app_configuration_delete_response%20%3E%20(schema)>)

#### Magic TransitSitesACLs

##### [List Site ACLs](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites/subresources/acls/methods/list)

GET/accounts/{account\_id}/magic/sites/{site\_id}/acls

##### [Site ACL Details](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites/subresources/acls/methods/get)

GET/accounts/{account\_id}/magic/sites/{site\_id}/acls/{acl\_id}

##### [Create a new Site ACL](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites/subresources/acls/methods/create)

POST/accounts/{account\_id}/magic/sites/{site\_id}/acls

##### [Update Site ACL](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites/subresources/acls/methods/update)

PUT/accounts/{account\_id}/magic/sites/{site\_id}/acls/{acl\_id}

##### [Patch Site ACL](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites/subresources/acls/methods/edit)

PATCH/accounts/{account\_id}/magic/sites/{site\_id}/acls/{acl\_id}

##### [Delete Site ACL](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites/subresources/acls/methods/delete)

DELETE/accounts/{account\_id}/magic/sites/{site\_id}/acls/{acl\_id}

##### ModelsExpand Collapse

<details>

<summary>

ACL object {id, description, forward\_locally, 5 more }

Bidirectional ACL policy for network traffic within a site.

</summary>

id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

description: optional string

Description for the ACL.

<a href="#">Link to this property</a>

forward\_locally: optional boolean

The desired forwarding action for this ACL policy. If set to “false”, the policy will forward traffic to Cloudflare. If set to “true”, the policy will forward traffic locally on the Magic Connector. If not included in request, will default to false.

<a href="#">Link to this property</a>

lan\_1: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.sites.acls%20%3E%20(model)%20acl_configuration%20%3E%20(schema)">ACLConfiguration</a> { lan\_id, lan\_name, port\_ranges, 2 more }

<a href="#">Link to this property</a>

lan\_2: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.sites.acls%20%3E%20(model)%20acl_configuration%20%3E%20(schema)">ACLConfiguration</a> { lan\_id, lan\_name, port\_ranges, 2 more }

<a href="#">Link to this property</a>

name: optional string

The name of the ACL.

<a href="#">Link to this property</a>

<details>

<summary>

protocols: optional array of <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.sites.acls%20%3E%20(model)%20allowed_protocol%20%3E%20(schema)">AllowedProtocol</a>

</summary>

One of the following:

"tcp"

<a href="#">Link to this property</a>

"udp"

<a href="#">Link to this property</a>

"icmp"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

unidirectional: optional boolean

The desired traffic direction for this ACL policy. If set to “false”, the policy will allow bidirectional traffic. If set to “true”, the policy will only allow traffic in one direction. If not included in request, will default to false.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.sites.acls%20%3E%20(model)%20acl%20%3E%20(schema)>)

<details>

<summary>

ACLConfiguration object {lan\_id, lan\_name, port\_ranges, 2 more }

</summary>

lan\_id: string

The identifier for the LAN you want to create an ACL policy with.

<a href="#">Link to this property</a>

lan\_name: optional string

The name of the LAN based on the provided lan\_id.

<a href="#">Link to this property</a>

port\_ranges: optional array of string

Array of port ranges on the provided LAN that will be included in the ACL. If no ports or port rangess are provided, communication on any port on this LAN is allowed.

<a href="#">Link to this property</a>

ports: optional array of number

Array of ports on the provided LAN that will be included in the ACL. If no ports or port ranges are provided, communication on any port on this LAN is allowed.

<a href="#">Link to this property</a>

subnets: optional array of <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.sites.acls%20%3E%20(model)%20subnet%20%3E%20(schema)">Subnet</a>

Array of subnet IPs within the LAN that will be included in the ACL. If no subnets are provided, communication on any subnets on this LAN are allowed.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.sites.acls%20%3E%20(model)%20acl_configuration%20%3E%20(schema)>)

<details>

<summary>

AllowedProtocol = "tcp"or "udp"or "icmp"

Array of allowed communication protocols between configured LANs. If no protocols are provided, all protocols are allowed.

</summary>

One of the following:

"tcp"

<a href="#">Link to this property</a>

"udp"

<a href="#">Link to this property</a>

"icmp"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.sites.acls%20%3E%20(model)%20allowed_protocol%20%3E%20(schema)>)

Subnet = string

A valid IPv4 address.

[Link to this property](#)%20magic_transit.sites.acls%20%3E%20(model)%20subnet%20%3E%20(schema)>)

#### Magic TransitSitesLANs

##### [List Site LANs](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites/subresources/lans/methods/list)

GET/accounts/{account\_id}/magic/sites/{site\_id}/lans

##### [Site LAN Details](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites/subresources/lans/methods/get)

GET/accounts/{account\_id}/magic/sites/{site\_id}/lans/{lan\_id}

##### [Create a new Site LAN](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites/subresources/lans/methods/create)

POST/accounts/{account\_id}/magic/sites/{site\_id}/lans

##### [Update Site LAN](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites/subresources/lans/methods/update)

PUT/accounts/{account\_id}/magic/sites/{site\_id}/lans/{lan\_id}

##### [Patch Site LAN](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites/subresources/lans/methods/edit)

PATCH/accounts/{account\_id}/magic/sites/{site\_id}/lans/{lan\_id}

##### [Delete Site LAN](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites/subresources/lans/methods/delete)

DELETE/accounts/{account\_id}/magic/sites/{site\_id}/lans/{lan\_id}

##### ModelsExpand Collapse

<details>

<summary>

DHCPRelay object {server\_addresses }

</summary>

server\_addresses: optional array of string

List of DHCP server IPs.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.sites.lans%20%3E%20(model)%20dhcp_relay%20%3E%20(schema)>)

<details>

<summary>

DHCPServer object {dhcp\_options, dhcp\_pool\_end, dhcp\_pool\_start, 3 more }

</summary>

<details>

<summary>

dhcp\_options: optional array of object {code, type, value }

Optional list of custom DHCP options to include in DHCP responses. Only valid when DHCP server is enabled.

</summary>

code: number

DHCP option number (1-254). Options 0 and 255 are reserved by RFC 2132. Options 3, 6, and 51 are not allowed because they conflict with connector-managed configuration.

maximum254

minimum1

<a href="#">Link to this property</a>

<details>

<summary>

type: "text"or "hex"or "ip"or 3 more

The type of the option value. text: a string (max 255 bytes). hex: colon-separated hex bytes (e.g. “01:04:aa:bb:cc”, max 255 bytes). ip: an IPv4 address (e.g. “10.20.30.40”). byte: an unsigned integer 0-255 (1 byte). short: an unsigned integer 0-65535 (2 bytes). integer: an unsigned integer 0-4294967295 (4 bytes).

</summary>

One of the following:

"text"

<a href="#">Link to this property</a>

"hex"

<a href="#">Link to this property</a>

"ip"

<a href="#">Link to this property</a>

"byte"

<a href="#">Link to this property</a>

"short"

<a href="#">Link to this property</a>

"integer"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

value: string

The option value, interpreted according to the type field.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

dhcp\_pool\_end: optional string

A valid IPv4 address.

<a href="#">Link to this property</a>

dhcp\_pool\_start: optional string

A valid IPv4 address.

<a href="#">Link to this property</a>

Deprecateddns\_server: optional string

A valid IPv4 address.

<a href="#">Link to this property</a>

dns\_servers: optional array of string

<a href="#">Link to this property</a>

reservations: optional map\[string]

Mapping of MAC addresses to IP addresses

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.sites.lans%20%3E%20(model)%20dhcp_server%20%3E%20(schema)>)

<details>

<summary>

LAN object {id, bond\_id, ha\_link, 9 more }

</summary>

id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

bond\_id: optional number

<a href="#">Link to this property</a>

ha\_link: optional boolean

mark true to use this LAN for HA probing. only works for site with HA turned on. only one LAN can be set as the ha\_link.

<a href="#">Link to this property</a>

is\_breakout: optional boolean

mark true to use this LAN for source-based breakout traffic

<a href="#">Link to this property</a>

is\_prioritized: optional boolean

mark true to use this LAN for source-based prioritized traffic

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

nat: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.sites.lans%20%3E%20(model)%20nat%20%3E%20(schema)">Nat</a> { static\_prefix }

<a href="#">Link to this property</a>

physport: optional number

<a href="#">Link to this property</a>

<details>

<summary>

routed\_subnets: optional array of <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.sites.lans%20%3E%20(model)%20routed_subnet%20%3E%20(schema)">RoutedSubnet</a> { next\_hop, prefix, nat }

</summary>

next\_hop: string

A valid IPv4 address.

<a href="#">Link to this property</a>

prefix: string

A valid CIDR notation representing an IP range.

<a href="#">Link to this property</a>

nat: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.sites.lans%20%3E%20(model)%20nat%20%3E%20(schema)">Nat</a> { static\_prefix }

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

site\_id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

static\_addressing: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.sites.lans%20%3E%20(model)%20lan_static_addressing%20%3E%20(schema)">LANStaticAddressing</a> { address, dhcp\_relay, dhcp\_server, 2 more }

If the site is not configured in high availability mode, this configuration is optional (if omitted, use DHCP). However, if in high availability mode, static\_address is required along with secondary and virtual address.

<a href="#">Link to this property</a>

vlan\_tag: optional number

VLAN ID. Use zero for untagged.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.sites.lans%20%3E%20(model)%20lan%20%3E%20(schema)>)

<details>

<summary>

LANStaticAddressing object {address, dhcp\_relay, dhcp\_server, 2 more }

If the site is not configured in high availability mode, this configuration is optional (if omitted, use DHCP). However, if in high availability mode, static\_address is required along with secondary and virtual address.

</summary>

address: string

A valid CIDR notation representing an IP range.

<a href="#">Link to this property</a>

dhcp\_relay: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.sites.lans%20%3E%20(model)%20dhcp_relay%20%3E%20(schema)">DHCPRelay</a> { server\_addresses }

<a href="#">Link to this property</a>

dhcp\_server: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.sites.lans%20%3E%20(model)%20dhcp_server%20%3E%20(schema)">DHCPServer</a> { dhcp\_options, dhcp\_pool\_end, dhcp\_pool\_start, 3 more }

<a href="#">Link to this property</a>

secondary\_address: optional string

A valid CIDR notation representing an IP range.

<a href="#">Link to this property</a>

virtual\_address: optional string

A valid CIDR notation representing an IP range.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.sites.lans%20%3E%20(model)%20lan_static_addressing%20%3E%20(schema)>)

<details>

<summary>

Nat object {static\_prefix }

</summary>

static\_prefix: optional string

A valid CIDR notation representing an IP range.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.sites.lans%20%3E%20(model)%20nat%20%3E%20(schema)>)

<details>

<summary>

RoutedSubnet object {next\_hop, prefix, nat }

</summary>

next\_hop: string

A valid IPv4 address.

<a href="#">Link to this property</a>

prefix: string

A valid CIDR notation representing an IP range.

<a href="#">Link to this property</a>

nat: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.sites.lans%20%3E%20(model)%20nat%20%3E%20(schema)">Nat</a> { static\_prefix }

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.sites.lans%20%3E%20(model)%20routed_subnet%20%3E%20(schema)>)

#### Magic TransitSitesWANs

##### [List Site WANs](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites/subresources/wans/methods/list)

GET/accounts/{account\_id}/magic/sites/{site\_id}/wans

##### [Site WAN Details](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites/subresources/wans/methods/get)

GET/accounts/{account\_id}/magic/sites/{site\_id}/wans/{wan\_id}

##### [Create a new Site WAN](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites/subresources/wans/methods/create)

POST/accounts/{account\_id}/magic/sites/{site\_id}/wans

##### [Update Site WAN](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites/subresources/wans/methods/update)

PUT/accounts/{account\_id}/magic/sites/{site\_id}/wans/{wan\_id}

##### [Patch Site WAN](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites/subresources/wans/methods/edit)

PATCH/accounts/{account\_id}/magic/sites/{site\_id}/wans/{wan\_id}

##### [Delete Site WAN](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites/subresources/wans/methods/delete)

DELETE/accounts/{account\_id}/magic/sites/{site\_id}/wans/{wan\_id}

##### ModelsExpand Collapse

<details>

<summary>

WAN object {id, health\_check\_rate, name, 5 more }

</summary>

id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

health\_check\_rate: optional "low"or "mid"or "high"

Magic WAN health check rate for tunnels created on this link. The default value is <code>mid</code>.

</summary>

One of the following:

"low"

<a href="#">Link to this property</a>

"mid"

<a href="#">Link to this property</a>

"high"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

physport: optional number

<a href="#">Link to this property</a>

priority: optional number

Priority of WAN for traffic loadbalancing.

<a href="#">Link to this property</a>

site\_id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

static\_addressing: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.sites.wans%20%3E%20(model)%20wan_static_addressing%20%3E%20(schema)">WANStaticAddressing</a> { address, gateway\_address, secondary\_address }

(optional) if omitted, use DHCP. Submit secondary\_address when site is in high availability mode.

<a href="#">Link to this property</a>

vlan\_tag: optional number

VLAN ID. Use zero for untagged.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.sites.wans%20%3E%20(model)%20wan%20%3E%20(schema)>)

<details>

<summary>

WANStaticAddressing object {address, gateway\_address, secondary\_address }

(optional) if omitted, use DHCP. Submit secondary\_address when site is in high availability mode.

</summary>

address: string

A valid CIDR notation representing an IP range.

<a href="#">Link to this property</a>

gateway\_address: string

A valid IPv4 address.

<a href="#">Link to this property</a>

secondary\_address: optional string

A valid CIDR notation representing an IP range.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.sites.wans%20%3E%20(model)%20wan_static_addressing%20%3E%20(schema)>)

#### Magic TransitConnectors

##### [List Connectors](https://developers.cloudflare.com/api/resources/magic_transit/subresources/connectors/methods/list)

GET/accounts/{account\_id}/magic/connectors

##### [Get Connector](https://developers.cloudflare.com/api/resources/magic_transit/subresources/connectors/methods/get)

GET/accounts/{account\_id}/magic/connectors/{connector\_id}

##### [Create Connector](https://developers.cloudflare.com/api/resources/magic_transit/subresources/connectors/methods/create)

POST/accounts/{account\_id}/magic/connectors

##### [Update Connector](https://developers.cloudflare.com/api/resources/magic_transit/subresources/connectors/methods/update)

PUT/accounts/{account\_id}/magic/connectors/{connector\_id}

##### [Edit Connector](https://developers.cloudflare.com/api/resources/magic_transit/subresources/connectors/methods/edit)

PATCH/accounts/{account\_id}/magic/connectors/{connector\_id}

##### [Delete Connector](https://developers.cloudflare.com/api/resources/magic_transit/subresources/connectors/methods/delete)

DELETE/accounts/{account\_id}/magic/connectors/{connector\_id}

##### ModelsExpand Collapse

<details>

<summary>

ConnectorListResponse object {id, activated, interrupt\_window\_days\_of\_week, 12 more }

</summary>

id: string

<a href="#">Link to this property</a>

activated: boolean

<a href="#">Link to this property</a>

<details>

<summary>

interrupt\_window\_days\_of\_week: array of "Sunday"or "Monday"or "Tuesday"or 4 more

Allowed days of the week for upgrades. Default is all days.

</summary>

One of the following:

"Sunday"

<a href="#">Link to this property</a>

"Monday"

<a href="#">Link to this property</a>

"Tuesday"

<a href="#">Link to this property</a>

"Wednesday"

<a href="#">Link to this property</a>

"Thursday"

<a href="#">Link to this property</a>

"Friday"

<a href="#">Link to this property</a>

"Saturday"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

interrupt\_window\_duration\_hours: number

maximum24

minimum1

<a href="#">Link to this property</a>

interrupt\_window\_embargo\_dates: array of string

List of dates (YYYY-MM-DD) when upgrades are blocked.

<a href="#">Link to this property</a>

interrupt\_window\_hour\_of\_day: number

<a href="#">Link to this property</a>

last\_updated: string

<a href="#">Link to this property</a>

notes: string

<a href="#">Link to this property</a>

primary: boolean

<a href="#">Link to this property</a>

timezone: string

<a href="#">Link to this property</a>

<details>

<summary>

device: optional object {id, serial\_number, type }

</summary>

id: string

<a href="#">Link to this property</a>

serial\_number: optional string

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "MANAGED"or "LICENSED"

</summary>

One of the following:

"MANAGED"

<a href="#">Link to this property</a>

"LICENSED"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

last\_heartbeat: optional string

<a href="#">Link to this property</a>

last\_seen\_version: optional string

<a href="#">Link to this property</a>

license\_key: optional string

<a href="#">Link to this property</a>

site\_id: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.connectors%20%3E%20(model)%20connector_list_response%20%3E%20(schema)>)

<details>

<summary>

ConnectorGetResponse object {id, activated, interrupt\_window\_days\_of\_week, 12 more }

</summary>

id: string

<a href="#">Link to this property</a>

activated: boolean

<a href="#">Link to this property</a>

<details>

<summary>

interrupt\_window\_days\_of\_week: array of "Sunday"or "Monday"or "Tuesday"or 4 more

Allowed days of the week for upgrades. Default is all days.

</summary>

One of the following:

"Sunday"

<a href="#">Link to this property</a>

"Monday"

<a href="#">Link to this property</a>

"Tuesday"

<a href="#">Link to this property</a>

"Wednesday"

<a href="#">Link to this property</a>

"Thursday"

<a href="#">Link to this property</a>

"Friday"

<a href="#">Link to this property</a>

"Saturday"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

interrupt\_window\_duration\_hours: number

maximum24

minimum1

<a href="#">Link to this property</a>

interrupt\_window\_embargo\_dates: array of string

List of dates (YYYY-MM-DD) when upgrades are blocked.

<a href="#">Link to this property</a>

interrupt\_window\_hour\_of\_day: number

<a href="#">Link to this property</a>

last\_updated: string

<a href="#">Link to this property</a>

notes: string

<a href="#">Link to this property</a>

primary: boolean

<a href="#">Link to this property</a>

timezone: string

<a href="#">Link to this property</a>

<details>

<summary>

device: optional object {id, serial\_number, type }

</summary>

id: string

<a href="#">Link to this property</a>

serial\_number: optional string

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "MANAGED"or "LICENSED"

</summary>

One of the following:

"MANAGED"

<a href="#">Link to this property</a>

"LICENSED"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

last\_heartbeat: optional string

<a href="#">Link to this property</a>

last\_seen\_version: optional string

<a href="#">Link to this property</a>

license\_key: optional string

<a href="#">Link to this property</a>

site\_id: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.connectors%20%3E%20(model)%20connector_get_response%20%3E%20(schema)>)

<details>

<summary>

ConnectorCreateResponse object {id, activated, interrupt\_window\_days\_of\_week, 12 more }

</summary>

id: string

<a href="#">Link to this property</a>

activated: boolean

<a href="#">Link to this property</a>

<details>

<summary>

interrupt\_window\_days\_of\_week: array of "Sunday"or "Monday"or "Tuesday"or 4 more

Allowed days of the week for upgrades. Default is all days.

</summary>

One of the following:

"Sunday"

<a href="#">Link to this property</a>

"Monday"

<a href="#">Link to this property</a>

"Tuesday"

<a href="#">Link to this property</a>

"Wednesday"

<a href="#">Link to this property</a>

"Thursday"

<a href="#">Link to this property</a>

"Friday"

<a href="#">Link to this property</a>

"Saturday"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

interrupt\_window\_duration\_hours: number

maximum24

minimum1

<a href="#">Link to this property</a>

interrupt\_window\_embargo\_dates: array of string

List of dates (YYYY-MM-DD) when upgrades are blocked.

<a href="#">Link to this property</a>

interrupt\_window\_hour\_of\_day: number

<a href="#">Link to this property</a>

last\_updated: string

<a href="#">Link to this property</a>

notes: string

<a href="#">Link to this property</a>

primary: boolean

<a href="#">Link to this property</a>

timezone: string

<a href="#">Link to this property</a>

<details>

<summary>

device: optional object {id, serial\_number, type }

</summary>

id: string

<a href="#">Link to this property</a>

serial\_number: optional string

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "MANAGED"or "LICENSED"

</summary>

One of the following:

"MANAGED"

<a href="#">Link to this property</a>

"LICENSED"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

last\_heartbeat: optional string

<a href="#">Link to this property</a>

last\_seen\_version: optional string

<a href="#">Link to this property</a>

license\_key: optional string

<a href="#">Link to this property</a>

site\_id: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.connectors%20%3E%20(model)%20connector_create_response%20%3E%20(schema)>)

<details>

<summary>

ConnectorUpdateResponse object {id, activated, interrupt\_window\_days\_of\_week, 12 more }

</summary>

id: string

<a href="#">Link to this property</a>

activated: boolean

<a href="#">Link to this property</a>

<details>

<summary>

interrupt\_window\_days\_of\_week: array of "Sunday"or "Monday"or "Tuesday"or 4 more

Allowed days of the week for upgrades. Default is all days.

</summary>

One of the following:

"Sunday"

<a href="#">Link to this property</a>

"Monday"

<a href="#">Link to this property</a>

"Tuesday"

<a href="#">Link to this property</a>

"Wednesday"

<a href="#">Link to this property</a>

"Thursday"

<a href="#">Link to this property</a>

"Friday"

<a href="#">Link to this property</a>

"Saturday"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

interrupt\_window\_duration\_hours: number

maximum24

minimum1

<a href="#">Link to this property</a>

interrupt\_window\_embargo\_dates: array of string

List of dates (YYYY-MM-DD) when upgrades are blocked.

<a href="#">Link to this property</a>

interrupt\_window\_hour\_of\_day: number

<a href="#">Link to this property</a>

last\_updated: string

<a href="#">Link to this property</a>

notes: string

<a href="#">Link to this property</a>

primary: boolean

<a href="#">Link to this property</a>

timezone: string

<a href="#">Link to this property</a>

<details>

<summary>

device: optional object {id, serial\_number, type }

</summary>

id: string

<a href="#">Link to this property</a>

serial\_number: optional string

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "MANAGED"or "LICENSED"

</summary>

One of the following:

"MANAGED"

<a href="#">Link to this property</a>

"LICENSED"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

last\_heartbeat: optional string

<a href="#">Link to this property</a>

last\_seen\_version: optional string

<a href="#">Link to this property</a>

license\_key: optional string

<a href="#">Link to this property</a>

site\_id: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.connectors%20%3E%20(model)%20connector_update_response%20%3E%20(schema)>)

<details>

<summary>

ConnectorEditResponse object {id, activated, interrupt\_window\_days\_of\_week, 12 more }

</summary>

id: string

<a href="#">Link to this property</a>

activated: boolean

<a href="#">Link to this property</a>

<details>

<summary>

interrupt\_window\_days\_of\_week: array of "Sunday"or "Monday"or "Tuesday"or 4 more

Allowed days of the week for upgrades. Default is all days.

</summary>

One of the following:

"Sunday"

<a href="#">Link to this property</a>

"Monday"

<a href="#">Link to this property</a>

"Tuesday"

<a href="#">Link to this property</a>

"Wednesday"

<a href="#">Link to this property</a>

"Thursday"

<a href="#">Link to this property</a>

"Friday"

<a href="#">Link to this property</a>

"Saturday"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

interrupt\_window\_duration\_hours: number

maximum24

minimum1

<a href="#">Link to this property</a>

interrupt\_window\_embargo\_dates: array of string

List of dates (YYYY-MM-DD) when upgrades are blocked.

<a href="#">Link to this property</a>

interrupt\_window\_hour\_of\_day: number

<a href="#">Link to this property</a>

last\_updated: string

<a href="#">Link to this property</a>

notes: string

<a href="#">Link to this property</a>

primary: boolean

<a href="#">Link to this property</a>

timezone: string

<a href="#">Link to this property</a>

<details>

<summary>

device: optional object {id, serial\_number, type }

</summary>

id: string

<a href="#">Link to this property</a>

serial\_number: optional string

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "MANAGED"or "LICENSED"

</summary>

One of the following:

"MANAGED"

<a href="#">Link to this property</a>

"LICENSED"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

last\_heartbeat: optional string

<a href="#">Link to this property</a>

last\_seen\_version: optional string

<a href="#">Link to this property</a>

license\_key: optional string

<a href="#">Link to this property</a>

site\_id: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.connectors%20%3E%20(model)%20connector_edit_response%20%3E%20(schema)>)

<details>

<summary>

ConnectorDeleteResponse object {id, activated, interrupt\_window\_days\_of\_week, 12 more }

</summary>

id: string

<a href="#">Link to this property</a>

activated: boolean

<a href="#">Link to this property</a>

<details>

<summary>

interrupt\_window\_days\_of\_week: array of "Sunday"or "Monday"or "Tuesday"or 4 more

Allowed days of the week for upgrades. Default is all days.

</summary>

One of the following:

"Sunday"

<a href="#">Link to this property</a>

"Monday"

<a href="#">Link to this property</a>

"Tuesday"

<a href="#">Link to this property</a>

"Wednesday"

<a href="#">Link to this property</a>

"Thursday"

<a href="#">Link to this property</a>

"Friday"

<a href="#">Link to this property</a>

"Saturday"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

interrupt\_window\_duration\_hours: number

maximum24

minimum1

<a href="#">Link to this property</a>

interrupt\_window\_embargo\_dates: array of string

List of dates (YYYY-MM-DD) when upgrades are blocked.

<a href="#">Link to this property</a>

interrupt\_window\_hour\_of\_day: number

<a href="#">Link to this property</a>

last\_updated: string

<a href="#">Link to this property</a>

notes: string

<a href="#">Link to this property</a>

primary: boolean

<a href="#">Link to this property</a>

timezone: string

<a href="#">Link to this property</a>

<details>

<summary>

device: optional object {id, serial\_number, type }

</summary>

id: string

<a href="#">Link to this property</a>

serial\_number: optional string

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "MANAGED"or "LICENSED"

</summary>

One of the following:

"MANAGED"

<a href="#">Link to this property</a>

"LICENSED"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

last\_heartbeat: optional string

<a href="#">Link to this property</a>

last\_seen\_version: optional string

<a href="#">Link to this property</a>

license\_key: optional string

<a href="#">Link to this property</a>

site\_id: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.connectors%20%3E%20(model)%20connector_delete_response%20%3E%20(schema)>)

#### Magic TransitConnectorsInterrupts

##### [List Interrupts](https://developers.cloudflare.com/api/resources/magic_transit/subresources/connectors/subresources/interrupts/methods/list)

GET/accounts/{account\_id}/magic/connectors/{connector\_id}/interrupts

##### [Create Interrupt](https://developers.cloudflare.com/api/resources/magic_transit/subresources/connectors/subresources/interrupts/methods/create)

POST/accounts/{account\_id}/magic/connectors/{connector\_id}/interrupts

##### ModelsExpand Collapse

<details>

<summary>

InterruptListResponse object {submitted\_at, reboot, restart, 2 more }

Interrupt action for a connector.

</summary>

submitted\_at: string

<a href="#">Link to this property</a>

<details>

<summary>

reboot: optional object {purge }

</summary>

purge: optional boolean

Purge connector state.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

restart: optional object {purge }

</summary>

purge: optional boolean

Purge connector state.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

shutdown: optional object {purge }

</summary>

purge: optional boolean

Purge connector state.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

triggered\_at: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.connectors.interrupts%20%3E%20(model)%20interrupt_list_response%20%3E%20(schema)>)

<details>

<summary>

InterruptCreateResponse object {submitted\_at, reboot, restart, 2 more }

Interrupt action for a connector.

</summary>

submitted\_at: string

<a href="#">Link to this property</a>

<details>

<summary>

reboot: optional object {purge }

</summary>

purge: optional boolean

Purge connector state.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

restart: optional object {purge }

</summary>

purge: optional boolean

Purge connector state.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

shutdown: optional object {purge }

</summary>

purge: optional boolean

Purge connector state.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

triggered\_at: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.connectors.interrupts%20%3E%20(model)%20interrupt_create_response%20%3E%20(schema)>)

#### Magic TransitConnectorsEvents

##### [List Events](https://developers.cloudflare.com/api/resources/magic_transit/subresources/connectors/subresources/events/methods/list)

GET/accounts/{account\_id}/magic/connectors/{connector\_id}/telemetry/events

##### [Get Event](https://developers.cloudflare.com/api/resources/magic_transit/subresources/connectors/subresources/events/methods/get)

GET/accounts/{account\_id}/magic/connectors/{connector\_id}/telemetry/events/{event\_t}.{event\_n}

##### ModelsExpand Collapse

<details>

<summary>

EventListResponse object {count, items, cursor }

</summary>

count: number

<a href="#">Link to this property</a>

<details>

<summary>

items: array of object {a, k, n, t }

</summary>

a: number

Time the Event was collected (seconds since the Unix epoch)

<a href="#">Link to this property</a>

k: string

Kind

<a href="#">Link to this property</a>

n: number

Sequence number, used to order events with the same timestamp

<a href="#">Link to this property</a>

t: number

Time the Event was recorded (seconds since the Unix epoch)

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

cursor: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.connectors.events%20%3E%20(model)%20event_list_response%20%3E%20(schema)>)

<details>

<summary>

EventGetResponse object {e, n, t, v }

Recorded Event

</summary>

<details>

<summary>

e: object {k }

Event kind plus event-specific payload fields.

Event kinds:

- <code>Init</code>: Initialized process
- <code>Leave</code>: Stopped process
- <code>StartAttestation</code>: Started attestation
- <code>FinishAttestationSuccess</code>: Finished attestation
- <code>FinishAttestationFailure</code>: Failed attestation
- <code>StartRotateCryptKey</code>: Started crypt key rotation
- <code>FinishRotateCryptKeySuccess</code>: Finished crypt key rotation
- <code>FinishRotateCryptKeyFailure</code>: Failed crypt key rotation
- <code>StartRotatePki</code>: Started PKI rotation
- <code>FinishRotatePkiSuccess</code>: Finished PKI rotation
- <code>FinishRotatePkiFailure</code>: Failed PKI rotation
- <code>StartUpgrade</code>: Started upgrade
- <code>FinishUpgradeSuccess</code>: Finished upgrade
- <code>FinishUpgradeFailure</code>: Failed upgrade
- <code>BlessSlotSuccess</code>: Blessed boot entry slot
- <code>BlessSlotPending</code>: Boot entry slot is not yet blessed
- <code>BlessSlotFailure</code>: Failed to bless boot entry slot
- <code>Reconcile</code>: Reconciled
- <code>ConfigureCloudflaredTunnel</code>: Configured Cloudflared tunnel
- <code>RekeyInstallBoth</code>: Installed initial inbound and outbound keys
- <code>RekeyStart</code>: Installed new inbound key, kept old outbound
- <code>RekeyRestart</code>: Restarted in-progress rekey with newer key material
- <code>RekeyAdvance</code>: Confirmed traffic on new inbound key, swapped outbound to new
- <code>RekeyComplete</code>: Deleted old keys
- <code>RekeyReset</code>: Deleted all keys after receiving an unexpected key
- <code>HaTransition</code>: Completed HA state transition
- <code>HaError</code>: Received unexpected HA error
- <code>HaInit</code>: Initialized HA subsystem
- <code>HaLeave</code>: Stopped HA subsystem

</summary>

<details>

<summary>

k: "Init"or "Leave"or "StartAttestation"or 26 more

Event kind

</summary>

One of the following:

"Init"

<a href="#">Link to this property</a>

"Leave"

<a href="#">Link to this property</a>

"StartAttestation"

<a href="#">Link to this property</a>

"FinishAttestationSuccess"

<a href="#">Link to this property</a>

"FinishAttestationFailure"

<a href="#">Link to this property</a>

"StartRotateCryptKey"

<a href="#">Link to this property</a>

"FinishRotateCryptKeySuccess"

<a href="#">Link to this property</a>

"FinishRotateCryptKeyFailure"

<a href="#">Link to this property</a>

"StartRotatePki"

<a href="#">Link to this property</a>

"FinishRotatePkiSuccess"

<a href="#">Link to this property</a>

"FinishRotatePkiFailure"

<a href="#">Link to this property</a>

"StartUpgrade"

<a href="#">Link to this property</a>

"FinishUpgradeSuccess"

<a href="#">Link to this property</a>

"FinishUpgradeFailure"

<a href="#">Link to this property</a>

"BlessSlotSuccess"

<a href="#">Link to this property</a>

"BlessSlotPending"

<a href="#">Link to this property</a>

"BlessSlotFailure"

<a href="#">Link to this property</a>

"Reconcile"

<a href="#">Link to this property</a>

"ConfigureCloudflaredTunnel"

<a href="#">Link to this property</a>

"RekeyInstallBoth"

<a href="#">Link to this property</a>

"RekeyStart"

<a href="#">Link to this property</a>

"RekeyRestart"

<a href="#">Link to this property</a>

"RekeyAdvance"

<a href="#">Link to this property</a>

"RekeyComplete"

<a href="#">Link to this property</a>

"RekeyReset"

<a href="#">Link to this property</a>

"HaTransition"

<a href="#">Link to this property</a>

"HaError"

<a href="#">Link to this property</a>

"HaInit"

<a href="#">Link to this property</a>

"HaLeave"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

n: number

Sequence number, used to order events with the same timestamp

<a href="#">Link to this property</a>

t: number

Time the Event was recorded (seconds since the Unix epoch)

<a href="#">Link to this property</a>

v: optional string

Version

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.connectors.events%20%3E%20(model)%20event_get_response%20%3E%20(schema)>)

#### Magic TransitConnectorsEventsLatest

##### [Get latest Events](https://developers.cloudflare.com/api/resources/magic_transit/subresources/connectors/subresources/events/subresources/latest/methods/list)

GET/accounts/{account\_id}/magic/connectors/{connector\_id}/telemetry/events/latest

##### ModelsExpand Collapse

<details>

<summary>

LatestListResponse object {count, items }

</summary>

count: number

<a href="#">Link to this property</a>

<details>

<summary>

items: array of object {e, n, t, v }

</summary>

<details>

<summary>

e: object {k }

Event kind plus event-specific payload fields.

Event kinds:

- <code>Init</code>: Initialized process
- <code>Leave</code>: Stopped process
- <code>StartAttestation</code>: Started attestation
- <code>FinishAttestationSuccess</code>: Finished attestation
- <code>FinishAttestationFailure</code>: Failed attestation
- <code>StartRotateCryptKey</code>: Started crypt key rotation
- <code>FinishRotateCryptKeySuccess</code>: Finished crypt key rotation
- <code>FinishRotateCryptKeyFailure</code>: Failed crypt key rotation
- <code>StartRotatePki</code>: Started PKI rotation
- <code>FinishRotatePkiSuccess</code>: Finished PKI rotation
- <code>FinishRotatePkiFailure</code>: Failed PKI rotation
- <code>StartUpgrade</code>: Started upgrade
- <code>FinishUpgradeSuccess</code>: Finished upgrade
- <code>FinishUpgradeFailure</code>: Failed upgrade
- <code>BlessSlotSuccess</code>: Blessed boot entry slot
- <code>BlessSlotPending</code>: Boot entry slot is not yet blessed
- <code>BlessSlotFailure</code>: Failed to bless boot entry slot
- <code>Reconcile</code>: Reconciled
- <code>ConfigureCloudflaredTunnel</code>: Configured Cloudflared tunnel
- <code>RekeyInstallBoth</code>: Installed initial inbound and outbound keys
- <code>RekeyStart</code>: Installed new inbound key, kept old outbound
- <code>RekeyRestart</code>: Restarted in-progress rekey with newer key material
- <code>RekeyAdvance</code>: Confirmed traffic on new inbound key, swapped outbound to new
- <code>RekeyComplete</code>: Deleted old keys
- <code>RekeyReset</code>: Deleted all keys after receiving an unexpected key
- <code>HaTransition</code>: Completed HA state transition
- <code>HaError</code>: Received unexpected HA error
- <code>HaInit</code>: Initialized HA subsystem
- <code>HaLeave</code>: Stopped HA subsystem

</summary>

<details>

<summary>

k: "Init"or "Leave"or "StartAttestation"or 26 more

Event kind

</summary>

One of the following:

"Init"

<a href="#">Link to this property</a>

"Leave"

<a href="#">Link to this property</a>

"StartAttestation"

<a href="#">Link to this property</a>

"FinishAttestationSuccess"

<a href="#">Link to this property</a>

"FinishAttestationFailure"

<a href="#">Link to this property</a>

"StartRotateCryptKey"

<a href="#">Link to this property</a>

"FinishRotateCryptKeySuccess"

<a href="#">Link to this property</a>

"FinishRotateCryptKeyFailure"

<a href="#">Link to this property</a>

"StartRotatePki"

<a href="#">Link to this property</a>

"FinishRotatePkiSuccess"

<a href="#">Link to this property</a>

"FinishRotatePkiFailure"

<a href="#">Link to this property</a>

"StartUpgrade"

<a href="#">Link to this property</a>

"FinishUpgradeSuccess"

<a href="#">Link to this property</a>

"FinishUpgradeFailure"

<a href="#">Link to this property</a>

"BlessSlotSuccess"

<a href="#">Link to this property</a>

"BlessSlotPending"

<a href="#">Link to this property</a>

"BlessSlotFailure"

<a href="#">Link to this property</a>

"Reconcile"

<a href="#">Link to this property</a>

"ConfigureCloudflaredTunnel"

<a href="#">Link to this property</a>

"RekeyInstallBoth"

<a href="#">Link to this property</a>

"RekeyStart"

<a href="#">Link to this property</a>

"RekeyRestart"

<a href="#">Link to this property</a>

"RekeyAdvance"

<a href="#">Link to this property</a>

"RekeyComplete"

<a href="#">Link to this property</a>

"RekeyReset"

<a href="#">Link to this property</a>

"HaTransition"

<a href="#">Link to this property</a>

"HaError"

<a href="#">Link to this property</a>

"HaInit"

<a href="#">Link to this property</a>

"HaLeave"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

n: number

Sequence number, used to order events with the same timestamp

<a href="#">Link to this property</a>

t: number

Time the Event was recorded (seconds since the Unix epoch)

<a href="#">Link to this property</a>

v: optional string

Version

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.connectors.events.latest%20%3E%20(model)%20latest_list_response%20%3E%20(schema)>)

#### Magic TransitConnectorsSnapshots

##### [List Snapshots](https://developers.cloudflare.com/api/resources/magic_transit/subresources/connectors/subresources/snapshots/methods/list)

GET/accounts/{account\_id}/magic/connectors/{connector\_id}/telemetry/snapshots

##### [Get Snapshot](https://developers.cloudflare.com/api/resources/magic_transit/subresources/connectors/subresources/snapshots/methods/get)

GET/accounts/{account\_id}/magic/connectors/{connector\_id}/telemetry/snapshots/{snapshot\_t}

##### ModelsExpand Collapse

<details>

<summary>

SnapshotListResponse object {count, items, cursor }

</summary>

count: number

<a href="#">Link to this property</a>

<details>

<summary>

items: array of object {a, t }

</summary>

a: number

Time the Snapshot was collected (seconds since the Unix epoch)

<a href="#">Link to this property</a>

t: number

Time the Snapshot was recorded (seconds since the Unix epoch)

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

cursor: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.connectors.snapshots%20%3E%20(model)%20snapshot_list_response%20%3E%20(schema)>)

<details>

<summary>

SnapshotGetResponse object {count\_reclaim\_failures, count\_reclaimed\_paths, count\_record\_failed, 172 more }

Snapshot

</summary>

count\_reclaim\_failures: number

Count of failures to reclaim space

<a href="#">Link to this property</a>

count\_reclaimed\_paths: number

Count of reclaimed paths

<a href="#">Link to this property</a>

count\_record\_failed: number

Count of failed snapshot recordings

<a href="#">Link to this property</a>

count\_transmit\_failures: number

Count of failed snapshot transmissions

<a href="#">Link to this property</a>

t: number

Time the Snapshot was recorded (seconds since the Unix epoch)

<a href="#">Link to this property</a>

v: string

Version

<a href="#">Link to this property</a>

<details>

<summary>

bonds: optional array of object {name, status }

</summary>

name: string

Name of the network interface

<a href="#">Link to this property</a>

status: string

Current status of the network interface

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

cpu\_count: optional number

Count of processors/cores

<a href="#">Link to this property</a>

cpu\_pressure\_10s: optional number

Percentage of time over a 10 second window that tasks were stalled

<a href="#">Link to this property</a>

cpu\_pressure\_300s: optional number

Percentage of time over a 5 minute window that tasks were stalled

<a href="#">Link to this property</a>

cpu\_pressure\_60s: optional number

Percentage of time over a 1 minute window that tasks were stalled

<a href="#">Link to this property</a>

cpu\_pressure\_total\_us: optional number

Total stall time (microseconds)

<a href="#">Link to this property</a>

cpu\_time\_guest\_ms: optional number

Time spent running a virtual CPU or guest OS (milliseconds)

<a href="#">Link to this property</a>

cpu\_time\_guest\_nice\_ms: optional number

Time spent running a niced guest (milliseconds)

<a href="#">Link to this property</a>

cpu\_time\_idle\_ms: optional number

Time spent in idle state (milliseconds)

<a href="#">Link to this property</a>

cpu\_time\_iowait\_ms: optional number

Time spent wait for I/O to complete (milliseconds)

<a href="#">Link to this property</a>

cpu\_time\_irq\_ms: optional number

Time spent servicing interrupts (milliseconds)

<a href="#">Link to this property</a>

cpu\_time\_nice\_ms: optional number

Time spent in low-priority user mode (milliseconds)

<a href="#">Link to this property</a>

cpu\_time\_softirq\_ms: optional number

Time spent servicing softirqs (milliseconds)

<a href="#">Link to this property</a>

cpu\_time\_steal\_ms: optional number

Time stolen (milliseconds)

<a href="#">Link to this property</a>

cpu\_time\_system\_ms: optional number

Time spent in system mode (milliseconds)

<a href="#">Link to this property</a>

cpu\_time\_user\_ms: optional number

Time spent in user mode (milliseconds)

<a href="#">Link to this property</a>

delta: optional number

Number of network operations applied during state transition

<a href="#">Link to this property</a>

<details>

<summary>

dhcp\_leases: optional array of object {client\_id, expiry\_time, hostname, 3 more }

</summary>

client\_id: string

Client ID of the device the IP Address was leased to

<a href="#">Link to this property</a>

expiry\_time: number

Expiry time of the DHCP lease (seconds since the Unix epoch)

<a href="#">Link to this property</a>

hostname: string

Hostname of the device the IP Address was leased to

<a href="#">Link to this property</a>

interface\_name: string

Name of the network interface

<a href="#">Link to this property</a>

ip\_address: string

IP Address that was leased

<a href="#">Link to this property</a>

mac\_address: string

MAC Address of the device the IP Address was leased to

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

disks: optional array of object {in\_progress, major, merged, 17 more }

</summary>

in\_progress: number

I/Os currently in progress

<a href="#">Link to this property</a>

major: number

Device major number

<a href="#">Link to this property</a>

merged: number

Reads merged

<a href="#">Link to this property</a>

minor: number

Device minor number

<a href="#">Link to this property</a>

name: string

Device name

<a href="#">Link to this property</a>

reads: number

Reads completed successfully

<a href="#">Link to this property</a>

sectors\_read: number

Sectors read successfully

<a href="#">Link to this property</a>

sectors\_written: number

Sectors written successfully

<a href="#">Link to this property</a>

time\_in\_progress\_ms: number

Time spent doing I/Os (milliseconds)

<a href="#">Link to this property</a>

time\_reading\_ms: number

Time spent reading (milliseconds)

<a href="#">Link to this property</a>

time\_writing\_ms: number

Time spent writing (milliseconds)

<a href="#">Link to this property</a>

weighted\_time\_in\_progress\_ms: number

Weighted time spent doing I/Os (milliseconds)

<a href="#">Link to this property</a>

writes: number

Writes completed

<a href="#">Link to this property</a>

writes\_merged: number

Writes merged

<a href="#">Link to this property</a>

discards: optional number

Discards completed successfully

<a href="#">Link to this property</a>

discards\_merged: optional number

Discards merged

<a href="#">Link to this property</a>

flushes: optional number

Flushes completed successfully

<a href="#">Link to this property</a>

sectors\_discarded: optional number

Sectors discarded

<a href="#">Link to this property</a>

time\_discarding\_ms: optional number

Time spent discarding (milliseconds)

<a href="#">Link to this property</a>

time\_flushing\_ms: optional number

Time spent flushing (milliseconds)

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

epsilon: optional number

Simulated number of network operations applied during state transition

<a href="#">Link to this property</a>

ha\_state: optional string

Name of high availability state

<a href="#">Link to this property</a>

ha\_value: optional number

Numeric value associated with high availability state (0 = disabled, 1 = active, 2 = standby, 3 = stopped, 4 = fault)

<a href="#">Link to this property</a>

<details>

<summary>

interfaces: optional array of object {name, operstate, ip\_addresses, speed }

</summary>

name: string

Name of the network interface

<a href="#">Link to this property</a>

operstate: string

UP/DOWN state of the network interface

<a href="#">Link to this property</a>

<details>

<summary>

ip\_addresses: optional array of object {interface\_name, ip\_address }

</summary>

interface\_name: string

Name of the network interface

<a href="#">Link to this property</a>

ip\_address: string

IP address of the network interface

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

speed: optional number

Speed of the network interface (bits per second)

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

io\_pressure\_full\_10s: optional number

Percentage of time over a 10 second window that all tasks were stalled

<a href="#">Link to this property</a>

io\_pressure\_full\_300s: optional number

Percentage of time over a 5 minute window that all tasks were stalled

<a href="#">Link to this property</a>

io\_pressure\_full\_60s: optional number

Percentage of time over a 1 minute window that all tasks were stalled

<a href="#">Link to this property</a>

io\_pressure\_full\_total\_us: optional number

Total stall time (microseconds)

<a href="#">Link to this property</a>

io\_pressure\_some\_10s: optional number

Percentage of time over a 10 second window that some tasks were stalled

<a href="#">Link to this property</a>

io\_pressure\_some\_300s: optional number

Percentage of time over a 3 minute window that some tasks were stalled

<a href="#">Link to this property</a>

io\_pressure\_some\_60s: optional number

Percentage of time over a 1 minute window that some tasks were stalled

<a href="#">Link to this property</a>

io\_pressure\_some\_total\_us: optional number

Total stall time (microseconds)

<a href="#">Link to this property</a>

kernel\_btime: optional number

Boot time (seconds since Unix epoch)

<a href="#">Link to this property</a>

kernel\_ctxt: optional number

Number of context switches that the system underwent

<a href="#">Link to this property</a>

kernel\_processes: optional number

Number of forks since boot

<a href="#">Link to this property</a>

kernel\_processes\_blocked: optional number

Number of processes blocked waiting for I/O

<a href="#">Link to this property</a>

kernel\_processes\_running: optional number

Number of processes in runnable state

<a href="#">Link to this property</a>

load\_average\_15m: optional number

The fifteen-minute load average

<a href="#">Link to this property</a>

load\_average\_1m: optional number

The one-minute load average

<a href="#">Link to this property</a>

load\_average\_5m: optional number

The five-minute load average

<a href="#">Link to this property</a>

load\_average\_cur: optional number

Number of currently runnable kernel scheduling entities

<a href="#">Link to this property</a>

load\_average\_max: optional number

Number of kernel scheduling entities that currently exist on the system

<a href="#">Link to this property</a>

memory\_active\_bytes: optional number

Memory that has been used more recently

<a href="#">Link to this property</a>

memory\_anon\_hugepages\_bytes: optional number

Non-file backed huge pages mapped into user-space page tables

<a href="#">Link to this property</a>

memory\_anon\_pages\_bytes: optional number

Non-file backed pages mapped into user-space page tables

<a href="#">Link to this property</a>

memory\_available\_bytes: optional number

Estimate of how much memory is available for starting new applications

<a href="#">Link to this property</a>

memory\_bounce\_bytes: optional number

Memory used for block device bounce buffers

<a href="#">Link to this property</a>

memory\_buffers\_bytes: optional number

Relatively temporary storage for raw disk blocks

<a href="#">Link to this property</a>

memory\_cached\_bytes: optional number

In-memory cache for files read from the disk

<a href="#">Link to this property</a>

memory\_cma\_free\_bytes: optional number

Free CMA (Contiguous Memory Allocator) pages

<a href="#">Link to this property</a>

memory\_cma\_total\_bytes: optional number

Total CMA (Contiguous Memory Allocator) pages

<a href="#">Link to this property</a>

memory\_commit\_limit\_bytes: optional number

Total amount of memory currently available to be allocated on the system

<a href="#">Link to this property</a>

memory\_committed\_as\_bytes: optional number

Amount of memory presently allocated on the system

<a href="#">Link to this property</a>

memory\_dirty\_bytes: optional number

Memory which is waiting to get written back to the disk

<a href="#">Link to this property</a>

memory\_free\_bytes: optional number

The sum of LowFree and HighFree

<a href="#">Link to this property</a>

memory\_high\_free\_bytes: optional number

Amount of free highmem

<a href="#">Link to this property</a>

memory\_high\_total\_bytes: optional number

Total amount of highmem

<a href="#">Link to this property</a>

memory\_hugepages\_free: optional number

The number of huge pages in the pool that are not yet allocated

<a href="#">Link to this property</a>

memory\_hugepages\_rsvd: optional number

Number of huge pages for which a commitment has been made, but no allocation has yet been made

<a href="#">Link to this property</a>

memory\_hugepages\_surp: optional number

Number of huge pages in the pool above the threshold

<a href="#">Link to this property</a>

memory\_hugepages\_total: optional number

The size of the pool of huge pages

<a href="#">Link to this property</a>

memory\_hugepagesize\_bytes: optional number

The size of huge pages

<a href="#">Link to this property</a>

memory\_inactive\_bytes: optional number

Memory which has been less recently used

<a href="#">Link to this property</a>

memory\_k\_reclaimable\_bytes: optional number

Kernel allocations that the kernel will attempt to reclaim under memory pressure

<a href="#">Link to this property</a>

memory\_kernel\_stack\_bytes: optional number

Amount of memory allocated to kernel stacks

<a href="#">Link to this property</a>

memory\_low\_free\_bytes: optional number

Amount of free lowmem

<a href="#">Link to this property</a>

memory\_low\_total\_bytes: optional number

Total amount of lowmem

<a href="#">Link to this property</a>

memory\_mapped\_bytes: optional number

Files which have been mapped into memory

<a href="#">Link to this property</a>

memory\_page\_tables\_bytes: optional number

Amount of memory dedicated to the lowest level of page tables

<a href="#">Link to this property</a>

memory\_per\_cpu\_bytes: optional number

Memory allocated to the per-cpu alloctor used to back per-cpu allocations

<a href="#">Link to this property</a>

memory\_pressure\_full\_10s: optional number

Percentage of time over a 10 second window that all tasks were stalled

<a href="#">Link to this property</a>

memory\_pressure\_full\_300s: optional number

Percentage of time over a 5 minute window that all tasks were stalled

<a href="#">Link to this property</a>

memory\_pressure\_full\_60s: optional number

Percentage of time over a 1 minute window that all tasks were stalled

<a href="#">Link to this property</a>

memory\_pressure\_full\_total\_us: optional number

Total stall time (microseconds)

<a href="#">Link to this property</a>

memory\_pressure\_some\_10s: optional number

Percentage of time over a 10 second window that some tasks were stalled

<a href="#">Link to this property</a>

memory\_pressure\_some\_300s: optional number

Percentage of time over a 5 minute window that some tasks were stalled

<a href="#">Link to this property</a>

memory\_pressure\_some\_60s: optional number

Percentage of time over a 1 minute window that some tasks were stalled

<a href="#">Link to this property</a>

memory\_pressure\_some\_total\_us: optional number

Total stall time (microseconds)

<a href="#">Link to this property</a>

memory\_s\_reclaimable\_bytes: optional number

Part of slab that can be reclaimed on memory pressure

<a href="#">Link to this property</a>

memory\_s\_unreclaim\_bytes: optional number

Part of slab that cannot be reclaimed on memory pressure

<a href="#">Link to this property</a>

memory\_secondary\_page\_tables\_bytes: optional number

Amount of memory dedicated to the lowest level of page tables

<a href="#">Link to this property</a>

memory\_shmem\_bytes: optional number

Amount of memory consumed by tmpfs

<a href="#">Link to this property</a>

memory\_shmem\_hugepages\_bytes: optional number

Memory used by shmem and tmpfs, allocated with huge pages

<a href="#">Link to this property</a>

memory\_shmem\_pmd\_mapped\_bytes: optional number

Shared memory mapped into user space with huge pages

<a href="#">Link to this property</a>

memory\_slab\_bytes: optional number

In-kernel data structures cache

<a href="#">Link to this property</a>

memory\_swap\_cached\_bytes: optional number

Memory swapped out and back in while still in swap file

<a href="#">Link to this property</a>

memory\_swap\_free\_bytes: optional number

Amount of swap space that is currently unused

<a href="#">Link to this property</a>

memory\_swap\_total\_bytes: optional number

Total amount of swap space available

<a href="#">Link to this property</a>

memory\_total\_bytes: optional number

Total usable RAM

<a href="#">Link to this property</a>

memory\_vmalloc\_chunk\_bytes: optional number

Largest contiguous block of vmalloc area which is free

<a href="#">Link to this property</a>

memory\_vmalloc\_total\_bytes: optional number

Total size of vmalloc memory area

<a href="#">Link to this property</a>

memory\_vmalloc\_used\_bytes: optional number

Amount of vmalloc area which is used

<a href="#">Link to this property</a>

memory\_writeback\_bytes: optional number

Memory which is actively being written back to the disk

<a href="#">Link to this property</a>

memory\_writeback\_tmp\_bytes: optional number

Memory used by FUSE for temporary writeback buffers

<a href="#">Link to this property</a>

memory\_z\_swap\_bytes: optional number

Memory consumed by the zswap backend, compressed

<a href="#">Link to this property</a>

memory\_z\_swapped\_bytes: optional number

Amount of anonymous memory stored in zswap, uncompressed

<a href="#">Link to this property</a>

<details>

<summary>

mounts: optional array of object {file\_system, kind, mount\_point, 7 more }

</summary>

file\_system: string

File system on disk (EXT4, NTFS, etc.)

<a href="#">Link to this property</a>

kind: string

Kind of disk (HDD, SSD, etc.)

<a href="#">Link to this property</a>

mount\_point: string

Path where disk is mounted

<a href="#">Link to this property</a>

name: string

Name of the disk mount

<a href="#">Link to this property</a>

available\_bytes: optional number

Available disk size (bytes)

<a href="#">Link to this property</a>

available\_inodes: optional number

Available inodes on filesystem

<a href="#">Link to this property</a>

is\_read\_only: optional boolean

Determines whether the disk is read-only

<a href="#">Link to this property</a>

is\_removable: optional boolean

Determines whether the disk is removable

<a href="#">Link to this property</a>

total\_bytes: optional number

Total disk size (bytes)

<a href="#">Link to this property</a>

total\_inodes: optional number

Total inodes on filesystem

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

netdevs: optional array of object {name, recv\_bytes, recv\_compressed, 14 more }

</summary>

name: string

Name of the network device

<a href="#">Link to this property</a>

recv\_bytes: number

Total bytes received

<a href="#">Link to this property</a>

recv\_compressed: number

Compressed packets received

<a href="#">Link to this property</a>

recv\_drop: number

Packets dropped

<a href="#">Link to this property</a>

recv\_errs: number

Bad packets received

<a href="#">Link to this property</a>

recv\_fifo: number

FIFO overruns

<a href="#">Link to this property</a>

recv\_frame: number

Frame alignment errors

<a href="#">Link to this property</a>

recv\_multicast: number

Multicast packets received

<a href="#">Link to this property</a>

recv\_packets: number

Total packets received

<a href="#">Link to this property</a>

sent\_bytes: number

Total bytes transmitted

<a href="#">Link to this property</a>

sent\_carrier: number

Number of packets not sent due to carrier errors

<a href="#">Link to this property</a>

sent\_colls: number

Number of collisions

<a href="#">Link to this property</a>

sent\_compressed: number

Number of compressed packets transmitted

<a href="#">Link to this property</a>

sent\_drop: number

Number of packets dropped during transmission

<a href="#">Link to this property</a>

sent\_errs: number

Number of transmission errors

<a href="#">Link to this property</a>

sent\_fifo: number

FIFO overruns

<a href="#">Link to this property</a>

sent\_packets: number

Total packets transmitted

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

platform: optional string

Platform identifier

<a href="#">Link to this property</a>

<details>

<summary>

routes: optional array of object {destination, interface\_name, kind, 3 more }

</summary>

destination: string

Route destination as default or an IPv4 CIDR

<a href="#">Link to this property</a>

interface\_name: string

Interface used by the next hop

<a href="#">Link to this property</a>

kind: string

Routing decision type: tunnel, breakout, or lan

<a href="#">Link to this property</a>

metric: number

Route metric; lower metrics are preferred

<a href="#">Link to this property</a>

gateway: optional string

Gateway address for the next hop

<a href="#">Link to this property</a>

weight: optional number

Relative weight within an equal-cost route

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

site\_id: optional string

Site identifier

<a href="#">Link to this property</a>

snmp\_icmp\_in\_addr\_mask\_reps: optional number

Number of ICMP Address Mask Reply messages received

<a href="#">Link to this property</a>

snmp\_icmp\_in\_addr\_masks: optional number

Number of ICMP Address Mask Request messages received

<a href="#">Link to this property</a>

snmp\_icmp\_in\_csum\_errors: optional number

Number of ICMP messages received with bad checksums

<a href="#">Link to this property</a>

snmp\_icmp\_in\_dest\_unreachs: optional number

Number of ICMP Destination Unreachable messages received

<a href="#">Link to this property</a>

snmp\_icmp\_in\_echo\_reps: optional number

Number of ICMP Echo Reply messages received

<a href="#">Link to this property</a>

snmp\_icmp\_in\_echos: optional number

Number of ICMP Echo (request) messages received

<a href="#">Link to this property</a>

snmp\_icmp\_in\_errors: optional number

Number of ICMP messages received with ICMP-specific errors

<a href="#">Link to this property</a>

snmp\_icmp\_in\_msgs: optional number

Number of ICMP messages received

<a href="#">Link to this property</a>

snmp\_icmp\_in\_parm\_probs: optional number

Number of ICMP Parameter Problem messages received

<a href="#">Link to this property</a>

snmp\_icmp\_in\_redirects: optional number

Number of ICMP Redirect messages received

<a href="#">Link to this property</a>

snmp\_icmp\_in\_src\_quenchs: optional number

Number of ICMP Source Quench messages received

<a href="#">Link to this property</a>

snmp\_icmp\_in\_time\_excds: optional number

Number of ICMP Time Exceeded messages received

<a href="#">Link to this property</a>

snmp\_icmp\_in\_timestamp\_reps: optional number

Number of ICMP Address Mask Request messages received

<a href="#">Link to this property</a>

snmp\_icmp\_in\_timestamps: optional number

Number of ICMP Timestamp (request) messages received

<a href="#">Link to this property</a>

snmp\_icmp\_out\_addr\_mask\_reps: optional number

Number of ICMP Address Mask Reply messages sent

<a href="#">Link to this property</a>

snmp\_icmp\_out\_addr\_masks: optional number

Number of ICMP Address Mask Request messages sent

<a href="#">Link to this property</a>

snmp\_icmp\_out\_dest\_unreachs: optional number

Number of ICMP Destination Unreachable messages sent

<a href="#">Link to this property</a>

snmp\_icmp\_out\_echo\_reps: optional number

Number of ICMP Echo Reply messages sent

<a href="#">Link to this property</a>

snmp\_icmp\_out\_echos: optional number

Number of ICMP Echo (request) messages sent

<a href="#">Link to this property</a>

snmp\_icmp\_out\_errors: optional number

Number of ICMP messages which this entity did not send due to ICMP-specific errors

<a href="#">Link to this property</a>

snmp\_icmp\_out\_msgs: optional number

Number of ICMP messages attempted to send

<a href="#">Link to this property</a>

snmp\_icmp\_out\_parm\_probs: optional number

Number of ICMP Parameter Problem messages sent

<a href="#">Link to this property</a>

snmp\_icmp\_out\_redirects: optional number

Number of ICMP Redirect messages sent

<a href="#">Link to this property</a>

snmp\_icmp\_out\_src\_quenchs: optional number

Number of ICMP Source Quench messages sent

<a href="#">Link to this property</a>

snmp\_icmp\_out\_time\_excds: optional number

Number of ICMP Time Exceeded messages sent

<a href="#">Link to this property</a>

snmp\_icmp\_out\_timestamp\_reps: optional number

Number of ICMP Timestamp Reply messages sent

<a href="#">Link to this property</a>

snmp\_icmp\_out\_timestamps: optional number

Number of ICMP Timestamp (request) messages sent

<a href="#">Link to this property</a>

snmp\_ip\_default\_ttl: optional number

Default value of the Time-To-Live field of the IP header

<a href="#">Link to this property</a>

snmp\_ip\_forw\_datagrams: optional number

Number of datagrams forwarded to their final destination

<a href="#">Link to this property</a>

snmp\_ip\_forwarding\_enabled: optional boolean

Set when acting as an IP gateway

<a href="#">Link to this property</a>

snmp\_ip\_frag\_creates: optional number

Number of datagrams generated by fragmentation

<a href="#">Link to this property</a>

snmp\_ip\_frag\_fails: optional number

Number of datagrams discarded because fragmentation failed

<a href="#">Link to this property</a>

snmp\_ip\_frag\_oks: optional number

Number of datagrams successfully fragmented

<a href="#">Link to this property</a>

snmp\_ip\_in\_addr\_errors: optional number

Number of input datagrams discarded due to errors in the IP address

<a href="#">Link to this property</a>

snmp\_ip\_in\_delivers: optional number

Number of input datagrams successfully delivered to IP user-protocols

<a href="#">Link to this property</a>

snmp\_ip\_in\_discards: optional number

Number of input datagrams otherwise discarded

<a href="#">Link to this property</a>

snmp\_ip\_in\_hdr\_errors: optional number

Number of input datagrams discarded due to errors in the IP header

<a href="#">Link to this property</a>

snmp\_ip\_in\_receives: optional number

Number of input datagrams received from interfaces

<a href="#">Link to this property</a>

snmp\_ip\_in\_unknown\_protos: optional number

Number of input datagrams discarded due unknown or unsupported protocol

<a href="#">Link to this property</a>

snmp\_ip\_out\_discards: optional number

Number of output datagrams otherwise discarded

<a href="#">Link to this property</a>

snmp\_ip\_out\_no\_routes: optional number

Number of output datagrams discarded because no route matched

<a href="#">Link to this property</a>

snmp\_ip\_out\_requests: optional number

Number of datagrams supplied for transmission

<a href="#">Link to this property</a>

snmp\_ip\_reasm\_fails: optional number

Number of failures detected by the reassembly algorithm

<a href="#">Link to this property</a>

snmp\_ip\_reasm\_oks: optional number

Number of datagrams successfully reassembled

<a href="#">Link to this property</a>

snmp\_ip\_reasm\_reqds: optional number

Number of fragments received which needed to be reassembled

<a href="#">Link to this property</a>

snmp\_ip\_reasm\_timeout: optional number

Number of seconds fragments are held while awaiting reassembly

<a href="#">Link to this property</a>

snmp\_tcp\_active\_opens: optional number

Number of times TCP transitions to SYN-SENT from CLOSED

<a href="#">Link to this property</a>

snmp\_tcp\_attempt\_fails: optional number

Number of times TCP transitions to CLOSED from SYN-SENT or SYN-RCVD, plus transitions to LISTEN from SYN-RCVD

<a href="#">Link to this property</a>

snmp\_tcp\_curr\_estab: optional number

Number of TCP connections in ESTABLISHED or CLOSE-WAIT

<a href="#">Link to this property</a>

snmp\_tcp\_estab\_resets: optional number

Number of times TCP transitions to CLOSED from ESTABLISHED or CLOSE-WAIT

<a href="#">Link to this property</a>

snmp\_tcp\_in\_csum\_errors: optional number

Number of TCP segments received with checksum errors

<a href="#">Link to this property</a>

snmp\_tcp\_in\_errs: optional number

Number of TCP segments received in error

<a href="#">Link to this property</a>

snmp\_tcp\_in\_segs: optional number

Number of TCP segments received

<a href="#">Link to this property</a>

snmp\_tcp\_max\_conn: optional number

Limit on the total number of TCP connections

<a href="#">Link to this property</a>

snmp\_tcp\_out\_rsts: optional number

Number of TCP segments sent with RST flag

<a href="#">Link to this property</a>

snmp\_tcp\_out\_segs: optional number

Number of TCP segments sent

<a href="#">Link to this property</a>

snmp\_tcp\_passive\_opens: optional number

Number of times TCP transitions to SYN-RCVD from LISTEN

<a href="#">Link to this property</a>

snmp\_tcp\_retrans\_segs: optional number

Number of TCP segments retransmitted

<a href="#">Link to this property</a>

snmp\_tcp\_rto\_max: optional number

Maximum value permitted by a TCP implementation for the retransmission timeout (milliseconds)

<a href="#">Link to this property</a>

snmp\_tcp\_rto\_min: optional number

Minimum value permitted by a TCP implementation for the retransmission timeout (milliseconds)

<a href="#">Link to this property</a>

snmp\_udp\_in\_datagrams: optional number

Number of UDP datagrams delivered to UDP applications

<a href="#">Link to this property</a>

snmp\_udp\_in\_errors: optional number

Number of UDP datagrams failed to be delivered for reasons other than lack of application at the destination port

<a href="#">Link to this property</a>

snmp\_udp\_no\_ports: optional number

Number of UDP datagrams received for which there was not application at the destination port

<a href="#">Link to this property</a>

snmp\_udp\_out\_datagrams: optional number

Number of UDP datagrams sent

<a href="#">Link to this property</a>

system\_boot\_time\_s: optional number

Boottime of the system (seconds since the Unix epoch)

<a href="#">Link to this property</a>

<details>

<summary>

thermals: optional array of object {label, critical\_celcius, current\_celcius, max\_celcius }

</summary>

label: string

Sensor identifier for the component

<a href="#">Link to this property</a>

critical\_celcius: optional number

Critical failure temperature of the component (degrees Celsius)

<a href="#">Link to this property</a>

current\_celcius: optional number

Current temperature of the component (degrees Celsius)

<a href="#">Link to this property</a>

max\_celcius: optional number

Maximum temperature of the component (degrees Celsius)

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

tunnels: optional array of object {health\_state, health\_value, interface\_name, 9 more }

</summary>

health\_state: string

Name of tunnel health state (unknown, healthy, degraded, down)

<a href="#">Link to this property</a>

health\_value: number

Numeric value associated with tunnel state (0 = unknown, 1 = healthy, 2 = degraded, 3 = down)

<a href="#">Link to this property</a>

interface\_name: string

The tunnel interface name (i.e. xfrm1, xfrm3.99, etc.)

<a href="#">Link to this property</a>

tunnel\_id: string

Tunnel identifier

<a href="#">Link to this property</a>

jitter\_ms: optional number

Tunnel round-trip latency variation in milliseconds

<a href="#">Link to this property</a>

latency\_ms: optional number

50th percentile tunnel round-trip latency in milliseconds

<a href="#">Link to this property</a>

natd\_result: optional string

Public socket address returned by the NAT detector

<a href="#">Link to this property</a>

natd\_state: optional number

Numeric NAT detector state (0 = detected, 1 = missing result, 2 = stale result)

<a href="#">Link to this property</a>

natd\_target: optional string

Target socket address probed by the NAT detector, using the detector source port

<a href="#">Link to this property</a>

probed\_mtu: optional number

MTU as measured between the two ends of the tunnel

<a href="#">Link to this property</a>

recent\_healthy\_pings: optional number

Number of recent healthy pings for this tunnel

<a href="#">Link to this property</a>

recent\_unhealthy\_pings: optional number

Number of recent unhealthy pings for this tunnel

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

uptime\_idle\_ms: optional number

Sum of how much time each core has spent idle

<a href="#">Link to this property</a>

uptime\_total\_ms: optional number

Uptime of the system, including time spent in suspend

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.connectors.snapshots%20%3E%20(model)%20snapshot_get_response%20%3E%20(schema)>)

#### Magic TransitConnectorsSnapshotsLatest

##### [Get latest Snapshots](https://developers.cloudflare.com/api/resources/magic_transit/subresources/connectors/subresources/snapshots/subresources/latest/methods/list)

GET/accounts/{account\_id}/magic/connectors/{connector\_id}/telemetry/snapshots/latest

##### ModelsExpand Collapse

<details>

<summary>

LatestListResponse object {count, items }

</summary>

count: number

<a href="#">Link to this property</a>

<details>

<summary>

items: array of object {count\_reclaim\_failures, count\_reclaimed\_paths, count\_record\_failed, 172 more }

</summary>

count\_reclaim\_failures: number

Count of failures to reclaim space

<a href="#">Link to this property</a>

count\_reclaimed\_paths: number

Count of reclaimed paths

<a href="#">Link to this property</a>

count\_record\_failed: number

Count of failed snapshot recordings

<a href="#">Link to this property</a>

count\_transmit\_failures: number

Count of failed snapshot transmissions

<a href="#">Link to this property</a>

t: number

Time the Snapshot was recorded (seconds since the Unix epoch)

<a href="#">Link to this property</a>

v: string

Version

<a href="#">Link to this property</a>

<details>

<summary>

bonds: optional array of object {name, status }

</summary>

name: string

Name of the network interface

<a href="#">Link to this property</a>

status: string

Current status of the network interface

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

cpu\_count: optional number

Count of processors/cores

<a href="#">Link to this property</a>

cpu\_pressure\_10s: optional number

Percentage of time over a 10 second window that tasks were stalled

<a href="#">Link to this property</a>

cpu\_pressure\_300s: optional number

Percentage of time over a 5 minute window that tasks were stalled

<a href="#">Link to this property</a>

cpu\_pressure\_60s: optional number

Percentage of time over a 1 minute window that tasks were stalled

<a href="#">Link to this property</a>

cpu\_pressure\_total\_us: optional number

Total stall time (microseconds)

<a href="#">Link to this property</a>

cpu\_time\_guest\_ms: optional number

Time spent running a virtual CPU or guest OS (milliseconds)

<a href="#">Link to this property</a>

cpu\_time\_guest\_nice\_ms: optional number

Time spent running a niced guest (milliseconds)

<a href="#">Link to this property</a>

cpu\_time\_idle\_ms: optional number

Time spent in idle state (milliseconds)

<a href="#">Link to this property</a>

cpu\_time\_iowait\_ms: optional number

Time spent wait for I/O to complete (milliseconds)

<a href="#">Link to this property</a>

cpu\_time\_irq\_ms: optional number

Time spent servicing interrupts (milliseconds)

<a href="#">Link to this property</a>

cpu\_time\_nice\_ms: optional number

Time spent in low-priority user mode (milliseconds)

<a href="#">Link to this property</a>

cpu\_time\_softirq\_ms: optional number

Time spent servicing softirqs (milliseconds)

<a href="#">Link to this property</a>

cpu\_time\_steal\_ms: optional number

Time stolen (milliseconds)

<a href="#">Link to this property</a>

cpu\_time\_system\_ms: optional number

Time spent in system mode (milliseconds)

<a href="#">Link to this property</a>

cpu\_time\_user\_ms: optional number

Time spent in user mode (milliseconds)

<a href="#">Link to this property</a>

delta: optional number

Number of network operations applied during state transition

<a href="#">Link to this property</a>

<details>

<summary>

dhcp\_leases: optional array of object {client\_id, expiry\_time, hostname, 3 more }

</summary>

client\_id: string

Client ID of the device the IP Address was leased to

<a href="#">Link to this property</a>

expiry\_time: number

Expiry time of the DHCP lease (seconds since the Unix epoch)

<a href="#">Link to this property</a>

hostname: string

Hostname of the device the IP Address was leased to

<a href="#">Link to this property</a>

interface\_name: string

Name of the network interface

<a href="#">Link to this property</a>

ip\_address: string

IP Address that was leased

<a href="#">Link to this property</a>

mac\_address: string

MAC Address of the device the IP Address was leased to

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

disks: optional array of object {in\_progress, major, merged, 17 more }

</summary>

in\_progress: number

I/Os currently in progress

<a href="#">Link to this property</a>

major: number

Device major number

<a href="#">Link to this property</a>

merged: number

Reads merged

<a href="#">Link to this property</a>

minor: number

Device minor number

<a href="#">Link to this property</a>

name: string

Device name

<a href="#">Link to this property</a>

reads: number

Reads completed successfully

<a href="#">Link to this property</a>

sectors\_read: number

Sectors read successfully

<a href="#">Link to this property</a>

sectors\_written: number

Sectors written successfully

<a href="#">Link to this property</a>

time\_in\_progress\_ms: number

Time spent doing I/Os (milliseconds)

<a href="#">Link to this property</a>

time\_reading\_ms: number

Time spent reading (milliseconds)

<a href="#">Link to this property</a>

time\_writing\_ms: number

Time spent writing (milliseconds)

<a href="#">Link to this property</a>

weighted\_time\_in\_progress\_ms: number

Weighted time spent doing I/Os (milliseconds)

<a href="#">Link to this property</a>

writes: number

Writes completed

<a href="#">Link to this property</a>

writes\_merged: number

Writes merged

<a href="#">Link to this property</a>

discards: optional number

Discards completed successfully

<a href="#">Link to this property</a>

discards\_merged: optional number

Discards merged

<a href="#">Link to this property</a>

flushes: optional number

Flushes completed successfully

<a href="#">Link to this property</a>

sectors\_discarded: optional number

Sectors discarded

<a href="#">Link to this property</a>

time\_discarding\_ms: optional number

Time spent discarding (milliseconds)

<a href="#">Link to this property</a>

time\_flushing\_ms: optional number

Time spent flushing (milliseconds)

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

epsilon: optional number

Simulated number of network operations applied during state transition

<a href="#">Link to this property</a>

ha\_state: optional string

Name of high availability state

<a href="#">Link to this property</a>

ha\_value: optional number

Numeric value associated with high availability state (0 = disabled, 1 = active, 2 = standby, 3 = stopped, 4 = fault)

<a href="#">Link to this property</a>

<details>

<summary>

interfaces: optional array of object {name, operstate, ip\_addresses, speed }

</summary>

name: string

Name of the network interface

<a href="#">Link to this property</a>

operstate: string

UP/DOWN state of the network interface

<a href="#">Link to this property</a>

<details>

<summary>

ip\_addresses: optional array of object {interface\_name, ip\_address }

</summary>

interface\_name: string

Name of the network interface

<a href="#">Link to this property</a>

ip\_address: string

IP address of the network interface

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

speed: optional number

Speed of the network interface (bits per second)

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

io\_pressure\_full\_10s: optional number

Percentage of time over a 10 second window that all tasks were stalled

<a href="#">Link to this property</a>

io\_pressure\_full\_300s: optional number

Percentage of time over a 5 minute window that all tasks were stalled

<a href="#">Link to this property</a>

io\_pressure\_full\_60s: optional number

Percentage of time over a 1 minute window that all tasks were stalled

<a href="#">Link to this property</a>

io\_pressure\_full\_total\_us: optional number

Total stall time (microseconds)

<a href="#">Link to this property</a>

io\_pressure\_some\_10s: optional number

Percentage of time over a 10 second window that some tasks were stalled

<a href="#">Link to this property</a>

io\_pressure\_some\_300s: optional number

Percentage of time over a 3 minute window that some tasks were stalled

<a href="#">Link to this property</a>

io\_pressure\_some\_60s: optional number

Percentage of time over a 1 minute window that some tasks were stalled

<a href="#">Link to this property</a>

io\_pressure\_some\_total\_us: optional number

Total stall time (microseconds)

<a href="#">Link to this property</a>

kernel\_btime: optional number

Boot time (seconds since Unix epoch)

<a href="#">Link to this property</a>

kernel\_ctxt: optional number

Number of context switches that the system underwent

<a href="#">Link to this property</a>

kernel\_processes: optional number

Number of forks since boot

<a href="#">Link to this property</a>

kernel\_processes\_blocked: optional number

Number of processes blocked waiting for I/O

<a href="#">Link to this property</a>

kernel\_processes\_running: optional number

Number of processes in runnable state

<a href="#">Link to this property</a>

load\_average\_15m: optional number

The fifteen-minute load average

<a href="#">Link to this property</a>

load\_average\_1m: optional number

The one-minute load average

<a href="#">Link to this property</a>

load\_average\_5m: optional number

The five-minute load average

<a href="#">Link to this property</a>

load\_average\_cur: optional number

Number of currently runnable kernel scheduling entities

<a href="#">Link to this property</a>

load\_average\_max: optional number

Number of kernel scheduling entities that currently exist on the system

<a href="#">Link to this property</a>

memory\_active\_bytes: optional number

Memory that has been used more recently

<a href="#">Link to this property</a>

memory\_anon\_hugepages\_bytes: optional number

Non-file backed huge pages mapped into user-space page tables

<a href="#">Link to this property</a>

memory\_anon\_pages\_bytes: optional number

Non-file backed pages mapped into user-space page tables

<a href="#">Link to this property</a>

memory\_available\_bytes: optional number

Estimate of how much memory is available for starting new applications

<a href="#">Link to this property</a>

memory\_bounce\_bytes: optional number

Memory used for block device bounce buffers

<a href="#">Link to this property</a>

memory\_buffers\_bytes: optional number

Relatively temporary storage for raw disk blocks

<a href="#">Link to this property</a>

memory\_cached\_bytes: optional number

In-memory cache for files read from the disk

<a href="#">Link to this property</a>

memory\_cma\_free\_bytes: optional number

Free CMA (Contiguous Memory Allocator) pages

<a href="#">Link to this property</a>

memory\_cma\_total\_bytes: optional number

Total CMA (Contiguous Memory Allocator) pages

<a href="#">Link to this property</a>

memory\_commit\_limit\_bytes: optional number

Total amount of memory currently available to be allocated on the system

<a href="#">Link to this property</a>

memory\_committed\_as\_bytes: optional number

Amount of memory presently allocated on the system

<a href="#">Link to this property</a>

memory\_dirty\_bytes: optional number

Memory which is waiting to get written back to the disk

<a href="#">Link to this property</a>

memory\_free\_bytes: optional number

The sum of LowFree and HighFree

<a href="#">Link to this property</a>

memory\_high\_free\_bytes: optional number

Amount of free highmem

<a href="#">Link to this property</a>

memory\_high\_total\_bytes: optional number

Total amount of highmem

<a href="#">Link to this property</a>

memory\_hugepages\_free: optional number

The number of huge pages in the pool that are not yet allocated

<a href="#">Link to this property</a>

memory\_hugepages\_rsvd: optional number

Number of huge pages for which a commitment has been made, but no allocation has yet been made

<a href="#">Link to this property</a>

memory\_hugepages\_surp: optional number

Number of huge pages in the pool above the threshold

<a href="#">Link to this property</a>

memory\_hugepages\_total: optional number

The size of the pool of huge pages

<a href="#">Link to this property</a>

memory\_hugepagesize\_bytes: optional number

The size of huge pages

<a href="#">Link to this property</a>

memory\_inactive\_bytes: optional number

Memory which has been less recently used

<a href="#">Link to this property</a>

memory\_k\_reclaimable\_bytes: optional number

Kernel allocations that the kernel will attempt to reclaim under memory pressure

<a href="#">Link to this property</a>

memory\_kernel\_stack\_bytes: optional number

Amount of memory allocated to kernel stacks

<a href="#">Link to this property</a>

memory\_low\_free\_bytes: optional number

Amount of free lowmem

<a href="#">Link to this property</a>

memory\_low\_total\_bytes: optional number

Total amount of lowmem

<a href="#">Link to this property</a>

memory\_mapped\_bytes: optional number

Files which have been mapped into memory

<a href="#">Link to this property</a>

memory\_page\_tables\_bytes: optional number

Amount of memory dedicated to the lowest level of page tables

<a href="#">Link to this property</a>

memory\_per\_cpu\_bytes: optional number

Memory allocated to the per-cpu alloctor used to back per-cpu allocations

<a href="#">Link to this property</a>

memory\_pressure\_full\_10s: optional number

Percentage of time over a 10 second window that all tasks were stalled

<a href="#">Link to this property</a>

memory\_pressure\_full\_300s: optional number

Percentage of time over a 5 minute window that all tasks were stalled

<a href="#">Link to this property</a>

memory\_pressure\_full\_60s: optional number

Percentage of time over a 1 minute window that all tasks were stalled

<a href="#">Link to this property</a>

memory\_pressure\_full\_total\_us: optional number

Total stall time (microseconds)

<a href="#">Link to this property</a>

memory\_pressure\_some\_10s: optional number

Percentage of time over a 10 second window that some tasks were stalled

<a href="#">Link to this property</a>

memory\_pressure\_some\_300s: optional number

Percentage of time over a 5 minute window that some tasks were stalled

<a href="#">Link to this property</a>

memory\_pressure\_some\_60s: optional number

Percentage of time over a 1 minute window that some tasks were stalled

<a href="#">Link to this property</a>

memory\_pressure\_some\_total\_us: optional number

Total stall time (microseconds)

<a href="#">Link to this property</a>

memory\_s\_reclaimable\_bytes: optional number

Part of slab that can be reclaimed on memory pressure

<a href="#">Link to this property</a>

memory\_s\_unreclaim\_bytes: optional number

Part of slab that cannot be reclaimed on memory pressure

<a href="#">Link to this property</a>

memory\_secondary\_page\_tables\_bytes: optional number

Amount of memory dedicated to the lowest level of page tables

<a href="#">Link to this property</a>

memory\_shmem\_bytes: optional number

Amount of memory consumed by tmpfs

<a href="#">Link to this property</a>

memory\_shmem\_hugepages\_bytes: optional number

Memory used by shmem and tmpfs, allocated with huge pages

<a href="#">Link to this property</a>

memory\_shmem\_pmd\_mapped\_bytes: optional number

Shared memory mapped into user space with huge pages

<a href="#">Link to this property</a>

memory\_slab\_bytes: optional number

In-kernel data structures cache

<a href="#">Link to this property</a>

memory\_swap\_cached\_bytes: optional number

Memory swapped out and back in while still in swap file

<a href="#">Link to this property</a>

memory\_swap\_free\_bytes: optional number

Amount of swap space that is currently unused

<a href="#">Link to this property</a>

memory\_swap\_total\_bytes: optional number

Total amount of swap space available

<a href="#">Link to this property</a>

memory\_total\_bytes: optional number

Total usable RAM

<a href="#">Link to this property</a>

memory\_vmalloc\_chunk\_bytes: optional number

Largest contiguous block of vmalloc area which is free

<a href="#">Link to this property</a>

memory\_vmalloc\_total\_bytes: optional number

Total size of vmalloc memory area

<a href="#">Link to this property</a>

memory\_vmalloc\_used\_bytes: optional number

Amount of vmalloc area which is used

<a href="#">Link to this property</a>

memory\_writeback\_bytes: optional number

Memory which is actively being written back to the disk

<a href="#">Link to this property</a>

memory\_writeback\_tmp\_bytes: optional number

Memory used by FUSE for temporary writeback buffers

<a href="#">Link to this property</a>

memory\_z\_swap\_bytes: optional number

Memory consumed by the zswap backend, compressed

<a href="#">Link to this property</a>

memory\_z\_swapped\_bytes: optional number

Amount of anonymous memory stored in zswap, uncompressed

<a href="#">Link to this property</a>

<details>

<summary>

mounts: optional array of object {file\_system, kind, mount\_point, 7 more }

</summary>

file\_system: string

File system on disk (EXT4, NTFS, etc.)

<a href="#">Link to this property</a>

kind: string

Kind of disk (HDD, SSD, etc.)

<a href="#">Link to this property</a>

mount\_point: string

Path where disk is mounted

<a href="#">Link to this property</a>

name: string

Name of the disk mount

<a href="#">Link to this property</a>

available\_bytes: optional number

Available disk size (bytes)

<a href="#">Link to this property</a>

available\_inodes: optional number

Available inodes on filesystem

<a href="#">Link to this property</a>

is\_read\_only: optional boolean

Determines whether the disk is read-only

<a href="#">Link to this property</a>

is\_removable: optional boolean

Determines whether the disk is removable

<a href="#">Link to this property</a>

total\_bytes: optional number

Total disk size (bytes)

<a href="#">Link to this property</a>

total\_inodes: optional number

Total inodes on filesystem

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

netdevs: optional array of object {name, recv\_bytes, recv\_compressed, 14 more }

</summary>

name: string

Name of the network device

<a href="#">Link to this property</a>

recv\_bytes: number

Total bytes received

<a href="#">Link to this property</a>

recv\_compressed: number

Compressed packets received

<a href="#">Link to this property</a>

recv\_drop: number

Packets dropped

<a href="#">Link to this property</a>

recv\_errs: number

Bad packets received

<a href="#">Link to this property</a>

recv\_fifo: number

FIFO overruns

<a href="#">Link to this property</a>

recv\_frame: number

Frame alignment errors

<a href="#">Link to this property</a>

recv\_multicast: number

Multicast packets received

<a href="#">Link to this property</a>

recv\_packets: number

Total packets received

<a href="#">Link to this property</a>

sent\_bytes: number

Total bytes transmitted

<a href="#">Link to this property</a>

sent\_carrier: number

Number of packets not sent due to carrier errors

<a href="#">Link to this property</a>

sent\_colls: number

Number of collisions

<a href="#">Link to this property</a>

sent\_compressed: number

Number of compressed packets transmitted

<a href="#">Link to this property</a>

sent\_drop: number

Number of packets dropped during transmission

<a href="#">Link to this property</a>

sent\_errs: number

Number of transmission errors

<a href="#">Link to this property</a>

sent\_fifo: number

FIFO overruns

<a href="#">Link to this property</a>

sent\_packets: number

Total packets transmitted

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

platform: optional string

Platform identifier

<a href="#">Link to this property</a>

<details>

<summary>

routes: optional array of object {destination, interface\_name, kind, 3 more }

</summary>

destination: string

Route destination as default or an IPv4 CIDR

<a href="#">Link to this property</a>

interface\_name: string

Interface used by the next hop

<a href="#">Link to this property</a>

kind: string

Routing decision type: tunnel, breakout, or lan

<a href="#">Link to this property</a>

metric: number

Route metric; lower metrics are preferred

<a href="#">Link to this property</a>

gateway: optional string

Gateway address for the next hop

<a href="#">Link to this property</a>

weight: optional number

Relative weight within an equal-cost route

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

site\_id: optional string

Site identifier

<a href="#">Link to this property</a>

snmp\_icmp\_in\_addr\_mask\_reps: optional number

Number of ICMP Address Mask Reply messages received

<a href="#">Link to this property</a>

snmp\_icmp\_in\_addr\_masks: optional number

Number of ICMP Address Mask Request messages received

<a href="#">Link to this property</a>

snmp\_icmp\_in\_csum\_errors: optional number

Number of ICMP messages received with bad checksums

<a href="#">Link to this property</a>

snmp\_icmp\_in\_dest\_unreachs: optional number

Number of ICMP Destination Unreachable messages received

<a href="#">Link to this property</a>

snmp\_icmp\_in\_echo\_reps: optional number

Number of ICMP Echo Reply messages received

<a href="#">Link to this property</a>

snmp\_icmp\_in\_echos: optional number

Number of ICMP Echo (request) messages received

<a href="#">Link to this property</a>

snmp\_icmp\_in\_errors: optional number

Number of ICMP messages received with ICMP-specific errors

<a href="#">Link to this property</a>

snmp\_icmp\_in\_msgs: optional number

Number of ICMP messages received

<a href="#">Link to this property</a>

snmp\_icmp\_in\_parm\_probs: optional number

Number of ICMP Parameter Problem messages received

<a href="#">Link to this property</a>

snmp\_icmp\_in\_redirects: optional number

Number of ICMP Redirect messages received

<a href="#">Link to this property</a>

snmp\_icmp\_in\_src\_quenchs: optional number

Number of ICMP Source Quench messages received

<a href="#">Link to this property</a>

snmp\_icmp\_in\_time\_excds: optional number

Number of ICMP Time Exceeded messages received

<a href="#">Link to this property</a>

snmp\_icmp\_in\_timestamp\_reps: optional number

Number of ICMP Address Mask Request messages received

<a href="#">Link to this property</a>

snmp\_icmp\_in\_timestamps: optional number

Number of ICMP Timestamp (request) messages received

<a href="#">Link to this property</a>

snmp\_icmp\_out\_addr\_mask\_reps: optional number

Number of ICMP Address Mask Reply messages sent

<a href="#">Link to this property</a>

snmp\_icmp\_out\_addr\_masks: optional number

Number of ICMP Address Mask Request messages sent

<a href="#">Link to this property</a>

snmp\_icmp\_out\_dest\_unreachs: optional number

Number of ICMP Destination Unreachable messages sent

<a href="#">Link to this property</a>

snmp\_icmp\_out\_echo\_reps: optional number

Number of ICMP Echo Reply messages sent

<a href="#">Link to this property</a>

snmp\_icmp\_out\_echos: optional number

Number of ICMP Echo (request) messages sent

<a href="#">Link to this property</a>

snmp\_icmp\_out\_errors: optional number

Number of ICMP messages which this entity did not send due to ICMP-specific errors

<a href="#">Link to this property</a>

snmp\_icmp\_out\_msgs: optional number

Number of ICMP messages attempted to send

<a href="#">Link to this property</a>

snmp\_icmp\_out\_parm\_probs: optional number

Number of ICMP Parameter Problem messages sent

<a href="#">Link to this property</a>

snmp\_icmp\_out\_redirects: optional number

Number of ICMP Redirect messages sent

<a href="#">Link to this property</a>

snmp\_icmp\_out\_src\_quenchs: optional number

Number of ICMP Source Quench messages sent

<a href="#">Link to this property</a>

snmp\_icmp\_out\_time\_excds: optional number

Number of ICMP Time Exceeded messages sent

<a href="#">Link to this property</a>

snmp\_icmp\_out\_timestamp\_reps: optional number

Number of ICMP Timestamp Reply messages sent

<a href="#">Link to this property</a>

snmp\_icmp\_out\_timestamps: optional number

Number of ICMP Timestamp (request) messages sent

<a href="#">Link to this property</a>

snmp\_ip\_default\_ttl: optional number

Default value of the Time-To-Live field of the IP header

<a href="#">Link to this property</a>

snmp\_ip\_forw\_datagrams: optional number

Number of datagrams forwarded to their final destination

<a href="#">Link to this property</a>

snmp\_ip\_forwarding\_enabled: optional boolean

Set when acting as an IP gateway

<a href="#">Link to this property</a>

snmp\_ip\_frag\_creates: optional number

Number of datagrams generated by fragmentation

<a href="#">Link to this property</a>

snmp\_ip\_frag\_fails: optional number

Number of datagrams discarded because fragmentation failed

<a href="#">Link to this property</a>

snmp\_ip\_frag\_oks: optional number

Number of datagrams successfully fragmented

<a href="#">Link to this property</a>

snmp\_ip\_in\_addr\_errors: optional number

Number of input datagrams discarded due to errors in the IP address

<a href="#">Link to this property</a>

snmp\_ip\_in\_delivers: optional number

Number of input datagrams successfully delivered to IP user-protocols

<a href="#">Link to this property</a>

snmp\_ip\_in\_discards: optional number

Number of input datagrams otherwise discarded

<a href="#">Link to this property</a>

snmp\_ip\_in\_hdr\_errors: optional number

Number of input datagrams discarded due to errors in the IP header

<a href="#">Link to this property</a>

snmp\_ip\_in\_receives: optional number

Number of input datagrams received from interfaces

<a href="#">Link to this property</a>

snmp\_ip\_in\_unknown\_protos: optional number

Number of input datagrams discarded due unknown or unsupported protocol

<a href="#">Link to this property</a>

snmp\_ip\_out\_discards: optional number

Number of output datagrams otherwise discarded

<a href="#">Link to this property</a>

snmp\_ip\_out\_no\_routes: optional number

Number of output datagrams discarded because no route matched

<a href="#">Link to this property</a>

snmp\_ip\_out\_requests: optional number

Number of datagrams supplied for transmission

<a href="#">Link to this property</a>

snmp\_ip\_reasm\_fails: optional number

Number of failures detected by the reassembly algorithm

<a href="#">Link to this property</a>

snmp\_ip\_reasm\_oks: optional number

Number of datagrams successfully reassembled

<a href="#">Link to this property</a>

snmp\_ip\_reasm\_reqds: optional number

Number of fragments received which needed to be reassembled

<a href="#">Link to this property</a>

snmp\_ip\_reasm\_timeout: optional number

Number of seconds fragments are held while awaiting reassembly

<a href="#">Link to this property</a>

snmp\_tcp\_active\_opens: optional number

Number of times TCP transitions to SYN-SENT from CLOSED

<a href="#">Link to this property</a>

snmp\_tcp\_attempt\_fails: optional number

Number of times TCP transitions to CLOSED from SYN-SENT or SYN-RCVD, plus transitions to LISTEN from SYN-RCVD

<a href="#">Link to this property</a>

snmp\_tcp\_curr\_estab: optional number

Number of TCP connections in ESTABLISHED or CLOSE-WAIT

<a href="#">Link to this property</a>

snmp\_tcp\_estab\_resets: optional number

Number of times TCP transitions to CLOSED from ESTABLISHED or CLOSE-WAIT

<a href="#">Link to this property</a>

snmp\_tcp\_in\_csum\_errors: optional number

Number of TCP segments received with checksum errors

<a href="#">Link to this property</a>

snmp\_tcp\_in\_errs: optional number

Number of TCP segments received in error

<a href="#">Link to this property</a>

snmp\_tcp\_in\_segs: optional number

Number of TCP segments received

<a href="#">Link to this property</a>

snmp\_tcp\_max\_conn: optional number

Limit on the total number of TCP connections

<a href="#">Link to this property</a>

snmp\_tcp\_out\_rsts: optional number

Number of TCP segments sent with RST flag

<a href="#">Link to this property</a>

snmp\_tcp\_out\_segs: optional number

Number of TCP segments sent

<a href="#">Link to this property</a>

snmp\_tcp\_passive\_opens: optional number

Number of times TCP transitions to SYN-RCVD from LISTEN

<a href="#">Link to this property</a>

snmp\_tcp\_retrans\_segs: optional number

Number of TCP segments retransmitted

<a href="#">Link to this property</a>

snmp\_tcp\_rto\_max: optional number

Maximum value permitted by a TCP implementation for the retransmission timeout (milliseconds)

<a href="#">Link to this property</a>

snmp\_tcp\_rto\_min: optional number

Minimum value permitted by a TCP implementation for the retransmission timeout (milliseconds)

<a href="#">Link to this property</a>

snmp\_udp\_in\_datagrams: optional number

Number of UDP datagrams delivered to UDP applications

<a href="#">Link to this property</a>

snmp\_udp\_in\_errors: optional number

Number of UDP datagrams failed to be delivered for reasons other than lack of application at the destination port

<a href="#">Link to this property</a>

snmp\_udp\_no\_ports: optional number

Number of UDP datagrams received for which there was not application at the destination port

<a href="#">Link to this property</a>

snmp\_udp\_out\_datagrams: optional number

Number of UDP datagrams sent

<a href="#">Link to this property</a>

system\_boot\_time\_s: optional number

Boottime of the system (seconds since the Unix epoch)

<a href="#">Link to this property</a>

<details>

<summary>

thermals: optional array of object {label, critical\_celcius, current\_celcius, max\_celcius }

</summary>

label: string

Sensor identifier for the component

<a href="#">Link to this property</a>

critical\_celcius: optional number

Critical failure temperature of the component (degrees Celsius)

<a href="#">Link to this property</a>

current\_celcius: optional number

Current temperature of the component (degrees Celsius)

<a href="#">Link to this property</a>

max\_celcius: optional number

Maximum temperature of the component (degrees Celsius)

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

tunnels: optional array of object {health\_state, health\_value, interface\_name, 9 more }

</summary>

health\_state: string

Name of tunnel health state (unknown, healthy, degraded, down)

<a href="#">Link to this property</a>

health\_value: number

Numeric value associated with tunnel state (0 = unknown, 1 = healthy, 2 = degraded, 3 = down)

<a href="#">Link to this property</a>

interface\_name: string

The tunnel interface name (i.e. xfrm1, xfrm3.99, etc.)

<a href="#">Link to this property</a>

tunnel\_id: string

Tunnel identifier

<a href="#">Link to this property</a>

jitter\_ms: optional number

Tunnel round-trip latency variation in milliseconds

<a href="#">Link to this property</a>

latency\_ms: optional number

50th percentile tunnel round-trip latency in milliseconds

<a href="#">Link to this property</a>

natd\_result: optional string

Public socket address returned by the NAT detector

<a href="#">Link to this property</a>

natd\_state: optional number

Numeric NAT detector state (0 = detected, 1 = missing result, 2 = stale result)

<a href="#">Link to this property</a>

natd\_target: optional string

Target socket address probed by the NAT detector, using the detector source port

<a href="#">Link to this property</a>

probed\_mtu: optional number

MTU as measured between the two ends of the tunnel

<a href="#">Link to this property</a>

recent\_healthy\_pings: optional number

Number of recent healthy pings for this tunnel

<a href="#">Link to this property</a>

recent\_unhealthy\_pings: optional number

Number of recent unhealthy pings for this tunnel

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

uptime\_idle\_ms: optional number

Sum of how much time each core has spent idle

<a href="#">Link to this property</a>

uptime\_total\_ms: optional number

Uptime of the system, including time spent in suspend

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.connectors.snapshots.latest%20%3E%20(model)%20latest_list_response%20%3E%20(schema)>)

#### Magic TransitCf1 Sites

##### [List CF1 Sites](https://developers.cloudflare.com/api/resources/magic_transit/subresources/cf1_sites/methods/list)

GET/accounts/{account\_id}/magic/cf1\_sites

##### [Get CF1 Site](https://developers.cloudflare.com/api/resources/magic_transit/subresources/cf1_sites/methods/get)

GET/accounts/{account\_id}/magic/cf1\_sites/{cf1\_site\_id}

##### [Create CF1 Sites](https://developers.cloudflare.com/api/resources/magic_transit/subresources/cf1_sites/methods/create)

POST/accounts/{account\_id}/magic/cf1\_sites

##### [Update CF1 Site](https://developers.cloudflare.com/api/resources/magic_transit/subresources/cf1_sites/methods/update)

PATCH/accounts/{account\_id}/magic/cf1\_sites/{cf1\_site\_id}

##### [Delete CF1 Site](https://developers.cloudflare.com/api/resources/magic_transit/subresources/cf1_sites/methods/delete)

DELETE/accounts/{account\_id}/magic/cf1\_sites/{cf1\_site\_id}

##### ModelsExpand Collapse

<details>

<summary>

Cf1Site object {name, id, created\_on, 3 more }

</summary>

name: string

A human-provided name describing the CF1 Site that should be unique within the account.

<a href="#">Link to this property</a>

id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

created\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

A human-provided description of the CF1 Site.

<a href="#">Link to this property</a>

location: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.cf1_sites%20%3E%20(model)%20cf1_site_location%20%3E%20(schema)">Cf1SiteLocation</a> { lat, long, name }

<a href="#">Link to this property</a>

modified\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.cf1_sites%20%3E%20(model)%20cf1_site%20%3E%20(schema)>)

<details>

<summary>

Cf1SiteLocation object {lat, long, name }

</summary>

lat: optional number

Latitude of the CF1 Site.

formatfloat

<a href="#">Link to this property</a>

long: optional number

Longitude of the CF1 Site.

formatfloat

<a href="#">Link to this property</a>

name: optional string

Name of nearest town, city, or village.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.cf1_sites%20%3E%20(model)%20cf1_site_location%20%3E%20(schema)>)

#### Magic TransitCf1 SitesRamps

##### [List CF1 Site Ramps](https://developers.cloudflare.com/api/resources/magic_transit/subresources/cf1_sites/subresources/ramps/methods/list)

GET/accounts/{account\_id}/magic/cf1\_sites/{cf1\_site\_id}/ramps

##### [Get CF1 Site Ramp](https://developers.cloudflare.com/api/resources/magic_transit/subresources/cf1_sites/subresources/ramps/methods/get)

GET/accounts/{account\_id}/magic/cf1\_sites/{cf1\_site\_id}/ramps/{ramp\_id}

##### [Create CF1 Site Ramps](https://developers.cloudflare.com/api/resources/magic_transit/subresources/cf1_sites/subresources/ramps/methods/create)

POST/accounts/{account\_id}/magic/cf1\_sites/{cf1\_site\_id}/ramps

##### [Delete CF1 Site Ramp](https://developers.cloudflare.com/api/resources/magic_transit/subresources/cf1_sites/subresources/ramps/methods/delete)

DELETE/accounts/{account\_id}/magic/cf1\_sites/{cf1\_site\_id}/ramps/{ramp\_id}

##### ModelsExpand Collapse

<details>

<summary>

Ramp object {id, created\_on, modified\_on, 8 more }

</summary>

id: string

Identifier

maxLength32

<a href="#">Link to this property</a>

created\_on: string

formatdate-time

<a href="#">Link to this property</a>

modified\_on: string

formatdate-time

<a href="#">Link to this property</a>

name: string

A human-provided name describing the ramp that should be unique within the CF1 Site.

<a href="#">Link to this property</a>

type: <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.cf1_sites.ramps%20%3E%20(model)%20ramp_type%20%3E%20(schema)">RampType</a>

The type of network connection (ramp) linking a CF1 Site to Cloudflare’s network.

<a href="#">Link to this property</a>

description: optional string

A human-provided description of the ramp.

<a href="#">Link to this property</a>

<details>

<summary>

gre: optional object {managed\_by }

</summary>

managed\_by: optional string

URL reference to the source network resource that this ramp is managed by.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

gre\_interconnect: optional object {managed\_by }

</summary>

managed\_by: optional string

URL reference to the source network resource that this ramp is managed by.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ipsec: optional object {managed\_by }

</summary>

managed\_by: optional string

URL reference to the source network resource that this ramp is managed by.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

mconn: optional object {managed\_by }

</summary>

managed\_by: optional string

URL reference to the source network resource that this ramp is managed by.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

mpls\_interconnect: optional object {managed\_by }

</summary>

managed\_by: optional string

URL reference to the source network resource that this ramp is managed by.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.cf1_sites.ramps%20%3E%20(model)%20ramp%20%3E%20(schema)>)

<details>

<summary>

RampType = "gre"or "gre\_interconnect"or "mpls\_interconnect"or 2 more

The type of network connection (ramp) linking a CF1 Site to Cloudflare’s network.

</summary>

One of the following:

"gre"

<a href="#">Link to this property</a>

"gre\_interconnect"

<a href="#">Link to this property</a>

"mpls\_interconnect"

<a href="#">Link to this property</a>

"mconn"

<a href="#">Link to this property</a>

"ipsec"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.cf1_sites.ramps%20%3E%20(model)%20ramp_type%20%3E%20(schema)>)

#### Magic TransitPCAPs

##### [List packet capture requests](https://developers.cloudflare.com/api/resources/magic_transit/subresources/pcaps/methods/list)

GET/accounts/{account\_id}/pcaps

##### [Get PCAP request](https://developers.cloudflare.com/api/resources/magic_transit/subresources/pcaps/methods/get)

GET/accounts/{account\_id}/pcaps/{pcap\_id}

##### [Create PCAP request](https://developers.cloudflare.com/api/resources/magic_transit/subresources/pcaps/methods/create)

POST/accounts/{account\_id}/pcaps

##### [Stop full PCAP](https://developers.cloudflare.com/api/resources/magic_transit/subresources/pcaps/methods/stop)

PUT/accounts/{account\_id}/pcaps/{pcap\_id}/stop

##### ModelsExpand Collapse

<details>

<summary>

PCAP object {id, filter\_v1, offset\_time, 5 more }

</summary>

id: optional string

The ID for the packet capture.

maxLength32

minLength32

<a href="#">Link to this property</a>

filter\_v1: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.pcaps%20%3E%20(model)%20pcap_filter%20%3E%20(schema)">PCAPFilter</a> { destination\_address, destination\_port, protocol, 2 more }

The packet capture filter. When this field is empty, all packets are captured.

<a href="#">Link to this property</a>

offset\_time: optional string

The RFC 3339 offset timestamp from which to query backwards for packets. Must be within the last 24h. When this field is empty, defaults to time of request.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "unknown"or "success"or "pending"or 5 more

The status of the packet capture request.

</summary>

One of the following:

"unknown"

<a href="#">Link to this property</a>

"success"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"running"

<a href="#">Link to this property</a>

"conversion\_pending"

<a href="#">Link to this property</a>

"conversion\_running"

<a href="#">Link to this property</a>

"complete"

<a href="#">Link to this property</a>

"failed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

submitted: optional string

The RFC 3339 timestamp when the packet capture was created.

<a href="#">Link to this property</a>

system: optional "magic-transit"

The system used to collect packet captures.

<a href="#">Link to this property</a>

time\_limit: optional number

The packet capture duration in seconds.

maximum300

minimum1

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "simple"or "full"

The type of packet capture. <code>Simple</code> captures sampled packets, and <code>full</code> captures entire payloads and non-sampled packets.

</summary>

One of the following:

"simple"

<a href="#">Link to this property</a>

"full"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.pcaps%20%3E%20(model)%20pcap%20%3E%20(schema)>)

<details>

<summary>

PCAPFilter object {destination\_address, destination\_port, protocol, 2 more }

The packet capture filter. When this field is empty, all packets are captured.

</summary>

destination\_address: optional string

The destination IP address of the packet.

<a href="#">Link to this property</a>

destination\_port: optional number

The destination port of the packet.

<a href="#">Link to this property</a>

protocol: optional number

The protocol number of the packet.

<a href="#">Link to this property</a>

source\_address: optional string

The source IP address of the packet.

<a href="#">Link to this property</a>

source\_port: optional number

The source port of the packet.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.pcaps%20%3E%20(model)%20pcap_filter%20%3E%20(schema)>)

<details>

<summary>

PCAPListResponse = <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.pcaps%20%3E%20(model)%20pcap%20%3E%20(schema)">PCAP</a> { id, filter\_v1, offset\_time, 5 more } or object {id, byte\_limit, colo\_name, 10 more }

</summary>

One of the following:

<details>

<summary>

PCAP object {id, filter\_v1, offset\_time, 5 more }

</summary>

id: optional string

The ID for the packet capture.

maxLength32

minLength32

<a href="#">Link to this property</a>

filter\_v1: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.pcaps%20%3E%20(model)%20pcap_filter%20%3E%20(schema)">PCAPFilter</a> { destination\_address, destination\_port, protocol, 2 more }

The packet capture filter. When this field is empty, all packets are captured.

<a href="#">Link to this property</a>

offset\_time: optional string

The RFC 3339 offset timestamp from which to query backwards for packets. Must be within the last 24h. When this field is empty, defaults to time of request.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "unknown"or "success"or "pending"or 5 more

The status of the packet capture request.

</summary>

One of the following:

"unknown"

<a href="#">Link to this property</a>

"success"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"running"

<a href="#">Link to this property</a>

"conversion\_pending"

<a href="#">Link to this property</a>

"conversion\_running"

<a href="#">Link to this property</a>

"complete"

<a href="#">Link to this property</a>

"failed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

submitted: optional string

The RFC 3339 timestamp when the packet capture was created.

<a href="#">Link to this property</a>

system: optional "magic-transit"

The system used to collect packet captures.

<a href="#">Link to this property</a>

time\_limit: optional number

The packet capture duration in seconds.

maximum300

minimum1

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "simple"or "full"

The type of packet capture. <code>Simple</code> captures sampled packets, and <code>full</code> captures entire payloads and non-sampled packets.

</summary>

One of the following:

"simple"

<a href="#">Link to this property</a>

"full"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

MagicVisibilityPCAPsPCAPsResponseFull object {id, byte\_limit, colo\_name, 10 more }

</summary>

id: optional string

The ID for the packet capture.

maxLength32

minLength32

<a href="#">Link to this property</a>

byte\_limit: optional number

The maximum number of bytes to capture. This field only applies to <code>full</code> packet captures.

maximum1000000000

minimum1

<a href="#">Link to this property</a>

colo\_name: optional string

The name of the data center used for the packet capture. This can be a specific colo (ord02) or a multi-colo name (ORD). This field only applies to <code>full</code> packet captures.

<a href="#">Link to this property</a>

destination\_conf: optional string

The full URI for the bucket. This field only applies to <code>full</code> packet captures.

<a href="#">Link to this property</a>

error\_message: optional string

An error message that describes why the packet capture failed. This field only applies to <code>full</code> packet captures.

<a href="#">Link to this property</a>

filter\_v1: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.pcaps%20%3E%20(model)%20pcap_filter%20%3E%20(schema)">PCAPFilter</a> { destination\_address, destination\_port, protocol, 2 more }

The packet capture filter. When this field is empty, all packets are captured.

<a href="#">Link to this property</a>

packets\_captured: optional number

The number of packets captured.

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "unknown"or "success"or "pending"or 5 more

The status of the packet capture request.

</summary>

One of the following:

"unknown"

<a href="#">Link to this property</a>

"success"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"running"

<a href="#">Link to this property</a>

"conversion\_pending"

<a href="#">Link to this property</a>

"conversion\_running"

<a href="#">Link to this property</a>

"complete"

<a href="#">Link to this property</a>

"failed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

stop\_requested: optional string

The RFC 3339 timestamp when stopping the packet capture was requested. This field only applies to <code>full</code> packet captures.

formatdate-time

<a href="#">Link to this property</a>

submitted: optional string

The RFC 3339 timestamp when the packet capture was created.

<a href="#">Link to this property</a>

system: optional "magic-transit"

The system used to collect packet captures.

<a href="#">Link to this property</a>

time\_limit: optional number

The packet capture duration in seconds.

maximum86400

minimum1

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "simple"or "full"

The type of packet capture. <code>Simple</code> captures sampled packets, and <code>full</code> captures entire payloads and non-sampled packets.

</summary>

One of the following:

"simple"

<a href="#">Link to this property</a>

"full"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.pcaps%20%3E%20(model)%20pcap_list_response%20%3E%20(schema)>)

<details>

<summary>

PCAPGetResponse = <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.pcaps%20%3E%20(model)%20pcap%20%3E%20(schema)">PCAP</a> { id, filter\_v1, offset\_time, 5 more } or object {id, byte\_limit, colo\_name, 10 more }

</summary>

One of the following:

<details>

<summary>

PCAP object {id, filter\_v1, offset\_time, 5 more }

</summary>

id: optional string

The ID for the packet capture.

maxLength32

minLength32

<a href="#">Link to this property</a>

filter\_v1: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.pcaps%20%3E%20(model)%20pcap_filter%20%3E%20(schema)">PCAPFilter</a> { destination\_address, destination\_port, protocol, 2 more }

The packet capture filter. When this field is empty, all packets are captured.

<a href="#">Link to this property</a>

offset\_time: optional string

The RFC 3339 offset timestamp from which to query backwards for packets. Must be within the last 24h. When this field is empty, defaults to time of request.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "unknown"or "success"or "pending"or 5 more

The status of the packet capture request.

</summary>

One of the following:

"unknown"

<a href="#">Link to this property</a>

"success"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"running"

<a href="#">Link to this property</a>

"conversion\_pending"

<a href="#">Link to this property</a>

"conversion\_running"

<a href="#">Link to this property</a>

"complete"

<a href="#">Link to this property</a>

"failed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

submitted: optional string

The RFC 3339 timestamp when the packet capture was created.

<a href="#">Link to this property</a>

system: optional "magic-transit"

The system used to collect packet captures.

<a href="#">Link to this property</a>

time\_limit: optional number

The packet capture duration in seconds.

maximum300

minimum1

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "simple"or "full"

The type of packet capture. <code>Simple</code> captures sampled packets, and <code>full</code> captures entire payloads and non-sampled packets.

</summary>

One of the following:

"simple"

<a href="#">Link to this property</a>

"full"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

MagicVisibilityPCAPsPCAPsResponseFull object {id, byte\_limit, colo\_name, 10 more }

</summary>

id: optional string

The ID for the packet capture.

maxLength32

minLength32

<a href="#">Link to this property</a>

byte\_limit: optional number

The maximum number of bytes to capture. This field only applies to <code>full</code> packet captures.

maximum1000000000

minimum1

<a href="#">Link to this property</a>

colo\_name: optional string

The name of the data center used for the packet capture. This can be a specific colo (ord02) or a multi-colo name (ORD). This field only applies to <code>full</code> packet captures.

<a href="#">Link to this property</a>

destination\_conf: optional string

The full URI for the bucket. This field only applies to <code>full</code> packet captures.

<a href="#">Link to this property</a>

error\_message: optional string

An error message that describes why the packet capture failed. This field only applies to <code>full</code> packet captures.

<a href="#">Link to this property</a>

filter\_v1: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.pcaps%20%3E%20(model)%20pcap_filter%20%3E%20(schema)">PCAPFilter</a> { destination\_address, destination\_port, protocol, 2 more }

The packet capture filter. When this field is empty, all packets are captured.

<a href="#">Link to this property</a>

packets\_captured: optional number

The number of packets captured.

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "unknown"or "success"or "pending"or 5 more

The status of the packet capture request.

</summary>

One of the following:

"unknown"

<a href="#">Link to this property</a>

"success"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"running"

<a href="#">Link to this property</a>

"conversion\_pending"

<a href="#">Link to this property</a>

"conversion\_running"

<a href="#">Link to this property</a>

"complete"

<a href="#">Link to this property</a>

"failed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

stop\_requested: optional string

The RFC 3339 timestamp when stopping the packet capture was requested. This field only applies to <code>full</code> packet captures.

formatdate-time

<a href="#">Link to this property</a>

submitted: optional string

The RFC 3339 timestamp when the packet capture was created.

<a href="#">Link to this property</a>

system: optional "magic-transit"

The system used to collect packet captures.

<a href="#">Link to this property</a>

time\_limit: optional number

The packet capture duration in seconds.

maximum86400

minimum1

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "simple"or "full"

The type of packet capture. <code>Simple</code> captures sampled packets, and <code>full</code> captures entire payloads and non-sampled packets.

</summary>

One of the following:

"simple"

<a href="#">Link to this property</a>

"full"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.pcaps%20%3E%20(model)%20pcap_get_response%20%3E%20(schema)>)

<details>

<summary>

PCAPCreateResponse = <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.pcaps%20%3E%20(model)%20pcap%20%3E%20(schema)">PCAP</a> { id, filter\_v1, offset\_time, 5 more } or object {id, byte\_limit, colo\_name, 10 more }

</summary>

One of the following:

<details>

<summary>

PCAP object {id, filter\_v1, offset\_time, 5 more }

</summary>

id: optional string

The ID for the packet capture.

maxLength32

minLength32

<a href="#">Link to this property</a>

filter\_v1: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.pcaps%20%3E%20(model)%20pcap_filter%20%3E%20(schema)">PCAPFilter</a> { destination\_address, destination\_port, protocol, 2 more }

The packet capture filter. When this field is empty, all packets are captured.

<a href="#">Link to this property</a>

offset\_time: optional string

The RFC 3339 offset timestamp from which to query backwards for packets. Must be within the last 24h. When this field is empty, defaults to time of request.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "unknown"or "success"or "pending"or 5 more

The status of the packet capture request.

</summary>

One of the following:

"unknown"

<a href="#">Link to this property</a>

"success"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"running"

<a href="#">Link to this property</a>

"conversion\_pending"

<a href="#">Link to this property</a>

"conversion\_running"

<a href="#">Link to this property</a>

"complete"

<a href="#">Link to this property</a>

"failed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

submitted: optional string

The RFC 3339 timestamp when the packet capture was created.

<a href="#">Link to this property</a>

system: optional "magic-transit"

The system used to collect packet captures.

<a href="#">Link to this property</a>

time\_limit: optional number

The packet capture duration in seconds.

maximum300

minimum1

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "simple"or "full"

The type of packet capture. <code>Simple</code> captures sampled packets, and <code>full</code> captures entire payloads and non-sampled packets.

</summary>

One of the following:

"simple"

<a href="#">Link to this property</a>

"full"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

MagicVisibilityPCAPsPCAPsResponseFull object {id, byte\_limit, colo\_name, 10 more }

</summary>

id: optional string

The ID for the packet capture.

maxLength32

minLength32

<a href="#">Link to this property</a>

byte\_limit: optional number

The maximum number of bytes to capture. This field only applies to <code>full</code> packet captures.

maximum1000000000

minimum1

<a href="#">Link to this property</a>

colo\_name: optional string

The name of the data center used for the packet capture. This can be a specific colo (ord02) or a multi-colo name (ORD). This field only applies to <code>full</code> packet captures.

<a href="#">Link to this property</a>

destination\_conf: optional string

The full URI for the bucket. This field only applies to <code>full</code> packet captures.

<a href="#">Link to this property</a>

error\_message: optional string

An error message that describes why the packet capture failed. This field only applies to <code>full</code> packet captures.

<a href="#">Link to this property</a>

filter\_v1: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.pcaps%20%3E%20(model)%20pcap_filter%20%3E%20(schema)">PCAPFilter</a> { destination\_address, destination\_port, protocol, 2 more }

The packet capture filter. When this field is empty, all packets are captured.

<a href="#">Link to this property</a>

packets\_captured: optional number

The number of packets captured.

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "unknown"or "success"or "pending"or 5 more

The status of the packet capture request.

</summary>

One of the following:

"unknown"

<a href="#">Link to this property</a>

"success"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"running"

<a href="#">Link to this property</a>

"conversion\_pending"

<a href="#">Link to this property</a>

"conversion\_running"

<a href="#">Link to this property</a>

"complete"

<a href="#">Link to this property</a>

"failed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

stop\_requested: optional string

The RFC 3339 timestamp when stopping the packet capture was requested. This field only applies to <code>full</code> packet captures.

formatdate-time

<a href="#">Link to this property</a>

submitted: optional string

The RFC 3339 timestamp when the packet capture was created.

<a href="#">Link to this property</a>

system: optional "magic-transit"

The system used to collect packet captures.

<a href="#">Link to this property</a>

time\_limit: optional number

The packet capture duration in seconds.

maximum86400

minimum1

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "simple"or "full"

The type of packet capture. <code>Simple</code> captures sampled packets, and <code>full</code> captures entire payloads and non-sampled packets.

</summary>

One of the following:

"simple"

<a href="#">Link to this property</a>

"full"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.pcaps%20%3E%20(model)%20pcap_create_response%20%3E%20(schema)>)

#### Magic TransitPCAPsOwnership

##### [List PCAPs Bucket Ownership](https://developers.cloudflare.com/api/resources/magic_transit/subresources/pcaps/subresources/ownership/methods/get)

GET/accounts/{account\_id}/pcaps/ownership

##### [Add buckets for full packet captures](https://developers.cloudflare.com/api/resources/magic_transit/subresources/pcaps/subresources/ownership/methods/create)

POST/accounts/{account\_id}/pcaps/ownership

##### [Delete buckets for full packet captures](https://developers.cloudflare.com/api/resources/magic_transit/subresources/pcaps/subresources/ownership/methods/delete)

DELETE/accounts/{account\_id}/pcaps/ownership/{ownership\_id}

##### [Validate buckets for full packet captures](https://developers.cloudflare.com/api/resources/magic_transit/subresources/pcaps/subresources/ownership/methods/validate)

POST/accounts/{account\_id}/pcaps/ownership/validate

##### ModelsExpand Collapse

<details>

<summary>

Ownership object {id, destination\_conf, filename, 3 more }

</summary>

id: string

The bucket ID associated with the packet captures API.

maxLength32

minLength32

<a href="#">Link to this property</a>

destination\_conf: string

The full URI for the bucket. This field only applies to <code>full</code> packet captures.

<a href="#">Link to this property</a>

filename: string

The ownership challenge filename stored in the bucket.

<a href="#">Link to this property</a>

<details>

<summary>

status: "pending"or "success"or "failed"

The status of the ownership challenge. Can be pending, success or failed.

</summary>

One of the following:

"pending"

<a href="#">Link to this property</a>

"success"

<a href="#">Link to this property</a>

"failed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

submitted: string

The RFC 3339 timestamp when the bucket was added to packet captures API.

<a href="#">Link to this property</a>

validated: optional string

The RFC 3339 timestamp when the bucket was validated.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.pcaps.ownership%20%3E%20(model)%20ownership%20%3E%20(schema)>)

#### Magic TransitPCAPsDownload

##### [Download Simple PCAP](https://developers.cloudflare.com/api/resources/magic_transit/subresources/pcaps/subresources/download/methods/get)

GET/accounts/{account\_id}/pcaps/{pcap\_id}/download