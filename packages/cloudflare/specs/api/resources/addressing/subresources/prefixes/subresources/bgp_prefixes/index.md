---
title: BGP Prefixes
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Addressing](https://developers.cloudflare.com/api/resources/addressing)

[Prefixes](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# BGP Prefixes

##### [List BGP Prefixes](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/subresources/bgp_prefixes/methods/list)

GET/accounts/{account\_id}/addressing/prefixes/{prefix\_id}/bgp/prefixes

##### [Fetch BGP Prefix](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/subresources/bgp_prefixes/methods/get)

GET/accounts/{account\_id}/addressing/prefixes/{prefix\_id}/bgp/prefixes/{bgp\_prefix\_id}

##### [Create BGP Prefix](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/subresources/bgp_prefixes/methods/create)

POST/accounts/{account\_id}/addressing/prefixes/{prefix\_id}/bgp/prefixes

##### [Update BGP Prefix](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/subresources/bgp_prefixes/methods/edit)

PATCH/accounts/{account\_id}/addressing/prefixes/{prefix\_id}/bgp/prefixes/{bgp\_prefix\_id}

##### [Delete BGP Prefix](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/subresources/bgp_prefixes/methods/delete)

DELETE/accounts/{account\_id}/addressing/prefixes/{prefix\_id}/bgp/prefixes/{bgp\_prefix\_id}

##### ModelsExpand Collapse

<details>

<summary>

BGPPrefix object {id, asn, asn\_prepend\_count, 6 more }

</summary>

id: optional string

Identifier of BGP Prefix.

maxLength32

<a href="#">Link to this property</a>

asn: optional number

Autonomous System Number (ASN) the prefix will be advertised under.

<a href="#">Link to this property</a>

asn\_prepend\_count: optional number

Number of times to prepend the Cloudflare ASN to the BGP AS-Path attribute

maximum3

minimum0

<a href="#">Link to this property</a>

auto\_advertise\_withdraw: optional boolean

Determines if Cloudflare advertises a BYOIP BGP prefix even when there is no matching BGP prefix in the Magic routing table. When true, Cloudflare will automatically withdraw the BGP prefix when there are no matching BGP routes, and will resume advertising when there is at least one matching BGP route.

<a href="#">Link to this property</a>

<details>

<summary>

bgp\_signal\_opts: optional object {enabled, modified\_at }

</summary>

enabled: optional boolean

Whether control of advertisement of the prefix to the Internet is enabled to be performed via BGP signal

<a href="#">Link to this property</a>

modified\_at: optional string

Last time BGP signaling control was toggled. This field is null if BGP signaling has never been enabled.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

cidr: optional string

IP Prefix in Classless Inter-Domain Routing format.

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

modified\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

on\_demand: optional object {advertised, advertised\_modified\_at, on\_demand\_enabled, on\_demand\_locked }

</summary>

advertised: optional boolean

Prefix advertisement status to the Internet. This field is only not ‘null’ if on demand is enabled.

<a href="#">Link to this property</a>

advertised\_modified\_at: optional string

Last time the advertisement status was changed. This field is only not ‘null’ if on demand is enabled.

formatdate-time

<a href="#">Link to this property</a>

on\_demand\_enabled: optional boolean

Whether advertisement of the prefix to the Internet may be dynamically enabled or disabled.

<a href="#">Link to this property</a>

on\_demand\_locked: optional boolean

Whether the advertisement status of the prefix is locked, meaning it cannot be changed.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20addressing.prefixes.bgp_prefixes%20%3E%20(model)%20bgp_prefix%20%3E%20(schema)>)

<details>

<summary>

BGPPrefixDeleteResponse object {errors, messages, success }

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

[Link to this property](#)%20addressing.prefixes.bgp_prefixes%20%3E%20(model)%20bgp_prefix_delete_response%20%3E%20(schema)>)