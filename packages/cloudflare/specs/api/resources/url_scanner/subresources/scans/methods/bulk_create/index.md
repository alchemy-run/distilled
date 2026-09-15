---
title: Bulk create URL Scans
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[URL Scanner](https://developers.cloudflare.com/api/resources/url_scanner)

[Scans](https://developers.cloudflare.com/api/resources/url_scanner/subresources/scans)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Bulk create URL Scans

POST/accounts/{account\_id}/urlscanner/v2/bulk

Submit URLs to scan. Check limits at https://developers.cloudflare.com/security-center/investigate/scan-limits/ and take into account scans submitted in bulk have lower priority and may take longer to finish.

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

[Link to this property](#)%20url_scanner.scans%20%3E%20(method)%20bulk_create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

<details>

<summary>

body: optional array of object {url, agentReadiness, customagent, 4 more }

List of urls to scan (up to a 100).

</summary>

url: string

<a href="#">Link to this property</a>

agentReadiness: optional boolean

Enable agent readiness checks.

<a href="#">Link to this property</a>

customagent: optional string

maxLength4096

<a href="#">Link to this property</a>

customHeaders: optional map\[string]

Set custom headers.

<a href="#">Link to this property</a>

referer: optional string

maxLength4096

<a href="#">Link to this property</a>

<details>

<summary>

screenshotsResolutions: optional array of "desktop"or "mobile"or "tablet"

Take multiple screenshots targeting different device types.

</summary>

One of the following:

"desktop"

<a href="#">Link to this property</a>

"mobile"

<a href="#">Link to this property</a>

"tablet"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

visibility: optional "Public"or "Unlisted"

The option <code>Public</code> means it will be included in listings like recent scans and search results. <code>Unlisted</code> means it will not be included in the aforementioned listings, users will need to have the scan’s ID to access it. A a scan will be automatically marked as unlisted if it fails, if it contains potential PII or other sensitive material.

</summary>

One of the following:

"Public"

<a href="#">Link to this property</a>

"Unlisted"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20url_scanner.scans%20%3E%20(method)%20bulk_create%20%3E%20(params)%200%20%3E%20(param)%20body%20%3E%20(schema)>)

##### ReturnsExpand Collapse

api: string

URL to api report.

[Link to this property](#)%20url_scanner.scans%20%3E%20(model)%20scan_bulk_create_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20api>)

result: string

URL to report.

[Link to this property](#)%20url_scanner.scans%20%3E%20(model)%20scan_bulk_create_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20result>)

url: string

Submitted URL

[Link to this property](#)%20url_scanner.scans%20%3E%20(model)%20scan_bulk_create_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20url>)

uuid: string

Scan ID.

formatuuid

[Link to this property](#)%20url_scanner.scans%20%3E%20(model)%20scan_bulk_create_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20uuid>)

<details>

<summary>

visibility: "public"or "unlisted"

Submitted visibility status.

</summary>

One of the following:

"public"

<a href="#">Link to this property</a>

"unlisted"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20url_scanner.scans%20%3E%20(model)%20scan_bulk_create_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20visibility>)

<details>

<summary>

options: optional object {useragent }

</summary>

useragent: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20url_scanner.scans%20%3E%20(model)%20scan_bulk_create_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20options>)

### Bulk create URL Scans

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/urlscanner/v2/bulk \
    -X POST \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
[
  {
    "api": "api",
    "result": "result",
    "url": "url",
    "uuid": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "visibility": "public",
    "options": {
      "useragent": "useragent"
    }
  }
]
```

##### Returns Examples

200 example

```
[
  {
    "api": "api",
    "result": "result",
    "url": "url",
    "uuid": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "visibility": "public",
    "options": {
      "useragent": "useragent"
    }
  }
]
```