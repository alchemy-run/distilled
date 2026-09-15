---
title: Pages
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Speed](https://developers.cloudflare.com/api/resources/speed)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Pages

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

#### PagesTests

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