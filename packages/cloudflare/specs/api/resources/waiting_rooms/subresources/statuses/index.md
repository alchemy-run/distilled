---
title: Statuses
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Waiting Rooms](https://developers.cloudflare.com/api/resources/waiting_rooms)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Statuses

##### [Get waiting room status](https://developers.cloudflare.com/api/resources/waiting_rooms/subresources/statuses/methods/get)

GET/zones/{zone\_id}/waiting\_rooms/{waiting\_room\_id}/status

##### ModelsExpand Collapse

<details>

<summary>

StatusGetResponse object {estimated\_queued\_users, estimated\_total\_active\_users, event\_id, 2 more }

</summary>

estimated\_queued\_users: optional number

<a href="#">Link to this property</a>

estimated\_total\_active\_users: optional number

<a href="#">Link to this property</a>

event\_id: optional string

<a href="#">Link to this property</a>

max\_estimated\_time\_minutes: optional number

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "event\_prequeueing"or "not\_queueing"or "queueing"or "suspended"

</summary>

One of the following:

"event\_prequeueing"

<a href="#">Link to this property</a>

"not\_queueing"

<a href="#">Link to this property</a>

"queueing"

<a href="#">Link to this property</a>

"suspended"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20waiting_rooms.statuses%20%3E%20(model)%20status_get_response%20%3E%20(schema)>)