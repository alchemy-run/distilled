---
title: Custom Nameservers
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zones](https://developers.cloudflare.com/api/resources/zones)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Custom Nameservers

##### [Get Account Custom Nameserver Related Zone Metadata](https://developers.cloudflare.com/api/resources/zones/subresources/custom_nameservers/methods/get)

Deprecated

GET/zones/{zone\_id}/custom\_ns

##### [Set Account Custom Nameserver Related Zone Metadata](https://developers.cloudflare.com/api/resources/zones/subresources/custom_nameservers/methods/update)

Deprecated

PUT/zones/{zone\_id}/custom\_ns

##### ModelsExpand Collapse

<details>

<summary>

CustomNameserverGetResponse object {errors, messages, success, 3 more }

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

enabled: optional boolean

Whether zone uses account-level custom nameservers.

<a href="#">Link to this property</a>

ns\_set: optional number

The number of the name server set to assign to the zone.

maximum5

minimum1

<a href="#">Link to this property</a>

<details>

<summary>

result\_info: optional object {count, page, per\_page, 2 more }

</summary>

count: optional number

Total number of results for the requested service.

<a href="#">Link to this property</a>

page: optional number

Current page within paginated list of results.

<a href="#">Link to this property</a>

per\_page: optional number

Number of results per page of results.

<a href="#">Link to this property</a>

total\_count: optional number

Total results available without any search parameters.

<a href="#">Link to this property</a>

total\_pages: optional number

The number of total pages in the entire result set.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zones.custom_nameservers%20%3E%20(model)%20custom_nameserver_get_response%20%3E%20(schema)>)

CustomNameserverUpdateResponse = string

Unused

[Link to this property](#)%20zones.custom_nameservers%20%3E%20(model)%20custom_nameserver_update_response%20%3E%20(schema)>)