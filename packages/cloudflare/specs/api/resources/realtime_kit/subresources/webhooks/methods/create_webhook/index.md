---
title: Add a webhook
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Realtime Kit](https://developers.cloudflare.com/api/resources/realtime_kit)

[Webhooks](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/webhooks)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Add a webhook

POST/accounts/{account\_id}/realtime/kit/{app\_id}/webhooks

Adds a new webhook to an App.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Realtime Admin``Realtime`

##### P ath ParametersExpand Collapse

account\_id: string

The account identifier tag.

maxLength32

[Link to this property](#)%20realtime_kit.webhooks%20%3E%20(method)%20create_webhook%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

app\_id: string

The app identifier tag.

maxLength32

[Link to this property](#)%20realtime_kit.webhooks%20%3E%20(method)%20create_webhook%20%3E%20(params)%20default%20%3E%20(param)%20app_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

<details>

<summary>

events: array of "meeting.started"or "meeting.ended"or "meeting.participantJoined"or 6 more

Events that this webhook will get triggered by

</summary>

One of the following:

"meeting.started"

<a href="#">Link to this property</a>

"meeting.ended"

<a href="#">Link to this property</a>

"meeting.participantJoined"

<a href="#">Link to this property</a>

"meeting.participantLeft"

<a href="#">Link to this property</a>

"meeting.chatSynced"

<a href="#">Link to this property</a>

"recording.statusUpdate"

<a href="#">Link to this property</a>

"livestreaming.statusUpdate"

<a href="#">Link to this property</a>

"meeting.transcript"

<a href="#">Link to this property</a>

"meeting.summary"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.webhooks%20%3E%20(method)%20create_webhook%20%3E%20(params)%200%20%3E%20(param)%20events%20%3E%20(schema)>)

name: string

Name of the webhook

[Link to this property](#)%20realtime_kit.webhooks%20%3E%20(method)%20create_webhook%20%3E%20(params)%200%20%3E%20(param)%20name%20%3E%20(schema)>)

url: string

URL this webhook will send events to

formaturi

[Link to this property](#)%20realtime_kit.webhooks%20%3E%20(method)%20create_webhook%20%3E%20(params)%200%20%3E%20(param)%20url%20%3E%20(schema)>)

enabled: optional boolean

Set whether or not the webhook should be active when created

[Link to this property](#)%20realtime_kit.webhooks%20%3E%20(method)%20create_webhook%20%3E%20(params)%200%20%3E%20(param)%20enabled%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

data: object {id, created\_at, enabled, 4 more }

</summary>

id: string

ID of the webhook

formatuuid

<a href="#">Link to this property</a>

created\_at: string

Timestamp when this webhook was created

formatdate-time

<a href="#">Link to this property</a>

enabled: boolean

Set to true if the webhook is active

<a href="#">Link to this property</a>

<details>

<summary>

events: array of "meeting.started"or "meeting.ended"or "meeting.participantJoined"or 6 more

Events this webhook will send updates for

</summary>

One of the following:

"meeting.started"

<a href="#">Link to this property</a>

"meeting.ended"

<a href="#">Link to this property</a>

"meeting.participantJoined"

<a href="#">Link to this property</a>

"meeting.participantLeft"

<a href="#">Link to this property</a>

"meeting.chatSynced"

<a href="#">Link to this property</a>

"recording.statusUpdate"

<a href="#">Link to this property</a>

"livestreaming.statusUpdate"

<a href="#">Link to this property</a>

"meeting.transcript"

<a href="#">Link to this property</a>

"meeting.summary"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

Name of the webhook

<a href="#">Link to this property</a>

updated\_at: string

Timestamp when this webhook was updated

formatdate-time

<a href="#">Link to this property</a>

url: string

URL the webhook will send events to

formaturi

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.webhooks%20%3E%20(model)%20webhook_create_webhook_response%20%3E%20(schema)%20%3E%20(property)%20data>)

success: boolean

[Link to this property](#)%20realtime_kit.webhooks%20%3E%20(model)%20webhook_create_webhook_response%20%3E%20(schema)%20%3E%20(property)%20success>)

### Add a webhook

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/webhooks \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "events": [
            "meeting.started",
            "meeting.ended",
            "meeting.participantJoined",
            "meeting.participantLeft",
            "meeting.chatSynced",
            "recording.statusUpdate",
            "livestreaming.statusUpdate",
            "meeting.transcript",
            "meeting.summary"
          ],
          "name": "All events webhook",
          "url": "https://webhook.site/b23a5bbd-c7b0-4ced-a9e2-78ae7889897e"
        }'
```

200 example

401 example

```
{
  "data": {
    "id": "0d1f069d-43bb-489a-ad8c-7eb95592ba8e",
    "created_at": "2022-05-28T07:01:53.075Z",
    "enabled": true,
    "events": [
      "meeting.started",
      "meeting.ended",
      "meeting.participantJoined",
      "meeting.participantLeft",
      "meeting.chatSynced",
      "recording.statusUpdate",
      "livestreaming.statusUpdate",
      "meeting.transcript",
      "meeting.summary"
    ],
    "name": "All events webhook",
    "updated_at": "2022-05-28T07:01:53.075Z",
    "url": "https://webhook.site/b23a5bbd-c7b0-4ced-a9e2-78ae7889897e"
  },
  "success": true
}
```

```
"{\n  message: \"Unauthorized\"\n}\n"
```

##### Returns Examples

200 example

401 example

```
{
  "data": {
    "id": "0d1f069d-43bb-489a-ad8c-7eb95592ba8e",
    "created_at": "2022-05-28T07:01:53.075Z",
    "enabled": true,
    "events": [
      "meeting.started",
      "meeting.ended",
      "meeting.participantJoined",
      "meeting.participantLeft",
      "meeting.chatSynced",
      "recording.statusUpdate",
      "livestreaming.statusUpdate",
      "meeting.transcript",
      "meeting.summary"
    ],
    "name": "All events webhook",
    "updated_at": "2022-05-28T07:01:53.075Z",
    "url": "https://webhook.site/b23a5bbd-c7b0-4ced-a9e2-78ae7889897e"
  },
  "success": true
}
```

```
"{\n  message: \"Unauthorized\"\n}\n"
```