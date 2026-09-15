---
title: BGP Filter Profiles
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Magic Transit](https://developers.cloudflare.com/api/resources/magic_transit)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# BGP Filter Profiles

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