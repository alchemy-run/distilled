---
title: Speed
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Speed

##### ModelsExpand Collapse

<details>

<summary>

LabeledRegion object {label, value }

A test region with a label.

</summary>

label: optional string

<a href="#">Link to this property</a>

<details>

<summary>

value: optional "asia-east1"or "asia-northeast1"or "asia-northeast2"or 18 more

A test region.

</summary>

One of the following:

"asia-east1"

<a href="#">Link to this property</a>

"asia-northeast1"

<a href="#">Link to this property</a>

"asia-northeast2"

<a href="#">Link to this property</a>

"asia-south1"

<a href="#">Link to this property</a>

"asia-southeast1"

<a href="#">Link to this property</a>

"australia-southeast1"

<a href="#">Link to this property</a>

"europe-north1"

<a href="#">Link to this property</a>

"europe-southwest1"

<a href="#">Link to this property</a>

"europe-west1"

<a href="#">Link to this property</a>

"europe-west2"

<a href="#">Link to this property</a>

"europe-west3"

<a href="#">Link to this property</a>

"europe-west4"

<a href="#">Link to this property</a>

"europe-west8"

<a href="#">Link to this property</a>

"europe-west9"

<a href="#">Link to this property</a>

"me-west1"

<a href="#">Link to this property</a>

"southamerica-east1"

<a href="#">Link to this property</a>

"us-central1"

<a href="#">Link to this property</a>

"us-east1"

<a href="#">Link to this property</a>

"us-east4"

<a href="#">Link to this property</a>

"us-south1"

<a href="#">Link to this property</a>

"us-west1"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20speed%20%3E%20(model)%20labeled_region%20%3E%20(schema)>)

<details>

<summary>

LighthouseReport object {cls, deviceType, error, 9 more }

The Lighthouse report.

</summary>

cls: optional number

Cumulative Layout Shift.

<a href="#">Link to this property</a>

<details>

<summary>

deviceType: optional "DESKTOP"or "MOBILE"

The type of device.

</summary>

One of the following:

"DESKTOP"

<a href="#">Link to this property</a>

"MOBILE"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

error: optional object {code, detail, finalDisplayedUrl }

</summary>

<details>

<summary>

code: optional "NOT\_REACHABLE"or "DNS\_FAILURE"or "NOT\_HTML"or 2 more

The error code of the Lighthouse result.

</summary>

One of the following:

"NOT\_REACHABLE"

<a href="#">Link to this property</a>

"DNS\_FAILURE"

<a href="#">Link to this property</a>

"NOT\_HTML"

<a href="#">Link to this property</a>

"LIGHTHOUSE\_TIMEOUT"

<a href="#">Link to this property</a>

"UNKNOWN"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

detail: optional string

Detailed error message.

<a href="#">Link to this property</a>

finalDisplayedUrl: optional string

The final URL displayed to the user.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

fcp: optional number

First Contentful Paint.

<a href="#">Link to this property</a>

jsonReportUrl: optional string

The URL to the full Lighthouse JSON report.

<a href="#">Link to this property</a>

lcp: optional number

Largest Contentful Paint.

<a href="#">Link to this property</a>

performanceScore: optional number

The Lighthouse performance score.

<a href="#">Link to this property</a>

si: optional number

Speed Index.

<a href="#">Link to this property</a>

<details>

<summary>

state: optional "RUNNING"or "COMPLETE"or "FAILED"

The state of the Lighthouse report.

</summary>

One of the following:

"RUNNING"

<a href="#">Link to this property</a>

"COMPLETE"

<a href="#">Link to this property</a>

"FAILED"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

tbt: optional number

Total Blocking Time.

<a href="#">Link to this property</a>

ttfb: optional number

Time To First Byte.

<a href="#">Link to this property</a>

tti: optional number

Time To Interactive.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20speed%20%3E%20(model)%20lighthouse_report%20%3E%20(schema)>)

<details>

<summary>

Trend object {cls, fcp, lcp, 5 more }

</summary>

cls: optional array of number

Cumulative Layout Shift trend.

<a href="#">Link to this property</a>

fcp: optional array of number

First Contentful Paint trend.

<a href="#">Link to this property</a>

lcp: optional array of number

Largest Contentful Paint trend.

<a href="#">Link to this property</a>

performanceScore: optional array of number

The Lighthouse score trend.

<a href="#">Link to this property</a>

si: optional array of number

Speed Index trend.

<a href="#">Link to this property</a>

tbt: optional array of number

Total Blocking Time trend.

<a href="#">Link to this property</a>

ttfb: optional array of number

Time To First Byte trend.

<a href="#">Link to this property</a>

tti: optional array of number

Time To Interactive trend.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20speed%20%3E%20(model)%20trend%20%3E%20(schema)>)

#### SpeedSchedule

##### [Get a page test schedule](https://developers.cloudflare.com/api/resources/speed/subresources/schedule/methods/get)

GET/zones/{zone\_id}/speed\_api/schedule/{url}

##### [Create scheduled page test](https://developers.cloudflare.com/api/resources/speed/subresources/schedule/methods/create)

POST/zones/{zone\_id}/speed\_api/schedule/{url}

##### [Delete scheduled page test](https://developers.cloudflare.com/api/resources/speed/subresources/schedule/methods/delete)

DELETE/zones/{zone\_id}/speed\_api/schedule/{url}

##### ModelsExpand Collapse

<details>

<summary>

Schedule object {frequency, region, url }

The test schedule.

</summary>

<details>

<summary>

frequency: optional "DAILY"or "WEEKLY"

The frequency of the test.

</summary>

One of the following:

"DAILY"

<a href="#">Link to this property</a>

"WEEKLY"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

region: optional "asia-east1"or "asia-northeast1"or "asia-northeast2"or 18 more

A test region.

</summary>

One of the following:

"asia-east1"

<a href="#">Link to this property</a>

"asia-northeast1"

<a href="#">Link to this property</a>

"asia-northeast2"

<a href="#">Link to this property</a>

"asia-south1"

<a href="#">Link to this property</a>

"asia-southeast1"

<a href="#">Link to this property</a>

"australia-southeast1"

<a href="#">Link to this property</a>

"europe-north1"

<a href="#">Link to this property</a>

"europe-southwest1"

<a href="#">Link to this property</a>

"europe-west1"

<a href="#">Link to this property</a>

"europe-west2"

<a href="#">Link to this property</a>

"europe-west3"

<a href="#">Link to this property</a>

"europe-west4"

<a href="#">Link to this property</a>

"europe-west8"

<a href="#">Link to this property</a>

"europe-west9"

<a href="#">Link to this property</a>

"me-west1"

<a href="#">Link to this property</a>

"southamerica-east1"

<a href="#">Link to this property</a>

"us-central1"

<a href="#">Link to this property</a>

"us-east1"

<a href="#">Link to this property</a>

"us-east4"

<a href="#">Link to this property</a>

"us-south1"

<a href="#">Link to this property</a>

"us-west1"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

url: optional string

A URL.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20speed.schedule%20%3E%20(model)%20schedule%20%3E%20(schema)>)

<details>

<summary>

ScheduleCreateResponse object {schedule, test }

</summary>

schedule: optional <a href="https://developers.cloudflare.com/api/resources/speed#(resource)%20speed.schedule%20%3E%20(model)%20schedule%20%3E%20(schema)">Schedule</a> { frequency, region, url }

The test schedule.

<a href="#">Link to this property</a>

test: optional <a href="https://developers.cloudflare.com/api/resources/speed#(resource)%20speed.pages.tests%20%3E%20(model)%20test%20%3E%20(schema)">Test</a> { id, date, desktopReport, 4 more }

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20speed.schedule%20%3E%20(model)%20schedule_create_response%20%3E%20(schema)>)

<details>

<summary>

ScheduleDeleteResponse object {count }

</summary>

count: optional number

Number of items affected.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20speed.schedule%20%3E%20(model)%20schedule_delete_response%20%3E%20(schema)>)

#### SpeedAvailabilities

##### [Get quota and availability](https://developers.cloudflare.com/api/resources/speed/subresources/availabilities/methods/list)

GET/zones/{zone\_id}/speed\_api/availabilities

##### ModelsExpand Collapse

<details>

<summary>

Availability object {quota, regions, regionsPerPlan }

</summary>

<details>

<summary>

quota: optional object {plan, quotasPerPlan, remainingSchedules, 2 more }

</summary>

plan: optional string

Cloudflare plan.

<a href="#">Link to this property</a>

<details>

<summary>

quotasPerPlan: optional object {value }

The number of tests available per plan.

</summary>

<details>

<summary>

value: optional object {business, enterprise, free, pro }

Counts per account plan.

</summary>

business: optional number

<a href="#">Link to this property</a>

enterprise: optional number

<a href="#">Link to this property</a>

free: optional number

<a href="#">Link to this property</a>

pro: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

remainingSchedules: optional number

The number of remaining schedules available.

<a href="#">Link to this property</a>

remainingTests: optional number

The number of remaining tests available.

<a href="#">Link to this property</a>

<details>

<summary>

scheduleQuotasPerPlan: optional object {value }

The number of schedules available per plan.

</summary>

<details>

<summary>

value: optional object {business, enterprise, free, pro }

Counts per account plan.

</summary>

business: optional number

<a href="#">Link to this property</a>

enterprise: optional number

<a href="#">Link to this property</a>

free: optional number

<a href="#">Link to this property</a>

pro: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

regions: optional array of <a href="https://developers.cloudflare.com/api/resources/speed#(resource)%20speed%20%3E%20(model)%20labeled_region%20%3E%20(schema)">LabeledRegion</a> { label, value }

</summary>

label: optional string

<a href="#">Link to this property</a>

<details>

<summary>

value: optional "asia-east1"or "asia-northeast1"or "asia-northeast2"or 18 more

A test region.

</summary>

One of the following:

"asia-east1"

<a href="#">Link to this property</a>

"asia-northeast1"

<a href="#">Link to this property</a>

"asia-northeast2"

<a href="#">Link to this property</a>

"asia-south1"

<a href="#">Link to this property</a>

"asia-southeast1"

<a href="#">Link to this property</a>

"australia-southeast1"

<a href="#">Link to this property</a>

"europe-north1"

<a href="#">Link to this property</a>

"europe-southwest1"

<a href="#">Link to this property</a>

"europe-west1"

<a href="#">Link to this property</a>

"europe-west2"

<a href="#">Link to this property</a>

"europe-west3"

<a href="#">Link to this property</a>

"europe-west4"

<a href="#">Link to this property</a>

"europe-west8"

<a href="#">Link to this property</a>

"europe-west9"

<a href="#">Link to this property</a>

"me-west1"

<a href="#">Link to this property</a>

"southamerica-east1"

<a href="#">Link to this property</a>

"us-central1"

<a href="#">Link to this property</a>

"us-east1"

<a href="#">Link to this property</a>

"us-east4"

<a href="#">Link to this property</a>

"us-south1"

<a href="#">Link to this property</a>

"us-west1"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

regionsPerPlan: optional object {business, enterprise, free, pro }

Available regions.

</summary>

<details>

<summary>

business: optional array of <a href="https://developers.cloudflare.com/api/resources/speed#(resource)%20speed%20%3E%20(model)%20labeled_region%20%3E%20(schema)">LabeledRegion</a> { label, value }

</summary>

label: optional string

<a href="#">Link to this property</a>

<details>

<summary>

value: optional "asia-east1"or "asia-northeast1"or "asia-northeast2"or 18 more

A test region.

</summary>

One of the following:

"asia-east1"

<a href="#">Link to this property</a>

"asia-northeast1"

<a href="#">Link to this property</a>

"asia-northeast2"

<a href="#">Link to this property</a>

"asia-south1"

<a href="#">Link to this property</a>

"asia-southeast1"

<a href="#">Link to this property</a>

"australia-southeast1"

<a href="#">Link to this property</a>

"europe-north1"

<a href="#">Link to this property</a>

"europe-southwest1"

<a href="#">Link to this property</a>

"europe-west1"

<a href="#">Link to this property</a>

"europe-west2"

<a href="#">Link to this property</a>

"europe-west3"

<a href="#">Link to this property</a>

"europe-west4"

<a href="#">Link to this property</a>

"europe-west8"

<a href="#">Link to this property</a>

"europe-west9"

<a href="#">Link to this property</a>

"me-west1"

<a href="#">Link to this property</a>

"southamerica-east1"

<a href="#">Link to this property</a>

"us-central1"

<a href="#">Link to this property</a>

"us-east1"

<a href="#">Link to this property</a>

"us-east4"

<a href="#">Link to this property</a>

"us-south1"

<a href="#">Link to this property</a>

"us-west1"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

enterprise: optional array of <a href="https://developers.cloudflare.com/api/resources/speed#(resource)%20speed%20%3E%20(model)%20labeled_region%20%3E%20(schema)">LabeledRegion</a> { label, value }

</summary>

label: optional string

<a href="#">Link to this property</a>

<details>

<summary>

value: optional "asia-east1"or "asia-northeast1"or "asia-northeast2"or 18 more

A test region.

</summary>

One of the following:

"asia-east1"

<a href="#">Link to this property</a>

"asia-northeast1"

<a href="#">Link to this property</a>

"asia-northeast2"

<a href="#">Link to this property</a>

"asia-south1"

<a href="#">Link to this property</a>

"asia-southeast1"

<a href="#">Link to this property</a>

"australia-southeast1"

<a href="#">Link to this property</a>

"europe-north1"

<a href="#">Link to this property</a>

"europe-southwest1"

<a href="#">Link to this property</a>

"europe-west1"

<a href="#">Link to this property</a>

"europe-west2"

<a href="#">Link to this property</a>

"europe-west3"

<a href="#">Link to this property</a>

"europe-west4"

<a href="#">Link to this property</a>

"europe-west8"

<a href="#">Link to this property</a>

"europe-west9"

<a href="#">Link to this property</a>

"me-west1"

<a href="#">Link to this property</a>

"southamerica-east1"

<a href="#">Link to this property</a>

"us-central1"

<a href="#">Link to this property</a>

"us-east1"

<a href="#">Link to this property</a>

"us-east4"

<a href="#">Link to this property</a>

"us-south1"

<a href="#">Link to this property</a>

"us-west1"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

free: optional array of <a href="https://developers.cloudflare.com/api/resources/speed#(resource)%20speed%20%3E%20(model)%20labeled_region%20%3E%20(schema)">LabeledRegion</a> { label, value }

</summary>

label: optional string

<a href="#">Link to this property</a>

<details>

<summary>

value: optional "asia-east1"or "asia-northeast1"or "asia-northeast2"or 18 more

A test region.

</summary>

One of the following:

"asia-east1"

<a href="#">Link to this property</a>

"asia-northeast1"

<a href="#">Link to this property</a>

"asia-northeast2"

<a href="#">Link to this property</a>

"asia-south1"

<a href="#">Link to this property</a>

"asia-southeast1"

<a href="#">Link to this property</a>

"australia-southeast1"

<a href="#">Link to this property</a>

"europe-north1"

<a href="#">Link to this property</a>

"europe-southwest1"

<a href="#">Link to this property</a>

"europe-west1"

<a href="#">Link to this property</a>

"europe-west2"

<a href="#">Link to this property</a>

"europe-west3"

<a href="#">Link to this property</a>

"europe-west4"

<a href="#">Link to this property</a>

"europe-west8"

<a href="#">Link to this property</a>

"europe-west9"

<a href="#">Link to this property</a>

"me-west1"

<a href="#">Link to this property</a>

"southamerica-east1"

<a href="#">Link to this property</a>

"us-central1"

<a href="#">Link to this property</a>

"us-east1"

<a href="#">Link to this property</a>

"us-east4"

<a href="#">Link to this property</a>

"us-south1"

<a href="#">Link to this property</a>

"us-west1"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

pro: optional array of <a href="https://developers.cloudflare.com/api/resources/speed#(resource)%20speed%20%3E%20(model)%20labeled_region%20%3E%20(schema)">LabeledRegion</a> { label, value }

</summary>

label: optional string

<a href="#">Link to this property</a>

<details>

<summary>

value: optional "asia-east1"or "asia-northeast1"or "asia-northeast2"or 18 more

A test region.

</summary>

One of the following:

"asia-east1"

<a href="#">Link to this property</a>

"asia-northeast1"

<a href="#">Link to this property</a>

"asia-northeast2"

<a href="#">Link to this property</a>

"asia-south1"

<a href="#">Link to this property</a>

"asia-southeast1"

<a href="#">Link to this property</a>

"australia-southeast1"

<a href="#">Link to this property</a>

"europe-north1"

<a href="#">Link to this property</a>

"europe-southwest1"

<a href="#">Link to this property</a>

"europe-west1"

<a href="#">Link to this property</a>

"europe-west2"

<a href="#">Link to this property</a>

"europe-west3"

<a href="#">Link to this property</a>

"europe-west4"

<a href="#">Link to this property</a>

"europe-west8"

<a href="#">Link to this property</a>

"europe-west9"

<a href="#">Link to this property</a>

"me-west1"

<a href="#">Link to this property</a>

"southamerica-east1"

<a href="#">Link to this property</a>

"us-central1"

<a href="#">Link to this property</a>

"us-east1"

<a href="#">Link to this property</a>

"us-east4"

<a href="#">Link to this property</a>

"us-south1"

<a href="#">Link to this property</a>

"us-west1"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20speed.availabilities%20%3E%20(model)%20availability%20%3E%20(schema)>)

#### SpeedPages

##### [List tested webpages](https://developers.cloudflare.com/api/resources/speed/subresources/pages/methods/list)

GET/zones/{zone\_id}/speed\_api/pages

##### [List core web vital metrics trend](https://developers.cloudflare.com/api/resources/speed/subresources/pages/methods/trend)

GET/zones/{zone\_id}/speed\_api/pages/{url}/trend

##### ModelsExpand Collapse

<details>

<summary>

PageListResponse object {region, scheduleFrequency, tests, url }

</summary>

region: optional <a href="https://developers.cloudflare.com/api/resources/speed#(resource)%20speed%20%3E%20(model)%20labeled_region%20%3E%20(schema)">LabeledRegion</a> { label, value }

A test region with a label.

<a href="#">Link to this property</a>

<details>

<summary>

scheduleFrequency: optional "DAILY"or "WEEKLY"

The frequency of the test.

</summary>

One of the following:

"DAILY"

<a href="#">Link to this property</a>

"WEEKLY"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

tests: optional array of <a href="https://developers.cloudflare.com/api/resources/speed#(resource)%20speed.pages.tests%20%3E%20(model)%20test%20%3E%20(schema)">Test</a> { id, date, desktopReport, 4 more }

</summary>

id: optional string

UUID.

maxLength36

<a href="#">Link to this property</a>

date: optional string

formatdate-time

<a href="#">Link to this property</a>

desktopReport: optional <a href="https://developers.cloudflare.com/api/resources/speed#(resource)%20speed%20%3E%20(model)%20lighthouse_report%20%3E%20(schema)">LighthouseReport</a> { cls, deviceType, error, 9 more }

The Lighthouse report.

<a href="#">Link to this property</a>

mobileReport: optional <a href="https://developers.cloudflare.com/api/resources/speed#(resource)%20speed%20%3E%20(model)%20lighthouse_report%20%3E%20(schema)">LighthouseReport</a> { cls, deviceType, error, 9 more }

The Lighthouse report.

<a href="#">Link to this property</a>

region: optional <a href="https://developers.cloudflare.com/api/resources/speed#(resource)%20speed%20%3E%20(model)%20labeled_region%20%3E%20(schema)">LabeledRegion</a> { label, value }

A test region with a label.

<a href="#">Link to this property</a>

<details>

<summary>

scheduleFrequency: optional "DAILY"or "WEEKLY"

The frequency of the test.

</summary>

One of the following:

"DAILY"

<a href="#">Link to this property</a>

"WEEKLY"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

url: optional string

A URL.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

url: optional string

A URL.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20speed.pages%20%3E%20(model)%20page_list_response%20%3E%20(schema)>)

#### SpeedPagesTests

##### [List page test history](https://developers.cloudflare.com/api/resources/speed/subresources/pages/subresources/tests/methods/list)

GET/zones/{zone\_id}/speed\_api/pages/{url}/tests

##### [Get a page test result](https://developers.cloudflare.com/api/resources/speed/subresources/pages/subresources/tests/methods/get)

GET/zones/{zone\_id}/speed\_api/pages/{url}/tests/{test\_id}

##### [Start page test](https://developers.cloudflare.com/api/resources/speed/subresources/pages/subresources/tests/methods/create)

POST/zones/{zone\_id}/speed\_api/pages/{url}/tests

##### [Delete all page tests](https://developers.cloudflare.com/api/resources/speed/subresources/pages/subresources/tests/methods/delete)

DELETE/zones/{zone\_id}/speed\_api/pages/{url}/tests

##### ModelsExpand Collapse

<details>

<summary>

Test object {id, date, desktopReport, 4 more }

</summary>

id: optional string

UUID.

maxLength36

<a href="#">Link to this property</a>

date: optional string

formatdate-time

<a href="#">Link to this property</a>

desktopReport: optional <a href="https://developers.cloudflare.com/api/resources/speed#(resource)%20speed%20%3E%20(model)%20lighthouse_report%20%3E%20(schema)">LighthouseReport</a> { cls, deviceType, error, 9 more }

The Lighthouse report.

<a href="#">Link to this property</a>

mobileReport: optional <a href="https://developers.cloudflare.com/api/resources/speed#(resource)%20speed%20%3E%20(model)%20lighthouse_report%20%3E%20(schema)">LighthouseReport</a> { cls, deviceType, error, 9 more }

The Lighthouse report.

<a href="#">Link to this property</a>

region: optional <a href="https://developers.cloudflare.com/api/resources/speed#(resource)%20speed%20%3E%20(model)%20labeled_region%20%3E%20(schema)">LabeledRegion</a> { label, value }

A test region with a label.

<a href="#">Link to this property</a>

<details>

<summary>

scheduleFrequency: optional "DAILY"or "WEEKLY"

The frequency of the test.

</summary>

One of the following:

"DAILY"

<a href="#">Link to this property</a>

"WEEKLY"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

url: optional string

A URL.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20speed.pages.tests%20%3E%20(model)%20test%20%3E%20(schema)>)

<details>

<summary>

TestDeleteResponse object {count }

</summary>

count: optional number

Number of items affected.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20speed.pages.tests%20%3E%20(model)%20test_delete_response%20%3E%20(schema)>)