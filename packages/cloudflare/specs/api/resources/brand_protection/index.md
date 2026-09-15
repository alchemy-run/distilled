---
title: Brand Protection
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Brand Protection

##### [Create new URL submissions](https://developers.cloudflare.com/api/resources/brand_protection/methods/submit)

POST/accounts/{account\_id}/brand-protection/submit

##### [Read submitted URLs by ID](https://developers.cloudflare.com/api/resources/brand_protection/methods/url_info)

GET/accounts/{account\_id}/brand-protection/url-info

##### ModelsExpand Collapse

<details>

<summary>

Info object {categorizations, model\_results, rule\_matches, 4 more }

</summary>

<details>

<summary>

categorizations: optional array of object {category, verification\_status }

List of categorizations applied to this submission.

</summary>

category: optional string

Name of the category applied.

<a href="#">Link to this property</a>

verification\_status: optional string

Result of human review for this categorization.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

model\_results: optional array of object {model\_name, model\_score }

List of model results for completed scans.

</summary>

model\_name: optional string

Name of the model.

<a href="#">Link to this property</a>

model\_score: optional number

This is the score that is outputted by the model for this submission.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

rule\_matches: optional array of object {banning, blocking, description, name }

List of signatures that matched against site content found when crawling the URL.

</summary>

banning: optional boolean

For internal use.

<a href="#">Link to this property</a>

blocking: optional boolean

For internal use.

<a href="#">Link to this property</a>

description: optional string

Description of the signature that matched.

<a href="#">Link to this property</a>

name: optional string

Name of the signature that matched.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

scan\_status: optional object {last\_processed, scan\_complete, status\_code, submission\_id }

Status of the most recent scan found.

</summary>

last\_processed: optional string

Timestamp of when the submission was processed.

<a href="#">Link to this property</a>

scan\_complete: optional boolean

For internal use.

<a href="#">Link to this property</a>

status\_code: optional number

Status code that the crawler received when loading the submitted URL.

<a href="#">Link to this property</a>

submission\_id: optional number

ID of the most recent submission.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

screenshot\_download\_signature: optional string

For internal use.

<a href="#">Link to this property</a>

screenshot\_path: optional string

For internal use.

<a href="#">Link to this property</a>

url: optional string

URL that was submitted.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20brand_protection%20%3E%20(model)%20info%20%3E%20(schema)>)

<details>

<summary>

Submit object {excluded\_urls, skipped\_urls, submitted\_urls }

</summary>

<details>

<summary>

excluded\_urls: optional array of object {url }

URLs that were excluded from scanning because their domain is in our no-scan list.

</summary>

url: optional string

URL that was excluded.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

skipped\_urls: optional array of object {url, url\_id }

URLs that were skipped because the same URL is currently being scanned.

</summary>

url: optional string

URL that was skipped.

<a href="#">Link to this property</a>

url\_id: optional number

ID of the submission of that URL that is currently scanning.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

submitted\_urls: optional array of object {url, url\_id }

URLs that were successfully submitted for scanning.

</summary>

url: optional string

URL that was submitted.

<a href="#">Link to this property</a>

url\_id: optional number

ID assigned to this URL submission. Used to retrieve scanning results.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20brand_protection%20%3E%20(model)%20submit%20%3E%20(schema)>)

<details>

<summary>

BrandProtectionSubmitResponse object {skipped\_urls, submitted\_urls }

</summary>

skipped\_urls: optional array of map\[unknown]

<a href="#">Link to this property</a>

submitted\_urls: optional array of map\[unknown]

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20brand_protection%20%3E%20(model)%20brand_protection_submit_response%20%3E%20(schema)>)

BrandProtectionURLInfoResponse = map\[unknown]

[Link to this property](#)%20brand_protection%20%3E%20(model)%20brand_protection_url_info_response%20%3E%20(schema)>)

#### Brand ProtectionQueries

##### [Create new saved string queries](https://developers.cloudflare.com/api/resources/brand_protection/subresources/queries/methods/create)

POST/accounts/{account\_id}/brand-protection/queries

##### [Delete saved string queries by ID](https://developers.cloudflare.com/api/resources/brand_protection/subresources/queries/methods/delete)

DELETE/accounts/{account\_id}/brand-protection/queries

##### [Create new saved string queries in bulk](https://developers.cloudflare.com/api/resources/brand_protection/subresources/queries/methods/bulk)

POST/accounts/{account\_id}/brand-protection/queries/bulk

#### Brand ProtectionMatches

##### [Read matches for string queries by ID](https://developers.cloudflare.com/api/resources/brand_protection/subresources/matches/methods/get)

GET/accounts/{account\_id}/brand-protection/matches

##### [Download matches for string queries by ID](https://developers.cloudflare.com/api/resources/brand_protection/subresources/matches/methods/download)

GET/accounts/{account\_id}/brand-protection/matches/download

##### ModelsExpand Collapse

<details>

<summary>

MatchGetResponse object {matches, total }

</summary>

matches: optional array of map\[unknown]

<a href="#">Link to this property</a>

total: optional number

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20brand_protection.matches%20%3E%20(model)%20match_get_response%20%3E%20(schema)>)

<details>

<summary>

MatchDownloadResponse object {matches, total }

</summary>

matches: optional array of map\[unknown]

<a href="#">Link to this property</a>

total: optional number

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20brand_protection.matches%20%3E%20(model)%20match_download_response%20%3E%20(schema)>)

#### Brand ProtectionLogos

##### [Create new saved logo queries from image files](https://developers.cloudflare.com/api/resources/brand_protection/subresources/logos/methods/create)

POST/accounts/{account\_id}/brand-protection/logos

##### [Delete saved logo queries by ID](https://developers.cloudflare.com/api/resources/brand_protection/subresources/logos/methods/delete)

DELETE/accounts/{account\_id}/brand-protection/logos/{logo\_id}

##### ModelsExpand Collapse

<details>

<summary>

LogoCreateResponse object {id, tag, upload\_path }

</summary>

id: optional number

<a href="#">Link to this property</a>

tag: optional string

<a href="#">Link to this property</a>

upload\_path: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20brand_protection.logos%20%3E%20(model)%20logo_create_response%20%3E%20(schema)>)

#### Brand ProtectionLogo Matches

##### [Read matches for logo queries by ID](https://developers.cloudflare.com/api/resources/brand_protection/subresources/logo_matches/methods/get)

GET/accounts/{account\_id}/brand-protection/logo-matches

##### [Download matches for logo queries by ID](https://developers.cloudflare.com/api/resources/brand_protection/subresources/logo_matches/methods/download)

GET/accounts/{account\_id}/brand-protection/logo-matches/download

##### ModelsExpand Collapse

<details>

<summary>

LogoMatchGetResponse object {matches, total }

</summary>

matches: optional array of map\[unknown]

<a href="#">Link to this property</a>

total: optional number

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20brand_protection.logo_matches%20%3E%20(model)%20logo_match_get_response%20%3E%20(schema)>)

<details>

<summary>

LogoMatchDownloadResponse object {matches, total }

</summary>

matches: optional array of map\[unknown]

<a href="#">Link to this property</a>

total: optional number

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20brand_protection.logo_matches%20%3E%20(model)%20logo_match_download_response%20%3E%20(schema)>)

#### Brand ProtectionV2

#### Brand ProtectionV2Queries

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

#### Brand ProtectionV2Matches

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

#### Brand ProtectionV2Logos

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

#### Brand ProtectionV2Logo Matches

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