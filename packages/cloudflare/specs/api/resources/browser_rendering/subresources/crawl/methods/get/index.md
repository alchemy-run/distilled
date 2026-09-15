---
title: Get crawl result.
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Browser Rendering](https://developers.cloudflare.com/api/resources/browser_rendering)

[Crawl](https://developers.cloudflare.com/api/resources/browser_rendering/subresources/crawl)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get crawl result.

GET/accounts/{account\_id}/browser-rendering/crawl/{job\_id}

Returns the result of a crawl job.

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

`Browser Rendering Write``Browser Rendering Read`

##### P ath ParametersExpand Collapse

account\_id: string

Account ID.

[Link to this property](#)%20browser_rendering.crawl%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

job\_id: string

Crawl job ID.

minLength1

[Link to this property](#)%20browser_rendering.crawl%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20job_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

cacheTTL: optional number

Cache TTL default is 5s. Set to 0 to disable.

maximum86400

minimum0

[Link to this property](#)%20browser_rendering.crawl%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20cacheTTL%20%3E%20(schema)>)

cursor: optional number

Cursor for pagination.

[Link to this property](#)%20browser_rendering.crawl%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20cursor%20%3E%20(schema)>)

limit: optional number

Limit for pagination.

[Link to this property](#)%20browser_rendering.crawl%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20limit%20%3E%20(schema)>)

<details>

<summary>

status: optional "queued"or "errored"or "completed"or 3 more

Filter by URL status.

</summary>

One of the following:

"queued"

<a href="#">Link to this property</a>

"errored"

<a href="#">Link to this property</a>

"completed"

<a href="#">Link to this property</a>

"disallowed"

<a href="#">Link to this property</a>

"skipped"

<a href="#">Link to this property</a>

"cancelled"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20browser_rendering.crawl%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20status%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {id, browserSecondsUsed, finished, 5 more }

</summary>

id: string

Crawl job ID.

<a href="#">Link to this property</a>

browserSecondsUsed: number

Total seconds spent in browser so far.

<a href="#">Link to this property</a>

finished: number

Total number of URLs that have been crawled so far.

<a href="#">Link to this property</a>

<details>

<summary>

records: array of object {status, url, html, 3 more }

List of crawl job records.

</summary>

<details>

<summary>

status: "queued"or "errored"or "completed"or 3 more

Current status of the crawled URL.

</summary>

One of the following:

"queued"

<a href="#">Link to this property</a>

"errored"

<a href="#">Link to this property</a>

"completed"

<a href="#">Link to this property</a>

"disallowed"

<a href="#">Link to this property</a>

"skipped"

<a href="#">Link to this property</a>

"cancelled"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

url: string

Crawled URL.

<a href="#">Link to this property</a>

html: optional string

HTML content of the crawled URL.

<a href="#">Link to this property</a>

json: optional map\[unknown]

JSON of the content of the crawled URL.

<a href="#">Link to this property</a>

markdown: optional string

Markdown of the content of the crawled URL.

<a href="#">Link to this property</a>

<details>

<summary>

metadata: optional object {status, url, title }

Absent for urls that never reached a fetch.

</summary>

status: number

HTTP status code of the crawled page.

<a href="#">Link to this property</a>

url: string

Final URL of the crawled page.

<a href="#">Link to this property</a>

title: optional string

Title of the crawled page.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

skipped: number

Total number of URLs that were skipped due to include/exclude/subdomain filters. Skipped URLs are included in records but are not counted toward total/finished.

<a href="#">Link to this property</a>

status: string

Current crawl job status.

<a href="#">Link to this property</a>

total: number

Total current number of URLs in the crawl job.

<a href="#">Link to this property</a>

cursor: optional string

Cursor for pagination.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20browser_rendering.crawl%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

Response status.

[Link to this property](#)%20browser_rendering.crawl%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

errors: optional array of object {code, message }

</summary>

code: number

Error code.

<a href="#">Link to this property</a>

message: string

Error message.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20browser_rendering.crawl%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

### Get crawl result.

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/browser-rendering/crawl/$JOB_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": {
    "id": "id",
    "browserSecondsUsed": 0,
    "finished": 0,
    "records": [
      {
        "status": "queued",
        "url": "url",
        "html": "html",
        "json": {
          "foo": {}
        },
        "markdown": "markdown",
        "metadata": {
          "status": 0,
          "url": "url",
          "title": "title"
        }
      }
    ],
    "skipped": 0,
    "status": "status",
    "total": 0,
    "cursor": "cursor"
  },
  "success": true,
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ]
}
```

##### Returns Examples

200 example

```
{
  "result": {
    "id": "id",
    "browserSecondsUsed": 0,
    "finished": 0,
    "records": [
      {
        "status": "queued",
        "url": "url",
        "html": "html",
        "json": {
          "foo": {}
        },
        "markdown": "markdown",
        "metadata": {
          "status": 0,
          "url": "url",
          "title": "title"
        }
      }
    ],
    "skipped": 0,
    "status": "status",
    "total": 0,
    "cursor": "cursor"
  },
  "success": true,
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ]
}
```