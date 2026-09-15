---
title: Preview active event details
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Waiting Rooms](https://developers.cloudflare.com/api/resources/waiting_rooms)

[Events](https://developers.cloudflare.com/api/resources/waiting_rooms/subresources/events)

[Details](https://developers.cloudflare.com/api/resources/waiting_rooms/subresources/events/subresources/details)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Preview active event details

GET/zones/{zone\_id}/waiting\_rooms/{waiting\_room\_id}/events/{event\_id}/details

Previews an event’s configuration as if it was active. Inherited fields from the waiting room will be displayed with their current values.

##### Security

<details>

<summary>API Token</summary>



The preferred authorization scheme for interacting with the Cloudflare API. <a href="https://developers.cloudflare.com/fundamentals/api/get-started/create-token/">Create a token</a>.

**Example:**<code>Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY</code>

</details>

<details>

<summary>API Email + API Key</summary>



The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**<code>X-Auth-Email: user@example.com</code>

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**<code>X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194</code>

</details>

##### Accepted Permissions (at least one required)

`Waiting Rooms Read``Waiting Rooms Write`

##### P ath ParametersExpand Collapse

zone\_id: string

Identifier.

maxLength32

[Link to this property](#)%20waiting_rooms.events.details%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

waiting\_room\_id: string

[Link to this property](#)%20waiting_rooms.events.details%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20waiting_room_id%20%3E%20(schema)>)

event\_id: string

[Link to this property](#)%20waiting_rooms.events.details%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20event_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {id, created\_on, custom\_page\_html, 13 more }

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

[Link to this property](#)%20waiting_rooms.events.details%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Preview active event details

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/waiting_rooms/$WAITING_ROOM_ID/events/$EVENT_ID/details \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": {
    "id": "25756b2dfe6e378a06b033b670413757",
    "created_on": "2014-01-01T05:20:00.12345Z",
    "custom_page_html": "{{#waitTimeKnown}} {{waitTime}} mins {{/waitTimeKnown}} {{^waitTimeKnown}} Event is prequeueing / Queue all enabled {{/waitTimeKnown}}",
    "description": "Production event - DO NOT MODIFY",
    "disable_session_renewal": false,
    "event_end_time": "2021-09-28T17:00:00Z",
    "event_start_time": "2021-09-28T15:30:00Z",
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "name": "production_webinar_event",
    "new_users_per_minute": 0,
    "prequeue_start_time": "2021-09-28T15:00:00Z",
    "queueing_method": "random",
    "session_duration": 0,
    "shuffle_at_event_start": true,
    "suspended": true,
    "total_active_users": 0
  }
}
```

##### Returns Examples

200 example

```
{
  "result": {
    "id": "25756b2dfe6e378a06b033b670413757",
    "created_on": "2014-01-01T05:20:00.12345Z",
    "custom_page_html": "{{#waitTimeKnown}} {{waitTime}} mins {{/waitTimeKnown}} {{^waitTimeKnown}} Event is prequeueing / Queue all enabled {{/waitTimeKnown}}",
    "description": "Production event - DO NOT MODIFY",
    "disable_session_renewal": false,
    "event_end_time": "2021-09-28T17:00:00Z",
    "event_start_time": "2021-09-28T15:30:00Z",
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "name": "production_webinar_event",
    "new_users_per_minute": 0,
    "prequeue_start_time": "2021-09-28T15:00:00Z",
    "queueing_method": "random",
    "session_duration": 0,
    "shuffle_at_event_start": true,
    "suspended": true,
    "total_active_users": 0
  }
}
```