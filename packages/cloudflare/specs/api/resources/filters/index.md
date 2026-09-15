---
title: Filters
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Filters

##### [List filters](https://developers.cloudflare.com/api/resources/filters/methods/list)

Deprecated

GET/zones/{zone\_id}/filters

##### [Get a filter](https://developers.cloudflare.com/api/resources/filters/methods/get)

Deprecated

GET/zones/{zone\_id}/filters/{filter\_id}

##### [Create filters](https://developers.cloudflare.com/api/resources/filters/methods/create)

Deprecated

POST/zones/{zone\_id}/filters

##### [Update a filter](https://developers.cloudflare.com/api/resources/filters/methods/update)

Deprecated

PUT/zones/{zone\_id}/filters/{filter\_id}

##### [Delete a filter](https://developers.cloudflare.com/api/resources/filters/methods/delete)

Deprecated

DELETE/zones/{zone\_id}/filters/{filter\_id}

##### [Update filters](https://developers.cloudflare.com/api/resources/filters/methods/bulk_update)

Deprecated

PUT/zones/{zone\_id}/filters

##### [Delete filters](https://developers.cloudflare.com/api/resources/filters/methods/bulk_delete)

Deprecated

DELETE/zones/{zone\_id}/filters

##### ModelsExpand Collapse

<details>

<summary>

FirewallFilter object {id, description, expression, 2 more }

</summary>

id: optional string

The unique identifier of the filter.

maxLength32

minLength32

<a href="#">Link to this property</a>

description: optional string

An informative summary of the filter.

maxLength500

<a href="#">Link to this property</a>

expression: optional string

The filter expression. For more information, refer to <a href="https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/">Expressions</a>.

<a href="#">Link to this property</a>

paused: optional boolean

When true, indicates that the filter is currently paused.

<a href="#">Link to this property</a>

ref: optional string

A short reference tag. Allows you to select related filters.

maxLength50

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20filters%20%3E%20(model)%20firewall_filter%20%3E%20(schema)>)

<details>

<summary>

FilterDeleteResponse object {id }

</summary>

id: string

The unique identifier of the filter.

maxLength32

minLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20filters%20%3E%20(model)%20filter_delete_response%20%3E%20(schema)>)

<details>

<summary>

FilterBulkDeleteResponse = array of object {id }

</summary>

id: optional string

The unique identifier of the filter.

maxLength32

minLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20filters%20%3E%20(model)%20filter_bulk_delete_response%20%3E%20(schema)>)