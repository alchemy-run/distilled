---
title: Cache Reserve
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Cache](https://developers.cloudflare.com/api/resources/cache)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Cache Reserve

##### [Get Cache Reserve setting](https://developers.cloudflare.com/api/resources/cache/subresources/cache_reserve/methods/get)

GET/zones/{zone\_id}/cache/cache\_reserve

##### [Change Cache Reserve setting](https://developers.cloudflare.com/api/resources/cache/subresources/cache_reserve/methods/edit)

PATCH/zones/{zone\_id}/cache/cache\_reserve

##### [Get Cache Reserve Clear](https://developers.cloudflare.com/api/resources/cache/subresources/cache_reserve/methods/status)

GET/zones/{zone\_id}/cache/cache\_reserve\_clear

##### [Start Cache Reserve Clear](https://developers.cloudflare.com/api/resources/cache/subresources/cache_reserve/methods/clear)

POST/zones/{zone\_id}/cache/cache\_reserve\_clear

##### ModelsExpand Collapse

CacheReserve = "cache\_reserve"

The identifier of the caching setting.

[Link to this property](#)%20cache.cache_reserve%20%3E%20(model)%20cache_reserve%20%3E%20(schema)>)

CacheReserveClear = "cache\_reserve\_clear"

ID of the zone setting.

[Link to this property](#)%20cache.cache_reserve%20%3E%20(model)%20cache_reserve_clear%20%3E%20(schema)>)

<details>

<summary>

State = "In-progress"or "Completed"

The current state of the Cache Reserve Clear operation.

</summary>

One of the following:

"In-progress"

<a href="#">Link to this property</a>

"Completed"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cache.cache_reserve%20%3E%20(model)%20state%20%3E%20(schema)>)

<details>

<summary>

CacheReserveGetResponse object {id, editable, value, modified\_on }

</summary>

id: <a href="https://developers.cloudflare.com/api/resources/cache#(resource)%20cache.cache_reserve%20%3E%20(model)%20cache_reserve%20%3E%20(schema)">CacheReserve</a>

The identifier of the caching setting.

<a href="#">Link to this property</a>

editable: boolean

Whether the setting is editable.

<a href="#">Link to this property</a>

<details>

<summary>

value: "on"or "off"

Value of the Cache Reserve zone setting.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

Last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cache.cache_reserve%20%3E%20(model)%20cache_reserve_get_response%20%3E%20(schema)>)

<details>

<summary>

CacheReserveEditResponse object {id, editable, value, modified\_on }

</summary>

id: <a href="https://developers.cloudflare.com/api/resources/cache#(resource)%20cache.cache_reserve%20%3E%20(model)%20cache_reserve%20%3E%20(schema)">CacheReserve</a>

The identifier of the caching setting.

<a href="#">Link to this property</a>

editable: boolean

Whether the setting is editable.

<a href="#">Link to this property</a>

<details>

<summary>

value: "on"or "off"

Value of the Cache Reserve zone setting.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

Last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cache.cache_reserve%20%3E%20(model)%20cache_reserve_edit_response%20%3E%20(schema)>)

<details>

<summary>

CacheReserveStatusResponse object {id, start\_ts, state, 2 more }

You can use Cache Reserve Clear to clear your Cache Reserve, but you must first disable Cache Reserve. In most cases, this will be accomplished within 24 hours. You cannot re-enable Cache Reserve while this process is ongoing. Keep in mind that you cannot undo or cancel this operation.

</summary>

id: <a href="https://developers.cloudflare.com/api/resources/cache#(resource)%20cache.cache_reserve%20%3E%20(model)%20cache_reserve_clear%20%3E%20(schema)">CacheReserveClear</a>

ID of the zone setting.

<a href="#">Link to this property</a>

start\_ts: string

The time that the latest Cache Reserve Clear operation started.

formatdate-time

<a href="#">Link to this property</a>

state: <a href="https://developers.cloudflare.com/api/resources/cache#(resource)%20cache.cache_reserve%20%3E%20(model)%20state%20%3E%20(schema)">State</a>

The current state of the Cache Reserve Clear operation.

<a href="#">Link to this property</a>

end\_ts: optional string

The time that the latest Cache Reserve Clear operation completed.

formatdate-time

<a href="#">Link to this property</a>

modified\_on: optional string

Last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cache.cache_reserve%20%3E%20(model)%20cache_reserve_status_response%20%3E%20(schema)>)

<details>

<summary>

CacheReserveClearResponse object {id, start\_ts, state, 2 more }

You can use Cache Reserve Clear to clear your Cache Reserve, but you must first disable Cache Reserve. In most cases, this will be accomplished within 24 hours. You cannot re-enable Cache Reserve while this process is ongoing. Keep in mind that you cannot undo or cancel this operation.

</summary>

id: <a href="https://developers.cloudflare.com/api/resources/cache#(resource)%20cache.cache_reserve%20%3E%20(model)%20cache_reserve_clear%20%3E%20(schema)">CacheReserveClear</a>

ID of the zone setting.

<a href="#">Link to this property</a>

start\_ts: string

The time that the latest Cache Reserve Clear operation started.

formatdate-time

<a href="#">Link to this property</a>

state: <a href="https://developers.cloudflare.com/api/resources/cache#(resource)%20cache.cache_reserve%20%3E%20(model)%20state%20%3E%20(schema)">State</a>

The current state of the Cache Reserve Clear operation.

<a href="#">Link to this property</a>

end\_ts: optional string

The time that the latest Cache Reserve Clear operation completed.

formatdate-time

<a href="#">Link to this property</a>

modified\_on: optional string

Last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cache.cache_reserve%20%3E%20(model)%20cache_reserve_clear_response%20%3E%20(schema)>)