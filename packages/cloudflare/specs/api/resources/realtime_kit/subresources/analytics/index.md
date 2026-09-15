---
title: Analytics
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Realtime Kit](https://developers.cloudflare.com/api/resources/realtime_kit)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Analytics

##### [Fetch day-wise session and recording analytics data for an App](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/analytics/methods/get_org_analytics)

GET/accounts/{account\_id}/realtime/kit/{app\_id}/analytics/daywise

##### ModelsExpand Collapse

<details>

<summary>

AnalyticsGetOrgAnalyticsResponse object {data, success }

</summary>

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

<a href="#">Link to this property</a>

success: optional boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.analytics%20%3E%20(model)%20analytics_get_org_analytics_response%20%3E%20(schema)>)