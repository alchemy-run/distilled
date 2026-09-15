---
title: Scripts
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Page Shield](https://developers.cloudflare.com/api/resources/page_shield)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Scripts

##### [List detected scripts](https://developers.cloudflare.com/api/resources/page_shield/subresources/scripts/methods/list)

GET/zones/{zone\_id}/page\_shield/scripts

##### [Get a detected script](https://developers.cloudflare.com/api/resources/page_shield/subresources/scripts/methods/get)

GET/zones/{zone\_id}/page\_shield/scripts/{script\_id}

##### ModelsExpand Collapse

<details>

<summary>

ScriptListResponse object {id, added\_at, first\_seen\_at, 18 more }

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

</details>

[Link to this property](#)%20page_shield.scripts%20%3E%20(model)%20script_list_response%20%3E%20(schema)>)

<details>

<summary>

ScriptGetResponse object {id, added\_at, first\_seen\_at, 19 more }

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

[Link to this property](#)%20page_shield.scripts%20%3E%20(model)%20script_get_response%20%3E%20(schema)>)