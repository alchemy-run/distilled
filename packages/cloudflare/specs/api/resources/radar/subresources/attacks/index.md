##### [Get layer 3 attacks summary by dimension](/api/resources/radar/subresources/attacks/subresources/layer3/methods/summary_v2)

GET/radar/attacks/layer3/summary/{dimension}

##### [Get layer 3 attacks by bytes time series](/api/resources/radar/subresources/attacks/subresources/layer3/methods/timeseries)

GET/radar/attacks/layer3/timeseries

##### [Get layer 3 attacks time series grouped by dimension](/api/resources/radar/subresources/attacks/subresources/layer3/methods/timeseries_groups_v2)

GET/radar/attacks/layer3/timeseries_groups/{dimension}

##### Models

<details>

<summary>

Layer3SummaryV2Response object { meta, summary_0 }

</summary>

<details>

<summary>

meta: object { confidenceInfo, dateRange, lastUpdated, 2 more }

Metadata for the results.

</summary>

<details>

<summary>

confidenceInfo: object { annotations, level }

</summary>

<details>

<summary>

annotations: array of object { dataSource, description, endDate, 5 more }

</summary>

<details>

<summary>

dataSource: "ALL" or "AI_BOTS" or "AI_GATEWAY" or 22 more

Data source for annotations.

</summary>

One of the following:

"ALL"

[Link to this property](#)

"AI_BOTS"

[Link to this property](#)

"AI_GATEWAY"

[Link to this property](#)

"BGP"

[Link to this property](#)

"BOTS"

[Link to this property](#)

"CONNECTION_ANOMALY"

[Link to this property](#)

"CT"

[Link to this property](#)

"DNS"

[Link to this property](#)

"DNS_MAGNITUDE"

[Link to this property](#)

"DNS_AS112"

[Link to this property](#)

"DOS"

[Link to this property](#)

"EMAIL_ROUTING"

[Link to this property](#)

"EMAIL_SECURITY"

[Link to this property](#)

"FW"

[Link to this property](#)

"FW_PG"

[Link to this property](#)

"HTTP"

[Link to this property](#)

"HTTP_CONTROL"

[Link to this property](#)

"HTTP_CRAWLER_REFERER"

[Link to this property](#)

"HTTP_ORIGINS"

[Link to this property](#)

"IQI"

[Link to this property](#)

"LEAKED_CREDENTIALS"

[Link to this property](#)

"NET"

[Link to this property](#)

"ROBOTS_TXT"

[Link to this property](#)

"SPEED"

[Link to this property](#)

"WORKERS_AI"

[Link to this property](#)

</details>

[Link to this property](#)

description: string

[Link to this property](#)

endDate: string

formatdate-time

[Link to this property](#)

<details>

<summary>

eventType: "GENERAL" or "OUTAGE" or "PARTIAL_PROJECTION" or 2 more

Event type for annotations.

</summary>

One of the following:

"GENERAL"

[Link to this property](#)

"OUTAGE"

[Link to this property](#)

"PARTIAL_PROJECTION"

[Link to this property](#)

"PIPELINE"

[Link to this property](#)

"TRAFFIC_ANOMALY"

[Link to this property](#)

</details>

[Link to this property](#)

isInstantaneous: boolean

Whether event is a single point in time or a time range.

[Link to this property](#)

linkedUrl: string

formaturi

[Link to this property](#)

startDate: string

formatdate-time

[Link to this property](#)

tags: optional array of string

[Link to this property](#)

</details>

[Link to this property](#)

level: number

Provides an indication of how much confidence Cloudflare has in the data.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

dateRange: array of object { endTime, startTime }

</summary>

endTime: string

Adjusted end of date range.

formatdate-time

[Link to this property](#)

startTime: string

Adjusted start of date range.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

lastUpdated: string

Timestamp of the last dataset update.

formatdate-time

[Link to this property](#)

<details>

<summary>

normalization: "PERCENTAGE" or "MIN0_MAX" or "MIN_MAX" or 5 more

Normalization method applied to the results. Refer to [Normalization methods](https://developers.cloudflare.com/radar/concepts/normalization/).

</summary>

One of the following:

"PERCENTAGE"

[Link to this property](#)

"MIN0_MAX"

[Link to this property](#)

"MIN_MAX"

[Link to this property](#)

"RAW_VALUES"

[Link to this property](#)

"PERCENTAGE_CHANGE"

[Link to this property](#)

"ROLLING_AVERAGE"

[Link to this property](#)

"OVERLAPPED_PERCENTAGE"

[Link to this property](#)

"RATIO"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

units: array of object { name, value }

Measurement units for the results.

</summary>

name: string

[Link to this property](#)

value: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

summary_0: map[string]

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Layer3TimeseriesResponse object { meta }

</summary>

<details>

<summary>

meta: object { aggInterval, confidenceInfo, dateRange, 3 more }

Metadata for the results.

</summary>

<details>

<summary>

aggInterval: "FIFTEEN_MINUTES" or "ONE_HOUR" or "ONE_DAY" or 2 more

Aggregation interval of the results (e.g., in 15 minutes or 1 hour intervals). Refer to [Aggregation intervals](https://developers.cloudflare.com/radar/concepts/aggregation-intervals/).

</summary>

One of the following:

"FIFTEEN_MINUTES"

[Link to this property](#)

"ONE_HOUR"

[Link to this property](#)

"ONE_DAY"

[Link to this property](#)

"ONE_WEEK"

[Link to this property](#)

"ONE_MONTH"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

confidenceInfo: object { annotations, level }

</summary>

<details>

<summary>

annotations: array of object { dataSource, description, endDate, 5 more }

</summary>

<details>

<summary>

dataSource: "ALL" or "AI_BOTS" or "AI_GATEWAY" or 22 more

Data source for annotations.

</summary>

One of the following:

"ALL"

[Link to this property](#)

"AI_BOTS"

[Link to this property](#)

"AI_GATEWAY"

[Link to this property](#)

"BGP"

[Link to this property](#)

"BOTS"

[Link to this property](#)

"CONNECTION_ANOMALY"

[Link to this property](#)

"CT"

[Link to this property](#)

"DNS"

[Link to this property](#)

"DNS_MAGNITUDE"

[Link to this property](#)

"DNS_AS112"

[Link to this property](#)

"DOS"

[Link to this property](#)

"EMAIL_ROUTING"

[Link to this property](#)

"EMAIL_SECURITY"

[Link to this property](#)

"FW"

[Link to this property](#)

"FW_PG"

[Link to this property](#)

"HTTP"

[Link to this property](#)

"HTTP_CONTROL"

[Link to this property](#)

"HTTP_CRAWLER_REFERER"

[Link to this property](#)

"HTTP_ORIGINS"

[Link to this property](#)

"IQI"

[Link to this property](#)

"LEAKED_CREDENTIALS"

[Link to this property](#)

"NET"

[Link to this property](#)

"ROBOTS_TXT"

[Link to this property](#)

"SPEED"

[Link to this property](#)

"WORKERS_AI"

[Link to this property](#)

</details>

[Link to this property](#)

description: string

[Link to this property](#)

endDate: string

formatdate-time

[Link to this property](#)

<details>

<summary>

eventType: "GENERAL" or "OUTAGE" or "PARTIAL_PROJECTION" or 2 more

Event type for annotations.

</summary>

One of the following:

"GENERAL"

[Link to this property](#)

"OUTAGE"

[Link to this property](#)

"PARTIAL_PROJECTION"

[Link to this property](#)

"PIPELINE"

[Link to this property](#)

"TRAFFIC_ANOMALY"

[Link to this property](#)

</details>

[Link to this property](#)

isInstantaneous: boolean

Whether event is a single point in time or a time range.

[Link to this property](#)

linkedUrl: string

formaturi

[Link to this property](#)

startDate: string

formatdate-time

[Link to this property](#)

tags: optional array of string

[Link to this property](#)

</details>

[Link to this property](#)

level: number

Provides an indication of how much confidence Cloudflare has in the data.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

dateRange: array of object { endTime, startTime }

</summary>

endTime: string

Adjusted end of date range.

formatdate-time

[Link to this property](#)

startTime: string

Adjusted start of date range.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

lastUpdated: string

Timestamp of the last dataset update.

formatdate-time

[Link to this property](#)

<details>

<summary>

normalization: "PERCENTAGE" or "MIN0_MAX" or "MIN_MAX" or 5 more

Normalization method applied to the results. Refer to [Normalization methods](https://developers.cloudflare.com/radar/concepts/normalization/).

</summary>

One of the following:

"PERCENTAGE"

[Link to this property](#)

"MIN0_MAX"

[Link to this property](#)

"MIN_MAX"

[Link to this property](#)

"RAW_VALUES"

[Link to this property](#)

"PERCENTAGE_CHANGE"

[Link to this property](#)

"ROLLING_AVERAGE"

[Link to this property](#)

"OVERLAPPED_PERCENTAGE"

[Link to this property](#)

"RATIO"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

units: array of object { name, value }

Measurement units for the results.

</summary>

name: string

[Link to this property](#)

value: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Layer3TimeseriesGroupsV2Response object { meta, serie_0 }

</summary>

<details>

<summary>

meta: object { aggInterval, confidenceInfo, dateRange, 3 more }

Metadata for the results.

</summary>

<details>

<summary>

aggInterval: "FIFTEEN_MINUTES" or "ONE_HOUR" or "ONE_DAY" or 2 more

Aggregation interval of the results (e.g., in 15 minutes or 1 hour intervals). Refer to [Aggregation intervals](https://developers.cloudflare.com/radar/concepts/aggregation-intervals/).

</summary>

One of the following:

"FIFTEEN_MINUTES"

[Link to this property](#)

"ONE_HOUR"

[Link to this property](#)

"ONE_DAY"

[Link to this property](#)

"ONE_WEEK"

[Link to this property](#)

"ONE_MONTH"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

confidenceInfo: object { annotations, level }

</summary>

<details>

<summary>

annotations: array of object { dataSource, description, endDate, 5 more }

</summary>

<details>

<summary>

dataSource: "ALL" or "AI_BOTS" or "AI_GATEWAY" or 22 more

Data source for annotations.

</summary>

One of the following:

"ALL"

[Link to this property](#)

"AI_BOTS"

[Link to this property](#)

"AI_GATEWAY"

[Link to this property](#)

"BGP"

[Link to this property](#)

"BOTS"

[Link to this property](#)

"CONNECTION_ANOMALY"

[Link to this property](#)

"CT"

[Link to this property](#)

"DNS"

[Link to this property](#)

"DNS_MAGNITUDE"

[Link to this property](#)

"DNS_AS112"

[Link to this property](#)

"DOS"

[Link to this property](#)

"EMAIL_ROUTING"

[Link to this property](#)

"EMAIL_SECURITY"

[Link to this property](#)

"FW"

[Link to this property](#)

"FW_PG"

[Link to this property](#)

"HTTP"

[Link to this property](#)

"HTTP_CONTROL"

[Link to this property](#)

"HTTP_CRAWLER_REFERER"

[Link to this property](#)

"HTTP_ORIGINS"

[Link to this property](#)

"IQI"

[Link to this property](#)

"LEAKED_CREDENTIALS"

[Link to this property](#)

"NET"

[Link to this property](#)

"ROBOTS_TXT"

[Link to this property](#)

"SPEED"

[Link to this property](#)

"WORKERS_AI"

[Link to this property](#)

</details>

[Link to this property](#)

description: string

[Link to this property](#)

endDate: string

formatdate-time

[Link to this property](#)

<details>

<summary>

eventType: "GENERAL" or "OUTAGE" or "PARTIAL_PROJECTION" or 2 more

Event type for annotations.

</summary>

One of the following:

"GENERAL"

[Link to this property](#)

"OUTAGE"

[Link to this property](#)

"PARTIAL_PROJECTION"

[Link to this property](#)

"PIPELINE"

[Link to this property](#)

"TRAFFIC_ANOMALY"

[Link to this property](#)

</details>

[Link to this property](#)

isInstantaneous: boolean

Whether event is a single point in time or a time range.

[Link to this property](#)

linkedUrl: string

formaturi

[Link to this property](#)

startDate: string

formatdate-time

[Link to this property](#)

tags: optional array of string

[Link to this property](#)

</details>

[Link to this property](#)

level: number

Provides an indication of how much confidence Cloudflare has in the data.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

dateRange: array of object { endTime, startTime }

</summary>

endTime: string

Adjusted end of date range.

formatdate-time

[Link to this property](#)

startTime: string

Adjusted start of date range.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

lastUpdated: string

Timestamp of the last dataset update.

formatdate-time

[Link to this property](#)

<details>

<summary>

normalization: "PERCENTAGE" or "MIN0_MAX" or "MIN_MAX" or 5 more

Normalization method applied to the results. Refer to [Normalization methods](https://developers.cloudflare.com/radar/concepts/normalization/).

</summary>

One of the following:

"PERCENTAGE"

[Link to this property](#)

"MIN0_MAX"

[Link to this property](#)

"MIN_MAX"

[Link to this property](#)

"RAW_VALUES"

[Link to this property](#)

"PERCENTAGE_CHANGE"

[Link to this property](#)

"ROLLING_AVERAGE"

[Link to this property](#)

"OVERLAPPED_PERCENTAGE"

[Link to this property](#)

"RATIO"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

units: array of object { name, value }

Measurement units for the results.

</summary>

name: string

[Link to this property](#)

value: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

serie_0: object { timestamps }

</summary>

timestamps: array of string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

##### [Get layer 3 attacks by bitrate summary](/api/resources/radar/subresources/attacks/subresources/layer3/subresources/summary/methods/bitrate)

GET/radar/attacks/layer3/summary/bitrate

##### [Get layer 3 attacks by duration summary](/api/resources/radar/subresources/attacks/subresources/layer3/subresources/summary/methods/duration)

GET/radar/attacks/layer3/summary/duration

##### [Get layer 3 attacks by IP version summary](/api/resources/radar/subresources/attacks/subresources/layer3/subresources/summary/methods/ip_version)

GET/radar/attacks/layer3/summary/ip_version

##### [Get layer 3 attacks by protocol summary](/api/resources/radar/subresources/attacks/subresources/layer3/subresources/summary/methods/protocol)

GET/radar/attacks/layer3/summary/protocol

##### [Get layer 3 attacks by vector summary](/api/resources/radar/subresources/attacks/subresources/layer3/subresources/summary/methods/vector)

GET/radar/attacks/layer3/summary/vector

##### [Get layer 3 attacks by targeted industry summary](/api/resources/radar/subresources/attacks/subresources/layer3/subresources/summary/methods/industry)

GET/radar/attacks/layer3/summary/industry

##### [Get layer 3 attacks by targeted vertical summary](/api/resources/radar/subresources/attacks/subresources/layer3/subresources/summary/methods/vertical)

GET/radar/attacks/layer3/summary/vertical

##### Models

<details>

<summary>

SummaryBitrateResponse object { meta, summary_0 }

</summary>

<details>

<summary>

meta: object { confidenceInfo, dateRange, lastUpdated, 2 more }

Metadata for the results.

</summary>

<details>

<summary>

confidenceInfo: object { annotations, level }

</summary>

<details>

<summary>

annotations: array of object { dataSource, description, endDate, 5 more }

</summary>

<details>

<summary>

dataSource: "ALL" or "AI_BOTS" or "AI_GATEWAY" or 22 more

Data source for annotations.

</summary>

One of the following:

"ALL"

[Link to this property](#)

"AI_BOTS"

[Link to this property](#)

"AI_GATEWAY"

[Link to this property](#)

"BGP"

[Link to this property](#)

"BOTS"

[Link to this property](#)

"CONNECTION_ANOMALY"

[Link to this property](#)

"CT"

[Link to this property](#)

"DNS"

[Link to this property](#)

"DNS_MAGNITUDE"

[Link to this property](#)

"DNS_AS112"

[Link to this property](#)

"DOS"

[Link to this property](#)

"EMAIL_ROUTING"

[Link to this property](#)

"EMAIL_SECURITY"

[Link to this property](#)

"FW"

[Link to this property](#)

"FW_PG"

[Link to this property](#)

"HTTP"

[Link to this property](#)

"HTTP_CONTROL"

[Link to this property](#)

"HTTP_CRAWLER_REFERER"

[Link to this property](#)

"HTTP_ORIGINS"

[Link to this property](#)

"IQI"

[Link to this property](#)

"LEAKED_CREDENTIALS"

[Link to this property](#)

"NET"

[Link to this property](#)

"ROBOTS_TXT"

[Link to this property](#)

"SPEED"

[Link to this property](#)

"WORKERS_AI"

[Link to this property](#)

</details>

[Link to this property](#)

description: string

[Link to this property](#)

endDate: string

formatdate-time

[Link to this property](#)

<details>

<summary>

eventType: "GENERAL" or "OUTAGE" or "PARTIAL_PROJECTION" or 2 more

Event type for annotations.

</summary>

One of the following:

"GENERAL"

[Link to this property](#)

"OUTAGE"

[Link to this property](#)

"PARTIAL_PROJECTION"

[Link to this property](#)

"PIPELINE"

[Link to this property](#)

"TRAFFIC_ANOMALY"

[Link to this property](#)

</details>

[Link to this property](#)

isInstantaneous: boolean

Whether event is a single point in time or a time range.

[Link to this property](#)

linkedUrl: string

formaturi

[Link to this property](#)

startDate: string

formatdate-time

[Link to this property](#)

tags: optional array of string

[Link to this property](#)

</details>

[Link to this property](#)

level: number

Provides an indication of how much confidence Cloudflare has in the data.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

dateRange: array of object { endTime, startTime }

</summary>

endTime: string

Adjusted end of date range.

formatdate-time

[Link to this property](#)

startTime: string

Adjusted start of date range.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

lastUpdated: string

Timestamp of the last dataset update.

formatdate-time

[Link to this property](#)

<details>

<summary>

normalization: "PERCENTAGE" or "MIN0_MAX" or "MIN_MAX" or 5 more

Normalization method applied to the results. Refer to [Normalization methods](https://developers.cloudflare.com/radar/concepts/normalization/).

</summary>

One of the following:

"PERCENTAGE"

[Link to this property](#)

"MIN0_MAX"

[Link to this property](#)

"MIN_MAX"

[Link to this property](#)

"RAW_VALUES"

[Link to this property](#)

"PERCENTAGE_CHANGE"

[Link to this property](#)

"ROLLING_AVERAGE"

[Link to this property](#)

"OVERLAPPED_PERCENTAGE"

[Link to this property](#)

"RATIO"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

units: array of object { name, value }

Measurement units for the results.

</summary>

name: string

[Link to this property](#)

value: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

summary_0: object { _1_GBPS_TO_10_GBPS, _10_GBPS_TO_100_GBPS, _500_MBPS_TO_1_GBPS, 2 more }

</summary>

_1_GBPS_TO_10_GBPS: string

A numeric string.

[Link to this property](#)

_10_GBPS_TO_100_GBPS: string

A numeric string.

[Link to this property](#)

_500_MBPS_TO_1_GBPS: string

A numeric string.

[Link to this property](#)

OVER_100_GBPS: string

A numeric string.

[Link to this property](#)

UNDER_500_MBPS: string

A numeric string.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SummaryDurationResponse object { meta, summary_0 }

</summary>

<details>

<summary>

meta: object { confidenceInfo, dateRange, lastUpdated, 2 more }

Metadata for the results.

</summary>

<details>

<summary>

confidenceInfo: object { annotations, level }

</summary>

<details>

<summary>

annotations: array of object { dataSource, description, endDate, 5 more }

</summary>

<details>

<summary>

dataSource: "ALL" or "AI_BOTS" or "AI_GATEWAY" or 22 more

Data source for annotations.

</summary>

One of the following:

"ALL"

[Link to this property](#)

"AI_BOTS"

[Link to this property](#)

"AI_GATEWAY"

[Link to this property](#)

"BGP"

[Link to this property](#)

"BOTS"

[Link to this property](#)

"CONNECTION_ANOMALY"

[Link to this property](#)

"CT"

[Link to this property](#)

"DNS"

[Link to this property](#)

"DNS_MAGNITUDE"

[Link to this property](#)

"DNS_AS112"

[Link to this property](#)

"DOS"

[Link to this property](#)

"EMAIL_ROUTING"

[Link to this property](#)

"EMAIL_SECURITY"

[Link to this property](#)

"FW"

[Link to this property](#)

"FW_PG"

[Link to this property](#)

"HTTP"

[Link to this property](#)

"HTTP_CONTROL"

[Link to this property](#)

"HTTP_CRAWLER_REFERER"

[Link to this property](#)

"HTTP_ORIGINS"

[Link to this property](#)

"IQI"

[Link to this property](#)

"LEAKED_CREDENTIALS"

[Link to this property](#)

"NET"

[Link to this property](#)

"ROBOTS_TXT"

[Link to this property](#)

"SPEED"

[Link to this property](#)

"WORKERS_AI"

[Link to this property](#)

</details>

[Link to this property](#)

description: string

[Link to this property](#)

endDate: string

formatdate-time

[Link to this property](#)

<details>

<summary>

eventType: "GENERAL" or "OUTAGE" or "PARTIAL_PROJECTION" or 2 more

Event type for annotations.

</summary>

One of the following:

"GENERAL"

[Link to this property](#)

"OUTAGE"

[Link to this property](#)

"PARTIAL_PROJECTION"

[Link to this property](#)

"PIPELINE"

[Link to this property](#)

"TRAFFIC_ANOMALY"

[Link to this property](#)

</details>

[Link to this property](#)

isInstantaneous: boolean

Whether event is a single point in time or a time range.

[Link to this property](#)

linkedUrl: string

formaturi

[Link to this property](#)

startDate: string

formatdate-time

[Link to this property](#)

tags: optional array of string

[Link to this property](#)

</details>

[Link to this property](#)

level: number

Provides an indication of how much confidence Cloudflare has in the data.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

dateRange: array of object { endTime, startTime }

</summary>

endTime: string

Adjusted end of date range.

formatdate-time

[Link to this property](#)

startTime: string

Adjusted start of date range.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

lastUpdated: string

Timestamp of the last dataset update.

formatdate-time

[Link to this property](#)

<details>

<summary>

normalization: "PERCENTAGE" or "MIN0_MAX" or "MIN_MAX" or 5 more

Normalization method applied to the results. Refer to [Normalization methods](https://developers.cloudflare.com/radar/concepts/normalization/).

</summary>

One of the following:

"PERCENTAGE"

[Link to this property](#)

"MIN0_MAX"

[Link to this property](#)

"MIN_MAX"

[Link to this property](#)

"RAW_VALUES"

[Link to this property](#)

"PERCENTAGE_CHANGE"

[Link to this property](#)

"ROLLING_AVERAGE"

[Link to this property](#)

"OVERLAPPED_PERCENTAGE"

[Link to this property](#)

"RATIO"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

units: array of object { name, value }

Measurement units for the results.

</summary>

name: string

[Link to this property](#)

value: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

summary_0: object { _1_HOUR_TO_3_HOURS, _10_MINS_TO_20_MINS, _20_MINS_TO_40_MINS, 3 more }

</summary>

_1_HOUR_TO_3_HOURS: string

A numeric string.

[Link to this property](#)

_10_MINS_TO_20_MINS: string

A numeric string.

[Link to this property](#)

_20_MINS_TO_40_MINS: string

A numeric string.

[Link to this property](#)

_40_MINS_TO_1_HOUR: string

A numeric string.

[Link to this property](#)

OVER_3_HOURS: string

A numeric string.

[Link to this property](#)

UNDER_10_MINS: string

A numeric string.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SummaryIPVersionResponse object { meta, summary_0 }

</summary>

<details>

<summary>

meta: object { confidenceInfo, dateRange, lastUpdated, 2 more }

Metadata for the results.

</summary>

<details>

<summary>

confidenceInfo: object { annotations, level }

</summary>

<details>

<summary>

annotations: array of object { dataSource, description, endDate, 5 more }

</summary>

<details>

<summary>

dataSource: "ALL" or "AI_BOTS" or "AI_GATEWAY" or 22 more

Data source for annotations.

</summary>

One of the following:

"ALL"

[Link to this property](#)

"AI_BOTS"

[Link to this property](#)

"AI_GATEWAY"

[Link to this property](#)

"BGP"

[Link to this property](#)

"BOTS"

[Link to this property](#)

"CONNECTION_ANOMALY"

[Link to this property](#)

"CT"

[Link to this property](#)

"DNS"

[Link to this property](#)

"DNS_MAGNITUDE"

[Link to this property](#)

"DNS_AS112"

[Link to this property](#)

"DOS"

[Link to this property](#)

"EMAIL_ROUTING"

[Link to this property](#)

"EMAIL_SECURITY"

[Link to this property](#)

"FW"

[Link to this property](#)

"FW_PG"

[Link to this property](#)

"HTTP"

[Link to this property](#)

"HTTP_CONTROL"

[Link to this property](#)

"HTTP_CRAWLER_REFERER"

[Link to this property](#)

"HTTP_ORIGINS"

[Link to this property](#)

"IQI"

[Link to this property](#)

"LEAKED_CREDENTIALS"

[Link to this property](#)

"NET"

[Link to this property](#)

"ROBOTS_TXT"

[Link to this property](#)

"SPEED"

[Link to this property](#)

"WORKERS_AI"

[Link to this property](#)

</details>

[Link to this property](#)

description: string

[Link to this property](#)

endDate: string

formatdate-time

[Link to this property](#)

<details>

<summary>

eventType: "GENERAL" or "OUTAGE" or "PARTIAL_PROJECTION" or 2 more

Event type for annotations.

</summary>

One of the following:

"GENERAL"

[Link to this property](#)

"OUTAGE"

[Link to this property](#)

"PARTIAL_PROJECTION"

[Link to this property](#)

"PIPELINE"

[Link to this property](#)

"TRAFFIC_ANOMALY"

[Link to this property](#)

</details>

[Link to this property](#)

isInstantaneous: boolean

Whether event is a single point in time or a time range.

[Link to this property](#)

linkedUrl: string

formaturi

[Link to this property](#)

startDate: string

formatdate-time

[Link to this property](#)

tags: optional array of string

[Link to this property](#)

</details>

[Link to this property](#)

level: number

Provides an indication of how much confidence Cloudflare has in the data.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

dateRange: array of object { endTime, startTime }

</summary>

endTime: string

Adjusted end of date range.

formatdate-time

[Link to this property](#)

startTime: string

Adjusted start of date range.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

lastUpdated: string

Timestamp of the last dataset update.

formatdate-time

[Link to this property](#)

<details>

<summary>

normalization: "PERCENTAGE" or "MIN0_MAX" or "MIN_MAX" or 5 more

Normalization method applied to the results. Refer to [Normalization methods](https://developers.cloudflare.com/radar/concepts/normalization/).

</summary>

One of the following:

"PERCENTAGE"

[Link to this property](#)

"MIN0_MAX"

[Link to this property](#)

"MIN_MAX"

[Link to this property](#)

"RAW_VALUES"

[Link to this property](#)

"PERCENTAGE_CHANGE"

[Link to this property](#)

"ROLLING_AVERAGE"

[Link to this property](#)

"OVERLAPPED_PERCENTAGE"

[Link to this property](#)

"RATIO"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

units: array of object { name, value }

Measurement units for the results.

</summary>

name: string

[Link to this property](#)

value: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

summary_0: object { IPv4, IPv6 }

</summary>

IPv4: string

A numeric string.

[Link to this property](#)

IPv6: string

A numeric string.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SummaryProtocolResponse object { meta, summary_0 }

</summary>

<details>

<summary>

meta: object { confidenceInfo, dateRange, lastUpdated, 2 more }

Metadata for the results.

</summary>

<details>

<summary>

confidenceInfo: object { annotations, level }

</summary>

<details>

<summary>

annotations: array of object { dataSource, description, endDate, 5 more }

</summary>

<details>

<summary>

dataSource: "ALL" or "AI_BOTS" or "AI_GATEWAY" or 22 more

Data source for annotations.

</summary>

One of the following:

"ALL"

[Link to this property](#)

"AI_BOTS"

[Link to this property](#)

"AI_GATEWAY"

[Link to this property](#)

"BGP"

[Link to this property](#)

"BOTS"

[Link to this property](#)

"CONNECTION_ANOMALY"

[Link to this property](#)

"CT"

[Link to this property](#)

"DNS"

[Link to this property](#)

"DNS_MAGNITUDE"

[Link to this property](#)

"DNS_AS112"

[Link to this property](#)

"DOS"

[Link to this property](#)

"EMAIL_ROUTING"

[Link to this property](#)

"EMAIL_SECURITY"

[Link to this property](#)

"FW"

[Link to this property](#)

"FW_PG"

[Link to this property](#)

"HTTP"

[Link to this property](#)

"HTTP_CONTROL"

[Link to this property](#)

"HTTP_CRAWLER_REFERER"

[Link to this property](#)

"HTTP_ORIGINS"

[Link to this property](#)

"IQI"

[Link to this property](#)

"LEAKED_CREDENTIALS"

[Link to this property](#)

"NET"

[Link to this property](#)

"ROBOTS_TXT"

[Link to this property](#)

"SPEED"

[Link to this property](#)

"WORKERS_AI"

[Link to this property](#)

</details>

[Link to this property](#)

description: string

[Link to this property](#)

endDate: string

formatdate-time

[Link to this property](#)

<details>

<summary>

eventType: "GENERAL" or "OUTAGE" or "PARTIAL_PROJECTION" or 2 more

Event type for annotations.

</summary>

One of the following:

"GENERAL"

[Link to this property](#)

"OUTAGE"

[Link to this property](#)

"PARTIAL_PROJECTION"

[Link to this property](#)

"PIPELINE"

[Link to this property](#)

"TRAFFIC_ANOMALY"

[Link to this property](#)

</details>

[Link to this property](#)

isInstantaneous: boolean

Whether event is a single point in time or a time range.

[Link to this property](#)

linkedUrl: string

formaturi

[Link to this property](#)

startDate: string

formatdate-time

[Link to this property](#)

tags: optional array of string

[Link to this property](#)

</details>

[Link to this property](#)

level: number

Provides an indication of how much confidence Cloudflare has in the data.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

dateRange: array of object { endTime, startTime }

</summary>

endTime: string

Adjusted end of date range.

formatdate-time

[Link to this property](#)

startTime: string

Adjusted start of date range.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

lastUpdated: string

Timestamp of the last dataset update.

formatdate-time

[Link to this property](#)

<details>

<summary>

normalization: "PERCENTAGE" or "MIN0_MAX" or "MIN_MAX" or 5 more

Normalization method applied to the results. Refer to [Normalization methods](https://developers.cloudflare.com/radar/concepts/normalization/).

</summary>

One of the following:

"PERCENTAGE"

[Link to this property](#)

"MIN0_MAX"

[Link to this property](#)

"MIN_MAX"

[Link to this property](#)

"RAW_VALUES"

[Link to this property](#)

"PERCENTAGE_CHANGE"

[Link to this property](#)

"ROLLING_AVERAGE"

[Link to this property](#)

"OVERLAPPED_PERCENTAGE"

[Link to this property](#)

"RATIO"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

units: array of object { name, value }

Measurement units for the results.

</summary>

name: string

[Link to this property](#)

value: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

summary_0: object { GRE, ICMP, TCP, UDP }

</summary>

GRE: string

A numeric string.

[Link to this property](#)

ICMP: string

A numeric string.

[Link to this property](#)

TCP: string

A numeric string.

[Link to this property](#)

UDP: string

A numeric string.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SummaryVectorResponse object { meta, summary_0 }

</summary>

<details>

<summary>

meta: object { confidenceInfo, dateRange, lastUpdated, 2 more }

Metadata for the results.

</summary>

<details>

<summary>

confidenceInfo: object { annotations, level }

</summary>

<details>

<summary>

annotations: array of object { dataSource, description, endDate, 5 more }

</summary>

<details>

<summary>

dataSource: "ALL" or "AI_BOTS" or "AI_GATEWAY" or 22 more

Data source for annotations.

</summary>

One of the following:

"ALL"

[Link to this property](#)

"AI_BOTS"

[Link to this property](#)

"AI_GATEWAY"

[Link to this property](#)

"BGP"

[Link to this property](#)

"BOTS"

[Link to this property](#)

"CONNECTION_ANOMALY"

[Link to this property](#)

"CT"

[Link to this property](#)

"DNS"

[Link to this property](#)

"DNS_MAGNITUDE"

[Link to this property](#)

"DNS_AS112"

[Link to this property](#)

"DOS"

[Link to this property](#)

"EMAIL_ROUTING"

[Link to this property](#)

"EMAIL_SECURITY"

[Link to this property](#)

"FW"

[Link to this property](#)

"FW_PG"

[Link to this property](#)

"HTTP"

[Link to this property](#)

"HTTP_CONTROL"

[Link to this property](#)

"HTTP_CRAWLER_REFERER"

[Link to this property](#)

"HTTP_ORIGINS"

[Link to this property](#)

"IQI"

[Link to this property](#)

"LEAKED_CREDENTIALS"

[Link to this property](#)

"NET"

[Link to this property](#)

"ROBOTS_TXT"

[Link to this property](#)

"SPEED"

[Link to this property](#)

"WORKERS_AI"

[Link to this property](#)

</details>

[Link to this property](#)

description: string

[Link to this property](#)

endDate: string

formatdate-time

[Link to this property](#)

<details>

<summary>

eventType: "GENERAL" or "OUTAGE" or "PARTIAL_PROJECTION" or 2 more

Event type for annotations.

</summary>

One of the following:

"GENERAL"

[Link to this property](#)

"OUTAGE"

[Link to this property](#)

"PARTIAL_PROJECTION"

[Link to this property](#)

"PIPELINE"

[Link to this property](#)

"TRAFFIC_ANOMALY"

[Link to this property](#)

</details>

[Link to this property](#)

isInstantaneous: boolean

Whether event is a single point in time or a time range.

[Link to this property](#)

linkedUrl: string

formaturi

[Link to this property](#)

startDate: string

formatdate-time

[Link to this property](#)

tags: optional array of string

[Link to this property](#)

</details>

[Link to this property](#)

level: number

Provides an indication of how much confidence Cloudflare has in the data.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

dateRange: array of object { endTime, startTime }

</summary>

endTime: string

Adjusted end of date range.

formatdate-time

[Link to this property](#)

startTime: string

Adjusted start of date range.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

lastUpdated: string

Timestamp of the last dataset update.

formatdate-time

[Link to this property](#)

<details>

<summary>

normalization: "PERCENTAGE" or "MIN0_MAX" or "MIN_MAX" or 5 more

Normalization method applied to the results. Refer to [Normalization methods](https://developers.cloudflare.com/radar/concepts/normalization/).

</summary>

One of the following:

"PERCENTAGE"

[Link to this property](#)

"MIN0_MAX"

[Link to this property](#)

"MIN_MAX"

[Link to this property](#)

"RAW_VALUES"

[Link to this property](#)

"PERCENTAGE_CHANGE"

[Link to this property](#)

"ROLLING_AVERAGE"

[Link to this property](#)

"OVERLAPPED_PERCENTAGE"

[Link to this property](#)

"RATIO"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

units: array of object { name, value }

Measurement units for the results.

</summary>

name: string

[Link to this property](#)

value: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

summary_0: map[string]

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SummaryIndustryResponse object { meta, summary_0 }

</summary>

<details>

<summary>

meta: object { confidenceInfo, dateRange, lastUpdated, 2 more }

Metadata for the results.

</summary>

<details>

<summary>

confidenceInfo: object { annotations, level }

</summary>

<details>

<summary>

annotations: array of object { dataSource, description, endDate, 5 more }

</summary>

<details>

<summary>

dataSource: "ALL" or "AI_BOTS" or "AI_GATEWAY" or 22 more

Data source for annotations.

</summary>

One of the following:

"ALL"

[Link to this property](#)

"AI_BOTS"

[Link to this property](#)

"AI_GATEWAY"

[Link to this property](#)

"BGP"

[Link to this property](#)

"BOTS"

[Link to this property](#)

"CONNECTION_ANOMALY"

[Link to this property](#)

"CT"

[Link to this property](#)

"DNS"

[Link to this property](#)

"DNS_MAGNITUDE"

[Link to this property](#)

"DNS_AS112"

[Link to this property](#)

"DOS"

[Link to this property](#)

"EMAIL_ROUTING"

[Link to this property](#)

"EMAIL_SECURITY"

[Link to this property](#)

"FW"

[Link to this property](#)

"FW_PG"

[Link to this property](#)

"HTTP"

[Link to this property](#)

"HTTP_CONTROL"

[Link to this property](#)

"HTTP_CRAWLER_REFERER"

[Link to this property](#)

"HTTP_ORIGINS"

[Link to this property](#)

"IQI"

[Link to this property](#)

"LEAKED_CREDENTIALS"

[Link to this property](#)

"NET"

[Link to this property](#)

"ROBOTS_TXT"

[Link to this property](#)

"SPEED"

[Link to this property](#)

"WORKERS_AI"

[Link to this property](#)

</details>

[Link to this property](#)

description: string

[Link to this property](#)

endDate: string

formatdate-time

[Link to this property](#)

<details>

<summary>

eventType: "GENERAL" or "OUTAGE" or "PARTIAL_PROJECTION" or 2 more

Event type for annotations.

</summary>

One of the following:

"GENERAL"

[Link to this property](#)

"OUTAGE"

[Link to this property](#)

"PARTIAL_PROJECTION"

[Link to this property](#)

"PIPELINE"

[Link to this property](#)

"TRAFFIC_ANOMALY"

[Link to this property](#)

</details>

[Link to this property](#)

isInstantaneous: boolean

Whether event is a single point in time or a time range.

[Link to this property](#)

linkedUrl: string

formaturi

[Link to this property](#)

startDate: string

formatdate-time

[Link to this property](#)

tags: optional array of string

[Link to this property](#)

</details>

[Link to this property](#)

level: number

Provides an indication of how much confidence Cloudflare has in the data.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

dateRange: array of object { endTime, startTime }

</summary>

endTime: string

Adjusted end of date range.

formatdate-time

[Link to this property](#)

startTime: string

Adjusted start of date range.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

lastUpdated: string

Timestamp of the last dataset update.

formatdate-time

[Link to this property](#)

<details>

<summary>

normalization: "PERCENTAGE" or "MIN0_MAX" or "MIN_MAX" or 5 more

Normalization method applied to the results. Refer to [Normalization methods](https://developers.cloudflare.com/radar/concepts/normalization/).

</summary>

One of the following:

"PERCENTAGE"

[Link to this property](#)

"MIN0_MAX"

[Link to this property](#)

"MIN_MAX"

[Link to this property](#)

"RAW_VALUES"

[Link to this property](#)

"PERCENTAGE_CHANGE"

[Link to this property](#)

"ROLLING_AVERAGE"

[Link to this property](#)

"OVERLAPPED_PERCENTAGE"

[Link to this property](#)

"RATIO"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

units: array of object { name, value }

Measurement units for the results.

</summary>

name: string

[Link to this property](#)

value: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

summary_0: map[string]

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SummaryVerticalResponse object { meta, summary_0 }

</summary>

<details>

<summary>

meta: object { confidenceInfo, dateRange, lastUpdated, 2 more }

Metadata for the results.

</summary>

<details>

<summary>

confidenceInfo: object { annotations, level }

</summary>

<details>

<summary>

annotations: array of object { dataSource, description, endDate, 5 more }

</summary>

<details>

<summary>

dataSource: "ALL" or "AI_BOTS" or "AI_GATEWAY" or 22 more

Data source for annotations.

</summary>

One of the following:

"ALL"

[Link to this property](#)

"AI_BOTS"

[Link to this property](#)

"AI_GATEWAY"

[Link to this property](#)

"BGP"

[Link to this property](#)

"BOTS"

[Link to this property](#)

"CONNECTION_ANOMALY"

[Link to this property](#)

"CT"

[Link to this property](#)

"DNS"

[Link to this property](#)

"DNS_MAGNITUDE"

[Link to this property](#)

"DNS_AS112"

[Link to this property](#)

"DOS"

[Link to this property](#)

"EMAIL_ROUTING"

[Link to this property](#)

"EMAIL_SECURITY"

[Link to this property](#)

"FW"

[Link to this property](#)

"FW_PG"

[Link to this property](#)

"HTTP"

[Link to this property](#)

"HTTP_CONTROL"

[Link to this property](#)

"HTTP_CRAWLER_REFERER"

[Link to this property](#)

"HTTP_ORIGINS"

[Link to this property](#)

"IQI"

[Link to this property](#)

"LEAKED_CREDENTIALS"

[Link to this property](#)

"NET"

[Link to this property](#)

"ROBOTS_TXT"

[Link to this property](#)

"SPEED"

[Link to this property](#)

"WORKERS_AI"

[Link to this property](#)

</details>

[Link to this property](#)

description: string

[Link to this property](#)

endDate: string

formatdate-time

[Link to this property](#)

<details>

<summary>

eventType: "GENERAL" or "OUTAGE" or "PARTIAL_PROJECTION" or 2 more

Event type for annotations.

</summary>

One of the following:

"GENERAL"

[Link to this property](#)

"OUTAGE"

[Link to this property](#)

"PARTIAL_PROJECTION"

[Link to this property](#)

"PIPELINE"

[Link to this property](#)

"TRAFFIC_ANOMALY"

[Link to this property](#)

</details>

[Link to this property](#)

isInstantaneous: boolean

Whether event is a single point in time or a time range.

[Link to this property](#)

linkedUrl: string

formaturi

[Link to this property](#)

startDate: string

formatdate-time

[Link to this property](#)

tags: optional array of string

[Link to this property](#)

</details>

[Link to this property](#)

level: number

Provides an indication of how much confidence Cloudflare has in the data.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

dateRange: array of object { endTime, startTime }

</summary>

endTime: string

Adjusted end of date range.

formatdate-time

[Link to this property](#)

startTime: string

Adjusted start of date range.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

lastUpdated: string

Timestamp of the last dataset update.

formatdate-time

[Link to this property](#)

<details>

<summary>

normalization: "PERCENTAGE" or "MIN0_MAX" or "MIN_MAX" or 5 more

Normalization method applied to the results. Refer to [Normalization methods](https://developers.cloudflare.com/radar/concepts/normalization/).

</summary>

One of the following:

"PERCENTAGE"

[Link to this property](#)

"MIN0_MAX"

[Link to this property](#)

"MIN_MAX"

[Link to this property](#)

"RAW_VALUES"

[Link to this property](#)

"PERCENTAGE_CHANGE"

[Link to this property](#)

"ROLLING_AVERAGE"

[Link to this property](#)

"OVERLAPPED_PERCENTAGE"

[Link to this property](#)

"RATIO"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

units: array of object { name, value }

Measurement units for the results.

</summary>

name: string

[Link to this property](#)

value: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

summary_0: map[string]

[Link to this property](#)

</details>

[Link to this property](#)

##### [Get layer 3 attacks by target industries time series](/api/resources/radar/subresources/attacks/subresources/layer3/subresources/timeseries_groups/methods/industry)

GET/radar/attacks/layer3/timeseries_groups/industry

##### [Get layer 3 attacks by IP version time series](/api/resources/radar/subresources/attacks/subresources/layer3/subresources/timeseries_groups/methods/ip_version)

GET/radar/attacks/layer3/timeseries_groups/ip_version

##### [Get layer 3 attacks by protocol time series](/api/resources/radar/subresources/attacks/subresources/layer3/subresources/timeseries_groups/methods/protocol)

GET/radar/attacks/layer3/timeseries_groups/protocol

##### [Get layer 3 attacks by vector time series](/api/resources/radar/subresources/attacks/subresources/layer3/subresources/timeseries_groups/methods/vector)

GET/radar/attacks/layer3/timeseries_groups/vector

##### [Get layer 3 attacks by vertical time series](/api/resources/radar/subresources/attacks/subresources/layer3/subresources/timeseries_groups/methods/vertical)

GET/radar/attacks/layer3/timeseries_groups/vertical

##### [Get layer 3 attacks by bitrate time series](/api/resources/radar/subresources/attacks/subresources/layer3/subresources/timeseries_groups/methods/bitrate)

GET/radar/attacks/layer3/timeseries_groups/bitrate

##### [Get layer 3 attacks by duration time series](/api/resources/radar/subresources/attacks/subresources/layer3/subresources/timeseries_groups/methods/duration)

GET/radar/attacks/layer3/timeseries_groups/duration

##### Models

<details>

<summary>

TimeseriesGroupIndustryResponse object { meta, serie_0 }

</summary>

<details>

<summary>

meta: object { aggInterval, confidenceInfo, dateRange, 3 more }

Metadata for the results.

</summary>

<details>

<summary>

aggInterval: "FIFTEEN_MINUTES" or "ONE_HOUR" or "ONE_DAY" or 2 more

Aggregation interval of the results (e.g., in 15 minutes or 1 hour intervals). Refer to [Aggregation intervals](https://developers.cloudflare.com/radar/concepts/aggregation-intervals/).

</summary>

One of the following:

"FIFTEEN_MINUTES"

[Link to this property](#)

"ONE_HOUR"

[Link to this property](#)

"ONE_DAY"

[Link to this property](#)

"ONE_WEEK"

[Link to this property](#)

"ONE_MONTH"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

confidenceInfo: object { annotations, level }

</summary>

<details>

<summary>

annotations: array of object { dataSource, description, endDate, 5 more }

</summary>

<details>

<summary>

dataSource: "ALL" or "AI_BOTS" or "AI_GATEWAY" or 22 more

Data source for annotations.

</summary>

One of the following:

"ALL"

[Link to this property](#)

"AI_BOTS"

[Link to this property](#)

"AI_GATEWAY"

[Link to this property](#)

"BGP"

[Link to this property](#)

"BOTS"

[Link to this property](#)

"CONNECTION_ANOMALY"

[Link to this property](#)

"CT"

[Link to this property](#)

"DNS"

[Link to this property](#)

"DNS_MAGNITUDE"

[Link to this property](#)

"DNS_AS112"

[Link to this property](#)

"DOS"

[Link to this property](#)

"EMAIL_ROUTING"

[Link to this property](#)

"EMAIL_SECURITY"

[Link to this property](#)

"FW"

[Link to this property](#)

"FW_PG"

[Link to this property](#)

"HTTP"

[Link to this property](#)

"HTTP_CONTROL"

[Link to this property](#)

"HTTP_CRAWLER_REFERER"

[Link to this property](#)

"HTTP_ORIGINS"

[Link to this property](#)

"IQI"

[Link to this property](#)

"LEAKED_CREDENTIALS"

[Link to this property](#)

"NET"

[Link to this property](#)

"ROBOTS_TXT"

[Link to this property](#)

"SPEED"

[Link to this property](#)

"WORKERS_AI"

[Link to this property](#)

</details>

[Link to this property](#)

description: string

[Link to this property](#)

endDate: string

formatdate-time

[Link to this property](#)

<details>

<summary>

eventType: "GENERAL" or "OUTAGE" or "PARTIAL_PROJECTION" or 2 more

Event type for annotations.

</summary>

One of the following:

"GENERAL"

[Link to this property](#)

"OUTAGE"

[Link to this property](#)

"PARTIAL_PROJECTION"

[Link to this property](#)

"PIPELINE"

[Link to this property](#)

"TRAFFIC_ANOMALY"

[Link to this property](#)

</details>

[Link to this property](#)

isInstantaneous: boolean

Whether event is a single point in time or a time range.

[Link to this property](#)

linkedUrl: string

formaturi

[Link to this property](#)

startDate: string

formatdate-time

[Link to this property](#)

tags: optional array of string

[Link to this property](#)

</details>

[Link to this property](#)

level: number

Provides an indication of how much confidence Cloudflare has in the data.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

dateRange: array of object { endTime, startTime }

</summary>

endTime: string

Adjusted end of date range.

formatdate-time

[Link to this property](#)

startTime: string

Adjusted start of date range.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

lastUpdated: string

Timestamp of the last dataset update.

formatdate-time

[Link to this property](#)

<details>

<summary>

normalization: "PERCENTAGE" or "MIN0_MAX" or "MIN_MAX" or 5 more

Normalization method applied to the results. Refer to [Normalization methods](https://developers.cloudflare.com/radar/concepts/normalization/).

</summary>

One of the following:

"PERCENTAGE"

[Link to this property](#)

"MIN0_MAX"

[Link to this property](#)

"MIN_MAX"

[Link to this property](#)

"RAW_VALUES"

[Link to this property](#)

"PERCENTAGE_CHANGE"

[Link to this property](#)

"ROLLING_AVERAGE"

[Link to this property](#)

"OVERLAPPED_PERCENTAGE"

[Link to this property](#)

"RATIO"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

units: array of object { name, value }

Measurement units for the results.

</summary>

name: string

[Link to this property](#)

value: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

serie_0: object { timestamps }

</summary>

timestamps: array of string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

TimeseriesGroupIPVersionResponse object { meta, serie_0 }

</summary>

<details>

<summary>

meta: object { aggInterval, confidenceInfo, dateRange, 3 more }

Metadata for the results.

</summary>

<details>

<summary>

aggInterval: "FIFTEEN_MINUTES" or "ONE_HOUR" or "ONE_DAY" or 2 more

Aggregation interval of the results (e.g., in 15 minutes or 1 hour intervals). Refer to [Aggregation intervals](https://developers.cloudflare.com/radar/concepts/aggregation-intervals/).

</summary>

One of the following:

"FIFTEEN_MINUTES"

[Link to this property](#)

"ONE_HOUR"

[Link to this property](#)

"ONE_DAY"

[Link to this property](#)

"ONE_WEEK"

[Link to this property](#)

"ONE_MONTH"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

confidenceInfo: object { annotations, level }

</summary>

<details>

<summary>

annotations: array of object { dataSource, description, endDate, 5 more }

</summary>

<details>

<summary>

dataSource: "ALL" or "AI_BOTS" or "AI_GATEWAY" or 22 more

Data source for annotations.

</summary>

One of the following:

"ALL"

[Link to this property](#)

"AI_BOTS"

[Link to this property](#)

"AI_GATEWAY"

[Link to this property](#)

"BGP"

[Link to this property](#)

"BOTS"

[Link to this property](#)

"CONNECTION_ANOMALY"

[Link to this property](#)

"CT"

[Link to this property](#)

"DNS"

[Link to this property](#)

"DNS_MAGNITUDE"

[Link to this property](#)

"DNS_AS112"

[Link to this property](#)

"DOS"

[Link to this property](#)

"EMAIL_ROUTING"

[Link to this property](#)

"EMAIL_SECURITY"

[Link to this property](#)

"FW"

[Link to this property](#)

"FW_PG"

[Link to this property](#)

"HTTP"

[Link to this property](#)

"HTTP_CONTROL"

[Link to this property](#)

"HTTP_CRAWLER_REFERER"

[Link to this property](#)

"HTTP_ORIGINS"

[Link to this property](#)

"IQI"

[Link to this property](#)

"LEAKED_CREDENTIALS"

[Link to this property](#)

"NET"

[Link to this property](#)

"ROBOTS_TXT"

[Link to this property](#)

"SPEED"

[Link to this property](#)

"WORKERS_AI"

[Link to this property](#)

</details>

[Link to this property](#)

description: string

[Link to this property](#)

endDate: string

formatdate-time

[Link to this property](#)

<details>

<summary>

eventType: "GENERAL" or "OUTAGE" or "PARTIAL_PROJECTION" or 2 more

Event type for annotations.

</summary>

One of the following:

"GENERAL"

[Link to this property](#)

"OUTAGE"

[Link to this property](#)

"PARTIAL_PROJECTION"

[Link to this property](#)

"PIPELINE"

[Link to this property](#)

"TRAFFIC_ANOMALY"

[Link to this property](#)

</details>

[Link to this property](#)

isInstantaneous: boolean

Whether event is a single point in time or a time range.

[Link to this property](#)

linkedUrl: string

formaturi

[Link to this property](#)

startDate: string

formatdate-time

[Link to this property](#)

tags: optional array of string

[Link to this property](#)

</details>

[Link to this property](#)

level: number

Provides an indication of how much confidence Cloudflare has in the data.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

dateRange: array of object { endTime, startTime }

</summary>

endTime: string

Adjusted end of date range.

formatdate-time

[Link to this property](#)

startTime: string

Adjusted start of date range.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

lastUpdated: string

Timestamp of the last dataset update.

formatdate-time

[Link to this property](#)

<details>

<summary>

normalization: "PERCENTAGE" or "MIN0_MAX" or "MIN_MAX" or 5 more

Normalization method applied to the results. Refer to [Normalization methods](https://developers.cloudflare.com/radar/concepts/normalization/).

</summary>

One of the following:

"PERCENTAGE"

[Link to this property](#)

"MIN0_MAX"

[Link to this property](#)

"MIN_MAX"

[Link to this property](#)

"RAW_VALUES"

[Link to this property](#)

"PERCENTAGE_CHANGE"

[Link to this property](#)

"ROLLING_AVERAGE"

[Link to this property](#)

"OVERLAPPED_PERCENTAGE"

[Link to this property](#)

"RATIO"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

units: array of object { name, value }

Measurement units for the results.

</summary>

name: string

[Link to this property](#)

value: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

serie_0: object { IPv4, IPv6, timestamps }

</summary>

IPv4: array of string

[Link to this property](#)

IPv6: array of string

[Link to this property](#)

timestamps: array of string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

TimeseriesGroupProtocolResponse object { meta, serie_0 }

</summary>

<details>

<summary>

meta: object { aggInterval, confidenceInfo, dateRange, 3 more }

Metadata for the results.

</summary>

<details>

<summary>

aggInterval: "FIFTEEN_MINUTES" or "ONE_HOUR" or "ONE_DAY" or 2 more

Aggregation interval of the results (e.g., in 15 minutes or 1 hour intervals). Refer to [Aggregation intervals](https://developers.cloudflare.com/radar/concepts/aggregation-intervals/).

</summary>

One of the following:

"FIFTEEN_MINUTES"

[Link to this property](#)

"ONE_HOUR"

[Link to this property](#)

"ONE_DAY"

[Link to this property](#)

"ONE_WEEK"

[Link to this property](#)

"ONE_MONTH"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

confidenceInfo: object { annotations, level }

</summary>

<details>

<summary>

annotations: array of object { dataSource, description, endDate, 5 more }

</summary>

<details>

<summary>

dataSource: "ALL" or "AI_BOTS" or "AI_GATEWAY" or 22 more

Data source for annotations.

</summary>

One of the following:

"ALL"

[Link to this property](#)

"AI_BOTS"

[Link to this property](#)

"AI_GATEWAY"

[Link to this property](#)

"BGP"

[Link to this property](#)

"BOTS"

[Link to this property](#)

"CONNECTION_ANOMALY"

[Link to this property](#)

"CT"

[Link to this property](#)

"DNS"

[Link to this property](#)

"DNS_MAGNITUDE"

[Link to this property](#)

"DNS_AS112"

[Link to this property](#)

"DOS"

[Link to this property](#)

"EMAIL_ROUTING"

[Link to this property](#)

"EMAIL_SECURITY"

[Link to this property](#)

"FW"

[Link to this property](#)

"FW_PG"

[Link to this property](#)

"HTTP"

[Link to this property](#)

"HTTP_CONTROL"

[Link to this property](#)

"HTTP_CRAWLER_REFERER"

[Link to this property](#)

"HTTP_ORIGINS"

[Link to this property](#)

"IQI"

[Link to this property](#)

"LEAKED_CREDENTIALS"

[Link to this property](#)

"NET"

[Link to this property](#)

"ROBOTS_TXT"

[Link to this property](#)

"SPEED"

[Link to this property](#)

"WORKERS_AI"

[Link to this property](#)

</details>

[Link to this property](#)

description: string

[Link to this property](#)

endDate: string

formatdate-time

[Link to this property](#)

<details>

<summary>

eventType: "GENERAL" or "OUTAGE" or "PARTIAL_PROJECTION" or 2 more

Event type for annotations.

</summary>

One of the following:

"GENERAL"

[Link to this property](#)

"OUTAGE"

[Link to this property](#)

"PARTIAL_PROJECTION"

[Link to this property](#)

"PIPELINE"

[Link to this property](#)

"TRAFFIC_ANOMALY"

[Link to this property](#)

</details>

[Link to this property](#)

isInstantaneous: boolean

Whether event is a single point in time or a time range.

[Link to this property](#)

linkedUrl: string

formaturi

[Link to this property](#)

startDate: string

formatdate-time

[Link to this property](#)

tags: optional array of string

[Link to this property](#)

</details>

[Link to this property](#)

level: number

Provides an indication of how much confidence Cloudflare has in the data.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

dateRange: array of object { endTime, startTime }

</summary>

endTime: string

Adjusted end of date range.

formatdate-time

[Link to this property](#)

startTime: string

Adjusted start of date range.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

lastUpdated: string

Timestamp of the last dataset update.

formatdate-time

[Link to this property](#)

<details>

<summary>

normalization: "PERCENTAGE" or "MIN0_MAX" or "MIN_MAX" or 5 more

Normalization method applied to the results. Refer to [Normalization methods](https://developers.cloudflare.com/radar/concepts/normalization/).

</summary>

One of the following:

"PERCENTAGE"

[Link to this property](#)

"MIN0_MAX"

[Link to this property](#)

"MIN_MAX"

[Link to this property](#)

"RAW_VALUES"

[Link to this property](#)

"PERCENTAGE_CHANGE"

[Link to this property](#)

"ROLLING_AVERAGE"

[Link to this property](#)

"OVERLAPPED_PERCENTAGE"

[Link to this property](#)

"RATIO"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

units: array of object { name, value }

Measurement units for the results.

</summary>

name: string

[Link to this property](#)

value: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

serie_0: object { GRE, ICMP, TCP, 2 more }

</summary>

GRE: array of string

[Link to this property](#)

ICMP: array of string

[Link to this property](#)

TCP: array of string

[Link to this property](#)

timestamps: array of string

[Link to this property](#)

UDP: array of string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

TimeseriesGroupVectorResponse object { meta, serie_0 }

</summary>

<details>

<summary>

meta: object { aggInterval, confidenceInfo, dateRange, 3 more }

Metadata for the results.

</summary>

<details>

<summary>

aggInterval: "FIFTEEN_MINUTES" or "ONE_HOUR" or "ONE_DAY" or 2 more

Aggregation interval of the results (e.g., in 15 minutes or 1 hour intervals). Refer to [Aggregation intervals](https://developers.cloudflare.com/radar/concepts/aggregation-intervals/).

</summary>

One of the following:

"FIFTEEN_MINUTES"

[Link to this property](#)

"ONE_HOUR"

[Link to this property](#)

"ONE_DAY"

[Link to this property](#)

"ONE_WEEK"

[Link to this property](#)

"ONE_MONTH"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

confidenceInfo: object { annotations, level }

</summary>

<details>

<summary>

annotations: array of object { dataSource, description, endDate, 5 more }

</summary>

<details>

<summary>

dataSource: "ALL" or "AI_BOTS" or "AI_GATEWAY" or 22 more

Data source for annotations.

</summary>

One of the following:

"ALL"

[Link to this property](#)

"AI_BOTS"

[Link to this property](#)

"AI_GATEWAY"

[Link to this property](#)

"BGP"

[Link to this property](#)

"BOTS"

[Link to this property](#)

"CONNECTION_ANOMALY"

[Link to this property](#)

"CT"

[Link to this property](#)

"DNS"

[Link to this property](#)

"DNS_MAGNITUDE"

[Link to this property](#)

"DNS_AS112"

[Link to this property](#)

"DOS"

[Link to this property](#)

"EMAIL_ROUTING"

[Link to this property](#)

"EMAIL_SECURITY"

[Link to this property](#)

"FW"

[Link to this property](#)

"FW_PG"

[Link to this property](#)

"HTTP"

[Link to this property](#)

"HTTP_CONTROL"

[Link to this property](#)

"HTTP_CRAWLER_REFERER"

[Link to this property](#)

"HTTP_ORIGINS"

[Link to this property](#)

"IQI"

[Link to this property](#)

"LEAKED_CREDENTIALS"

[Link to this property](#)

"NET"

[Link to this property](#)

"ROBOTS_TXT"

[Link to this property](#)

"SPEED"

[Link to this property](#)

"WORKERS_AI"

[Link to this property](#)

</details>

[Link to this property](#)

description: string

[Link to this property](#)

endDate: string

formatdate-time

[Link to this property](#)

<details>

<summary>

eventType: "GENERAL" or "OUTAGE" or "PARTIAL_PROJECTION" or 2 more

Event type for annotations.

</summary>

One of the following:

"GENERAL"

[Link to this property](#)

"OUTAGE"

[Link to this property](#)

"PARTIAL_PROJECTION"

[Link to this property](#)

"PIPELINE"

[Link to this property](#)

"TRAFFIC_ANOMALY"

[Link to this property](#)

</details>

[Link to this property](#)

isInstantaneous: boolean

Whether event is a single point in time or a time range.

[Link to this property](#)

linkedUrl: string

formaturi

[Link to this property](#)

startDate: string

formatdate-time

[Link to this property](#)

tags: optional array of string

[Link to this property](#)

</details>

[Link to this property](#)

level: number

Provides an indication of how much confidence Cloudflare has in the data.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

dateRange: array of object { endTime, startTime }

</summary>

endTime: string

Adjusted end of date range.

formatdate-time

[Link to this property](#)

startTime: string

Adjusted start of date range.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

lastUpdated: string

Timestamp of the last dataset update.

formatdate-time

[Link to this property](#)

<details>

<summary>

normalization: "PERCENTAGE" or "MIN0_MAX" or "MIN_MAX" or 5 more

Normalization method applied to the results. Refer to [Normalization methods](https://developers.cloudflare.com/radar/concepts/normalization/).

</summary>

One of the following:

"PERCENTAGE"

[Link to this property](#)

"MIN0_MAX"

[Link to this property](#)

"MIN_MAX"

[Link to this property](#)

"RAW_VALUES"

[Link to this property](#)

"PERCENTAGE_CHANGE"

[Link to this property](#)

"ROLLING_AVERAGE"

[Link to this property](#)

"OVERLAPPED_PERCENTAGE"

[Link to this property](#)

"RATIO"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

units: array of object { name, value }

Measurement units for the results.

</summary>

name: string

[Link to this property](#)

value: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

serie_0: object { timestamps }

</summary>

timestamps: array of string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

TimeseriesGroupVerticalResponse object { meta, serie_0 }

</summary>

<details>

<summary>

meta: object { aggInterval, confidenceInfo, dateRange, 3 more }

Metadata for the results.

</summary>

<details>

<summary>

aggInterval: "FIFTEEN_MINUTES" or "ONE_HOUR" or "ONE_DAY" or 2 more

Aggregation interval of the results (e.g., in 15 minutes or 1 hour intervals). Refer to [Aggregation intervals](https://developers.cloudflare.com/radar/concepts/aggregation-intervals/).

</summary>

One of the following:

"FIFTEEN_MINUTES"

[Link to this property](#)

"ONE_HOUR"

[Link to this property](#)

"ONE_DAY"

[Link to this property](#)

"ONE_WEEK"

[Link to this property](#)

"ONE_MONTH"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

confidenceInfo: object { annotations, level }

</summary>

<details>

<summary>

annotations: array of object { dataSource, description, endDate, 5 more }

</summary>

<details>

<summary>

dataSource: "ALL" or "AI_BOTS" or "AI_GATEWAY" or 22 more

Data source for annotations.

</summary>

One of the following:

"ALL"

[Link to this property](#)

"AI_BOTS"

[Link to this property](#)

"AI_GATEWAY"

[Link to this property](#)

"BGP"

[Link to this property](#)

"BOTS"

[Link to this property](#)

"CONNECTION_ANOMALY"

[Link to this property](#)

"CT"

[Link to this property](#)

"DNS"

[Link to this property](#)

"DNS_MAGNITUDE"

[Link to this property](#)

"DNS_AS112"

[Link to this property](#)

"DOS"

[Link to this property](#)

"EMAIL_ROUTING"

[Link to this property](#)

"EMAIL_SECURITY"

[Link to this property](#)

"FW"

[Link to this property](#)

"FW_PG"

[Link to this property](#)

"HTTP"

[Link to this property](#)

"HTTP_CONTROL"

[Link to this property](#)

"HTTP_CRAWLER_REFERER"

[Link to this property](#)

"HTTP_ORIGINS"

[Link to this property](#)

"IQI"

[Link to this property](#)

"LEAKED_CREDENTIALS"

[Link to this property](#)

"NET"

[Link to this property](#)

"ROBOTS_TXT"

[Link to this property](#)

"SPEED"

[Link to this property](#)

"WORKERS_AI"

[Link to this property](#)

</details>

[Link to this property](#)

description: string

[Link to this property](#)

endDate: string

formatdate-time

[Link to this property](#)

<details>

<summary>

eventType: "GENERAL" or "OUTAGE" or "PARTIAL_PROJECTION" or 2 more

Event type for annotations.

</summary>

One of the following:

"GENERAL"

[Link to this property](#)

"OUTAGE"

[Link to this property](#)

"PARTIAL_PROJECTION"

[Link to this property](#)

"PIPELINE"

[Link to this property](#)

"TRAFFIC_ANOMALY"

[Link to this property](#)

</details>

[Link to this property](#)

isInstantaneous: boolean

Whether event is a single point in time or a time range.

[Link to this property](#)

linkedUrl: string

formaturi

[Link to this property](#)

startDate: string

formatdate-time

[Link to this property](#)

tags: optional array of string

[Link to this property](#)

</details>

[Link to this property](#)

level: number

Provides an indication of how much confidence Cloudflare has in the data.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

dateRange: array of object { endTime, startTime }

</summary>

endTime: string

Adjusted end of date range.

formatdate-time

[Link to this property](#)

startTime: string

Adjusted start of date range.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

lastUpdated: string

Timestamp of the last dataset update.

formatdate-time

[Link to this property](#)

<details>

<summary>

normalization: "PERCENTAGE" or "MIN0_MAX" or "MIN_MAX" or 5 more

Normalization method applied to the results. Refer to [Normalization methods](https://developers.cloudflare.com/radar/concepts/normalization/).

</summary>

One of the following:

"PERCENTAGE"

[Link to this property](#)

"MIN0_MAX"

[Link to this property](#)

"MIN_MAX"

[Link to this property](#)

"RAW_VALUES"

[Link to this property](#)

"PERCENTAGE_CHANGE"

[Link to this property](#)

"ROLLING_AVERAGE"

[Link to this property](#)

"OVERLAPPED_PERCENTAGE"

[Link to this property](#)

"RATIO"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

units: array of object { name, value }

Measurement units for the results.

</summary>

name: string

[Link to this property](#)

value: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

serie_0: object { timestamps }

</summary>

timestamps: array of string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

TimeseriesGroupBitrateResponse object { meta, serie_0 }

</summary>

<details>

<summary>

meta: object { aggInterval, confidenceInfo, dateRange, 3 more }

Metadata for the results.

</summary>

<details>

<summary>

aggInterval: "FIFTEEN_MINUTES" or "ONE_HOUR" or "ONE_DAY" or 2 more

Aggregation interval of the results (e.g., in 15 minutes or 1 hour intervals). Refer to [Aggregation intervals](https://developers.cloudflare.com/radar/concepts/aggregation-intervals/).

</summary>

One of the following:

"FIFTEEN_MINUTES"

[Link to this property](#)

"ONE_HOUR"

[Link to this property](#)

"ONE_DAY"

[Link to this property](#)

"ONE_WEEK"

[Link to this property](#)

"ONE_MONTH"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

confidenceInfo: object { annotations, level }

</summary>

<details>

<summary>

annotations: array of object { dataSource, description, endDate, 5 more }

</summary>

<details>

<summary>

dataSource: "ALL" or "AI_BOTS" or "AI_GATEWAY" or 22 more

Data source for annotations.

</summary>

One of the following:

"ALL"

[Link to this property](#)

"AI_BOTS"

[Link to this property](#)

"AI_GATEWAY"

[Link to this property](#)

"BGP"

[Link to this property](#)

"BOTS"

[Link to this property](#)

"CONNECTION_ANOMALY"

[Link to this property](#)

"CT"

[Link to this property](#)

"DNS"

[Link to this property](#)

"DNS_MAGNITUDE"

[Link to this property](#)

"DNS_AS112"

[Link to this property](#)

"DOS"

[Link to this property](#)

"EMAIL_ROUTING"

[Link to this property](#)

"EMAIL_SECURITY"

[Link to this property](#)

"FW"

[Link to this property](#)

"FW_PG"

[Link to this property](#)

"HTTP"

[Link to this property](#)

"HTTP_CONTROL"

[Link to this property](#)

"HTTP_CRAWLER_REFERER"

[Link to this property](#)

"HTTP_ORIGINS"

[Link to this property](#)

"IQI"

[Link to this property](#)

"LEAKED_CREDENTIALS"

[Link to this property](#)

"NET"

[Link to this property](#)

"ROBOTS_TXT"

[Link to this property](#)

"SPEED"

[Link to this property](#)

"WORKERS_AI"

[Link to this property](#)

</details>

[Link to this property](#)

description: string

[Link to this property](#)

endDate: string

formatdate-time

[Link to this property](#)

<details>

<summary>

eventType: "GENERAL" or "OUTAGE" or "PARTIAL_PROJECTION" or 2 more

Event type for annotations.

</summary>

One of the following:

"GENERAL"

[Link to this property](#)

"OUTAGE"

[Link to this property](#)

"PARTIAL_PROJECTION"

[Link to this property](#)

"PIPELINE"

[Link to this property](#)

"TRAFFIC_ANOMALY"

[Link to this property](#)

</details>

[Link to this property](#)

isInstantaneous: boolean

Whether event is a single point in time or a time range.

[Link to this property](#)

linkedUrl: string

formaturi

[Link to this property](#)

startDate: string

formatdate-time

[Link to this property](#)

tags: optional array of string

[Link to this property](#)

</details>

[Link to this property](#)

level: number

Provides an indication of how much confidence Cloudflare has in the data.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

dateRange: array of object { endTime, startTime }

</summary>

endTime: string

Adjusted end of date range.

formatdate-time

[Link to this property](#)

startTime: string

Adjusted start of date range.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

lastUpdated: string

Timestamp of the last dataset update.

formatdate-time

[Link to this property](#)

<details>

<summary>

normalization: "PERCENTAGE" or "MIN0_MAX" or "MIN_MAX" or 5 more

Normalization method applied to the results. Refer to [Normalization methods](https://developers.cloudflare.com/radar/concepts/normalization/).

</summary>

One of the following:

"PERCENTAGE"

[Link to this property](#)

"MIN0_MAX"

[Link to this property](#)

"MIN_MAX"

[Link to this property](#)

"RAW_VALUES"

[Link to this property](#)

"PERCENTAGE_CHANGE"

[Link to this property](#)

"ROLLING_AVERAGE"

[Link to this property](#)

"OVERLAPPED_PERCENTAGE"

[Link to this property](#)

"RATIO"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

units: array of object { name, value }

Measurement units for the results.

</summary>

name: string

[Link to this property](#)

value: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

serie_0: object { _1_GBPS_TO_10_GBPS, _10_GBPS_TO_100_GBPS, _500_MBPS_TO_1_GBPS, 3 more }

</summary>

_1_GBPS_TO_10_GBPS: array of string

[Link to this property](#)

_10_GBPS_TO_100_GBPS: array of string

[Link to this property](#)

_500_MBPS_TO_1_GBPS: array of string

[Link to this property](#)

OVER_100_GBPS: array of string

[Link to this property](#)

timestamps: array of string

[Link to this property](#)

UNDER_500_MBPS: array of string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

TimeseriesGroupDurationResponse object { meta, serie_0 }

</summary>

<details>

<summary>

meta: object { aggInterval, confidenceInfo, dateRange, 3 more }

Metadata for the results.

</summary>

<details>

<summary>

aggInterval: "FIFTEEN_MINUTES" or "ONE_HOUR" or "ONE_DAY" or 2 more

Aggregation interval of the results (e.g., in 15 minutes or 1 hour intervals). Refer to [Aggregation intervals](https://developers.cloudflare.com/radar/concepts/aggregation-intervals/).

</summary>

One of the following:

"FIFTEEN_MINUTES"

[Link to this property](#)

"ONE_HOUR"

[Link to this property](#)

"ONE_DAY"

[Link to this property](#)

"ONE_WEEK"

[Link to this property](#)

"ONE_MONTH"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

confidenceInfo: object { annotations, level }

</summary>

<details>

<summary>

annotations: array of object { dataSource, description, endDate, 5 more }

</summary>

<details>

<summary>

dataSource: "ALL" or "AI_BOTS" or "AI_GATEWAY" or 22 more

Data source for annotations.

</summary>

One of the following:

"ALL"

[Link to this property](#)

"AI_BOTS"

[Link to this property](#)

"AI_GATEWAY"

[Link to this property](#)

"BGP"

[Link to this property](#)

"BOTS"

[Link to this property](#)

"CONNECTION_ANOMALY"

[Link to this property](#)

"CT"

[Link to this property](#)

"DNS"

[Link to this property](#)

"DNS_MAGNITUDE"

[Link to this property](#)

"DNS_AS112"

[Link to this property](#)

"DOS"

[Link to this property](#)

"EMAIL_ROUTING"

[Link to this property](#)

"EMAIL_SECURITY"

[Link to this property](#)

"FW"

[Link to this property](#)

"FW_PG"

[Link to this property](#)

"HTTP"

[Link to this property](#)

"HTTP_CONTROL"

[Link to this property](#)

"HTTP_CRAWLER_REFERER"

[Link to this property](#)

"HTTP_ORIGINS"

[Link to this property](#)

"IQI"

[Link to this property](#)

"LEAKED_CREDENTIALS"

[Link to this property](#)

"NET"

[Link to this property](#)

"ROBOTS_TXT"

[Link to this property](#)

"SPEED"

[Link to this property](#)

"WORKERS_AI"

[Link to this property](#)

</details>

[Link to this property](#)

description: string

[Link to this property](#)

endDate: string

formatdate-time

[Link to this property](#)

<details>

<summary>

eventType: "GENERAL" or "OUTAGE" or "PARTIAL_PROJECTION" or 2 more

Event type for annotations.

</summary>

One of the following:

"GENERAL"

[Link to this property](#)

"OUTAGE"

[Link to this property](#)

"PARTIAL_PROJECTION"

[Link to this property](#)

"PIPELINE"

[Link to this property](#)

"TRAFFIC_ANOMALY"

[Link to this property](#)

</details>

[Link to this property](#)

isInstantaneous: boolean

Whether event is a single point in time or a time range.

[Link to this property](#)

linkedUrl: string

formaturi

[Link to this property](#)

startDate: string

formatdate-time

[Link to this property](#)

tags: optional array of string

[Link to this property](#)

</details>

[Link to this property](#)

level: number

Provides an indication of how much confidence Cloudflare has in the data.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

dateRange: array of object { endTime, startTime }

</summary>

endTime: string

Adjusted end of date range.

formatdate-time

[Link to this property](#)

startTime: string

Adjusted start of date range.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

lastUpdated: string

Timestamp of the last dataset update.

formatdate-time

[Link to this property](#)

<details>

<summary>

normalization: "PERCENTAGE" or "MIN0_MAX" or "MIN_MAX" or 5 more

Normalization method applied to the results. Refer to [Normalization methods](https://developers.cloudflare.com/radar/concepts/normalization/).

</summary>

One of the following:

"PERCENTAGE"

[Link to this property](#)

"MIN0_MAX"

[Link to this property](#)

"MIN_MAX"

[Link to this property](#)

"RAW_VALUES"

[Link to this property](#)

"PERCENTAGE_CHANGE"

[Link to this property](#)

"ROLLING_AVERAGE"

[Link to this property](#)

"OVERLAPPED_PERCENTAGE"

[Link to this property](#)

"RATIO"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

units: array of object { name, value }

Measurement units for the results.

</summary>

name: string

[Link to this property](#)

value: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

serie_0: object { _1_HOUR_TO_3_HOURS, _10_MINS_TO_20_MINS, _20_MINS_TO_40_MINS, 4 more }

</summary>

_1_HOUR_TO_3_HOURS: array of string

[Link to this property](#)

_10_MINS_TO_20_MINS: array of string

[Link to this property](#)

_20_MINS_TO_40_MINS: array of string

[Link to this property](#)

_40_MINS_TO_1_HOUR: array of string

[Link to this property](#)

OVER_3_HOURS: array of string

[Link to this property](#)

timestamps: array of string

[Link to this property](#)

UNDER_10_MINS: array of string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

##### [Get top layer 3 attack pairs (origin and target locations)](/api/resources/radar/subresources/attacks/subresources/layer3/subresources/top/methods/attacks)

GET/radar/attacks/layer3/top/attacks

##### [Get top industries targeted by layer 3 attacks](/api/resources/radar/subresources/attacks/subresources/layer3/subresources/top/methods/industry)

GET/radar/attacks/layer3/top/industry

##### [Get top verticals targeted by layer 3 attacks](/api/resources/radar/subresources/attacks/subresources/layer3/subresources/top/methods/vertical)

GET/radar/attacks/layer3/top/vertical

##### Models

<details>

<summary>

TopAttacksResponse object { meta, top_0 }

</summary>

<details>

<summary>

meta: object { confidenceInfo, dateRange, lastUpdated, 2 more }

Metadata for the results.

</summary>

<details>

<summary>

confidenceInfo: object { annotations, level }

</summary>

<details>

<summary>

annotations: array of object { dataSource, description, endDate, 5 more }

</summary>

<details>

<summary>

dataSource: "ALL" or "AI_BOTS" or "AI_GATEWAY" or 22 more

Data source for annotations.

</summary>

One of the following:

"ALL"

[Link to this property](#)

"AI_BOTS"

[Link to this property](#)

"AI_GATEWAY"

[Link to this property](#)

"BGP"

[Link to this property](#)

"BOTS"

[Link to this property](#)

"CONNECTION_ANOMALY"

[Link to this property](#)

"CT"

[Link to this property](#)

"DNS"

[Link to this property](#)

"DNS_MAGNITUDE"

[Link to this property](#)

"DNS_AS112"

[Link to this property](#)

"DOS"

[Link to this property](#)

"EMAIL_ROUTING"

[Link to this property](#)

"EMAIL_SECURITY"

[Link to this property](#)

"FW"

[Link to this property](#)

"FW_PG"

[Link to this property](#)

"HTTP"

[Link to this property](#)

"HTTP_CONTROL"

[Link to this property](#)

"HTTP_CRAWLER_REFERER"

[Link to this property](#)

"HTTP_ORIGINS"

[Link to this property](#)

"IQI"

[Link to this property](#)

"LEAKED_CREDENTIALS"

[Link to this property](#)

"NET"

[Link to this property](#)

"ROBOTS_TXT"

[Link to this property](#)

"SPEED"

[Link to this property](#)

"WORKERS_AI"

[Link to this property](#)

</details>

[Link to this property](#)

description: string

[Link to this property](#)

endDate: string

formatdate-time

[Link to this property](#)

<details>

<summary>

eventType: "GENERAL" or "OUTAGE" or "PARTIAL_PROJECTION" or 2 more

Event type for annotations.

</summary>

One of the following:

"GENERAL"

[Link to this property](#)

"OUTAGE"

[Link to this property](#)

"PARTIAL_PROJECTION"

[Link to this property](#)

"PIPELINE"

[Link to this property](#)

"TRAFFIC_ANOMALY"

[Link to this property](#)

</details>

[Link to this property](#)

isInstantaneous: boolean

Whether event is a single point in time or a time range.

[Link to this property](#)

linkedUrl: string

formaturi

[Link to this property](#)

startDate: string

formatdate-time

[Link to this property](#)

tags: optional array of string

[Link to this property](#)

</details>

[Link to this property](#)

level: number

Provides an indication of how much confidence Cloudflare has in the data.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

dateRange: array of object { endTime, startTime }

</summary>

endTime: string

Adjusted end of date range.

formatdate-time

[Link to this property](#)

startTime: string

Adjusted start of date range.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

lastUpdated: string

Timestamp of the last dataset update.

formatdate-time

[Link to this property](#)

<details>

<summary>

normalization: "PERCENTAGE" or "MIN0_MAX" or "MIN_MAX" or 5 more

Normalization method applied to the results. Refer to [Normalization methods](https://developers.cloudflare.com/radar/concepts/normalization/).

</summary>

One of the following:

"PERCENTAGE"

[Link to this property](#)

"MIN0_MAX"

[Link to this property](#)

"MIN_MAX"

[Link to this property](#)

"RAW_VALUES"

[Link to this property](#)

"PERCENTAGE_CHANGE"

[Link to this property](#)

"ROLLING_AVERAGE"

[Link to this property](#)

"OVERLAPPED_PERCENTAGE"

[Link to this property](#)

"RATIO"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

units: array of object { name, value }

Measurement units for the results.

</summary>

name: string

[Link to this property](#)

value: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

top_0: array of object { originCountryAlpha2, originCountryName, value }

</summary>

originCountryAlpha2: string

[Link to this property](#)

originCountryName: string

[Link to this property](#)

value: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

TopIndustryResponse object { meta, top_0 }

</summary>

<details>

<summary>

meta: object { confidenceInfo, dateRange, lastUpdated, 2 more }

Metadata for the results.

</summary>

<details>

<summary>

confidenceInfo: object { annotations, level }

</summary>

<details>

<summary>

annotations: array of object { dataSource, description, endDate, 5 more }

</summary>

<details>

<summary>

dataSource: "ALL" or "AI_BOTS" or "AI_GATEWAY" or 22 more

Data source for annotations.

</summary>

One of the following:

"ALL"

[Link to this property](#)

"AI_BOTS"

[Link to this property](#)

"AI_GATEWAY"

[Link to this property](#)

"BGP"

[Link to this property](#)

"BOTS"

[Link to this property](#)

"CONNECTION_ANOMALY"

[Link to this property](#)

"CT"

[Link to this property](#)

"DNS"

[Link to this property](#)

"DNS_MAGNITUDE"

[Link to this property](#)

"DNS_AS112"

[Link to this property](#)

"DOS"

[Link to this property](#)

"EMAIL_ROUTING"

[Link to this property](#)

"EMAIL_SECURITY"

[Link to this property](#)

"FW"

[Link to this property](#)

"FW_PG"

[Link to this property](#)

"HTTP"

[Link to this property](#)

"HTTP_CONTROL"

[Link to this property](#)

"HTTP_CRAWLER_REFERER"

[Link to this property](#)

"HTTP_ORIGINS"

[Link to this property](#)

"IQI"

[Link to this property](#)

"LEAKED_CREDENTIALS"

[Link to this property](#)

"NET"

[Link to this property](#)

"ROBOTS_TXT"

[Link to this property](#)

"SPEED"

[Link to this property](#)

"WORKERS_AI"

[Link to this property](#)

</details>

[Link to this property](#)

description: string

[Link to this property](#)

endDate: string

formatdate-time

[Link to this property](#)

<details>

<summary>

eventType: "GENERAL" or "OUTAGE" or "PARTIAL_PROJECTION" or 2 more

Event type for annotations.

</summary>

One of the following:

"GENERAL"

[Link to this property](#)

"OUTAGE"

[Link to this property](#)

"PARTIAL_PROJECTION"

[Link to this property](#)

"PIPELINE"

[Link to this property](#)

"TRAFFIC_ANOMALY"

[Link to this property](#)

</details>

[Link to this property](#)

isInstantaneous: boolean

Whether event is a single point in time or a time range.

[Link to this property](#)

linkedUrl: string

formaturi

[Link to this property](#)

startDate: string

formatdate-time

[Link to this property](#)

tags: optional array of string

[Link to this property](#)

</details>

[Link to this property](#)

level: number

Provides an indication of how much confidence Cloudflare has in the data.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

dateRange: array of object { endTime, startTime }

</summary>

endTime: string

Adjusted end of date range.

formatdate-time

[Link to this property](#)

startTime: string

Adjusted start of date range.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

lastUpdated: string

Timestamp of the last dataset update.

formatdate-time

[Link to this property](#)

<details>

<summary>

normalization: "PERCENTAGE" or "MIN0_MAX" or "MIN_MAX" or 5 more

Normalization method applied to the results. Refer to [Normalization methods](https://developers.cloudflare.com/radar/concepts/normalization/).

</summary>

One of the following:

"PERCENTAGE"

[Link to this property](#)

"MIN0_MAX"

[Link to this property](#)

"MIN_MAX"

[Link to this property](#)

"RAW_VALUES"

[Link to this property](#)

"PERCENTAGE_CHANGE"

[Link to this property](#)

"ROLLING_AVERAGE"

[Link to this property](#)

"OVERLAPPED_PERCENTAGE"

[Link to this property](#)

"RATIO"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

units: array of object { name, value }

Measurement units for the results.

</summary>

name: string

[Link to this property](#)

value: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

top_0: array of object { name, value }

</summary>

name: string

[Link to this property](#)

value: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

TopVerticalResponse object { meta, top_0 }

</summary>

<details>

<summary>

meta: object { confidenceInfo, dateRange, lastUpdated, 2 more }

Metadata for the results.

</summary>

<details>

<summary>

confidenceInfo: object { annotations, level }

</summary>

<details>

<summary>

annotations: array of object { dataSource, description, endDate, 5 more }

</summary>

<details>

<summary>

dataSource: "ALL" or "AI_BOTS" or "AI_GATEWAY" or 22 more

Data source for annotations.

</summary>

One of the following:

"ALL"

[Link to this property](#)

"AI_BOTS"

[Link to this property](#)

"AI_GATEWAY"

[Link to this property](#)

"BGP"

[Link to this property](#)

"BOTS"

[Link to this property](#)

"CONNECTION_ANOMALY"

[Link to this property](#)

"CT"

[Link to this property](#)

"DNS"

[Link to this property](#)

"DNS_MAGNITUDE"

[Link to this property](#)

"DNS_AS112"

[Link to this property](#)

"DOS"

[Link to this property](#)

"EMAIL_ROUTING"

[Link to this property](#)

"EMAIL_SECURITY"

[Link to this property](#)

"FW"

[Link to this property](#)

"FW_PG"

[Link to this property](#)

"HTTP"

[Link to this property](#)

"HTTP_CONTROL"

[Link to this property](#)

"HTTP_CRAWLER_REFERER"

[Link to this property](#)

"HTTP_ORIGINS"

[Link to this property](#)

"IQI"

[Link to this property](#)

"LEAKED_CREDENTIALS"

[Link to this property](#)

"NET"

[Link to this property](#)

"ROBOTS_TXT"

[Link to this property](#)

"SPEED"

[Link to this property](#)

"WORKERS_AI"

[Link to this property](#)

</details>

[Link to this property](#)

description: string

[Link to this property](#)

endDate: string

formatdate-time

[Link to this property](#)

<details>

<summary>

eventType: "GENERAL" or "OUTAGE" or "PARTIAL_PROJECTION" or 2 more

Event type for annotations.

</summary>

One of the following:

"GENERAL"

[Link to this property](#)

"OUTAGE"

[Link to this property](#)

"PARTIAL_PROJECTION"

[Link to this property](#)

"PIPELINE"

[Link to this property](#)

"TRAFFIC_ANOMALY"

[Link to this property](#)

</details>

[Link to this property](#)

isInstantaneous: boolean

Whether event is a single point in time or a time range.

[Link to this property](#)

linkedUrl: string

formaturi

[Link to this property](#)

startDate: string

formatdate-time

[Link to this property](#)

tags: optional array of string

[Link to this property](#)

</details>

[Link to this property](#)

level: number

Provides an indication of how much confidence Cloudflare has in the data.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

dateRange: array of object { endTime, startTime }

</summary>

endTime: string

Adjusted end of date range.

formatdate-time

[Link to this property](#)

startTime: string

Adjusted start of date range.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

lastUpdated: string

Timestamp of the last dataset update.

formatdate-time

[Link to this property](#)

<details>

<summary>

normalization: "PERCENTAGE" or "MIN0_MAX" or "MIN_MAX" or 5 more

Normalization method applied to the results. Refer to [Normalization methods](https://developers.cloudflare.com/radar/concepts/normalization/).

</summary>

One of the following:

"PERCENTAGE"

[Link to this property](#)

"MIN0_MAX"

[Link to this property](#)

"MIN_MAX"

[Link to this property](#)

"RAW_VALUES"

[Link to this property](#)

"PERCENTAGE_CHANGE"

[Link to this property](#)

"ROLLING_AVERAGE"

[Link to this property](#)

"OVERLAPPED_PERCENTAGE"

[Link to this property](#)

"RATIO"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

units: array of object { name, value }

Measurement units for the results.

</summary>

name: string

[Link to this property](#)

value: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

top_0: array of object { name, value }

</summary>

name: string

[Link to this property](#)

value: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

##### [Get top origin locations of layer 3 attacks](/api/resources/radar/subresources/attacks/subresources/layer3/subresources/top/subresources/locations/methods/origin)

GET/radar/attacks/layer3/top/locations/origin

##### [Get top target locations of layer 3 attacks](/api/resources/radar/subresources/attacks/subresources/layer3/subresources/top/subresources/locations/methods/target)

GET/radar/attacks/layer3/top/locations/target

##### Models

<details>

<summary>

LocationOriginResponse object { meta, top_0 }

</summary>

<details>

<summary>

meta: object { confidenceInfo, dateRange, lastUpdated, 2 more }

Metadata for the results.

</summary>

<details>

<summary>

confidenceInfo: object { annotations, level }

</summary>

<details>

<summary>

annotations: array of object { dataSource, description, endDate, 5 more }

</summary>

<details>

<summary>

dataSource: "ALL" or "AI_BOTS" or "AI_GATEWAY" or 22 more

Data source for annotations.

</summary>

One of the following:

"ALL"

[Link to this property](#)

"AI_BOTS"

[Link to this property](#)

"AI_GATEWAY"

[Link to this property](#)

"BGP"

[Link to this property](#)

"BOTS"

[Link to this property](#)

"CONNECTION_ANOMALY"

[Link to this property](#)

"CT"

[Link to this property](#)

"DNS"

[Link to this property](#)

"DNS_MAGNITUDE"

[Link to this property](#)

"DNS_AS112"

[Link to this property](#)

"DOS"

[Link to this property](#)

"EMAIL_ROUTING"

[Link to this property](#)

"EMAIL_SECURITY"

[Link to this property](#)

"FW"

[Link to this property](#)

"FW_PG"

[Link to this property](#)

"HTTP"

[Link to this property](#)

"HTTP_CONTROL"

[Link to this property](#)

"HTTP_CRAWLER_REFERER"

[Link to this property](#)

"HTTP_ORIGINS"

[Link to this property](#)

"IQI"

[Link to this property](#)

"LEAKED_CREDENTIALS"

[Link to this property](#)

"NET"

[Link to this property](#)

"ROBOTS_TXT"

[Link to this property](#)

"SPEED"

[Link to this property](#)

"WORKERS_AI"

[Link to this property](#)

</details>

[Link to this property](#)

description: string

[Link to this property](#)

endDate: string

formatdate-time

[Link to this property](#)

<details>

<summary>

eventType: "GENERAL" or "OUTAGE" or "PARTIAL_PROJECTION" or 2 more

Event type for annotations.

</summary>

One of the following:

"GENERAL"

[Link to this property](#)

"OUTAGE"

[Link to this property](#)

"PARTIAL_PROJECTION"

[Link to this property](#)

"PIPELINE"

[Link to this property](#)

"TRAFFIC_ANOMALY"

[Link to this property](#)

</details>

[Link to this property](#)

isInstantaneous: boolean

Whether event is a single point in time or a time range.

[Link to this property](#)

linkedUrl: string

formaturi

[Link to this property](#)

startDate: string

formatdate-time

[Link to this property](#)

tags: optional array of string

[Link to this property](#)

</details>

[Link to this property](#)

level: number

Provides an indication of how much confidence Cloudflare has in the data.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

dateRange: array of object { endTime, startTime }

</summary>

endTime: string

Adjusted end of date range.

formatdate-time

[Link to this property](#)

startTime: string

Adjusted start of date range.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

lastUpdated: string

Timestamp of the last dataset update.

formatdate-time

[Link to this property](#)

<details>

<summary>

normalization: "PERCENTAGE" or "MIN0_MAX" or "MIN_MAX" or 5 more

Normalization method applied to the results. Refer to [Normalization methods](https://developers.cloudflare.com/radar/concepts/normalization/).

</summary>

One of the following:

"PERCENTAGE"

[Link to this property](#)

"MIN0_MAX"

[Link to this property](#)

"MIN_MAX"

[Link to this property](#)

"RAW_VALUES"

[Link to this property](#)

"PERCENTAGE_CHANGE"

[Link to this property](#)

"ROLLING_AVERAGE"

[Link to this property](#)

"OVERLAPPED_PERCENTAGE"

[Link to this property](#)

"RATIO"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

units: array of object { name, value }

Measurement units for the results.

</summary>

name: string

[Link to this property](#)

value: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

top_0: array of object { originCountryAlpha2, originCountryName, rank, value }

</summary>

originCountryAlpha2: string

[Link to this property](#)

originCountryName: string

[Link to this property](#)

rank: number

[Link to this property](#)

value: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

LocationTargetResponse object { meta, top_0 }

</summary>

<details>

<summary>

meta: object { confidenceInfo, dateRange, lastUpdated, 2 more }

Metadata for the results.

</summary>

<details>

<summary>

confidenceInfo: object { annotations, level }

</summary>

<details>

<summary>

annotations: array of object { dataSource, description, endDate, 5 more }

</summary>

<details>

<summary>

dataSource: "ALL" or "AI_BOTS" or "AI_GATEWAY" or 22 more

Data source for annotations.

</summary>

One of the following:

"ALL"

[Link to this property](#)

"AI_BOTS"

[Link to this property](#)

"AI_GATEWAY"

[Link to this property](#)

"BGP"

[Link to this property](#)

"BOTS"

[Link to this property](#)

"CONNECTION_ANOMALY"

[Link to this property](#)

"CT"

[Link to this property](#)

"DNS"

[Link to this property](#)

"DNS_MAGNITUDE"

[Link to this property](#)

"DNS_AS112"

[Link to this property](#)

"DOS"

[Link to this property](#)

"EMAIL_ROUTING"

[Link to this property](#)

"EMAIL_SECURITY"

[Link to this property](#)

"FW"

[Link to this property](#)

"FW_PG"

[Link to this property](#)

"HTTP"

[Link to this property](#)

"HTTP_CONTROL"

[Link to this property](#)

"HTTP_CRAWLER_REFERER"

[Link to this property](#)

"HTTP_ORIGINS"

[Link to this property](#)

"IQI"

[Link to this property](#)

"LEAKED_CREDENTIALS"

[Link to this property](#)

"NET"

[Link to this property](#)

"ROBOTS_TXT"

[Link to this property](#)

"SPEED"

[Link to this property](#)

"WORKERS_AI"

[Link to this property](#)

</details>

[Link to this property](#)

description: string

[Link to this property](#)

endDate: string

formatdate-time

[Link to this property](#)

<details>

<summary>

eventType: "GENERAL" or "OUTAGE" or "PARTIAL_PROJECTION" or 2 more

Event type for annotations.

</summary>

One of the following:

"GENERAL"

[Link to this property](#)

"OUTAGE"

[Link to this property](#)

"PARTIAL_PROJECTION"

[Link to this property](#)

"PIPELINE"

[Link to this property](#)

"TRAFFIC_ANOMALY"

[Link to this property](#)

</details>

[Link to this property](#)

isInstantaneous: boolean

Whether event is a single point in time or a time range.

[Link to this property](#)

linkedUrl: string

formaturi

[Link to this property](#)

startDate: string

formatdate-time

[Link to this property](#)

tags: optional array of string

[Link to this property](#)

</details>

[Link to this property](#)

level: number

Provides an indication of how much confidence Cloudflare has in the data.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

dateRange: array of object { endTime, startTime }

</summary>

endTime: string

Adjusted end of date range.

formatdate-time

[Link to this property](#)

startTime: string

Adjusted start of date range.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

lastUpdated: string

Timestamp of the last dataset update.

formatdate-time

[Link to this property](#)

<details>

<summary>

normalization: "PERCENTAGE" or "MIN0_MAX" or "MIN_MAX" or 5 more

Normalization method applied to the results. Refer to [Normalization methods](https://developers.cloudflare.com/radar/concepts/normalization/).

</summary>

One of the following:

"PERCENTAGE"

[Link to this property](#)

"MIN0_MAX"

[Link to this property](#)

"MIN_MAX"

[Link to this property](#)

"RAW_VALUES"

[Link to this property](#)

"PERCENTAGE_CHANGE"

[Link to this property](#)

"ROLLING_AVERAGE"

[Link to this property](#)

"OVERLAPPED_PERCENTAGE"

[Link to this property](#)

"RATIO"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

units: array of object { name, value }

Measurement units for the results.

</summary>

name: string

[Link to this property](#)

value: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

top_0: array of object { rank, targetCountryAlpha2, targetCountryName, value }

</summary>

rank: number

[Link to this property](#)

targetCountryAlpha2: string

[Link to this property](#)

targetCountryName: string

[Link to this property](#)

value: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

##### [Get layer 7 attacks summary by dimension](/api/resources/radar/subresources/attacks/subresources/layer7/methods/summary_v2)

GET/radar/attacks/layer7/summary/{dimension}

##### [Get layer 7 attacks time series](/api/resources/radar/subresources/attacks/subresources/layer7/methods/timeseries)

GET/radar/attacks/layer7/timeseries

##### [Get layer 7 attacks time series grouped by dimension](/api/resources/radar/subresources/attacks/subresources/layer7/methods/timeseries_groups_v2)

GET/radar/attacks/layer7/timeseries_groups/{dimension}

##### Models

<details>

<summary>

Layer7SummaryV2Response object { meta, summary_0 }

</summary>

<details>

<summary>

meta: object { confidenceInfo, dateRange, lastUpdated, 2 more }

Metadata for the results.

</summary>

<details>

<summary>

confidenceInfo: object { annotations, level }

</summary>

<details>

<summary>

annotations: array of object { dataSource, description, endDate, 5 more }

</summary>

<details>

<summary>

dataSource: "ALL" or "AI_BOTS" or "AI_GATEWAY" or 22 more

Data source for annotations.

</summary>

One of the following:

"ALL"

[Link to this property](#)

"AI_BOTS"

[Link to this property](#)

"AI_GATEWAY"

[Link to this property](#)

"BGP"

[Link to this property](#)

"BOTS"

[Link to this property](#)

"CONNECTION_ANOMALY"

[Link to this property](#)

"CT"

[Link to this property](#)

"DNS"

[Link to this property](#)

"DNS_MAGNITUDE"

[Link to this property](#)

"DNS_AS112"

[Link to this property](#)

"DOS"

[Link to this property](#)

"EMAIL_ROUTING"

[Link to this property](#)

"EMAIL_SECURITY"

[Link to this property](#)

"FW"

[Link to this property](#)

"FW_PG"

[Link to this property](#)

"HTTP"

[Link to this property](#)

"HTTP_CONTROL"

[Link to this property](#)

"HTTP_CRAWLER_REFERER"

[Link to this property](#)

"HTTP_ORIGINS"

[Link to this property](#)

"IQI"

[Link to this property](#)

"LEAKED_CREDENTIALS"

[Link to this property](#)

"NET"

[Link to this property](#)

"ROBOTS_TXT"

[Link to this property](#)

"SPEED"

[Link to this property](#)

"WORKERS_AI"

[Link to this property](#)

</details>

[Link to this property](#)

description: string

[Link to this property](#)

endDate: string

formatdate-time

[Link to this property](#)

<details>

<summary>

eventType: "GENERAL" or "OUTAGE" or "PARTIAL_PROJECTION" or 2 more

Event type for annotations.

</summary>

One of the following:

"GENERAL"

[Link to this property](#)

"OUTAGE"

[Link to this property](#)

"PARTIAL_PROJECTION"

[Link to this property](#)

"PIPELINE"

[Link to this property](#)

"TRAFFIC_ANOMALY"

[Link to this property](#)

</details>

[Link to this property](#)

isInstantaneous: boolean

Whether event is a single point in time or a time range.

[Link to this property](#)

linkedUrl: string

formaturi

[Link to this property](#)

startDate: string

formatdate-time

[Link to this property](#)

tags: optional array of string

[Link to this property](#)

</details>

[Link to this property](#)

level: number

Provides an indication of how much confidence Cloudflare has in the data.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

dateRange: array of object { endTime, startTime }

</summary>

endTime: string

Adjusted end of date range.

formatdate-time

[Link to this property](#)

startTime: string

Adjusted start of date range.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

lastUpdated: string

Timestamp of the last dataset update.

formatdate-time

[Link to this property](#)

<details>

<summary>

normalization: "PERCENTAGE" or "MIN0_MAX" or "MIN_MAX" or 5 more

Normalization method applied to the results. Refer to [Normalization methods](https://developers.cloudflare.com/radar/concepts/normalization/).

</summary>

One of the following:

"PERCENTAGE"

[Link to this property](#)

"MIN0_MAX"

[Link to this property](#)

"MIN_MAX"

[Link to this property](#)

"RAW_VALUES"

[Link to this property](#)

"PERCENTAGE_CHANGE"

[Link to this property](#)

"ROLLING_AVERAGE"

[Link to this property](#)

"OVERLAPPED_PERCENTAGE"

[Link to this property](#)

"RATIO"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

units: array of object { name, value }

Measurement units for the results.

</summary>

name: string

[Link to this property](#)

value: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

summary_0: map[string]

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Layer7TimeseriesResponse object { meta, serie_0 }

</summary>

<details>

<summary>

meta: object { aggInterval, confidenceInfo, dateRange, 3 more }

Metadata for the results.

</summary>

<details>

<summary>

aggInterval: "FIFTEEN_MINUTES" or "ONE_HOUR" or "ONE_DAY" or 2 more

Aggregation interval of the results (e.g., in 15 minutes or 1 hour intervals). Refer to [Aggregation intervals](https://developers.cloudflare.com/radar/concepts/aggregation-intervals/).

</summary>

One of the following:

"FIFTEEN_MINUTES"

[Link to this property](#)

"ONE_HOUR"

[Link to this property](#)

"ONE_DAY"

[Link to this property](#)

"ONE_WEEK"

[Link to this property](#)

"ONE_MONTH"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

confidenceInfo: object { annotations, level }

</summary>

<details>

<summary>

annotations: array of object { dataSource, description, endDate, 5 more }

</summary>

<details>

<summary>

dataSource: "ALL" or "AI_BOTS" or "AI_GATEWAY" or 22 more

Data source for annotations.

</summary>

One of the following:

"ALL"

[Link to this property](#)

"AI_BOTS"

[Link to this property](#)

"AI_GATEWAY"

[Link to this property](#)

"BGP"

[Link to this property](#)

"BOTS"

[Link to this property](#)

"CONNECTION_ANOMALY"

[Link to this property](#)

"CT"

[Link to this property](#)

"DNS"

[Link to this property](#)

"DNS_MAGNITUDE"

[Link to this property](#)

"DNS_AS112"

[Link to this property](#)

"DOS"

[Link to this property](#)

"EMAIL_ROUTING"

[Link to this property](#)

"EMAIL_SECURITY"

[Link to this property](#)

"FW"

[Link to this property](#)

"FW_PG"

[Link to this property](#)

"HTTP"

[Link to this property](#)

"HTTP_CONTROL"

[Link to this property](#)

"HTTP_CRAWLER_REFERER"

[Link to this property](#)

"HTTP_ORIGINS"

[Link to this property](#)

"IQI"

[Link to this property](#)

"LEAKED_CREDENTIALS"

[Link to this property](#)

"NET"

[Link to this property](#)

"ROBOTS_TXT"

[Link to this property](#)

"SPEED"

[Link to this property](#)

"WORKERS_AI"

[Link to this property](#)

</details>

[Link to this property](#)

description: string

[Link to this property](#)

endDate: string

formatdate-time

[Link to this property](#)

<details>

<summary>

eventType: "GENERAL" or "OUTAGE" or "PARTIAL_PROJECTION" or 2 more

Event type for annotations.

</summary>

One of the following:

"GENERAL"

[Link to this property](#)

"OUTAGE"

[Link to this property](#)

"PARTIAL_PROJECTION"

[Link to this property](#)

"PIPELINE"

[Link to this property](#)

"TRAFFIC_ANOMALY"

[Link to this property](#)

</details>

[Link to this property](#)

isInstantaneous: boolean

Whether event is a single point in time or a time range.

[Link to this property](#)

linkedUrl: string

formaturi

[Link to this property](#)

startDate: string

formatdate-time

[Link to this property](#)

tags: optional array of string

[Link to this property](#)

</details>

[Link to this property](#)

level: number

Provides an indication of how much confidence Cloudflare has in the data.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

dateRange: array of object { endTime, startTime }

</summary>

endTime: string

Adjusted end of date range.

formatdate-time

[Link to this property](#)

startTime: string

Adjusted start of date range.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

lastUpdated: string

Timestamp of the last dataset update.

formatdate-time

[Link to this property](#)

<details>

<summary>

normalization: "PERCENTAGE" or "MIN0_MAX" or "MIN_MAX" or 5 more

Normalization method applied to the results. Refer to [Normalization methods](https://developers.cloudflare.com/radar/concepts/normalization/).

</summary>

One of the following:

"PERCENTAGE"

[Link to this property](#)

"MIN0_MAX"

[Link to this property](#)

"MIN_MAX"

[Link to this property](#)

"RAW_VALUES"

[Link to this property](#)

"PERCENTAGE_CHANGE"

[Link to this property](#)

"ROLLING_AVERAGE"

[Link to this property](#)

"OVERLAPPED_PERCENTAGE"

[Link to this property](#)

"RATIO"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

units: array of object { name, value }

Measurement units for the results.

</summary>

name: string

[Link to this property](#)

value: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

serie_0: object { timestamps, values }

</summary>

timestamps: array of string

[Link to this property](#)

values: array of string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Layer7TimeseriesGroupsV2Response object { meta, serie_0 }

</summary>

<details>

<summary>

meta: object { aggInterval, confidenceInfo, dateRange, 3 more }

Metadata for the results.

</summary>

<details>

<summary>

aggInterval: "FIFTEEN_MINUTES" or "ONE_HOUR" or "ONE_DAY" or 2 more

Aggregation interval of the results (e.g., in 15 minutes or 1 hour intervals). Refer to [Aggregation intervals](https://developers.cloudflare.com/radar/concepts/aggregation-intervals/).

</summary>

One of the following:

"FIFTEEN_MINUTES"

[Link to this property](#)

"ONE_HOUR"

[Link to this property](#)

"ONE_DAY"

[Link to this property](#)

"ONE_WEEK"

[Link to this property](#)

"ONE_MONTH"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

confidenceInfo: object { annotations, level }

</summary>

<details>

<summary>

annotations: array of object { dataSource, description, endDate, 5 more }

</summary>

<details>

<summary>

dataSource: "ALL" or "AI_BOTS" or "AI_GATEWAY" or 22 more

Data source for annotations.

</summary>

One of the following:

"ALL"

[Link to this property](#)

"AI_BOTS"

[Link to this property](#)

"AI_GATEWAY"

[Link to this property](#)

"BGP"

[Link to this property](#)

"BOTS"

[Link to this property](#)

"CONNECTION_ANOMALY"

[Link to this property](#)

"CT"

[Link to this property](#)

"DNS"

[Link to this property](#)

"DNS_MAGNITUDE"

[Link to this property](#)

"DNS_AS112"

[Link to this property](#)

"DOS"

[Link to this property](#)

"EMAIL_ROUTING"

[Link to this property](#)

"EMAIL_SECURITY"

[Link to this property](#)

"FW"

[Link to this property](#)

"FW_PG"

[Link to this property](#)

"HTTP"

[Link to this property](#)

"HTTP_CONTROL"

[Link to this property](#)

"HTTP_CRAWLER_REFERER"

[Link to this property](#)

"HTTP_ORIGINS"

[Link to this property](#)

"IQI"

[Link to this property](#)

"LEAKED_CREDENTIALS"

[Link to this property](#)

"NET"

[Link to this property](#)

"ROBOTS_TXT"

[Link to this property](#)

"SPEED"

[Link to this property](#)

"WORKERS_AI"

[Link to this property](#)

</details>

[Link to this property](#)

description: string

[Link to this property](#)

endDate: string

formatdate-time

[Link to this property](#)

<details>

<summary>

eventType: "GENERAL" or "OUTAGE" or "PARTIAL_PROJECTION" or 2 more

Event type for annotations.

</summary>

One of the following:

"GENERAL"

[Link to this property](#)

"OUTAGE"

[Link to this property](#)

"PARTIAL_PROJECTION"

[Link to this property](#)

"PIPELINE"

[Link to this property](#)

"TRAFFIC_ANOMALY"

[Link to this property](#)

</details>

[Link to this property](#)

isInstantaneous: boolean

Whether event is a single point in time or a time range.

[Link to this property](#)

linkedUrl: string

formaturi

[Link to this property](#)

startDate: string

formatdate-time

[Link to this property](#)

tags: optional array of string

[Link to this property](#)

</details>

[Link to this property](#)

level: number

Provides an indication of how much confidence Cloudflare has in the data.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

dateRange: array of object { endTime, startTime }

</summary>

endTime: string

Adjusted end of date range.

formatdate-time

[Link to this property](#)

startTime: string

Adjusted start of date range.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

lastUpdated: string

Timestamp of the last dataset update.

formatdate-time

[Link to this property](#)

<details>

<summary>

normalization: "PERCENTAGE" or "MIN0_MAX" or "MIN_MAX" or 5 more

Normalization method applied to the results. Refer to [Normalization methods](https://developers.cloudflare.com/radar/concepts/normalization/).

</summary>

One of the following:

"PERCENTAGE"

[Link to this property](#)

"MIN0_MAX"

[Link to this property](#)

"MIN_MAX"

[Link to this property](#)

"RAW_VALUES"

[Link to this property](#)

"PERCENTAGE_CHANGE"

[Link to this property](#)

"ROLLING_AVERAGE"

[Link to this property](#)

"OVERLAPPED_PERCENTAGE"

[Link to this property](#)

"RATIO"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

units: array of object { name, value }

Measurement units for the results.

</summary>

name: string

[Link to this property](#)

value: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

serie_0: object { timestamps }

</summary>

timestamps: array of string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

##### [Get layer 7 attacks by IP version summary](/api/resources/radar/subresources/attacks/subresources/layer7/subresources/summary/methods/ip_version)

GET/radar/attacks/layer7/summary/ip_version

##### [Get layer 7 attacks by HTTP method summary](/api/resources/radar/subresources/attacks/subresources/layer7/subresources/summary/methods/http_method)

GET/radar/attacks/layer7/summary/http_method

##### [Get layer 7 attacks by HTTP version summary](/api/resources/radar/subresources/attacks/subresources/layer7/subresources/summary/methods/http_version)

GET/radar/attacks/layer7/summary/http_version

##### [Get layer 7 attacks by managed rules summary](/api/resources/radar/subresources/attacks/subresources/layer7/subresources/summary/methods/managed_rules)

GET/radar/attacks/layer7/summary/managed_rules

##### [Get layer 7 attacks by mitigation product summary](/api/resources/radar/subresources/attacks/subresources/layer7/subresources/summary/methods/mitigation_product)

GET/radar/attacks/layer7/summary/mitigation_product

##### [Get layer 7 attacks by targeted industry summary](/api/resources/radar/subresources/attacks/subresources/layer7/subresources/summary/methods/industry)

GET/radar/attacks/layer7/summary/industry

##### [Get layer 7 attacks by targeted vertical summary](/api/resources/radar/subresources/attacks/subresources/layer7/subresources/summary/methods/vertical)

GET/radar/attacks/layer7/summary/vertical

##### Models

<details>

<summary>

SummaryIPVersionResponse object { meta, summary_0 }

</summary>

<details>

<summary>

meta: object { confidenceInfo, dateRange, lastUpdated, 2 more }

Metadata for the results.

</summary>

<details>

<summary>

confidenceInfo: object { annotations, level }

</summary>

<details>

<summary>

annotations: array of object { dataSource, description, endDate, 5 more }

</summary>

<details>

<summary>

dataSource: "ALL" or "AI_BOTS" or "AI_GATEWAY" or 22 more

Data source for annotations.

</summary>

One of the following:

"ALL"

[Link to this property](#)

"AI_BOTS"

[Link to this property](#)

"AI_GATEWAY"

[Link to this property](#)

"BGP"

[Link to this property](#)

"BOTS"

[Link to this property](#)

"CONNECTION_ANOMALY"

[Link to this property](#)

"CT"

[Link to this property](#)

"DNS"

[Link to this property](#)

"DNS_MAGNITUDE"

[Link to this property](#)

"DNS_AS112"

[Link to this property](#)

"DOS"

[Link to this property](#)

"EMAIL_ROUTING"

[Link to this property](#)

"EMAIL_SECURITY"

[Link to this property](#)

"FW"

[Link to this property](#)

"FW_PG"

[Link to this property](#)

"HTTP"

[Link to this property](#)

"HTTP_CONTROL"

[Link to this property](#)

"HTTP_CRAWLER_REFERER"

[Link to this property](#)

"HTTP_ORIGINS"

[Link to this property](#)

"IQI"

[Link to this property](#)

"LEAKED_CREDENTIALS"

[Link to this property](#)

"NET"

[Link to this property](#)

"ROBOTS_TXT"

[Link to this property](#)

"SPEED"

[Link to this property](#)

"WORKERS_AI"

[Link to this property](#)

</details>

[Link to this property](#)

description: string

[Link to this property](#)

endDate: string

formatdate-time

[Link to this property](#)

<details>

<summary>

eventType: "GENERAL" or "OUTAGE" or "PARTIAL_PROJECTION" or 2 more

Event type for annotations.

</summary>

One of the following:

"GENERAL"

[Link to this property](#)

"OUTAGE"

[Link to this property](#)

"PARTIAL_PROJECTION"

[Link to this property](#)

"PIPELINE"

[Link to this property](#)

"TRAFFIC_ANOMALY"

[Link to this property](#)

</details>

[Link to this property](#)

isInstantaneous: boolean

Whether event is a single point in time or a time range.

[Link to this property](#)

linkedUrl: string

formaturi

[Link to this property](#)

startDate: string

formatdate-time

[Link to this property](#)

tags: optional array of string

[Link to this property](#)

</details>

[Link to this property](#)

level: number

Provides an indication of how much confidence Cloudflare has in the data.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

dateRange: array of object { endTime, startTime }

</summary>

endTime: string

Adjusted end of date range.

formatdate-time

[Link to this property](#)

startTime: string

Adjusted start of date range.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

lastUpdated: string

Timestamp of the last dataset update.

formatdate-time

[Link to this property](#)

<details>

<summary>

normalization: "PERCENTAGE" or "MIN0_MAX" or "MIN_MAX" or 5 more

Normalization method applied to the results. Refer to [Normalization methods](https://developers.cloudflare.com/radar/concepts/normalization/).

</summary>

One of the following:

"PERCENTAGE"

[Link to this property](#)

"MIN0_MAX"

[Link to this property](#)

"MIN_MAX"

[Link to this property](#)

"RAW_VALUES"

[Link to this property](#)

"PERCENTAGE_CHANGE"

[Link to this property](#)

"ROLLING_AVERAGE"

[Link to this property](#)

"OVERLAPPED_PERCENTAGE"

[Link to this property](#)

"RATIO"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

units: array of object { name, value }

Measurement units for the results.

</summary>

name: string

[Link to this property](#)

value: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

summary_0: object { IPv4, IPv6 }

</summary>

IPv4: string

[Link to this property](#)

IPv6: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SummaryHTTPMethodResponse object { meta, summary_0 }

</summary>

<details>

<summary>

meta: object { confidenceInfo, dateRange, lastUpdated, 2 more }

Metadata for the results.

</summary>

<details>

<summary>

confidenceInfo: object { annotations, level }

</summary>

<details>

<summary>

annotations: array of object { dataSource, description, endDate, 5 more }

</summary>

<details>

<summary>

dataSource: "ALL" or "AI_BOTS" or "AI_GATEWAY" or 22 more

Data source for annotations.

</summary>

One of the following:

"ALL"

[Link to this property](#)

"AI_BOTS"

[Link to this property](#)

"AI_GATEWAY"

[Link to this property](#)

"BGP"

[Link to this property](#)

"BOTS"

[Link to this property](#)

"CONNECTION_ANOMALY"

[Link to this property](#)

"CT"

[Link to this property](#)

"DNS"

[Link to this property](#)

"DNS_MAGNITUDE"

[Link to this property](#)

"DNS_AS112"

[Link to this property](#)

"DOS"

[Link to this property](#)

"EMAIL_ROUTING"

[Link to this property](#)

"EMAIL_SECURITY"

[Link to this property](#)

"FW"

[Link to this property](#)

"FW_PG"

[Link to this property](#)

"HTTP"

[Link to this property](#)

"HTTP_CONTROL"

[Link to this property](#)

"HTTP_CRAWLER_REFERER"

[Link to this property](#)

"HTTP_ORIGINS"

[Link to this property](#)

"IQI"

[Link to this property](#)

"LEAKED_CREDENTIALS"

[Link to this property](#)

"NET"

[Link to this property](#)

"ROBOTS_TXT"

[Link to this property](#)

"SPEED"

[Link to this property](#)

"WORKERS_AI"

[Link to this property](#)

</details>

[Link to this property](#)

description: string

[Link to this property](#)

endDate: string

formatdate-time

[Link to this property](#)

<details>

<summary>

eventType: "GENERAL" or "OUTAGE" or "PARTIAL_PROJECTION" or 2 more

Event type for annotations.

</summary>

One of the following:

"GENERAL"

[Link to this property](#)

"OUTAGE"

[Link to this property](#)

"PARTIAL_PROJECTION"

[Link to this property](#)

"PIPELINE"

[Link to this property](#)

"TRAFFIC_ANOMALY"

[Link to this property](#)

</details>

[Link to this property](#)

isInstantaneous: boolean

Whether event is a single point in time or a time range.

[Link to this property](#)

linkedUrl: string

formaturi

[Link to this property](#)

startDate: string

formatdate-time

[Link to this property](#)

tags: optional array of string

[Link to this property](#)

</details>

[Link to this property](#)

level: number

Provides an indication of how much confidence Cloudflare has in the data.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

dateRange: array of object { endTime, startTime }

</summary>

endTime: string

Adjusted end of date range.

formatdate-time

[Link to this property](#)

startTime: string

Adjusted start of date range.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

lastUpdated: string

Timestamp of the last dataset update.

formatdate-time

[Link to this property](#)

<details>

<summary>

normalization: "PERCENTAGE" or "MIN0_MAX" or "MIN_MAX" or 5 more

Normalization method applied to the results. Refer to [Normalization methods](https://developers.cloudflare.com/radar/concepts/normalization/).

</summary>

One of the following:

"PERCENTAGE"

[Link to this property](#)

"MIN0_MAX"

[Link to this property](#)

"MIN_MAX"

[Link to this property](#)

"RAW_VALUES"

[Link to this property](#)

"PERCENTAGE_CHANGE"

[Link to this property](#)

"ROLLING_AVERAGE"

[Link to this property](#)

"OVERLAPPED_PERCENTAGE"

[Link to this property](#)

"RATIO"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

units: array of object { name, value }

Measurement units for the results.

</summary>

name: string

[Link to this property](#)

value: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

summary_0: map[string]

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SummaryHTTPVersionResponse object { meta, summary_0 }

</summary>

<details>

<summary>

meta: object { confidenceInfo, dateRange, lastUpdated, 2 more }

Metadata for the results.

</summary>

<details>

<summary>

confidenceInfo: object { annotations, level }

</summary>

<details>

<summary>

annotations: array of object { dataSource, description, endDate, 5 more }

</summary>

<details>

<summary>

dataSource: "ALL" or "AI_BOTS" or "AI_GATEWAY" or 22 more

Data source for annotations.

</summary>

One of the following:

"ALL"

[Link to this property](#)

"AI_BOTS"

[Link to this property](#)

"AI_GATEWAY"

[Link to this property](#)

"BGP"

[Link to this property](#)

"BOTS"

[Link to this property](#)

"CONNECTION_ANOMALY"

[Link to this property](#)

"CT"

[Link to this property](#)

"DNS"

[Link to this property](#)

"DNS_MAGNITUDE"

[Link to this property](#)

"DNS_AS112"

[Link to this property](#)

"DOS"

[Link to this property](#)

"EMAIL_ROUTING"

[Link to this property](#)

"EMAIL_SECURITY"

[Link to this property](#)

"FW"

[Link to this property](#)

"FW_PG"

[Link to this property](#)

"HTTP"

[Link to this property](#)

"HTTP_CONTROL"

[Link to this property](#)

"HTTP_CRAWLER_REFERER"

[Link to this property](#)

"HTTP_ORIGINS"

[Link to this property](#)

"IQI"

[Link to this property](#)

"LEAKED_CREDENTIALS"

[Link to this property](#)

"NET"

[Link to this property](#)

"ROBOTS_TXT"

[Link to this property](#)

"SPEED"

[Link to this property](#)

"WORKERS_AI"

[Link to this property](#)

</details>

[Link to this property](#)

description: string

[Link to this property](#)

endDate: string

formatdate-time

[Link to this property](#)

<details>

<summary>

eventType: "GENERAL" or "OUTAGE" or "PARTIAL_PROJECTION" or 2 more

Event type for annotations.

</summary>

One of the following:

"GENERAL"

[Link to this property](#)

"OUTAGE"

[Link to this property](#)

"PARTIAL_PROJECTION"

[Link to this property](#)

"PIPELINE"

[Link to this property](#)

"TRAFFIC_ANOMALY"

[Link to this property](#)

</details>

[Link to this property](#)

isInstantaneous: boolean

Whether event is a single point in time or a time range.

[Link to this property](#)

linkedUrl: string

formaturi

[Link to this property](#)

startDate: string

formatdate-time

[Link to this property](#)

tags: optional array of string

[Link to this property](#)

</details>

[Link to this property](#)

level: number

Provides an indication of how much confidence Cloudflare has in the data.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

dateRange: array of object { endTime, startTime }

</summary>

endTime: string

Adjusted end of date range.

formatdate-time

[Link to this property](#)

startTime: string

Adjusted start of date range.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

lastUpdated: string

Timestamp of the last dataset update.

formatdate-time

[Link to this property](#)

<details>

<summary>

normalization: "PERCENTAGE" or "MIN0_MAX" or "MIN_MAX" or 5 more

Normalization method applied to the results. Refer to [Normalization methods](https://developers.cloudflare.com/radar/concepts/normalization/).

</summary>

One of the following:

"PERCENTAGE"

[Link to this property](#)

"MIN0_MAX"

[Link to this property](#)

"MIN_MAX"

[Link to this property](#)

"RAW_VALUES"

[Link to this property](#)

"PERCENTAGE_CHANGE"

[Link to this property](#)

"ROLLING_AVERAGE"

[Link to this property](#)

"OVERLAPPED_PERCENTAGE"

[Link to this property](#)

"RATIO"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

units: array of object { name, value }

Measurement units for the results.

</summary>

name: string

[Link to this property](#)

value: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

summary_0: object { "HTTP/1.x", "HTTP/2", "HTTP/3" }

</summary>

"HTTP/1.x": string

[Link to this property](#)

"HTTP/2": string

[Link to this property](#)

"HTTP/3": string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SummaryManagedRulesResponse object { meta, summary_0 }

</summary>

<details>

<summary>

meta: object { confidenceInfo, dateRange, lastUpdated, 2 more }

Metadata for the results.

</summary>

<details>

<summary>

confidenceInfo: object { annotations, level }

</summary>

<details>

<summary>

annotations: array of object { dataSource, description, endDate, 5 more }

</summary>

<details>

<summary>

dataSource: "ALL" or "AI_BOTS" or "AI_GATEWAY" or 22 more

Data source for annotations.

</summary>

One of the following:

"ALL"

[Link to this property](#)

"AI_BOTS"

[Link to this property](#)

"AI_GATEWAY"

[Link to this property](#)

"BGP"

[Link to this property](#)

"BOTS"

[Link to this property](#)

"CONNECTION_ANOMALY"

[Link to this property](#)

"CT"

[Link to this property](#)

"DNS"

[Link to this property](#)

"DNS_MAGNITUDE"

[Link to this property](#)

"DNS_AS112"

[Link to this property](#)

"DOS"

[Link to this property](#)

"EMAIL_ROUTING"

[Link to this property](#)

"EMAIL_SECURITY"

[Link to this property](#)

"FW"

[Link to this property](#)

"FW_PG"

[Link to this property](#)

"HTTP"

[Link to this property](#)

"HTTP_CONTROL"

[Link to this property](#)

"HTTP_CRAWLER_REFERER"

[Link to this property](#)

"HTTP_ORIGINS"

[Link to this property](#)

"IQI"

[Link to this property](#)

"LEAKED_CREDENTIALS"

[Link to this property](#)

"NET"

[Link to this property](#)

"ROBOTS_TXT"

[Link to this property](#)

"SPEED"

[Link to this property](#)

"WORKERS_AI"

[Link to this property](#)

</details>

[Link to this property](#)

description: string

[Link to this property](#)

endDate: string

formatdate-time

[Link to this property](#)

<details>

<summary>

eventType: "GENERAL" or "OUTAGE" or "PARTIAL_PROJECTION" or 2 more

Event type for annotations.

</summary>

One of the following:

"GENERAL"

[Link to this property](#)

"OUTAGE"

[Link to this property](#)

"PARTIAL_PROJECTION"

[Link to this property](#)

"PIPELINE"

[Link to this property](#)

"TRAFFIC_ANOMALY"

[Link to this property](#)

</details>

[Link to this property](#)

isInstantaneous: boolean

Whether event is a single point in time or a time range.

[Link to this property](#)

linkedUrl: string

formaturi

[Link to this property](#)

startDate: string

formatdate-time

[Link to this property](#)

tags: optional array of string

[Link to this property](#)

</details>

[Link to this property](#)

level: number

Provides an indication of how much confidence Cloudflare has in the data.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

dateRange: array of object { endTime, startTime }

</summary>

endTime: string

Adjusted end of date range.

formatdate-time

[Link to this property](#)

startTime: string

Adjusted start of date range.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

lastUpdated: string

Timestamp of the last dataset update.

formatdate-time

[Link to this property](#)

<details>

<summary>

normalization: "PERCENTAGE" or "MIN0_MAX" or "MIN_MAX" or 5 more

Normalization method applied to the results. Refer to [Normalization methods](https://developers.cloudflare.com/radar/concepts/normalization/).

</summary>

One of the following:

"PERCENTAGE"

[Link to this property](#)

"MIN0_MAX"

[Link to this property](#)

"MIN_MAX"

[Link to this property](#)

"RAW_VALUES"

[Link to this property](#)

"PERCENTAGE_CHANGE"

[Link to this property](#)

"ROLLING_AVERAGE"

[Link to this property](#)

"OVERLAPPED_PERCENTAGE"

[Link to this property](#)

"RATIO"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

units: array of object { name, value }

Measurement units for the results.

</summary>

name: string

[Link to this property](#)

value: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

summary_0: map[string]

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SummaryMitigationProductResponse object { meta, summary_0 }

</summary>

<details>

<summary>

meta: object { confidenceInfo, dateRange, lastUpdated, 2 more }

Metadata for the results.

</summary>

<details>

<summary>

confidenceInfo: object { annotations, level }

</summary>

<details>

<summary>

annotations: array of object { dataSource, description, endDate, 5 more }

</summary>

<details>

<summary>

dataSource: "ALL" or "AI_BOTS" or "AI_GATEWAY" or 22 more

Data source for annotations.

</summary>

One of the following:

"ALL"

[Link to this property](#)

"AI_BOTS"

[Link to this property](#)

"AI_GATEWAY"

[Link to this property](#)

"BGP"

[Link to this property](#)

"BOTS"

[Link to this property](#)

"CONNECTION_ANOMALY"

[Link to this property](#)

"CT"

[Link to this property](#)

"DNS"

[Link to this property](#)

"DNS_MAGNITUDE"

[Link to this property](#)

"DNS_AS112"

[Link to this property](#)

"DOS"

[Link to this property](#)

"EMAIL_ROUTING"

[Link to this property](#)

"EMAIL_SECURITY"

[Link to this property](#)

"FW"

[Link to this property](#)

"FW_PG"

[Link to this property](#)

"HTTP"

[Link to this property](#)

"HTTP_CONTROL"

[Link to this property](#)

"HTTP_CRAWLER_REFERER"

[Link to this property](#)

"HTTP_ORIGINS"

[Link to this property](#)

"IQI"

[Link to this property](#)

"LEAKED_CREDENTIALS"

[Link to this property](#)

"NET"

[Link to this property](#)

"ROBOTS_TXT"

[Link to this property](#)

"SPEED"

[Link to this property](#)

"WORKERS_AI"

[Link to this property](#)

</details>

[Link to this property](#)

description: string

[Link to this property](#)

endDate: string

formatdate-time

[Link to this property](#)

<details>

<summary>

eventType: "GENERAL" or "OUTAGE" or "PARTIAL_PROJECTION" or 2 more

Event type for annotations.

</summary>

One of the following:

"GENERAL"

[Link to this property](#)

"OUTAGE"

[Link to this property](#)

"PARTIAL_PROJECTION"

[Link to this property](#)

"PIPELINE"

[Link to this property](#)

"TRAFFIC_ANOMALY"

[Link to this property](#)

</details>

[Link to this property](#)

isInstantaneous: boolean

Whether event is a single point in time or a time range.

[Link to this property](#)

linkedUrl: string

formaturi

[Link to this property](#)

startDate: string

formatdate-time

[Link to this property](#)

tags: optional array of string

[Link to this property](#)

</details>

[Link to this property](#)

level: number

Provides an indication of how much confidence Cloudflare has in the data.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

dateRange: array of object { endTime, startTime }

</summary>

endTime: string

Adjusted end of date range.

formatdate-time

[Link to this property](#)

startTime: string

Adjusted start of date range.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

lastUpdated: string

Timestamp of the last dataset update.

formatdate-time

[Link to this property](#)

<details>

<summary>

normalization: "PERCENTAGE" or "MIN0_MAX" or "MIN_MAX" or 5 more

Normalization method applied to the results. Refer to [Normalization methods](https://developers.cloudflare.com/radar/concepts/normalization/).

</summary>

One of the following:

"PERCENTAGE"

[Link to this property](#)

"MIN0_MAX"

[Link to this property](#)

"MIN_MAX"

[Link to this property](#)

"RAW_VALUES"

[Link to this property](#)

"PERCENTAGE_CHANGE"

[Link to this property](#)

"ROLLING_AVERAGE"

[Link to this property](#)

"OVERLAPPED_PERCENTAGE"

[Link to this property](#)

"RATIO"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

units: array of object { name, value }

Measurement units for the results.

</summary>

name: string

[Link to this property](#)

value: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

summary_0: map[string]

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SummaryIndustryResponse object { meta, summary_0 }

</summary>

<details>

<summary>

meta: object { confidenceInfo, dateRange, lastUpdated, 2 more }

Metadata for the results.

</summary>

<details>

<summary>

confidenceInfo: object { annotations, level }

</summary>

<details>

<summary>

annotations: array of object { dataSource, description, endDate, 5 more }

</summary>

<details>

<summary>

dataSource: "ALL" or "AI_BOTS" or "AI_GATEWAY" or 22 more

Data source for annotations.

</summary>

One of the following:

"ALL"

[Link to this property](#)

"AI_BOTS"

[Link to this property](#)

"AI_GATEWAY"

[Link to this property](#)

"BGP"

[Link to this property](#)

"BOTS"

[Link to this property](#)

"CONNECTION_ANOMALY"

[Link to this property](#)

"CT"

[Link to this property](#)

"DNS"

[Link to this property](#)

"DNS_MAGNITUDE"

[Link to this property](#)

"DNS_AS112"

[Link to this property](#)

"DOS"

[Link to this property](#)

"EMAIL_ROUTING"

[Link to this property](#)

"EMAIL_SECURITY"

[Link to this property](#)

"FW"

[Link to this property](#)

"FW_PG"

[Link to this property](#)

"HTTP"

[Link to this property](#)

"HTTP_CONTROL"

[Link to this property](#)

"HTTP_CRAWLER_REFERER"

[Link to this property](#)

"HTTP_ORIGINS"

[Link to this property](#)

"IQI"

[Link to this property](#)

"LEAKED_CREDENTIALS"

[Link to this property](#)

"NET"

[Link to this property](#)

"ROBOTS_TXT"

[Link to this property](#)

"SPEED"

[Link to this property](#)

"WORKERS_AI"

[Link to this property](#)

</details>

[Link to this property](#)

description: string

[Link to this property](#)

endDate: string

formatdate-time

[Link to this property](#)

<details>

<summary>

eventType: "GENERAL" or "OUTAGE" or "PARTIAL_PROJECTION" or 2 more

Event type for annotations.

</summary>

One of the following:

"GENERAL"

[Link to this property](#)

"OUTAGE"

[Link to this property](#)

"PARTIAL_PROJECTION"

[Link to this property](#)

"PIPELINE"

[Link to this property](#)

"TRAFFIC_ANOMALY"

[Link to this property](#)

</details>

[Link to this property](#)

isInstantaneous: boolean

Whether event is a single point in time or a time range.

[Link to this property](#)

linkedUrl: string

formaturi

[Link to this property](#)

startDate: string

formatdate-time

[Link to this property](#)

tags: optional array of string

[Link to this property](#)

</details>

[Link to this property](#)

level: number

Provides an indication of how much confidence Cloudflare has in the data.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

dateRange: array of object { endTime, startTime }

</summary>

endTime: string

Adjusted end of date range.

formatdate-time

[Link to this property](#)

startTime: string

Adjusted start of date range.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

lastUpdated: string

Timestamp of the last dataset update.

formatdate-time

[Link to this property](#)

<details>

<summary>

normalization: "PERCENTAGE" or "MIN0_MAX" or "MIN_MAX" or 5 more

Normalization method applied to the results. Refer to [Normalization methods](https://developers.cloudflare.com/radar/concepts/normalization/).

</summary>

One of the following:

"PERCENTAGE"

[Link to this property](#)

"MIN0_MAX"

[Link to this property](#)

"MIN_MAX"

[Link to this property](#)

"RAW_VALUES"

[Link to this property](#)

"PERCENTAGE_CHANGE"

[Link to this property](#)

"ROLLING_AVERAGE"

[Link to this property](#)

"OVERLAPPED_PERCENTAGE"

[Link to this property](#)

"RATIO"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

units: array of object { name, value }

Measurement units for the results.

</summary>

name: string

[Link to this property](#)

value: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

summary_0: map[string]

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SummaryVerticalResponse object { meta, summary_0 }

</summary>

<details>

<summary>

meta: object { confidenceInfo, dateRange, lastUpdated, 2 more }

Metadata for the results.

</summary>

<details>

<summary>

confidenceInfo: object { annotations, level }

</summary>

<details>

<summary>

annotations: array of object { dataSource, description, endDate, 5 more }

</summary>

<details>

<summary>

dataSource: "ALL" or "AI_BOTS" or "AI_GATEWAY" or 22 more

Data source for annotations.

</summary>

One of the following:

"ALL"

[Link to this property](#)

"AI_BOTS"

[Link to this property](#)

"AI_GATEWAY"

[Link to this property](#)

"BGP"

[Link to this property](#)

"BOTS"

[Link to this property](#)

"CONNECTION_ANOMALY"

[Link to this property](#)

"CT"

[Link to this property](#)

"DNS"

[Link to this property](#)

"DNS_MAGNITUDE"

[Link to this property](#)

"DNS_AS112"

[Link to this property](#)

"DOS"

[Link to this property](#)

"EMAIL_ROUTING"

[Link to this property](#)

"EMAIL_SECURITY"

[Link to this property](#)

"FW"

[Link to this property](#)

"FW_PG"

[Link to this property](#)

"HTTP"

[Link to this property](#)

"HTTP_CONTROL"

[Link to this property](#)

"HTTP_CRAWLER_REFERER"

[Link to this property](#)

"HTTP_ORIGINS"

[Link to this property](#)

"IQI"

[Link to this property](#)

"LEAKED_CREDENTIALS"

[Link to this property](#)

"NET"

[Link to this property](#)

"ROBOTS_TXT"

[Link to this property](#)

"SPEED"

[Link to this property](#)

"WORKERS_AI"

[Link to this property](#)

</details>

[Link to this property](#)

description: string

[Link to this property](#)

endDate: string

formatdate-time

[Link to this property](#)

<details>

<summary>

eventType: "GENERAL" or "OUTAGE" or "PARTIAL_PROJECTION" or 2 more

Event type for annotations.

</summary>

One of the following:

"GENERAL"

[Link to this property](#)

"OUTAGE"

[Link to this property](#)

"PARTIAL_PROJECTION"

[Link to this property](#)

"PIPELINE"

[Link to this property](#)

"TRAFFIC_ANOMALY"

[Link to this property](#)

</details>

[Link to this property](#)

isInstantaneous: boolean

Whether event is a single point in time or a time range.

[Link to this property](#)

linkedUrl: string

formaturi

[Link to this property](#)

startDate: string

formatdate-time

[Link to this property](#)

tags: optional array of string

[Link to this property](#)

</details>

[Link to this property](#)

level: number

Provides an indication of how much confidence Cloudflare has in the data.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

dateRange: array of object { endTime, startTime }

</summary>

endTime: string

Adjusted end of date range.

formatdate-time

[Link to this property](#)

startTime: string

Adjusted start of date range.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

lastUpdated: string

Timestamp of the last dataset update.

formatdate-time

[Link to this property](#)

<details>

<summary>

normalization: "PERCENTAGE" or "MIN0_MAX" or "MIN_MAX" or 5 more

Normalization method applied to the results. Refer to [Normalization methods](https://developers.cloudflare.com/radar/concepts/normalization/).

</summary>

One of the following:

"PERCENTAGE"

[Link to this property](#)

"MIN0_MAX"

[Link to this property](#)

"MIN_MAX"

[Link to this property](#)

"RAW_VALUES"

[Link to this property](#)

"PERCENTAGE_CHANGE"

[Link to this property](#)

"ROLLING_AVERAGE"

[Link to this property](#)

"OVERLAPPED_PERCENTAGE"

[Link to this property](#)

"RATIO"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

units: array of object { name, value }

Measurement units for the results.

</summary>

name: string

[Link to this property](#)

value: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

summary_0: map[string]

[Link to this property](#)

</details>

[Link to this property](#)

##### [Get layer 7 attacks by target industries time series](/api/resources/radar/subresources/attacks/subresources/layer7/subresources/timeseries_groups/methods/industry)

GET/radar/attacks/layer7/timeseries_groups/industry

##### [Get layer 7 attacks by IP version time series](/api/resources/radar/subresources/attacks/subresources/layer7/subresources/timeseries_groups/methods/ip_version)

GET/radar/attacks/layer7/timeseries_groups/ip_version

##### [Get layer 7 attacks by vertical time series](/api/resources/radar/subresources/attacks/subresources/layer7/subresources/timeseries_groups/methods/vertical)

GET/radar/attacks/layer7/timeseries_groups/vertical

##### [Get layer 7 attacks by HTTP method time series](/api/resources/radar/subresources/attacks/subresources/layer7/subresources/timeseries_groups/methods/http_method)

GET/radar/attacks/layer7/timeseries_groups/http_method

##### [Get layer 7 attacks by HTTP version time series](/api/resources/radar/subresources/attacks/subresources/layer7/subresources/timeseries_groups/methods/http_version)

GET/radar/attacks/layer7/timeseries_groups/http_version

##### [Get layer 7 attacks by managed rules time series](/api/resources/radar/subresources/attacks/subresources/layer7/subresources/timeseries_groups/methods/managed_rules)

GET/radar/attacks/layer7/timeseries_groups/managed_rules

##### [Get layer 7 attacks by mitigation product time series](/api/resources/radar/subresources/attacks/subresources/layer7/subresources/timeseries_groups/methods/mitigation_product)

GET/radar/attacks/layer7/timeseries_groups/mitigation_product

##### Models

<details>

<summary>

TimeseriesGroupIndustryResponse object { meta, serie_0 }

</summary>

<details>

<summary>

meta: object { aggInterval, confidenceInfo, dateRange, 3 more }

Metadata for the results.

</summary>

<details>

<summary>

aggInterval: "FIFTEEN_MINUTES" or "ONE_HOUR" or "ONE_DAY" or 2 more

Aggregation interval of the results (e.g., in 15 minutes or 1 hour intervals). Refer to [Aggregation intervals](https://developers.cloudflare.com/radar/concepts/aggregation-intervals/).

</summary>

One of the following:

"FIFTEEN_MINUTES"

[Link to this property](#)

"ONE_HOUR"

[Link to this property](#)

"ONE_DAY"

[Link to this property](#)

"ONE_WEEK"

[Link to this property](#)

"ONE_MONTH"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

confidenceInfo: object { annotations, level }

</summary>

<details>

<summary>

annotations: array of object { dataSource, description, endDate, 5 more }

</summary>

<details>

<summary>

dataSource: "ALL" or "AI_BOTS" or "AI_GATEWAY" or 22 more

Data source for annotations.

</summary>

One of the following:

"ALL"

[Link to this property](#)

"AI_BOTS"

[Link to this property](#)

"AI_GATEWAY"

[Link to this property](#)

"BGP"

[Link to this property](#)

"BOTS"

[Link to this property](#)

"CONNECTION_ANOMALY"

[Link to this property](#)

"CT"

[Link to this property](#)

"DNS"

[Link to this property](#)

"DNS_MAGNITUDE"

[Link to this property](#)

"DNS_AS112"

[Link to this property](#)

"DOS"

[Link to this property](#)

"EMAIL_ROUTING"

[Link to this property](#)

"EMAIL_SECURITY"

[Link to this property](#)

"FW"

[Link to this property](#)

"FW_PG"

[Link to this property](#)

"HTTP"

[Link to this property](#)

"HTTP_CONTROL"

[Link to this property](#)

"HTTP_CRAWLER_REFERER"

[Link to this property](#)

"HTTP_ORIGINS"

[Link to this property](#)

"IQI"

[Link to this property](#)

"LEAKED_CREDENTIALS"

[Link to this property](#)

"NET"

[Link to this property](#)

"ROBOTS_TXT"

[Link to this property](#)

"SPEED"

[Link to this property](#)

"WORKERS_AI"

[Link to this property](#)

</details>

[Link to this property](#)

description: string

[Link to this property](#)

endDate: string

formatdate-time

[Link to this property](#)

<details>

<summary>

eventType: "GENERAL" or "OUTAGE" or "PARTIAL_PROJECTION" or 2 more

Event type for annotations.

</summary>

One of the following:

"GENERAL"

[Link to this property](#)

"OUTAGE"

[Link to this property](#)

"PARTIAL_PROJECTION"

[Link to this property](#)

"PIPELINE"

[Link to this property](#)

"TRAFFIC_ANOMALY"

[Link to this property](#)

</details>

[Link to this property](#)

isInstantaneous: boolean

Whether event is a single point in time or a time range.

[Link to this property](#)

linkedUrl: string

formaturi

[Link to this property](#)

startDate: string

formatdate-time

[Link to this property](#)

tags: optional array of string

[Link to this property](#)

</details>

[Link to this property](#)

level: number

Provides an indication of how much confidence Cloudflare has in the data.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

dateRange: array of object { endTime, startTime }

</summary>

endTime: string

Adjusted end of date range.

formatdate-time

[Link to this property](#)

startTime: string

Adjusted start of date range.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

lastUpdated: string

Timestamp of the last dataset update.

formatdate-time

[Link to this property](#)

<details>

<summary>

normalization: "PERCENTAGE" or "MIN0_MAX" or "MIN_MAX" or 5 more

Normalization method applied to the results. Refer to [Normalization methods](https://developers.cloudflare.com/radar/concepts/normalization/).

</summary>

One of the following:

"PERCENTAGE"

[Link to this property](#)

"MIN0_MAX"

[Link to this property](#)

"MIN_MAX"

[Link to this property](#)

"RAW_VALUES"

[Link to this property](#)

"PERCENTAGE_CHANGE"

[Link to this property](#)

"ROLLING_AVERAGE"

[Link to this property](#)

"OVERLAPPED_PERCENTAGE"

[Link to this property](#)

"RATIO"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

units: array of object { name, value }

Measurement units for the results.

</summary>

name: string

[Link to this property](#)

value: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

serie_0: object { timestamps }

</summary>

timestamps: array of string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

TimeseriesGroupIPVersionResponse object { meta, serie_0 }

</summary>

<details>

<summary>

meta: object { aggInterval, confidenceInfo, dateRange, 3 more }

Metadata for the results.

</summary>

<details>

<summary>

aggInterval: "FIFTEEN_MINUTES" or "ONE_HOUR" or "ONE_DAY" or 2 more

Aggregation interval of the results (e.g., in 15 minutes or 1 hour intervals). Refer to [Aggregation intervals](https://developers.cloudflare.com/radar/concepts/aggregation-intervals/).

</summary>

One of the following:

"FIFTEEN_MINUTES"

[Link to this property](#)

"ONE_HOUR"

[Link to this property](#)

"ONE_DAY"

[Link to this property](#)

"ONE_WEEK"

[Link to this property](#)

"ONE_MONTH"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

confidenceInfo: object { annotations, level }

</summary>

<details>

<summary>

annotations: array of object { dataSource, description, endDate, 5 more }

</summary>

<details>

<summary>

dataSource: "ALL" or "AI_BOTS" or "AI_GATEWAY" or 22 more

Data source for annotations.

</summary>

One of the following:

"ALL"

[Link to this property](#)

"AI_BOTS"

[Link to this property](#)

"AI_GATEWAY"

[Link to this property](#)

"BGP"

[Link to this property](#)

"BOTS"

[Link to this property](#)

"CONNECTION_ANOMALY"

[Link to this property](#)

"CT"

[Link to this property](#)

"DNS"

[Link to this property](#)

"DNS_MAGNITUDE"

[Link to this property](#)

"DNS_AS112"

[Link to this property](#)

"DOS"

[Link to this property](#)

"EMAIL_ROUTING"

[Link to this property](#)

"EMAIL_SECURITY"

[Link to this property](#)

"FW"

[Link to this property](#)

"FW_PG"

[Link to this property](#)

"HTTP"

[Link to this property](#)

"HTTP_CONTROL"

[Link to this property](#)

"HTTP_CRAWLER_REFERER"

[Link to this property](#)

"HTTP_ORIGINS"

[Link to this property](#)

"IQI"

[Link to this property](#)

"LEAKED_CREDENTIALS"

[Link to this property](#)

"NET"

[Link to this property](#)

"ROBOTS_TXT"

[Link to this property](#)

"SPEED"

[Link to this property](#)

"WORKERS_AI"

[Link to this property](#)

</details>

[Link to this property](#)

description: string

[Link to this property](#)

endDate: string

formatdate-time

[Link to this property](#)

<details>

<summary>

eventType: "GENERAL" or "OUTAGE" or "PARTIAL_PROJECTION" or 2 more

Event type for annotations.

</summary>

One of the following:

"GENERAL"

[Link to this property](#)

"OUTAGE"

[Link to this property](#)

"PARTIAL_PROJECTION"

[Link to this property](#)

"PIPELINE"

[Link to this property](#)

"TRAFFIC_ANOMALY"

[Link to this property](#)

</details>

[Link to this property](#)

isInstantaneous: boolean

Whether event is a single point in time or a time range.

[Link to this property](#)

linkedUrl: string

formaturi

[Link to this property](#)

startDate: string

formatdate-time

[Link to this property](#)

tags: optional array of string

[Link to this property](#)

</details>

[Link to this property](#)

level: number

Provides an indication of how much confidence Cloudflare has in the data.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

dateRange: array of object { endTime, startTime }

</summary>

endTime: string

Adjusted end of date range.

formatdate-time

[Link to this property](#)

startTime: string

Adjusted start of date range.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

lastUpdated: string

Timestamp of the last dataset update.

formatdate-time

[Link to this property](#)

<details>

<summary>

normalization: "PERCENTAGE" or "MIN0_MAX" or "MIN_MAX" or 5 more

Normalization method applied to the results. Refer to [Normalization methods](https://developers.cloudflare.com/radar/concepts/normalization/).

</summary>

One of the following:

"PERCENTAGE"

[Link to this property](#)

"MIN0_MAX"

[Link to this property](#)

"MIN_MAX"

[Link to this property](#)

"RAW_VALUES"

[Link to this property](#)

"PERCENTAGE_CHANGE"

[Link to this property](#)

"ROLLING_AVERAGE"

[Link to this property](#)

"OVERLAPPED_PERCENTAGE"

[Link to this property](#)

"RATIO"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

units: array of object { name, value }

Measurement units for the results.

</summary>

name: string

[Link to this property](#)

value: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

serie_0: object { IPv4, IPv6, timestamps }

</summary>

IPv4: array of string

[Link to this property](#)

IPv6: array of string

[Link to this property](#)

timestamps: array of string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

TimeseriesGroupVerticalResponse object { meta, serie_0 }

</summary>

<details>

<summary>

meta: object { aggInterval, confidenceInfo, dateRange, 3 more }

Metadata for the results.

</summary>

<details>

<summary>

aggInterval: "FIFTEEN_MINUTES" or "ONE_HOUR" or "ONE_DAY" or 2 more

Aggregation interval of the results (e.g., in 15 minutes or 1 hour intervals). Refer to [Aggregation intervals](https://developers.cloudflare.com/radar/concepts/aggregation-intervals/).

</summary>

One of the following:

"FIFTEEN_MINUTES"

[Link to this property](#)

"ONE_HOUR"

[Link to this property](#)

"ONE_DAY"

[Link to this property](#)

"ONE_WEEK"

[Link to this property](#)

"ONE_MONTH"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

confidenceInfo: object { annotations, level }

</summary>

<details>

<summary>

annotations: array of object { dataSource, description, endDate, 5 more }

</summary>

<details>

<summary>

dataSource: "ALL" or "AI_BOTS" or "AI_GATEWAY" or 22 more

Data source for annotations.

</summary>

One of the following:

"ALL"

[Link to this property](#)

"AI_BOTS"

[Link to this property](#)

"AI_GATEWAY"

[Link to this property](#)

"BGP"

[Link to this property](#)

"BOTS"

[Link to this property](#)

"CONNECTION_ANOMALY"

[Link to this property](#)

"CT"

[Link to this property](#)

"DNS"

[Link to this property](#)

"DNS_MAGNITUDE"

[Link to this property](#)

"DNS_AS112"

[Link to this property](#)

"DOS"

[Link to this property](#)

"EMAIL_ROUTING"

[Link to this property](#)

"EMAIL_SECURITY"

[Link to this property](#)

"FW"

[Link to this property](#)

"FW_PG"

[Link to this property](#)

"HTTP"

[Link to this property](#)

"HTTP_CONTROL"

[Link to this property](#)

"HTTP_CRAWLER_REFERER"

[Link to this property](#)

"HTTP_ORIGINS"

[Link to this property](#)

"IQI"

[Link to this property](#)

"LEAKED_CREDENTIALS"

[Link to this property](#)

"NET"

[Link to this property](#)

"ROBOTS_TXT"

[Link to this property](#)

"SPEED"

[Link to this property](#)

"WORKERS_AI"

[Link to this property](#)

</details>

[Link to this property](#)

description: string

[Link to this property](#)

endDate: string

formatdate-time

[Link to this property](#)

<details>

<summary>

eventType: "GENERAL" or "OUTAGE" or "PARTIAL_PROJECTION" or 2 more

Event type for annotations.

</summary>

One of the following:

"GENERAL"

[Link to this property](#)

"OUTAGE"

[Link to this property](#)

"PARTIAL_PROJECTION"

[Link to this property](#)

"PIPELINE"

[Link to this property](#)

"TRAFFIC_ANOMALY"

[Link to this property](#)

</details>

[Link to this property](#)

isInstantaneous: boolean

Whether event is a single point in time or a time range.

[Link to this property](#)

linkedUrl: string

formaturi

[Link to this property](#)

startDate: string

formatdate-time

[Link to this property](#)

tags: optional array of string

[Link to this property](#)

</details>

[Link to this property](#)

level: number

Provides an indication of how much confidence Cloudflare has in the data.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

dateRange: array of object { endTime, startTime }

</summary>

endTime: string

Adjusted end of date range.

formatdate-time

[Link to this property](#)

startTime: string

Adjusted start of date range.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

lastUpdated: string

Timestamp of the last dataset update.

formatdate-time

[Link to this property](#)

<details>

<summary>

normalization: "PERCENTAGE" or "MIN0_MAX" or "MIN_MAX" or 5 more

Normalization method applied to the results. Refer to [Normalization methods](https://developers.cloudflare.com/radar/concepts/normalization/).

</summary>

One of the following:

"PERCENTAGE"

[Link to this property](#)

"MIN0_MAX"

[Link to this property](#)

"MIN_MAX"

[Link to this property](#)

"RAW_VALUES"

[Link to this property](#)

"PERCENTAGE_CHANGE"

[Link to this property](#)

"ROLLING_AVERAGE"

[Link to this property](#)

"OVERLAPPED_PERCENTAGE"

[Link to this property](#)

"RATIO"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

units: array of object { name, value }

Measurement units for the results.

</summary>

name: string

[Link to this property](#)

value: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

serie_0: object { timestamps }

</summary>

timestamps: array of string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

TimeseriesGroupHTTPMethodResponse object { meta, serie_0 }

</summary>

<details>

<summary>

meta: object { aggInterval, confidenceInfo, dateRange, 3 more }

Metadata for the results.

</summary>

<details>

<summary>

aggInterval: "FIFTEEN_MINUTES" or "ONE_HOUR" or "ONE_DAY" or 2 more

Aggregation interval of the results (e.g., in 15 minutes or 1 hour intervals). Refer to [Aggregation intervals](https://developers.cloudflare.com/radar/concepts/aggregation-intervals/).

</summary>

One of the following:

"FIFTEEN_MINUTES"

[Link to this property](#)

"ONE_HOUR"

[Link to this property](#)

"ONE_DAY"

[Link to this property](#)

"ONE_WEEK"

[Link to this property](#)

"ONE_MONTH"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

confidenceInfo: object { annotations, level }

</summary>

<details>

<summary>

annotations: array of object { dataSource, description, endDate, 5 more }

</summary>

<details>

<summary>

dataSource: "ALL" or "AI_BOTS" or "AI_GATEWAY" or 22 more

Data source for annotations.

</summary>

One of the following:

"ALL"

[Link to this property](#)

"AI_BOTS"

[Link to this property](#)

"AI_GATEWAY"

[Link to this property](#)

"BGP"

[Link to this property](#)

"BOTS"

[Link to this property](#)

"CONNECTION_ANOMALY"

[Link to this property](#)

"CT"

[Link to this property](#)

"DNS"

[Link to this property](#)

"DNS_MAGNITUDE"

[Link to this property](#)

"DNS_AS112"

[Link to this property](#)

"DOS"

[Link to this property](#)

"EMAIL_ROUTING"

[Link to this property](#)

"EMAIL_SECURITY"

[Link to this property](#)

"FW"

[Link to this property](#)

"FW_PG"

[Link to this property](#)

"HTTP"

[Link to this property](#)

"HTTP_CONTROL"

[Link to this property](#)

"HTTP_CRAWLER_REFERER"

[Link to this property](#)

"HTTP_ORIGINS"

[Link to this property](#)

"IQI"

[Link to this property](#)

"LEAKED_CREDENTIALS"

[Link to this property](#)

"NET"

[Link to this property](#)

"ROBOTS_TXT"

[Link to this property](#)

"SPEED"

[Link to this property](#)

"WORKERS_AI"

[Link to this property](#)

</details>

[Link to this property](#)

description: string

[Link to this property](#)

endDate: string

formatdate-time

[Link to this property](#)

<details>

<summary>

eventType: "GENERAL" or "OUTAGE" or "PARTIAL_PROJECTION" or 2 more

Event type for annotations.

</summary>

One of the following:

"GENERAL"

[Link to this property](#)

"OUTAGE"

[Link to this property](#)

"PARTIAL_PROJECTION"

[Link to this property](#)

"PIPELINE"

[Link to this property](#)

"TRAFFIC_ANOMALY"

[Link to this property](#)

</details>

[Link to this property](#)

isInstantaneous: boolean

Whether event is a single point in time or a time range.

[Link to this property](#)

linkedUrl: string

formaturi

[Link to this property](#)

startDate: string

formatdate-time

[Link to this property](#)

tags: optional array of string

[Link to this property](#)

</details>

[Link to this property](#)

level: number

Provides an indication of how much confidence Cloudflare has in the data.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

dateRange: array of object { endTime, startTime }

</summary>

endTime: string

Adjusted end of date range.

formatdate-time

[Link to this property](#)

startTime: string

Adjusted start of date range.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

lastUpdated: string

Timestamp of the last dataset update.

formatdate-time

[Link to this property](#)

<details>

<summary>

normalization: "PERCENTAGE" or "MIN0_MAX" or "MIN_MAX" or 5 more

Normalization method applied to the results. Refer to [Normalization methods](https://developers.cloudflare.com/radar/concepts/normalization/).

</summary>

One of the following:

"PERCENTAGE"

[Link to this property](#)

"MIN0_MAX"

[Link to this property](#)

"MIN_MAX"

[Link to this property](#)

"RAW_VALUES"

[Link to this property](#)

"PERCENTAGE_CHANGE"

[Link to this property](#)

"ROLLING_AVERAGE"

[Link to this property](#)

"OVERLAPPED_PERCENTAGE"

[Link to this property](#)

"RATIO"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

units: array of object { name, value }

Measurement units for the results.

</summary>

name: string

[Link to this property](#)

value: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

serie_0: object { timestamps }

</summary>

timestamps: array of string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

TimeseriesGroupHTTPVersionResponse object { meta, serie_0 }

</summary>

<details>

<summary>

meta: object { aggInterval, confidenceInfo, dateRange, 3 more }

Metadata for the results.

</summary>

<details>

<summary>

aggInterval: "FIFTEEN_MINUTES" or "ONE_HOUR" or "ONE_DAY" or 2 more

Aggregation interval of the results (e.g., in 15 minutes or 1 hour intervals). Refer to [Aggregation intervals](https://developers.cloudflare.com/radar/concepts/aggregation-intervals/).

</summary>

One of the following:

"FIFTEEN_MINUTES"

[Link to this property](#)

"ONE_HOUR"

[Link to this property](#)

"ONE_DAY"

[Link to this property](#)

"ONE_WEEK"

[Link to this property](#)

"ONE_MONTH"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

confidenceInfo: object { annotations, level }

</summary>

<details>

<summary>

annotations: array of object { dataSource, description, endDate, 5 more }

</summary>

<details>

<summary>

dataSource: "ALL" or "AI_BOTS" or "AI_GATEWAY" or 22 more

Data source for annotations.

</summary>

One of the following:

"ALL"

[Link to this property](#)

"AI_BOTS"

[Link to this property](#)

"AI_GATEWAY"

[Link to this property](#)

"BGP"

[Link to this property](#)

"BOTS"

[Link to this property](#)

"CONNECTION_ANOMALY"

[Link to this property](#)

"CT"

[Link to this property](#)

"DNS"

[Link to this property](#)

"DNS_MAGNITUDE"

[Link to this property](#)

"DNS_AS112"

[Link to this property](#)

"DOS"

[Link to this property](#)

"EMAIL_ROUTING"

[Link to this property](#)

"EMAIL_SECURITY"

[Link to this property](#)

"FW"

[Link to this property](#)

"FW_PG"

[Link to this property](#)

"HTTP"

[Link to this property](#)

"HTTP_CONTROL"

[Link to this property](#)

"HTTP_CRAWLER_REFERER"

[Link to this property](#)

"HTTP_ORIGINS"

[Link to this property](#)

"IQI"

[Link to this property](#)

"LEAKED_CREDENTIALS"

[Link to this property](#)

"NET"

[Link to this property](#)

"ROBOTS_TXT"

[Link to this property](#)

"SPEED"

[Link to this property](#)

"WORKERS_AI"

[Link to this property](#)

</details>

[Link to this property](#)

description: string

[Link to this property](#)

endDate: string

formatdate-time

[Link to this property](#)

<details>

<summary>

eventType: "GENERAL" or "OUTAGE" or "PARTIAL_PROJECTION" or 2 more

Event type for annotations.

</summary>

One of the following:

"GENERAL"

[Link to this property](#)

"OUTAGE"

[Link to this property](#)

"PARTIAL_PROJECTION"

[Link to this property](#)

"PIPELINE"

[Link to this property](#)

"TRAFFIC_ANOMALY"

[Link to this property](#)

</details>

[Link to this property](#)

isInstantaneous: boolean

Whether event is a single point in time or a time range.

[Link to this property](#)

linkedUrl: string

formaturi

[Link to this property](#)

startDate: string

formatdate-time

[Link to this property](#)

tags: optional array of string

[Link to this property](#)

</details>

[Link to this property](#)

level: number

Provides an indication of how much confidence Cloudflare has in the data.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

dateRange: array of object { endTime, startTime }

</summary>

endTime: string

Adjusted end of date range.

formatdate-time

[Link to this property](#)

startTime: string

Adjusted start of date range.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

lastUpdated: string

Timestamp of the last dataset update.

formatdate-time

[Link to this property](#)

<details>

<summary>

normalization: "PERCENTAGE" or "MIN0_MAX" or "MIN_MAX" or 5 more

Normalization method applied to the results. Refer to [Normalization methods](https://developers.cloudflare.com/radar/concepts/normalization/).

</summary>

One of the following:

"PERCENTAGE"

[Link to this property](#)

"MIN0_MAX"

[Link to this property](#)

"MIN_MAX"

[Link to this property](#)

"RAW_VALUES"

[Link to this property](#)

"PERCENTAGE_CHANGE"

[Link to this property](#)

"ROLLING_AVERAGE"

[Link to this property](#)

"OVERLAPPED_PERCENTAGE"

[Link to this property](#)

"RATIO"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

units: array of object { name, value }

Measurement units for the results.

</summary>

name: string

[Link to this property](#)

value: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

serie_0: object { "HTTP/1.x", "HTTP/2", "HTTP/3", timestamps }

</summary>

"HTTP/1.x": array of string

[Link to this property](#)

"HTTP/2": array of string

[Link to this property](#)

"HTTP/3": array of string

[Link to this property](#)

timestamps: array of string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

TimeseriesGroupManagedRulesResponse object { meta, serie_0 }

</summary>

<details>

<summary>

meta: object { aggInterval, confidenceInfo, dateRange, 3 more }

Metadata for the results.

</summary>

<details>

<summary>

aggInterval: "FIFTEEN_MINUTES" or "ONE_HOUR" or "ONE_DAY" or 2 more

Aggregation interval of the results (e.g., in 15 minutes or 1 hour intervals). Refer to [Aggregation intervals](https://developers.cloudflare.com/radar/concepts/aggregation-intervals/).

</summary>

One of the following:

"FIFTEEN_MINUTES"

[Link to this property](#)

"ONE_HOUR"

[Link to this property](#)

"ONE_DAY"

[Link to this property](#)

"ONE_WEEK"

[Link to this property](#)

"ONE_MONTH"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

confidenceInfo: object { annotations, level }

</summary>

<details>

<summary>

annotations: array of object { dataSource, description, endDate, 5 more }

</summary>

<details>

<summary>

dataSource: "ALL" or "AI_BOTS" or "AI_GATEWAY" or 22 more

Data source for annotations.

</summary>

One of the following:

"ALL"

[Link to this property](#)

"AI_BOTS"

[Link to this property](#)

"AI_GATEWAY"

[Link to this property](#)

"BGP"

[Link to this property](#)

"BOTS"

[Link to this property](#)

"CONNECTION_ANOMALY"

[Link to this property](#)

"CT"

[Link to this property](#)

"DNS"

[Link to this property](#)

"DNS_MAGNITUDE"

[Link to this property](#)

"DNS_AS112"

[Link to this property](#)

"DOS"

[Link to this property](#)

"EMAIL_ROUTING"

[Link to this property](#)

"EMAIL_SECURITY"

[Link to this property](#)

"FW"

[Link to this property](#)

"FW_PG"

[Link to this property](#)

"HTTP"

[Link to this property](#)

"HTTP_CONTROL"

[Link to this property](#)

"HTTP_CRAWLER_REFERER"

[Link to this property](#)

"HTTP_ORIGINS"

[Link to this property](#)

"IQI"

[Link to this property](#)

"LEAKED_CREDENTIALS"

[Link to this property](#)

"NET"

[Link to this property](#)

"ROBOTS_TXT"

[Link to this property](#)

"SPEED"

[Link to this property](#)

"WORKERS_AI"

[Link to this property](#)

</details>

[Link to this property](#)

description: string

[Link to this property](#)

endDate: string

formatdate-time

[Link to this property](#)

<details>

<summary>

eventType: "GENERAL" or "OUTAGE" or "PARTIAL_PROJECTION" or 2 more

Event type for annotations.

</summary>

One of the following:

"GENERAL"

[Link to this property](#)

"OUTAGE"

[Link to this property](#)

"PARTIAL_PROJECTION"

[Link to this property](#)

"PIPELINE"

[Link to this property](#)

"TRAFFIC_ANOMALY"

[Link to this property](#)

</details>

[Link to this property](#)

isInstantaneous: boolean

Whether event is a single point in time or a time range.

[Link to this property](#)

linkedUrl: string

formaturi

[Link to this property](#)

startDate: string

formatdate-time

[Link to this property](#)

tags: optional array of string

[Link to this property](#)

</details>

[Link to this property](#)

level: number

Provides an indication of how much confidence Cloudflare has in the data.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

dateRange: array of object { endTime, startTime }

</summary>

endTime: string

Adjusted end of date range.

formatdate-time

[Link to this property](#)

startTime: string

Adjusted start of date range.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

lastUpdated: string

Timestamp of the last dataset update.

formatdate-time

[Link to this property](#)

<details>

<summary>

normalization: "PERCENTAGE" or "MIN0_MAX" or "MIN_MAX" or 5 more

Normalization method applied to the results. Refer to [Normalization methods](https://developers.cloudflare.com/radar/concepts/normalization/).

</summary>

One of the following:

"PERCENTAGE"

[Link to this property](#)

"MIN0_MAX"

[Link to this property](#)

"MIN_MAX"

[Link to this property](#)

"RAW_VALUES"

[Link to this property](#)

"PERCENTAGE_CHANGE"

[Link to this property](#)

"ROLLING_AVERAGE"

[Link to this property](#)

"OVERLAPPED_PERCENTAGE"

[Link to this property](#)

"RATIO"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

units: array of object { name, value }

Measurement units for the results.

</summary>

name: string

[Link to this property](#)

value: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

serie_0: object { timestamps }

</summary>

timestamps: array of string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

TimeseriesGroupMitigationProductResponse object { meta, serie_0 }

</summary>

<details>

<summary>

meta: object { aggInterval, confidenceInfo, dateRange, 3 more }

Metadata for the results.

</summary>

<details>

<summary>

aggInterval: "FIFTEEN_MINUTES" or "ONE_HOUR" or "ONE_DAY" or 2 more

Aggregation interval of the results (e.g., in 15 minutes or 1 hour intervals). Refer to [Aggregation intervals](https://developers.cloudflare.com/radar/concepts/aggregation-intervals/).

</summary>

One of the following:

"FIFTEEN_MINUTES"

[Link to this property](#)

"ONE_HOUR"

[Link to this property](#)

"ONE_DAY"

[Link to this property](#)

"ONE_WEEK"

[Link to this property](#)

"ONE_MONTH"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

confidenceInfo: object { annotations, level }

</summary>

<details>

<summary>

annotations: array of object { dataSource, description, endDate, 5 more }

</summary>

<details>

<summary>

dataSource: "ALL" or "AI_BOTS" or "AI_GATEWAY" or 22 more

Data source for annotations.

</summary>

One of the following:

"ALL"

[Link to this property](#)

"AI_BOTS"

[Link to this property](#)

"AI_GATEWAY"

[Link to this property](#)

"BGP"

[Link to this property](#)

"BOTS"

[Link to this property](#)

"CONNECTION_ANOMALY"

[Link to this property](#)

"CT"

[Link to this property](#)

"DNS"

[Link to this property](#)

"DNS_MAGNITUDE"

[Link to this property](#)

"DNS_AS112"

[Link to this property](#)

"DOS"

[Link to this property](#)

"EMAIL_ROUTING"

[Link to this property](#)

"EMAIL_SECURITY"

[Link to this property](#)

"FW"

[Link to this property](#)

"FW_PG"

[Link to this property](#)

"HTTP"

[Link to this property](#)

"HTTP_CONTROL"

[Link to this property](#)

"HTTP_CRAWLER_REFERER"

[Link to this property](#)

"HTTP_ORIGINS"

[Link to this property](#)

"IQI"

[Link to this property](#)

"LEAKED_CREDENTIALS"

[Link to this property](#)

"NET"

[Link to this property](#)

"ROBOTS_TXT"

[Link to this property](#)

"SPEED"

[Link to this property](#)

"WORKERS_AI"

[Link to this property](#)

</details>

[Link to this property](#)

description: string

[Link to this property](#)

endDate: string

formatdate-time

[Link to this property](#)

<details>

<summary>

eventType: "GENERAL" or "OUTAGE" or "PARTIAL_PROJECTION" or 2 more

Event type for annotations.

</summary>

One of the following:

"GENERAL"

[Link to this property](#)

"OUTAGE"

[Link to this property](#)

"PARTIAL_PROJECTION"

[Link to this property](#)

"PIPELINE"

[Link to this property](#)

"TRAFFIC_ANOMALY"

[Link to this property](#)

</details>

[Link to this property](#)

isInstantaneous: boolean

Whether event is a single point in time or a time range.

[Link to this property](#)

linkedUrl: string

formaturi

[Link to this property](#)

startDate: string

formatdate-time

[Link to this property](#)

tags: optional array of string

[Link to this property](#)

</details>

[Link to this property](#)

level: number

Provides an indication of how much confidence Cloudflare has in the data.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

dateRange: array of object { endTime, startTime }

</summary>

endTime: string

Adjusted end of date range.

formatdate-time

[Link to this property](#)

startTime: string

Adjusted start of date range.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

lastUpdated: string

Timestamp of the last dataset update.

formatdate-time

[Link to this property](#)

<details>

<summary>

normalization: "PERCENTAGE" or "MIN0_MAX" or "MIN_MAX" or 5 more

Normalization method applied to the results. Refer to [Normalization methods](https://developers.cloudflare.com/radar/concepts/normalization/).

</summary>

One of the following:

"PERCENTAGE"

[Link to this property](#)

"MIN0_MAX"

[Link to this property](#)

"MIN_MAX"

[Link to this property](#)

"RAW_VALUES"

[Link to this property](#)

"PERCENTAGE_CHANGE"

[Link to this property](#)

"ROLLING_AVERAGE"

[Link to this property](#)

"OVERLAPPED_PERCENTAGE"

[Link to this property](#)

"RATIO"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

units: array of object { name, value }

Measurement units for the results.

</summary>

name: string

[Link to this property](#)

value: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

serie_0: object { timestamps }

</summary>

timestamps: array of string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

##### [Get top layer 7 attack pairs (origin and target locations)](/api/resources/radar/subresources/attacks/subresources/layer7/subresources/top/methods/attacks)

GET/radar/attacks/layer7/top/attacks

##### [Get top industries targeted by layer 7 attacks](/api/resources/radar/subresources/attacks/subresources/layer7/subresources/top/methods/industry)

GET/radar/attacks/layer7/top/industry

##### [Get top verticals targeted by layer 7 attacks](/api/resources/radar/subresources/attacks/subresources/layer7/subresources/top/methods/vertical)

GET/radar/attacks/layer7/top/vertical

##### Models

<details>

<summary>

TopAttacksResponse object { meta, top_0 }

</summary>

<details>

<summary>

meta: object { confidenceInfo, dateRange, lastUpdated, 2 more }

Metadata for the results.

</summary>

<details>

<summary>

confidenceInfo: object { annotations, level }

</summary>

<details>

<summary>

annotations: array of object { dataSource, description, endDate, 5 more }

</summary>

<details>

<summary>

dataSource: "ALL" or "AI_BOTS" or "AI_GATEWAY" or 22 more

Data source for annotations.

</summary>

One of the following:

"ALL"

[Link to this property](#)

"AI_BOTS"

[Link to this property](#)

"AI_GATEWAY"

[Link to this property](#)

"BGP"

[Link to this property](#)

"BOTS"

[Link to this property](#)

"CONNECTION_ANOMALY"

[Link to this property](#)

"CT"

[Link to this property](#)

"DNS"

[Link to this property](#)

"DNS_MAGNITUDE"

[Link to this property](#)

"DNS_AS112"

[Link to this property](#)

"DOS"

[Link to this property](#)

"EMAIL_ROUTING"

[Link to this property](#)

"EMAIL_SECURITY"

[Link to this property](#)

"FW"

[Link to this property](#)

"FW_PG"

[Link to this property](#)

"HTTP"

[Link to this property](#)

"HTTP_CONTROL"

[Link to this property](#)

"HTTP_CRAWLER_REFERER"

[Link to this property](#)

"HTTP_ORIGINS"

[Link to this property](#)

"IQI"

[Link to this property](#)

"LEAKED_CREDENTIALS"

[Link to this property](#)

"NET"

[Link to this property](#)

"ROBOTS_TXT"

[Link to this property](#)

"SPEED"

[Link to this property](#)

"WORKERS_AI"

[Link to this property](#)

</details>

[Link to this property](#)

description: string

[Link to this property](#)

endDate: string

formatdate-time

[Link to this property](#)

<details>

<summary>

eventType: "GENERAL" or "OUTAGE" or "PARTIAL_PROJECTION" or 2 more

Event type for annotations.

</summary>

One of the following:

"GENERAL"

[Link to this property](#)

"OUTAGE"

[Link to this property](#)

"PARTIAL_PROJECTION"

[Link to this property](#)

"PIPELINE"

[Link to this property](#)

"TRAFFIC_ANOMALY"

[Link to this property](#)

</details>

[Link to this property](#)

isInstantaneous: boolean

Whether event is a single point in time or a time range.

[Link to this property](#)

linkedUrl: string

formaturi

[Link to this property](#)

startDate: string

formatdate-time

[Link to this property](#)

tags: optional array of string

[Link to this property](#)

</details>

[Link to this property](#)

level: number

Provides an indication of how much confidence Cloudflare has in the data.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

dateRange: array of object { endTime, startTime }

</summary>

endTime: string

Adjusted end of date range.

formatdate-time

[Link to this property](#)

startTime: string

Adjusted start of date range.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

lastUpdated: string

Timestamp of the last dataset update.

formatdate-time

[Link to this property](#)

<details>

<summary>

normalization: "PERCENTAGE" or "MIN0_MAX" or "MIN_MAX" or 5 more

Normalization method applied to the results. Refer to [Normalization methods](https://developers.cloudflare.com/radar/concepts/normalization/).

</summary>

One of the following:

"PERCENTAGE"

[Link to this property](#)

"MIN0_MAX"

[Link to this property](#)

"MIN_MAX"

[Link to this property](#)

"RAW_VALUES"

[Link to this property](#)

"PERCENTAGE_CHANGE"

[Link to this property](#)

"ROLLING_AVERAGE"

[Link to this property](#)

"OVERLAPPED_PERCENTAGE"

[Link to this property](#)

"RATIO"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

units: array of object { name, value }

Measurement units for the results.

</summary>

name: string

[Link to this property](#)

value: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

top_0: array of object { originCountryAlpha2, originCountryName, targetCountryAlpha2, 2 more }

</summary>

originCountryAlpha2: string

[Link to this property](#)

originCountryName: string

[Link to this property](#)

targetCountryAlpha2: string

[Link to this property](#)

targetCountryName: string

[Link to this property](#)

value: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

TopIndustryResponse object { meta, top_0 }

</summary>

<details>

<summary>

meta: object { confidenceInfo, dateRange, lastUpdated, 2 more }

Metadata for the results.

</summary>

<details>

<summary>

confidenceInfo: object { annotations, level }

</summary>

<details>

<summary>

annotations: array of object { dataSource, description, endDate, 5 more }

</summary>

<details>

<summary>

dataSource: "ALL" or "AI_BOTS" or "AI_GATEWAY" or 22 more

Data source for annotations.

</summary>

One of the following:

"ALL"

[Link to this property](#)

"AI_BOTS"

[Link to this property](#)

"AI_GATEWAY"

[Link to this property](#)

"BGP"

[Link to this property](#)

"BOTS"

[Link to this property](#)

"CONNECTION_ANOMALY"

[Link to this property](#)

"CT"

[Link to this property](#)

"DNS"

[Link to this property](#)

"DNS_MAGNITUDE"

[Link to this property](#)

"DNS_AS112"

[Link to this property](#)

"DOS"

[Link to this property](#)

"EMAIL_ROUTING"

[Link to this property](#)

"EMAIL_SECURITY"

[Link to this property](#)

"FW"

[Link to this property](#)

"FW_PG"

[Link to this property](#)

"HTTP"

[Link to this property](#)

"HTTP_CONTROL"

[Link to this property](#)

"HTTP_CRAWLER_REFERER"

[Link to this property](#)

"HTTP_ORIGINS"

[Link to this property](#)

"IQI"

[Link to this property](#)

"LEAKED_CREDENTIALS"

[Link to this property](#)

"NET"

[Link to this property](#)

"ROBOTS_TXT"

[Link to this property](#)

"SPEED"

[Link to this property](#)

"WORKERS_AI"

[Link to this property](#)

</details>

[Link to this property](#)

description: string

[Link to this property](#)

endDate: string

formatdate-time

[Link to this property](#)

<details>

<summary>

eventType: "GENERAL" or "OUTAGE" or "PARTIAL_PROJECTION" or 2 more

Event type for annotations.

</summary>

One of the following:

"GENERAL"

[Link to this property](#)

"OUTAGE"

[Link to this property](#)

"PARTIAL_PROJECTION"

[Link to this property](#)

"PIPELINE"

[Link to this property](#)

"TRAFFIC_ANOMALY"

[Link to this property](#)

</details>

[Link to this property](#)

isInstantaneous: boolean

Whether event is a single point in time or a time range.

[Link to this property](#)

linkedUrl: string

formaturi

[Link to this property](#)

startDate: string

formatdate-time

[Link to this property](#)

tags: optional array of string

[Link to this property](#)

</details>

[Link to this property](#)

level: number

Provides an indication of how much confidence Cloudflare has in the data.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

dateRange: array of object { endTime, startTime }

</summary>

endTime: string

Adjusted end of date range.

formatdate-time

[Link to this property](#)

startTime: string

Adjusted start of date range.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

lastUpdated: string

Timestamp of the last dataset update.

formatdate-time

[Link to this property](#)

<details>

<summary>

normalization: "PERCENTAGE" or "MIN0_MAX" or "MIN_MAX" or 5 more

Normalization method applied to the results. Refer to [Normalization methods](https://developers.cloudflare.com/radar/concepts/normalization/).

</summary>

One of the following:

"PERCENTAGE"

[Link to this property](#)

"MIN0_MAX"

[Link to this property](#)

"MIN_MAX"

[Link to this property](#)

"RAW_VALUES"

[Link to this property](#)

"PERCENTAGE_CHANGE"

[Link to this property](#)

"ROLLING_AVERAGE"

[Link to this property](#)

"OVERLAPPED_PERCENTAGE"

[Link to this property](#)

"RATIO"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

units: array of object { name, value }

Measurement units for the results.

</summary>

name: string

[Link to this property](#)

value: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

top_0: array of object { name, value }

</summary>

name: string

[Link to this property](#)

value: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

TopVerticalResponse object { meta, top_0 }

</summary>

<details>

<summary>

meta: object { confidenceInfo, dateRange, lastUpdated, 2 more }

Metadata for the results.

</summary>

<details>

<summary>

confidenceInfo: object { annotations, level }

</summary>

<details>

<summary>

annotations: array of object { dataSource, description, endDate, 5 more }

</summary>

<details>

<summary>

dataSource: "ALL" or "AI_BOTS" or "AI_GATEWAY" or 22 more

Data source for annotations.

</summary>

One of the following:

"ALL"

[Link to this property](#)

"AI_BOTS"

[Link to this property](#)

"AI_GATEWAY"

[Link to this property](#)

"BGP"

[Link to this property](#)

"BOTS"

[Link to this property](#)

"CONNECTION_ANOMALY"

[Link to this property](#)

"CT"

[Link to this property](#)

"DNS"

[Link to this property](#)

"DNS_MAGNITUDE"

[Link to this property](#)

"DNS_AS112"

[Link to this property](#)

"DOS"

[Link to this property](#)

"EMAIL_ROUTING"

[Link to this property](#)

"EMAIL_SECURITY"

[Link to this property](#)

"FW"

[Link to this property](#)

"FW_PG"

[Link to this property](#)

"HTTP"

[Link to this property](#)

"HTTP_CONTROL"

[Link to this property](#)

"HTTP_CRAWLER_REFERER"

[Link to this property](#)

"HTTP_ORIGINS"

[Link to this property](#)

"IQI"

[Link to this property](#)

"LEAKED_CREDENTIALS"

[Link to this property](#)

"NET"

[Link to this property](#)

"ROBOTS_TXT"

[Link to this property](#)

"SPEED"

[Link to this property](#)

"WORKERS_AI"

[Link to this property](#)

</details>

[Link to this property](#)

description: string

[Link to this property](#)

endDate: string

formatdate-time

[Link to this property](#)

<details>

<summary>

eventType: "GENERAL" or "OUTAGE" or "PARTIAL_PROJECTION" or 2 more

Event type for annotations.

</summary>

One of the following:

"GENERAL"

[Link to this property](#)

"OUTAGE"

[Link to this property](#)

"PARTIAL_PROJECTION"

[Link to this property](#)

"PIPELINE"

[Link to this property](#)

"TRAFFIC_ANOMALY"

[Link to this property](#)

</details>

[Link to this property](#)

isInstantaneous: boolean

Whether event is a single point in time or a time range.

[Link to this property](#)

linkedUrl: string

formaturi

[Link to this property](#)

startDate: string

formatdate-time

[Link to this property](#)

tags: optional array of string

[Link to this property](#)

</details>

[Link to this property](#)

level: number

Provides an indication of how much confidence Cloudflare has in the data.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

dateRange: array of object { endTime, startTime }

</summary>

endTime: string

Adjusted end of date range.

formatdate-time

[Link to this property](#)

startTime: string

Adjusted start of date range.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

lastUpdated: string

Timestamp of the last dataset update.

formatdate-time

[Link to this property](#)

<details>

<summary>

normalization: "PERCENTAGE" or "MIN0_MAX" or "MIN_MAX" or 5 more

Normalization method applied to the results. Refer to [Normalization methods](https://developers.cloudflare.com/radar/concepts/normalization/).

</summary>

One of the following:

"PERCENTAGE"

[Link to this property](#)

"MIN0_MAX"

[Link to this property](#)

"MIN_MAX"

[Link to this property](#)

"RAW_VALUES"

[Link to this property](#)

"PERCENTAGE_CHANGE"

[Link to this property](#)

"ROLLING_AVERAGE"

[Link to this property](#)

"OVERLAPPED_PERCENTAGE"

[Link to this property](#)

"RATIO"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

units: array of object { name, value }

Measurement units for the results.

</summary>

name: string

[Link to this property](#)

value: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

top_0: array of object { name, value }

</summary>

name: string

[Link to this property](#)

value: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

##### [Get top origin locations of layer 7 attacks](/api/resources/radar/subresources/attacks/subresources/layer7/subresources/top/subresources/locations/methods/origin)

GET/radar/attacks/layer7/top/locations/origin

##### [Get top target locations of layer 7 attacks](/api/resources/radar/subresources/attacks/subresources/layer7/subresources/top/subresources/locations/methods/target)

GET/radar/attacks/layer7/top/locations/target

##### Models

<details>

<summary>

LocationOriginResponse object { meta, top_0 }

</summary>

<details>

<summary>

meta: object { confidenceInfo, dateRange, lastUpdated, 2 more }

Metadata for the results.

</summary>

<details>

<summary>

confidenceInfo: object { annotations, level }

</summary>

<details>

<summary>

annotations: array of object { dataSource, description, endDate, 5 more }

</summary>

<details>

<summary>

dataSource: "ALL" or "AI_BOTS" or "AI_GATEWAY" or 22 more

Data source for annotations.

</summary>

One of the following:

"ALL"

[Link to this property](#)

"AI_BOTS"

[Link to this property](#)

"AI_GATEWAY"

[Link to this property](#)

"BGP"

[Link to this property](#)

"BOTS"

[Link to this property](#)

"CONNECTION_ANOMALY"

[Link to this property](#)

"CT"

[Link to this property](#)

"DNS"

[Link to this property](#)

"DNS_MAGNITUDE"

[Link to this property](#)

"DNS_AS112"

[Link to this property](#)

"DOS"

[Link to this property](#)

"EMAIL_ROUTING"

[Link to this property](#)

"EMAIL_SECURITY"

[Link to this property](#)

"FW"

[Link to this property](#)

"FW_PG"

[Link to this property](#)

"HTTP"

[Link to this property](#)

"HTTP_CONTROL"

[Link to this property](#)

"HTTP_CRAWLER_REFERER"

[Link to this property](#)

"HTTP_ORIGINS"

[Link to this property](#)

"IQI"

[Link to this property](#)

"LEAKED_CREDENTIALS"

[Link to this property](#)

"NET"

[Link to this property](#)

"ROBOTS_TXT"

[Link to this property](#)

"SPEED"

[Link to this property](#)

"WORKERS_AI"

[Link to this property](#)

</details>

[Link to this property](#)

description: string

[Link to this property](#)

endDate: string

formatdate-time

[Link to this property](#)

<details>

<summary>

eventType: "GENERAL" or "OUTAGE" or "PARTIAL_PROJECTION" or 2 more

Event type for annotations.

</summary>

One of the following:

"GENERAL"

[Link to this property](#)

"OUTAGE"

[Link to this property](#)

"PARTIAL_PROJECTION"

[Link to this property](#)

"PIPELINE"

[Link to this property](#)

"TRAFFIC_ANOMALY"

[Link to this property](#)

</details>

[Link to this property](#)

isInstantaneous: boolean

Whether event is a single point in time or a time range.

[Link to this property](#)

linkedUrl: string

formaturi

[Link to this property](#)

startDate: string

formatdate-time

[Link to this property](#)

tags: optional array of string

[Link to this property](#)

</details>

[Link to this property](#)

level: number

Provides an indication of how much confidence Cloudflare has in the data.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

dateRange: array of object { endTime, startTime }

</summary>

endTime: string

Adjusted end of date range.

formatdate-time

[Link to this property](#)

startTime: string

Adjusted start of date range.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

lastUpdated: string

Timestamp of the last dataset update.

formatdate-time

[Link to this property](#)

<details>

<summary>

normalization: "PERCENTAGE" or "MIN0_MAX" or "MIN_MAX" or 5 more

Normalization method applied to the results. Refer to [Normalization methods](https://developers.cloudflare.com/radar/concepts/normalization/).

</summary>

One of the following:

"PERCENTAGE"

[Link to this property](#)

"MIN0_MAX"

[Link to this property](#)

"MIN_MAX"

[Link to this property](#)

"RAW_VALUES"

[Link to this property](#)

"PERCENTAGE_CHANGE"

[Link to this property](#)

"ROLLING_AVERAGE"

[Link to this property](#)

"OVERLAPPED_PERCENTAGE"

[Link to this property](#)

"RATIO"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

units: array of object { name, value }

Measurement units for the results.

</summary>

name: string

[Link to this property](#)

value: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

top_0: array of object { originCountryAlpha2, originCountryName, rank, value }

</summary>

originCountryAlpha2: string

[Link to this property](#)

originCountryName: string

[Link to this property](#)

rank: number

[Link to this property](#)

value: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

LocationTargetResponse object { meta, top_0 }

</summary>

<details>

<summary>

meta: object { confidenceInfo, dateRange, lastUpdated, 2 more }

Metadata for the results.

</summary>

<details>

<summary>

confidenceInfo: object { annotations, level }

</summary>

<details>

<summary>

annotations: array of object { dataSource, description, endDate, 5 more }

</summary>

<details>

<summary>

dataSource: "ALL" or "AI_BOTS" or "AI_GATEWAY" or 22 more

Data source for annotations.

</summary>

One of the following:

"ALL"

[Link to this property](#)

"AI_BOTS"

[Link to this property](#)

"AI_GATEWAY"

[Link to this property](#)

"BGP"

[Link to this property](#)

"BOTS"

[Link to this property](#)

"CONNECTION_ANOMALY"

[Link to this property](#)

"CT"

[Link to this property](#)

"DNS"

[Link to this property](#)

"DNS_MAGNITUDE"

[Link to this property](#)

"DNS_AS112"

[Link to this property](#)

"DOS"

[Link to this property](#)

"EMAIL_ROUTING"

[Link to this property](#)

"EMAIL_SECURITY"

[Link to this property](#)

"FW"

[Link to this property](#)

"FW_PG"

[Link to this property](#)

"HTTP"

[Link to this property](#)

"HTTP_CONTROL"

[Link to this property](#)

"HTTP_CRAWLER_REFERER"

[Link to this property](#)

"HTTP_ORIGINS"

[Link to this property](#)

"IQI"

[Link to this property](#)

"LEAKED_CREDENTIALS"

[Link to this property](#)

"NET"

[Link to this property](#)

"ROBOTS_TXT"

[Link to this property](#)

"SPEED"

[Link to this property](#)

"WORKERS_AI"

[Link to this property](#)

</details>

[Link to this property](#)

description: string

[Link to this property](#)

endDate: string

formatdate-time

[Link to this property](#)

<details>

<summary>

eventType: "GENERAL" or "OUTAGE" or "PARTIAL_PROJECTION" or 2 more

Event type for annotations.

</summary>

One of the following:

"GENERAL"

[Link to this property](#)

"OUTAGE"

[Link to this property](#)

"PARTIAL_PROJECTION"

[Link to this property](#)

"PIPELINE"

[Link to this property](#)

"TRAFFIC_ANOMALY"

[Link to this property](#)

</details>

[Link to this property](#)

isInstantaneous: boolean

Whether event is a single point in time or a time range.

[Link to this property](#)

linkedUrl: string

formaturi

[Link to this property](#)

startDate: string

formatdate-time

[Link to this property](#)

tags: optional array of string

[Link to this property](#)

</details>

[Link to this property](#)

level: number

Provides an indication of how much confidence Cloudflare has in the data.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

dateRange: array of object { endTime, startTime }

</summary>

endTime: string

Adjusted end of date range.

formatdate-time

[Link to this property](#)

startTime: string

Adjusted start of date range.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

lastUpdated: string

Timestamp of the last dataset update.

formatdate-time

[Link to this property](#)

<details>

<summary>

normalization: "PERCENTAGE" or "MIN0_MAX" or "MIN_MAX" or 5 more

Normalization method applied to the results. Refer to [Normalization methods](https://developers.cloudflare.com/radar/concepts/normalization/).

</summary>

One of the following:

"PERCENTAGE"

[Link to this property](#)

"MIN0_MAX"

[Link to this property](#)

"MIN_MAX"

[Link to this property](#)

"RAW_VALUES"

[Link to this property](#)

"PERCENTAGE_CHANGE"

[Link to this property](#)

"ROLLING_AVERAGE"

[Link to this property](#)

"OVERLAPPED_PERCENTAGE"

[Link to this property](#)

"RATIO"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

units: array of object { name, value }

Measurement units for the results.

</summary>

name: string

[Link to this property](#)

value: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

top_0: array of object { rank, targetCountryAlpha2, targetCountryName, value }

</summary>

rank: number

[Link to this property](#)

targetCountryAlpha2: string

[Link to this property](#)

targetCountryName: string

[Link to this property](#)

value: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

##### [Get top origin ASes of layer 7 attacks](/api/resources/radar/subresources/attacks/subresources/layer7/subresources/top/subresources/ases/methods/origin)

GET/radar/attacks/layer7/top/ases/origin

##### Models

<details>

<summary>

AseOriginResponse object { meta, top_0 }

</summary>

<details>

<summary>

meta: object { confidenceInfo, dateRange, lastUpdated, 2 more }

Metadata for the results.

</summary>

<details>

<summary>

confidenceInfo: object { annotations, level }

</summary>

<details>

<summary>

annotations: array of object { dataSource, description, endDate, 5 more }

</summary>

<details>

<summary>

dataSource: "ALL" or "AI_BOTS" or "AI_GATEWAY" or 22 more

Data source for annotations.

</summary>

One of the following:

"ALL"

[Link to this property](#)

"AI_BOTS"

[Link to this property](#)

"AI_GATEWAY"

[Link to this property](#)

"BGP"

[Link to this property](#)

"BOTS"

[Link to this property](#)

"CONNECTION_ANOMALY"

[Link to this property](#)

"CT"

[Link to this property](#)

"DNS"

[Link to this property](#)

"DNS_MAGNITUDE"

[Link to this property](#)

"DNS_AS112"

[Link to this property](#)

"DOS"

[Link to this property](#)

"EMAIL_ROUTING"

[Link to this property](#)

"EMAIL_SECURITY"

[Link to this property](#)

"FW"

[Link to this property](#)

"FW_PG"

[Link to this property](#)

"HTTP"

[Link to this property](#)

"HTTP_CONTROL"

[Link to this property](#)

"HTTP_CRAWLER_REFERER"

[Link to this property](#)

"HTTP_ORIGINS"

[Link to this property](#)

"IQI"

[Link to this property](#)

"LEAKED_CREDENTIALS"

[Link to this property](#)

"NET"

[Link to this property](#)

"ROBOTS_TXT"

[Link to this property](#)

"SPEED"

[Link to this property](#)

"WORKERS_AI"

[Link to this property](#)

</details>

[Link to this property](#)

description: string

[Link to this property](#)

endDate: string

formatdate-time

[Link to this property](#)

<details>

<summary>

eventType: "GENERAL" or "OUTAGE" or "PARTIAL_PROJECTION" or 2 more

Event type for annotations.

</summary>

One of the following:

"GENERAL"

[Link to this property](#)

"OUTAGE"

[Link to this property](#)

"PARTIAL_PROJECTION"

[Link to this property](#)

"PIPELINE"

[Link to this property](#)

"TRAFFIC_ANOMALY"

[Link to this property](#)

</details>

[Link to this property](#)

isInstantaneous: boolean

Whether event is a single point in time or a time range.

[Link to this property](#)

linkedUrl: string

formaturi

[Link to this property](#)

startDate: string

formatdate-time

[Link to this property](#)

tags: optional array of string

[Link to this property](#)

</details>

[Link to this property](#)

level: number

Provides an indication of how much confidence Cloudflare has in the data.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

dateRange: array of object { endTime, startTime }

</summary>

endTime: string

Adjusted end of date range.

formatdate-time

[Link to this property](#)

startTime: string

Adjusted start of date range.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

lastUpdated: string

Timestamp of the last dataset update.

formatdate-time

[Link to this property](#)

<details>

<summary>

normalization: "PERCENTAGE" or "MIN0_MAX" or "MIN_MAX" or 5 more

Normalization method applied to the results. Refer to [Normalization methods](https://developers.cloudflare.com/radar/concepts/normalization/).

</summary>

One of the following:

"PERCENTAGE"

[Link to this property](#)

"MIN0_MAX"

[Link to this property](#)

"MIN_MAX"

[Link to this property](#)

"RAW_VALUES"

[Link to this property](#)

"PERCENTAGE_CHANGE"

[Link to this property](#)

"ROLLING_AVERAGE"

[Link to this property](#)

"OVERLAPPED_PERCENTAGE"

[Link to this property](#)

"RATIO"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

units: array of object { name, value }

Measurement units for the results.

</summary>

name: string

[Link to this property](#)

value: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

top_0: array of object { originAsn, originAsnName, rank, value }

</summary>

originAsn: string

[Link to this property](#)

originAsnName: string

[Link to this property](#)

rank: number

[Link to this property](#)

value: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)
