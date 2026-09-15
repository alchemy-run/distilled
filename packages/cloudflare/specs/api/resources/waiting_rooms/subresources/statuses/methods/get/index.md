---
title: Get waiting room status
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Waiting Rooms](https://developers.cloudflare.com/api/resources/waiting_rooms)

[Statuses](https://developers.cloudflare.com/api/resources/waiting_rooms/subresources/statuses)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get waiting room status

GET/zones/{zone\_id}/waiting\_rooms/{waiting\_room\_id}/status

Fetches the status of a configured waiting room. Response fields include:

1. `status`: String indicating the status of the waiting room. The possible status are:
   - **not\_queueing** indicates that the configured thresholds have not been met and all users are going through to the origin.
   - **queueing** indicates that the thresholds have been met and some users are held in the waiting room.
   - **event\_prequeueing** indicates that an event is active and is currently prequeueing users before it starts.
   - **suspended** indicates that the room is suspended.
2. `event_id`: String of the current event’s `id` if an event is active, otherwise an empty string.
3. `estimated_queued_users`: Integer of the estimated number of users currently waiting in the queue.
4. `estimated_total_active_users`: Integer of the estimated number of users currently active on the origin.
5. `max_estimated_time_minutes`: Integer of the maximum estimated time currently presented to the users.

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

[Link to this property](#)%20waiting_rooms.statuses%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

waiting\_room\_id: string

[Link to this property](#)%20waiting_rooms.statuses%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20waiting_room_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {estimated\_queued\_users, estimated\_total\_active\_users, event\_id, 2 more }

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

[Link to this property](#)%20waiting_rooms.statuses%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Get waiting room status

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/waiting_rooms/$WAITING_ROOM_ID/status \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": {
    "estimated_queued_users": 0,
    "estimated_total_active_users": 0,
    "event_id": "25756b2dfe6e378a06b033b670413757",
    "max_estimated_time_minutes": 0,
    "status": "queueing"
  }
}
```

##### Returns Examples

200 example

```
{
  "result": {
    "estimated_queued_users": 0,
    "estimated_total_active_users": 0,
    "event_id": "25756b2dfe6e378a06b033b670413757",
    "max_estimated_time_minutes": 0,
    "status": "queueing"
  }
}
```