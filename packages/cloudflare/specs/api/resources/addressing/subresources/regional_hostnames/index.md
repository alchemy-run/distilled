---
title: Regional Hostnames
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Addressing](https://developers.cloudflare.com/api/resources/addressing)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Regional Hostnames

##### [List Regional Hostnames](https://developers.cloudflare.com/api/resources/addressing/subresources/regional_hostnames/methods/list)

GET/zones/{zone\_id}/addressing/regional\_hostnames

##### [Fetch Regional Hostname](https://developers.cloudflare.com/api/resources/addressing/subresources/regional_hostnames/methods/get)

GET/zones/{zone\_id}/addressing/regional\_hostnames/{hostname}

##### [Create Regional Hostname](https://developers.cloudflare.com/api/resources/addressing/subresources/regional_hostnames/methods/create)

POST/zones/{zone\_id}/addressing/regional\_hostnames

##### [Update Regional Hostname](https://developers.cloudflare.com/api/resources/addressing/subresources/regional_hostnames/methods/edit)

PATCH/zones/{zone\_id}/addressing/regional\_hostnames/{hostname}

##### [Delete Regional Hostname](https://developers.cloudflare.com/api/resources/addressing/subresources/regional_hostnames/methods/delete)

DELETE/zones/{zone\_id}/addressing/regional\_hostnames/{hostname}

##### ModelsExpand Collapse

<details>

<summary>

RegionalHostnameListResponse object {created\_on, hostname, region\_key, routing }

</summary>

created\_on: string

When the regional hostname was created

formatdate-time

<a href="#">Link to this property</a>

hostname: string

DNS hostname to be regionalized, must be a subdomain of the zone. Wildcards are supported for one level, e.g <code>*.example.com</code>

<a href="#">Link to this property</a>

region\_key: string

Identifying key for the region

<a href="#">Link to this property</a>

routing: string

Configure which routing method to use for the regional hostname

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20addressing.regional_hostnames%20%3E%20(model)%20regional_hostname_list_response%20%3E%20(schema)>)

<details>

<summary>

RegionalHostnameGetResponse object {created\_on, hostname, region\_key, routing }

</summary>

created\_on: string

When the regional hostname was created

formatdate-time

<a href="#">Link to this property</a>

hostname: string

DNS hostname to be regionalized, must be a subdomain of the zone. Wildcards are supported for one level, e.g <code>*.example.com</code>

<a href="#">Link to this property</a>

region\_key: string

Identifying key for the region

<a href="#">Link to this property</a>

routing: string

Configure which routing method to use for the regional hostname

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20addressing.regional_hostnames%20%3E%20(model)%20regional_hostname_get_response%20%3E%20(schema)>)

<details>

<summary>

RegionalHostnameCreateResponse object {created\_on, hostname, region\_key, routing }

</summary>

created\_on: string

When the regional hostname was created

formatdate-time

<a href="#">Link to this property</a>

hostname: string

DNS hostname to be regionalized, must be a subdomain of the zone. Wildcards are supported for one level, e.g <code>*.example.com</code>

<a href="#">Link to this property</a>

region\_key: string

Identifying key for the region

<a href="#">Link to this property</a>

routing: string

Configure which routing method to use for the regional hostname

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20addressing.regional_hostnames%20%3E%20(model)%20regional_hostname_create_response%20%3E%20(schema)>)

<details>

<summary>

RegionalHostnameEditResponse object {created\_on, hostname, region\_key, routing }

</summary>

created\_on: string

When the regional hostname was created

formatdate-time

<a href="#">Link to this property</a>

hostname: string

DNS hostname to be regionalized, must be a subdomain of the zone. Wildcards are supported for one level, e.g <code>*.example.com</code>

<a href="#">Link to this property</a>

region\_key: string

Identifying key for the region

<a href="#">Link to this property</a>

routing: string

Configure which routing method to use for the regional hostname

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20addressing.regional_hostnames%20%3E%20(model)%20regional_hostname_edit_response%20%3E%20(schema)>)

<details>

<summary>

RegionalHostnameDeleteResponse object {errors, messages, success }

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

[Link to this property](#)%20addressing.regional_hostnames%20%3E%20(model)%20regional_hostname_delete_response%20%3E%20(schema)>)

#### Regional HostnamesRegions

##### [List Regions](https://developers.cloudflare.com/api/resources/addressing/subresources/regional_hostnames/subresources/regions/methods/list)

GET/accounts/{account\_id}/addressing/regional\_hostnames/regions

##### ModelsExpand Collapse

<details>

<summary>

RegionListResponse object {key, label }

</summary>

key: optional string

Identifying key for the region

<a href="#">Link to this property</a>

label: optional string

Human-readable text label for the region

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20addressing.regional_hostnames.regions%20%3E%20(model)%20region_list_response%20%3E%20(schema)>)