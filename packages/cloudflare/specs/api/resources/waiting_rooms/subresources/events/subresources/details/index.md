---
title: Details
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Waiting Rooms](https://developers.cloudflare.com/api/resources/waiting_rooms)

[Events](https://developers.cloudflare.com/api/resources/waiting_rooms/subresources/events)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Details

##### [Preview active event details](https://developers.cloudflare.com/api/resources/waiting_rooms/subresources/events/subresources/details/methods/get)

GET/zones/{zone\_id}/waiting\_rooms/{waiting\_room\_id}/events/{event\_id}/details

##### ModelsExpand Collapse

<details>

<summary>

EventQuery object {event\_end\_time, event\_start\_time, name, 12 more }

</summary>

event\_end\_time: string

An ISO 8601 timestamp that marks the end of the event.

<a href="#">Link to this property</a>

event\_start\_time: string

An ISO 8601 timestamp that marks the start of the event. At this time, queued users will be processed with the event’s configuration. The start time must be at least one minute before <code>event_end_time</code>.

<a href="#">Link to this property</a>

name: string

A unique name to identify the event. Only alphanumeric characters, hyphens and underscores are allowed.

<a href="#">Link to this property</a>

custom\_page\_html: optional string

If set, the event will override the waiting room’s <code>custom_page_html</code> property while it is active. If null, the event will inherit it.

<a href="#">Link to this property</a>

description: optional string

A note that you can use to add more details about the event.

<a href="#">Link to this property</a>

disable\_session\_renewal: optional boolean

If set, the event will override the waiting room’s <code>disable_session_renewal</code> property while it is active. If null, the event will inherit it.

<a href="#">Link to this property</a>

new\_users\_per\_minute: optional number

If set, the event will override the waiting room’s <code>new_users_per_minute</code> property while it is active. If null, the event will inherit it. This can only be set if the event’s <code>total_active_users</code> property is also set.

maximum2147483647

minimum200

<a href="#">Link to this property</a>

prequeue\_start\_time: optional string

An ISO 8601 timestamp that marks when to begin queueing all users before the event starts. The prequeue must start at least five minutes before <code>event_start_time</code>.

<a href="#">Link to this property</a>

queueing\_method: optional string

If set, the event will override the waiting room’s <code>queueing_method</code> property while it is active. If null, the event will inherit it.

<a href="#">Link to this property</a>

session\_duration: optional number

If set, the event will override the waiting room’s <code>session_duration</code> property while it is active. If null, the event will inherit it.

maximum30

minimum1

<a href="#">Link to this property</a>

shuffle\_at\_event\_start: optional boolean

If enabled, users in the prequeue will be shuffled randomly at the <code>event_start_time</code>. Requires that <code>prequeue_start_time</code> is not null. This is useful for situations when many users will join the event prequeue at the same time and you want to shuffle them to ensure fairness. Naturally, it makes the most sense to enable this feature when the <code>queueing_method</code> during the event respects ordering such as **fifo**, or else the shuffling may be unnecessary.

<a href="#">Link to this property</a>

suspended: optional boolean

Suspends or allows an event. If set to <code>true</code>, the event is ignored and traffic will be handled based on the waiting room configuration.

<a href="#">Link to this property</a>

total\_active\_users: optional number

If set, the event will override the waiting room’s <code>total_active_users</code> property while it is active. If null, the event will inherit it. This can only be set if the event’s <code>new_users_per_minute</code> property is also set.

maximum2147483647

minimum200

<a href="#">Link to this property</a>

<details>

<summary>

turnstile\_action: optional "log"or "infinite\_queue"

If set, the event will override the waiting room’s <code>turnstile_action</code> property while it is active. If null, the event will inherit it.

</summary>

One of the following:

"log"

<a href="#">Link to this property</a>

"infinite\_queue"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

turnstile\_mode: optional "off"or "invisible"or "visible\_non\_interactive"or "visible\_managed"

If set, the event will override the waiting room’s <code>turnstile_mode</code> property while it is active. If null, the event will inherit it.

</summary>

One of the following:

"off"

<a href="#">Link to this property</a>

"invisible"

<a href="#">Link to this property</a>

"visible\_non\_interactive"

<a href="#">Link to this property</a>

"visible\_managed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20waiting_rooms.events.details%20%3E%20(model)%20event_query%20%3E%20(schema)>)

<details>

<summary>

DetailGetResponse object {id, created\_on, custom\_page\_html, 13 more }

</summary>

id: optional string

<a href="#">Link to this property</a>

created\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

custom\_page\_html: optional string

<a href="#">Link to this property</a>

description: optional string

A note that you can use to add more details about the event.

<a href="#">Link to this property</a>

disable\_session\_renewal: optional boolean

<a href="#">Link to this property</a>

event\_end\_time: optional string

An ISO 8601 timestamp that marks the end of the event.

<a href="#">Link to this property</a>

event\_start\_time: optional string

An ISO 8601 timestamp that marks the start of the event. At this time, queued users will be processed with the event’s configuration. The start time must be at least one minute before <code>event_end_time</code>.

<a href="#">Link to this property</a>

modified\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

name: optional string

A unique name to identify the event. Only alphanumeric characters, hyphens and underscores are allowed.

<a href="#">Link to this property</a>

new\_users\_per\_minute: optional number

<a href="#">Link to this property</a>

prequeue\_start\_time: optional string

An ISO 8601 timestamp that marks when to begin queueing all users before the event starts. The prequeue must start at least five minutes before <code>event_start_time</code>.

<a href="#">Link to this property</a>

queueing\_method: optional string

<a href="#">Link to this property</a>

session\_duration: optional number

<a href="#">Link to this property</a>

shuffle\_at\_event\_start: optional boolean

If enabled, users in the prequeue will be shuffled randomly at the <code>event_start_time</code>. Requires that <code>prequeue_start_time</code> is not null. This is useful for situations when many users will join the event prequeue at the same time and you want to shuffle them to ensure fairness. Naturally, it makes the most sense to enable this feature when the <code>queueing_method</code> during the event respects ordering such as **fifo**, or else the shuffling may be unnecessary.

<a href="#">Link to this property</a>

suspended: optional boolean

Suspends or allows an event. If set to <code>true</code>, the event is ignored and traffic will be handled based on the waiting room configuration.

<a href="#">Link to this property</a>

total\_active\_users: optional number

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20waiting_rooms.events.details%20%3E%20(model)%20detail_get_response%20%3E%20(schema)>)