---
title: Summary
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Radar](https://developers.cloudflare.com/api/resources/radar)

[Email](https://developers.cloudflare.com/api/resources/radar/subresources/email)

[Routing](https://developers.cloudflare.com/api/resources/radar/subresources/email/subresources/routing)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Summary

##### [Get email ARC validation summary](https://developers.cloudflare.com/api/resources/radar/subresources/email/subresources/routing/subresources/summary/methods/arc)

Deprecated

GET/radar/email/routing/summary/arc

##### [Get email DKIM validation summary](https://developers.cloudflare.com/api/resources/radar/subresources/email/subresources/routing/subresources/summary/methods/dkim)

Deprecated

GET/radar/email/routing/summary/dkim

##### [Get email DMARC validation summary](https://developers.cloudflare.com/api/resources/radar/subresources/email/subresources/routing/subresources/summary/methods/dmarc)

Deprecated

GET/radar/email/routing/summary/dmarc

##### [Get email encryption status summary](https://developers.cloudflare.com/api/resources/radar/subresources/email/subresources/routing/subresources/summary/methods/encrypted)

Deprecated

GET/radar/email/routing/summary/encrypted

##### [Get email IP version summary](https://developers.cloudflare.com/api/resources/radar/subresources/email/subresources/routing/subresources/summary/methods/ip_version)

Deprecated

GET/radar/email/routing/summary/ip\_version

##### [Get email SPF validation summary](https://developers.cloudflare.com/api/resources/radar/subresources/email/subresources/routing/subresources/summary/methods/spf)

Deprecated

GET/radar/email/routing/summary/spf

##### ModelsExpand Collapse

<details>

<summary>

SummaryARCResponse object {meta, summary\_0 }

</summary>

<details>

<summary>

meta: object {confidenceInfo, dateRange, lastUpdated, 2 more }

Metadata for the results.

</summary>

<details>

<summary>

confidenceInfo: object {annotations, level }

</summary>

<details>

<summary>

annotations: array of object {dataSource, description, endDate, 5 more }

</summary>

<details>

<summary>

dataSource: "ALL"or "AI\_BOTS"or "AI\_GATEWAY"or 22 more

Data source for annotations.

</summary>

One of the following:

"ALL"

<a href="#">Link to this property</a>

"AI\_BOTS"

<a href="#">Link to this property</a>

"AI\_GATEWAY"

<a href="#">Link to this property</a>

"BGP"

<a href="#">Link to this property</a>

"BOTS"

<a href="#">Link to this property</a>

"CONNECTION\_ANOMALY"

<a href="#">Link to this property</a>

"CT"

<a href="#">Link to this property</a>

"DNS"

<a href="#">Link to this property</a>

"DNS\_MAGNITUDE"

<a href="#">Link to this property</a>

"DNS\_AS112"

<a href="#">Link to this property</a>

"DOS"

<a href="#">Link to this property</a>

"EMAIL\_ROUTING"

<a href="#">Link to this property</a>

"EMAIL\_SECURITY"

<a href="#">Link to this property</a>

"FW"

<a href="#">Link to this property</a>

"FW\_PG"

<a href="#">Link to this property</a>

"HTTP"

<a href="#">Link to this property</a>

"HTTP\_CONTROL"

<a href="#">Link to this property</a>

"HTTP\_CRAWLER\_REFERER"

<a href="#">Link to this property</a>

"HTTP\_ORIGINS"

<a href="#">Link to this property</a>

"IQI"

<a href="#">Link to this property</a>

"LEAKED\_CREDENTIALS"

<a href="#">Link to this property</a>

"NET"

<a href="#">Link to this property</a>

"ROBOTS\_TXT"

<a href="#">Link to this property</a>

"SPEED"

<a href="#">Link to this property</a>

"WORKERS\_AI"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

description: string

<a href="#">Link to this property</a>

endDate: string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

eventType: "GENERAL"or "OUTAGE"or "PARTIAL\_PROJECTION"or 2 more

Event type for annotations.

</summary>

One of the following:

"GENERAL"

<a href="#">Link to this property</a>

"OUTAGE"

<a href="#">Link to this property</a>

"PARTIAL\_PROJECTION"

<a href="#">Link to this property</a>

"PIPELINE"

<a href="#">Link to this property</a>

"TRAFFIC\_ANOMALY"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

isInstantaneous: boolean

Whether event is a single point in time or a time range.

<a href="#">Link to this property</a>

linkedUrl: string

formaturi

<a href="#">Link to this property</a>

startDate: string

formatdate-time

<a href="#">Link to this property</a>

tags: optional array of string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

level: number

Provides an indication of how much confidence Cloudflare has in the data.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

dateRange: array of object {endTime, startTime }

</summary>

endTime: string

Adjusted end of date range.

formatdate-time

<a href="#">Link to this property</a>

startTime: string

Adjusted start of date range.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

lastUpdated: string

Timestamp of the last dataset update.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

normalization: "PERCENTAGE"or "MIN0\_MAX"or "MIN\_MAX"or 5 more

Normalization method applied to the results. Refer to <a href="https://developers.cloudflare.com/radar/concepts/normalization/">Normalization methods</a>.

</summary>

One of the following:

"PERCENTAGE"

<a href="#">Link to this property</a>

"MIN0\_MAX"

<a href="#">Link to this property</a>

"MIN\_MAX"

<a href="#">Link to this property</a>

"RAW\_VALUES"

<a href="#">Link to this property</a>

"PERCENTAGE\_CHANGE"

<a href="#">Link to this property</a>

"ROLLING\_AVERAGE"

<a href="#">Link to this property</a>

"OVERLAPPED\_PERCENTAGE"

<a href="#">Link to this property</a>

"RATIO"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

units: array of object {name, value }

Measurement units for the results.

</summary>

name: string

<a href="#">Link to this property</a>

value: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

summary\_0: <a href="https://developers.cloudflare.com/api/resources/radar#(resource)%20radar.email%20%3E%20(model)%20radar_email_summary%20%3E%20(schema)">RadarEmailSummary</a> { FAIL, NONE, PASS }

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.email.routing.summary%20%3E%20(model)%20summary_arc_response%20%3E%20(schema)>)

<details>

<summary>

SummaryDKIMResponse object {meta, summary\_0 }

</summary>

<details>

<summary>

meta: object {confidenceInfo, dateRange, lastUpdated, 2 more }

Metadata for the results.

</summary>

<details>

<summary>

confidenceInfo: object {annotations, level }

</summary>

<details>

<summary>

annotations: array of object {dataSource, description, endDate, 5 more }

</summary>

<details>

<summary>

dataSource: "ALL"or "AI\_BOTS"or "AI\_GATEWAY"or 22 more

Data source for annotations.

</summary>

One of the following:

"ALL"

<a href="#">Link to this property</a>

"AI\_BOTS"

<a href="#">Link to this property</a>

"AI\_GATEWAY"

<a href="#">Link to this property</a>

"BGP"

<a href="#">Link to this property</a>

"BOTS"

<a href="#">Link to this property</a>

"CONNECTION\_ANOMALY"

<a href="#">Link to this property</a>

"CT"

<a href="#">Link to this property</a>

"DNS"

<a href="#">Link to this property</a>

"DNS\_MAGNITUDE"

<a href="#">Link to this property</a>

"DNS\_AS112"

<a href="#">Link to this property</a>

"DOS"

<a href="#">Link to this property</a>

"EMAIL\_ROUTING"

<a href="#">Link to this property</a>

"EMAIL\_SECURITY"

<a href="#">Link to this property</a>

"FW"

<a href="#">Link to this property</a>

"FW\_PG"

<a href="#">Link to this property</a>

"HTTP"

<a href="#">Link to this property</a>

"HTTP\_CONTROL"

<a href="#">Link to this property</a>

"HTTP\_CRAWLER\_REFERER"

<a href="#">Link to this property</a>

"HTTP\_ORIGINS"

<a href="#">Link to this property</a>

"IQI"

<a href="#">Link to this property</a>

"LEAKED\_CREDENTIALS"

<a href="#">Link to this property</a>

"NET"

<a href="#">Link to this property</a>

"ROBOTS\_TXT"

<a href="#">Link to this property</a>

"SPEED"

<a href="#">Link to this property</a>

"WORKERS\_AI"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

description: string

<a href="#">Link to this property</a>

endDate: string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

eventType: "GENERAL"or "OUTAGE"or "PARTIAL\_PROJECTION"or 2 more

Event type for annotations.

</summary>

One of the following:

"GENERAL"

<a href="#">Link to this property</a>

"OUTAGE"

<a href="#">Link to this property</a>

"PARTIAL\_PROJECTION"

<a href="#">Link to this property</a>

"PIPELINE"

<a href="#">Link to this property</a>

"TRAFFIC\_ANOMALY"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

isInstantaneous: boolean

Whether event is a single point in time or a time range.

<a href="#">Link to this property</a>

linkedUrl: string

formaturi

<a href="#">Link to this property</a>

startDate: string

formatdate-time

<a href="#">Link to this property</a>

tags: optional array of string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

level: number

Provides an indication of how much confidence Cloudflare has in the data.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

dateRange: array of object {endTime, startTime }

</summary>

endTime: string

Adjusted end of date range.

formatdate-time

<a href="#">Link to this property</a>

startTime: string

Adjusted start of date range.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

lastUpdated: string

Timestamp of the last dataset update.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

normalization: "PERCENTAGE"or "MIN0\_MAX"or "MIN\_MAX"or 5 more

Normalization method applied to the results. Refer to <a href="https://developers.cloudflare.com/radar/concepts/normalization/">Normalization methods</a>.

</summary>

One of the following:

"PERCENTAGE"

<a href="#">Link to this property</a>

"MIN0\_MAX"

<a href="#">Link to this property</a>

"MIN\_MAX"

<a href="#">Link to this property</a>

"RAW\_VALUES"

<a href="#">Link to this property</a>

"PERCENTAGE\_CHANGE"

<a href="#">Link to this property</a>

"ROLLING\_AVERAGE"

<a href="#">Link to this property</a>

"OVERLAPPED\_PERCENTAGE"

<a href="#">Link to this property</a>

"RATIO"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

units: array of object {name, value }

Measurement units for the results.

</summary>

name: string

<a href="#">Link to this property</a>

value: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

summary\_0: <a href="https://developers.cloudflare.com/api/resources/radar#(resource)%20radar.email%20%3E%20(model)%20radar_email_summary%20%3E%20(schema)">RadarEmailSummary</a> { FAIL, NONE, PASS }

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.email.routing.summary%20%3E%20(model)%20summary_dkim_response%20%3E%20(schema)>)

<details>

<summary>

SummaryDMARCResponse object {meta, summary\_0 }

</summary>

<details>

<summary>

meta: object {confidenceInfo, dateRange, lastUpdated, 2 more }

Metadata for the results.

</summary>

<details>

<summary>

confidenceInfo: object {annotations, level }

</summary>

<details>

<summary>

annotations: array of object {dataSource, description, endDate, 5 more }

</summary>

<details>

<summary>

dataSource: "ALL"or "AI\_BOTS"or "AI\_GATEWAY"or 22 more

Data source for annotations.

</summary>

One of the following:

"ALL"

<a href="#">Link to this property</a>

"AI\_BOTS"

<a href="#">Link to this property</a>

"AI\_GATEWAY"

<a href="#">Link to this property</a>

"BGP"

<a href="#">Link to this property</a>

"BOTS"

<a href="#">Link to this property</a>

"CONNECTION\_ANOMALY"

<a href="#">Link to this property</a>

"CT"

<a href="#">Link to this property</a>

"DNS"

<a href="#">Link to this property</a>

"DNS\_MAGNITUDE"

<a href="#">Link to this property</a>

"DNS\_AS112"

<a href="#">Link to this property</a>

"DOS"

<a href="#">Link to this property</a>

"EMAIL\_ROUTING"

<a href="#">Link to this property</a>

"EMAIL\_SECURITY"

<a href="#">Link to this property</a>

"FW"

<a href="#">Link to this property</a>

"FW\_PG"

<a href="#">Link to this property</a>

"HTTP"

<a href="#">Link to this property</a>

"HTTP\_CONTROL"

<a href="#">Link to this property</a>

"HTTP\_CRAWLER\_REFERER"

<a href="#">Link to this property</a>

"HTTP\_ORIGINS"

<a href="#">Link to this property</a>

"IQI"

<a href="#">Link to this property</a>

"LEAKED\_CREDENTIALS"

<a href="#">Link to this property</a>

"NET"

<a href="#">Link to this property</a>

"ROBOTS\_TXT"

<a href="#">Link to this property</a>

"SPEED"

<a href="#">Link to this property</a>

"WORKERS\_AI"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

description: string

<a href="#">Link to this property</a>

endDate: string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

eventType: "GENERAL"or "OUTAGE"or "PARTIAL\_PROJECTION"or 2 more

Event type for annotations.

</summary>

One of the following:

"GENERAL"

<a href="#">Link to this property</a>

"OUTAGE"

<a href="#">Link to this property</a>

"PARTIAL\_PROJECTION"

<a href="#">Link to this property</a>

"PIPELINE"

<a href="#">Link to this property</a>

"TRAFFIC\_ANOMALY"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

isInstantaneous: boolean

Whether event is a single point in time or a time range.

<a href="#">Link to this property</a>

linkedUrl: string

formaturi

<a href="#">Link to this property</a>

startDate: string

formatdate-time

<a href="#">Link to this property</a>

tags: optional array of string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

level: number

Provides an indication of how much confidence Cloudflare has in the data.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

dateRange: array of object {endTime, startTime }

</summary>

endTime: string

Adjusted end of date range.

formatdate-time

<a href="#">Link to this property</a>

startTime: string

Adjusted start of date range.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

lastUpdated: string

Timestamp of the last dataset update.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

normalization: "PERCENTAGE"or "MIN0\_MAX"or "MIN\_MAX"or 5 more

Normalization method applied to the results. Refer to <a href="https://developers.cloudflare.com/radar/concepts/normalization/">Normalization methods</a>.

</summary>

One of the following:

"PERCENTAGE"

<a href="#">Link to this property</a>

"MIN0\_MAX"

<a href="#">Link to this property</a>

"MIN\_MAX"

<a href="#">Link to this property</a>

"RAW\_VALUES"

<a href="#">Link to this property</a>

"PERCENTAGE\_CHANGE"

<a href="#">Link to this property</a>

"ROLLING\_AVERAGE"

<a href="#">Link to this property</a>

"OVERLAPPED\_PERCENTAGE"

<a href="#">Link to this property</a>

"RATIO"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

units: array of object {name, value }

Measurement units for the results.

</summary>

name: string

<a href="#">Link to this property</a>

value: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

summary\_0: <a href="https://developers.cloudflare.com/api/resources/radar#(resource)%20radar.email%20%3E%20(model)%20radar_email_summary%20%3E%20(schema)">RadarEmailSummary</a> { FAIL, NONE, PASS }

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.email.routing.summary%20%3E%20(model)%20summary_dmarc_response%20%3E%20(schema)>)

<details>

<summary>

SummaryEncryptedResponse object {meta, summary\_0 }

</summary>

<details>

<summary>

meta: object {confidenceInfo, dateRange, lastUpdated, 2 more }

Metadata for the results.

</summary>

<details>

<summary>

confidenceInfo: object {annotations, level }

</summary>

<details>

<summary>

annotations: array of object {dataSource, description, endDate, 5 more }

</summary>

<details>

<summary>

dataSource: "ALL"or "AI\_BOTS"or "AI\_GATEWAY"or 22 more

Data source for annotations.

</summary>

One of the following:

"ALL"

<a href="#">Link to this property</a>

"AI\_BOTS"

<a href="#">Link to this property</a>

"AI\_GATEWAY"

<a href="#">Link to this property</a>

"BGP"

<a href="#">Link to this property</a>

"BOTS"

<a href="#">Link to this property</a>

"CONNECTION\_ANOMALY"

<a href="#">Link to this property</a>

"CT"

<a href="#">Link to this property</a>

"DNS"

<a href="#">Link to this property</a>

"DNS\_MAGNITUDE"

<a href="#">Link to this property</a>

"DNS\_AS112"

<a href="#">Link to this property</a>

"DOS"

<a href="#">Link to this property</a>

"EMAIL\_ROUTING"

<a href="#">Link to this property</a>

"EMAIL\_SECURITY"

<a href="#">Link to this property</a>

"FW"

<a href="#">Link to this property</a>

"FW\_PG"

<a href="#">Link to this property</a>

"HTTP"

<a href="#">Link to this property</a>

"HTTP\_CONTROL"

<a href="#">Link to this property</a>

"HTTP\_CRAWLER\_REFERER"

<a href="#">Link to this property</a>

"HTTP\_ORIGINS"

<a href="#">Link to this property</a>

"IQI"

<a href="#">Link to this property</a>

"LEAKED\_CREDENTIALS"

<a href="#">Link to this property</a>

"NET"

<a href="#">Link to this property</a>

"ROBOTS\_TXT"

<a href="#">Link to this property</a>

"SPEED"

<a href="#">Link to this property</a>

"WORKERS\_AI"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

description: string

<a href="#">Link to this property</a>

endDate: string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

eventType: "GENERAL"or "OUTAGE"or "PARTIAL\_PROJECTION"or 2 more

Event type for annotations.

</summary>

One of the following:

"GENERAL"

<a href="#">Link to this property</a>

"OUTAGE"

<a href="#">Link to this property</a>

"PARTIAL\_PROJECTION"

<a href="#">Link to this property</a>

"PIPELINE"

<a href="#">Link to this property</a>

"TRAFFIC\_ANOMALY"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

isInstantaneous: boolean

Whether event is a single point in time or a time range.

<a href="#">Link to this property</a>

linkedUrl: string

formaturi

<a href="#">Link to this property</a>

startDate: string

formatdate-time

<a href="#">Link to this property</a>

tags: optional array of string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

level: number

Provides an indication of how much confidence Cloudflare has in the data.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

dateRange: array of object {endTime, startTime }

</summary>

endTime: string

Adjusted end of date range.

formatdate-time

<a href="#">Link to this property</a>

startTime: string

Adjusted start of date range.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

lastUpdated: string

Timestamp of the last dataset update.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

normalization: "PERCENTAGE"or "MIN0\_MAX"or "MIN\_MAX"or 5 more

Normalization method applied to the results. Refer to <a href="https://developers.cloudflare.com/radar/concepts/normalization/">Normalization methods</a>.

</summary>

One of the following:

"PERCENTAGE"

<a href="#">Link to this property</a>

"MIN0\_MAX"

<a href="#">Link to this property</a>

"MIN\_MAX"

<a href="#">Link to this property</a>

"RAW\_VALUES"

<a href="#">Link to this property</a>

"PERCENTAGE\_CHANGE"

<a href="#">Link to this property</a>

"ROLLING\_AVERAGE"

<a href="#">Link to this property</a>

"OVERLAPPED\_PERCENTAGE"

<a href="#">Link to this property</a>

"RATIO"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

units: array of object {name, value }

Measurement units for the results.

</summary>

name: string

<a href="#">Link to this property</a>

value: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

summary\_0: object {ENCRYPTED, NOT\_ENCRYPTED }

</summary>

ENCRYPTED: string

A numeric string.

<a href="#">Link to this property</a>

NOT\_ENCRYPTED: string

A numeric string.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.email.routing.summary%20%3E%20(model)%20summary_encrypted_response%20%3E%20(schema)>)

<details>

<summary>

SummaryIPVersionResponse object {meta, summary\_0 }

</summary>

<details>

<summary>

meta: object {confidenceInfo, dateRange, lastUpdated, 2 more }

Metadata for the results.

</summary>

<details>

<summary>

confidenceInfo: object {annotations, level }

</summary>

<details>

<summary>

annotations: array of object {dataSource, description, endDate, 5 more }

</summary>

<details>

<summary>

dataSource: "ALL"or "AI\_BOTS"or "AI\_GATEWAY"or 22 more

Data source for annotations.

</summary>

One of the following:

"ALL"

<a href="#">Link to this property</a>

"AI\_BOTS"

<a href="#">Link to this property</a>

"AI\_GATEWAY"

<a href="#">Link to this property</a>

"BGP"

<a href="#">Link to this property</a>

"BOTS"

<a href="#">Link to this property</a>

"CONNECTION\_ANOMALY"

<a href="#">Link to this property</a>

"CT"

<a href="#">Link to this property</a>

"DNS"

<a href="#">Link to this property</a>

"DNS\_MAGNITUDE"

<a href="#">Link to this property</a>

"DNS\_AS112"

<a href="#">Link to this property</a>

"DOS"

<a href="#">Link to this property</a>

"EMAIL\_ROUTING"

<a href="#">Link to this property</a>

"EMAIL\_SECURITY"

<a href="#">Link to this property</a>

"FW"

<a href="#">Link to this property</a>

"FW\_PG"

<a href="#">Link to this property</a>

"HTTP"

<a href="#">Link to this property</a>

"HTTP\_CONTROL"

<a href="#">Link to this property</a>

"HTTP\_CRAWLER\_REFERER"

<a href="#">Link to this property</a>

"HTTP\_ORIGINS"

<a href="#">Link to this property</a>

"IQI"

<a href="#">Link to this property</a>

"LEAKED\_CREDENTIALS"

<a href="#">Link to this property</a>

"NET"

<a href="#">Link to this property</a>

"ROBOTS\_TXT"

<a href="#">Link to this property</a>

"SPEED"

<a href="#">Link to this property</a>

"WORKERS\_AI"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

description: string

<a href="#">Link to this property</a>

endDate: string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

eventType: "GENERAL"or "OUTAGE"or "PARTIAL\_PROJECTION"or 2 more

Event type for annotations.

</summary>

One of the following:

"GENERAL"

<a href="#">Link to this property</a>

"OUTAGE"

<a href="#">Link to this property</a>

"PARTIAL\_PROJECTION"

<a href="#">Link to this property</a>

"PIPELINE"

<a href="#">Link to this property</a>

"TRAFFIC\_ANOMALY"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

isInstantaneous: boolean

Whether event is a single point in time or a time range.

<a href="#">Link to this property</a>

linkedUrl: string

formaturi

<a href="#">Link to this property</a>

startDate: string

formatdate-time

<a href="#">Link to this property</a>

tags: optional array of string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

level: number

Provides an indication of how much confidence Cloudflare has in the data.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

dateRange: array of object {endTime, startTime }

</summary>

endTime: string

Adjusted end of date range.

formatdate-time

<a href="#">Link to this property</a>

startTime: string

Adjusted start of date range.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

lastUpdated: string

Timestamp of the last dataset update.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

normalization: "PERCENTAGE"or "MIN0\_MAX"or "MIN\_MAX"or 5 more

Normalization method applied to the results. Refer to <a href="https://developers.cloudflare.com/radar/concepts/normalization/">Normalization methods</a>.

</summary>

One of the following:

"PERCENTAGE"

<a href="#">Link to this property</a>

"MIN0\_MAX"

<a href="#">Link to this property</a>

"MIN\_MAX"

<a href="#">Link to this property</a>

"RAW\_VALUES"

<a href="#">Link to this property</a>

"PERCENTAGE\_CHANGE"

<a href="#">Link to this property</a>

"ROLLING\_AVERAGE"

<a href="#">Link to this property</a>

"OVERLAPPED\_PERCENTAGE"

<a href="#">Link to this property</a>

"RATIO"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

units: array of object {name, value }

Measurement units for the results.

</summary>

name: string

<a href="#">Link to this property</a>

value: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

summary\_0: object {IPv4, IPv6 }

</summary>

IPv4: string

A numeric string.

<a href="#">Link to this property</a>

IPv6: string

A numeric string.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.email.routing.summary%20%3E%20(model)%20summary_ip_version_response%20%3E%20(schema)>)

<details>

<summary>

SummarySPFResponse object {meta, summary\_0 }

</summary>

<details>

<summary>

meta: object {confidenceInfo, dateRange, lastUpdated, 2 more }

Metadata for the results.

</summary>

<details>

<summary>

confidenceInfo: object {annotations, level }

</summary>

<details>

<summary>

annotations: array of object {dataSource, description, endDate, 5 more }

</summary>

<details>

<summary>

dataSource: "ALL"or "AI\_BOTS"or "AI\_GATEWAY"or 22 more

Data source for annotations.

</summary>

One of the following:

"ALL"

<a href="#">Link to this property</a>

"AI\_BOTS"

<a href="#">Link to this property</a>

"AI\_GATEWAY"

<a href="#">Link to this property</a>

"BGP"

<a href="#">Link to this property</a>

"BOTS"

<a href="#">Link to this property</a>

"CONNECTION\_ANOMALY"

<a href="#">Link to this property</a>

"CT"

<a href="#">Link to this property</a>

"DNS"

<a href="#">Link to this property</a>

"DNS\_MAGNITUDE"

<a href="#">Link to this property</a>

"DNS\_AS112"

<a href="#">Link to this property</a>

"DOS"

<a href="#">Link to this property</a>

"EMAIL\_ROUTING"

<a href="#">Link to this property</a>

"EMAIL\_SECURITY"

<a href="#">Link to this property</a>

"FW"

<a href="#">Link to this property</a>

"FW\_PG"

<a href="#">Link to this property</a>

"HTTP"

<a href="#">Link to this property</a>

"HTTP\_CONTROL"

<a href="#">Link to this property</a>

"HTTP\_CRAWLER\_REFERER"

<a href="#">Link to this property</a>

"HTTP\_ORIGINS"

<a href="#">Link to this property</a>

"IQI"

<a href="#">Link to this property</a>

"LEAKED\_CREDENTIALS"

<a href="#">Link to this property</a>

"NET"

<a href="#">Link to this property</a>

"ROBOTS\_TXT"

<a href="#">Link to this property</a>

"SPEED"

<a href="#">Link to this property</a>

"WORKERS\_AI"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

description: string

<a href="#">Link to this property</a>

endDate: string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

eventType: "GENERAL"or "OUTAGE"or "PARTIAL\_PROJECTION"or 2 more

Event type for annotations.

</summary>

One of the following:

"GENERAL"

<a href="#">Link to this property</a>

"OUTAGE"

<a href="#">Link to this property</a>

"PARTIAL\_PROJECTION"

<a href="#">Link to this property</a>

"PIPELINE"

<a href="#">Link to this property</a>

"TRAFFIC\_ANOMALY"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

isInstantaneous: boolean

Whether event is a single point in time or a time range.

<a href="#">Link to this property</a>

linkedUrl: string

formaturi

<a href="#">Link to this property</a>

startDate: string

formatdate-time

<a href="#">Link to this property</a>

tags: optional array of string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

level: number

Provides an indication of how much confidence Cloudflare has in the data.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

dateRange: array of object {endTime, startTime }

</summary>

endTime: string

Adjusted end of date range.

formatdate-time

<a href="#">Link to this property</a>

startTime: string

Adjusted start of date range.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

lastUpdated: string

Timestamp of the last dataset update.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

normalization: "PERCENTAGE"or "MIN0\_MAX"or "MIN\_MAX"or 5 more

Normalization method applied to the results. Refer to <a href="https://developers.cloudflare.com/radar/concepts/normalization/">Normalization methods</a>.

</summary>

One of the following:

"PERCENTAGE"

<a href="#">Link to this property</a>

"MIN0\_MAX"

<a href="#">Link to this property</a>

"MIN\_MAX"

<a href="#">Link to this property</a>

"RAW\_VALUES"

<a href="#">Link to this property</a>

"PERCENTAGE\_CHANGE"

<a href="#">Link to this property</a>

"ROLLING\_AVERAGE"

<a href="#">Link to this property</a>

"OVERLAPPED\_PERCENTAGE"

<a href="#">Link to this property</a>

"RATIO"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

units: array of object {name, value }

Measurement units for the results.

</summary>

name: string

<a href="#">Link to this property</a>

value: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

summary\_0: <a href="https://developers.cloudflare.com/api/resources/radar#(resource)%20radar.email%20%3E%20(model)%20radar_email_summary%20%3E%20(schema)">RadarEmailSummary</a> { FAIL, NONE, PASS }

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.email.routing.summary%20%3E%20(model)%20summary_spf_response%20%3E%20(schema)>)