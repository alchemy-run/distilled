---
title: Crawl
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Browser Rendering](https://developers.cloudflare.com/api/resources/browser_rendering)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Crawl

##### [Crawl websites.](https://developers.cloudflare.com/api/resources/browser_rendering/subresources/crawl/methods/create)

POST/accounts/{account\_id}/browser-rendering/crawl

##### [Get crawl result.](https://developers.cloudflare.com/api/resources/browser_rendering/subresources/crawl/methods/get)

GET/accounts/{account\_id}/browser-rendering/crawl/{job\_id}

##### [Cancel a crawl job.](https://developers.cloudflare.com/api/resources/browser_rendering/subresources/crawl/methods/delete)

DELETE/accounts/{account\_id}/browser-rendering/crawl/{job\_id}

##### ModelsExpand Collapse

CrawlCreateResponse = string

Crawl job ID.

[Link to this property](#)%20browser_rendering.crawl%20%3E%20(model)%20crawl_create_response%20%3E%20(schema)>)

<details>

<summary>

CrawlGetResponse object {id, browserSecondsUsed, finished, 5 more }

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

[Link to this property](#)%20browser_rendering.crawl%20%3E%20(model)%20crawl_get_response%20%3E%20(schema)>)

<details>

<summary>

CrawlDeleteResponse object {job\_id, message }

</summary>

job\_id: string

The ID of the cancelled job.

<a href="#">Link to this property</a>

message: string

Cancellation confirmation message.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20browser_rendering.crawl%20%3E%20(model)%20crawl_delete_response%20%3E%20(schema)>)