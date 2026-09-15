---
title: ASN
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Botnet Feed](https://developers.cloudflare.com/api/resources/botnet_feed)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# ASN

##### [Get daily report](https://developers.cloudflare.com/api/resources/botnet_feed/subresources/asn/methods/day_report)

GET/accounts/{account\_id}/botnet\_feed/asn/{asn\_id}/day\_report

##### [Get full report](https://developers.cloudflare.com/api/resources/botnet_feed/subresources/asn/methods/full_report)

GET/accounts/{account\_id}/botnet\_feed/asn/{asn\_id}/full\_report

##### ModelsExpand Collapse

<details>

<summary>

ASNDayReportResponse object {cidr, date, offense\_count }

</summary>

cidr: optional string

<a href="#">Link to this property</a>

date: optional string

formatdate-time

<a href="#">Link to this property</a>

offense\_count: optional number

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20botnet_feed.asn%20%3E%20(model)%20asn_day_report_response%20%3E%20(schema)>)

<details>

<summary>

ASNFullReportResponse object {cidr, date, offense\_count }

</summary>

cidr: optional string

<a href="#">Link to this property</a>

date: optional string

formatdate-time

<a href="#">Link to this property</a>

offense\_count: optional number

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20botnet_feed.asn%20%3E%20(model)%20asn_full_report_response%20%3E%20(schema)>)