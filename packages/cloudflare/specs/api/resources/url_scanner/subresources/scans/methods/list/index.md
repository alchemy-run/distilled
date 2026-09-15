---
title: Search URL scans
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[URL Scanner](https://developers.cloudflare.com/api/resources/url_scanner)

[Scans](https://developers.cloudflare.com/api/resources/url_scanner/subresources/scans)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Search URL scans

GET/accounts/{account\_id}/urlscanner/v2/search

Use a subset of ElasticSearch Query syntax to filter scans. Some example queries:  
  
\- ‘path:“/bundles/jquery.js”’: Searches for scans who requested resources with the given path.  
\- ‘page.asn:AS24940 AND hash:xxx’: Websites hosted in AS24940 where a resource with the given hash was downloaded.  
\- ‘page.domain:microsoft\* AND verdicts.malicious:true AND NOT page.domain:microsoft.com’: malicious scans whose hostname starts with “microsoft”.  
\- ‘apikey:me AND date:\[2025-01 TO 2025-02]’: my scans from 2025 January to 2025 February.

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

[Link to this property](#)%20url_scanner.scans%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

q: optional string

Filter scans

[Link to this property](#)%20url_scanner.scans%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20q%20%3E%20(schema)>)

size: optional number

Limit the number of objects in the response.

[Link to this property](#)%20url_scanner.scans%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20size%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

results: array of object {\_id, page, result, 3 more }

</summary>

\_id: string

<a href="#">Link to this property</a>

<details>

<summary>

page: object {asn, country, ip, url }

</summary>

asn: string

<a href="#">Link to this property</a>

country: string

<a href="#">Link to this property</a>

ip: string

<a href="#">Link to this property</a>

url: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

result: string

<a href="#">Link to this property</a>

<details>

<summary>

stats: object {dataLength, requests, uniqCountries, uniqIPs }

</summary>

dataLength: number

<a href="#">Link to this property</a>

requests: number

<a href="#">Link to this property</a>

uniqCountries: number

<a href="#">Link to this property</a>

uniqIPs: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

task: object {time, url, uuid, visibility }

</summary>

time: string

<a href="#">Link to this property</a>

url: string

<a href="#">Link to this property</a>

uuid: string

<a href="#">Link to this property</a>

visibility: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

verdicts: object {malicious }

</summary>

malicious: boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20url_scanner.scans%20%3E%20(model)%20scan_list_response%20%3E%20(schema)%20%3E%20(property)%20results>)

### Search URL scans

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/urlscanner/v2/search \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "results": [
    {
      "_id": "9626f773-9ffb-4cfb-89d3-30b120fc8011",
      "page": {
        "asn": "AS15133",
        "country": "US",
        "ip": "93.184.215.14",
        "url": "https://example.com"
      },
      "result": "https://radar.clouflare.com/scan/9626f773-9ffb-4cfb-89d3-30b120fc8011",
      "stats": {
        "dataLength": 2512,
        "requests": 2,
        "uniqCountries": 1,
        "uniqIPs": 1
      },
      "task": {
        "time": "2024-09-30T23:54:02.881Z",
        "url": "https://example.com",
        "uuid": "9626f773-9ffb-4cfb-89d3-30b120fc8011",
        "visibility": "public"
      },
      "verdicts": {
        "malicious": true
      }
    }
  ]
}
```

##### Returns Examples

200 example

```
{
  "results": [
    {
      "_id": "9626f773-9ffb-4cfb-89d3-30b120fc8011",
      "page": {
        "asn": "AS15133",
        "country": "US",
        "ip": "93.184.215.14",
        "url": "https://example.com"
      },
      "result": "https://radar.clouflare.com/scan/9626f773-9ffb-4cfb-89d3-30b120fc8011",
      "stats": {
        "dataLength": 2512,
        "requests": 2,
        "uniqCountries": 1,
        "uniqIPs": 1
      },
      "task": {
        "time": "2024-09-30T23:54:02.881Z",
        "url": "https://example.com",
        "uuid": "9626f773-9ffb-4cfb-89d3-30b120fc8011",
        "visibility": "public"
      },
      "verdicts": {
        "malicious": true
      }
    }
  ]
}
```