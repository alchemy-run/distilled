---
title: Browser Rendering
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Browser Rendering

#### Browser RenderingContent

##### [Get HTML content.](https://developers.cloudflare.com/api/resources/browser_rendering/subresources/content/methods/create)

POST/accounts/{account\_id}/browser-rendering/content

##### ModelsExpand Collapse

ContentCreateResponse = string

HTML content.

[Link to this property](#)%20browser_rendering.content%20%3E%20(model)%20content_create_response%20%3E%20(schema)>)

#### Browser RenderingPDF

##### [Get PDF.](https://developers.cloudflare.com/api/resources/browser_rendering/subresources/pdf/methods/create)

POST/accounts/{account\_id}/browser-rendering/pdf

#### Browser RenderingScrape

##### [Scrape elements.](https://developers.cloudflare.com/api/resources/browser_rendering/subresources/scrape/methods/create)

POST/accounts/{account\_id}/browser-rendering/scrape

##### ModelsExpand Collapse

<details>

<summary>

ScrapeCreateResponse = array of object {results, selector }

</summary>

<details>

<summary>

results: object {attributes, height, html, 4 more }

</summary>

<details>

<summary>

attributes: array of object {name, value }

</summary>

name: string

Attribute name.

<a href="#">Link to this property</a>

value: string

Attribute value.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

height: number

Element height.

<a href="#">Link to this property</a>

html: string

HTML content.

<a href="#">Link to this property</a>

left: number

Element left.

<a href="#">Link to this property</a>

text: string

Text content.

<a href="#">Link to this property</a>

top: number

Element top.

<a href="#">Link to this property</a>

width: number

Element width.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

selector: string

Selector.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20browser_rendering.scrape%20%3E%20(model)%20scrape_create_response%20%3E%20(schema)>)

#### Browser RenderingScreenshot

##### [Get screenshot.](https://developers.cloudflare.com/api/resources/browser_rendering/subresources/screenshot/methods/create)

POST/accounts/{account\_id}/browser-rendering/screenshot

##### ModelsExpand Collapse

<details>

<summary>

ScreenshotCreateResponse object {success, errors }

</summary>

success: boolean

Response status.

<a href="#">Link to this property</a>

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

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20browser_rendering.screenshot%20%3E%20(model)%20screenshot_create_response%20%3E%20(schema)>)

#### Browser RenderingSnapshot

##### [Get HTML content and screenshot.](https://developers.cloudflare.com/api/resources/browser_rendering/subresources/snapshot/methods/create)

POST/accounts/{account\_id}/browser-rendering/snapshot

##### ModelsExpand Collapse

<details>

<summary>

SnapshotCreateResponse object {accessibilityTree, content, markdown, screenshot }

</summary>

<details>

<summary>

accessibilityTree: optional object {role, autocomplete, checked, 23 more }

Accessibility tree node

</summary>

role: string

<a href="#">Link to this property</a>

autocomplete: optional string

<a href="#">Link to this property</a>

<details>

<summary>

checked: optional booleanor "mixed"

</summary>

One of the following:

boolean

<a href="#">Link to this property</a>

"mixed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

children: optional array of unknown

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

disabled: optional boolean

<a href="#">Link to this property</a>

expanded: optional boolean

<a href="#">Link to this property</a>

focused: optional boolean

<a href="#">Link to this property</a>

haspopup: optional string

<a href="#">Link to this property</a>

invalid: optional string

<a href="#">Link to this property</a>

keyshortcuts: optional string

<a href="#">Link to this property</a>

level: optional number

<a href="#">Link to this property</a>

modal: optional boolean

<a href="#">Link to this property</a>

multiline: optional boolean

<a href="#">Link to this property</a>

multiselectable: optional boolean

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

orientation: optional string

<a href="#">Link to this property</a>

<details>

<summary>

pressed: optional booleanor "mixed"

</summary>

One of the following:

boolean

<a href="#">Link to this property</a>

"mixed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

readonly: optional boolean

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

roledescription: optional string

<a href="#">Link to this property</a>

selected: optional boolean

<a href="#">Link to this property</a>

<details>

<summary>

value: optional stringor number

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

valuemax: optional number

<a href="#">Link to this property</a>

valuemin: optional number

<a href="#">Link to this property</a>

valuetext: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

content: optional string

HTML content.

<a href="#">Link to this property</a>

markdown: optional string

Markdown content. Prefixed with YAML frontmatter (e.g. <code>title</code>) when the page provides that metadata.

<a href="#">Link to this property</a>

screenshot: optional string

Base64 encoded image.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20browser_rendering.snapshot%20%3E%20(model)%20snapshot_create_response%20%3E%20(schema)>)

#### Browser RenderingJson

##### [Get json.](https://developers.cloudflare.com/api/resources/browser_rendering/subresources/json/methods/create)

POST/accounts/{account\_id}/browser-rendering/json

##### ModelsExpand Collapse

JsonCreateResponse = map\[unknown]

[Link to this property](#)%20browser_rendering.json%20%3E%20(model)%20json_create_response%20%3E%20(schema)>)

#### Browser RenderingLinks

##### [Get Links.](https://developers.cloudflare.com/api/resources/browser_rendering/subresources/links/methods/create)

POST/accounts/{account\_id}/browser-rendering/links

##### ModelsExpand Collapse

LinkCreateResponse = array of string

[Link to this property](#)%20browser_rendering.links%20%3E%20(model)%20link_create_response%20%3E%20(schema)>)

#### Browser RenderingMarkdown

##### [Get markdown.](https://developers.cloudflare.com/api/resources/browser_rendering/subresources/markdown/methods/create)

POST/accounts/{account\_id}/browser-rendering/markdown

##### ModelsExpand Collapse

MarkdownCreateResponse = string

Markdown content. Prefixed with YAML frontmatter (e.g. `title`) when the page provides that metadata.

[Link to this property](#)%20browser_rendering.markdown%20%3E%20(model)%20markdown_create_response%20%3E%20(schema)>)

#### Browser RenderingAccessibility Tree

##### [Get accessibility tree page](https://developers.cloudflare.com/api/resources/browser_rendering/subresources/accessibility_tree/methods/create)

POST/accounts/{account\_id}/browser-rendering/accessibilityTree

##### ModelsExpand Collapse

<details>

<summary>

AccessibilityTreeCreateResponse object {accessibilityTree }

</summary>

<details>

<summary>

accessibilityTree: object {role, autocomplete, checked, 23 more }

Accessibility tree node

</summary>

role: string

<a href="#">Link to this property</a>

autocomplete: optional string

<a href="#">Link to this property</a>

<details>

<summary>

checked: optional booleanor "mixed"

</summary>

One of the following:

boolean

<a href="#">Link to this property</a>

"mixed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

children: optional array of unknown

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

disabled: optional boolean

<a href="#">Link to this property</a>

expanded: optional boolean

<a href="#">Link to this property</a>

focused: optional boolean

<a href="#">Link to this property</a>

haspopup: optional string

<a href="#">Link to this property</a>

invalid: optional string

<a href="#">Link to this property</a>

keyshortcuts: optional string

<a href="#">Link to this property</a>

level: optional number

<a href="#">Link to this property</a>

modal: optional boolean

<a href="#">Link to this property</a>

multiline: optional boolean

<a href="#">Link to this property</a>

multiselectable: optional boolean

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

orientation: optional string

<a href="#">Link to this property</a>

<details>

<summary>

pressed: optional booleanor "mixed"

</summary>

One of the following:

boolean

<a href="#">Link to this property</a>

"mixed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

readonly: optional boolean

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

roledescription: optional string

<a href="#">Link to this property</a>

selected: optional boolean

<a href="#">Link to this property</a>

<details>

<summary>

value: optional stringor number

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

valuemax: optional number

<a href="#">Link to this property</a>

valuemin: optional number

<a href="#">Link to this property</a>

valuetext: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20browser_rendering.accessibility_tree%20%3E%20(model)%20accessibility_tree_create_response%20%3E%20(schema)>)

#### Browser RenderingCrawl

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

#### Browser RenderingDevtools

#### Browser RenderingDevtoolsSession

##### [List sessions.](https://developers.cloudflare.com/api/resources/browser_rendering/subresources/devtools/subresources/session/methods/list)

GET/accounts/{account\_id}/browser-rendering/devtools/session

##### [Get session details.](https://developers.cloudflare.com/api/resources/browser_rendering/subresources/devtools/subresources/session/methods/get)

GET/accounts/{account\_id}/browser-rendering/devtools/session/{session\_id}

##### ModelsExpand Collapse

<details>

<summary>

SessionListResponse = array of object {sessionId, closeReason, closeReasonText, 8 more }

</summary>

sessionId: string

Session ID.

formatuuid

<a href="#">Link to this property</a>

closeReason: optional number

Reason code for session closure.

<a href="#">Link to this property</a>

closeReasonText: optional string

Human-readable close reason.

<a href="#">Link to this property</a>

connectionEndTime: optional number

Connection end time.

<a href="#">Link to this property</a>

connectionId: optional string

Connection ID.

<a href="#">Link to this property</a>

connectionStartTime: optional number

Connection start time.

<a href="#">Link to this property</a>

devtoolsFrontendUrl: optional string

DevTools frontend URL.

<a href="#">Link to this property</a>

endTime: optional number

Session end time.

<a href="#">Link to this property</a>

lastUpdated: optional number

Last updated timestamp.

<a href="#">Link to this property</a>

startTime: optional number

Session start time.

<a href="#">Link to this property</a>

webSocketDebuggerUrl: optional string

WebSocket URL for debugging this target.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20browser_rendering.devtools.session%20%3E%20(model)%20session_list_response%20%3E%20(schema)>)

<details>

<summary>

SessionGetResponse object {sessionId, closeReason, closeReasonText, 8 more }

</summary>

sessionId: string

Session ID.

formatuuid

<a href="#">Link to this property</a>

closeReason: optional number

Reason code for session closure.

<a href="#">Link to this property</a>

closeReasonText: optional string

Human-readable close reason.

<a href="#">Link to this property</a>

connectionEndTime: optional number

Connection end time.

<a href="#">Link to this property</a>

connectionId: optional string

Connection ID.

<a href="#">Link to this property</a>

connectionStartTime: optional number

Connection start time.

<a href="#">Link to this property</a>

devtoolsFrontendUrl: optional string

DevTools frontend URL.

<a href="#">Link to this property</a>

endTime: optional number

Session end time.

<a href="#">Link to this property</a>

lastUpdated: optional number

Last updated timestamp.

<a href="#">Link to this property</a>

startTime: optional number

Session start time.

<a href="#">Link to this property</a>

webSocketDebuggerUrl: optional string

WebSocket URL for debugging this target.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20browser_rendering.devtools.session%20%3E%20(model)%20session_get_response%20%3E%20(schema)>)

#### Browser RenderingDevtoolsBrowser

##### [Get a browser session ID.](https://developers.cloudflare.com/api/resources/browser_rendering/subresources/devtools/subresources/browser/methods/create)

POST/accounts/{account\_id}/browser-rendering/devtools/browser

##### [Acquire and connect to browser session.](https://developers.cloudflare.com/api/resources/browser_rendering/subresources/devtools/subresources/browser/methods/launch)

GET/accounts/{account\_id}/browser-rendering/devtools/browser

##### [Connect to browser session.](https://developers.cloudflare.com/api/resources/browser_rendering/subresources/devtools/subresources/browser/methods/connect)

GET/accounts/{account\_id}/browser-rendering/devtools/browser/{session\_id}

##### [Close browser session.](https://developers.cloudflare.com/api/resources/browser_rendering/subresources/devtools/subresources/browser/methods/delete)

DELETE/accounts/{account\_id}/browser-rendering/devtools/browser/{session\_id}

##### [Get browser version metadata.](https://developers.cloudflare.com/api/resources/browser_rendering/subresources/devtools/subresources/browser/methods/version)

GET/accounts/{account\_id}/browser-rendering/devtools/browser/{session\_id}/json/version

##### [Get Chrome DevTools Protocol schema.](https://developers.cloudflare.com/api/resources/browser_rendering/subresources/devtools/subresources/browser/methods/protocol)

GET/accounts/{account\_id}/browser-rendering/devtools/browser/{session\_id}/json/protocol

##### ModelsExpand Collapse

<details>

<summary>

BrowserCreateResponse object {sessionId, webSocketDebuggerUrl }

</summary>

sessionId: string

Browser session ID.

<a href="#">Link to this property</a>

webSocketDebuggerUrl: optional string

WebSocket URL for the session.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20browser_rendering.devtools.browser%20%3E%20(model)%20browser_create_response%20%3E%20(schema)>)

<details>

<summary>

BrowserDeleteResponse object {status }

</summary>

<details>

<summary>

status: "closing"or "closed"

</summary>

One of the following:

"closing"

<a href="#">Link to this property</a>

"closed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20browser_rendering.devtools.browser%20%3E%20(model)%20browser_delete_response%20%3E%20(schema)>)

<details>

<summary>

BrowserVersionResponse object {Browser, "Protocol-Version", "User-Agent", 3 more }

</summary>

Browser: string

Browser name and version.

<a href="#">Link to this property</a>

"Protocol-Version": string

Chrome DevTools Protocol version.

<a href="#">Link to this property</a>

"User-Agent": string

User agent string.

<a href="#">Link to this property</a>

"V8-Version": string

V8 JavaScript engine version.

<a href="#">Link to this property</a>

"WebKit-Version": string

WebKit version.

<a href="#">Link to this property</a>

webSocketDebuggerUrl: string

WebSocket URL for debugging the browser.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20browser_rendering.devtools.browser%20%3E%20(model)%20browser_version_response%20%3E%20(schema)>)

<details>

<summary>

BrowserProtocolResponse object {domains, version }

</summary>

<details>

<summary>

domains: array of object {domain, commands, dependencies, 3 more }

List of protocol domains.

</summary>

domain: string

Domain name.

<a href="#">Link to this property</a>

commands: optional array of map\[unknown]

Available commands.

<a href="#">Link to this property</a>

dependencies: optional array of string

Domain dependencies.

<a href="#">Link to this property</a>

events: optional array of map\[unknown]

Available events.

<a href="#">Link to this property</a>

experimental: optional boolean

Whether this domain is experimental.

<a href="#">Link to this property</a>

types: optional array of map\[unknown]

Type definitions.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

version: optional object {major, minor }

Protocol version.

</summary>

major: string

Major version.

<a href="#">Link to this property</a>

minor: string

Minor version.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20browser_rendering.devtools.browser%20%3E%20(model)%20browser_protocol_response%20%3E%20(schema)>)

#### Browser RenderingDevtoolsBrowserLive View

##### [Mint live view URLs for a browser session](https://developers.cloudflare.com/api/resources/browser_rendering/subresources/devtools/subresources/browser/subresources/live_view/methods/create)

POST/accounts/{account\_id}/browser-rendering/devtools/browser/{session\_id}/live\_view

##### ModelsExpand Collapse

<details>

<summary>

LiveViewCreateResponse object {id, devtoolsFrontendUrl, options, webSocketDebuggerUrl }

</summary>

id: string

Target ID

<a href="#">Link to this property</a>

devtoolsFrontendUrl: string

URL to open the live view in a browser

formaturi

<a href="#">Link to this property</a>

<details>

<summary>

options: object {mode, guardrails }

</summary>

<details>

<summary>

mode: "devtools"or "tab"or "full"

UI mode for the live view

</summary>

One of the following:

"devtools"

<a href="#">Link to this property</a>

"tab"

<a href="#">Link to this property</a>

"full"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

guardrails: optional object {mode }

Connection guardrails applied to this link

</summary>

mode: "readonly"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

webSocketDebuggerUrl: string

WebSocket URL for CDP connection

formaturi

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20browser_rendering.devtools.browser.live_view%20%3E%20(model)%20live_view_create_response%20%3E%20(schema)>)

#### Browser RenderingDevtoolsBrowserPage

##### [Connect to a specific Chrome DevTools page.](https://developers.cloudflare.com/api/resources/browser_rendering/subresources/devtools/subresources/browser/subresources/page/methods/get)

GET/accounts/{account\_id}/browser-rendering/devtools/browser/{session\_id}/page/{target\_id}

#### Browser RenderingDevtoolsBrowserTargets

##### [Open a new browser tab.](https://developers.cloudflare.com/api/resources/browser_rendering/subresources/devtools/subresources/browser/subresources/targets/methods/create)

PUT/accounts/{account\_id}/browser-rendering/devtools/browser/{session\_id}/json/new

##### [List targets.](https://developers.cloudflare.com/api/resources/browser_rendering/subresources/devtools/subresources/browser/subresources/targets/methods/list)

GET/accounts/{account\_id}/browser-rendering/devtools/browser/{session\_id}/json/list

##### [Get a target by ID.](https://developers.cloudflare.com/api/resources/browser_rendering/subresources/devtools/subresources/browser/subresources/targets/methods/get)

GET/accounts/{account\_id}/browser-rendering/devtools/browser/{session\_id}/json/list/{target\_id}

##### [Activate a browser target.](https://developers.cloudflare.com/api/resources/browser_rendering/subresources/devtools/subresources/browser/subresources/targets/methods/activate)

GET/accounts/{account\_id}/browser-rendering/devtools/browser/{session\_id}/json/activate/{target\_id}

##### [Close a browser target.](https://developers.cloudflare.com/api/resources/browser_rendering/subresources/devtools/subresources/browser/subresources/targets/methods/close)

GET/accounts/{account\_id}/browser-rendering/devtools/browser/{session\_id}/json/close/{target\_id}

##### ModelsExpand Collapse

<details>

<summary>

TargetCreateResponse object {id, type, url, 4 more }

</summary>

id: string

Target ID.

<a href="#">Link to this property</a>

type: string

Target type (page, background\_page, worker, etc.).

<a href="#">Link to this property</a>

url: string

URL of the target.

<a href="#">Link to this property</a>

description: optional string

Target description.

<a href="#">Link to this property</a>

devtoolsFrontendUrl: optional string

DevTools frontend URL.

<a href="#">Link to this property</a>

title: optional string

Title of the target.

<a href="#">Link to this property</a>

webSocketDebuggerUrl: optional string

WebSocket URL for debugging this target.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20browser_rendering.devtools.browser.targets%20%3E%20(model)%20target_create_response%20%3E%20(schema)>)

<details>

<summary>

TargetListResponse = array of object {id, type, url, 4 more }

</summary>

id: string

Target ID.

<a href="#">Link to this property</a>

type: string

Target type (page, background\_page, worker, etc.).

<a href="#">Link to this property</a>

url: string

URL of the target.

<a href="#">Link to this property</a>

description: optional string

Target description.

<a href="#">Link to this property</a>

devtoolsFrontendUrl: optional string

DevTools frontend URL.

<a href="#">Link to this property</a>

title: optional string

Title of the target.

<a href="#">Link to this property</a>

webSocketDebuggerUrl: optional string

WebSocket URL for debugging this target.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20browser_rendering.devtools.browser.targets%20%3E%20(model)%20target_list_response%20%3E%20(schema)>)

<details>

<summary>

TargetGetResponse object {id, type, url, 4 more }

</summary>

id: string

Target ID.

<a href="#">Link to this property</a>

type: string

Target type (page, background\_page, worker, etc.).

<a href="#">Link to this property</a>

url: string

URL of the target.

<a href="#">Link to this property</a>

description: optional string

Target description.

<a href="#">Link to this property</a>

devtoolsFrontendUrl: optional string

DevTools frontend URL.

<a href="#">Link to this property</a>

title: optional string

Title of the target.

<a href="#">Link to this property</a>

webSocketDebuggerUrl: optional string

WebSocket URL for debugging this target.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20browser_rendering.devtools.browser.targets%20%3E%20(model)%20target_get_response%20%3E%20(schema)>)

<details>

<summary>

TargetActivateResponse object {message }

</summary>

message: string

Target activated.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20browser_rendering.devtools.browser.targets%20%3E%20(model)%20target_activate_response%20%3E%20(schema)>)

<details>

<summary>

TargetCloseResponse object {message }

</summary>

message: string

Target is closing.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20browser_rendering.devtools.browser.targets%20%3E%20(model)%20target_close_response%20%3E%20(schema)>)