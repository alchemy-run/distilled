---
title: Quality
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Radar](https://developers.cloudflare.com/api/resources/radar)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Quality

#### QualityIQI

##### [Get Internet Quality Index (IQI) summary](https://developers.cloudflare.com/api/resources/radar/subresources/quality/subresources/iqi/methods/summary)

GET/radar/quality/iqi/summary

##### [Get Internet Quality Index (IQI) time series](https://developers.cloudflare.com/api/resources/radar/subresources/quality/subresources/iqi/methods/timeseries_groups)

GET/radar/quality/iqi/timeseries\_groups

##### ModelsExpand Collapse

<details>

<summary>

IQISummaryResponse object {meta, summary\_0 }

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

summary\_0: object {p25, p50, p75 }

</summary>

p25: string

<a href="#">Link to this property</a>

p50: string

<a href="#">Link to this property</a>

p75: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.quality.iqi%20%3E%20(model)%20iqi_summary_response%20%3E%20(schema)>)

<details>

<summary>

IQITimeseriesGroupsResponse object {meta, serie\_0 }

</summary>

<details>

<summary>

meta: object {aggInterval, confidenceInfo, dateRange, 3 more }

Metadata for the results.

</summary>

<details>

<summary>

aggInterval: "FIFTEEN\_MINUTES"or "ONE\_HOUR"or "ONE\_DAY"or 2 more

Aggregation interval of the results (e.g., in 15 minutes or 1 hour intervals). Refer to <a href="https://developers.cloudflare.com/radar/concepts/aggregation-intervals/">Aggregation intervals</a>.

</summary>

One of the following:

"FIFTEEN\_MINUTES"

<a href="#">Link to this property</a>

"ONE\_HOUR"

<a href="#">Link to this property</a>

"ONE\_DAY"

<a href="#">Link to this property</a>

"ONE\_WEEK"

<a href="#">Link to this property</a>

"ONE\_MONTH"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

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

serie\_0: object {timestamps }

</summary>

timestamps: array of string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.quality.iqi%20%3E%20(model)%20iqi_timeseries_groups_response%20%3E%20(schema)>)

#### QualitySpeed

##### [Get speed tests summary](https://developers.cloudflare.com/api/resources/radar/subresources/quality/subresources/speed/methods/summary)

GET/radar/quality/speed/summary

##### [Get speed tests histogram](https://developers.cloudflare.com/api/resources/radar/subresources/quality/subresources/speed/methods/histogram)

GET/radar/quality/speed/histogram

##### ModelsExpand Collapse

<details>

<summary>

SpeedSummaryResponse object {meta, summary\_0 }

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

summary\_0: object {bandwidthDownload, bandwidthUpload, jitterIdle, 4 more }

</summary>

bandwidthDownload: string

<a href="#">Link to this property</a>

bandwidthUpload: string

<a href="#">Link to this property</a>

jitterIdle: string

<a href="#">Link to this property</a>

jitterLoaded: string

<a href="#">Link to this property</a>

latencyIdle: string

<a href="#">Link to this property</a>

latencyLoaded: string

<a href="#">Link to this property</a>

packetLoss: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.quality.speed%20%3E%20(model)%20speed_summary_response%20%3E%20(schema)>)

<details>

<summary>

SpeedHistogramResponse object {histogram\_0, meta }

</summary>

<details>

<summary>

histogram\_0: object {bandwidthDownload, bandwidthUpload, bucketMin }

</summary>

bandwidthDownload: array of string

<a href="#">Link to this property</a>

bandwidthUpload: array of string

<a href="#">Link to this property</a>

bucketMin: array of string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

meta: object {bucketSize, confidenceInfo, dateRange, 4 more }

Metadata for the results.

</summary>

bucketSize: number

The width for every bucket in the histogram.

<a href="#">Link to this property</a>

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

totalTests: array of number

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

</details>

[Link to this property](#)%20radar.quality.speed%20%3E%20(model)%20speed_histogram_response%20%3E%20(schema)>)

#### QualitySpeedTop

##### [Get top ASes by speed test results](https://developers.cloudflare.com/api/resources/radar/subresources/quality/subresources/speed/subresources/top/methods/ases)

GET/radar/quality/speed/top/ases

##### [Get top locations by speed test results](https://developers.cloudflare.com/api/resources/radar/subresources/quality/subresources/speed/subresources/top/methods/locations)

GET/radar/quality/speed/top/locations

##### ModelsExpand Collapse

<details>

<summary>

TopAsesResponse object {meta, top\_0 }

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

top\_0: array of object {bandwidthDownload, bandwidthUpload, clientASN, 7 more }

</summary>

bandwidthDownload: string

<a href="#">Link to this property</a>

bandwidthUpload: string

<a href="#">Link to this property</a>

clientASN: number

<a href="#">Link to this property</a>

clientASName: string

<a href="#">Link to this property</a>

jitterIdle: string

<a href="#">Link to this property</a>

jitterLoaded: string

<a href="#">Link to this property</a>

latencyIdle: string

<a href="#">Link to this property</a>

latencyLoaded: string

<a href="#">Link to this property</a>

numTests: number

<a href="#">Link to this property</a>

rankPower: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.quality.speed.top%20%3E%20(model)%20top_ases_response%20%3E%20(schema)>)

<details>

<summary>

TopLocationsResponse object {meta, top\_0 }

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

top\_0: array of object {bandwidthDownload, bandwidthUpload, clientCountryAlpha2, 7 more }

</summary>

bandwidthDownload: string

<a href="#">Link to this property</a>

bandwidthUpload: string

<a href="#">Link to this property</a>

clientCountryAlpha2: string

<a href="#">Link to this property</a>

clientCountryName: string

<a href="#">Link to this property</a>

jitterIdle: string

<a href="#">Link to this property</a>

jitterLoaded: string

<a href="#">Link to this property</a>

latencyIdle: string

<a href="#">Link to this property</a>

latencyLoaded: string

<a href="#">Link to this property</a>

numTests: number

<a href="#">Link to this property</a>

rankPower: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.quality.speed.top%20%3E%20(model)%20top_locations_response%20%3E%20(schema)>)