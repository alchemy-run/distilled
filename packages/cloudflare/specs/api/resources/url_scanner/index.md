---
title: URL Scanner
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# URL Scanner

##### ModelsExpand Collapse

<details>

<summary>

URLScannerDomain object {id, name, super\_category\_id }

</summary>

id: number

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

super\_category\_id: optional number

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20url_scanner%20%3E%20(model)%20url_scanner_domain%20%3E%20(schema)>)

<details>

<summary>

URLScannerTask object {effectiveUrl, errors, location, 7 more }

</summary>

effectiveUrl: string

<a href="#">Link to this property</a>

<details>

<summary>

errors: array of object {message }

</summary>

message: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

location: string

<a href="#">Link to this property</a>

region: string

<a href="#">Link to this property</a>

status: string

<a href="#">Link to this property</a>

success: boolean

<a href="#">Link to this property</a>

time: string

<a href="#">Link to this property</a>

url: string

<a href="#">Link to this property</a>

uuid: string

<a href="#">Link to this property</a>

visibility: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20url_scanner%20%3E%20(model)%20url_scanner_task%20%3E%20(schema)>)

#### URL ScannerResponses

##### [Get raw response](https://developers.cloudflare.com/api/resources/url_scanner/subresources/responses/methods/get)

GET/accounts/{account\_id}/urlscanner/v2/responses/{response\_id}

##### ModelsExpand Collapse

ResponseGetResponse = string

Web resource or image.

[Link to this property](#)%20url_scanner.responses%20%3E%20(model)%20response_get_response%20%3E%20(schema)>)

#### URL ScannerScans

##### [Search URL scans](https://developers.cloudflare.com/api/resources/url_scanner/subresources/scans/methods/list)

GET/accounts/{account\_id}/urlscanner/v2/search

##### [Get URL scan](https://developers.cloudflare.com/api/resources/url_scanner/subresources/scans/methods/get)

GET/accounts/{account\_id}/urlscanner/v2/result/{scan\_id}

##### [Create URL Scan](https://developers.cloudflare.com/api/resources/url_scanner/subresources/scans/methods/create)

POST/accounts/{account\_id}/urlscanner/v2/scan

##### [Bulk create URL Scans](https://developers.cloudflare.com/api/resources/url_scanner/subresources/scans/methods/bulk_create)

POST/accounts/{account\_id}/urlscanner/v2/bulk

##### [Get URL scan's HAR](https://developers.cloudflare.com/api/resources/url_scanner/subresources/scans/methods/har)

GET/accounts/{account\_id}/urlscanner/v2/har/{scan\_id}

##### [Get screenshot](https://developers.cloudflare.com/api/resources/url_scanner/subresources/scans/methods/screenshot)

GET/accounts/{account\_id}/urlscanner/v2/screenshots/{scan\_id}.png

##### [Get URL scan's DOM](https://developers.cloudflare.com/api/resources/url_scanner/subresources/scans/methods/dom)

GET/accounts/{account\_id}/urlscanner/v2/dom/{scan\_id}

##### ModelsExpand Collapse

<details>

<summary>

ScanListResponse object {results }

</summary>

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

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20url_scanner.scans%20%3E%20(model)%20scan_list_response%20%3E%20(schema)>)

<details>

<summary>

ScanGetResponse object {data, lists, meta, 5 more }

</summary>

<details>

<summary>

data: object {console, cookies, globals, 3 more }

</summary>

<details>

<summary>

console: array of object {message }

</summary>

<details>

<summary>

message: object {level, source, text, url }

</summary>

level: string

<a href="#">Link to this property</a>

source: string

<a href="#">Link to this property</a>

text: string

<a href="#">Link to this property</a>

url: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

cookies: array of object {domain, expires, httpOnly, 10 more }

</summary>

domain: string

<a href="#">Link to this property</a>

expires: number

<a href="#">Link to this property</a>

httpOnly: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

path: string

<a href="#">Link to this property</a>

priority: string

<a href="#">Link to this property</a>

sameParty: boolean

<a href="#">Link to this property</a>

secure: boolean

<a href="#">Link to this property</a>

session: boolean

<a href="#">Link to this property</a>

size: number

<a href="#">Link to this property</a>

sourcePort: number

<a href="#">Link to this property</a>

sourceScheme: string

<a href="#">Link to this property</a>

value: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

globals: array of object {prop, type }

</summary>

prop: string

<a href="#">Link to this property</a>

type: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

links: array of object {href, text }

</summary>

href: string

<a href="#">Link to this property</a>

text: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

performance: array of object {duration, entryType, name, startTime }

</summary>

duration: number

<a href="#">Link to this property</a>

entryType: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

startTime: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

requests: array of object {request, response, requests }

</summary>

<details>

<summary>

request: object {documentURL, hasUserGesture, initiator, 9 more }

</summary>

documentURL: string

<a href="#">Link to this property</a>

hasUserGesture: boolean

<a href="#">Link to this property</a>

<details>

<summary>

initiator: object {host, type, url }

</summary>

host: string

<a href="#">Link to this property</a>

type: string

<a href="#">Link to this property</a>

url: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

redirectHasExtraInfo: boolean

<a href="#">Link to this property</a>

<details>

<summary>

request: object {initialPriority, isSameSite, method, 4 more }

</summary>

initialPriority: string

<a href="#">Link to this property</a>

isSameSite: boolean

<a href="#">Link to this property</a>

method: string

<a href="#">Link to this property</a>

mixedContentType: string

<a href="#">Link to this property</a>

referrerPolicy: string

<a href="#">Link to this property</a>

url: string

<a href="#">Link to this property</a>

headers: optional unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

requestId: string

<a href="#">Link to this property</a>

type: string

<a href="#">Link to this property</a>

wallTime: number

<a href="#">Link to this property</a>

frameId: optional string

<a href="#">Link to this property</a>

loaderId: optional string

<a href="#">Link to this property</a>

primaryRequest: optional boolean

<a href="#">Link to this property</a>

<details>

<summary>

redirectResponse: optional object {charset, mimeType, protocol, 8 more }

</summary>

charset: string

<a href="#">Link to this property</a>

mimeType: string

<a href="#">Link to this property</a>

protocol: string

<a href="#">Link to this property</a>

remoteIPAddress: string

<a href="#">Link to this property</a>

remotePort: number

<a href="#">Link to this property</a>

<details>

<summary>

securityHeaders: array of object {name, value }

</summary>

name: string

<a href="#">Link to this property</a>

value: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

securityState: string

<a href="#">Link to this property</a>

status: number

<a href="#">Link to this property</a>

statusText: string

<a href="#">Link to this property</a>

url: string

<a href="#">Link to this property</a>

headers: optional unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

response: object {asn, dataLength, encodedDataLength, 8 more }

</summary>

<details>

<summary>

asn: object {asn, country, description, 3 more }

</summary>

asn: string

<a href="#">Link to this property</a>

country: string

<a href="#">Link to this property</a>

description: string

<a href="#">Link to this property</a>

ip: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

org: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

dataLength: number

<a href="#">Link to this property</a>

encodedDataLength: number

<a href="#">Link to this property</a>

<details>

<summary>

geoip: object {city, country, country\_name, 3 more }

</summary>

city: string

<a href="#">Link to this property</a>

country: string

<a href="#">Link to this property</a>

country\_name: string

<a href="#">Link to this property</a>

geonameId: string

<a href="#">Link to this property</a>

ll: array of number

<a href="#">Link to this property</a>

region: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

hasExtraInfo: boolean

<a href="#">Link to this property</a>

requestId: string

<a href="#">Link to this property</a>

<details>

<summary>

response: object {charset, mimeType, protocol, 9 more }

</summary>

charset: string

<a href="#">Link to this property</a>

mimeType: string

<a href="#">Link to this property</a>

protocol: string

<a href="#">Link to this property</a>

remoteIPAddress: string

<a href="#">Link to this property</a>

remotePort: number

<a href="#">Link to this property</a>

<details>

<summary>

securityDetails: object {certificateId, certificateTransparencyCompliance, cipher, 10 more }

</summary>

certificateId: number

<a href="#">Link to this property</a>

certificateTransparencyCompliance: string

<a href="#">Link to this property</a>

cipher: string

<a href="#">Link to this property</a>

encryptedClientHello: boolean

<a href="#">Link to this property</a>

issuer: string

<a href="#">Link to this property</a>

keyExchange: string

<a href="#">Link to this property</a>

keyExchangeGroup: string

<a href="#">Link to this property</a>

protocol: string

<a href="#">Link to this property</a>

sanList: array of string

<a href="#">Link to this property</a>

serverSignatureAlgorithm: number

<a href="#">Link to this property</a>

subjectName: string

<a href="#">Link to this property</a>

validFrom: number

<a href="#">Link to this property</a>

validTo: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

securityHeaders: array of object {name, value }

</summary>

name: string

<a href="#">Link to this property</a>

value: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

securityState: string

<a href="#">Link to this property</a>

status: number

<a href="#">Link to this property</a>

statusText: string

<a href="#">Link to this property</a>

url: string

<a href="#">Link to this property</a>

headers: optional unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

size: number

<a href="#">Link to this property</a>

type: string

<a href="#">Link to this property</a>

contentAvailable: optional boolean

<a href="#">Link to this property</a>

hash: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

requests: optional array of object {documentURL, frameId, hasUserGesture, 7 more }

</summary>

documentURL: string

<a href="#">Link to this property</a>

frameId: string

<a href="#">Link to this property</a>

hasUserGesture: boolean

<a href="#">Link to this property</a>

<details>

<summary>

initiator: object {type }

</summary>

type: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

loaderId: string

<a href="#">Link to this property</a>

redirectHasExtraInfo: boolean

<a href="#">Link to this property</a>

<details>

<summary>

request: object {headers, initialPriority, isSameSite, 4 more }

</summary>

<details>

<summary>

headers: object {name }

</summary>

name: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

initialPriority: string

<a href="#">Link to this property</a>

isSameSite: boolean

<a href="#">Link to this property</a>

method: string

<a href="#">Link to this property</a>

mixedContentType: string

<a href="#">Link to this property</a>

referrerPolicy: string

<a href="#">Link to this property</a>

url: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

requestId: string

<a href="#">Link to this property</a>

type: string

<a href="#">Link to this property</a>

wallTime: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

lists: object {asns, certificates, continents, 7 more }

</summary>

asns: array of string

<a href="#">Link to this property</a>

<details>

<summary>

certificates: array of object {issuer, subjectName, validFrom, validTo }

</summary>

issuer: string

<a href="#">Link to this property</a>

subjectName: string

<a href="#">Link to this property</a>

validFrom: number

<a href="#">Link to this property</a>

validTo: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

continents: array of string

<a href="#">Link to this property</a>

countries: array of string

<a href="#">Link to this property</a>

domains: array of string

<a href="#">Link to this property</a>

hashes: array of string

<a href="#">Link to this property</a>

ips: array of string

<a href="#">Link to this property</a>

linkDomains: array of string

<a href="#">Link to this property</a>

servers: array of string

<a href="#">Link to this property</a>

urls: array of string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

meta: object {processors }

</summary>

<details>

<summary>

processors: object {asn, dns, domainCategories, 8 more }

</summary>

<details>

<summary>

asn: object {data }

</summary>

<details>

<summary>

data: array of object {asn, country, description, 2 more }

</summary>

asn: string

<a href="#">Link to this property</a>

country: string

<a href="#">Link to this property</a>

description: string

<a href="#">Link to this property</a>

ip: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

dns: object {data }

</summary>

<details>

<summary>

data: array of object {address, dnssec\_valid, name, type }

</summary>

address: string

<a href="#">Link to this property</a>

dnssec\_valid: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

type: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

domainCategories: object {data }

</summary>

<details>

<summary>

data: array of object {inherited, isPrimary, name }

</summary>

inherited: unknown

<a href="#">Link to this property</a>

isPrimary: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

geoip: object {data }

</summary>

<details>

<summary>

data: array of object {geoip, ip }

</summary>

<details>

<summary>

geoip: object {city, country, country\_name, 2 more }

</summary>

city: string

<a href="#">Link to this property</a>

country: string

<a href="#">Link to this property</a>

country\_name: string

<a href="#">Link to this property</a>

ll: array of number

<a href="#">Link to this property</a>

region: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

ip: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

phishing: object {data }

</summary>

data: array of string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

radarRank: object {data }

</summary>

<details>

<summary>

data: array of object {bucket, hostname, rank }

</summary>

bucket: string

<a href="#">Link to this property</a>

hostname: string

<a href="#">Link to this property</a>

rank: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

wappa: object {data }

</summary>

<details>

<summary>

data: array of object {app, categories, confidence, 3 more }

</summary>

app: string

<a href="#">Link to this property</a>

<details>

<summary>

categories: array of object {name, priority }

</summary>

name: string

<a href="#">Link to this property</a>

priority: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

confidence: array of object {confidence, name, pattern, patternType }

</summary>

confidence: number

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

pattern: string

<a href="#">Link to this property</a>

patternType: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

confidenceTotal: number

<a href="#">Link to this property</a>

icon: string

<a href="#">Link to this property</a>

website: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

agentReadiness: optional object {checks, level, levelName, 3 more }

</summary>

<details>

<summary>

checks: object {botAccessControl, commerce, contentAccessibility, 2 more }

</summary>

<details>

<summary>

botAccessControl: object {contentSignals, robotsTxtAiRules, webBotAuth }

</summary>

<details>

<summary>

contentSignals: object {status, details, durationMs, 2 more }

</summary>

status: string

<a href="#">Link to this property</a>

details: optional unknown

<a href="#">Link to this property</a>

durationMs: optional number

<a href="#">Link to this property</a>

<details>

<summary>

evidence: optional array of object {action, label, finding, 2 more }

</summary>

action: string

<a href="#">Link to this property</a>

label: string

<a href="#">Link to this property</a>

<details>

<summary>

finding: optional object {outcome, summary }

</summary>

outcome: string

<a href="#">Link to this property</a>

summary: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

request: optional object {method, url, headers }

</summary>

method: string

<a href="#">Link to this property</a>

url: string

<a href="#">Link to this property</a>

headers: optional unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

response: optional object {status, statusText, bodyPreview, 3 more }

</summary>

status: number

<a href="#">Link to this property</a>

statusText: string

<a href="#">Link to this property</a>

bodyPreview: optional string

<a href="#">Link to this property</a>

bodySize: optional number

<a href="#">Link to this property</a>

headers: optional unknown

<a href="#">Link to this property</a>

redirectedTo: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

message: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

robotsTxtAiRules: object {status, details, durationMs, 2 more }

</summary>

status: string

<a href="#">Link to this property</a>

details: optional unknown

<a href="#">Link to this property</a>

durationMs: optional number

<a href="#">Link to this property</a>

<details>

<summary>

evidence: optional array of object {action, label, finding, 2 more }

</summary>

action: string

<a href="#">Link to this property</a>

label: string

<a href="#">Link to this property</a>

<details>

<summary>

finding: optional object {outcome, summary }

</summary>

outcome: string

<a href="#">Link to this property</a>

summary: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

request: optional object {method, url, headers }

</summary>

method: string

<a href="#">Link to this property</a>

url: string

<a href="#">Link to this property</a>

headers: optional unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

response: optional object {status, statusText, bodyPreview, 3 more }

</summary>

status: number

<a href="#">Link to this property</a>

statusText: string

<a href="#">Link to this property</a>

bodyPreview: optional string

<a href="#">Link to this property</a>

bodySize: optional number

<a href="#">Link to this property</a>

headers: optional unknown

<a href="#">Link to this property</a>

redirectedTo: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

message: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

webBotAuth: object {status, details, durationMs, 2 more }

</summary>

status: string

<a href="#">Link to this property</a>

details: optional unknown

<a href="#">Link to this property</a>

durationMs: optional number

<a href="#">Link to this property</a>

<details>

<summary>

evidence: optional array of object {action, label, finding, 2 more }

</summary>

action: string

<a href="#">Link to this property</a>

label: string

<a href="#">Link to this property</a>

<details>

<summary>

finding: optional object {outcome, summary }

</summary>

outcome: string

<a href="#">Link to this property</a>

summary: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

request: optional object {method, url, headers }

</summary>

method: string

<a href="#">Link to this property</a>

url: string

<a href="#">Link to this property</a>

headers: optional unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

response: optional object {status, statusText, bodyPreview, 3 more }

</summary>

status: number

<a href="#">Link to this property</a>

statusText: string

<a href="#">Link to this property</a>

bodyPreview: optional string

<a href="#">Link to this property</a>

bodySize: optional number

<a href="#">Link to this property</a>

headers: optional unknown

<a href="#">Link to this property</a>

redirectedTo: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

message: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

commerce: object {acp, ap2, mpp, 2 more }

</summary>

<details>

<summary>

acp: object {status, details, durationMs, 2 more }

</summary>

status: string

<a href="#">Link to this property</a>

details: optional unknown

<a href="#">Link to this property</a>

durationMs: optional number

<a href="#">Link to this property</a>

<details>

<summary>

evidence: optional array of object {action, label, finding, 2 more }

</summary>

action: string

<a href="#">Link to this property</a>

label: string

<a href="#">Link to this property</a>

<details>

<summary>

finding: optional object {outcome, summary }

</summary>

outcome: string

<a href="#">Link to this property</a>

summary: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

request: optional object {method, url, headers }

</summary>

method: string

<a href="#">Link to this property</a>

url: string

<a href="#">Link to this property</a>

headers: optional unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

response: optional object {status, statusText, bodyPreview, 3 more }

</summary>

status: number

<a href="#">Link to this property</a>

statusText: string

<a href="#">Link to this property</a>

bodyPreview: optional string

<a href="#">Link to this property</a>

bodySize: optional number

<a href="#">Link to this property</a>

headers: optional unknown

<a href="#">Link to this property</a>

redirectedTo: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

message: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ap2: object {status, details, durationMs, 2 more }

</summary>

status: string

<a href="#">Link to this property</a>

details: optional unknown

<a href="#">Link to this property</a>

durationMs: optional number

<a href="#">Link to this property</a>

<details>

<summary>

evidence: optional array of object {action, label, finding, 2 more }

</summary>

action: string

<a href="#">Link to this property</a>

label: string

<a href="#">Link to this property</a>

<details>

<summary>

finding: optional object {outcome, summary }

</summary>

outcome: string

<a href="#">Link to this property</a>

summary: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

request: optional object {method, url, headers }

</summary>

method: string

<a href="#">Link to this property</a>

url: string

<a href="#">Link to this property</a>

headers: optional unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

response: optional object {status, statusText, bodyPreview, 3 more }

</summary>

status: number

<a href="#">Link to this property</a>

statusText: string

<a href="#">Link to this property</a>

bodyPreview: optional string

<a href="#">Link to this property</a>

bodySize: optional number

<a href="#">Link to this property</a>

headers: optional unknown

<a href="#">Link to this property</a>

redirectedTo: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

message: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

mpp: object {status, details, durationMs, 2 more }

</summary>

status: string

<a href="#">Link to this property</a>

details: optional unknown

<a href="#">Link to this property</a>

durationMs: optional number

<a href="#">Link to this property</a>

<details>

<summary>

evidence: optional array of object {action, label, finding, 2 more }

</summary>

action: string

<a href="#">Link to this property</a>

label: string

<a href="#">Link to this property</a>

<details>

<summary>

finding: optional object {outcome, summary }

</summary>

outcome: string

<a href="#">Link to this property</a>

summary: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

request: optional object {method, url, headers }

</summary>

method: string

<a href="#">Link to this property</a>

url: string

<a href="#">Link to this property</a>

headers: optional unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

response: optional object {status, statusText, bodyPreview, 3 more }

</summary>

status: number

<a href="#">Link to this property</a>

statusText: string

<a href="#">Link to this property</a>

bodyPreview: optional string

<a href="#">Link to this property</a>

bodySize: optional number

<a href="#">Link to this property</a>

headers: optional unknown

<a href="#">Link to this property</a>

redirectedTo: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

message: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ucp: object {status, details, durationMs, 2 more }

</summary>

status: string

<a href="#">Link to this property</a>

details: optional unknown

<a href="#">Link to this property</a>

durationMs: optional number

<a href="#">Link to this property</a>

<details>

<summary>

evidence: optional array of object {action, label, finding, 2 more }

</summary>

action: string

<a href="#">Link to this property</a>

label: string

<a href="#">Link to this property</a>

<details>

<summary>

finding: optional object {outcome, summary }

</summary>

outcome: string

<a href="#">Link to this property</a>

summary: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

request: optional object {method, url, headers }

</summary>

method: string

<a href="#">Link to this property</a>

url: string

<a href="#">Link to this property</a>

headers: optional unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

response: optional object {status, statusText, bodyPreview, 3 more }

</summary>

status: number

<a href="#">Link to this property</a>

statusText: string

<a href="#">Link to this property</a>

bodyPreview: optional string

<a href="#">Link to this property</a>

bodySize: optional number

<a href="#">Link to this property</a>

headers: optional unknown

<a href="#">Link to this property</a>

redirectedTo: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

message: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

x402: object {status, details, durationMs, 2 more }

</summary>

status: string

<a href="#">Link to this property</a>

details: optional unknown

<a href="#">Link to this property</a>

durationMs: optional number

<a href="#">Link to this property</a>

<details>

<summary>

evidence: optional array of object {action, label, finding, 2 more }

</summary>

action: string

<a href="#">Link to this property</a>

label: string

<a href="#">Link to this property</a>

<details>

<summary>

finding: optional object {outcome, summary }

</summary>

outcome: string

<a href="#">Link to this property</a>

summary: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

request: optional object {method, url, headers }

</summary>

method: string

<a href="#">Link to this property</a>

url: string

<a href="#">Link to this property</a>

headers: optional unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

response: optional object {status, statusText, bodyPreview, 3 more }

</summary>

status: number

<a href="#">Link to this property</a>

statusText: string

<a href="#">Link to this property</a>

bodyPreview: optional string

<a href="#">Link to this property</a>

bodySize: optional number

<a href="#">Link to this property</a>

headers: optional unknown

<a href="#">Link to this property</a>

redirectedTo: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

message: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

contentAccessibility: object {markdownNegotiation }

</summary>

<details>

<summary>

markdownNegotiation: object {status, details, durationMs, 2 more }

</summary>

status: string

<a href="#">Link to this property</a>

details: optional unknown

<a href="#">Link to this property</a>

durationMs: optional number

<a href="#">Link to this property</a>

<details>

<summary>

evidence: optional array of object {action, label, finding, 2 more }

</summary>

action: string

<a href="#">Link to this property</a>

label: string

<a href="#">Link to this property</a>

<details>

<summary>

finding: optional object {outcome, summary }

</summary>

outcome: string

<a href="#">Link to this property</a>

summary: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

request: optional object {method, url, headers }

</summary>

method: string

<a href="#">Link to this property</a>

url: string

<a href="#">Link to this property</a>

headers: optional unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

response: optional object {status, statusText, bodyPreview, 3 more }

</summary>

status: number

<a href="#">Link to this property</a>

statusText: string

<a href="#">Link to this property</a>

bodyPreview: optional string

<a href="#">Link to this property</a>

bodySize: optional number

<a href="#">Link to this property</a>

headers: optional unknown

<a href="#">Link to this property</a>

redirectedTo: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

message: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

discoverability: object {dnsAid, linkHeaders, robotsTxt, sitemap }

</summary>

<details>

<summary>

dnsAid: object {status, details, durationMs, 2 more }

</summary>

status: string

<a href="#">Link to this property</a>

details: optional unknown

<a href="#">Link to this property</a>

durationMs: optional number

<a href="#">Link to this property</a>

<details>

<summary>

evidence: optional array of object {action, label, finding, 2 more }

</summary>

action: string

<a href="#">Link to this property</a>

label: string

<a href="#">Link to this property</a>

<details>

<summary>

finding: optional object {outcome, summary }

</summary>

outcome: string

<a href="#">Link to this property</a>

summary: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

request: optional object {method, url, headers }

</summary>

method: string

<a href="#">Link to this property</a>

url: string

<a href="#">Link to this property</a>

headers: optional unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

response: optional object {status, statusText, bodyPreview, 3 more }

</summary>

status: number

<a href="#">Link to this property</a>

statusText: string

<a href="#">Link to this property</a>

bodyPreview: optional string

<a href="#">Link to this property</a>

bodySize: optional number

<a href="#">Link to this property</a>

headers: optional unknown

<a href="#">Link to this property</a>

redirectedTo: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

message: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

linkHeaders: object {status, details, durationMs, 2 more }

</summary>

status: string

<a href="#">Link to this property</a>

details: optional unknown

<a href="#">Link to this property</a>

durationMs: optional number

<a href="#">Link to this property</a>

<details>

<summary>

evidence: optional array of object {action, label, finding, 2 more }

</summary>

action: string

<a href="#">Link to this property</a>

label: string

<a href="#">Link to this property</a>

<details>

<summary>

finding: optional object {outcome, summary }

</summary>

outcome: string

<a href="#">Link to this property</a>

summary: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

request: optional object {method, url, headers }

</summary>

method: string

<a href="#">Link to this property</a>

url: string

<a href="#">Link to this property</a>

headers: optional unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

response: optional object {status, statusText, bodyPreview, 3 more }

</summary>

status: number

<a href="#">Link to this property</a>

statusText: string

<a href="#">Link to this property</a>

bodyPreview: optional string

<a href="#">Link to this property</a>

bodySize: optional number

<a href="#">Link to this property</a>

headers: optional unknown

<a href="#">Link to this property</a>

redirectedTo: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

message: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

robotsTxt: object {status, details, durationMs, 2 more }

</summary>

status: string

<a href="#">Link to this property</a>

details: optional unknown

<a href="#">Link to this property</a>

durationMs: optional number

<a href="#">Link to this property</a>

<details>

<summary>

evidence: optional array of object {action, label, finding, 2 more }

</summary>

action: string

<a href="#">Link to this property</a>

label: string

<a href="#">Link to this property</a>

<details>

<summary>

finding: optional object {outcome, summary }

</summary>

outcome: string

<a href="#">Link to this property</a>

summary: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

request: optional object {method, url, headers }

</summary>

method: string

<a href="#">Link to this property</a>

url: string

<a href="#">Link to this property</a>

headers: optional unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

response: optional object {status, statusText, bodyPreview, 3 more }

</summary>

status: number

<a href="#">Link to this property</a>

statusText: string

<a href="#">Link to this property</a>

bodyPreview: optional string

<a href="#">Link to this property</a>

bodySize: optional number

<a href="#">Link to this property</a>

headers: optional unknown

<a href="#">Link to this property</a>

redirectedTo: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

message: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

sitemap: object {status, details, durationMs, 2 more }

</summary>

status: string

<a href="#">Link to this property</a>

details: optional unknown

<a href="#">Link to this property</a>

durationMs: optional number

<a href="#">Link to this property</a>

<details>

<summary>

evidence: optional array of object {action, label, finding, 2 more }

</summary>

action: string

<a href="#">Link to this property</a>

label: string

<a href="#">Link to this property</a>

<details>

<summary>

finding: optional object {outcome, summary }

</summary>

outcome: string

<a href="#">Link to this property</a>

summary: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

request: optional object {method, url, headers }

</summary>

method: string

<a href="#">Link to this property</a>

url: string

<a href="#">Link to this property</a>

headers: optional unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

response: optional object {status, statusText, bodyPreview, 3 more }

</summary>

status: number

<a href="#">Link to this property</a>

statusText: string

<a href="#">Link to this property</a>

bodyPreview: optional string

<a href="#">Link to this property</a>

bodySize: optional number

<a href="#">Link to this property</a>

headers: optional unknown

<a href="#">Link to this property</a>

redirectedTo: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

message: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

discovery: object {a2aAgentCard, agentSkills, apiCatalog, 6 more }

</summary>

<details>

<summary>

a2aAgentCard: object {status, details, durationMs, 2 more }

</summary>

status: string

<a href="#">Link to this property</a>

details: optional unknown

<a href="#">Link to this property</a>

durationMs: optional number

<a href="#">Link to this property</a>

<details>

<summary>

evidence: optional array of object {action, label, finding, 2 more }

</summary>

action: string

<a href="#">Link to this property</a>

label: string

<a href="#">Link to this property</a>

<details>

<summary>

finding: optional object {outcome, summary }

</summary>

outcome: string

<a href="#">Link to this property</a>

summary: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

request: optional object {method, url, headers }

</summary>

method: string

<a href="#">Link to this property</a>

url: string

<a href="#">Link to this property</a>

headers: optional unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

response: optional object {status, statusText, bodyPreview, 3 more }

</summary>

status: number

<a href="#">Link to this property</a>

statusText: string

<a href="#">Link to this property</a>

bodyPreview: optional string

<a href="#">Link to this property</a>

bodySize: optional number

<a href="#">Link to this property</a>

headers: optional unknown

<a href="#">Link to this property</a>

redirectedTo: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

message: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

agentSkills: object {status, details, durationMs, 2 more }

</summary>

status: string

<a href="#">Link to this property</a>

details: optional unknown

<a href="#">Link to this property</a>

durationMs: optional number

<a href="#">Link to this property</a>

<details>

<summary>

evidence: optional array of object {action, label, finding, 2 more }

</summary>

action: string

<a href="#">Link to this property</a>

label: string

<a href="#">Link to this property</a>

<details>

<summary>

finding: optional object {outcome, summary }

</summary>

outcome: string

<a href="#">Link to this property</a>

summary: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

request: optional object {method, url, headers }

</summary>

method: string

<a href="#">Link to this property</a>

url: string

<a href="#">Link to this property</a>

headers: optional unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

response: optional object {status, statusText, bodyPreview, 3 more }

</summary>

status: number

<a href="#">Link to this property</a>

statusText: string

<a href="#">Link to this property</a>

bodyPreview: optional string

<a href="#">Link to this property</a>

bodySize: optional number

<a href="#">Link to this property</a>

headers: optional unknown

<a href="#">Link to this property</a>

redirectedTo: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

message: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

apiCatalog: object {status, details, durationMs, 2 more }

</summary>

status: string

<a href="#">Link to this property</a>

details: optional unknown

<a href="#">Link to this property</a>

durationMs: optional number

<a href="#">Link to this property</a>

<details>

<summary>

evidence: optional array of object {action, label, finding, 2 more }

</summary>

action: string

<a href="#">Link to this property</a>

label: string

<a href="#">Link to this property</a>

<details>

<summary>

finding: optional object {outcome, summary }

</summary>

outcome: string

<a href="#">Link to this property</a>

summary: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

request: optional object {method, url, headers }

</summary>

method: string

<a href="#">Link to this property</a>

url: string

<a href="#">Link to this property</a>

headers: optional unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

response: optional object {status, statusText, bodyPreview, 3 more }

</summary>

status: number

<a href="#">Link to this property</a>

statusText: string

<a href="#">Link to this property</a>

bodyPreview: optional string

<a href="#">Link to this property</a>

bodySize: optional number

<a href="#">Link to this property</a>

headers: optional unknown

<a href="#">Link to this property</a>

redirectedTo: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

message: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ard: object {status, details, durationMs, 2 more }

</summary>

status: string

<a href="#">Link to this property</a>

details: optional unknown

<a href="#">Link to this property</a>

durationMs: optional number

<a href="#">Link to this property</a>

<details>

<summary>

evidence: optional array of object {action, label, finding, 2 more }

</summary>

action: string

<a href="#">Link to this property</a>

label: string

<a href="#">Link to this property</a>

<details>

<summary>

finding: optional object {outcome, summary }

</summary>

outcome: string

<a href="#">Link to this property</a>

summary: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

request: optional object {method, url, headers }

</summary>

method: string

<a href="#">Link to this property</a>

url: string

<a href="#">Link to this property</a>

headers: optional unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

response: optional object {status, statusText, bodyPreview, 3 more }

</summary>

status: number

<a href="#">Link to this property</a>

statusText: string

<a href="#">Link to this property</a>

bodyPreview: optional string

<a href="#">Link to this property</a>

bodySize: optional number

<a href="#">Link to this property</a>

headers: optional unknown

<a href="#">Link to this property</a>

redirectedTo: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

message: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

authMd: object {status, details, durationMs, 2 more }

</summary>

status: string

<a href="#">Link to this property</a>

details: optional unknown

<a href="#">Link to this property</a>

durationMs: optional number

<a href="#">Link to this property</a>

<details>

<summary>

evidence: optional array of object {action, label, finding, 2 more }

</summary>

action: string

<a href="#">Link to this property</a>

label: string

<a href="#">Link to this property</a>

<details>

<summary>

finding: optional object {outcome, summary }

</summary>

outcome: string

<a href="#">Link to this property</a>

summary: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

request: optional object {method, url, headers }

</summary>

method: string

<a href="#">Link to this property</a>

url: string

<a href="#">Link to this property</a>

headers: optional unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

response: optional object {status, statusText, bodyPreview, 3 more }

</summary>

status: number

<a href="#">Link to this property</a>

statusText: string

<a href="#">Link to this property</a>

bodyPreview: optional string

<a href="#">Link to this property</a>

bodySize: optional number

<a href="#">Link to this property</a>

headers: optional unknown

<a href="#">Link to this property</a>

redirectedTo: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

message: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

mcpServerCard: object {status, details, durationMs, 2 more }

</summary>

status: string

<a href="#">Link to this property</a>

details: optional unknown

<a href="#">Link to this property</a>

durationMs: optional number

<a href="#">Link to this property</a>

<details>

<summary>

evidence: optional array of object {action, label, finding, 2 more }

</summary>

action: string

<a href="#">Link to this property</a>

label: string

<a href="#">Link to this property</a>

<details>

<summary>

finding: optional object {outcome, summary }

</summary>

outcome: string

<a href="#">Link to this property</a>

summary: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

request: optional object {method, url, headers }

</summary>

method: string

<a href="#">Link to this property</a>

url: string

<a href="#">Link to this property</a>

headers: optional unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

response: optional object {status, statusText, bodyPreview, 3 more }

</summary>

status: number

<a href="#">Link to this property</a>

statusText: string

<a href="#">Link to this property</a>

bodyPreview: optional string

<a href="#">Link to this property</a>

bodySize: optional number

<a href="#">Link to this property</a>

headers: optional unknown

<a href="#">Link to this property</a>

redirectedTo: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

message: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

oauthDiscovery: object {status, details, durationMs, 2 more }

</summary>

status: string

<a href="#">Link to this property</a>

details: optional unknown

<a href="#">Link to this property</a>

durationMs: optional number

<a href="#">Link to this property</a>

<details>

<summary>

evidence: optional array of object {action, label, finding, 2 more }

</summary>

action: string

<a href="#">Link to this property</a>

label: string

<a href="#">Link to this property</a>

<details>

<summary>

finding: optional object {outcome, summary }

</summary>

outcome: string

<a href="#">Link to this property</a>

summary: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

request: optional object {method, url, headers }

</summary>

method: string

<a href="#">Link to this property</a>

url: string

<a href="#">Link to this property</a>

headers: optional unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

response: optional object {status, statusText, bodyPreview, 3 more }

</summary>

status: number

<a href="#">Link to this property</a>

statusText: string

<a href="#">Link to this property</a>

bodyPreview: optional string

<a href="#">Link to this property</a>

bodySize: optional number

<a href="#">Link to this property</a>

headers: optional unknown

<a href="#">Link to this property</a>

redirectedTo: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

message: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

oauthProtectedResource: object {status, details, durationMs, 2 more }

</summary>

status: string

<a href="#">Link to this property</a>

details: optional unknown

<a href="#">Link to this property</a>

durationMs: optional number

<a href="#">Link to this property</a>

<details>

<summary>

evidence: optional array of object {action, label, finding, 2 more }

</summary>

action: string

<a href="#">Link to this property</a>

label: string

<a href="#">Link to this property</a>

<details>

<summary>

finding: optional object {outcome, summary }

</summary>

outcome: string

<a href="#">Link to this property</a>

summary: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

request: optional object {method, url, headers }

</summary>

method: string

<a href="#">Link to this property</a>

url: string

<a href="#">Link to this property</a>

headers: optional unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

response: optional object {status, statusText, bodyPreview, 3 more }

</summary>

status: number

<a href="#">Link to this property</a>

statusText: string

<a href="#">Link to this property</a>

bodyPreview: optional string

<a href="#">Link to this property</a>

bodySize: optional number

<a href="#">Link to this property</a>

headers: optional unknown

<a href="#">Link to this property</a>

redirectedTo: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

message: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

webMcp: object {status, details, durationMs, 2 more }

</summary>

status: string

<a href="#">Link to this property</a>

details: optional unknown

<a href="#">Link to this property</a>

durationMs: optional number

<a href="#">Link to this property</a>

<details>

<summary>

evidence: optional array of object {action, label, finding, 2 more }

</summary>

action: string

<a href="#">Link to this property</a>

label: string

<a href="#">Link to this property</a>

<details>

<summary>

finding: optional object {outcome, summary }

</summary>

outcome: string

<a href="#">Link to this property</a>

summary: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

request: optional object {method, url, headers }

</summary>

method: string

<a href="#">Link to this property</a>

url: string

<a href="#">Link to this property</a>

headers: optional unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

response: optional object {status, statusText, bodyPreview, 3 more }

</summary>

status: number

<a href="#">Link to this property</a>

statusText: string

<a href="#">Link to this property</a>

bodyPreview: optional string

<a href="#">Link to this property</a>

bodySize: optional number

<a href="#">Link to this property</a>

headers: optional unknown

<a href="#">Link to this property</a>

redirectedTo: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

message: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

level: number

<a href="#">Link to this property</a>

levelName: string

<a href="#">Link to this property</a>

commerceSignals: optional array of string

<a href="#">Link to this property</a>

isCommerce: optional boolean

<a href="#">Link to this property</a>

<details>

<summary>

nextLevel: optional object {name, requirements, target }

</summary>

name: string

<a href="#">Link to this property</a>

<details>

<summary>

requirements: array of object {check, description, prompt, 2 more }

</summary>

check: string

<a href="#">Link to this property</a>

description: string

<a href="#">Link to this property</a>

prompt: string

<a href="#">Link to this property</a>

skillUrl: string

<a href="#">Link to this property</a>

specUrls: array of string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

target: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

phishing\_v2: optional object {data }

</summary>

data: array of string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

robotsTxt: optional object {data }

</summary>

<details>

<summary>

data: array of object {rules, sitemaps, hash }

</summary>

<details>

<summary>

rules: object {"\*" }

</summary>

<details>

<summary>

"\*": object {allow, disallow, contentSignal, crawlDelay }

</summary>

allow: array of string

<a href="#">Link to this property</a>

disallow: array of string

<a href="#">Link to this property</a>

<details>

<summary>

contentSignal: optional object {"ai-input", "ai-train", search }

</summary>

"ai-input": optional string

<a href="#">Link to this property</a>

"ai-train": optional string

<a href="#">Link to this property</a>

search: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

crawlDelay: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

sitemaps: array of string

<a href="#">Link to this property</a>

hash: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

urlCategories: optional object {data }

</summary>

<details>

<summary>

data: array of object {content, inherited, name, risks }

</summary>

<details>

<summary>

content: array of object {id, name, super\_category\_id }

</summary>

id: number

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

super\_category\_id: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

inherited: object {content, from, risks }

</summary>

<details>

<summary>

content: array of object {id, name, super\_category\_id }

</summary>

id: number

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

super\_category\_id: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

from: string

<a href="#">Link to this property</a>

<details>

<summary>

risks: array of object {id, name, super\_category\_id }

</summary>

id: number

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

super\_category\_id: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

<details>

<summary>

risks: array of object {id, name, super\_category\_id }

</summary>

id: number

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

super\_category\_id: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

page: object {apexDomain, asn, asnname, 14 more }

</summary>

apexDomain: string

<a href="#">Link to this property</a>

asn: string

<a href="#">Link to this property</a>

asnname: string

<a href="#">Link to this property</a>

city: string

<a href="#">Link to this property</a>

country: string

<a href="#">Link to this property</a>

domain: string

<a href="#">Link to this property</a>

ip: string

<a href="#">Link to this property</a>

mimeType: string

<a href="#">Link to this property</a>

server: string

<a href="#">Link to this property</a>

status: string

<a href="#">Link to this property</a>

title: string

<a href="#">Link to this property</a>

tlsAgeDays: number

<a href="#">Link to this property</a>

tlsIssuer: string

<a href="#">Link to this property</a>

tlsValidDays: number

<a href="#">Link to this property</a>

tlsValidFrom: string

<a href="#">Link to this property</a>

url: string

<a href="#">Link to this property</a>

<details>

<summary>

screenshot: optional object {dhash, mm3Hash, name, phash }

</summary>

dhash: string

<a href="#">Link to this property</a>

mm3Hash: number

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

phash: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

scanner: object {colo, country }

</summary>

colo: string

<a href="#">Link to this property</a>

country: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

stats: object {domainStats, ipStats, IPv6Percentage, 10 more }

</summary>

<details>

<summary>

domainStats: array of object {count, countries, domain, 6 more }

</summary>

count: number

<a href="#">Link to this property</a>

countries: array of string

<a href="#">Link to this property</a>

domain: string

<a href="#">Link to this property</a>

encodedSize: number

<a href="#">Link to this property</a>

index: number

<a href="#">Link to this property</a>

initiators: array of string

<a href="#">Link to this property</a>

ips: array of string

<a href="#">Link to this property</a>

redirects: number

<a href="#">Link to this property</a>

size: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ipStats: array of object {asn, countries, domains, 9 more }

</summary>

<details>

<summary>

asn: object {asn, country, description, 3 more }

</summary>

asn: string

<a href="#">Link to this property</a>

country: string

<a href="#">Link to this property</a>

description: string

<a href="#">Link to this property</a>

ip: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

org: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

countries: array of string

<a href="#">Link to this property</a>

domains: array of string

<a href="#">Link to this property</a>

encodedSize: number

<a href="#">Link to this property</a>

<details>

<summary>

geoip: object {city, country, country\_name, 2 more }

</summary>

city: string

<a href="#">Link to this property</a>

country: string

<a href="#">Link to this property</a>

country\_name: string

<a href="#">Link to this property</a>

ll: array of number

<a href="#">Link to this property</a>

region: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

index: number

<a href="#">Link to this property</a>

ip: string

<a href="#">Link to this property</a>

ipv6: boolean

<a href="#">Link to this property</a>

redirects: number

<a href="#">Link to this property</a>

requests: number

<a href="#">Link to this property</a>

size: number

<a href="#">Link to this property</a>

count: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

IPv6Percentage: number

<a href="#">Link to this property</a>

malicious: number

<a href="#">Link to this property</a>

<details>

<summary>

protocolStats: array of object {count, countries, encodedSize, 3 more }

</summary>

count: number

<a href="#">Link to this property</a>

countries: array of string

<a href="#">Link to this property</a>

encodedSize: number

<a href="#">Link to this property</a>

ips: array of string

<a href="#">Link to this property</a>

protocol: string

<a href="#">Link to this property</a>

size: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

resourceStats: array of object {compression, count, countries, 5 more }

</summary>

compression: number

<a href="#">Link to this property</a>

count: number

<a href="#">Link to this property</a>

countries: array of string

<a href="#">Link to this property</a>

encodedSize: number

<a href="#">Link to this property</a>

ips: array of string

<a href="#">Link to this property</a>

percentage: number

<a href="#">Link to this property</a>

size: number

<a href="#">Link to this property</a>

type: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

securePercentage: number

<a href="#">Link to this property</a>

secureRequests: number

<a href="#">Link to this property</a>

<details>

<summary>

serverStats: array of object {count, countries, encodedSize, 3 more }

</summary>

count: number

<a href="#">Link to this property</a>

countries: array of string

<a href="#">Link to this property</a>

encodedSize: number

<a href="#">Link to this property</a>

ips: array of string

<a href="#">Link to this property</a>

server: string

<a href="#">Link to this property</a>

size: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

tlsStats: array of object {count, countries, encodedSize, 4 more }

</summary>

count: number

<a href="#">Link to this property</a>

countries: array of string

<a href="#">Link to this property</a>

encodedSize: number

<a href="#">Link to this property</a>

ips: array of string

<a href="#">Link to this property</a>

<details>

<summary>

protocols: object {"TLS 1.3 / AES\_128\_GCM" }

</summary>

"TLS 1.3 / AES\_128\_GCM": number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

securityState: string

<a href="#">Link to this property</a>

size: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

totalLinks: number

<a href="#">Link to this property</a>

uniqASNs: number

<a href="#">Link to this property</a>

uniqCountries: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

task: object {apexDomain, domain, domURL, 10 more }

</summary>

apexDomain: string

<a href="#">Link to this property</a>

domain: string

<a href="#">Link to this property</a>

domURL: string

<a href="#">Link to this property</a>

method: string

<a href="#">Link to this property</a>

<details>

<summary>

options: object {customHeaders, screenshotsResolutions }

</summary>

customHeaders: optional unknown

Custom headers set.

<a href="#">Link to this property</a>

screenshotsResolutions: optional array of string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

reportURL: string

<a href="#">Link to this property</a>

screenshotURL: string

<a href="#">Link to this property</a>

source: string

<a href="#">Link to this property</a>

success: boolean

<a href="#">Link to this property</a>

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

verdicts: object {overall }

</summary>

<details>

<summary>

overall: object {categories, hasVerdicts, malicious, tags }

</summary>

categories: array of string

<a href="#">Link to this property</a>

hasVerdicts: boolean

<a href="#">Link to this property</a>

malicious: boolean

<a href="#">Link to this property</a>

tags: array of string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20url_scanner.scans%20%3E%20(model)%20scan_get_response%20%3E%20(schema)>)

<details>

<summary>

ScanCreateResponse object {api, message, result, 4 more }

</summary>

api: string

URL to api report.

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

result: string

Public URL to report.

<a href="#">Link to this property</a>

url: string

Canonical form of submitted URL. Use this if you want to later search by URL.

<a href="#">Link to this property</a>

uuid: string

Scan ID.

formatuuid

<a href="#">Link to this property</a>

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

<a href="#">Link to this property</a>

<details>

<summary>

options: optional object {useragent }

</summary>

useragent: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20url_scanner.scans%20%3E%20(model)%20scan_create_response%20%3E%20(schema)>)

<details>

<summary>

ScanBulkCreateResponse = array of object {api, result, url, 3 more }

</summary>

api: string

URL to api report.

<a href="#">Link to this property</a>

result: string

URL to report.

<a href="#">Link to this property</a>

url: string

Submitted URL

<a href="#">Link to this property</a>

uuid: string

Scan ID.

formatuuid

<a href="#">Link to this property</a>

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

<a href="#">Link to this property</a>

<details>

<summary>

options: optional object {useragent }

</summary>

useragent: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20url_scanner.scans%20%3E%20(model)%20scan_bulk_create_response%20%3E%20(schema)>)

<details>

<summary>

ScanHARResponse object {log }

</summary>

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

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20url_scanner.scans%20%3E%20(model)%20scan_har_response%20%3E%20(schema)>)

ScanDOMResponse = string

HTML of webpage.

[Link to this property](#)%20url_scanner.scans%20%3E%20(model)%20scan_dom_response%20%3E%20(schema)>)