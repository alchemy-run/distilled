---
title: Get a detected script
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Page Shield](https://developers.cloudflare.com/api/resources/page_shield)

[Scripts](https://developers.cloudflare.com/api/resources/page_shield/subresources/scripts)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get a detected script

GET/zones/{zone\_id}/page\_shield/scripts/{script\_id}

Returns a script detected on the zone by script ID.

##### Security

API Email + API Key

The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**`X-Auth-Email: user@example.com`

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**`X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194`

##### Accepted Permissions (at least one required)

`Page Shield``Domain Page Shield Read``Domain Page Shield``Page Shield Read``Zone Settings Write``Zone Settings Read`

##### P ath ParametersExpand Collapse

zone\_id: string

Identifier

maxLength32

[Link to this property](#)%20page_shield.scripts%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

script\_id: string

Identifier

maxLength32

[Link to this property](#)%20page_shield.scripts%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20script_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {id, added\_at, first\_seen\_at, 19 more }

</summary>

id: string

Identifier

maxLength32

<a href="#">Link to this property</a>

added\_at: string

formatdate-time

<a href="#">Link to this property</a>

first\_seen\_at: string

formatdate-time

<a href="#">Link to this property</a>

host: string

<a href="#">Link to this property</a>

last\_seen\_at: string

formatdate-time

<a href="#">Link to this property</a>

url: string

<a href="#">Link to this property</a>

url\_contains\_cdn\_cgi\_path: boolean

<a href="#">Link to this property</a>

cryptomining\_score: optional number

The cryptomining score of the JavaScript content.

maximum99

minimum1

<a href="#">Link to this property</a>

Deprecateddataflow\_score: optional number

The dataflow score of the JavaScript content. This field has been deprecated in favour of js\_integrity\_score.

maximum99

minimum1

<a href="#">Link to this property</a>

domain\_reported\_malicious: optional boolean

<a href="#">Link to this property</a>

fetched\_at: optional string

The timestamp of when the script was last fetched.

<a href="#">Link to this property</a>

first\_page\_url: optional string

<a href="#">Link to this property</a>

hash: optional string

The computed hash of the analyzed script.

maxLength64

minLength64

<a href="#">Link to this property</a>

js\_integrity\_score: optional number

The integrity score of the JavaScript content.

maximum99

minimum1

<a href="#">Link to this property</a>

magecart\_score: optional number

The magecart score of the JavaScript content.

maximum99

minimum1

<a href="#">Link to this property</a>

malicious\_domain\_categories: optional array of string

<a href="#">Link to this property</a>

malicious\_url\_categories: optional array of string

<a href="#">Link to this property</a>

malware\_score: optional number

The malware score of the JavaScript content.

maximum99

minimum1

<a href="#">Link to this property</a>

Deprecatedobfuscation\_score: optional number

The obfuscation score of the JavaScript content. This field has been deprecated in favour of js\_integrity\_score.

maximum99

minimum1

<a href="#">Link to this property</a>

page\_urls: optional array of string

<a href="#">Link to this property</a>

url\_reported\_malicious: optional boolean

<a href="#">Link to this property</a>

<details>

<summary>

versions: optional array of object {cryptomining\_score, dataflow\_score, fetched\_at, 5 more }

</summary>

cryptomining\_score: optional number

The cryptomining score of the JavaScript content.

maximum99

minimum1

<a href="#">Link to this property</a>

Deprecateddataflow\_score: optional number

The dataflow score of the JavaScript content. This field has been deprecated in favour of js\_integrity\_score.

maximum99

minimum1

<a href="#">Link to this property</a>

fetched\_at: optional string

The timestamp of when the script was last fetched.

<a href="#">Link to this property</a>

hash: optional string

The computed hash of the analyzed script.

maxLength64

minLength64

<a href="#">Link to this property</a>

js\_integrity\_score: optional number

The integrity score of the JavaScript content.

maximum99

minimum1

<a href="#">Link to this property</a>

magecart\_score: optional number

The magecart score of the JavaScript content.

maximum99

minimum1

<a href="#">Link to this property</a>

malware\_score: optional number

The malware score of the JavaScript content.

maximum99

minimum1

<a href="#">Link to this property</a>

Deprecatedobfuscation\_score: optional number

The obfuscation score of the JavaScript content. This field has been deprecated in favour of js\_integrity\_score.

maximum99

minimum1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20page_shield.scripts%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful

[Link to this property](#)%20page_shield.scripts%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

errors: optional array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20response_info%20%3E%20(schema)">ResponseInfo</a> { code, message, documentation\_url, source }

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

[Link to this property](#)%20page_shield.scripts%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: optional array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20response_info%20%3E%20(schema)">ResponseInfo</a> { code, message, documentation\_url, source }

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

[Link to this property](#)%20page_shield.scripts%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

### Get a detected script

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/page_shield/scripts/$SCRIPT_ID \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
```

200 example

```
{
  "result": {
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "added_at": "2021-08-18T10:51:10.09615Z",
    "first_seen_at": "2021-08-18T10:51:08Z",
    "host": "blog.cloudflare.com",
    "last_seen_at": "2021-09-02T09:57:54Z",
    "url": "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.0/js/bootstrap.min.js",
    "url_contains_cdn_cgi_path": false,
    "cryptomining_score": 1,
    "dataflow_score": 1,
    "domain_reported_malicious": false,
    "fetched_at": "fetched_at",
    "first_page_url": "blog.cloudflare.com/page",
    "hash": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "js_integrity_score": 1,
    "magecart_score": 1,
    "malicious_domain_categories": [
      "Malware"
    ],
    "malicious_url_categories": [
      "Malware"
    ],
    "malware_score": 1,
    "obfuscation_score": 1,
    "page_urls": [
      "blog.cloudflare.com/page1",
      "blog.cloudflare.com/page2"
    ],
    "url_reported_malicious": false,
    "versions": [
      {
        "cryptomining_score": 20,
        "dataflow_score": 1,
        "fetched_at": "2021-08-18T10:51:08Z",
        "hash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b423",
        "js_integrity_score": 2,
        "magecart_score": 10,
        "malware_score": 5,
        "obfuscation_score": 1
      }
    ]
  },
  "success": true,
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
  ]
}
```

##### Returns Examples

200 example

```
{
  "result": {
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "added_at": "2021-08-18T10:51:10.09615Z",
    "first_seen_at": "2021-08-18T10:51:08Z",
    "host": "blog.cloudflare.com",
    "last_seen_at": "2021-09-02T09:57:54Z",
    "url": "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.0/js/bootstrap.min.js",
    "url_contains_cdn_cgi_path": false,
    "cryptomining_score": 1,
    "dataflow_score": 1,
    "domain_reported_malicious": false,
    "fetched_at": "fetched_at",
    "first_page_url": "blog.cloudflare.com/page",
    "hash": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "js_integrity_score": 1,
    "magecart_score": 1,
    "malicious_domain_categories": [
      "Malware"
    ],
    "malicious_url_categories": [
      "Malware"
    ],
    "malware_score": 1,
    "obfuscation_score": 1,
    "page_urls": [
      "blog.cloudflare.com/page1",
      "blog.cloudflare.com/page2"
    ],
    "url_reported_malicious": false,
    "versions": [
      {
        "cryptomining_score": 20,
        "dataflow_score": 1,
        "fetched_at": "2021-08-18T10:51:08Z",
        "hash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b423",
        "js_integrity_score": 2,
        "magecart_score": 10,
        "malware_score": 5,
        "obfuscation_score": 1
      }
    ]
  },
  "success": true,
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
  ]
}
```