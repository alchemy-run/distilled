---
title: Get URL scan's HAR
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[URL Scanner](https://developers.cloudflare.com/api/resources/url_scanner)

[Scans](https://developers.cloudflare.com/api/resources/url_scanner/subresources/scans)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get URL scan's HAR

GET/accounts/{account\_id}/urlscanner/v2/har/{scan\_id}

Get a URL scan’s HAR file. See HAR spec at http://www.softwareishard.com/blog/har-12-spec/.

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

`URL Scanner Write``URL Scanner Read`

##### P ath ParametersExpand Collapse

account\_id: string

Account ID.

[Link to this property](#)%20url_scanner.scans%20%3E%20(method)%20har%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

scan\_id: string

Scan UUID.

formatuuid

[Link to this property](#)%20url_scanner.scans%20%3E%20(method)%20har%20%3E%20(params)%20default%20%3E%20(param)%20scan_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

log: object {creator, entries, pages, version }

</summary>

<details>

<summary>

creator: object {comment, name, version }

</summary>

comment: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

version: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

entries: array of object {\_initialPriority, \_initiator\_type, \_priority, 11 more }

</summary>

\_initialPriority: string

<a href="#">Link to this property</a>

\_initiator\_type: string

<a href="#">Link to this property</a>

\_priority: string

<a href="#">Link to this property</a>

\_requestId: string

<a href="#">Link to this property</a>

\_requestTime: number

<a href="#">Link to this property</a>

\_resourceType: string

<a href="#">Link to this property</a>

cache: unknown

<a href="#">Link to this property</a>

connection: string

<a href="#">Link to this property</a>

pageref: string

<a href="#">Link to this property</a>

<details>

<summary>

request: object {bodySize, headers, headersSize, 3 more }

</summary>

bodySize: number

<a href="#">Link to this property</a>

<details>

<summary>

headers: array of object {name, value }

</summary>

name: string

<a href="#">Link to this property</a>

value: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

headersSize: number

<a href="#">Link to this property</a>

httpVersion: string

<a href="#">Link to this property</a>

method: string

<a href="#">Link to this property</a>

url: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

response: object {\_transferSize, bodySize, content, 6 more }

</summary>

\_transferSize: number

<a href="#">Link to this property</a>

bodySize: number

<a href="#">Link to this property</a>

<details>

<summary>

content: object {mimeType, size, compression }

</summary>

mimeType: string

<a href="#">Link to this property</a>

size: number

<a href="#">Link to this property</a>

compression: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

headers: array of object {name, value }

</summary>

name: string

<a href="#">Link to this property</a>

value: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

headersSize: number

<a href="#">Link to this property</a>

httpVersion: string

<a href="#">Link to this property</a>

redirectURL: string

<a href="#">Link to this property</a>

status: number

<a href="#">Link to this property</a>

statusText: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

serverIPAddress: string

<a href="#">Link to this property</a>

startedDateTime: string

<a href="#">Link to this property</a>

time: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

pages: array of object {id, pageTimings, startedDateTime, title }

</summary>

id: string

<a href="#">Link to this property</a>

<details>

<summary>

pageTimings: object {onContentLoad, onLoad }

</summary>

onContentLoad: number

<a href="#">Link to this property</a>

onLoad: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

startedDateTime: string

<a href="#">Link to this property</a>

title: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

version: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20url_scanner.scans%20%3E%20(model)%20scan_har_response%20%3E%20(schema)%20%3E%20(property)%20log>)

### Get URL scan's HAR

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/urlscanner/v2/har/$SCAN_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "log": {
    "creator": {
      "comment": "https://github.com/sitespeedio/chrome-har",
      "name": "chrome-har",
      "version": "0.13.1"
    },
    "entries": [
      {
        "_initialPriority": "VeryHigh",
        "_initiator_type": "other",
        "_priority": "VeryHigh",
        "_requestId": "DDC779F0CB3746BAF283EC1A51B0F2F8",
        "_requestTime": 114135.331081,
        "_resourceType": "document",
        "cache": {},
        "connection": "33",
        "pageref": "page_1",
        "request": {
          "bodySize": 0,
          "headers": [
            {
              "name": "Upgrade-Insecure-Requests",
              "value": "1"
            }
          ],
          "headersSize": 197,
          "httpVersion": "http/1.1",
          "method": "GET",
          "url": "http://example.com/"
        },
        "response": {
          "_transferSize": 1071,
          "bodySize": 648,
          "content": {
            "mimeType": "text/html",
            "size": 1256,
            "compression": 608
          },
          "headers": [
            {
              "name": "Content-Encoding",
              "value": "gzip"
            }
          ],
          "headersSize": 423,
          "httpVersion": "http/1.1",
          "redirectURL": "redirectURL",
          "status": 200,
          "statusText": "OK"
        },
        "serverIPAddress": "2606:2800:220:1:248:1893:25c8:1946",
        "startedDateTime": "2023-05-03T17:05:13.196Z",
        "time": 268.64
      }
    ],
    "pages": [
      {
        "id": "page_1",
        "pageTimings": {
          "onContentLoad": 305.408,
          "onLoad": 305.169
        },
        "startedDateTime": "2023-05-03T17:05:13.195Z",
        "title": "http://example.com/"
      }
    ],
    "version": "1.2"
  }
}
```

##### Returns Examples

200 example

```
{
  "log": {
    "creator": {
      "comment": "https://github.com/sitespeedio/chrome-har",
      "name": "chrome-har",
      "version": "0.13.1"
    },
    "entries": [
      {
        "_initialPriority": "VeryHigh",
        "_initiator_type": "other",
        "_priority": "VeryHigh",
        "_requestId": "DDC779F0CB3746BAF283EC1A51B0F2F8",
        "_requestTime": 114135.331081,
        "_resourceType": "document",
        "cache": {},
        "connection": "33",
        "pageref": "page_1",
        "request": {
          "bodySize": 0,
          "headers": [
            {
              "name": "Upgrade-Insecure-Requests",
              "value": "1"
            }
          ],
          "headersSize": 197,
          "httpVersion": "http/1.1",
          "method": "GET",
          "url": "http://example.com/"
        },
        "response": {
          "_transferSize": 1071,
          "bodySize": 648,
          "content": {
            "mimeType": "text/html",
            "size": 1256,
            "compression": 608
          },
          "headers": [
            {
              "name": "Content-Encoding",
              "value": "gzip"
            }
          ],
          "headersSize": 423,
          "httpVersion": "http/1.1",
          "redirectURL": "redirectURL",
          "status": 200,
          "statusText": "OK"
        },
        "serverIPAddress": "2606:2800:220:1:248:1893:25c8:1946",
        "startedDateTime": "2023-05-03T17:05:13.196Z",
        "time": 268.64
      }
    ],
    "pages": [
      {
        "id": "page_1",
        "pageTimings": {
          "onContentLoad": 305.408,
          "onLoad": 305.169
        },
        "startedDateTime": "2023-05-03T17:05:13.195Z",
        "title": "http://example.com/"
      }
    ],
    "version": "1.2"
  }
}
```