---
title: Get URL scan
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[URL Scanner](https://developers.cloudflare.com/api/resources/url_scanner)

[Scans](https://developers.cloudflare.com/api/resources/url_scanner/subresources/scans)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get URL scan

GET/accounts/{account\_id}/urlscanner/v2/result/{scan\_id}

Get URL scan by uuid

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

[Link to this property](#)%20url_scanner.scans%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

scan\_id: string

Scan UUID.

formatuuid

[Link to this property](#)%20url_scanner.scans%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20scan_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

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

[Link to this property](#)%20url_scanner.scans%20%3E%20(model)%20scan_get_response%20%3E%20(schema)%20%3E%20(property)%20data>)

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

[Link to this property](#)%20url_scanner.scans%20%3E%20(model)%20scan_get_response%20%3E%20(schema)%20%3E%20(property)%20lists>)

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

[Link to this property](#)%20url_scanner.scans%20%3E%20(model)%20scan_get_response%20%3E%20(schema)%20%3E%20(property)%20meta>)

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

[Link to this property](#)%20url_scanner.scans%20%3E%20(model)%20scan_get_response%20%3E%20(schema)%20%3E%20(property)%20page>)

<details>

<summary>

scanner: object {colo, country }

</summary>

colo: string

<a href="#">Link to this property</a>

country: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20url_scanner.scans%20%3E%20(model)%20scan_get_response%20%3E%20(schema)%20%3E%20(property)%20scanner>)

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

[Link to this property](#)%20url_scanner.scans%20%3E%20(model)%20scan_get_response%20%3E%20(schema)%20%3E%20(property)%20stats>)

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

[Link to this property](#)%20url_scanner.scans%20%3E%20(model)%20scan_get_response%20%3E%20(schema)%20%3E%20(property)%20task>)

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

[Link to this property](#)%20url_scanner.scans%20%3E%20(model)%20scan_get_response%20%3E%20(schema)%20%3E%20(property)%20verdicts>)

### Get URL scan

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/urlscanner/v2/result/$SCAN_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "data": {
    "console": [
      {
        "message": {
          "level": "level",
          "source": "source",
          "text": "text",
          "url": "url"
        }
      }
    ],
    "cookies": [
      {
        "domain": "domain",
        "expires": 0,
        "httpOnly": true,
        "name": "name",
        "path": "path",
        "priority": "priority",
        "sameParty": true,
        "secure": true,
        "session": true,
        "size": 0,
        "sourcePort": 0,
        "sourceScheme": "sourceScheme",
        "value": "value"
      }
    ],
    "globals": [
      {
        "prop": "prop",
        "type": "type"
      }
    ],
    "links": [
      {
        "href": "href",
        "text": "text"
      }
    ],
    "performance": [
      {
        "duration": 0,
        "entryType": "entryType",
        "name": "name",
        "startTime": 0
      }
    ],
    "requests": [
      {
        "request": {
          "documentURL": "documentURL",
          "hasUserGesture": true,
          "initiator": {
            "host": "host",
            "type": "type",
            "url": "url"
          },
          "redirectHasExtraInfo": true,
          "request": {
            "initialPriority": "initialPriority",
            "isSameSite": true,
            "method": "method",
            "mixedContentType": "mixedContentType",
            "referrerPolicy": "referrerPolicy",
            "url": "url",
            "headers": {}
          },
          "requestId": "requestId",
          "type": "type",
          "wallTime": 0,
          "frameId": "frameId",
          "loaderId": "loaderId",
          "primaryRequest": true,
          "redirectResponse": {
            "charset": "charset",
            "mimeType": "mimeType",
            "protocol": "protocol",
            "remoteIPAddress": "remoteIPAddress",
            "remotePort": 0,
            "securityHeaders": [
              {
                "name": "name",
                "value": "value"
              }
            ],
            "securityState": "securityState",
            "status": 0,
            "statusText": "statusText",
            "url": "url",
            "headers": {}
          }
        },
        "response": {
          "asn": {
            "asn": "asn",
            "country": "country",
            "description": "description",
            "ip": "ip",
            "name": "name",
            "org": "org"
          },
          "dataLength": 0,
          "encodedDataLength": 0,
          "geoip": {
            "city": "city",
            "country": "country",
            "country_name": "country_name",
            "geonameId": "geonameId",
            "ll": [
              0
            ],
            "region": "region"
          },
          "hasExtraInfo": true,
          "requestId": "requestId",
          "response": {
            "charset": "charset",
            "mimeType": "mimeType",
            "protocol": "protocol",
            "remoteIPAddress": "remoteIPAddress",
            "remotePort": 0,
            "securityDetails": {
              "certificateId": 0,
              "certificateTransparencyCompliance": "certificateTransparencyCompliance",
              "cipher": "cipher",
              "encryptedClientHello": true,
              "issuer": "issuer",
              "keyExchange": "keyExchange",
              "keyExchangeGroup": "keyExchangeGroup",
              "protocol": "protocol",
              "sanList": [
                "string"
              ],
              "serverSignatureAlgorithm": 0,
              "subjectName": "subjectName",
              "validFrom": 0,
              "validTo": 0
            },
            "securityHeaders": [
              {
                "name": "name",
                "value": "value"
              }
            ],
            "securityState": "securityState",
            "status": 0,
            "statusText": "statusText",
            "url": "url",
            "headers": {}
          },
          "size": 0,
          "type": "type",
          "contentAvailable": true,
          "hash": "hash"
        },
        "requests": [
          {
            "documentURL": "documentURL",
            "frameId": "frameId",
            "hasUserGesture": true,
            "initiator": {
              "type": "type"
            },
            "loaderId": "loaderId",
            "redirectHasExtraInfo": true,
            "request": {
              "headers": {
                "name": "name"
              },
              "initialPriority": "initialPriority",
              "isSameSite": true,
              "method": "method",
              "mixedContentType": "mixedContentType",
              "referrerPolicy": "referrerPolicy",
              "url": "url"
            },
            "requestId": "requestId",
            "type": "type",
            "wallTime": 0
          }
        ]
      }
    ]
  },
  "lists": {
    "asns": [
      "string"
    ],
    "certificates": [
      {
        "issuer": "issuer",
        "subjectName": "subjectName",
        "validFrom": 0,
        "validTo": 0
      }
    ],
    "continents": [
      "string"
    ],
    "countries": [
      "string"
    ],
    "domains": [
      "string"
    ],
    "hashes": [
      "string"
    ],
    "ips": [
      "string"
    ],
    "linkDomains": [
      "string"
    ],
    "servers": [
      "string"
    ],
    "urls": [
      "string"
    ]
  },
  "meta": {
    "processors": {
      "asn": {
        "data": [
          {
            "asn": "asn",
            "country": "country",
            "description": "description",
            "ip": "ip",
            "name": "name"
          }
        ]
      },
      "dns": {
        "data": [
          {
            "address": "address",
            "dnssec_valid": true,
            "name": "name",
            "type": "type"
          }
        ]
      },
      "domainCategories": {
        "data": [
          {
            "inherited": {},
            "isPrimary": true,
            "name": "name"
          }
        ]
      },
      "geoip": {
        "data": [
          {
            "geoip": {
              "city": "city",
              "country": "country",
              "country_name": "country_name",
              "ll": [
                0
              ],
              "region": "region"
            },
            "ip": "ip"
          }
        ]
      },
      "phishing": {
        "data": [
          "string"
        ]
      },
      "radarRank": {
        "data": [
          {
            "bucket": "bucket",
            "hostname": "hostname",
            "rank": 0
          }
        ]
      },
      "wappa": {
        "data": [
          {
            "app": "app",
            "categories": [
              {
                "name": "name",
                "priority": 0
              }
            ],
            "confidence": [
              {
                "confidence": 0,
                "name": "name",
                "pattern": "pattern",
                "patternType": "patternType"
              }
            ],
            "confidenceTotal": 0,
            "icon": "icon",
            "website": "website"
          }
        ]
      },
      "agentReadiness": {
        "checks": {
          "botAccessControl": {
            "contentSignals": {
              "status": "pass",
              "details": {},
              "durationMs": 0,
              "evidence": [
                {
                  "action": "fetch",
                  "label": "GET /robots.txt",
                  "finding": {
                    "outcome": "positive",
                    "summary": "Found valid robots.txt"
                  },
                  "request": {
                    "method": "GET",
                    "url": "https://example.com/robots.txt",
                    "headers": {}
                  },
                  "response": {
                    "status": 200,
                    "statusText": "OK",
                    "bodyPreview": "bodyPreview",
                    "bodySize": 0,
                    "headers": {},
                    "redirectedTo": "redirectedTo"
                  }
                }
              ],
              "message": "message"
            },
            "robotsTxtAiRules": {
              "status": "pass",
              "details": {},
              "durationMs": 0,
              "evidence": [
                {
                  "action": "fetch",
                  "label": "GET /robots.txt",
                  "finding": {
                    "outcome": "positive",
                    "summary": "Found valid robots.txt"
                  },
                  "request": {
                    "method": "GET",
                    "url": "https://example.com/robots.txt",
                    "headers": {}
                  },
                  "response": {
                    "status": 200,
                    "statusText": "OK",
                    "bodyPreview": "bodyPreview",
                    "bodySize": 0,
                    "headers": {},
                    "redirectedTo": "redirectedTo"
                  }
                }
              ],
              "message": "message"
            },
            "webBotAuth": {
              "status": "fail",
              "details": {},
              "durationMs": 0,
              "evidence": [
                {
                  "action": "fetch",
                  "label": "GET /robots.txt",
                  "finding": {
                    "outcome": "positive",
                    "summary": "Found valid robots.txt"
                  },
                  "request": {
                    "method": "GET",
                    "url": "https://example.com/robots.txt",
                    "headers": {}
                  },
                  "response": {
                    "status": 200,
                    "statusText": "OK",
                    "bodyPreview": "bodyPreview",
                    "bodySize": 0,
                    "headers": {},
                    "redirectedTo": "redirectedTo"
                  }
                }
              ],
              "message": "message"
            }
          },
          "commerce": {
            "acp": {
              "status": "fail",
              "details": {},
              "durationMs": 0,
              "evidence": [
                {
                  "action": "fetch",
                  "label": "GET /robots.txt",
                  "finding": {
                    "outcome": "positive",
                    "summary": "Found valid robots.txt"
                  },
                  "request": {
                    "method": "GET",
                    "url": "https://example.com/robots.txt",
                    "headers": {}
                  },
                  "response": {
                    "status": 200,
                    "statusText": "OK",
                    "bodyPreview": "bodyPreview",
                    "bodySize": 0,
                    "headers": {},
                    "redirectedTo": "redirectedTo"
                  }
                }
              ],
              "message": "message"
            },
            "ap2": {
              "status": "fail",
              "details": {},
              "durationMs": 0,
              "evidence": [
                {
                  "action": "fetch",
                  "label": "GET /robots.txt",
                  "finding": {
                    "outcome": "positive",
                    "summary": "Found valid robots.txt"
                  },
                  "request": {
                    "method": "GET",
                    "url": "https://example.com/robots.txt",
                    "headers": {}
                  },
                  "response": {
                    "status": 200,
                    "statusText": "OK",
                    "bodyPreview": "bodyPreview",
                    "bodySize": 0,
                    "headers": {},
                    "redirectedTo": "redirectedTo"
                  }
                }
              ],
              "message": "message"
            },
            "mpp": {
              "status": "fail",
              "details": {},
              "durationMs": 0,
              "evidence": [
                {
                  "action": "fetch",
                  "label": "GET /robots.txt",
                  "finding": {
                    "outcome": "positive",
                    "summary": "Found valid robots.txt"
                  },
                  "request": {
                    "method": "GET",
                    "url": "https://example.com/robots.txt",
                    "headers": {}
                  },
                  "response": {
                    "status": 200,
                    "statusText": "OK",
                    "bodyPreview": "bodyPreview",
                    "bodySize": 0,
                    "headers": {},
                    "redirectedTo": "redirectedTo"
                  }
                }
              ],
              "message": "message"
            },
            "ucp": {
              "status": "fail",
              "details": {},
              "durationMs": 0,
              "evidence": [
                {
                  "action": "fetch",
                  "label": "GET /robots.txt",
                  "finding": {
                    "outcome": "positive",
                    "summary": "Found valid robots.txt"
                  },
                  "request": {
                    "method": "GET",
                    "url": "https://example.com/robots.txt",
                    "headers": {}
                  },
                  "response": {
                    "status": 200,
                    "statusText": "OK",
                    "bodyPreview": "bodyPreview",
                    "bodySize": 0,
                    "headers": {},
                    "redirectedTo": "redirectedTo"
                  }
                }
              ],
              "message": "message"
            },
            "x402": {
              "status": "fail",
              "details": {},
              "durationMs": 0,
              "evidence": [
                {
                  "action": "fetch",
                  "label": "GET /robots.txt",
                  "finding": {
                    "outcome": "positive",
                    "summary": "Found valid robots.txt"
                  },
                  "request": {
                    "method": "GET",
                    "url": "https://example.com/robots.txt",
                    "headers": {}
                  },
                  "response": {
                    "status": 200,
                    "statusText": "OK",
                    "bodyPreview": "bodyPreview",
                    "bodySize": 0,
                    "headers": {},
                    "redirectedTo": "redirectedTo"
                  }
                }
              ],
              "message": "message"
            }
          },
          "contentAccessibility": {
            "markdownNegotiation": {
              "status": "fail",
              "details": {},
              "durationMs": 0,
              "evidence": [
                {
                  "action": "fetch",
                  "label": "GET /robots.txt",
                  "finding": {
                    "outcome": "positive",
                    "summary": "Found valid robots.txt"
                  },
                  "request": {
                    "method": "GET",
                    "url": "https://example.com/robots.txt",
                    "headers": {}
                  },
                  "response": {
                    "status": 200,
                    "statusText": "OK",
                    "bodyPreview": "bodyPreview",
                    "bodySize": 0,
                    "headers": {},
                    "redirectedTo": "redirectedTo"
                  }
                }
              ],
              "message": "message"
            }
          },
          "discoverability": {
            "dnsAid": {
              "status": "fail",
              "details": {},
              "durationMs": 0,
              "evidence": [
                {
                  "action": "fetch",
                  "label": "GET /robots.txt",
                  "finding": {
                    "outcome": "positive",
                    "summary": "Found valid robots.txt"
                  },
                  "request": {
                    "method": "GET",
                    "url": "https://example.com/robots.txt",
                    "headers": {}
                  },
                  "response": {
                    "status": 200,
                    "statusText": "OK",
                    "bodyPreview": "bodyPreview",
                    "bodySize": 0,
                    "headers": {},
                    "redirectedTo": "redirectedTo"
                  }
                }
              ],
              "message": "message"
            },
            "linkHeaders": {
              "status": "fail",
              "details": {},
              "durationMs": 0,
              "evidence": [
                {
                  "action": "fetch",
                  "label": "GET /robots.txt",
                  "finding": {
                    "outcome": "positive",
                    "summary": "Found valid robots.txt"
                  },
                  "request": {
                    "method": "GET",
                    "url": "https://example.com/robots.txt",
                    "headers": {}
                  },
                  "response": {
                    "status": 200,
                    "statusText": "OK",
                    "bodyPreview": "bodyPreview",
                    "bodySize": 0,
                    "headers": {},
                    "redirectedTo": "redirectedTo"
                  }
                }
              ],
              "message": "message"
            },
            "robotsTxt": {
              "status": "pass",
              "details": {},
              "durationMs": 0,
              "evidence": [
                {
                  "action": "fetch",
                  "label": "GET /robots.txt",
                  "finding": {
                    "outcome": "positive",
                    "summary": "Found valid robots.txt"
                  },
                  "request": {
                    "method": "GET",
                    "url": "https://example.com/robots.txt",
                    "headers": {}
                  },
                  "response": {
                    "status": 200,
                    "statusText": "OK",
                    "bodyPreview": "bodyPreview",
                    "bodySize": 0,
                    "headers": {},
                    "redirectedTo": "redirectedTo"
                  }
                }
              ],
              "message": "message"
            },
            "sitemap": {
              "status": "pass",
              "details": {},
              "durationMs": 0,
              "evidence": [
                {
                  "action": "fetch",
                  "label": "GET /robots.txt",
                  "finding": {
                    "outcome": "positive",
                    "summary": "Found valid robots.txt"
                  },
                  "request": {
                    "method": "GET",
                    "url": "https://example.com/robots.txt",
                    "headers": {}
                  },
                  "response": {
                    "status": 200,
                    "statusText": "OK",
                    "bodyPreview": "bodyPreview",
                    "bodySize": 0,
                    "headers": {},
                    "redirectedTo": "redirectedTo"
                  }
                }
              ],
              "message": "message"
            }
          },
          "discovery": {
            "a2aAgentCard": {
              "status": "fail",
              "details": {},
              "durationMs": 0,
              "evidence": [
                {
                  "action": "fetch",
                  "label": "GET /robots.txt",
                  "finding": {
                    "outcome": "positive",
                    "summary": "Found valid robots.txt"
                  },
                  "request": {
                    "method": "GET",
                    "url": "https://example.com/robots.txt",
                    "headers": {}
                  },
                  "response": {
                    "status": 200,
                    "statusText": "OK",
                    "bodyPreview": "bodyPreview",
                    "bodySize": 0,
                    "headers": {},
                    "redirectedTo": "redirectedTo"
                  }
                }
              ],
              "message": "message"
            },
            "agentSkills": {
              "status": "fail",
              "details": {},
              "durationMs": 0,
              "evidence": [
                {
                  "action": "fetch",
                  "label": "GET /robots.txt",
                  "finding": {
                    "outcome": "positive",
                    "summary": "Found valid robots.txt"
                  },
                  "request": {
                    "method": "GET",
                    "url": "https://example.com/robots.txt",
                    "headers": {}
                  },
                  "response": {
                    "status": 200,
                    "statusText": "OK",
                    "bodyPreview": "bodyPreview",
                    "bodySize": 0,
                    "headers": {},
                    "redirectedTo": "redirectedTo"
                  }
                }
              ],
              "message": "message"
            },
            "apiCatalog": {
              "status": "fail",
              "details": {},
              "durationMs": 0,
              "evidence": [
                {
                  "action": "fetch",
                  "label": "GET /robots.txt",
                  "finding": {
                    "outcome": "positive",
                    "summary": "Found valid robots.txt"
                  },
                  "request": {
                    "method": "GET",
                    "url": "https://example.com/robots.txt",
                    "headers": {}
                  },
                  "response": {
                    "status": 200,
                    "statusText": "OK",
                    "bodyPreview": "bodyPreview",
                    "bodySize": 0,
                    "headers": {},
                    "redirectedTo": "redirectedTo"
                  }
                }
              ],
              "message": "message"
            },
            "ard": {
              "status": "fail",
              "details": {},
              "durationMs": 0,
              "evidence": [
                {
                  "action": "fetch",
                  "label": "GET /robots.txt",
                  "finding": {
                    "outcome": "positive",
                    "summary": "Found valid robots.txt"
                  },
                  "request": {
                    "method": "GET",
                    "url": "https://example.com/robots.txt",
                    "headers": {}
                  },
                  "response": {
                    "status": 200,
                    "statusText": "OK",
                    "bodyPreview": "bodyPreview",
                    "bodySize": 0,
                    "headers": {},
                    "redirectedTo": "redirectedTo"
                  }
                }
              ],
              "message": "message"
            },
            "authMd": {
              "status": "fail",
              "details": {},
              "durationMs": 0,
              "evidence": [
                {
                  "action": "fetch",
                  "label": "GET /robots.txt",
                  "finding": {
                    "outcome": "positive",
                    "summary": "Found valid robots.txt"
                  },
                  "request": {
                    "method": "GET",
                    "url": "https://example.com/robots.txt",
                    "headers": {}
                  },
                  "response": {
                    "status": 200,
                    "statusText": "OK",
                    "bodyPreview": "bodyPreview",
                    "bodySize": 0,
                    "headers": {},
                    "redirectedTo": "redirectedTo"
                  }
                }
              ],
              "message": "message"
            },
            "mcpServerCard": {
              "status": "fail",
              "details": {},
              "durationMs": 0,
              "evidence": [
                {
                  "action": "fetch",
                  "label": "GET /robots.txt",
                  "finding": {
                    "outcome": "positive",
                    "summary": "Found valid robots.txt"
                  },
                  "request": {
                    "method": "GET",
                    "url": "https://example.com/robots.txt",
                    "headers": {}
                  },
                  "response": {
                    "status": 200,
                    "statusText": "OK",
                    "bodyPreview": "bodyPreview",
                    "bodySize": 0,
                    "headers": {},
                    "redirectedTo": "redirectedTo"
                  }
                }
              ],
              "message": "message"
            },
            "oauthDiscovery": {
              "status": "fail",
              "details": {},
              "durationMs": 0,
              "evidence": [
                {
                  "action": "fetch",
                  "label": "GET /robots.txt",
                  "finding": {
                    "outcome": "positive",
                    "summary": "Found valid robots.txt"
                  },
                  "request": {
                    "method": "GET",
                    "url": "https://example.com/robots.txt",
                    "headers": {}
                  },
                  "response": {
                    "status": 200,
                    "statusText": "OK",
                    "bodyPreview": "bodyPreview",
                    "bodySize": 0,
                    "headers": {},
                    "redirectedTo": "redirectedTo"
                  }
                }
              ],
              "message": "message"
            },
            "oauthProtectedResource": {
              "status": "fail",
              "details": {},
              "durationMs": 0,
              "evidence": [
                {
                  "action": "fetch",
                  "label": "GET /robots.txt",
                  "finding": {
                    "outcome": "positive",
                    "summary": "Found valid robots.txt"
                  },
                  "request": {
                    "method": "GET",
                    "url": "https://example.com/robots.txt",
                    "headers": {}
                  },
                  "response": {
                    "status": 200,
                    "statusText": "OK",
                    "bodyPreview": "bodyPreview",
                    "bodySize": 0,
                    "headers": {},
                    "redirectedTo": "redirectedTo"
                  }
                }
              ],
              "message": "message"
            },
            "webMcp": {
              "status": "neutral",
              "details": {},
              "durationMs": 0,
              "evidence": [
                {
                  "action": "fetch",
                  "label": "GET /robots.txt",
                  "finding": {
                    "outcome": "positive",
                    "summary": "Found valid robots.txt"
                  },
                  "request": {
                    "method": "GET",
                    "url": "https://example.com/robots.txt",
                    "headers": {}
                  },
                  "response": {
                    "status": 200,
                    "statusText": "OK",
                    "bodyPreview": "bodyPreview",
                    "bodySize": 0,
                    "headers": {},
                    "redirectedTo": "redirectedTo"
                  }
                }
              ],
              "message": "message"
            }
          }
        },
        "level": 2,
        "levelName": "Bot-Aware",
        "commerceSignals": [
          "string"
        ],
        "isCommerce": true,
        "nextLevel": {
          "name": "Agent-Readable",
          "requirements": [
            {
              "check": "markdownNegotiation",
              "description": "Support content negotiation with Accept: text/markdown",
              "prompt": "Add markdown content negotiation support",
              "skillUrl": "https://agentready.cloudflare.com/.well-known/skills/markdown-negotiation",
              "specUrls": [
                "https://markdownforagents.org"
              ]
            }
          ],
          "target": 3
        }
      },
      "phishing_v2": {
        "data": [
          "string"
        ]
      },
      "robotsTxt": {
        "data": [
          {
            "rules": {
              "*": {
                "allow": [
                  "string"
                ],
                "disallow": [
                  "string"
                ],
                "contentSignal": {
                  "ai-input": "no",
                  "ai-train": "yes",
                  "search": "yes"
                },
                "crawlDelay": 0
              }
            },
            "sitemaps": [
              "string"
            ],
            "hash": "hash"
          }
        ]
      },
      "urlCategories": {
        "data": [
          {
            "content": [
              {
                "id": 0,
                "name": "name",
                "super_category_id": 0
              }
            ],
            "inherited": {
              "content": [
                {
                  "id": 0,
                  "name": "name",
                  "super_category_id": 0
                }
              ],
              "from": "from",
              "risks": [
                {
                  "id": 0,
                  "name": "name",
                  "super_category_id": 0
                }
              ]
            },
            "name": "name",
            "risks": [
              {
                "id": 0,
                "name": "name",
                "super_category_id": 0
              }
            ]
          }
        ]
      }
    }
  },
  "page": {
    "apexDomain": "apexDomain",
    "asn": "asn",
    "asnname": "asnname",
    "city": "city",
    "country": "country",
    "domain": "domain",
    "ip": "ip",
    "mimeType": "mimeType",
    "server": "server",
    "status": "200",
    "title": "title",
    "tlsAgeDays": 0,
    "tlsIssuer": "tlsIssuer",
    "tlsValidDays": 0,
    "tlsValidFrom": "tlsValidFrom",
    "url": "url",
    "screenshot": {
      "dhash": "dhash",
      "mm3Hash": 0,
      "name": "name",
      "phash": "phash"
    }
  },
  "scanner": {
    "colo": "colo",
    "country": "country"
  },
  "stats": {
    "domainStats": [
      {
        "count": 0,
        "countries": [
          "string"
        ],
        "domain": "domain",
        "encodedSize": 0,
        "index": 0,
        "initiators": [
          "string"
        ],
        "ips": [
          "string"
        ],
        "redirects": 0,
        "size": 0
      }
    ],
    "ipStats": [
      {
        "asn": {
          "asn": "asn",
          "country": "country",
          "description": "description",
          "ip": "ip",
          "name": "name",
          "org": "org"
        },
        "countries": [
          "string"
        ],
        "domains": [
          "string"
        ],
        "encodedSize": 0,
        "geoip": {
          "city": "city",
          "country": "country",
          "country_name": "country_name",
          "ll": [
            0
          ],
          "region": "region"
        },
        "index": 0,
        "ip": "ip",
        "ipv6": true,
        "redirects": 0,
        "requests": 0,
        "size": 0,
        "count": 0
      }
    ],
    "IPv6Percentage": 0,
    "malicious": 0,
    "protocolStats": [
      {
        "count": 0,
        "countries": [
          "string"
        ],
        "encodedSize": 0,
        "ips": [
          "string"
        ],
        "protocol": "protocol",
        "size": 0
      }
    ],
    "resourceStats": [
      {
        "compression": 0,
        "count": 0,
        "countries": [
          "string"
        ],
        "encodedSize": 0,
        "ips": [
          "string"
        ],
        "percentage": 0,
        "size": 0,
        "type": "type"
      }
    ],
    "securePercentage": 0,
    "secureRequests": 0,
    "serverStats": [
      {
        "count": 0,
        "countries": [
          "string"
        ],
        "encodedSize": 0,
        "ips": [
          "string"
        ],
        "server": "server",
        "size": 0
      }
    ],
    "tlsStats": [
      {
        "count": 0,
        "countries": [
          "string"
        ],
        "encodedSize": 0,
        "ips": [
          "string"
        ],
        "protocols": {
          "TLS 1.3 / AES_128_GCM": 0
        },
        "securityState": "securityState",
        "size": 0
      }
    ],
    "totalLinks": 0,
    "uniqASNs": 0,
    "uniqCountries": 0
  },
  "task": {
    "apexDomain": "apexDomain",
    "domain": "domain",
    "domURL": "domURL",
    "method": "method",
    "options": {
      "customHeaders": {},
      "screenshotsResolutions": [
        "string"
      ]
    },
    "reportURL": "reportURL",
    "screenshotURL": "screenshotURL",
    "source": "source",
    "success": true,
    "time": "time",
    "url": "url",
    "uuid": "uuid",
    "visibility": "visibility"
  },
  "verdicts": {
    "overall": {
      "categories": [
        "string"
      ],
      "hasVerdicts": true,
      "malicious": true,
      "tags": [
        "string"
      ]
    }
  }
}
```

##### Returns Examples

200 example

```
{
  "data": {
    "console": [
      {
        "message": {
          "level": "level",
          "source": "source",
          "text": "text",
          "url": "url"
        }
      }
    ],
    "cookies": [
      {
        "domain": "domain",
        "expires": 0,
        "httpOnly": true,
        "name": "name",
        "path": "path",
        "priority": "priority",
        "sameParty": true,
        "secure": true,
        "session": true,
        "size": 0,
        "sourcePort": 0,
        "sourceScheme": "sourceScheme",
        "value": "value"
      }
    ],
    "globals": [
      {
        "prop": "prop",
        "type": "type"
      }
    ],
    "links": [
      {
        "href": "href",
        "text": "text"
      }
    ],
    "performance": [
      {
        "duration": 0,
        "entryType": "entryType",
        "name": "name",
        "startTime": 0
      }
    ],
    "requests": [
      {
        "request": {
          "documentURL": "documentURL",
          "hasUserGesture": true,
          "initiator": {
            "host": "host",
            "type": "type",
            "url": "url"
          },
          "redirectHasExtraInfo": true,
          "request": {
            "initialPriority": "initialPriority",
            "isSameSite": true,
            "method": "method",
            "mixedContentType": "mixedContentType",
            "referrerPolicy": "referrerPolicy",
            "url": "url",
            "headers": {}
          },
          "requestId": "requestId",
          "type": "type",
          "wallTime": 0,
          "frameId": "frameId",
          "loaderId": "loaderId",
          "primaryRequest": true,
          "redirectResponse": {
            "charset": "charset",
            "mimeType": "mimeType",
            "protocol": "protocol",
            "remoteIPAddress": "remoteIPAddress",
            "remotePort": 0,
            "securityHeaders": [
              {
                "name": "name",
                "value": "value"
              }
            ],
            "securityState": "securityState",
            "status": 0,
            "statusText": "statusText",
            "url": "url",
            "headers": {}
          }
        },
        "response": {
          "asn": {
            "asn": "asn",
            "country": "country",
            "description": "description",
            "ip": "ip",
            "name": "name",
            "org": "org"
          },
          "dataLength": 0,
          "encodedDataLength": 0,
          "geoip": {
            "city": "city",
            "country": "country",
            "country_name": "country_name",
            "geonameId": "geonameId",
            "ll": [
              0
            ],
            "region": "region"
          },
          "hasExtraInfo": true,
          "requestId": "requestId",
          "response": {
            "charset": "charset",
            "mimeType": "mimeType",
            "protocol": "protocol",
            "remoteIPAddress": "remoteIPAddress",
            "remotePort": 0,
            "securityDetails": {
              "certificateId": 0,
              "certificateTransparencyCompliance": "certificateTransparencyCompliance",
              "cipher": "cipher",
              "encryptedClientHello": true,
              "issuer": "issuer",
              "keyExchange": "keyExchange",
              "keyExchangeGroup": "keyExchangeGroup",
              "protocol": "protocol",
              "sanList": [
                "string"
              ],
              "serverSignatureAlgorithm": 0,
              "subjectName": "subjectName",
              "validFrom": 0,
              "validTo": 0
            },
            "securityHeaders": [
              {
                "name": "name",
                "value": "value"
              }
            ],
            "securityState": "securityState",
            "status": 0,
            "statusText": "statusText",
            "url": "url",
            "headers": {}
          },
          "size": 0,
          "type": "type",
          "contentAvailable": true,
          "hash": "hash"
        },
        "requests": [
          {
            "documentURL": "documentURL",
            "frameId": "frameId",
            "hasUserGesture": true,
            "initiator": {
              "type": "type"
            },
            "loaderId": "loaderId",
            "redirectHasExtraInfo": true,
            "request": {
              "headers": {
                "name": "name"
              },
              "initialPriority": "initialPriority",
              "isSameSite": true,
              "method": "method",
              "mixedContentType": "mixedContentType",
              "referrerPolicy": "referrerPolicy",
              "url": "url"
            },
            "requestId": "requestId",
            "type": "type",
            "wallTime": 0
          }
        ]
      }
    ]
  },
  "lists": {
    "asns": [
      "string"
    ],
    "certificates": [
      {
        "issuer": "issuer",
        "subjectName": "subjectName",
        "validFrom": 0,
        "validTo": 0
      }
    ],
    "continents": [
      "string"
    ],
    "countries": [
      "string"
    ],
    "domains": [
      "string"
    ],
    "hashes": [
      "string"
    ],
    "ips": [
      "string"
    ],
    "linkDomains": [
      "string"
    ],
    "servers": [
      "string"
    ],
    "urls": [
      "string"
    ]
  },
  "meta": {
    "processors": {
      "asn": {
        "data": [
          {
            "asn": "asn",
            "country": "country",
            "description": "description",
            "ip": "ip",
            "name": "name"
          }
        ]
      },
      "dns": {
        "data": [
          {
            "address": "address",
            "dnssec_valid": true,
            "name": "name",
            "type": "type"
          }
        ]
      },
      "domainCategories": {
        "data": [
          {
            "inherited": {},
            "isPrimary": true,
            "name": "name"
          }
        ]
      },
      "geoip": {
        "data": [
          {
            "geoip": {
              "city": "city",
              "country": "country",
              "country_name": "country_name",
              "ll": [
                0
              ],
              "region": "region"
            },
            "ip": "ip"
          }
        ]
      },
      "phishing": {
        "data": [
          "string"
        ]
      },
      "radarRank": {
        "data": [
          {
            "bucket": "bucket",
            "hostname": "hostname",
            "rank": 0
          }
        ]
      },
      "wappa": {
        "data": [
          {
            "app": "app",
            "categories": [
              {
                "name": "name",
                "priority": 0
              }
            ],
            "confidence": [
              {
                "confidence": 0,
                "name": "name",
                "pattern": "pattern",
                "patternType": "patternType"
              }
            ],
            "confidenceTotal": 0,
            "icon": "icon",
            "website": "website"
          }
        ]
      },
      "agentReadiness": {
        "checks": {
          "botAccessControl": {
            "contentSignals": {
              "status": "pass",
              "details": {},
              "durationMs": 0,
              "evidence": [
                {
                  "action": "fetch",
                  "label": "GET /robots.txt",
                  "finding": {
                    "outcome": "positive",
                    "summary": "Found valid robots.txt"
                  },
                  "request": {
                    "method": "GET",
                    "url": "https://example.com/robots.txt",
                    "headers": {}
                  },
                  "response": {
                    "status": 200,
                    "statusText": "OK",
                    "bodyPreview": "bodyPreview",
                    "bodySize": 0,
                    "headers": {},
                    "redirectedTo": "redirectedTo"
                  }
                }
              ],
              "message": "message"
            },
            "robotsTxtAiRules": {
              "status": "pass",
              "details": {},
              "durationMs": 0,
              "evidence": [
                {
                  "action": "fetch",
                  "label": "GET /robots.txt",
                  "finding": {
                    "outcome": "positive",
                    "summary": "Found valid robots.txt"
                  },
                  "request": {
                    "method": "GET",
                    "url": "https://example.com/robots.txt",
                    "headers": {}
                  },
                  "response": {
                    "status": 200,
                    "statusText": "OK",
                    "bodyPreview": "bodyPreview",
                    "bodySize": 0,
                    "headers": {},
                    "redirectedTo": "redirectedTo"
                  }
                }
              ],
              "message": "message"
            },
            "webBotAuth": {
              "status": "fail",
              "details": {},
              "durationMs": 0,
              "evidence": [
                {
                  "action": "fetch",
                  "label": "GET /robots.txt",
                  "finding": {
                    "outcome": "positive",
                    "summary": "Found valid robots.txt"
                  },
                  "request": {
                    "method": "GET",
                    "url": "https://example.com/robots.txt",
                    "headers": {}
                  },
                  "response": {
                    "status": 200,
                    "statusText": "OK",
                    "bodyPreview": "bodyPreview",
                    "bodySize": 0,
                    "headers": {},
                    "redirectedTo": "redirectedTo"
                  }
                }
              ],
              "message": "message"
            }
          },
          "commerce": {
            "acp": {
              "status": "fail",
              "details": {},
              "durationMs": 0,
              "evidence": [
                {
                  "action": "fetch",
                  "label": "GET /robots.txt",
                  "finding": {
                    "outcome": "positive",
                    "summary": "Found valid robots.txt"
                  },
                  "request": {
                    "method": "GET",
                    "url": "https://example.com/robots.txt",
                    "headers": {}
                  },
                  "response": {
                    "status": 200,
                    "statusText": "OK",
                    "bodyPreview": "bodyPreview",
                    "bodySize": 0,
                    "headers": {},
                    "redirectedTo": "redirectedTo"
                  }
                }
              ],
              "message": "message"
            },
            "ap2": {
              "status": "fail",
              "details": {},
              "durationMs": 0,
              "evidence": [
                {
                  "action": "fetch",
                  "label": "GET /robots.txt",
                  "finding": {
                    "outcome": "positive",
                    "summary": "Found valid robots.txt"
                  },
                  "request": {
                    "method": "GET",
                    "url": "https://example.com/robots.txt",
                    "headers": {}
                  },
                  "response": {
                    "status": 200,
                    "statusText": "OK",
                    "bodyPreview": "bodyPreview",
                    "bodySize": 0,
                    "headers": {},
                    "redirectedTo": "redirectedTo"
                  }
                }
              ],
              "message": "message"
            },
            "mpp": {
              "status": "fail",
              "details": {},
              "durationMs": 0,
              "evidence": [
                {
                  "action": "fetch",
                  "label": "GET /robots.txt",
                  "finding": {
                    "outcome": "positive",
                    "summary": "Found valid robots.txt"
                  },
                  "request": {
                    "method": "GET",
                    "url": "https://example.com/robots.txt",
                    "headers": {}
                  },
                  "response": {
                    "status": 200,
                    "statusText": "OK",
                    "bodyPreview": "bodyPreview",
                    "bodySize": 0,
                    "headers": {},
                    "redirectedTo": "redirectedTo"
                  }
                }
              ],
              "message": "message"
            },
            "ucp": {
              "status": "fail",
              "details": {},
              "durationMs": 0,
              "evidence": [
                {
                  "action": "fetch",
                  "label": "GET /robots.txt",
                  "finding": {
                    "outcome": "positive",
                    "summary": "Found valid robots.txt"
                  },
                  "request": {
                    "method": "GET",
                    "url": "https://example.com/robots.txt",
                    "headers": {}
                  },
                  "response": {
                    "status": 200,
                    "statusText": "OK",
                    "bodyPreview": "bodyPreview",
                    "bodySize": 0,
                    "headers": {},
                    "redirectedTo": "redirectedTo"
                  }
                }
              ],
              "message": "message"
            },
            "x402": {
              "status": "fail",
              "details": {},
              "durationMs": 0,
              "evidence": [
                {
                  "action": "fetch",
                  "label": "GET /robots.txt",
                  "finding": {
                    "outcome": "positive",
                    "summary": "Found valid robots.txt"
                  },
                  "request": {
                    "method": "GET",
                    "url": "https://example.com/robots.txt",
                    "headers": {}
                  },
                  "response": {
                    "status": 200,
                    "statusText": "OK",
                    "bodyPreview": "bodyPreview",
                    "bodySize": 0,
                    "headers": {},
                    "redirectedTo": "redirectedTo"
                  }
                }
              ],
              "message": "message"
            }
          },
          "contentAccessibility": {
            "markdownNegotiation": {
              "status": "fail",
              "details": {},
              "durationMs": 0,
              "evidence": [
                {
                  "action": "fetch",
                  "label": "GET /robots.txt",
                  "finding": {
                    "outcome": "positive",
                    "summary": "Found valid robots.txt"
                  },
                  "request": {
                    "method": "GET",
                    "url": "https://example.com/robots.txt",
                    "headers": {}
                  },
                  "response": {
                    "status": 200,
                    "statusText": "OK",
                    "bodyPreview": "bodyPreview",
                    "bodySize": 0,
                    "headers": {},
                    "redirectedTo": "redirectedTo"
                  }
                }
              ],
              "message": "message"
            }
          },
          "discoverability": {
            "dnsAid": {
              "status": "fail",
              "details": {},
              "durationMs": 0,
              "evidence": [
                {
                  "action": "fetch",
                  "label": "GET /robots.txt",
                  "finding": {
                    "outcome": "positive",
                    "summary": "Found valid robots.txt"
                  },
                  "request": {
                    "method": "GET",
                    "url": "https://example.com/robots.txt",
                    "headers": {}
                  },
                  "response": {
                    "status": 200,
                    "statusText": "OK",
                    "bodyPreview": "bodyPreview",
                    "bodySize": 0,
                    "headers": {},
                    "redirectedTo": "redirectedTo"
                  }
                }
              ],
              "message": "message"
            },
            "linkHeaders": {
              "status": "fail",
              "details": {},
              "durationMs": 0,
              "evidence": [
                {
                  "action": "fetch",
                  "label": "GET /robots.txt",
                  "finding": {
                    "outcome": "positive",
                    "summary": "Found valid robots.txt"
                  },
                  "request": {
                    "method": "GET",
                    "url": "https://example.com/robots.txt",
                    "headers": {}
                  },
                  "response": {
                    "status": 200,
                    "statusText": "OK",
                    "bodyPreview": "bodyPreview",
                    "bodySize": 0,
                    "headers": {},
                    "redirectedTo": "redirectedTo"
                  }
                }
              ],
              "message": "message"
            },
            "robotsTxt": {
              "status": "pass",
              "details": {},
              "durationMs": 0,
              "evidence": [
                {
                  "action": "fetch",
                  "label": "GET /robots.txt",
                  "finding": {
                    "outcome": "positive",
                    "summary": "Found valid robots.txt"
                  },
                  "request": {
                    "method": "GET",
                    "url": "https://example.com/robots.txt",
                    "headers": {}
                  },
                  "response": {
                    "status": 200,
                    "statusText": "OK",
                    "bodyPreview": "bodyPreview",
                    "bodySize": 0,
                    "headers": {},
                    "redirectedTo": "redirectedTo"
                  }
                }
              ],
              "message": "message"
            },
            "sitemap": {
              "status": "pass",
              "details": {},
              "durationMs": 0,
              "evidence": [
                {
                  "action": "fetch",
                  "label": "GET /robots.txt",
                  "finding": {
                    "outcome": "positive",
                    "summary": "Found valid robots.txt"
                  },
                  "request": {
                    "method": "GET",
                    "url": "https://example.com/robots.txt",
                    "headers": {}
                  },
                  "response": {
                    "status": 200,
                    "statusText": "OK",
                    "bodyPreview": "bodyPreview",
                    "bodySize": 0,
                    "headers": {},
                    "redirectedTo": "redirectedTo"
                  }
                }
              ],
              "message": "message"
            }
          },
          "discovery": {
            "a2aAgentCard": {
              "status": "fail",
              "details": {},
              "durationMs": 0,
              "evidence": [
                {
                  "action": "fetch",
                  "label": "GET /robots.txt",
                  "finding": {
                    "outcome": "positive",
                    "summary": "Found valid robots.txt"
                  },
                  "request": {
                    "method": "GET",
                    "url": "https://example.com/robots.txt",
                    "headers": {}
                  },
                  "response": {
                    "status": 200,
                    "statusText": "OK",
                    "bodyPreview": "bodyPreview",
                    "bodySize": 0,
                    "headers": {},
                    "redirectedTo": "redirectedTo"
                  }
                }
              ],
              "message": "message"
            },
            "agentSkills": {
              "status": "fail",
              "details": {},
              "durationMs": 0,
              "evidence": [
                {
                  "action": "fetch",
                  "label": "GET /robots.txt",
                  "finding": {
                    "outcome": "positive",
                    "summary": "Found valid robots.txt"
                  },
                  "request": {
                    "method": "GET",
                    "url": "https://example.com/robots.txt",
                    "headers": {}
                  },
                  "response": {
                    "status": 200,
                    "statusText": "OK",
                    "bodyPreview": "bodyPreview",
                    "bodySize": 0,
                    "headers": {},
                    "redirectedTo": "redirectedTo"
                  }
                }
              ],
              "message": "message"
            },
            "apiCatalog": {
              "status": "fail",
              "details": {},
              "durationMs": 0,
              "evidence": [
                {
                  "action": "fetch",
                  "label": "GET /robots.txt",
                  "finding": {
                    "outcome": "positive",
                    "summary": "Found valid robots.txt"
                  },
                  "request": {
                    "method": "GET",
                    "url": "https://example.com/robots.txt",
                    "headers": {}
                  },
                  "response": {
                    "status": 200,
                    "statusText": "OK",
                    "bodyPreview": "bodyPreview",
                    "bodySize": 0,
                    "headers": {},
                    "redirectedTo": "redirectedTo"
                  }
                }
              ],
              "message": "message"
            },
            "ard": {
              "status": "fail",
              "details": {},
              "durationMs": 0,
              "evidence": [
                {
                  "action": "fetch",
                  "label": "GET /robots.txt",
                  "finding": {
                    "outcome": "positive",
                    "summary": "Found valid robots.txt"
                  },
                  "request": {
                    "method": "GET",
                    "url": "https://example.com/robots.txt",
                    "headers": {}
                  },
                  "response": {
                    "status": 200,
                    "statusText": "OK",
                    "bodyPreview": "bodyPreview",
                    "bodySize": 0,
                    "headers": {},
                    "redirectedTo": "redirectedTo"
                  }
                }
              ],
              "message": "message"
            },
            "authMd": {
              "status": "fail",
              "details": {},
              "durationMs": 0,
              "evidence": [
                {
                  "action": "fetch",
                  "label": "GET /robots.txt",
                  "finding": {
                    "outcome": "positive",
                    "summary": "Found valid robots.txt"
                  },
                  "request": {
                    "method": "GET",
                    "url": "https://example.com/robots.txt",
                    "headers": {}
                  },
                  "response": {
                    "status": 200,
                    "statusText": "OK",
                    "bodyPreview": "bodyPreview",
                    "bodySize": 0,
                    "headers": {},
                    "redirectedTo": "redirectedTo"
                  }
                }
              ],
              "message": "message"
            },
            "mcpServerCard": {
              "status": "fail",
              "details": {},
              "durationMs": 0,
              "evidence": [
                {
                  "action": "fetch",
                  "label": "GET /robots.txt",
                  "finding": {
                    "outcome": "positive",
                    "summary": "Found valid robots.txt"
                  },
                  "request": {
                    "method": "GET",
                    "url": "https://example.com/robots.txt",
                    "headers": {}
                  },
                  "response": {
                    "status": 200,
                    "statusText": "OK",
                    "bodyPreview": "bodyPreview",
                    "bodySize": 0,
                    "headers": {},
                    "redirectedTo": "redirectedTo"
                  }
                }
              ],
              "message": "message"
            },
            "oauthDiscovery": {
              "status": "fail",
              "details": {},
              "durationMs": 0,
              "evidence": [
                {
                  "action": "fetch",
                  "label": "GET /robots.txt",
                  "finding": {
                    "outcome": "positive",
                    "summary": "Found valid robots.txt"
                  },
                  "request": {
                    "method": "GET",
                    "url": "https://example.com/robots.txt",
                    "headers": {}
                  },
                  "response": {
                    "status": 200,
                    "statusText": "OK",
                    "bodyPreview": "bodyPreview",
                    "bodySize": 0,
                    "headers": {},
                    "redirectedTo": "redirectedTo"
                  }
                }
              ],
              "message": "message"
            },
            "oauthProtectedResource": {
              "status": "fail",
              "details": {},
              "durationMs": 0,
              "evidence": [
                {
                  "action": "fetch",
                  "label": "GET /robots.txt",
                  "finding": {
                    "outcome": "positive",
                    "summary": "Found valid robots.txt"
                  },
                  "request": {
                    "method": "GET",
                    "url": "https://example.com/robots.txt",
                    "headers": {}
                  },
                  "response": {
                    "status": 200,
                    "statusText": "OK",
                    "bodyPreview": "bodyPreview",
                    "bodySize": 0,
                    "headers": {},
                    "redirectedTo": "redirectedTo"
                  }
                }
              ],
              "message": "message"
            },
            "webMcp": {
              "status": "neutral",
              "details": {},
              "durationMs": 0,
              "evidence": [
                {
                  "action": "fetch",
                  "label": "GET /robots.txt",
                  "finding": {
                    "outcome": "positive",
                    "summary": "Found valid robots.txt"
                  },
                  "request": {
                    "method": "GET",
                    "url": "https://example.com/robots.txt",
                    "headers": {}
                  },
                  "response": {
                    "status": 200,
                    "statusText": "OK",
                    "bodyPreview": "bodyPreview",
                    "bodySize": 0,
                    "headers": {},
                    "redirectedTo": "redirectedTo"
                  }
                }
              ],
              "message": "message"
            }
          }
        },
        "level": 2,
        "levelName": "Bot-Aware",
        "commerceSignals": [
          "string"
        ],
        "isCommerce": true,
        "nextLevel": {
          "name": "Agent-Readable",
          "requirements": [
            {
              "check": "markdownNegotiation",
              "description": "Support content negotiation with Accept: text/markdown",
              "prompt": "Add markdown content negotiation support",
              "skillUrl": "https://agentready.cloudflare.com/.well-known/skills/markdown-negotiation",
              "specUrls": [
                "https://markdownforagents.org"
              ]
            }
          ],
          "target": 3
        }
      },
      "phishing_v2": {
        "data": [
          "string"
        ]
      },
      "robotsTxt": {
        "data": [
          {
            "rules": {
              "*": {
                "allow": [
                  "string"
                ],
                "disallow": [
                  "string"
                ],
                "contentSignal": {
                  "ai-input": "no",
                  "ai-train": "yes",
                  "search": "yes"
                },
                "crawlDelay": 0
              }
            },
            "sitemaps": [
              "string"
            ],
            "hash": "hash"
          }
        ]
      },
      "urlCategories": {
        "data": [
          {
            "content": [
              {
                "id": 0,
                "name": "name",
                "super_category_id": 0
              }
            ],
            "inherited": {
              "content": [
                {
                  "id": 0,
                  "name": "name",
                  "super_category_id": 0
                }
              ],
              "from": "from",
              "risks": [
                {
                  "id": 0,
                  "name": "name",
                  "super_category_id": 0
                }
              ]
            },
            "name": "name",
            "risks": [
              {
                "id": 0,
                "name": "name",
                "super_category_id": 0
              }
            ]
          }
        ]
      }
    }
  },
  "page": {
    "apexDomain": "apexDomain",
    "asn": "asn",
    "asnname": "asnname",
    "city": "city",
    "country": "country",
    "domain": "domain",
    "ip": "ip",
    "mimeType": "mimeType",
    "server": "server",
    "status": "200",
    "title": "title",
    "tlsAgeDays": 0,
    "tlsIssuer": "tlsIssuer",
    "tlsValidDays": 0,
    "tlsValidFrom": "tlsValidFrom",
    "url": "url",
    "screenshot": {
      "dhash": "dhash",
      "mm3Hash": 0,
      "name": "name",
      "phash": "phash"
    }
  },
  "scanner": {
    "colo": "colo",
    "country": "country"
  },
  "stats": {
    "domainStats": [
      {
        "count": 0,
        "countries": [
          "string"
        ],
        "domain": "domain",
        "encodedSize": 0,
        "index": 0,
        "initiators": [
          "string"
        ],
        "ips": [
          "string"
        ],
        "redirects": 0,
        "size": 0
      }
    ],
    "ipStats": [
      {
        "asn": {
          "asn": "asn",
          "country": "country",
          "description": "description",
          "ip": "ip",
          "name": "name",
          "org": "org"
        },
        "countries": [
          "string"
        ],
        "domains": [
          "string"
        ],
        "encodedSize": 0,
        "geoip": {
          "city": "city",
          "country": "country",
          "country_name": "country_name",
          "ll": [
            0
          ],
          "region": "region"
        },
        "index": 0,
        "ip": "ip",
        "ipv6": true,
        "redirects": 0,
        "requests": 0,
        "size": 0,
        "count": 0
      }
    ],
    "IPv6Percentage": 0,
    "malicious": 0,
    "protocolStats": [
      {
        "count": 0,
        "countries": [
          "string"
        ],
        "encodedSize": 0,
        "ips": [
          "string"
        ],
        "protocol": "protocol",
        "size": 0
      }
    ],
    "resourceStats": [
      {
        "compression": 0,
        "count": 0,
        "countries": [
          "string"
        ],
        "encodedSize": 0,
        "ips": [
          "string"
        ],
        "percentage": 0,
        "size": 0,
        "type": "type"
      }
    ],
    "securePercentage": 0,
    "secureRequests": 0,
    "serverStats": [
      {
        "count": 0,
        "countries": [
          "string"
        ],
        "encodedSize": 0,
        "ips": [
          "string"
        ],
        "server": "server",
        "size": 0
      }
    ],
    "tlsStats": [
      {
        "count": 0,
        "countries": [
          "string"
        ],
        "encodedSize": 0,
        "ips": [
          "string"
        ],
        "protocols": {
          "TLS 1.3 / AES_128_GCM": 0
        },
        "securityState": "securityState",
        "size": 0
      }
    ],
    "totalLinks": 0,
    "uniqASNs": 0,
    "uniqCountries": 0
  },
  "task": {
    "apexDomain": "apexDomain",
    "domain": "domain",
    "domURL": "domURL",
    "method": "method",
    "options": {
      "customHeaders": {},
      "screenshotsResolutions": [
        "string"
      ]
    },
    "reportURL": "reportURL",
    "screenshotURL": "screenshotURL",
    "source": "source",
    "success": true,
    "time": "time",
    "url": "url",
    "uuid": "uuid",
    "visibility": "visibility"
  },
  "verdicts": {
    "overall": {
      "categories": [
        "string"
      ],
      "hasVerdicts": true,
      "malicious": true,
      "tags": [
        "string"
      ]
    }
  }
}
```