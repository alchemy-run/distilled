---
title: Get PDF.
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Browser Rendering](https://developers.cloudflare.com/api/resources/browser_rendering)

[PDF](https://developers.cloudflare.com/api/resources/browser_rendering/subresources/pdf)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get PDF.

POST/accounts/{account\_id}/browser-rendering/pdf

Fetches rendered PDF from provided URL or HTML. Check available options like `gotoOptions` and `waitFor*` to control page load behaviour.

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

[Link to this property](#)%20browser_rendering.pdf%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

cacheTTL: optional number

Cache TTL default is 5s. Set to 0 to disable.

maximum86400

minimum0

[Link to this property](#)%20browser_rendering.pdf%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20cacheTTL%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

actionTimeout: optional number

The maximum duration allowed for the browser action to complete after the page has loaded (such as taking screenshots, extracting content, or generating PDFs). If this time limit is exceeded, the action stops and returns a timeout error.

maximum120000

[Link to this property](#)%20browser_rendering.pdf%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20actionTimeout%20%3E%20(schema)>)

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

[Link to this property](#)%20browser_rendering.pdf%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20addScriptTag%20%3E%20(schema)>)

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

[Link to this property](#)%20browser_rendering.pdf%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20addStyleTag%20%3E%20(schema)>)

allowRequestPattern: optional array of string

Only allow requests that match the provided regex patterns, eg. ’/^.\*.(css)’. Reject rules are applied first.

[Link to this property](#)%20browser_rendering.pdf%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20allowRequestPattern%20%3E%20(schema)>)

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

[Link to this property](#)%20browser_rendering.pdf%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20allowResourceTypes%20%3E%20(schema)>)

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

[Link to this property](#)%20browser_rendering.pdf%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20authenticate%20%3E%20(schema)>)

bestAttempt: optional boolean

Attempt to proceed when ‘awaited’ events fail or timeout.

[Link to this property](#)%20browser_rendering.pdf%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20bestAttempt%20%3E%20(schema)>)

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

[Link to this property](#)%20browser_rendering.pdf%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20cookies%20%3E%20(schema)>)

emulateMediaType: optional string

[Link to this property](#)%20browser_rendering.pdf%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20emulateMediaType%20%3E%20(schema)>)

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

[Link to this property](#)%20browser_rendering.pdf%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20gotoOptions%20%3E%20(schema)>)

html: optional string

Set the content of the page, eg: `<h1>Hello World!!</h1>`. Either `html` or `url` must be set.

minLength1

[Link to this property](#)%20browser_rendering.pdf%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20html%20%3E%20(schema)>)

<details>

<summary>

pdfOptions: optional object {displayHeaderFooter, footerTemplate, format, 13 more }

Check <a href="https://pptr.dev/api/puppeteer.pdfoptions">options</a>.

</summary>

displayHeaderFooter: optional boolean

Whether to show the header and footer.

<a href="#">Link to this property</a>

footerTemplate: optional string

HTML template for the print footer.

<a href="#">Link to this property</a>

<details>

<summary>

format: optional "letter"or "legal"or "tabloid"or 8 more

Paper format. Takes priority over width and height if set.

</summary>

One of the following:

"letter"

<a href="#">Link to this property</a>

"legal"

<a href="#">Link to this property</a>

"tabloid"

<a href="#">Link to this property</a>

"ledger"

<a href="#">Link to this property</a>

"a0"

<a href="#">Link to this property</a>

"a1"

<a href="#">Link to this property</a>

"a2"

<a href="#">Link to this property</a>

"a3"

<a href="#">Link to this property</a>

"a4"

<a href="#">Link to this property</a>

"a5"

<a href="#">Link to this property</a>

"a6"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

headerTemplate: optional string

HTML template for the print header.

<a href="#">Link to this property</a>

<details>

<summary>

height: optional stringor number

Sets the height of paper. Can be a number or string with unit.

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

landscape: optional boolean

Whether to print in landscape orientation.

<a href="#">Link to this property</a>

<details>

<summary>

margin: optional object {bottom, left, right, top }

Set the PDF margins. Useful when setting header and footer.

</summary>

<details>

<summary>

bottom: optional stringor number

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

left: optional stringor number

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

right: optional stringor number

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

top: optional stringor number

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

omitBackground: optional boolean

Hides default white background and allows generating pdfs with transparency.

<a href="#">Link to this property</a>

outline: optional boolean

Generate document outline.

<a href="#">Link to this property</a>

pageRanges: optional string

Paper ranges to print, e.g. ‘1-5, 8, 11-13’.

<a href="#">Link to this property</a>

preferCSSPageSize: optional boolean

Give CSS @page size priority over other size declarations.

<a href="#">Link to this property</a>

printBackground: optional boolean

Set to true to print background graphics.

<a href="#">Link to this property</a>

scale: optional number

Scales the rendering of the web page. Amount must be between 0.1 and 2.

maximum2

minimum0.1

<a href="#">Link to this property</a>

tagged: optional boolean

Generate tagged (accessible) PDF.

<a href="#">Link to this property</a>

timeout: optional number

Timeout in milliseconds.

<a href="#">Link to this property</a>

<details>

<summary>

width: optional stringor number

Sets the width of paper. Can be a number or string with unit.

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20browser_rendering.pdf%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20pdfOptions%20%3E%20(schema)>)

rejectRequestPattern: optional array of string

Block undesired requests that match the provided regex patterns, eg. ’/^.\*.(css)’.

[Link to this property](#)%20browser_rendering.pdf%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20rejectRequestPattern%20%3E%20(schema)>)

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

[Link to this property](#)%20browser_rendering.pdf%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20rejectResourceTypes%20%3E%20(schema)>)

setExtraHTTPHeaders: optional map\[string]

[Link to this property](#)%20browser_rendering.pdf%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20setExtraHTTPHeaders%20%3E%20(schema)>)

setJavaScriptEnabled: optional boolean

[Link to this property](#)%20browser_rendering.pdf%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20setJavaScriptEnabled%20%3E%20(schema)>)

url: optional string

URL to navigate to, eg. `https://example.com`.

formaturi

[Link to this property](#)%20browser_rendering.pdf%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20url%20%3E%20(schema)>)

userAgent: optional string

[Link to this property](#)%20browser_rendering.pdf%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20userAgent%20%3E%20(schema)>)

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

[Link to this property](#)%20browser_rendering.pdf%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20viewport%20%3E%20(schema)>)

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

[Link to this property](#)%20browser_rendering.pdf%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20waitForSelector%20%3E%20(schema)>)

waitForTimeout: optional number

Waits for a specified timeout before continuing.

maximum120000

[Link to this property](#)%20browser_rendering.pdf%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20waitForTimeout%20%3E%20(schema)>)

### Get PDF.

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/browser-rendering/pdf \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "html": "<h1>Hello World!</h1>",
          "url": "https://www.example.com/"
        }'
```

429 example

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

429 example

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