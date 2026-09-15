##### [Get HTTP requests summary by dimension](/api/resources/radar/subresources/http/methods/summary_v2)

GET/radar/http/summary/{dimension}

##### [Get HTTP requests time series](/api/resources/radar/subresources/http/methods/timeseries)

GET/radar/http/timeseries

##### [Get HTTP requests time series grouped by dimension](/api/resources/radar/subresources/http/methods/timeseries_groups_v2)

GET/radar/http/timeseries_groups/{dimension}

##### Models

<details>

<summary>

HTTPSummaryV2Response object { meta, summary_0 }

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

HTTPTimeseriesResponse object { meta }

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

HTTPTimeseriesGroupsV2Response object { meta, serie_0 }

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

##### [Get top locations by HTTP requests](/api/resources/radar/subresources/http/subresources/locations/methods/get)

GET/radar/http/top/locations

##### Models

<details>

<summary>

LocationGetResponse object { meta, top_0 }

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

top_0: array of object { clientCountryAlpha2, clientCountryName, value }

</summary>

clientCountryAlpha2: string

[Link to this property](#)

clientCountryName: string

[Link to this property](#)

value: string

A numeric string.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

##### [Get top locations by HTTP requests for a bot class](/api/resources/radar/subresources/http/subresources/locations/subresources/bot_class/methods/get)

GET/radar/http/top/locations/bot_class/{bot_class}

##### Models

<details>

<summary>

BotClassGetResponse object { meta, top_0 }

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

top_0: array of object { clientCountryAlpha2, clientCountryName, value }

</summary>

clientCountryAlpha2: string

[Link to this property](#)

clientCountryName: string

[Link to this property](#)

value: string

A numeric string.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

##### [Get top locations by HTTP requests for a device type](/api/resources/radar/subresources/http/subresources/locations/subresources/device_type/methods/get)

GET/radar/http/top/locations/device_type/{device_type}

##### Models

<details>

<summary>

DeviceTypeGetResponse object { meta, top_0 }

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

top_0: array of object { clientCountryAlpha2, clientCountryName, value }

</summary>

clientCountryAlpha2: string

[Link to this property](#)

clientCountryName: string

[Link to this property](#)

value: string

A numeric string.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

##### [Get top locations by HTTP requests for an HTTP protocol](/api/resources/radar/subresources/http/subresources/locations/subresources/http_protocol/methods/get)

GET/radar/http/top/locations/http_protocol/{http_protocol}

##### Models

<details>

<summary>

HTTPProtocolGetResponse object { meta, top_0 }

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

top_0: array of object { clientCountryAlpha2, clientCountryName, value }

</summary>

clientCountryAlpha2: string

[Link to this property](#)

clientCountryName: string

[Link to this property](#)

value: string

A numeric string.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

##### [Get top locations by HTTP requests for an HTTP version](/api/resources/radar/subresources/http/subresources/locations/subresources/http_method/methods/get)

GET/radar/http/top/locations/http_version/{http_version}

##### Models

<details>

<summary>

HTTPMethodGetResponse object { meta, top_0 }

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

top_0: array of object { clientCountryAlpha2, clientCountryName, value }

</summary>

clientCountryAlpha2: string

[Link to this property](#)

clientCountryName: string

[Link to this property](#)

value: string

A numeric string.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

##### [Get top locations by HTTP requests for an IP version](/api/resources/radar/subresources/http/subresources/locations/subresources/ip_version/methods/get)

GET/radar/http/top/locations/ip_version/{ip_version}

##### Models

<details>

<summary>

IPVersionGetResponse object { meta, top_0 }

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

top_0: array of object { clientCountryAlpha2, clientCountryName, value }

</summary>

clientCountryAlpha2: string

[Link to this property](#)

clientCountryName: string

[Link to this property](#)

value: string

A numeric string.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

##### [Get top locations by HTTP requests for an OS](/api/resources/radar/subresources/http/subresources/locations/subresources/os/methods/get)

GET/radar/http/top/locations/os/{os}

##### Models

<details>

<summary>

OSGetResponse object { meta, top_0 }

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

top_0: array of object { clientCountryAlpha2, clientCountryName, value }

</summary>

clientCountryAlpha2: string

[Link to this property](#)

clientCountryName: string

[Link to this property](#)

value: string

A numeric string.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

##### [Get top locations by HTTP requests for a TLS version](/api/resources/radar/subresources/http/subresources/locations/subresources/tls_version/methods/get)

GET/radar/http/top/locations/tls_version/{tls_version}

##### Models

<details>

<summary>

TLSVersionGetResponse object { meta, top_0 }

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

top_0: array of object { clientCountryAlpha2, clientCountryName, value }

</summary>

clientCountryAlpha2: string

[Link to this property](#)

clientCountryName: string

[Link to this property](#)

value: string

A numeric string.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

##### [Get top locations by HTTP requests for a browser family](/api/resources/radar/subresources/http/subresources/locations/subresources/browser_family/methods/get)

GET/radar/http/top/locations/browser_family/{browser_family}

##### Models

<details>

<summary>

BrowserFamilyGetResponse object { meta, top_0 }

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

top_0: array of object { clientCountryAlpha2, clientCountryName, value }

</summary>

clientCountryAlpha2: string

[Link to this property](#)

clientCountryName: string

[Link to this property](#)

value: string

A numeric string.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

##### [Get top ASes by HTTP requests](/api/resources/radar/subresources/http/subresources/ases/methods/get)

GET/radar/http/top/ases

##### Models

<details>

<summary>

AseGetResponse object { meta, top_0 }

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

top_0: array of object { clientASN, clientASName, value }

</summary>

clientASN: number

[Link to this property](#)

clientASName: string

[Link to this property](#)

value: string

A numeric string.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

##### [Get top ASes by HTTP requests for a bot class](/api/resources/radar/subresources/http/subresources/ases/subresources/bot_class/methods/get)

GET/radar/http/top/ases/bot_class/{bot_class}

##### Models

<details>

<summary>

BotClassGetResponse object { meta, top_0 }

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

top_0: array of object { clientASN, clientASName, value }

</summary>

clientASN: number

[Link to this property](#)

clientASName: string

[Link to this property](#)

value: string

A numeric string.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

##### [Get top ASes by HTTP requests for a device type](/api/resources/radar/subresources/http/subresources/ases/subresources/device_type/methods/get)

GET/radar/http/top/ases/device_type/{device_type}

##### Models

<details>

<summary>

DeviceTypeGetResponse object { meta, top_0 }

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

top_0: array of object { clientASN, clientASName, value }

</summary>

clientASN: number

[Link to this property](#)

clientASName: string

[Link to this property](#)

value: string

A numeric string.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

##### [Get top ASes by HTTP requests for an HTTP protocol](/api/resources/radar/subresources/http/subresources/ases/subresources/http_protocol/methods/get)

GET/radar/http/top/ases/http_protocol/{http_protocol}

##### Models

<details>

<summary>

HTTPProtocolGetResponse object { meta, top_0 }

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

top_0: array of object { clientASN, clientASName, value }

</summary>

clientASN: number

[Link to this property](#)

clientASName: string

[Link to this property](#)

value: string

A numeric string.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

##### [Get top ASes by HTTP requests for an HTTP version](/api/resources/radar/subresources/http/subresources/ases/subresources/http_method/methods/get)

GET/radar/http/top/ases/http_version/{http_version}

##### Models

<details>

<summary>

HTTPMethodGetResponse object { meta, top_0 }

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

top_0: array of object { clientASN, clientASName, value }

</summary>

clientASN: number

[Link to this property](#)

clientASName: string

[Link to this property](#)

value: string

A numeric string.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

##### [Get top ASes by HTTP requests for an IP version](/api/resources/radar/subresources/http/subresources/ases/subresources/ip_version/methods/get)

GET/radar/http/top/ases/ip_version/{ip_version}

##### Models

<details>

<summary>

IPVersionGetResponse object { meta, top_0 }

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

top_0: array of object { clientASN, clientASName, value }

</summary>

clientASN: number

[Link to this property](#)

clientASName: string

[Link to this property](#)

value: string

A numeric string.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

##### [Get top ASes by HTTP requests for an OS](/api/resources/radar/subresources/http/subresources/ases/subresources/os/methods/get)

GET/radar/http/top/ases/os/{os}

##### Models

<details>

<summary>

OSGetResponse object { meta, top_0 }

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

top_0: array of object { clientASN, clientASName, value }

</summary>

clientASN: number

[Link to this property](#)

clientASName: string

[Link to this property](#)

value: string

A numeric string.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

##### [Get top ASes by HTTP requests for a TLS version](/api/resources/radar/subresources/http/subresources/ases/subresources/tls_version/methods/get)

GET/radar/http/top/ases/tls_version/{tls_version}

##### Models

<details>

<summary>

TLSVersionGetResponse object { meta, top_0 }

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

top_0: array of object { clientASN, clientASName, value }

</summary>

clientASN: number

[Link to this property](#)

clientASName: string

[Link to this property](#)

value: string

A numeric string.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

##### [Get top ASes by HTTP requests for a browser family](/api/resources/radar/subresources/http/subresources/ases/subresources/browser_family/methods/get)

GET/radar/http/top/ases/browser_family/{browser_family}

##### Models

<details>

<summary>

BrowserFamilyGetResponse object { meta, top_0 }

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

top_0: array of object { clientASN, clientASName, value }

</summary>

clientASN: number

[Link to this property](#)

clientASName: string

[Link to this property](#)

value: string

A numeric string.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

##### [Get HTTP requests by bot class summary](/api/resources/radar/subresources/http/subresources/summary/methods/bot_class)

GET/radar/http/summary/bot_class

##### [Get HTTP requests by device type summary](/api/resources/radar/subresources/http/subresources/summary/methods/device_type)

GET/radar/http/summary/device_type

##### [Get HTTP requests by HTTP/HTTPS summary](/api/resources/radar/subresources/http/subresources/summary/methods/http_protocol)

GET/radar/http/summary/http_protocol

##### [Get HTTP requests by HTTP version summary](/api/resources/radar/subresources/http/subresources/summary/methods/http_version)

GET/radar/http/summary/http_version

##### [Get HTTP requests by IP version summary](/api/resources/radar/subresources/http/subresources/summary/methods/ip_version)

GET/radar/http/summary/ip_version

##### [Get HTTP requests by OS summary](/api/resources/radar/subresources/http/subresources/summary/methods/os)

GET/radar/http/summary/os

##### [Get HTTP requests by TLS version summary](/api/resources/radar/subresources/http/subresources/summary/methods/tls_version)

GET/radar/http/summary/tls_version

##### [Get HTTP requests by post-quantum support summary](/api/resources/radar/subresources/http/subresources/summary/methods/post_quantum)

GET/radar/http/summary/post_quantum

##### Models

<details>

<summary>

SummaryBotClassResponse object { meta, summary_0 }

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

summary_0: object { bot, human }

</summary>

bot: string

A numeric string.

[Link to this property](#)

human: string

A numeric string.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SummaryDeviceTypeResponse object { meta, summary_0 }

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

summary_0: object { desktop, mobile, other }

</summary>

desktop: string

A numeric string.

[Link to this property](#)

mobile: string

A numeric string.

[Link to this property](#)

other: string

A numeric string.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SummaryHTTPProtocolResponse object { meta, summary_0 }

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

summary_0: object { http, https }

</summary>

http: string

A numeric string.

[Link to this property](#)

https: string

A numeric string.

[Link to this property](#)

</details>

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

A numeric string.

[Link to this property](#)

"HTTP/2": string

A numeric string.

[Link to this property](#)

"HTTP/3": string

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

SummaryOSResponse object { meta, summary_0 }

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

summary_0: object { ANDROID, IOS }

</summary>

ANDROID: string

A numeric string.

[Link to this property](#)

IOS: string

A numeric string.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SummaryTLSVersionResponse object { meta, summary_0 }

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

summary_0: object { "TLS 1.0", "TLS 1.1", "TLS 1.2", 2 more }

</summary>

"TLS 1.0": string

A numeric string.

[Link to this property](#)

"TLS 1.1": string

A numeric string.

[Link to this property](#)

"TLS 1.2": string

A numeric string.

[Link to this property](#)

"TLS 1.3": string

A numeric string.

[Link to this property](#)

"TLS QUIC": string

A numeric string.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SummaryPostQuantumResponse object { meta, summary_0 }

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

summary_0: object { NOT_SUPPORTED, SUPPORTED }

</summary>

NOT_SUPPORTED: string

A numeric string.

[Link to this property](#)

SUPPORTED: string

A numeric string.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

##### [Get HTTP requests by TLS version time series](/api/resources/radar/subresources/http/subresources/timeseries_groups/methods/tls_version)

GET/radar/http/timeseries_groups/tls_version

##### [Get HTTP requests by bot class time series](/api/resources/radar/subresources/http/subresources/timeseries_groups/methods/bot_class)

GET/radar/http/timeseries_groups/bot_class

##### [Get HTTP requests by user agent time series](/api/resources/radar/subresources/http/subresources/timeseries_groups/methods/browser)

GET/radar/http/timeseries_groups/browser

##### [Get HTTP requests by user agent family time series](/api/resources/radar/subresources/http/subresources/timeseries_groups/methods/browser_family)

GET/radar/http/timeseries_groups/browser_family

##### [Get HTTP requests by device type time series](/api/resources/radar/subresources/http/subresources/timeseries_groups/methods/device_type)

GET/radar/http/timeseries_groups/device_type

##### [Get HTTP requests by HTTP/HTTPS time series](/api/resources/radar/subresources/http/subresources/timeseries_groups/methods/http_protocol)

GET/radar/http/timeseries_groups/http_protocol

##### [Get HTTP requests by HTTP version time series](/api/resources/radar/subresources/http/subresources/timeseries_groups/methods/http_version)

GET/radar/http/timeseries_groups/http_version

##### [Get HTTP requests by IP version time series](/api/resources/radar/subresources/http/subresources/timeseries_groups/methods/ip_version)

GET/radar/http/timeseries_groups/ip_version

##### [Get HTTP requests by OS time series](/api/resources/radar/subresources/http/subresources/timeseries_groups/methods/os)

GET/radar/http/timeseries_groups/os

##### [Get HTTP requests by post-quantum support time series](/api/resources/radar/subresources/http/subresources/timeseries_groups/methods/post_quantum)

GET/radar/http/timeseries_groups/post_quantum

##### Models

<details>

<summary>

TimeseriesGroupTLSVersionResponse object { meta, serie_0 }

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

serie_0: object { timestamps, "TLS 1.0", "TLS 1.1", 3 more }

</summary>

timestamps: array of string

[Link to this property](#)

"TLS 1.0": array of string

[Link to this property](#)

"TLS 1.1": array of string

[Link to this property](#)

"TLS 1.2": array of string

[Link to this property](#)

"TLS 1.3": array of string

[Link to this property](#)

"TLS QUIC": array of string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

TimeseriesGroupBotClassResponse object { meta, serie_0 }

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

serie_0: object { bot, human, timestamps }

</summary>

bot: array of string

[Link to this property](#)

human: array of string

[Link to this property](#)

timestamps: array of string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

TimeseriesGroupBrowserResponse object { meta, serie_0 }

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

TimeseriesGroupBrowserFamilyResponse object { meta, serie_0 }

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

TimeseriesGroupDeviceTypeResponse object { meta, serie_0 }

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

serie_0: object { desktop, mobile, other, timestamps }

</summary>

desktop: array of string

[Link to this property](#)

mobile: array of string

[Link to this property](#)

other: array of string

[Link to this property](#)

timestamps: array of string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

TimeseriesGroupHTTPProtocolResponse object { meta, serie_0 }

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

serie_0: object { http, https, timestamps }

</summary>

http: array of string

[Link to this property](#)

https: array of string

[Link to this property](#)

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

TimeseriesGroupOSResponse object { meta, serie_0 }

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

TimeseriesGroupPostQuantumResponse object { meta, serie_0 }

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

serie_0: object { NOT_SUPPORTED, SUPPORTED, timestamps }

</summary>

NOT_SUPPORTED: array of string

[Link to this property](#)

SUPPORTED: array of string

[Link to this property](#)

timestamps: array of string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

##### [Get top user agents by HTTP requests](/api/resources/radar/subresources/http/subresources/top/methods/browser)

GET/radar/http/top/browser

##### [Get top user agent families by HTTP requests](/api/resources/radar/subresources/http/subresources/top/methods/browser_family)

GET/radar/http/top/browser_family

##### Models

<details>

<summary>

TopBrowserResponse object { meta, top_0 }

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

TopBrowserFamilyResponse object { meta, top_0 }

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
