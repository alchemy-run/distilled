---
title: Crawl websites.
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Browser Rendering](https://developers.cloudflare.com/api/resources/browser_rendering)

[Crawl](https://developers.cloudflare.com/api/resources/browser_rendering/subresources/crawl)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Crawl websites.

POST/accounts/{account\_id}/browser-rendering/crawl

Starts a crawl job for the provided URL and its children. Check available options like `gotoOptions` and `waitFor*` to control page load behaviour.

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

`Browser Rendering Write`

##### P ath ParametersExpand Collapse

account\_id: string

Account ID.

[Link to this property](#)%20browser_rendering.crawl%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

cacheTTL: optional number

Cache TTL default is 5s. Set to 0 to disable.

maximum86400

minimum0

[Link to this property](#)%20browser_rendering.crawl%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20cacheTTL%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

<details>

<summary>

body: object {url, actionTimeout, addScriptTag, 26 more } or object {render, url, contentUse, 9 more }

</summary>

One of the following:

<details>

<summary>

object {url, actionTimeout, addScriptTag, 26 more }

</summary>

url: string

URL to navigate to, eg. <code>https://example.com</code>.

formaturi

<a href="#">Link to this property</a>

actionTimeout: optional number

The maximum duration allowed for the browser action to complete after the page has loaded (such as taking screenshots, extracting content, or generating PDFs). If this time limit is exceeded, the action stops and returns a timeout error.

maximum120000

<a href="#">Link to this property</a>

<details>

<summary>

addScriptTag: optional array of object {id, content, type, url }

Adds a <code>&lt;script&gt;</code> tag into the page with the desired URL or content.

</summary>

id: optional string

<a href="#">Link to this property</a>

content: optional string

<a href="#">Link to this property</a>

type: optional string

<a href="#">Link to this property</a>

url: optional string

formaturi

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

addStyleTag: optional array of object {content, url }

Adds a <code>&lt;link rel="stylesheet"&gt;</code> tag into the page with the desired URL or a <code>&lt;style type="text/css"&gt;</code> tag with the content.

</summary>

content: optional string

<a href="#">Link to this property</a>

url: optional string

formaturi

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

allowRequestPattern: optional array of string

Only allow requests that match the provided regex patterns, eg. ’/^.\*.(css)’. Reject rules are applied first.

<a href="#">Link to this property</a>

<details>

<summary>

allowResourceTypes: optional array of "document"or "stylesheet"or "image"or 15 more

Only allow requests that match the provided resource types, eg. ‘image’ or ‘script’. Reject rules are applied first.

</summary>

One of the following:

"document"

<a href="#">Link to this property</a>

"stylesheet"

<a href="#">Link to this property</a>

"image"

<a href="#">Link to this property</a>

"media"

<a href="#">Link to this property</a>

"font"

<a href="#">Link to this property</a>

"script"

<a href="#">Link to this property</a>

"texttrack"

<a href="#">Link to this property</a>

"xhr"

<a href="#">Link to this property</a>

"fetch"

<a href="#">Link to this property</a>

"prefetch"

<a href="#">Link to this property</a>

"eventsource"

<a href="#">Link to this property</a>

"websocket"

<a href="#">Link to this property</a>

"manifest"

<a href="#">Link to this property</a>

"signedexchange"

<a href="#">Link to this property</a>

"ping"

<a href="#">Link to this property</a>

"cspviolationreport"

<a href="#">Link to this property</a>

"preflight"

<a href="#">Link to this property</a>

"other"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

authenticate: optional object {password, username }

Provide credentials for HTTP authentication.

</summary>

password: string

minLength1

<a href="#">Link to this property</a>

username: string

minLength1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

bestAttempt: optional boolean

Attempt to proceed when ‘awaited’ events fail or timeout.

<a href="#">Link to this property</a>

<details>

<summary>

contentUse: optional "reference"or "full"

Intended content use level to respect the <code>use</code> Content-Signal directive in robots.txt. Levels (least to most permissive): ‘reference’, ‘full’. A URL is disallowed when the publisher’s declared <code>use</code> level is lower than this intent. Learn more: <a href="https://contentsignals.org/">https://contentsignals.org/</a>. Default: ‘full’.

</summary>

One of the following:

"reference"

<a href="#">Link to this property</a>

"full"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

cookies: optional array of object {name, value, domain, 11 more }

Check <a href="https://pptr.dev/api/puppeteer.page.setcookie">options</a>.

</summary>

name: string

Cookie name.

<a href="#">Link to this property</a>

value: string

<a href="#">Link to this property</a>

domain: optional string

<a href="#">Link to this property</a>

expires: optional number

<a href="#">Link to this property</a>

httpOnly: optional boolean

<a href="#">Link to this property</a>

partitionKey: optional string

<a href="#">Link to this property</a>

path: optional string

<a href="#">Link to this property</a>

<details>

<summary>

priority: optional "Low"or "Medium"or "High"

</summary>

One of the following:

"Low"

<a href="#">Link to this property</a>

"Medium"

<a href="#">Link to this property</a>

"High"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

sameParty: optional boolean

<a href="#">Link to this property</a>

<details>

<summary>

sameSite: optional "Strict"or "Lax"or "None"

</summary>

One of the following:

"Strict"

<a href="#">Link to this property</a>

"Lax"

<a href="#">Link to this property</a>

"None"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

secure: optional boolean

<a href="#">Link to this property</a>

sourcePort: optional number

<a href="#">Link to this property</a>

<details>

<summary>

sourceScheme: optional "Unset"or "NonSecure"or "Secure"

</summary>

One of the following:

"Unset"

<a href="#">Link to this property</a>

"NonSecure"

<a href="#">Link to this property</a>

"Secure"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

url: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

crawlPurposes: optional array of "search"or "ai-input"or "ai-train"

List of crawl purposes to respect Content-Signal directives in robots.txt. Allowed values: ‘search’, ‘ai-input’, ‘ai-train’. Learn more: <a href="https://contentsignals.org/">https://contentsignals.org/</a>. Default: \[‘search’, ‘ai-input’, ‘ai-train’].

</summary>

One of the following:

"search"

<a href="#">Link to this property</a>

"ai-input"

<a href="#">Link to this property</a>

"ai-train"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

depth: optional number

Maximum number of levels deep the crawler will traverse from the starting URL.

maximum100000

minimum1

<a href="#">Link to this property</a>

emulateMediaType: optional string

<a href="#">Link to this property</a>

<details>

<summary>

formats: optional array of "html"or "markdown"or "json"

Formats to return. Default is <code>html</code>.

</summary>

One of the following:

"html"

<a href="#">Link to this property</a>

"markdown"

<a href="#">Link to this property</a>

"json"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

gotoOptions: optional object {referer, referrerPolicy, timeout, waitUntil }

Check <a href="https://pptr.dev/api/puppeteer.gotooptions">options</a>.

</summary>

referer: optional string

<a href="#">Link to this property</a>

referrerPolicy: optional string

<a href="#">Link to this property</a>

timeout: optional number

maximum60000

<a href="#">Link to this property</a>

<details>

<summary>

waitUntil: optional "load"or "domcontentloaded"or "networkidle0"or "networkidle2"or array of "load"or "domcontentloaded"or "networkidle0"or "networkidle2"

</summary>

One of the following:

<details>

<summary>

"load"or "domcontentloaded"or "networkidle0"or "networkidle2"

</summary>

One of the following:

"load"

<a href="#">Link to this property</a>

"domcontentloaded"

<a href="#">Link to this property</a>

"networkidle0"

<a href="#">Link to this property</a>

"networkidle2"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

array of "load"or "domcontentloaded"or "networkidle0"or "networkidle2"

</summary>

One of the following:

"load"

<a href="#">Link to this property</a>

"domcontentloaded"

<a href="#">Link to this property</a>

"networkidle0"

<a href="#">Link to this property</a>

"networkidle2"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

jsonOptions: optional object {custom\_ai, prompt, response\_format }

Options for JSON extraction.

</summary>

<details>

<summary>

custom\_ai: optional array of object {model, authorization }

Optional list of custom AI models to use for the request. The models will be tried in the order provided, and in case a model returns an error, the next one will be used as fallback.

</summary>

model: string

AI model to use for the request. Must be formed as <code>&lt;provider&gt;/&lt;model_name&gt;</code>, e.g. <code>workers-ai/@cf/meta/llama-3.3-70b-instruct-fp8-fast</code>.

<a href="#">Link to this property</a>

authorization: optional string

Authorization token for the AI model: <code>Bearer &lt;token&gt;</code>. Not needed for workers-ai models.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

prompt: optional string

<a href="#">Link to this property</a>

<details>

<summary>

response\_format: optional object {type, json\_schema }

</summary>

type: string

<a href="#">Link to this property</a>

json\_schema: optional map\[unknown]

Schema for the response format. More information here: <a href="https://developers.cloudflare.com/workers-ai/json-mode/">https://developers.cloudflare.com/workers-ai/json-mode/</a>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

limit: optional number

Maximum number of URLs to crawl.

maximum100000

minimum1

<a href="#">Link to this property</a>

maxAge: optional number

Maximum age of a resource that can be returned from cache in seconds. Default is 1 day.

maximum604800

minimum0

<a href="#">Link to this property</a>

modifiedSince: optional number

Unix timestamp (seconds since epoch) indicating to only crawl pages that were modified since this time. For sitemap URLs with a lastmod field, this is compared directly. For other URLs, the crawler will use If-Modified-Since header when fetching. URLs without modification information (no lastmod in sitemap and no Last-Modified header support) will be crawled. Note: This works in conjunction with maxAge - both filters must pass for a cached resource to be used. Must be within the last year and not in the future.

exclusiveMinimum

minimum0

<a href="#">Link to this property</a>

<details>

<summary>

options: optional object {excludePatterns, includeExternalLinks, includePatterns, includeSubdomains }

Additional options for the crawler.

</summary>

excludePatterns: optional array of string

Exclude links matching the provided wildcard patterns in the crawl job. Example: ‘<a href="https://example.com/privacy/">https://example.com/privacy/</a>\*\*’.

<a href="#">Link to this property</a>

includeExternalLinks: optional boolean

Include external links in the crawl job. If set to true, includeSubdomains is ignored.

<a href="#">Link to this property</a>

includePatterns: optional array of string

Include only links matching the provided wildcard patterns in the crawl job. Include patterns are evaluated before exclude patterns. URLs that match any of the specified include patterns will be included in the crawl job. Example: ‘<a href="https://example.com/blog/">https://example.com/blog/</a>\*\*’.

<a href="#">Link to this property</a>

includeSubdomains: optional boolean

Include links to subdomains in the crawl job. This option is ignored if includeExternalLinks is true.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

rejectRequestPattern: optional array of string

Block undesired requests that match the provided regex patterns, eg. ’/^.\*.(css)’.

<a href="#">Link to this property</a>

<details>

<summary>

rejectResourceTypes: optional array of "document"or "stylesheet"or "image"or 15 more

Block undesired requests that match the provided resource types, eg. ‘image’ or ‘script’.

</summary>

One of the following:

"document"

<a href="#">Link to this property</a>

"stylesheet"

<a href="#">Link to this property</a>

"image"

<a href="#">Link to this property</a>

"media"

<a href="#">Link to this property</a>

"font"

<a href="#">Link to this property</a>

"script"

<a href="#">Link to this property</a>

"texttrack"

<a href="#">Link to this property</a>

"xhr"

<a href="#">Link to this property</a>

"fetch"

<a href="#">Link to this property</a>

"prefetch"

<a href="#">Link to this property</a>

"eventsource"

<a href="#">Link to this property</a>

"websocket"

<a href="#">Link to this property</a>

"manifest"

<a href="#">Link to this property</a>

"signedexchange"

<a href="#">Link to this property</a>

"ping"

<a href="#">Link to this property</a>

"cspviolationreport"

<a href="#">Link to this property</a>

"preflight"

<a href="#">Link to this property</a>

"other"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

render: optional true

Whether to render the page or fetch static content. True by default.

<a href="#">Link to this property</a>

setExtraHTTPHeaders: optional map\[string]

<a href="#">Link to this property</a>

setJavaScriptEnabled: optional boolean

<a href="#">Link to this property</a>

<details>

<summary>

source: optional "sitemaps"or "links"or "all"

Source of links to crawl. ‘sitemaps’ - only crawl URLs from sitemaps, ‘links’ - only crawl URLs scraped from pages, ‘all’ - crawl both sitemap and scraped links (default).

</summary>

One of the following:

"sitemaps"

<a href="#">Link to this property</a>

"links"

<a href="#">Link to this property</a>

"all"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

viewport: optional object {height, width, deviceScaleFactor, 3 more }

Check <a href="https://pptr.dev/api/puppeteer.page.setviewport">options</a>.

</summary>

height: number

<a href="#">Link to this property</a>

width: number

<a href="#">Link to this property</a>

deviceScaleFactor: optional number

<a href="#">Link to this property</a>

hasTouch: optional boolean

<a href="#">Link to this property</a>

isLandscape: optional boolean

<a href="#">Link to this property</a>

isMobile: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

waitForSelector: optional object {selector, hidden, timeout, visible }

Wait for the selector to appear in page. Check <a href="https://pptr.dev/api/puppeteer.page.waitforselector">options</a>.

</summary>

selector: string

<a href="#">Link to this property</a>

hidden: optional true

<a href="#">Link to this property</a>

timeout: optional number

maximum120000

<a href="#">Link to this property</a>

visible: optional true

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

waitForTimeout: optional number

Waits for a specified timeout before continuing.

maximum120000

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {render, url, contentUse, 9 more }

</summary>

render: false

Whether to render the page or fetch static content. True by default.

<a href="#">Link to this property</a>

url: string

URL to navigate to, eg. <code>https://example.com</code>.

formaturi

<a href="#">Link to this property</a>

<details>

<summary>

contentUse: optional "reference"or "full"

Intended content use level to respect the <code>use</code> Content-Signal directive in robots.txt. Levels (least to most permissive): ‘reference’, ‘full’. A URL is disallowed when the publisher’s declared <code>use</code> level is lower than this intent. Learn more: <a href="https://contentsignals.org/">https://contentsignals.org/</a>. Default: ‘full’.

</summary>

One of the following:

"reference"

<a href="#">Link to this property</a>

"full"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

crawlPurposes: optional array of "search"or "ai-input"or "ai-train"

List of crawl purposes to respect Content-Signal directives in robots.txt. Allowed values: ‘search’, ‘ai-input’, ‘ai-train’. Learn more: <a href="https://contentsignals.org/">https://contentsignals.org/</a>. Default: \[‘search’, ‘ai-input’, ‘ai-train’].

</summary>

One of the following:

"search"

<a href="#">Link to this property</a>

"ai-input"

<a href="#">Link to this property</a>

"ai-train"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

depth: optional number

Maximum number of levels deep the crawler will traverse from the starting URL.

maximum100000

minimum1

<a href="#">Link to this property</a>

<details>

<summary>

formats: optional array of "html"or "markdown"or "json"

Formats to return. Default is <code>html</code>.

</summary>

One of the following:

"html"

<a href="#">Link to this property</a>

"markdown"

<a href="#">Link to this property</a>

"json"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

jsonOptions: optional object {custom\_ai, prompt, response\_format }

Options for JSON extraction.

</summary>

<details>

<summary>

custom\_ai: optional array of object {model, authorization }

Optional list of custom AI models to use for the request. The models will be tried in the order provided, and in case a model returns an error, the next one will be used as fallback.

</summary>

model: string

AI model to use for the request. Must be formed as <code>&lt;provider&gt;/&lt;model_name&gt;</code>, e.g. <code>workers-ai/@cf/meta/llama-3.3-70b-instruct-fp8-fast</code>.

<a href="#">Link to this property</a>

authorization: optional string

Authorization token for the AI model: <code>Bearer &lt;token&gt;</code>. Not needed for workers-ai models.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

prompt: optional string

<a href="#">Link to this property</a>

<details>

<summary>

response\_format: optional object {type, json\_schema }

</summary>

type: string

<a href="#">Link to this property</a>

json\_schema: optional map\[unknown]

Schema for the response format. More information here: <a href="https://developers.cloudflare.com/workers-ai/json-mode/">https://developers.cloudflare.com/workers-ai/json-mode/</a>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

limit: optional number

Maximum number of URLs to crawl.

maximum100000

minimum1

<a href="#">Link to this property</a>

maxAge: optional number

Maximum age of a resource that can be returned from cache in seconds. Default is 1 day.

maximum604800

minimum0

<a href="#">Link to this property</a>

modifiedSince: optional number

Unix timestamp (seconds since epoch) indicating to only crawl pages that were modified since this time. For sitemap URLs with a lastmod field, this is compared directly. For other URLs, the crawler will use If-Modified-Since header when fetching. URLs without modification information (no lastmod in sitemap and no Last-Modified header support) will be crawled. Note: This works in conjunction with maxAge - both filters must pass for a cached resource to be used. Must be within the last year and not in the future.

exclusiveMinimum

minimum0

<a href="#">Link to this property</a>

<details>

<summary>

options: optional object {excludePatterns, includeExternalLinks, includePatterns, includeSubdomains }

Additional options for the crawler.

</summary>

excludePatterns: optional array of string

Exclude links matching the provided wildcard patterns in the crawl job. Example: ‘<a href="https://example.com/privacy/">https://example.com/privacy/</a>\*\*’.

<a href="#">Link to this property</a>

includeExternalLinks: optional boolean

Include external links in the crawl job. If set to true, includeSubdomains is ignored.

<a href="#">Link to this property</a>

includePatterns: optional array of string

Include only links matching the provided wildcard patterns in the crawl job. Include patterns are evaluated before exclude patterns. URLs that match any of the specified include patterns will be included in the crawl job. Example: ‘<a href="https://example.com/blog/">https://example.com/blog/</a>\*\*’.

<a href="#">Link to this property</a>

includeSubdomains: optional boolean

Include links to subdomains in the crawl job. This option is ignored if includeExternalLinks is true.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

source: optional "sitemaps"or "links"or "all"

Source of links to crawl. ‘sitemaps’ - only crawl URLs from sitemaps, ‘links’ - only crawl URLs scraped from pages, ‘all’ - crawl both sitemap and scraped links (default).

</summary>

One of the following:

"sitemaps"

<a href="#">Link to this property</a>

"links"

<a href="#">Link to this property</a>

"all"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20browser_rendering.crawl%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20body%20%3E%20(schema)>)

##### ReturnsExpand Collapse

result: string

Crawl job ID.

[Link to this property](#)%20browser_rendering.crawl%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

Response status.

[Link to this property](#)%20browser_rendering.crawl%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

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

[Link to this property](#)%20browser_rendering.crawl%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

### Crawl websites.

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/browser-rendering/crawl \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "url": "https://example.com"
        }'
```

200 example

429 example

```
{
  "result": "result",
  "success": true,
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ]
}
```

```
{
  "errors": [
    {
      "code": 2001,
      "message": "Rate limit exceeded"
    }
  ],
  "success": false
}
```

##### Returns Examples

200 example

429 example

```
{
  "result": "result",
  "success": true,
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ]
}
```

```
{
  "errors": [
    {
      "code": 2001,
      "message": "Rate limit exceeded"
    }
  ],
  "success": false
}
```