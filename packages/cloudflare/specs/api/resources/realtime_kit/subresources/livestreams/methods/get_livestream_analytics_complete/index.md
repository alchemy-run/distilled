---
title: Fetch complete analytics data for your livestreams
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Realtime Kit](https://developers.cloudflare.com/api/resources/realtime_kit)

[Livestreams](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/livestreams)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Fetch complete analytics data for your livestreams

GET/accounts/{account\_id}/realtime/kit/{app\_id}/analytics/livestreams/overall

Returns livestream analytics for the specified time range.

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

[Link to this property](#)%20realtime_kit.livestreams%20%3E%20(method)%20get_livestream_analytics_complete%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

app\_id: string

The app identifier tag.

maxLength32

[Link to this property](#)%20realtime_kit.livestreams%20%3E%20(method)%20get_livestream_analytics_complete%20%3E%20(params)%20default%20%3E%20(param)%20app_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

end\_time: optional number

Specify the end time as a Unix timestamp in seconds to access the livestream analytics.

formatint64

[Link to this property](#)%20realtime_kit.livestreams%20%3E%20(method)%20get_livestream_analytics_complete%20%3E%20(params)%20default%20%3E%20(param)%20end_time%20%3E%20(schema)>)

filters: optional string

Optional filters for livestream analytics.

[Link to this property](#)%20realtime_kit.livestreams%20%3E%20(method)%20get_livestream_analytics_complete%20%3E%20(params)%20default%20%3E%20(param)%20filters%20%3E%20(schema)>)

start\_time: optional number

Specify the start time as a Unix timestamp in seconds to access the livestream analytics.

formatint64

[Link to this property](#)%20realtime_kit.livestreams%20%3E%20(method)%20get_livestream_analytics_complete%20%3E%20(params)%20default%20%3E%20(param)%20start_time%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

data: optional object {count, total\_ingest\_seconds, total\_viewer\_seconds }

</summary>

count: optional number

Count of total livestreams.

<a href="#">Link to this property</a>

total\_ingest\_seconds: optional number

Total time duration for which the input was given or the meeting was streamed.

<a href="#">Link to this property</a>

total\_viewer\_seconds: optional number

Total view time for which the viewers watched the stream.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.livestreams%20%3E%20(model)%20livestream_get_livestream_analytics_complete_response%20%3E%20(schema)%20%3E%20(property)%20data>)

success: optional boolean

[Link to this property](#)%20realtime_kit.livestreams%20%3E%20(model)%20livestream_get_livestream_analytics_complete_response%20%3E%20(schema)%20%3E%20(property)%20success>)

### Fetch complete analytics data for your livestreams

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/analytics/livestreams/overall \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "data": {
    "count": 4,
    "total_ingest_seconds": 531,
    "total_viewer_seconds": 116
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "data": {
    "count": 4,
    "total_ingest_seconds": 531,
    "total_viewer_seconds": 116
  },
  "success": true
}
```