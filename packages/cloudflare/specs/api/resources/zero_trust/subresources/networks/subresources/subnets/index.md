---
title: Subnets
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Networks](https://developers.cloudflare.com/api/resources/zero_trust/subresources/networks)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Subnets

##### [List Subnets](https://developers.cloudflare.com/api/resources/zero_trust/subresources/networks/subresources/subnets/methods/list)

GET/accounts/{account\_id}/zerotrust/subnets

#### SubnetsWARP

##### [Create WARP IP subnet](https://developers.cloudflare.com/api/resources/zero_trust/subresources/networks/subresources/subnets/subresources/warp/methods/create)

POST/accounts/{account\_id}/zerotrust/subnets/warp

##### [Get WARP IP subnet](https://developers.cloudflare.com/api/resources/zero_trust/subresources/networks/subresources/subnets/subresources/warp/methods/get)

GET/accounts/{account\_id}/zerotrust/subnets/warp/{subnet\_id}

##### [Update WARP IP subnet](https://developers.cloudflare.com/api/resources/zero_trust/subresources/networks/subresources/subnets/subresources/warp/methods/edit)

PATCH/accounts/{account\_id}/zerotrust/subnets/warp/{subnet\_id}

##### [Delete WARP IP subnet](https://developers.cloudflare.com/api/resources/zero_trust/subresources/networks/subresources/subnets/subresources/warp/methods/delete)

DELETE/accounts/{account\_id}/zerotrust/subnets/warp/{subnet\_id}

##### ModelsExpand Collapse

<details>

<summary>

Subnet object {id, capacity, comment, 6 more }

</summary>

id: optional string

The UUID of the subnet.

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

capacity: optional object {total, used }

IP capacity information for the subnet.

</summary>

total: optional number

Total number of assignable IPs in the subnet.

<a href="#">Link to this property</a>

used: optional number

Number of assigned IPs in the subnet.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

comment: optional string

An optional description of the subnet.

<a href="#">Link to this property</a>

created\_at: optional string

Timestamp of when the resource was created.

formatdate-time

<a href="#">Link to this property</a>

deleted\_at: optional string

Timestamp of when the resource was deleted. If <code>null</code>, the resource has not been deleted.

formatdate-time

<a href="#">Link to this property</a>

is\_default\_network: optional boolean

If <code>true</code>, this is the default subnet for the account. There can only be one default subnet per account.

<a href="#">Link to this property</a>

name: optional string

A user-friendly name for the subnet.

<a href="#">Link to this property</a>

network: optional string

The private IPv4 or IPv6 range defining the subnet, in CIDR notation.

<a href="#">Link to this property</a>

<details>

<summary>

subnet\_type: optional "cloudflare\_source"or "initial\_resolved\_ip"or "warp"

The type of subnet.

</summary>

One of the following:

"cloudflare\_source"

<a href="#">Link to this property</a>

"initial\_resolved\_ip"

<a href="#">Link to this property</a>

"warp"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.networks.subnets.warp%20%3E%20(model)%20subnet%20%3E%20(schema)>)

<details>

<summary>

WARPDeleteResponse object {id, capacity, comment, 6 more }

</summary>

id: optional string

The UUID of the subnet.

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

capacity: optional object {total, used }

IP capacity information for the subnet.

</summary>

total: optional number

Total number of assignable IPs in the subnet.

<a href="#">Link to this property</a>

used: optional number

Number of assigned IPs in the subnet.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

comment: optional string

An optional description of the subnet.

<a href="#">Link to this property</a>

created\_at: optional string

Timestamp of when the resource was created.

formatdate-time

<a href="#">Link to this property</a>

deleted\_at: optional string

Timestamp of when the resource was deleted. If <code>null</code>, the resource has not been deleted.

formatdate-time

<a href="#">Link to this property</a>

is\_default\_network: optional boolean

If <code>true</code>, this is the default subnet for the account. There can only be one default subnet per account.

<a href="#">Link to this property</a>

name: optional string

A user-friendly name for the subnet.

<a href="#">Link to this property</a>

network: optional string

The private IPv4 or IPv6 range defining the subnet, in CIDR notation.

<a href="#">Link to this property</a>

<details>

<summary>

subnet\_type: optional "cloudflare\_source"or "initial\_resolved\_ip"or "warp"

The type of subnet.

</summary>

One of the following:

"cloudflare\_source"

<a href="#">Link to this property</a>

"initial\_resolved\_ip"

<a href="#">Link to this property</a>

"warp"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.networks.subnets.warp%20%3E%20(model)%20warp_delete_response%20%3E%20(schema)>)

#### SubnetsCloudflare Source

##### [Update Cloudflare Source Subnet](https://developers.cloudflare.com/api/resources/zero_trust/subresources/networks/subresources/subnets/subresources/cloudflare_source/methods/update)

PATCH/accounts/{account\_id}/zerotrust/subnets/cloudflare\_source/{address\_family}

#### SubnetsInitial Resolved IP

##### [Get Initial Resolved IP Subnet](https://developers.cloudflare.com/api/resources/zero_trust/subresources/networks/subresources/subnets/subresources/initial_resolved_ip/methods/get)

GET/accounts/{account\_id}/zerotrust/subnets/initial\_resolved\_ip/{address\_family}

##### [Update Initial Resolved IP Subnet](https://developers.cloudflare.com/api/resources/zero_trust/subresources/networks/subresources/subnets/subresources/initial_resolved_ip/methods/update)

PUT/accounts/{account\_id}/zerotrust/subnets/initial\_resolved\_ip/{address\_family}