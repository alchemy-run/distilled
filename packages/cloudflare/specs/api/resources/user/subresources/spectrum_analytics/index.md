---
title: Spectrum Analytics
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[User](https://developers.cloudflare.com/api/resources/user)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Spectrum Analytics

#### Spectrum AnalyticsZones

#### Spectrum AnalyticsZonesReports

##### [Get zones bandwidth report](https://developers.cloudflare.com/api/resources/user/subresources/spectrum_analytics/subresources/zones/subresources/reports/methods/get)

GET/user/spectrum\_analytics/zones/report

##### ModelsExpand Collapse

<details>

<summary>

ReportGetResponse = array of object {totals, zone\_id }

</summary>

<details>

<summary>

totals: object {bandwidth }

</summary>

<details>

<summary>

bandwidth: object {all, egress, ingress }

</summary>

all: number

Sum of ingress and egress bytes transferred.

<a href="#">Link to this property</a>

egress: number

Sum of egress bytes transferred.

<a href="#">Link to this property</a>

ingress: number

Sum of ingress bytes transferred.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

zone\_id: string

Identifier.

maxLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20user.spectrum_analytics.zones.reports%20%3E%20(model)%20report_get_response%20%3E%20(schema)>)