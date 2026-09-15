---
title: Stop livestreaming a meeting
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Realtime Kit](https://developers.cloudflare.com/api/resources/realtime_kit)

[Livestreams](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/livestreams)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Stop livestreaming a meeting

POST/accounts/{account\_id}/realtime/kit/{app\_id}/meetings/{meeting\_id}/active-livestream/stop

Stops the active livestream of a meeting associated with the given meeting ID. Retreive the meeting ID using the `Create a meeting` API.

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

[Link to this property](#)%20realtime_kit.livestreams%20%3E%20(method)%20stop_livestreaming_a_meeting%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

app\_id: string

The app identifier tag.

maxLength32

[Link to this property](#)%20realtime_kit.livestreams%20%3E%20(method)%20stop_livestreaming_a_meeting%20%3E%20(params)%20default%20%3E%20(param)%20app_id%20%3E%20(schema)>)

meeting\_id: string

formatuuid

[Link to this property](#)%20realtime_kit.livestreams%20%3E%20(method)%20stop_livestreaming_a_meeting%20%3E%20(params)%20default%20%3E%20(param)%20meeting_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

data: optional object {message }

</summary>

message: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.livestreams%20%3E%20(model)%20livestream_stop_livestreaming_a_meeting_response%20%3E%20(schema)%20%3E%20(property)%20data>)

success: optional boolean

[Link to this property](#)%20realtime_kit.livestreams%20%3E%20(model)%20livestream_stop_livestreaming_a_meeting_response%20%3E%20(schema)%20%3E%20(property)%20success>)

### Stop livestreaming a meeting

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/meetings/$MEETING_ID/active-livestream/stop \
    -X POST \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "data": {
    "message": "Stopped live stream successfully"
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "data": {
    "message": "Stopped live stream successfully"
  },
  "success": true
}
```