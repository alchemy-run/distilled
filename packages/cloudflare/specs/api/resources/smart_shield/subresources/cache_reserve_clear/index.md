---
title: Cache Reserve Clear
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Smart Shield](https://developers.cloudflare.com/api/resources/smart_shield)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Cache Reserve Clear

##### [Get Cache Reserve Clear](https://developers.cloudflare.com/api/resources/smart_shield/subresources/cache_reserve_clear/methods/status)

GET/zones/{zone\_id}/smart\_shield/cache\_reserve\_clear

##### [Start Cache Reserve Clear](https://developers.cloudflare.com/api/resources/smart_shield/subresources/cache_reserve_clear/methods/clear)

POST/zones/{zone\_id}/smart\_shield/cache\_reserve\_clear

##### ModelsExpand Collapse

<details>

<summary>

CacheReserveClearStatusResponse object {id, start\_ts, state, 2 more }

You can use Cache Reserve Clear to clear your Cache Reserve, but you must first disable Cache Reserve. In most cases, this will be accomplished within 24 hours. You cannot re-enable Cache Reserve while this process is ongoing. Keep in mind that you cannot undo or cancel this operation.

</summary>

id: <a href="https://developers.cloudflare.com/api/resources/cache#(resource)%20cache.cache_reserve%20%3E%20(model)%20cache_reserve_clear%20%3E%20(schema)">CacheReserveClear</a>

ID of the zone setting.

<a href="#">Link to this property</a>

start\_ts: string

The time that the latest Cache Reserve Clear operation started.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

state: "In-progress"or "Completed"

The current state of the Cache Reserve Clear operation.

</summary>

One of the following:

"In-progress"

<a href="#">Link to this property</a>

"Completed"

<a href="#">Link to this property</a>

</details>

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

[Link to this property](#)%20smart_shield.cache_reserve_clear%20%3E%20(model)%20cache_reserve_clear_status_response%20%3E%20(schema)>)

<details>

<summary>

CacheReserveClearClearResponse object {id, start\_ts, state, 2 more }

You can use Cache Reserve Clear to clear your Cache Reserve, but you must first disable Cache Reserve. In most cases, this will be accomplished within 24 hours. You cannot re-enable Cache Reserve while this process is ongoing. Keep in mind that you cannot undo or cancel this operation.

</summary>

id: <a href="https://developers.cloudflare.com/api/resources/cache#(resource)%20cache.cache_reserve%20%3E%20(model)%20cache_reserve_clear%20%3E%20(schema)">CacheReserveClear</a>

ID of the zone setting.

<a href="#">Link to this property</a>

start\_ts: string

The time that the latest Cache Reserve Clear operation started.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

state: "In-progress"or "Completed"

The current state of the Cache Reserve Clear operation.

</summary>

One of the following:

"In-progress"

<a href="#">Link to this property</a>

"Completed"

<a href="#">Link to this property</a>

</details>

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

[Link to this property](#)%20smart_shield.cache_reserve_clear%20%3E%20(model)%20cache_reserve_clear_clear_response%20%3E%20(schema)>)