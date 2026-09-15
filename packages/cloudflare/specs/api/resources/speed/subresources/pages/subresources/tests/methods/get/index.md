---
title: Get a page test result
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Speed](https://developers.cloudflare.com/api/resources/speed)

[Pages](https://developers.cloudflare.com/api/resources/speed/subresources/pages)

[Tests](https://developers.cloudflare.com/api/resources/speed/subresources/pages/subresources/tests)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get a page test result

GET/zones/{zone\_id}/speed\_api/pages/{url}/tests/{test\_id}

Retrieves the result of a specific test.

##### Security

<details>

<summary>API Token</summary>



The preferred authorization scheme for interacting with the Cloudflare API. <a href="https://developers.cloudflare.com/fundamentals/api/get-started/create-token/">Create a token</a>.

**Example:**<code>Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY</code>

</details>

<details>

<summary>API Email + API Key</summary>



The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**<code>X-Auth-Email: user@example.com</code>

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**<code>X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194</code>

</details>

##### Accepted Permissions (at least one required)

`Zone Settings Write``Zone Settings Read`

##### P ath ParametersExpand Collapse

zone\_id: string

Identifier.

maxLength32

[Link to this property](#)%20speed.pages.tests%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

url: string

A URL.

[Link to this property](#)%20speed.pages.tests%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20url%20%3E%20(schema)>)

test\_id: string

[Link to this property](#)%20speed.pages.tests%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20test_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20response_info%20%3E%20(schema)">ResponseInfo</a> { code, message, documentation\_url, source }

</summary>

code: number

minimum1000

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

documentation\_url: optional string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

</summary>

pointer: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20speed.pages.tests%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20response_info%20%3E%20(schema)">ResponseInfo</a> { code, message, documentation\_url, source }

</summary>

code: number

minimum1000

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

documentation\_url: optional string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

</summary>

pointer: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20speed.pages.tests%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: boolean

Whether the API call was successful.

[Link to this property](#)%20speed.pages.tests%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional <a href="https://developers.cloudflare.com/api/resources/speed#(resource)%20speed.pages.tests%20%3E%20(model)%20test%20%3E%20(schema)">Test</a> { id, date, desktopReport, 4 more }

</summary>

id: optional string

UUID.

maxLength36

<a href="#">Link to this property</a>

date: optional string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

desktopReport: optional <a href="https://developers.cloudflare.com/api/resources/speed#(resource)%20speed%20%3E%20(model)%20lighthouse_report%20%3E%20(schema)">LighthouseReport</a> { cls, deviceType, error, 9 more }

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

<a href="#">Link to this property</a>

<details>

<summary>

mobileReport: optional <a href="https://developers.cloudflare.com/api/resources/speed#(resource)%20speed%20%3E%20(model)%20lighthouse_report%20%3E%20(schema)">LighthouseReport</a> { cls, deviceType, error, 9 more }

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

<a href="#">Link to this property</a>

<details>

<summary>

region: optional <a href="https://developers.cloudflare.com/api/resources/speed#(resource)%20speed%20%3E%20(model)%20labeled_region%20%3E%20(schema)">LabeledRegion</a> { label, value }

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

[Link to this property](#)%20speed.pages.tests%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Get a page test result

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/speed_api/pages/$URL/tests/$TEST_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "success": true,
  "result": {
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "date": "2014-01-01T05:20:00.12345Z",
    "desktopReport": {
      "cls": 100,
      "deviceType": "DESKTOP",
      "error": {
        "code": "NOT_REACHABLE",
        "detail": "Details: net::ERR_CONNECTION_CLOSED",
        "finalDisplayedUrl": "example.com"
      },
      "fcp": 100,
      "jsonReportUrl": "jsonReportUrl",
      "lcp": 100,
      "performanceScore": 90,
      "si": 100,
      "state": "COMPLETE",
      "tbt": 100,
      "ttfb": 100,
      "tti": 100
    },
    "mobileReport": {
      "cls": 100,
      "deviceType": "DESKTOP",
      "error": {
        "code": "NOT_REACHABLE",
        "detail": "Details: net::ERR_CONNECTION_CLOSED",
        "finalDisplayedUrl": "example.com"
      },
      "fcp": 100,
      "jsonReportUrl": "jsonReportUrl",
      "lcp": 100,
      "performanceScore": 90,
      "si": 100,
      "state": "COMPLETE",
      "tbt": 100,
      "ttfb": 100,
      "tti": 100
    },
    "region": {
      "label": "Iowa, USA",
      "value": "us-central1"
    },
    "scheduleFrequency": "DAILY",
    "url": "example.com"
  }
}
```

##### Returns Examples

200 example

```
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "success": true,
  "result": {
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "date": "2014-01-01T05:20:00.12345Z",
    "desktopReport": {
      "cls": 100,
      "deviceType": "DESKTOP",
      "error": {
        "code": "NOT_REACHABLE",
        "detail": "Details: net::ERR_CONNECTION_CLOSED",
        "finalDisplayedUrl": "example.com"
      },
      "fcp": 100,
      "jsonReportUrl": "jsonReportUrl",
      "lcp": 100,
      "performanceScore": 90,
      "si": 100,
      "state": "COMPLETE",
      "tbt": 100,
      "ttfb": 100,
      "tti": 100
    },
    "mobileReport": {
      "cls": 100,
      "deviceType": "DESKTOP",
      "error": {
        "code": "NOT_REACHABLE",
        "detail": "Details: net::ERR_CONNECTION_CLOSED",
        "finalDisplayedUrl": "example.com"
      },
      "fcp": 100,
      "jsonReportUrl": "jsonReportUrl",
      "lcp": 100,
      "performanceScore": 90,
      "si": 100,
      "state": "COMPLETE",
      "tbt": 100,
      "ttfb": 100,
      "tti": 100
    },
    "region": {
      "label": "Iowa, USA",
      "value": "us-central1"
    },
    "scheduleFrequency": "DAILY",
    "url": "example.com"
  }
}
```