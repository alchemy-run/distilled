---
title: Apps
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Magic Transit](https://developers.cloudflare.com/api/resources/magic_transit)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Apps

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