---
title: Fetch day-wise session and recording analytics data for an App
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Realtime Kit](https://developers.cloudflare.com/api/resources/realtime_kit)

[Livestreams](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/livestreams)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Fetch day-wise session and recording analytics data for an App

GET/accounts/{account\_id}/realtime/kit/{app\_id}/analytics/daywise

Returns day-wise session and recording analytics data of an App for the specified time range start\_date to end\_date. If start\_date and end\_date are not provided, the default time range is set from 30 days ago to the current date.

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

[Link to this property](#)%20realtime_kit.livestreams%20%3E%20(method)%20get_org_analytics%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

app\_id: string

The app identifier tag.

maxLength32

[Link to this property](#)%20realtime_kit.livestreams%20%3E%20(method)%20get_org_analytics%20%3E%20(params)%20default%20%3E%20(param)%20app_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

end\_date: optional string

end date in YYYY-MM-DD format

[Link to this property](#)%20realtime_kit.livestreams%20%3E%20(method)%20get_org_analytics%20%3E%20(params)%20default%20%3E%20(param)%20end_date%20%3E%20(schema)>)

start\_date: optional string

start date in YYYY-MM-DD format

[Link to this property](#)%20realtime_kit.livestreams%20%3E%20(method)%20get_org_analytics%20%3E%20(params)%20default%20%3E%20(param)%20start_date%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

data: optional object {recording\_stats, session\_stats }

</summary>

<details>

<summary>

recording\_stats: optional object {day\_stats, recording\_count, recording\_minutes\_consumed }

Recording statistics of an App during the range specified

</summary>

<details>

<summary>

day\_stats: optional array of object {day, total\_recording\_minutes, total\_recordings }

Day wise recording stats

</summary>

day: optional string

<a href="#">Link to this property</a>

total\_recording\_minutes: optional number

Total recording minutes for a specific day

<a href="#">Link to this property</a>

total\_recordings: optional number

Total number of recordings for a specific day

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

recording\_count: optional number

Total number of recordings during the range specified

<a href="#">Link to this property</a>

recording\_minutes\_consumed: optional number

Total recording minutes during the range specified

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

session\_stats: optional object {day\_stats, sessions\_count, sessions\_minutes\_consumed }

Session statistics of an App during the range specified

</summary>

<details>

<summary>

day\_stats: optional array of object {day, total\_session\_minutes, total\_sessions }

Day wise session stats

</summary>

day: optional string

<a href="#">Link to this property</a>

total\_session\_minutes: optional number

Total session minutes for a specific day

<a href="#">Link to this property</a>

total\_sessions: optional number

Total number of sessions for a specific day

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

sessions\_count: optional number

Total number of sessions during the range specified

<a href="#">Link to this property</a>

sessions\_minutes\_consumed: optional number

Total session minutes during the range specified

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.livestreams%20%3E%20(model)%20livestream_get_org_analytics_response%20%3E%20(schema)%20%3E%20(property)%20data>)

success: optional boolean

[Link to this property](#)%20realtime_kit.livestreams%20%3E%20(model)%20livestream_get_org_analytics_response%20%3E%20(schema)%20%3E%20(property)%20success>)

### Fetch day-wise session and recording analytics data for an App

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/analytics/daywise \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "data": {
    "recording_stats": {
      "day_stats": [
        {
          "day": "day",
          "total_recording_minutes": 0,
          "total_recordings": 0
        }
      ],
      "recording_count": 0,
      "recording_minutes_consumed": 0
    },
    "session_stats": {
      "day_stats": [
        {
          "day": "day",
          "total_session_minutes": 0,
          "total_sessions": 0
        }
      ],
      "sessions_count": 0,
      "sessions_minutes_consumed": 0
    }
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "data": {
    "recording_stats": {
      "day_stats": [
        {
          "day": "day",
          "total_recording_minutes": 0,
          "total_recordings": 0
        }
      ],
      "recording_count": 0,
      "recording_minutes_consumed": 0
    },
    "session_stats": {
      "day_stats": [
        {
          "day": "day",
          "total_session_minutes": 0,
          "total_sessions": 0
        }
      ],
      "sessions_count": 0,
      "sessions_minutes_consumed": 0
    }
  },
  "success": true
}
```