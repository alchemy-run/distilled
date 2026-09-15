---
title: Create a custom waiting room page preview
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Waiting Rooms](https://developers.cloudflare.com/api/resources/waiting_rooms)

[Page](https://developers.cloudflare.com/api/resources/waiting_rooms/subresources/page)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Create a custom waiting room page preview

POST/zones/{zone\_id}/waiting\_rooms/preview

Creates a waiting room page preview. Upload a custom waiting room page for preview. You will receive a preview URL in the form `http://waitingrooms.dev/preview/<uuid>`. You can use the following query parameters to change the state of the preview:

1. `force_queue`: Boolean indicating if all users will be queued in the waiting room and no one will be let into the origin website (also known as queueAll).
2. `queue_is_full`: Boolean indicating if the waiting room’s queue is currently full and not accepting new users at the moment.
3. `queueing_method`: The queueing method currently used by the waiting room.
   - **fifo** indicates a FIFO queue.
   - **random** indicates a Random queue.
   - **passthrough** indicates a Passthrough queue. Keep in mind that the waiting room page will only be displayed if `force_queue=true` or `event=prequeueing` — for other cases the request will pass through to the origin. For our preview, this will be a fake origin website returning “Welcome”.
   - **reject** indicates a Reject queue.
4. `event`: Used to preview a waiting room event.
   - **none** indicates no event is occurring.
   - **prequeueing** indicates that an event is prequeueing (between `prequeue_start_time` and `event_start_time`).
   - **started** indicates that an event has started (between `event_start_time` and `event_end_time`).
5. `shuffle_at_event_start`: Boolean indicating if the event will shuffle users in the prequeue when it starts. This can only be set to **true** if an event is active ( `event` is not **none**).

For example, you can make a request to `http://waitingrooms.dev/preview/<uuid>?force_queue=false&queue_is_full=false&queueing_method=random&event=started&shuffle_at_event_start=true` 6. `waitTime`: Non-zero, positive integer indicating the estimated wait time in minutes. The default value is 10 minutes.

For example, you can make a request to `http://waitingrooms.dev/preview/<uuid>?waitTime=50` to configure the estimated wait time as 50 minutes.

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

`Waiting Rooms Write`

##### P ath ParametersExpand Collapse

zone\_id: string

Identifier.

maxLength32

[Link to this property](#)%20waiting_rooms.page%20%3E%20(method)%20preview%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

custom\_html: string

Only available for the Waiting Room Advanced subscription. This is a template html file that will be rendered at the edge. If no custom\_page\_html is provided, the default waiting room will be used. The template is based on mustache ( https://mustache.github.io/ ). There are several variables that are evaluated by the Cloudflare edge:

1. {{ `waitTimeKnown`}} Acts like a boolean value that indicates the behavior to take when wait time is not available, for instance when queue\_all is **true**.
2. {{ `waitTimeFormatted`}} Estimated wait time for the user. For example, five minutes. Alternatively, you can use:
3. {{ `waitTime`}} Number of minutes of estimated wait for a user.
4. {{ `waitTimeHours`}} Number of hours of estimated wait for a user ( `Math.floor(waitTime/60)`).
5. {{ `waitTimeHourMinutes`}} Number of minutes above the `waitTimeHours` value ( `waitTime%60`).
6. {{ `queueIsFull`}} Changes to **true** when no more people can be added to the queue.

To view the full list of variables, look at the `cfWaitingRoom` object described under the `json_response_enabled` property in other Waiting Room API calls.

[Link to this property](#)%20waiting_rooms.page%20%3E%20(method)%20preview%20%3E%20(params)%200%20%3E%20(param)%20custom_html%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {preview\_url }

</summary>

preview\_url: optional string

URL where the custom waiting room page can temporarily be previewed.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20waiting_rooms.page%20%3E%20(method)%20preview%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Create a custom waiting room page preview

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/waiting_rooms/preview \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "custom_html": "{{#waitTimeKnown}} {{waitTime}} mins {{/waitTimeKnown}} {{^waitTimeKnown}} Queue all enabled {{/waitTimeKnown}}"
        }'
```

200 example

```
{
  "result": {
    "preview_url": "http://waitingrooms.dev/preview/35af8c12-6d68-4608-babb-b53435a5ddfb"
  }
}
```

##### Returns Examples

200 example

```
{
  "result": {
    "preview_url": "http://waitingrooms.dev/preview/35af8c12-6d68-4608-babb-b53435a5ddfb"
  }
}
```