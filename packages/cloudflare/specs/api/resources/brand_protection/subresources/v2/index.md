---
title: V2
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Brand Protection](https://developers.cloudflare.com/api/resources/brand_protection)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# V2

#### V2Queries

##### [Get queries](https://developers.cloudflare.com/api/resources/brand_protection/subresources/v2/subresources/queries/methods/get)

GET/accounts/{account\_id}/cloudforce-one/v2/brand-protection/domain/queries

##### ModelsExpand Collapse

<details>

<summary>

QueryGetResponse = array of object {created, parameters, query\_id, 3 more } or object {created, parameters, query\_id, 3 more }

</summary>

One of the following:

<details>

<summary>

array of object {created, parameters, query\_id, 3 more }

</summary>

created: string

<a href="#">Link to this property</a>

<details>

<summary>

parameters: object {string\_matches, max\_time, min\_time }

</summary>

<details>

<summary>

string\_matches: array of object {pattern }

</summary>

pattern: string

maxLength200

minLength1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

max\_time: optional string

<a href="#">Link to this property</a>

min\_time: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

query\_id: number

<a href="#">Link to this property</a>

query\_tag: string

<a href="#">Link to this property</a>

scan: boolean

<a href="#">Link to this property</a>

updated: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {created, parameters, query\_id, 3 more }

</summary>

created: string

<a href="#">Link to this property</a>

<details>

<summary>

parameters: object {string\_matches, max\_time, min\_time }

</summary>

<details>

<summary>

string\_matches: array of object {pattern }

</summary>

pattern: string

maxLength200

minLength1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

max\_time: optional string

<a href="#">Link to this property</a>

min\_time: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

query\_id: number

<a href="#">Link to this property</a>

query\_tag: string

<a href="#">Link to this property</a>

scan: boolean

<a href="#">Link to this property</a>

updated: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20brand_protection.v2.queries%20%3E%20(model)%20query_get_response%20%3E%20(schema)>)

#### V2Matches

##### [List saved query matches](https://developers.cloudflare.com/api/resources/brand_protection/subresources/v2/subresources/matches/methods/get)

GET/accounts/{account\_id}/cloudforce-one/v2/brand-protection/domain/matches

##### ModelsExpand Collapse

<details>

<summary>

MatchGetResponse object {matches, total }

</summary>

<details>

<summary>

matches: array of object {domain, first\_seen, public\_scans, 6 more }

</summary>

domain: string

<a href="#">Link to this property</a>

first\_seen: string

<a href="#">Link to this property</a>

<details>

<summary>

public\_scans: object {submission\_id }

</summary>

submission\_id: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

registrar: string

<a href="#">Link to this property</a>

scan\_status: string

<a href="#">Link to this property</a>

scan\_submission\_id: number

<a href="#">Link to this property</a>

source: string

<a href="#">Link to this property</a>

dismissed: optional boolean

Whether the match is dismissed. Only present for single-query requests. For multi-query requests, use the dismissed field in each match\_details entry.

<a href="#">Link to this property</a>

<details>

<summary>

match\_details: optional array of object {dismissed, match\_id, query\_id, query\_tag }

Per-match detail objects with query metadata and individual dismissed state. Only present when multiple query\_ids are requested.

</summary>

dismissed: boolean

Individual dismissed state for this specific match.

<a href="#">Link to this property</a>

match\_id: number

<a href="#">Link to this property</a>

query\_id: number

<a href="#">Link to this property</a>

query\_tag: string

Tag associated with the query, if one exists.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

total: number

minimum0

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20brand_protection.v2.matches%20%3E%20(model)%20match_get_response%20%3E%20(schema)>)

#### V2Logos

##### [Insert logo query](https://developers.cloudflare.com/api/resources/brand_protection/subresources/v2/subresources/logos/methods/create)

POST/accounts/{account\_id}/cloudforce-one/v2/brand-protection/logo/queries

##### [Delete logo query](https://developers.cloudflare.com/api/resources/brand_protection/subresources/v2/subresources/logos/methods/delete)

DELETE/accounts/{account\_id}/cloudforce-one/v2/brand-protection/logo/queries/{query\_id}

##### [Get logo queries](https://developers.cloudflare.com/api/resources/brand_protection/subresources/v2/subresources/logos/methods/get)

GET/accounts/{account\_id}/cloudforce-one/v2/brand-protection/logo/queries

##### ModelsExpand Collapse

<details>

<summary>

LogoCreateResponse object {message, success, query\_id }

</summary>

message: string

<a href="#">Link to this property</a>

success: boolean

<a href="#">Link to this property</a>

query\_id: optional number

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20brand_protection.v2.logos%20%3E%20(model)%20logo_create_response%20%3E%20(schema)>)

<details>

<summary>

LogoDeleteResponse object {message, success }

</summary>

message: string

<a href="#">Link to this property</a>

success: boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20brand_protection.v2.logos%20%3E%20(model)%20logo_delete_response%20%3E%20(schema)>)

<details>

<summary>

LogoGetResponse = array of object {id, r2\_path, similarity\_threshold, 4 more }

</summary>

id: number

<a href="#">Link to this property</a>

r2\_path: string

<a href="#">Link to this property</a>

similarity\_threshold: number

<a href="#">Link to this property</a>

tag: string

<a href="#">Link to this property</a>

uploaded\_at: string

<a href="#">Link to this property</a>

content\_type: optional string

MIME type of the image (only present when download=true)

<a href="#">Link to this property</a>

image\_data: optional string

Base64-encoded image data (only present when download=true)

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20brand_protection.v2.logos%20%3E%20(model)%20logo_get_response%20%3E%20(schema)>)

#### V2Logo Matches

##### [List logo matches](https://developers.cloudflare.com/api/resources/brand_protection/subresources/v2/subresources/logo_matches/methods/get)

GET/accounts/{account\_id}/cloudforce-one/v2/brand-protection/logo/matches

##### ModelsExpand Collapse

<details>

<summary>

LogoMatchGetResponse object {matches, total }

</summary>

<details>

<summary>

matches: array of object {id, domain, matched\_at, 6 more }

</summary>

id: number

<a href="#">Link to this property</a>

domain: string

<a href="#">Link to this property</a>

matched\_at: string

<a href="#">Link to this property</a>

query\_id: number

<a href="#">Link to this property</a>

registrar: string

<a href="#">Link to this property</a>

similarity\_score: number

<a href="#">Link to this property</a>

url\_scan\_id: string

<a href="#">Link to this property</a>

content\_type: optional string

<a href="#">Link to this property</a>

image\_data: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

total: number

minimum0

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20brand_protection.v2.logo_matches%20%3E%20(model)%20logo_match_get_response%20%3E%20(schema)>)