---
title: Infrastructure
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Access](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Infrastructure

#### InfrastructureTargets

##### [List all targets](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/infrastructure/subresources/targets/methods/list)

GET/accounts/{account\_id}/infrastructure/targets

##### [Get target](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/infrastructure/subresources/targets/methods/get)

GET/accounts/{account\_id}/infrastructure/targets/{target\_id}

##### [Create new target](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/infrastructure/subresources/targets/methods/create)

POST/accounts/{account\_id}/infrastructure/targets

##### [Update target](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/infrastructure/subresources/targets/methods/update)

PUT/accounts/{account\_id}/infrastructure/targets/{target\_id}

##### [Delete target](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/infrastructure/subresources/targets/methods/delete)

DELETE/accounts/{account\_id}/infrastructure/targets/{target\_id}

##### [Create new targets](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/infrastructure/subresources/targets/methods/bulk_update)

PUT/accounts/{account\_id}/infrastructure/targets/batch

##### [Delete targets (Deprecated)](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/infrastructure/subresources/targets/methods/bulk_delete)

Deprecated

DELETE/accounts/{account\_id}/infrastructure/targets/batch

##### [Delete targets](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/infrastructure/subresources/targets/methods/bulk_delete_v2)

POST/accounts/{account\_id}/infrastructure/targets/batch\_delete

##### ModelsExpand Collapse

<details>

<summary>

TargetListResponse object {id, created\_at, hostname, 3 more }

</summary>

id: string

Target identifier

formatuuid

maxLength36

<a href="#">Link to this property</a>

created\_at: string

Date and time at which the target was created

formatdate-time

<a href="#">Link to this property</a>

hostname: string

A non-unique field that refers to a target

<a href="#">Link to this property</a>

<details>

<summary>

ip: object {ipv4, ipv6 }

The IPv4/IPv6 address that identifies where to reach a target

</summary>

<details>

<summary>

ipv4: optional object {ip\_addr, virtual\_network\_id }

The target’s IPv4 address

</summary>

ip\_addr: optional string

IP address of the target

<a href="#">Link to this property</a>

virtual\_network\_id: optional string

(optional) Private virtual network identifier for the target. If omitted, the default virtual network ID will be used.

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ipv6: optional object {ip\_addr, virtual\_network\_id }

The target’s IPv6 address

</summary>

ip\_addr: optional string

IP address of the target

<a href="#">Link to this property</a>

virtual\_network\_id: optional string

(optional) Private virtual network identifier for the target. If omitted, the default virtual network ID will be used.

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_at: string

Date and time at which the target was modified

formatdate-time

<a href="#">Link to this property</a>

tags: optional map\[string]

Tags assigned to the target. Empty when no tags are assigned.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.infrastructure.targets%20%3E%20(model)%20target_list_response%20%3E%20(schema)>)

<details>

<summary>

TargetGetResponse object {id, created\_at, hostname, 3 more }

</summary>

id: string

Target identifier

formatuuid

maxLength36

<a href="#">Link to this property</a>

created\_at: string

Date and time at which the target was created

formatdate-time

<a href="#">Link to this property</a>

hostname: string

A non-unique field that refers to a target

<a href="#">Link to this property</a>

<details>

<summary>

ip: object {ipv4, ipv6 }

The IPv4/IPv6 address that identifies where to reach a target

</summary>

<details>

<summary>

ipv4: optional object {ip\_addr, virtual\_network\_id }

The target’s IPv4 address

</summary>

ip\_addr: optional string

IP address of the target

<a href="#">Link to this property</a>

virtual\_network\_id: optional string

(optional) Private virtual network identifier for the target. If omitted, the default virtual network ID will be used.

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ipv6: optional object {ip\_addr, virtual\_network\_id }

The target’s IPv6 address

</summary>

ip\_addr: optional string

IP address of the target

<a href="#">Link to this property</a>

virtual\_network\_id: optional string

(optional) Private virtual network identifier for the target. If omitted, the default virtual network ID will be used.

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_at: string

Date and time at which the target was modified

formatdate-time

<a href="#">Link to this property</a>

tags: optional map\[string]

Tags assigned to the target. Empty when no tags are assigned.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.infrastructure.targets%20%3E%20(model)%20target_get_response%20%3E%20(schema)>)

<details>

<summary>

TargetCreateResponse object {id, created\_at, hostname, 3 more }

</summary>

id: string

Target identifier

formatuuid

maxLength36

<a href="#">Link to this property</a>

created\_at: string

Date and time at which the target was created

formatdate-time

<a href="#">Link to this property</a>

hostname: string

A non-unique field that refers to a target

<a href="#">Link to this property</a>

<details>

<summary>

ip: object {ipv4, ipv6 }

The IPv4/IPv6 address that identifies where to reach a target

</summary>

<details>

<summary>

ipv4: optional object {ip\_addr, virtual\_network\_id }

The target’s IPv4 address

</summary>

ip\_addr: optional string

IP address of the target

<a href="#">Link to this property</a>

virtual\_network\_id: optional string

(optional) Private virtual network identifier for the target. If omitted, the default virtual network ID will be used.

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ipv6: optional object {ip\_addr, virtual\_network\_id }

The target’s IPv6 address

</summary>

ip\_addr: optional string

IP address of the target

<a href="#">Link to this property</a>

virtual\_network\_id: optional string

(optional) Private virtual network identifier for the target. If omitted, the default virtual network ID will be used.

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_at: string

Date and time at which the target was modified

formatdate-time

<a href="#">Link to this property</a>

tags: optional map\[string]

Tags assigned to the target. Empty when no tags are assigned.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.infrastructure.targets%20%3E%20(model)%20target_create_response%20%3E%20(schema)>)

<details>

<summary>

TargetUpdateResponse object {id, created\_at, hostname, 3 more }

</summary>

id: string

Target identifier

formatuuid

maxLength36

<a href="#">Link to this property</a>

created\_at: string

Date and time at which the target was created

formatdate-time

<a href="#">Link to this property</a>

hostname: string

A non-unique field that refers to a target

<a href="#">Link to this property</a>

<details>

<summary>

ip: object {ipv4, ipv6 }

The IPv4/IPv6 address that identifies where to reach a target

</summary>

<details>

<summary>

ipv4: optional object {ip\_addr, virtual\_network\_id }

The target’s IPv4 address

</summary>

ip\_addr: optional string

IP address of the target

<a href="#">Link to this property</a>

virtual\_network\_id: optional string

(optional) Private virtual network identifier for the target. If omitted, the default virtual network ID will be used.

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ipv6: optional object {ip\_addr, virtual\_network\_id }

The target’s IPv6 address

</summary>

ip\_addr: optional string

IP address of the target

<a href="#">Link to this property</a>

virtual\_network\_id: optional string

(optional) Private virtual network identifier for the target. If omitted, the default virtual network ID will be used.

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_at: string

Date and time at which the target was modified

formatdate-time

<a href="#">Link to this property</a>

tags: optional map\[string]

Tags assigned to the target. Empty when no tags are assigned.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.infrastructure.targets%20%3E%20(model)%20target_update_response%20%3E%20(schema)>)

<details>

<summary>

TargetBulkUpdateResponse object {id, created\_at, hostname, 3 more }

</summary>

id: string

Target identifier

formatuuid

maxLength36

<a href="#">Link to this property</a>

created\_at: string

Date and time at which the target was created

formatdate-time

<a href="#">Link to this property</a>

hostname: string

A non-unique field that refers to a target

<a href="#">Link to this property</a>

<details>

<summary>

ip: object {ipv4, ipv6 }

The IPv4/IPv6 address that identifies where to reach a target

</summary>

<details>

<summary>

ipv4: optional object {ip\_addr, virtual\_network\_id }

The target’s IPv4 address

</summary>

ip\_addr: optional string

IP address of the target

<a href="#">Link to this property</a>

virtual\_network\_id: optional string

(optional) Private virtual network identifier for the target. If omitted, the default virtual network ID will be used.

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ipv6: optional object {ip\_addr, virtual\_network\_id }

The target’s IPv6 address

</summary>

ip\_addr: optional string

IP address of the target

<a href="#">Link to this property</a>

virtual\_network\_id: optional string

(optional) Private virtual network identifier for the target. If omitted, the default virtual network ID will be used.

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_at: string

Date and time at which the target was modified

formatdate-time

<a href="#">Link to this property</a>

tags: optional map\[string]

Tags assigned to the target. Empty when no tags are assigned.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.infrastructure.targets%20%3E%20(model)%20target_bulk_update_response%20%3E%20(schema)>)